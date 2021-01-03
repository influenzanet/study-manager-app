import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem, ItemGroupComponent } from 'survey-engine/lib/data_types';
import { getLocaleStringTextByCode } from '../../utils';
import TextInput from './TextInput';
import clsx from 'clsx';


interface MultipleChoiceGroupProps {
  compDef: ItemComponent;
  parentKey: string;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
}

const MultipleChoiceGroup: React.FC<MultipleChoiceGroupProps> = (props) => {
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
    const key = event.target.value;
    const checked = event.target.checked;
    setResponseForKey(key, checked);
  }

  const setResponseForKey = (key: string, checked: boolean, value?: string, dtype?: string) => {
    setTouched(true);
    if (checked) {
      const newRI: ResponseItem = {
        key: key,
      }
      if (value) {
        newRI.value = value;
      }
      if (dtype) {
        newRI.dtype = dtype;
      }
      setResponse(prev => {
        if (!prev || !prev.items) {
          return {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: [newRI]
          }
        }
        const ind = prev.items.findIndex(pr => pr.key === key);
        if (ind < 0) {
          prev.items.push(newRI);
        }
        else {
          prev.items[ind] = newRI;
        }
        return {
          ...prev,
          items: [...prev.items]
        }
      });
    } else {
      setResponse(prev => {
        if (!prev) {
          return {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: []
          }
        }
        return {
          ...prev,
          items: prev.items?.filter(i => i.key !== key),
        }
      });
    }
  }

  const updateSubResponseCache = (key: string | undefined, response: ResponseItem | undefined) => {
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
  }

  const isChecked = (key: string): boolean => {
    if (!response || !response.items || response.items.length < 1) {
      return false;
    }
    return response.items.findIndex(ri => ri.key === key) > -1;
  }

  const isDisabled = (item: ItemComponent): boolean => {
    if (item.disabled === true) {
      const key = item.key ? item.key : 'no key found';
      if (isChecked(key)) {
        setResponse(prev => {
          if (!prev) { return { key: 'no key found', items: [] } }
          return {
            ...prev,
            items: prev.items?.filter(i => i.key !== key),
          }
        });
      }
      return true;
    }
    return false;
  }

  const renderResponseOption = (option: ItemComponent, isLast: boolean): React.ReactNode => {
    if (option.displayCondition === false) {
      return null;
    }
    const optionKey = props.parentKey + '.' + option.key;
    let labelComponent = <p>{'loading...'}</p>;

    switch (option.role) {
      case 'option':
        labelComponent = <label
          className="form-check-label cursor-pointer w-100"
          htmlFor={optionKey}>
          {getLocaleStringTextByCode(option.content, props.languageCode)}
        </label>;
        break;
      /*
      const description = getLocaleStringTextByCode(option.description, props.languageCode);
      if (description) {
        return <Tooltip key={option.key} title={description} arrow>
          {renderedOption}
        </Tooltip>
      }
      return renderedOption;*/
      case 'input':
        const prefill = subResponseCache.find(r => r.key === option.key);

        labelComponent =
          <TextInput
            parentKey={props.parentKey}
            key={option.key}
            compDef={option}
            prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
            languageCode={props.languageCode}
            responseChanged={(response) => {
              const value = response?.value;
              const checkStatus = (value !== undefined && value.length > 0);
              setResponseForKey(option.key ? option.key : 'unknown', checkStatus, value);
              updateSubResponseCache(option.key, response);
            }}
            updateDelay={5}
            disabled={isDisabled(option)}
          />;
        break;
      default:
        labelComponent = <p key={option.key}>role inside multiple choice group not implemented yet: {option.role}</p>
        break;
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
          type="checkbox"
          name={props.parentKey}
          id={optionKey}
          value={option.key}
          checked={isChecked(option.key ? option.key : 'no key found')}
          disabled={isDisabled(option)}
          onChange={handleSelectionChange}
        />
      </div>
      {labelComponent}
    </div>)

  }

  return (
    <fieldset
      id={props.parentKey}
      aria-label="multiple choice options"
    >
      {
        (props.compDef as ItemGroupComponent).items.map((option, index) =>
          renderResponseOption(option, (props.compDef as ItemGroupComponent).items.length - 1 === index)
        )
      }
    </fieldset>
  );
};

export default MultipleChoiceGroup;
