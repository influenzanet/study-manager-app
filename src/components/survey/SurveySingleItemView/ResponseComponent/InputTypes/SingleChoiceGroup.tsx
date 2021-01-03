import React, { useEffect, useState } from 'react';
import { ItemComponent, ItemGroupComponent } from 'survey-engine/lib/data_types/survey-item-component';
import { ResponseItem } from 'survey-engine/lib/data_types/response';
import { getLocaleStringTextByCode } from '../../utils';
import DateInput from '../DateInput/DateInput';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

import clsx from 'clsx';

interface SingleChoiceGroupProps {
  parentKey: string;
  compDef: ItemComponent;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
}


const SingleChoiceGroup: React.FC<SingleChoiceGroupProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  const [subResponseCache, setSubResponseCache] = useState<Array<ResponseItem>>(
    (props.prefill && props.prefill.items) ? [...props.prefill.items] : []
  );

  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);


  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = (event.target as HTMLInputElement).value;
    onOptionSelected(key);
  };

  const onOptionSelected = (key: string) => {
    setTouched(true);
    setResponse(prev => {
      if (!prev) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          items: [{ key: key }]
        }
      }
      const subResp = subResponseCache.find(sr => sr.key === key);
      return {
        ...prev,
        items: [
          subResp ? subResp : { key }
        ]
      }
    });
  }

  const setResponseForKey = (key: string | undefined) => (response: ResponseItem | undefined) => {
    if (!key || !props.compDef.key) { return; }
    setTouched(true);
    // console.log(response);

    setSubResponseCache(prev => {
      const ind = prev.findIndex(pr => pr.key === key);
      if (!response) {
        if (ind < 0) {
          return prev;
        }
        prev = prev.splice(ind, 1);
      } else {
        if (ind < 0) {
          prev.push(response);
        }
        else {
          prev[ind] = response;
        }
      }
      return [...prev];
    })
    if (!response) {
      setResponse({ key: props.compDef.key, items: [] });
    } else {
      setResponse({ key: props.compDef.key, items: [{ ...response }] });
    }
  }

  const getSelectedItem = (): ResponseItem | undefined => {
    if (!response || !response.items || response.items.length < 1) {
      return undefined;
    }
    return response.items[0];
  }

  const getSelectedKey = (): string | undefined => {
    if (!response || !response.items || response.items.length < 1) {
      return '';
    }
    return response.items[0].key;
  }

  const renderResponseOption = (option: ItemComponent, isLast: boolean): React.ReactNode => {
    if (option.displayCondition === false) {
      return null;
    }
    const prefill = getSelectedItem();
    const optionKey = props.parentKey + '.' + option.key;

    const isDisabled = option.disabled === true;

    let labelComponent = <p>{'loading...'}</p>
    switch (option.role) {
      case 'option':
        labelComponent = <label className="form-check-label cursor-pointer flex-grow-1" htmlFor={optionKey}>
          {getLocaleStringTextByCode(option.content, props.languageCode)}
        </label>
        /*
          const description = getLocaleStringTextByCode(option.description, props.languageCode);
          if (description) {
          return <Tooltip key={option.key} title={description} arrow>
            {renderedOption}
          </Tooltip>
          }*/
        // return renderedOption;
        break;
      case 'input':
        labelComponent =
          <TextInput
            parentKey={props.parentKey}
            key={option.key}
            compDef={option}
            prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
            languageCode={props.languageCode}
            responseChanged={setResponseForKey(option.key)}
            updateDelay={5}
            disabled={isDisabled}
          />;
        break;
      case 'numberInput':
        labelComponent =
          <NumberInput
            componentKey={props.parentKey}
            key={option.key}
            compDef={option}
            prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
            languageCode={props.languageCode}
            responseChanged={setResponseForKey(option.key)}
          />;
        break;
      case 'dateInput':
        labelComponent = <DateInput
          componentKey={optionKey}
          key={option.key}
          compDef={option}
          prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
          languageCode={props.languageCode}
          responseChanged={setResponseForKey(option.key)}
          disabled={isDisabled}
        />;
        break;
      default:
        labelComponent = <p key={option.key}>role inside single choice group not implemented yet: {option.role}</p>;
    }

    return (<div className={clsx(
      "form-check d-flex align-items-center",
      {
        'mb-2': !isLast
      })}
      key={option.key} >
      <div>
        <input
          className="form-check-input cursor-pointer"
          type="radio"
          name={props.parentKey}
          id={optionKey}
          value={option.key}
          checked={getSelectedKey() === option.key}
          disabled={isDisabled}
          onChange={handleSelectionChange}
        />
      </div>
      {labelComponent}

    </div>)
  }

  return (
    <fieldset
      id={props.parentKey}
      aria-label="single choice options"
    >
      {
        (props.compDef as ItemGroupComponent).items.map(
          (option, index) => renderResponseOption(option, (props.compDef as ItemGroupComponent).items.length - 1 === index)
        )
      }
    </fieldset>
  );
};

export default SingleChoiceGroup;
