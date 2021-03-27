import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class HADSGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'HADS';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(Q_a(this.key, true))
        this.addItem(Q_b(this.key, true))
        this.addItem(Q_c(this.key, true))
        this.addItem(Q_d(this.key, true))
        this.addItem(Q_e(this.key, true))
        this.addItem(Q_f(this.key, true))
        this.addItem(Q_g(this.key, true))
        this.addItem(Q_h(this.key, true))
        this.addItem(Q_i(this.key, true))
        this.addItem(Q_j(this.key, true))
        this.addItem(Q_k(this.key, true))
        this.addItem(Q_l(this.key, true))
        this.addItem(Q_m(this.key, true))
        this.addItem(Q_n(this.key, true))
    }
}

const Q_a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'a';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.a?"],
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

const Q_b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'b';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.b?"],
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

const Q_c = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'c';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.c?"],
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

const Q_d = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'd';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.d?"],
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

const Q_e = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'e';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.e?"],
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

const Q_f = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'f';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.f?"],
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

const Q_g = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'g';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.g?"],
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

const Q_h = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'h';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.h?"],
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

const Q_i = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'i';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.i?"],
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

const Q_j = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'j';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.j?"],
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

const Q_k = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'k';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.k?"],
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

const Q_l = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'l';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.l?"],
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

const Q_m = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'm';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.m?"],
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

const Q_n = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'n';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "HADS.n?"],
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
