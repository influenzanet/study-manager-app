import React from 'react';
import { isItemGroupComponent, ItemComponent } from 'survey-engine/lib/data_types';
import { getClassName, getLocaleStringTextByCode } from '../utils';
import clsx from 'clsx';

interface TextViewComponentProps {
  compDef: ItemComponent;
  languageCode: string;
  className?: string;
}

const supportedVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li'] as const;
type Variant = typeof supportedVariants[number]; // 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

const isValidVariant = (variant: unknown): variant is Variant => {
  return typeof variant === 'string' && supportedVariants.findIndex(v => v === variant) > -1;
}

const getVariant = (styles?: Array<{ key: string, value: string }>): Variant | undefined => {
  if (!styles) {
    return;
  }
  const variantObj = styles.find(st => st.key === 'variant');
  if (!variantObj) {
    return;
  }
  let variant = variantObj.value;
  if (!isValidVariant(variant)) {
    console.warn(`unsupported variant "${variant}", fallback to "p"`);
    return;
  }
  return variant;
}



const TextViewComponent: React.FC<TextViewComponentProps> = (props) => {
  const variant = getVariant(props.compDef.style);
  const className = clsx(
    {
      'm-0': !variant,
    },
    props.className,
    getClassName(props.compDef.style)
  );


  const content = isItemGroupComponent(props.compDef) ?
    <React.Fragment>
      {props.compDef.items.map((part, index) =>
        <span
          key={index.toFixed()}
          className={getClassName(part.style)}
        >{getLocaleStringTextByCode(part.content, props.languageCode)}</span>
      )}
    </React.Fragment>
    : getLocaleStringTextByCode(props.compDef.content, props.languageCode);

  const TextTag = variant ? variant : 'p';

  return (<TextTag className={className}>
    {content}
  </TextTag>)
};

export default TextViewComponent;
