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
        this.addItem(new Q16Group(this.key, {
            groupCondition: conditions.youngerThan8,
        }).getItem());

        this.addItem(new Q17Group(this.key, {
            groupCondition: CommonExpressions.not(conditions.youngerThan8)
        }).getItem());
        this.addPageBreak();

        // Pijn en verzuim
        this.addItem(new Q18Group(this.key, {
            groupCondition: conditions.youngerThan8,
        }).getItem());

        this.addItem(new Q19Group(this.key, {
            groupCondition: CommonExpressions.not(conditions.youngerThan8)
        }).getItem());
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
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "De  vragen hieronder gaan over de 3 maanden voordat je de klachten kreeg die (mogelijk) door corona komen."],
            ]),
            questionSubText: new Map([
                ["nl", "Of als je geen klachten door corona hebt gehad, de 3 maanden voordat je startte met het onderzoek."],
            ]),
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                },
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ]),
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
                }, {
                    key: '6', content: new Map([
                        ["nl", "6"],
                    ])
                }, {
                    key: '7', content: new Map([
                        ["nl", "7"],
                    ])
                }, {
                    key: '8', content: new Map([
                        ["nl", "8"],
                    ])
                }, {
                    key: '9', content: new Map([
                        ["nl", "9"],
                    ])
                }, {
                    key: '10', content: new Map([
                        ["nl", "10"],
                    ])
                }
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Hoe ernstig was je vermoeidheid?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', 'Geef aan op een schaal van 0 (niet vermoeid) tot 10 (ernstig vermoeid)']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Hoe ernstig waren je pijnklachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', 'Geef aan op een schaal van 0 (geen pijnklachten) tot 10 (ernstige pijnklachten)']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Hoe ernstig waren je concentratiestoornissen?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', 'Geef aan op een schaal van 0 (geen concentratiestoornissen) tot 10 (ernstige concentratiestoornissen)']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Hoe ernstig waren je benauwdheid/kortademigheid?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', 'Geef aan op een schaal van 0 (niet benauwd / kortademig) tot 10 (ernstig benauwd / kortademig)']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
            ]
        });
    }

    /**
    *
    */
    Q1(itemKey: string, isRequired?: boolean) {
        const optionNoneSelected = CommonExpressions.multipleChoiceOptionsSelected([this.key, itemKey].join('.'), 'geen');

        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "De vragen hieronder zijn gericht aan een minderjarige. Bent u een ouder/verzorger dan kunt u de antwoorden invullen voor/over uw kind."],
            ]),
            questionSubText: new Map([
                ["nl", "Welke lichamelijke en psychische problemen heb je? Kruis aan welke problemen je nu hebt of in de afgelopen 12 maanden hebt gehad (meerdere antwoorden mogelijk)."],
            ]),
            responseOptions: [
                {
                    key: 'long-hoofd', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Longen en hoofdholten"],
                    ]),
                },
                {
                    key: 'astma', role: 'option',
                    content: new Map([
                        ["nl", "Astma"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'luchtweginfecties', role: 'option',
                    content: new Map([
                        ["nl", "Recidiverende luchtweginfecties of recidiverende bronchitis"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'longaandoening', role: 'option',
                    content: new Map([
                        ["nl", "Andere chronische longaandoening (brede groep), zoals taaislijmziekte (CF), trilhaarfunctieprobleem (PCD), luchtwegmalacie"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'ontsteking', role: 'option',
                    content: new Map([
                        ["nl", "Ontsteking van de neusbijholte, voorhoofdsholte of kaakholten"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'hooikoorts', role: 'option',
                    content: new Map([
                        ["nl", "Hooikoortsklachten"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'hart-bloedvaten', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Hart en bloedvaten"],
                    ]),
                },
                {
                    key: 'hart', role: 'option',
                    content: new Map([
                        ["nl", "Aangeboren hartafwijking"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'maag-darmen', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Maag en darmen"],
                    ]),
                },
                {
                    key: 'chronisch', role: 'option',
                    content: new Map([
                        ["nl", "Chronische darmontsteking (ziekte van Crohn of colitis ulcerosa)"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'obstipatie', role: 'option',
                    content: new Map([
                        ["nl", "Obstipatie"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'buikpijn', role: 'option',
                    content: new Map([
                        ["nl", "Functionele buikpijn"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'diarree', role: 'option',
                    content: new Map([
                        ["nl", "Chronische diarree"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'glutenallergie', role: 'option',
                    content: new Map([
                        ["nl", "Glutenallergie (coeliakie)"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'galblaas', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Galblaas, lever en nieren"],
                    ]),
                },
                {
                    key: 'nierziekte', role: 'option',
                    content: new Map([
                        ["nl", "Aangeboren nierziekte en/of dialyse"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'andere', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Andere ziektes"],
                    ]),
                },
                {
                    key: 'suikerziekte', role: 'option',
                    content: new Map([
                        ["nl", "Suikerziekte"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'schildklierafwijking', role: 'option',
                    content: new Map([
                        ["nl", "Schildklierafwijking"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'stofwisselingsziektes', role: 'option',
                    content: new Map([
                        ["nl", "Stofwisselingsziektes (metabole stoornis)"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'rug', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Rug en gewrichten"],
                    ]),
                },
                {
                    key: 'gewrichten', role: 'option',
                    content: new Map([
                        ["nl", "Gewrichtsontsteking (reuma)"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'zenuwstelsel', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Zenuwstelsel"],
                    ]),
                },
                {
                    key: 'epilipsie', role: 'option',
                    content: new Map([
                        ["nl", "Epilepsie"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'hoofdpijn', role: 'option',
                    content: new Map([
                        ["nl", "Hoofdpijn of migraine"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'ontwikkelingsachterstand', role: 'option',
                    content: new Map([
                        ["nl", "Ontwikkelingsachterstand"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'spierziekte', role: 'option',
                    content: new Map([
                        ["nl", "Spierziekte"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'andere2', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Andere lichamelijke of psychische problemen"],
                    ]),
                },
                {
                    key: 'kanker', role: 'option',
                    content: new Map([
                        ["nl", "Kwaadaardige aandoening of kanker"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'eczeem', role: 'option',
                    content: new Map([
                        ["nl", "Chronische huidziekte of eczeem"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'letsel', role: 'option',
                    content: new Map([
                        ["nl", "Letsel door ongeluk in en om huis sport, school, werk of in het verkeer"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'afweer', role: 'option',
                    content: new Map([
                        ["nl", "Afweerstoornis (zoals aangeboren stoornis in de afweer, gebruik afweerremmende medicijnen, enz.)"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'transplantatie', role: 'option',
                    content: new Map([
                        ["nl", "Ondergaan van transplantatie"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'vermoeidheid', role: 'option',
                    content: new Map([
                        ["nl", "Ernstige vermoeidheid, langer dan 3 maanden"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'pijnklachten', role: 'option',
                    content: new Map([
                        ["nl", "Ernstige pijnklachten, langer dan 3 maanden"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'concentratiestoornissen', role: 'option',
                    content: new Map([
                        ["nl", "Ernstige concentratiestoornissen, langer dan 3 maanden"],
                    ]),
                    disabled: optionNoneSelected,
                },
                {
                    key: 'long3', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Vink aan als geen van bovenstaande van toepassing is"],
                    ]),

                },
                {
                    key: 'geen', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([this.key, itemKey].join('.'), 'geen'),
                    content: new Map([
                        ["nl", "Geen van de bovenstaande"],
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


/**
 * Eenzaamheid [PROMIS Short Form Depressive Symptoms- Proxy] [afnemen bij leeftijd 5-<8jr]
 */
class Q16Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q16';
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
TODO: Intro Eenzaamheid [PROMIS Short Form Depressive Symptoms- Proxy] [afnemen bij leeftijd 5-<8jr]
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
                ["nl", "TODO: Q16.1"]
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
 * Eenzaamheid [PROMIS Short Form Depressive Symptoms] [afnemen bij leeftijd 8-<18jr]
 */
class Q17Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q17';
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
TODO: Intro Eenzaamheid [PROMIS Short Form Depressive Symptoms] [afnemen bij leeftijd 8-<18jr]
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
                ["nl", "TODO: Q17.1"],
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
 * Pijn en verzuim [kids-VAS-pain-onder8jaar] [afnemen bij leeftijd <8jr]
 */
class Q18Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q18';
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
TODO: Intro Pijn en verzuim [kids-VAS-pain-onder8jaar] [afnemen bij leeftijd <8jr]
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericSlider({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Beoordeel je reukvermogen OP DIT MOMENT"],
            ]),
            questionSubText: new Map([
                ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
            ]),
            sliderLabel: new Map([
                ["nl", "Jouw selectie:"],
            ]),
            noResponseLabel: new Map([
                ["nl", "Beweeg de slider om je antwoord te geven"],
            ]),
            min: 0,
            max: 100,
        });
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is het aantal lesuren per week  dat geroosterd is voor kinderen uit de klas van je kind?"],
            ]),
            content: new Map([
                ['nl', 'hours']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 300
            }
        })
    }


    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Aantal lesuren in de afgelopen 2 (!) weken dat je kind gevolgd heeft)"],
            ]),
            content: new Map([
                ['nl', 'todo']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 300
            }
        })
    }

    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoeveel schoolverzuim heeft je kind het laatste half jaar ongeveer gehad?"],
            ]),
            content: new Map([
                ['nl', 'todo']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 300
            }
        })
    }
}

/**
 * Pijn en verzuim [kids-VAS-pain-vanaf8jaar] [afnemen bij leeftijd 8-<18jr]
 */
class Q19Group extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Q19';
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
TODO: Intro Pijn en verzuim [kids-VAS-pain-vanaf8jaar] [afnemen bij leeftijd 8-<18jr]
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericSlider({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Beoordeel je reukvermogen OP DIT MOMENT"],
            ]),
            questionSubText: new Map([
                ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
            ]),
            sliderLabel: new Map([
                ["nl", "Jouw selectie:"],
            ]),
            noResponseLabel: new Map([
                ["nl", "Beweeg de slider om je antwoord te geven"],
            ]),
            min: 0,
            max: 100,
        });
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is het aantal lesuren per week  dat geroosterd is voor kinderen uit de klas van je kind?"],
            ]),
            content: new Map([
                ['nl', 'hours']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 300
            }
        })
    }


    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Aantal lesuren in de afgelopen 2 (!) weken dat je kind gevolgd heeft)"],
            ]),
            content: new Map([
                ['nl', 'todo']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 300
            }
        })
    }

    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoeveel schoolverzuim heeft je kind het laatste half jaar ongeveer gehad?"],
            ]),
            content: new Map([
                ['nl', 'todo']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 300
            }
        })
    }
}

