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
    groupContent?: Map<string, string>,
    groupDescription?: Map<string, string>,
): ItemGroupComponent => {
    // init group
    return initResponseGroup('dropDownGroup', key, optionItems, order, groupDisabled,
        groupContent ? generateLocStrings(groupContent) : undefined,
        groupDescription ? generateLocStrings(groupDescription) : undefined,
    );
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

interface HeaderRow {
    role: 'headerRow',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    cells: Array<{
        role: 'text',
        key: string,
        content?: Map<string, string>,
        description?: Map<string, string>,
    }>
}
interface RadioRow {
    role: 'radioRow',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    cells: Array<{
        role: 'label' | 'option',
        key: string,
        content?: Map<string, string>,
        description?: Map<string, string>,
    }>

}

export interface ResponseRowCell {
    role: 'label' | 'check' | 'input' | 'numberInput' | 'dropDownGroup',
    key: string,
    content?: Map<string, string>,
    description?: Map<string, string>,
    properties?: ComponentProperties;
    // for dropdown group
    items?: Array<{
        role: 'option',
        key: string,
        content?: Map<string, string>,
        disabled?: Expression;
        displayCondition?: Expression;
    }>
}


interface ResponseRow {
    role: 'responseRow',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    cells: Array<ResponseRowCell>
}

type MatrixRow = HeaderRow | RadioRow | ResponseRow;

export const initMatrixQuestion = (
    key: string,
    rows: Array<MatrixRow>,
    order?: Expression,
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: 'matrix',
    });

    groupEdit.setOrder(
        order ? order : {
            name: 'sequential'
        }
    );

    // init rows
    rows.forEach(rowDef => {
        const rowEditor = new ComponentEditor(undefined, {
            key: rowDef.key,
            role: rowDef.role,
        });

        if (rowDef.displayCondition) {
            rowEditor.setDisplayCondition(rowDef.displayCondition);
        }
        if (rowDef.disabled) {
            rowEditor.setDisabled(rowDef.disabled);
        }

        switch (rowDef.role) {
            case 'headerRow':
                rowDef.cells.forEach(cell => {
                    const cellEditor = new ComponentEditor(undefined, {
                        key: cell.key,
                        role: cell.role,
                    });
                    if (cell.content) {
                        cellEditor.setContent(generateLocStrings(cell.content));
                    }

                    if (cell.description) {
                        cellEditor.setDescription(generateLocStrings(cell.description));
                    }
                    rowEditor.addItemComponent(cellEditor.getComponent());
                });
                break;
            case 'radioRow':
                rowDef.cells.forEach(cell => {
                    const cellEditor = new ComponentEditor(undefined, {
                        key: cell.key,
                        role: cell.role,
                    });
                    if (cell.content) {
                        cellEditor.setContent(generateLocStrings(cell.content));
                    }

                    if (cell.description) {
                        cellEditor.setDescription(generateLocStrings(cell.description));
                    }
                    rowEditor.addItemComponent(cellEditor.getComponent());
                });
                break;
            case 'responseRow':
                rowDef.cells.forEach(cell => {
                    const cellEditor = new ComponentEditor(undefined, {
                        key: cell.key,
                        role: cell.role,
                    });
                    if (cell.content) {
                        cellEditor.setContent(generateLocStrings(cell.content));
                    }
                    if (cell.description) {
                        cellEditor.setDescription(generateLocStrings(cell.description));
                    }
                    cellEditor.setProperties(cell.properties);
                    if (cell.items) {
                        cell.items.forEach(opt => {
                            const cellOptionEditor = new ComponentEditor(undefined, {
                                key: opt.key,
                                role: opt.role,
                            });
                            if (opt.content) {
                                cellOptionEditor.setContent(generateLocStrings(opt.content));
                            }
                            cellOptionEditor.setDisabled(opt.disabled);
                            cellOptionEditor.setDisplayCondition(opt.displayCondition);
                            cellEditor.addItemComponent(cellOptionEditor.getComponent());
                        })
                    }
                    rowEditor.addItemComponent(cellEditor.getComponent());
                });
                break;
        }

        groupEdit.addItemComponent(rowEditor.getComponent());
    });


    return groupEdit.getComponent() as ItemGroupComponent;
}