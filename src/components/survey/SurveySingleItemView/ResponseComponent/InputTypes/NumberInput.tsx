import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem } from 'survey-engine/lib/data_types';
import { getClassName, getLocaleStringTextByCode } from '../../utils';
import clsx from 'clsx';

interface NumberInputProps {
  componentKey: string;
  compDef: ItemComponent;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  const [inputValue, setInputValue] = useState<string>(
    props.prefill && props.prefill.value ? parseFloat(props.prefill.value).toString() : '0'
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


  const handleInputValueChange = (key: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!key) { return; }
    setTouched(true);

    let value = (event.target as HTMLInputElement).value;

    if (props.compDef.properties?.stepSize === 1.0) {
      const numVal = parseFloat(value);
      if (!isNaN(numVal) && !Number.isInteger(numVal)) {
        value = Math.round(numVal).toString();
      }
    }
    if (props.compDef.properties?.min !== undefined) {
      const numVal = parseFloat(value);
      if (numVal < props.compDef.properties?.min) {
        value = props.compDef.properties?.min.toString();
      }
    }
    if (props.compDef.properties?.max !== undefined) {
      const numVal = parseFloat(value);
      if (numVal > props.compDef.properties?.max) {
        value = props.compDef.properties?.max.toString();
      }
    }

    setInputValue(value);
    setResponse(prev => {
      if (!prev) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          dtype: 'number',
          value: value.toString()
        }
      }
      return {
        ...prev,
        dtype: 'number',
        value: value.toString()
      }
    })
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event || !event.currentTarget) { return; }
    (event.currentTarget as HTMLInputElement).select();
  };

  const minValue = props.compDef.properties?.min;
  const maxValue = props.compDef.properties?.max;
  const stepSize = props.compDef.properties?.stepSize;

  return <div
    className={clsx("d-flex align-items-center",
      getClassName(props.compDef.style))}
  >
    <label htmlFor={props.componentKey} className="me-1">
      {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
    </label>
    <input
      style={{
        minWidth: 90,
        maxWidth: 300,
      }}
      className="form-control border-0"
      type="number"
      autoComplete="off"
      id={props.componentKey}
      placeholder={getLocaleStringTextByCode(props.compDef.description, props.languageCode)}
      value={inputValue}
      maxLength={4000}
      onFocus={handleFocus}
      onClick={(e) => (e.target as HTMLInputElement).select()}
      onChange={handleInputValueChange(props.compDef.key)}
      disabled={props.compDef.disabled !== undefined || props.disabled === true}
      min={minValue ? minValue as number : undefined}
      max={maxValue ? maxValue as number : undefined}
      step={stepSize ? stepSize as number : undefined}
    />
  </div>
};

export default NumberInput;
