import React from 'react';
import { isItemGroupComponent, ItemComponent, ResponseItem } from 'survey-engine/lib/data_types';

interface EQ5DHealthIndicatorInputProps {
    compDef: ItemComponent;
    prefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    languageCode: string;
    isRequired: boolean;
}

const EQ5DHealthIndicatorInput: React.FC<EQ5DHealthIndicatorInputProps> = (props) => {

    if (isItemGroupComponent(props.compDef)) {

    };
    // TODO: expect four text parts

    // TODO: extract localized question text
    // TODO: extract localized box text
    // TODO: extract localized min text
    // TODO: extract localized max text
    return (
        <p>EQ5DHealthIndicatorInput</p>
    );
};

export default EQ5DHealthIndicatorInput;
