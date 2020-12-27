import React from 'react';
import { ItemComponent } from 'survey-engine/lib/data_types';
import { FormHelperText } from '@material-ui/core';
import { getLocaleStringTextByCode } from '../utils';

interface ErrorComponentProps {
  compDef: ItemComponent;
  languageCode: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
  return (
    <FormHelperText
      className="px-2 pb-2 font-weight-bold text-danger">
      {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
    </FormHelperText>
  );
};

export default ErrorComponent;
