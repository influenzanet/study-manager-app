import { Expression } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";
import { initEQ5DHealthIndicatorQuestion, SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { ItemEditor } from "../../../../../editor-engine/survey-editor/item-editor";
import { generateLocStrings } from "../../../../../editor-engine/utils/simple-generators";
import { SimpleQuestionEditor } from "../../../../../editor-engine/utils/simple-question-editor";
import { surveyKeys } from "../../studyRules";


export class EQ5DProxyGroup extends GroupItemEditor {
    constructor(parentKey: string,
        conditions: {
            olderThan7: Expression,
        },
        keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'EQ5D';
        super(parentKey, groupKey);

        this.addItem(
            new EQ5DyProxy(this.key, {
                groupCondition: CommonExpressions.not(conditions.olderThan7),
            }).getItem()
        );

        this.addItem(
            new EQ5Dy(this.key, {
                groupCondition: conditions.olderThan7,
            }).getItem()
        )
        this.addPageBreak();
    }


}


const copyRightText = new Map([
    ["en", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation. NL (English) v2.1"],
    ["nl", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation."],
]);


const eq5dCopyright = {
    role: 'footnote', content: generateLocStrings(copyRightText), style: [
        { key: 'className', value: 'fs-small fst-italic text-center' }
    ]
};



class EQ5DyProxy extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'YProxy';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;
    if (this.isPartOfSurvey(surveyKeys.Tstopcontinuec)){
        this.addItem(this.groupIntro());
        this.addItem(this.Q1('Q1', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q2('Q2', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q3('Q3', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q4('Q4', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q5('Q5', undefined, isRequired));
        this.addPageBreak();
        }
        this.addItem(this.Q_healthstatus_instructions_def());
        this.addItem(this.Q_healthstatus_def('Q6', isRequired, true));

    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
## Kwaliteit van leven
(Het doel van deze vragenlijst is te onderzoeken hoe een verzorger, of iemand die het kind goed kent (d.w.z. een derde), de gezondheid van het kind zou beoordelen. De derde moet niet namens het kind antwoorden, maar zelf de gezondheid van het kind beoordelen, zoals de derde deze ziet)
Tik bij iedere groep op het ENE hokje dat het best weergeeft hoe **jij** de gezondheid van het kind **VANDAAG** zou beschrijven.
`]
                    ])
                })]
        })
    }

    Q1(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Beweging (lopen)"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met lopen"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met lopen"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met lopen"],
                            ]),
                        }
                    ],
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q2(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Voor zichzelf zorgen"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met wassen of aankleden"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met wassen of aankleden"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met wassen of aankleden"],
                            ]),
                        }
                    ],
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q3(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Dagelijkse activiteiten"],
            ]),
            questionSubText: new Map([
                ["nl", "bijvoorbeeld naar school gaan, hobby’s, sporten, spelen, naar familie of vrienden gaan"]
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met zijn/haar dagelijkse activiteiten"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met zijn/haar dagelijkse activiteiten"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met zijn/haar dagelijkse activiteiten"],
                            ]),
                        }
                    ],
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q4(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Pijn of andere klachten"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " pijn of andere klachten"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " pijn of andere klachten"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij heeft "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " pijn of andere klachten"],
                            ]),
                        }
                    ],
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q5(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Bezorgd, verdrietig of ongelukkig"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij is "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "niet"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " bezorgd, verdrietig of ongelukkig"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij is "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " bezorgd, verdrietig of ongelukkig"],
                            ]),
                        }
                    ],
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Hij/zij is "],
                            ]),
                        },
                        {
                            content: new Map([
                                ["nl", "erg"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " bezorgd, verdrietig of ongelukkig"],
                            ]),
                        }
                    ],
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q_healthstatus_instructions_def() {
        const defaultKey = 'HEALTH_INS'
        const itemKey = [this.key, defaultKey].join('.');
        const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
        editor.addDisplayComponent(
            {
                role: 'bullets', items: [
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "We would like to know how good or bad the health of your child is TODAY"],
                            ["nl", "We willen weten hoe goed of slecht je denkt dat de gezondheid van het kind VANDAAG is."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "This scale is numbered from 0 to 100."],
                            ["nl", "Deze lijn is genummerd van 0 tot en met 100."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text',
                        style: [{ key: 'variant', value: 'li' }],
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "100 geeft de "],
                                ]))
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "beste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", " gezondheid aan die je je kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                    {
                        role: 'text',
                        style: [{ key: 'variant', value: 'li' }],
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "0 geeft de "],
                                ]))
                            }, {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "slechtste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            }, {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", " gezondheid aan die je je kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                ]
            }
        )
        return editor.getItem();
    }

    Q_healthstatus_def(itemKey: string, isRequired?: boolean, useCopyRight?: boolean) {
        const simpleEditor = new SimpleQuestionEditor(this.key, itemKey);

        // role: 'eq5d-health-indicator'
        const rg_inner = initEQ5DHealthIndicatorQuestion({
            key: '0',
            role: 'eq5d-health-indicator',
            instructionText: new Map([
                ["en", "Mark an X on the scale to indicate what the health of your child is TODAY"],
                ["nl", "Tik op de genummerde lijn om aan te geven hoe goed of slecht jij denkt dat de gezondheid van het kind VANDAAG is."],
            ]),
            valueBoxText: new Map([
                ["en", "THE HEALTH OF YOUR CHILD TODAY ="],
                ["nl", "Hoe goed is de gezondheid van het kind VANDAAG?"],
            ]),
            minHealthText: new Map([
                ["en", "The worst health you can imagine"],
                ["nl", "De slechtste gezondheid die je je kunt voorstellen"],
            ]),
            maxHealthText: new Map([
                ["en", "The best health you can imagine"],
                ["nl", "De beste gezondheid die je je kunt voorstellen"],
            ]),
        });
        simpleEditor.setResponseGroupWithContent(rg_inner);

        if (isRequired) {
            simpleEditor.addHasResponseValidation();
        }

        if (useCopyRight) { simpleEditor.addDisplayComponent(eq5dCopyright); }
        return simpleEditor.getItem();
    }
}


class EQ5Dy extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Y';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        this.addItem(this.groupIntro());
        this.addItem(this.Q1('Q1', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q2('Q2', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q3('Q3', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q4('Q4', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q5('Q5', undefined, isRequired));
        this.addPageBreak();
        this.addItem(this.Q_healthstatus_instructions_def());
        this.addItem(this.Q_healthstatus_def('Q6', isRequired, true));
        // this.addItem(this.Q6('Q6', isRequired));
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
## Kwaliteit van leven

Tik bij iedere groep op het ENE hokje dat het best past bij jouw gezondheid VANDAAG.
`]
                    ])
                })]
        })
    }

    Q1(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Beweging (lopen)"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met lopen"],
                            ])
                        },
                    ]
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met lopen"],
                            ])
                        },
                    ]
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]),
                            className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met lopen"],
                            ])
                        },
                    ]
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q2(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Voor mezelf zorgen"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met wassen of aankleden"],
                            ])
                        },
                    ]
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met wassen of aankleden"],
                            ])
                        },
                    ]
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met wassen of aankleden"],
                            ])
                        },
                    ]
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q3(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Dagelijkse activiteiten"],
            ]),
            questionSubText: new Map([
                ["nl", "bijvoorbeeld naar school gaan, hobby’s, sporten, spelen, naar familie of vrienden gaan"]
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met mijn dagelijkse activiteiten"],
                            ])
                        },
                    ]
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met mijn dagelijkse activiteiten"],
                            ])
                        },
                    ]
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " problemen met mijn dagelijkse activiteiten"],
                            ])
                        },
                    ]
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q4(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Pijn of andere klachten"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "geen"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " pijn of andere klachten"],
                            ])
                        },
                    ]
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " pijn of andere klachten"],
                            ])
                        },
                    ]
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik heb "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "veel"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " pijn of andere klachten"],
                            ])
                        },
                    ]
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q5(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Bezorgd, verdrietig of ongelukkig"],
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik ben "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "niet"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " bezorgd, verdrietig of ongelukkig"],
                            ])
                        },
                    ]
                },
                {
                    key: 'beetje', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik ben "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "een beetje"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " bezorgd, verdrietig of ongelukkig"],
                            ])
                        },
                    ]
                },
                {
                    key: 'veel', role: 'option',
                    items: [
                        {
                            content: new Map([
                                ["nl", "Ik ben "],
                            ])
                        },
                        {
                            content: new Map([
                                ["nl", "erg"],
                            ]), className: 'text-decoration-underline'
                        },
                        {
                            content: new Map([
                                ["nl", " bezorgd, verdrietig of ongelukkig"],
                            ])
                        },
                    ]
                },
            ],
            bottomDisplayCompoments: [
                eq5dCopyright,
            ],
            isRequired: isRequired,
        });
    }

    Q_healthstatus_instructions_def() {
        const defaultKey = 'HEALTH_INS'
        const itemKey = [this.key, defaultKey].join('.');
        const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
        editor.addDisplayComponent(
            {
                role: 'bullets', items: [
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "We would like to know how good or bad your health is TODAY."],
                            ["nl", "We willen weten hoe goed of slecht je gezondheid VANDAAG is."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text', content: generateLocStrings(new Map([
                            ["en", "For that reason we have drawn this numbered line from 0 to 100."],
                            ["nl", "Daarvoor hebben we deze genummerde lijn van 0 tot en met 100 getekend."],
                        ])),
                        style: [{ key: 'variant', value: 'li' }]
                    },
                    {
                        role: 'text',
                        style: [{ key: 'variant', value: 'li' }],
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "100 geeft de "],
                                ]))
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "beste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            },
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", " gezondheid aan die je je kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                    {
                        role: 'text',
                        style: [{ key: 'variant', value: 'li' }],
                        items: [
                            {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "0 de "],
                                ]))
                            }, {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", "slechtste"],
                                ])),
                                style: [{ key: 'className', value: 'text-decoration-underline' }]
                            }, {
                                role: 'part', content: generateLocStrings(new Map([
                                    ["nl", " gezondheid aangeeft die je je kunt voorstellen."],
                                ]))
                            },
                        ],
                    },
                ]
            }
        )
        return editor.getItem();
    }

    Q_healthstatus_def(itemKey: string, isRequired?: boolean, useCopyRight?: boolean) {
        const simpleEditor = new SimpleQuestionEditor(this.key, itemKey);

        // role: 'eq5d-health-indicator'
        const rg_inner = initEQ5DHealthIndicatorQuestion({
            key: '0',
            role: 'eq5d-health-indicator',
            instructionText: new Map([
                ["en", "Please indicate on the numbered line how good or bad your health is TODAY."],
                ["nl", "Tik op de genummerde lijn om aan te geven hoe goed of slecht jouw gezondheid VANDAAG is."],
            ]),
            valueBoxText: new Map([
                ["en", "How good is your health TODAY?"],
                ["nl", "Hoe goed is je gezondheid VANDAAG?"],
            ]),
            minHealthText: new Map([
                ["en", "The worst health you can imagine"],
                ["nl", "De slechtste gezondheid die je je voor kunt stellen"],
            ]),
            maxHealthText: new Map([
                ["en", "The best health you can imagine"],
                ["nl", "De beste gezondheid die je je voor kunt stellen"],
            ]),
        });
        simpleEditor.setResponseGroupWithContent(rg_inner);

        if (isRequired) {
            simpleEditor.addHasResponseValidation();
        }

        if (useCopyRight) { simpleEditor.addDisplayComponent(eq5dCopyright); }
        return simpleEditor.getItem();
    }
}
