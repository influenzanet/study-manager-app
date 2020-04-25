import { ItemGroupComponent, Expression, ComponentProperties, LocalizedObject } from "survey-engine/lib/data_types";
import { ComponentEditor } from "../survey-editor/component-editor";
import { generateLocStrings } from "./simple-generators";

interface OptionDef {
    key: string;
    role: string;
    content?: Map<string, string>;
    description?: Map<string, string>;
    displayCondition?: Expression;
    disabled?: Expression;
    style?: Array<{ key: string, value: string }>;
    optionProps?: ComponentProperties;
}

export const initSingleChoiceGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression
): ItemGroupComponent => {
    // init group
    return initResponseGroup('singleChoiceGroup', key, optionItems, order);
}

export const initMultipleChoiceGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression
): ItemGroupComponent => {
    // init group
    return initResponseGroup('multipleChoiceGroup', key, optionItems, order);
}

export const initDropdownGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression,
    groupDisabled?: Expression,
    groupContent?: LocalizedObject[],
    groupDescription?: LocalizedObject[],
): ItemGroupComponent => {
    // init group
    return initResponseGroup('dropDownGroup', key, optionItems, order, groupDisabled, groupContent, groupDescription);
}

export const initSliderCategoricalGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression,
    groupDisabled?: Expression,
): ItemGroupComponent => {
    // init group
    return initResponseGroup('sliderCategorical', key, optionItems, order, groupDisabled);
}

const initResponseGroup = (
    type: 'singleChoiceGroup' | 'multipleChoiceGroup' | 'dropDownGroup' | 'sliderCategorical',
    key: string,
    optionItems: OptionDef[],
    order?: Expression,
    groupDisabled?: Expression,
    groupContent?: LocalizedObject[],
    groupDescription?: LocalizedObject[],
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: type,
    });

    groupEdit.setOrder(
        order ? order : {
            name: 'sequential'
        }
    );
    if (groupDisabled) {
        groupEdit.setDisabled(groupDisabled);
    }
    if (groupContent) {
        groupEdit.setContent(groupContent);
    }
    if (groupDescription) {
        groupEdit.setDescription(groupDescription);
    }

    // add option items
    optionItems.forEach(optionDef => {
        const optEditor = new ComponentEditor(undefined, {
            key: optionDef.key,
            role: optionDef.role,
        });
        if (optionDef.content) {
            optEditor.setContent(generateLocStrings(optionDef.content));
        }
        if (optionDef.description) {
            optEditor.setDescription(generateLocStrings(optionDef.description));
        }

        switch (optionDef.role) {
            case 'date':
                optEditor.setDType('date');
                break;
            case 'numberInput':
                optEditor.setDType('number');
                break;
        }

        if (optionDef.displayCondition) {
            optEditor.setDisplayCondition(optionDef.displayCondition);
        }
        if (optionDef.disabled) {
            optEditor.setDisabled(optionDef.disabled);
        }
        if (optionDef.style) {
            optEditor.setStyles(optionDef.style);
        }
        if (optionDef.optionProps) {
            optEditor.setProperties(optionDef.optionProps);
        }
        groupEdit.addItemComponent(optEditor.getComponent());
    });
    return groupEdit.getComponent() as ItemGroupComponent;
}