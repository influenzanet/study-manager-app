import { ItemGroupComponent, Expression, ComponentProperties, LocalizedObject, ItemComponent, SurveyItem, isExpression } from "survey-engine/lib/data_types";
import { ComponentEditor } from "../survey-editor/component-editor";
import { datePickerKey, likertScaleGroupKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions";
import { generateRandomKey } from "./randomKeyGenerator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings } from "./simple-generators";
import { SimpleQuestionEditor } from "./simple-question-editor";


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

const generateSingleChoiceQuestion = (props: {
    parentKey: string;
    itemKey: string;
    version?: number;
    questionText: Map<string, string>;
    questionSubText?: Map<string, string>;
    helpGroupContent?: Array<{
        content: Map<string, string>,
        style?: Array<{ key: string, value: string }>,
    }>;
    condition?: Expression;
    topDisplayCompoments?: Array<ItemComponent>;
    responseOptions: Array<OptionDef>;
    bottomDisplayCompoments?: Array<ItemComponent>;
    isRequired?: boolean;
    footnoteText?: Map<string, string>;
}): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, props.responseOptions);
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

const generateDropDownQuestion = (props: {
    parentKey: string;
    itemKey: string;
    version?: number;
    questionText: Map<string, string>;
    questionSubText?: Map<string, string>;
    helpGroupContent?: Array<{
        content: Map<string, string>,
        style?: Array<{ key: string, value: string }>,
    }>;
    condition?: Expression;
    topDisplayCompoments?: Array<ItemComponent>;
    responseOptions: Array<OptionDef>;
    bottomDisplayCompoments?: Array<ItemComponent>;
    isRequired?: boolean;
    footnoteText?: Map<string, string>;
}): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initDropdownGroup(singleChoiceKey, props.responseOptions);
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}


const generateMultipleChoiceQuestion = (props: {
    parentKey: string;
    itemKey: string;
    version?: number;
    questionText: Map<string, string>;
    questionSubText?: Map<string, string>;
    helpGroupContent?: Array<{
        content: Map<string, string>,
        style?: Array<{ key: string, value: string }>,
    }>;
    condition?: Expression;
    topDisplayCompoments?: Array<ItemComponent>;
    responseOptions: Array<OptionDef>;
    bottomDisplayCompoments?: Array<ItemComponent>;
    isRequired?: boolean;
    footnoteText?: Map<string, string>;
}
): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, props.responseOptions);
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

const generateSimpleLikertGroupQuestion = (props: {
    parentKey: string;
    itemKey: string;
    version?: number;
    questionText: Map<string, string>;
    questionSubText?: Map<string, string>;
    helpGroupContent?: Array<{
        content: Map<string, string>,
        style?: Array<{ key: string, value: string }>,
    }>;
    condition?: Expression;
    topDisplayCompoments?: Array<ItemComponent>;
    rows: Array<LikertGroupRow>,
    scaleOptions: Array<{
        key: string;
        className?: string;
        content: Map<string, string>;
    }>,
    stackOnSmallScreen?: boolean;
    bottomDisplayCompoments?: Array<ItemComponent>;
    isRequired?: boolean;
    footnoteText?: Map<string, string>;
}): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initLikertScaleGroup(
        likertScaleGroupKey,
        props.rows,
        props.scaleOptions,
        props.stackOnSmallScreen,
    );
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.editor.addValidation({
            key: 'r',
            type: 'hard',
            rule: expWithArgs('and',
                ...props.rows.map(r => expWithArgs(
                    'responseHasKeysAny',
                    [props.parentKey, props.itemKey].join('.'),
                    [responseGroupKey, likertScaleGroupKey, r.key].join('.'),
                    ...props.scaleOptions.map(o => o.key)
                ))
            )
        })
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

interface Duration {
    reference?: number | Expression;
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};

const durationObjectToSeconds = (duration: Duration): number => {
    let value = 0;

    if (duration.years !== undefined) {
        value += duration.years * 31536000;
    }
    if (duration.months !== undefined) {
        value += duration.months * 2592000;
    }
    if (duration.days !== undefined) {
        value += duration.days * 86400;
    }
    if (duration.hours !== undefined) {
        value += duration.hours * 3600;
    }
    if (duration.minutes !== undefined) {
        value += duration.minutes * 60;
    }
    if (duration.seconds !== undefined) {
        value += duration.seconds;
    }
    return value;
}

const generateDatePickerInput = (props: {
    parentKey: string;
    itemKey: string;
    version?: number;
    dateInputMode: 'YMD' | 'YM' | 'Y';
    questionText: Map<string, string>;
    questionSubText?: Map<string, string>;
    helpGroupContent?: Array<{
        content: Map<string, string>,
        style?: Array<{ key: string, value: string }>,
    }>;
    condition?: Expression;
    topDisplayCompoments?: Array<ItemComponent>;
    inputLabelText?: Map<string, string>;
    placeholderText?: Map<string, string>;
    minRelativeDate?: Duration;
    maxRelativeDate?: Duration;
    bottomDisplayCompoments?: Array<ItemComponent>;
    isRequired?: boolean;
    footnoteText?: Map<string, string>;
}): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner: ItemComponent = {
        key: datePickerKey, role: 'dateInput',
        properties: {
            dateInputMode: { str: props.dateInputMode },
            min: props.minRelativeDate ? {
                dtype: 'exp', exp:
                    expWithArgs(
                        'timestampWithOffset',
                        durationObjectToSeconds(props.minRelativeDate),
                        props.minRelativeDate.reference ? props.minRelativeDate.reference : undefined
                    )
            } : undefined,
            max: props.maxRelativeDate ? {
                dtype: 'exp', exp:
                    expWithArgs(
                        'timestampWithOffset',
                        durationObjectToSeconds(props.maxRelativeDate),
                        props.maxRelativeDate.reference ? props.maxRelativeDate.reference : undefined
                    )
            } : undefined,
        },
        content: props.inputLabelText ? generateLocStrings(props.inputLabelText) : undefined,
        description: props.placeholderText ? generateLocStrings(props.placeholderText) : undefined,
    };
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

export const QuestionGenerators = {
    singleChoice: generateSingleChoiceQuestion,
    multipleChoice: generateMultipleChoiceQuestion,
    simpleLikertGroup: generateSimpleLikertGroupQuestion,
    dateInput: generateDatePickerInput,
    dropDown: generateDropDownQuestion,
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

interface EQ5DHealthSliderProps {
    role: 'eq5d-health-indicator',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    instructionText: Map<string, string>,
    valueBoxText: Map<string, string>,
    maxHealthText: Map<string, string>,
    minHealthText: Map<string, string>,
}

export const initEQ5DHealthIndicatorQuestion = (
    props: EQ5DHealthSliderProps
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: props.key,
        isGroup: true,
        role: props.role,
    });

    const instructionTextEditor = new ComponentEditor(undefined, { role: 'instruction', });
    instructionTextEditor.setContent(generateLocStrings(props.instructionText))
    groupEdit.addItemComponent(instructionTextEditor.getComponent());

    const valueBoxTextEditor = new ComponentEditor(undefined, { role: 'valuebox', });
    valueBoxTextEditor.setContent(generateLocStrings(props.valueBoxText))
    groupEdit.addItemComponent(valueBoxTextEditor.getComponent());

    const minHealthTextEditor = new ComponentEditor(undefined, { role: 'mintext', });
    minHealthTextEditor.setContent(generateLocStrings(props.minHealthText))
    groupEdit.addItemComponent(minHealthTextEditor.getComponent());

    const maxHealthTextEditor = new ComponentEditor(undefined, { role: 'maxtext', });
    maxHealthTextEditor.setContent(generateLocStrings(props.maxHealthText))
    groupEdit.addItemComponent(maxHealthTextEditor.getComponent());

    return groupEdit.getComponent() as ItemGroupComponent;
}

interface LikertGroupRow {
    key: string;
    content: Map<string, string>;
    hideTopBorder?: boolean;
    optionDisabled?: Array<{
        optionKey: string;
        exp: Expression;
    }>;
    displayCondition?: Expression;
}

export const initLikertScaleGroup = (
    key: string,
    rows: Array<LikertGroupRow>,
    scaleOptions: Array<{
        key: string;
        className?: string;
        content: Map<string, string>;
    }>,
    stackOnSmallScreen?: boolean,
    displayCondition?: Expression,
): ItemGroupComponent => {
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: 'likertGroup',
    });

    if (displayCondition) {
        groupEdit.setDisplayCondition(displayCondition);
    }

    rows.forEach((row, index) => {
        groupEdit.addItemComponent({
            key: generateRandomKey(4),
            role: 'text',
            style: [{
                key: 'className', value:
                    'mb-1 fw-bold' + (index !== 0 ? ' pt-1 mt-2' : '') + ((!row.hideTopBorder && index > 0) ? ' border-top border-1 border-grey-2' : '')
            }, { key: 'variant', value: 'h6' }],
            content: generateLocStrings(row.content),
        });

        const item = initLikertScaleItem(
            row.key,
            scaleOptions.map(option => {
                return {
                    key: option.key,
                    className: option.className,
                    content: option.content,
                    disabled: row.optionDisabled?.find(cond => cond.optionKey === option.key)?.exp,
                }
            }),
            stackOnSmallScreen,
            row.displayCondition
        )
        groupEdit.addItemComponent(item);
    });



    return groupEdit.getComponent() as ItemGroupComponent;
}


export const initLikertScaleItem = (
    key: string,
    options: Array<{
        key: string;
        className?: string;
        content?: Map<string, string>;
        disabled?: Expression;
    }>,
    stackOnSmallScreen?: boolean,
    displayCondition?: Expression,
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: 'likert',
    });
    groupEdit.setDisplayCondition(displayCondition);
    if (stackOnSmallScreen) {
        groupEdit.setStyles([
            { key: 'responsive', value: 'stackOnSmallScreen' }
        ])
    }


    options.forEach((option) => {
        const optionComponent = new ComponentEditor(undefined, {
            key: option.key,
            role: 'option',
        });
        if (option.content) {
            optionComponent.setContent(generateLocStrings(option.content));
        }
        if (option.className) {
            optionComponent.setStyles([{
                key: 'className', value: option.className
            }]);
        }
        optionComponent.setDisabled(option.disabled);
        groupEdit.addItemComponent(optionComponent.getComponent());
    });

    return groupEdit.getComponent() as ItemGroupComponent;
}
