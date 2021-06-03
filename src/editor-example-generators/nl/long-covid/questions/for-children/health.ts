import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";


export class HealthGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
        hasDifficultyWithBreathing: Expression,
        youngerThan8: Expression,
        youngerThan11: Expression,
        between8And12: Expression,
        between13And18: Expression,
    }) {
        const groupKey = 'HEALTH';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        const Q2 = this.Q2('Q2', isRequired);
        const conditionQ2ja = CommonExpressions.singleChoiceOptionsSelected(Q2.key, 'ja');

        const Q4 = this.Q4('Q4', isRequired);
        const conditionQ4ja = CommonExpressions.singleChoiceOptionsSelected(Q4.key, 'ja');

        const conditionForQ6 = CommonExpressions.and(
            conditions.hasDifficultyWithBreathing,
            conditions.youngerThan8,
        );

        //
        this.addItem(this.groupIntro());
        this.addItem(this.Q0('Q0', isRequired));
        this.addItem(this.Q1('Q1', isRequired));
        this.addItem(Q2);

        this.addItem(this.Q3('Q3', conditionQ2ja, isRequired));
        this.addItem(Q4)
        this.addItem(this.Q5('Q5', conditionQ4ja, isRequired));
        this.addItem(this.Q6('Q6', conditionForQ6, isRequired));

        this.addItem(this.Q7('Q7', isRequired));
        this.addPageBreak();

        // Functioneren ---------
        this.addItem(new Q8Group(this.key, {
            groupCondition: conditions.youngerThan8,
        }).getItem());

        this.addItem(new Q9Group(this.key, {
            groupCondition: conditions.between8And12,
        }).getItem());

        this.addItem(new Q10Group(this.key, {
            groupCondition: conditions.between13And18,
        }).getItem());
        this.addPageBreak();

        // Vermoeidheid ---------
        this.addItem(new Q11Group(this.key, {
            groupCondition: conditions.youngerThan8,
        }).getItem());

        this.addItem(new Q12Group(this.key, {
            groupCondition: conditions.between8And12,
        }).getItem());

        this.addItem(new Q13Group(this.key, {
            groupCondition: conditions.between13And18,
        }).getItem());
        this.addPageBreak();

        // Sterke kanten en moeilijkheden ---------
        this.addItem(new Q14Group(this.key, {
            groupCondition: conditions.youngerThan11,
        }).getItem());

        this.addItem(new Q15Group(this.key, {
            groupCondition: CommonExpressions.not(conditions.youngerThan11)
        }).getItem());
        this.addPageBreak();

        // Eenzaamheid  ---------
        // TODO: Q16
        // TODO: Q17

        // Pijn en verzuim
        // TODO: Q18
        // TODO: Q19

        this.addPageBreak();
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: health intro for children
                        `]
                    ])
                })]
        })
    }

    /**
     *
     */
    Q0(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q0"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q1"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q2"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q3(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q3"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q4"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q5(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q5"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q6(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q6"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q7(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q7"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }


}

/**
 *
 */
class Q8Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q8';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q81('1', isRequired));
        this.addItem(this.Q82('2', isRequired));
        this.addItem(this.Q83('3', isRequired));
        this.addItem(this.Q84('4', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro text for Q8 group
                        `]
                    ])
                })]
        })
    }

    Q81(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q8.1"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q82(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q8.2"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q83(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q8.3"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q84(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q8.4"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}

/**
 *
 */
class Q9Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q9';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('1', isRequired));
        this.addItem(this.Q2('2', isRequired));
        this.addItem(this.Q3('3', isRequired));
        this.addItem(this.Q4('4', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro text for Q9 group
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q9.1"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q9.2"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q9.3"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q9.4"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}

/**
 *
 */
class Q10Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q10';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('1', isRequired));
        this.addItem(this.Q2('2', isRequired));
        this.addItem(this.Q3('3', isRequired));
        this.addItem(this.Q4('4', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro text for Q10 group
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q10.1"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q10.2"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q10.3"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q10.4"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}

/**
 *
 */
class Q11Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q11';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('algemene', isRequired));
        this.addItem(this.Q2('slaap', isRequired));
        this.addItem(this.Q3('cognitive', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro text for Q11 group
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q11.1"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q11.2"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q11.3"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}


/**
 *
 */
class Q12Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q12';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('algemene', isRequired));
        this.addItem(this.Q2('slaap', isRequired));
        this.addItem(this.Q3('cognitive', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro text for Q12 group
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q12.1"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q12.2"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q12.3"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}


/**
 *
 */
class Q13Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q13';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('algemene', isRequired));
        this.addItem(this.Q2('slaap', isRequired));
        this.addItem(this.Q3('cognitive', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro text for Q13 group
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q13.1"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q13.2"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }

    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q13.3"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}

/**
 * Sterke kanten en moeilijkheden [SDQ-4-16 ingekorte versie] [afnemen bij leeftijd 4-<11jr]
 */
class Q14Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q14';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('1', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro text for Q14 group: Sterke kanten en moeilijkheden [SDQ-4-16 ingekorte versie] [afnemen bij leeftijd 4-<11jr]
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q14.1: consider maybe breaking this question into some smaller ones?"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}

/**
 * Sterke kanten en moeilijkheden [SDQ-11-17 ingekorte versie] [afnemen bij leeftijd 11-<18jr]
 */
class Q15Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q15';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('1', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: Intro Sterke kanten en moeilijkheden [SDQ-11-17 ingekorte versie] [afnemen bij leeftijd 11-<18jr]
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Q15.1: consider maybe breaking this question into some smaller ones?"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 1 = helemaal niet vervelend, 10 = heel erg heel erg vervelend"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ])
                }, {
                    key: '2', content: new Map([
                        ["nl", "2"],
                    ])
                }, {
                    key: '3', content: new Map([
                        ["nl", "3"],
                    ])
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ]),
                }, {
                    key: '5', content: new Map([
                        ["nl", "5"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "a"],
                    ])
                },
            ]
        });
    }
}
