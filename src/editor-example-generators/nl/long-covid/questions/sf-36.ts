import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class SF36Group extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'SF36';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(Q1(this.key, true))
        this.addItem(Q2(this.key, true))
        this.addItem(Q3(this.key, true))
        this.addItem(Q4(this.key, true))
        this.addItem(Q5(this.key, true))
        this.addItem(Q6(this.key, true))
        this.addItem(Q7(this.key, true))
        this.addItem(Q8(this.key, true))
        this.addItem(Q9(this.key, true))
        this.addItem(Q10(this.key, true))
        this.addItem(Q11(this.key, true))
    }
}

const Q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q1?"],
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

const Q2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q2?"],
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
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q3?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "TODO"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "TODO: a"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "TODO: b"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "TODO: c"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "TODO: d"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "TODO: e"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "TODO: f"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "TODO: g"],
                ])
            },
            {
                key: 'h', content: new Map([
                    ["nl", "TODO: h"],
                ])
            },
            {
                key: 'i', content: new Map([
                    ["nl", "TODO: i"],
                ])
            },
            {
                key: 'j', content: new Map([
                    ["nl", "TODO: j"],
                ])
            }
        ]
    });
}


const Q4 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q4?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "TODO"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "TODO: a"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "TODO: b"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "TODO: c"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "TODO: d"],
                ])
            },
        ]
    });
}

const Q5 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q5?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "TODO"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "TODO: a"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "TODO: b"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "TODO: c"],
                ])
            },
        ]
    });
}

const Q6 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q6?"],
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

const Q7 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q7';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q7?"],
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

const Q8 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q8';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q8?"],
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

const Q9 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q9';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q9?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '5', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '6', content: new Map([
                    ["nl", "TODO"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "TODO: a"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "TODO: b"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "TODO: c"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "TODO: d"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "TODO: e"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "TODO: f"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "TODO: g"],
                ])
            },
            {
                key: 'h', content: new Map([
                    ["nl", "TODO: h"],
                ])
            },
            {
                key: 'i', content: new Map([
                    ["nl", "TODO: i"],
                ])
            },
        ]
    });
}


const Q10 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q10';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q10?"],
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

const Q11 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q11';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "SF36.Q11?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "TODO"],
                ])
            },
            {
                key: '4', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '5', content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "TODO: a"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "TODO: b"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "TODO: c"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "TODO: d"],
                ])
            },
        ]
    });
}
