import React from 'react';
import { ItemComponent } from 'survey-engine/lib/data_types';
import { getClassName, getLocaleStringTextByCode } from '../utils';
import clsx from 'clsx';

interface ErrorComponentProps {
  compDef: ItemComponent;
  languageCode: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
  return (
    <p
      className={
        clsx(
          "m-0 mt-2",
          "fw-bold text-danger",
          getClassName(props.compDef.style),
        )
      }>
      {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
    </p>
  );
};

export default ErrorComponent;
