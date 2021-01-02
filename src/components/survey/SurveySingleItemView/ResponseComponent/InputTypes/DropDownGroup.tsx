import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem, ItemGroupComponent } from 'survey-engine/lib/data_types';
import { getLocaleStringTextByCode } from '../../utils';


interface DropDownGroupProps {
  compDef: ItemComponent;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
  componentKey: string;
  fullWidth?: boolean;
}


const DropDownGroup: React.FC<DropDownGroupProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const getSelectedKey = (): string | undefined => {
    if (!response || !response.items || response.items.length < 1) {
      return '';
    }
    return response.items[0].key;
  }

  const handleSelectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTouched(true);
    const key = (event.target as HTMLInputElement).value as string;
    setResponse(prev => {
      if (!key || key === '') {
        return undefined;
      }
      if (!prev) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          items: [{ key: key }]
        }
      }
      return {
        ...prev,
        items: [
          { key }
        ]
      }
    });
  };

  const renderedInput = <select
    id={props.componentKey}
    className="custom-select flex-grow-1"
    aria-label="Select"
    value={getSelectedKey()}
    onChange={handleSelectionChange}
  >
    <option aria-label="None" value="" />
    {
      (props.compDef as ItemGroupComponent).items.map(
        item => {
          if (item.displayCondition) {
            return null;
          }
          return <option
            value={item.key}
            key={item.key}>
            {getLocaleStringTextByCode(item.content, props.languageCode)}
          </option>
        }
      )
    }
  </select>;

  return (
    <div className="d-flex align-items-center my-1">
      {props.compDef.content ?
        <label
          htmlFor={props.componentKey}
          className="m-0 me-1 flex-shrink-1" style={{ minWidth: 80 }}>
          {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
        </label>
        : null}
      {renderedInput}
    </div>
  );
};

export default DropDownGroup;
