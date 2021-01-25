import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem } from 'survey-engine/lib/data_types';
import { getClassName, getLocaleStringTextByCode } from '../../utils';
import clsx from 'clsx';

interface TextInputProps {
  parentKey: string;
  compDef: ItemComponent;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
  updateDelay?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  const [inputValue, setInputValue] = useState<string>(
    props.prefill && props.prefill.value ? props.prefill.value : ''
  );

  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, props.updateDelay !== undefined ? props.updateDelay : 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);


  const handleInputValueChange = (key: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!key) { return; }
    setTouched(true);

    const value = (event.target as HTMLInputElement).value;
    setInputValue(value);
    setResponse(prev => {
      if (!prev) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          value: value
        }
      }
      return {
        ...prev,
        value: value
      }
    })
  };

  const fullKey = [props.parentKey, props.compDef.key].join('.');
  return (
    <div
      className={clsx("d-flex align-items-center", getClassName(props.compDef.style))}
      onClick={props.onClick}
    >
      <label htmlFor={fullKey} className="me-1">
        {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
      </label>
      <input
        className="form-control border-0"
        autoComplete="off"
        id={fullKey}
        placeholder={getLocaleStringTextByCode(props.compDef.description, props.languageCode)}
        value={inputValue}
        maxLength={4000}
        onChange={handleInputValueChange(props.compDef.key)}
        disabled={props.compDef.disabled === true || props.disabled === true}
      />
    </div>
  );
};

export default TextInput;
