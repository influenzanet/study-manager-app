import React, { useState, useEffect } from 'react';
import { SurveySingleItem, ItemGroupComponent, ResponseItem, ItemComponent } from 'survey-engine/lib/data_types';
import Typography from '@material-ui/core/Typography';
import { getItemComponentTranslationByRole, getItemComponentByRole } from './utils';
import Box from '@material-ui/core/Box';
import HelpGroup from './HelpGroup/HelpGroup';
import TextViewComponent from './TextViewComponent/TextViewComponent';
import ErrorComponent from './ErrorComponent/ErrorComponent';
import WarningComponent from './WarningComponent/WarningComponent';
import ResponseComponent from './ResponseComponent/ResponseComponent';
import clsx from 'clsx';

import styles from './SurveySingleItemView.module.scss';

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
            case 'responseGroup':
              if (!response) {
                setResponse({
                  key: component.key ? component.key : 'no key found',
                  items: []
                })
              }
              return <ResponseComponent key={index.toFixed()}
                languageCode={props.languageCode}
                compDef={component}
                prefill={props.responsePrefill}
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
              console.warn('compment role not implemented: ' + component.role);
              return <p key={index.toFixed()}>{component.role} not implemented</p>
          }
        })
      }
    </React.Fragment>;
  }

  const titleComp = props.renderItem.components ? getItemComponentTranslationByRole(props.renderItem.components.items, 'title', props.languageCode) : undefined;

  return (
    <div
      className={
        styles.itemContainer
      }>
      {
        titleComp ?
          <Box display="flex" alignItems="center"
            className={clsx(
              'px-2 font-weight-bold',
              styles.itemHeader,
              {
                'custom-error-bg': props.showInvalid
              }
            )}
          >
            <Box flexGrow="1">

              <h6 style={{ fontWeight: 'bold', marginTop: 12, marginBottom: 12 }} >
                {titleComp}
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
              </h6>

            </Box>
            {renderHelpGroup()}
          </Box>
          : null
      }
      <div className={
        clsx({
          'p-2': !titleComp
        })
      }>
        {renderBodyComponents()}
      </div>
      { props.showInvalid ?
        <p className='custom-error-bg p-2 m-0 text-danger font-weight-bold'
          style={{ fontSize: '1.1875rem' }}
        >
          {props.invalidWarning}
        </p>

        : null}

    </div>
  );
};

export default SurveySingleItemView;
