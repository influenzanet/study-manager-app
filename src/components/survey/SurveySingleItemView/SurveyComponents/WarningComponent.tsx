import React from 'react';
import { ItemComponent } from 'survey-engine/lib/data_types';
import { getClassName, getLocaleStringTextByCode } from '../utils';
import clsx from 'clsx';

interface WarningComponentProps {
  compDef: ItemComponent;
  languageCode: string;
}

const WarningComponent: React.FC<WarningComponentProps> = (props) => {
  return (
    <p
      className={
        clsx(
          "m-0 mt-2",
          "fw-bold text-warning",
          getClassName(props.compDef.style),
        )
      }>
      {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
    </p>
  );
};

export default WarningComponent;
