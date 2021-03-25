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
            ["nl", "Wat vind je, over het algemeen genomen, van je gezondheid?"],
        ]),
        responseOptions: [
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Uitstekend"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Zeer goed"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Goed"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Matig"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Slecht"],
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
            ["nl", "In vergelijking met een jaar geleden, hoe zou je nu je gezondheid in het algemeen beoordelen?"],
        ]),
        responseOptions: [
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Veel beter dan een jaar geleden"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Iets beter dan een jaar geleden"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ongeveer hetzelfde als een jaar geleden"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Iets slechter dan een jaar geleden"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Veel slechter dan een jaar geleden"],
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
            ["nl", "De volgende vragen gaan over dagelijkse bezigheden. Word je door je gezondheid op dit moment beperkt bij deze bezigheden? Zo ja, in welke mate?"],
        ]),
        scaleOptions: [
            {
                key: '3', content: new Map([
                    ["nl", "ja, ernstig beperkt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "ja, een beetje beperkt"],
                ])
            }, {
                key: '1', content: new Map([
                    ["nl", "nee, helemaal niet beperkt"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "Forse inspanning zoals hardlopen, zware voorwerpen tillen, inspannend sporten"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "Matige inspanning zoals het verplaatsen van een tafel, stofzuigen, fietsen"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Tillen of boodschappen dragen"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "Een paar trappen oplopen"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "Eén trap oplopen"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "Buigen, knielen of bukken"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "Meer dan een kilometer lopen"],
                ])
            },
            {
                key: 'h', content: new Map([
                    ["nl", "Een halve kilometer lopen"],
                ])
            },
            {
                key: 'i', content: new Map([
                    ["nl", "Honderd meter lopen"],
                ])
            },
            {
                key: 'j', content: new Map([
                    ["nl", "Uzelf wassen of aankleden"],
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
