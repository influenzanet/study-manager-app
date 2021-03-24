import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class MedicineGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'MED';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(Q1(this.key, true))
        this.addItem(Q2a(this.key, true))
        this.addItem(Q2b(this.key, true))
        this.addItem(Q3(this.key, true))
        this.addItem(Q4(this.key, true))
    }
}

const Q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "MED.Q1?"],
        ]),
        responseOptions: [
            {
                key: 'todo', role: 'option',
                content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ]
    });
}

const Q2a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2a';
    return QuestionGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "MED.Q2a?"],
        ]),
        responseOptions: [
            {
                key: 'todo', role: 'option',
                content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ]
    });
}

const Q2b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2b';
    return QuestionGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "MED.Q2b?"],
        ]),
        responseOptions: [
            {
                key: 'todo', role: 'option',
                content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ]
    });
}

const Q3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "MED.Q3?"],
        ]),
        responseOptions: [
            {
                key: 'todo', role: 'option',
                content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ]
    });
}

const Q4 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';
    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "MED.Q4?"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["nl", "Hint to select more...?"],
            ]))
        }],
        responseOptions: [
            {
                key: 'todo', role: 'option',
                content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ]
    });
}
