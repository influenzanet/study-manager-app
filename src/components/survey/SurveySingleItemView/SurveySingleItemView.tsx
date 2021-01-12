import React, { useState, useEffect } from 'react';
import { SurveySingleItem, ItemGroupComponent, ResponseItem, ItemComponent } from 'survey-engine/lib/data_types';
import { getItemComponentByRole, getItemComponentsByRole, getLocaleStringTextByCode } from './utils';
import HelpGroup from './SurveyComponents/HelpGroup';
import TextViewComponent from './SurveyComponents/TextViewComponent';
import ErrorComponent from './SurveyComponents/ErrorComponent';
import WarningComponent from './SurveyComponents/WarningComponent';
import ResponseComponent from './ResponseComponent/ResponseComponent';
import clsx from 'clsx';
import BulletList from './SurveyComponents/BulletList';

interface SurveySingleItemViewProps {
  renderItem: SurveySingleItem;
  languageCode: string;
  responsePrefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  showInvalid?: boolean;
  invalidWarning: string;
}


const SurveySingleItemView: React.FC<SurveySingleItemViewProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.responsePrefill);
  const [touched, setTouched] = useState(false);

  const horizontalPadding = 'px-2 px-sm-3';

  useEffect(() => {
    if (touched) {
      props.responseChanged(response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const renderHelpGroup = (): React.ReactNode => {
    if (!props.renderItem.components) { return null; }
    const helpGroup = getItemComponentByRole(props.renderItem.components.items, 'helpGroup') as ItemGroupComponent;
    if (!helpGroup) {
      return null;
    }
    return (
      <HelpGroup
        componentGroup={helpGroup}
        languageCode={props.languageCode}
      />
    )
  }

  const requiredItem = props.renderItem.validations?.find(val => val.type === 'hard');

  const renderBodyComponents = (): React.ReactNode => {
    if (!props.renderItem.components) { return null; }
    return <React.Fragment>
      {
        props.renderItem.components.items.map((component: ItemComponent, index: number) => {
          if (component.displayCondition === false) {
            return null;
          }
          switch (component.role) {
            case 'title':
              return null;
            case 'helpGroup':
              return null;
            case 'footnote':
              return null;
            case 'responseGroup':
              if (!response) {
                setResponse({
                  key: component.key ? component.key : 'no key found',
                  items: []
                })
              }
              return <ResponseComponent key={index.toFixed()}
                itemKey={props.renderItem.key}
                languageCode={props.languageCode}
                compDef={component}
                prefill={props.responsePrefill}
                isRequired={requiredItem ? true : false}
                responseChanged={(response) => {
                  console.log('new response set', response)
                  setTouched(true);
                  setResponse(response);
                }}
              />
            case 'text':
              return <TextViewComponent key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
              />;
            case 'bullets':
              return <BulletList key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
              />
            case 'error':
              return <ErrorComponent key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
              />
            case 'warning':
              return <WarningComponent key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
              />
            default:
              console.warn('component role not implemented: ' + component.role);
              return <p key={index.toFixed()}>{component.role} not implemented</p>
          }
        })
      }
    </React.Fragment>;
  }

  // const titleComp = props.renderItem.components ? getItemComponentTranslationByRole(props.renderItem.components.items, 'title', props.languageCode) : undefined;
  const titleComp = getItemComponentByRole(props.renderItem.components?.items, 'title')

  const renderTitleComp = (): React.ReactNode => {
    if (!titleComp) { return null; }

    const content = getLocaleStringTextByCode(titleComp.content, props.languageCode);
    const description = getLocaleStringTextByCode(titleComp.description, props.languageCode);

    return (
      <div
        className={
          clsx(
            'd-flex align-items-center',
            horizontalPadding,
            'py-2a',
            'bg-grey-2',
            {
              'bg-danger-light': props.showInvalid
            }
          )}
      >
        <div className="flex-grow-1">
          <h5 className="m-0 fw-bold">
            {content}
            {requiredItem ?
              <span
                className={clsx(
                  'ms-1',
                  {
                    'text-primary': !props.showInvalid,
                    'text-danger': props.showInvalid
                  }
                )}
              >
                {'*'}
              </span> : null}
          </h5>
          {description ? <p className="m-0 fst-italic">{description} </p> : null}
        </div>

        { renderHelpGroup()}
      </div >
    )
  }

  const renderFootnote = (): React.ReactNode => {
    if (!props.renderItem.components) { return null; }
    const currentComponents = getItemComponentsByRole(props.renderItem.components.items, 'footnote');
    if (currentComponents.length < 1) {
      return null;
    }

    return currentComponents.map((component: ItemComponent, index: number) => {
      if (component.displayCondition === false) {
        return null;
      }
      return <TextViewComponent
        className={clsx(horizontalPadding, 'mt-2a')}
        key={index.toFixed()}
        compDef={component}
        languageCode={props.languageCode}
      />
    })
  }

  return (
    <React.Fragment>
      <div
        className={'bg-grey-1'}>
        {renderTitleComp()}
        <div className={clsx(
          horizontalPadding,
          'py-2a'
        )}
        >
          {renderBodyComponents()}
        </div>
        {props.showInvalid ?
          <p className={clsx(
            horizontalPadding,
            'fw-bold',
            'py-2',
            'bg-danger-light  m-0 text-danger'
          )}
            style={{ fontSize: '1.1875rem' }}
          >
            {props.invalidWarning}
          </p>
          : null}
      </div>
      {renderFootnote()}
    </React.Fragment>
  );
};

export default SurveySingleItemView;
