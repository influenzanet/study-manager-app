import React, { useEffect, useState } from 'react';
import { ItemComponent, ResponseItem } from 'survey-engine/lib/data_types';
import { getClassName, getLocaleStringTextByCode } from '../../utils';
import clsx from 'clsx';

interface MultilineTextInputProps {
  componentKey: string;
  compDef: ItemComponent;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
}

const MultilineTextInput: React.FC<MultilineTextInputProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  const [inputValue, setInputValue] = useState<string>(
    props.prefill && props.prefill.value ? props.prefill.value : ''
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


  const handleInputValueChange = (key: string | undefined) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!key) { return; }
    setTouched(true);

    const value = (event.target as HTMLTextAreaElement).value;

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

  const fullKey = [props.componentKey, props.compDef.key].join('.');
  return (
    <div
      className={clsx("d-flex align-items-start", getClassName(props.compDef.style))}
    >
      <label htmlFor={fullKey} className="me-1">
        {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
      </label>
      <textarea
        className="form-control border border-white"
        autoComplete="off"
        id={fullKey}
        placeholder={getLocaleStringTextByCode(props.compDef.description, props.languageCode)}
        value={inputValue}
        maxLength={4000}
        rows={3}
        onChange={handleInputValueChange(props.compDef.key)}
        disabled={props.compDef.disabled !== undefined}
      />
    </div>
  );
};

export default MultilineTextInput;
