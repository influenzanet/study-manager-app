import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem, ItemGroupComponent } from 'survey-engine/lib/data_types';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Box, TextField, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getLocaleStringTextByCode } from '../../utils';

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

  const [inputValues, setInputValues] = useState<ResponseItem[]>(
    props.prefill && props.prefill.items ? props.prefill.items.slice() : []
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
    setTouched(true);
    const key = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      const newRI: ResponseItem = {
        key: key,
      }
      setResponse(prev => {
        if (!prev) {
          return {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: [newRI]
          }
        }
        return {
          ...prev,
          items: prev.items ? [...prev.items, newRI] : [newRI]
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

  const handleInputValueChange = (key: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!key) { return; }
    setTouched(true);

    const value = (event.target as HTMLInputElement).value;

    setInputValues(prev => {
      setResponse(prevResp => {
        if (!prevResp) { return { key: 'no key found', items: [] } }
        return {
          ...prevResp,
          items: [{
            key,
            value
          }]
        }
      });
      const ind = prev.findIndex(v => v.key === key);
      if (ind > -1) {
        prev[ind] = { key, value }
      }
      return [
        ...prev
      ]
    })
  };

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
    switch (option.role) {
      case 'option':
        return (
          <div className={clsx("form-check", {
            'mb-2': !isLast
          })}
            key={option.key} >
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
            <label
              className="form-check-label cursor-pointer w-100"
              htmlFor={optionKey}>
              {getLocaleStringTextByCode(option.content, props.languageCode)}
            </label>
          </div>)
      /*
      const description = getLocaleStringTextByCode(option.description, props.languageCode);
      if (description) {
        return <Tooltip key={option.key} title={description} arrow>
          {renderedOption}
        </Tooltip>
      }
      return renderedOption;*/
      case 'input':
        let r = inputValues.find(v => v.key === option.key);
        if (!r) {
          r = { key: option.key ? option.key : 'errorkey', value: '' };
          const nr = r;
          setInputValues(prev => [
            ...prev,
            nr
          ]);
        }

        const label = <Box display="flex" height="100%" alignItems="center" width="100%">
          {
            option.content ?
              <Box mr={1}>
                {getLocaleStringTextByCode(option.content, props.languageCode)}
              </Box> : null
          }
          <Box flexGrow={1}>
            <TextField
              fullWidth
              value={r.value ? r.value : ''}
              margin="dense"
              variant="filled"
              inputProps={{
                style: {
                  padding: "8px 16px",
                }
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  borderRadius: 1000,
                }
              }}
              placeholder={getLocaleStringTextByCode(option.description, props.languageCode)}
              onChange={handleInputValueChange(option.key)}
              disabled={isDisabled(option)}
            ></TextField>
          </Box>
        </Box >;

        return <FormControlLabel
          style={{ marginRight: 0 }}
          key={option.key}
          value={option.key}
          control={
            <Checkbox checked={isChecked(option.key ? option.key : 'no key found')}
              onChange={handleSelectionChange}
              value={option.key} />}
          label={label}
          disabled={isDisabled(option)}
        />
      default:
        return <p key={option.key}>role inside multiple choice group not implemented yet: {option.role}</p>
    }

  }

  return (
    <fieldset
      id={props.parentKey}
      aria-label="options"
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
