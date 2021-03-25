import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class CFQGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'CFQ';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(Q1(this.key, true))
        this.addItem(Q2(this.key, true))
        this.addItem(Q3(this.key, true))
        this.addItem(Q4(this.key, true))
        this.addItem(Q5(this.key, true))
    }
}

const Q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "CFQ.Q1?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Zeer vaak"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Vaak"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "Af en toe"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "Zelden"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "Nooit"],
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
        ]
    });
}

const Q2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "CFQ.Q2?"],
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
                ]),
            }, {
                key: '5', content: new Map([
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
            ["nl", "CFQ.Q3?"],
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
                ]),
            }, {
                key: '5', content: new Map([
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
            ["nl", "CFQ.Q4?"],
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
                ]),
            }, {
                key: '5', content: new Map([
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
            ["nl", "CFQ.Q5?"],
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
                ]),
            }, {
                key: '5', content: new Map([
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
        ]
    });
}
