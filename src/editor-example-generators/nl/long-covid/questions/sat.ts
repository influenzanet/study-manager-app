import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class SaTGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'SaT';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_a(this.key, true))
        this.addItem(q_b(this.key, true))
        this.addItem(q_c(this.key, true))
        this.addItem(q_d(this.key, true))
        this.addItem(q_e(this.key, true))
        this.addItem(q_f(this.key, true))
        this.addItem(q_g(this.key, true))
        this.addItem(q_h(this.key, true))
    }
}

const q_a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'a';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.a?"],
        ]),
        sliderLabel: new Map([
            ["nl", "your response:"],
        ]),
        min: 0,
        max: 100,
    });
}

const q_b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'b';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.b?"],
        ]),
        sliderLabel: new Map([
            ["nl", "your response:"],
        ]),
        min: 0,
        max: 100,
    });
}

export const q_c = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'c';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.c"],
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




const q_d = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'd';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.d?"],
        ]),
        sliderLabel: new Map([
            ["nl", "your response:"],
        ]),
        min: 0,
        max: 100,
    });
}

const q_e = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'e';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.e?"],
        ]),
        sliderLabel: new Map([
            ["nl", "your response:"],
        ]),
        min: 0,
        max: 100,
    });
}


export const q_f = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'f';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.f"],
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


const q_g = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'g';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.g?"],
        ]),
        sliderLabel: new Map([
            ["nl", "your response:"],
        ]),
        min: 0,
        max: 100,
    });
}

const q_h = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'h';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SaT.h?"],
        ]),
        sliderLabel: new Map([
            ["nl", "your response:"],
        ]),
        min: 0,
        max: 100,
    });
}
