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
    // TODO add intro text
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "Heb je in de afgelopen 3 maanden contact gehad met een zorgverlener voor klachten die te maken hebben met het coronavirus?"],
            ]), // TODO how to make "afgelopen 3 maanden" boldface?
            responseOptions: [
                {
                    key: 'ja', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ])
                },
                {
                    key: 'nee', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    //TODO there should be a condition that if a key is selected, the numberInput cannot be 0
    //TODO can the input box be directly behind the text and have a text after the box? E.g. Huisarts <box> keer
    //TODO how to get an umlaut in the text? e.g. di\"etist does not work
    Q3(itemKey: string, condition: Expression, isRequired: boolean) {
        const inputProperties = {
                min: 1,
                max: 365
            };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "Met welke zorgverleners heb je contact gehad voor klachten die te maken hebben met het coronavirus in de afgelopen 3 maanden? En hoe vaak?"],
            ]),
            responseOptions: [
                {
                    key: 'huisarts', role: 'numberInput',
                    content: new Map([
                        ["nl", "Huisarts"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'kinderarts', role: 'numberInput',
                    content: new Map([
                        ["nl", "Kinderarts"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'dietist', role: 'numberInput',
                    content: new Map([
                        ["nl", "Di\"etist"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'ergotherapeut', role: 'numberInput',
                    content: new Map([
                        ["nl", "Ergotherapeut"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'fysiotherapeut', role: 'numberInput',
                    content: new Map([
                        ["nl", "Fysiotherapeut"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'homeopaat', role: 'numberInput',
                    content: new Map([
                        ["nl", "Homeopaat"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'logopedist', role: 'numberInput',
                    content: new Map([
                        ["nl", "Logopedist"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'maatschappelijk-werker', role: 'numberInput',
                    content: new Map([
                        ["nl", "Maatschappelijk werker"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'psycholoog', role: 'numberInput',
                    content: new Map([
                        ["nl", "Psycholoog"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'anders', role: 'numberInput',
                    content: new Map([
                        ["nl", "Andere zorgverlener of specialist, namelijk"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
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
                ["nl", "Heb je in de afgelopen 3 maanden contact gehad met een zorgverlener anders dan voor corona?"],
            ]), //TODO **afgelopen 3 maanden** in boldface
            questionSubText: new Map([
                ["nl", "Met zorgverleners bedoelen wij je huisarts, specialist, fysiotherapeut, psycholoog, maatschappelijk werker, homeopaat, logopedist of andere arts, therapeut of zorgconsulent."],
            ]),
            responseOptions: [
                {
                    key: 'ja', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ])
                },
                {
                    key: 'nee', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
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
    // TODO text above question
    // De vragen hieronder zijn gericht aan een minderjarige.
    // Bent u een ouder/verzorger dan kunt u de antwoorden invullen voor/over uw kind.
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "Merk je OP DIT MOMENT een van de onderstaande veranderingen in je reuk- of smaakvermogen? (Selecteer alles dat van toepassing is)"],
            ]),
            responseOptions: [
                {
                    key: 'normaal', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb een normaal reuk/smaakvermogen"],
                    ])
                },
                {
                    key: 'niet', role: 'option',
                    content: new Map([
                        ["nl", "Ik kan helemaal niet ruiken/proeven"],
                    ])
                },
                {
                    key: 'minder', role: 'option',
                    content: new Map([
                        ["nl", "Geuren en/of smaken zijn minder sterk dan voorheen "],
                    ])
                },
                {
                    key: 'anders', role: 'option',
                    content: new Map([
                        ["nl", "Geuren en/of smaken zijn anders dan voorheen (de kwaliteit van de geur en/of smaak is veranderd) "],
                    ])
                },
                {
                    key: 'afwezig', role: 'option',
                    content: new Map([
                        ["nl", "Ik kan dingen ruiken of proeven die er niet zijn (bijvoorbeeld ik ruik een brandlucht terwijl er niets in brand staat) "],
                    ])
                },
                {
                    key: 'varieert', role: 'option',
                    content: new Map([
                        ["nl", "Reuk- en/of smaakvermogen varieert (het komt en het gaat)"],
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
De vragen hieronder zijn voor een ouder/verzorger.

Op deze pagina staat een lijst van dingen die een probleem kunnen zijn voor je kind.
Kun je ons vertellen hoe vaak je kind in de afgelopen week met elk van deze dingen problemen heeft gehad? Vink het bolletje aan bij:

0 als het nooit een probleem is,

1 als het bijna nooit een probleem is,

2 als het soms een probleem is,

3 als het vaak een probleem is,

4 als het bijna altijd een probleem is.

Er zijn geen goede of foute antwoorden.

### Hoe vaak heeft je kind in de afgelopen week problemen gehad met:
                        `]
                    ])
                }),
               ]
        })
    }
    //TODO The last sentence of above text should be in separate text box
    // Hoe vaak heeft je kind in de afgelopen week problemen gehad met:

    Q81(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Lichamelijk functioneren (problemen met ...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ])) // TODO the above text as column names?
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Meer dan één straat op en neer lopen"],
                    ])
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Rennen"],
                    ])
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Deelnemen aan sportactiviteiten of lichamelijke oefeningen"],
                    ])
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Iets zwaars optillen "],
                    ])
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Zelfstandig een bad of douche nemen"],
                    ])
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "  Karweitjes doen, zoals het opruimen van zijn / haar speelgoed"],
                    ])
                },
                {
                    key: 'g', content: new Map([
                        ["nl", "Het hebben van wondjes of pijn"],
                    ])
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Weinig energie hebben"],
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
                ["nl", "Emotioneel functioneren (problemen met ...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'i', content: new Map([
                        ["nl", "Zich angstig of bang voelen"],
                    ])
                },
                {
                    key: 'j', content: new Map([
                        ["nl", "Zich verdrietig of somber voelen"],
                    ])
                },
                {
                    key: 'k', content: new Map([
                        ["nl", "Zich boos voelen"],
                    ])
                },
                {
                    key: 'l', content: new Map([
                        ["nl", "Moeite met slapen"],
                    ])
                },
                {
                    key: 'm', content: new Map([
                        ["nl", "Zorgen maken over wat hem/haar zal overkomen"],
                    ])
                },
            ]
        });
    }

// L4q8n - L4q8r
    Q83(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Sociaal Functioneren (problemen met ...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'n', content: new Map([
                        ["nl", "Op kunnen schieten met andere kinderen"],
                    ])
                },
                {
                    key: 'o', content: new Map([
                        ["nl", "Andere kinderen willen zijn/ haar vriend(in) niet zijn"],
                    ])
                },
                {
                    key: 'p', content: new Map([
                        ["nl", "Gepest worden door andere kinderen"],
                    ])
                },
                {
                    key: 'q', content: new Map([
                        ["nl", "Kan bepaalde dingen niet die andere kinderen van zijn/ haar leeftijd wel kunnen"],
                    ])
                },
                {
                    key: 'r', content: new Map([
                        ["nl", "Mee kunnen blijven doen tijdens het spelen met andere kinderen"],
                    ])
                },
            ]
        });
    }
// L4q8s-L4q8w
    Q84(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "School functioneren (problemen met ...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 's', content: new Map([
                        ["nl", "Opletten tijdens de les"],
                    ])
                },
                {
                    key: 't', content: new Map([
                        ["nl", "Dingen vergeten"],
                    ])
                },
                {
                    key: 'u', content: new Map([
                        ["nl", "Bijblijven met schoolwerk"],
                    ])
                },
                {
                    key: 'v', content: new Map([
                        ["nl", "Niet naar school gaan vanwege niet lekker voelen"],
                    ])
                },
                {
                    key: 'w', content: new Map([
                        ["nl", "Niet naar school gaan om naar de dokter of het ziekenhuis te moeten"],
                    ])
                },
            ]
        });
    }
}

/**
 *
 */
//  Functioneren [kids-Pedsql versie 8-12] [afnemen bij leeftijd 8-<13jr]
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
LET OP: De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan je kind zelf de antwoorden kiezen.

Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn.

Kun je ons vertellen hoe vaak je in de afgelopen week met elk van deze dingen problemen hebt gehad? Vink het bolletje aan bij:

0 als het nooit een probleem is,

1 als het bijna nooit een probleem is,

2 als het soms een probleem is,

3 als het vaak een probleem is,

4 als het bijna altijd een probleem is.

Er zijn geen goede of foute antwoorden.

### Hoe vaak heb je in de afgelopen week problemen gehad met:
                        `]
                    ])
                })]
        })
    }
// L4q9a-L4q9h
    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Over mijn gezondheid en activiteiten (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Het is voor mij moeilijk om meer dan één straat op en neer te lopen"],
                    ])
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Het is voor mij moeilijk om te rennen"],
                    ])
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Het is voor mij moeilijk om te sporten of lichamelijke oefeningen te doen"],
                    ])
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Het is voor mij moeilijk om iets zwaars op te tillen"],
                    ])
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Het is voor mij moeilijk om zelfstandig een bad of douche te nemen"],
                    ])
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Het is voor mij moeilijk om karweitjes rond het huis te doen"],
                    ])
                },
                {
                    key: 'g', content: new Map([
                        ["nl", "Ik heb wondjes of pijn"],
                    ])
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Ik heb weinig energie"],
                    ])
                },

            ]
        });
    }

// L4q9j - L4q9m
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Over mijn gevoelens (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'i', content: new Map([
                        ["nl", "Ik voel me angstig of bang"],
                    ])
                },
                {
                    key: 'j', content: new Map([
                        ["nl", "Ik voel me verdrietig of somber"],
                    ])
                },
                {
                    key: 'k', content: new Map([
                        ["nl", "Ik voel me boos"],
                    ])
                },
                {
                    key: 'l', content: new Map([
                        ["nl", "Ik heb moeite met slapen"],
                    ])
                },
                {
                    key: 'm', content: new Map([
                        ["nl", "Ik maak me zorgen over wat mij zal overkomen"],
                    ])
                },
            ]
        });
    }

//L4q9n - L4q9r
    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoe ik met anderen op kan schieten (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'n', content: new Map([
                        ["nl", "Ik heb problemen om met andere kinderen op te schieten"],
                    ])
                },
                {
                    key: 'o', content: new Map([
                        ["nl", "Andere kinderen willen mijn vriend(in) niet zijn"],
                    ])
                },
                {
                    key: 'p', content: new Map([
                        ["nl", "Andere kinderen pesten mij"],
                    ])
                },
                {
                    key: 'q', content: new Map([
                        ["nl", "Ik kan bepaalde dingen niet die andere kinderen van mijn leeftijd wel kunnen"],
                    ])
                },
                {
                    key: 'r', content: new Map([
                        ["nl", "Het is moeilijk mee te kunnen blijven doen als ik met andere kinderen speel"],
                    ])
                },
            ]
        });
    }

// L4q9s - L4q9w
    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Over school (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 's', content: new Map([
                        ["nl", "Het is moeilijk om op te letten tijdens de les"],
                    ])
                },
                {
                    key: 't', content: new Map([
                        ["nl", "Ik vergeet dingen"],
                    ])
                },
                {
                    key: 'u', content: new Map([
                        ["nl", "Ik heb moeite om mijn huiswerk bij te houden"],
                    ])
                },
                {
                    key: 'v', content: new Map([
                        ["nl", "Ik ga niet naar school, omdat ik me niet lekker voel"],
                    ])
                },
                {
                    key: 'w', content: new Map([
                        ["nl", "Ik ga niet naar school, omdat ik naar de dokter of het ziekenhuis moet"],
                    ])
                },
            ]
        });
    }
}

/**
 * Functioneren [kids-Pedsql versie 13-18] [afnemen bij leeftijd 13-<18jr]
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
LET OP: De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan je kind zelf de antwoorden kiezen.

Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn.

Kun je ons vertellen hoe vaak je in de afgelopen week met elk van deze dingen problemen hebt gehad? Vink het bolletje aan bij:

0 als het nooit een probleem is,

1 als het bijna nooit een probleem is,

2 als het soms een probleem is,

3 als het vaak een probleem is,

4 als het bijna altijd een probleem is.

Er zijn geen goede of foute antwoorden.

### Hoe vaak heb je in de afgelopen week problemen gehad met:
                        `]
                    ])
                })]
        })
    }

// L4q10a - L4q10h
    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Over mijn gezondheid en activiteiten (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Het is voor mij moeilijk om meer dan één straat op en neer te lopen"],
                    ])
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Het is voor mij moeilijk om te rennen"],
                    ])
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Het is voor mij moeilijk om te sporten of lichamelijke oefeningen te doen"],
                    ])
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Het is voor mij moeilijk om iets zwaars op te tillen"],
                    ])
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Het is voor mij moeilijk om zelfstandig een bad of douche te nemen"],
                    ])
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Het is voor mij moeilijk om karweitjes rond het huis te doen"],
                    ])
                },
                {
                    key: 'g', content: new Map([
                        ["nl", "Ik heb wondjes of pijn"],
                    ])
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Ik heb weinig energie"],
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
                ["nl", "Over mijn gevoelens (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'i', content: new Map([
                        ["nl", "Ik voel me angstig of bang"],
                    ])
                },
                {
                    key: 'j', content: new Map([
                        ["nl", "Ik voel me verdrietig of somber"],
                    ])
                },
                {
                    key: 'k', content: new Map([
                        ["nl", "Ik voel me boos"],
                    ])
                },
                {
                    key: 'l', content: new Map([
                        ["nl", "Ik heb moeite met slapen"],
                    ])
                },
                {
                    key: 'm', content: new Map([
                        ["nl", "Ik maak me zorgen over wat mij zal overkomen"],
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
                ["nl", "TODO: Hoe ik met anderen op kan schieten (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'n', content: new Map([
                        ["nl", "Ik heb problemen om met andere tieners op te schieten"],
                    ])
                },
                {
                    key: 'o', content: new Map([
                        ["nl", "Andere tieners willen mijn vriend(in) niet zijn"],
                    ])
                },
                {
                    key: 'p', content: new Map([
                        ["nl", "Andere tieners pesten mij"],
                    ])
                },
                {
                    key: 'q', content: new Map([
                        ["nl", "Ik kan bepaalde dingen niet die andere tieners van mijn leeftijd wel kunnen"],
                    ])
                },
                {
                    key: 'r', content: new Map([
                        ["nl", "Het is moeilijk om mee te kunnen blijven doen met mijn leeftijdsgenoten	"],
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
                ["nl", "Over school (problemen met ... )"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 's', content: new Map([
                        ["nl", "Het is moeilijk om op te letten tijdens de les"],
                    ])
                },
                {
                    key: 't', content: new Map([
                        ["nl", "Ik vergeet dingen"],
                    ])
                },
                {
                    key: 'u', content: new Map([
                        ["nl", "Ik heb moeite om mijn huiswerk bij te houden"],
                    ])
                },
                {
                    key: 'v', content: new Map([
                        ["nl", "Ik ga niet naar school, omdat ik me niet lekker voel"],
                    ])
                },
                {
                    key: 'w', content: new Map([
                        ["nl", "Ik ga niet naar school, omdat ik naar de dokter of het ziekenhuis moet"],
                    ])
                },
            ]
        });
    }
}

/**
 * Vermoeidheid [Pedsql-fatigue versie 5-7] [afnemen bij leeftijd 5-<8jr]
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
De vragen hieronder zijn voor een ouder/verzorger.

Op deze pagina staat een lijst van dingen die een probleem kunnen zijn voor je kind.

Kun je ons vertellen hoezeer je kind in de afgelopen week met elk van deze dingen een probleem heeft gehad?

Klik het bolletje aan bij het antwoord dat het beste van toepassing is. Je kunt kiezen uit:

0 als het nooit een probleem is

1 als het bijna nooit een probleem is

2 als het soms een probleem is

3 als het vaak een probleem is

4 als het bijna altijd een probleem is

Er zijn geen goede of foute antwoorden.

### Hoezeer heeft je kind in de afgelopen week een probleem gehad met:
                        `]
                    ])
                })]
        })
    }

// L4q11a -L4q11f
    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Algemene vermoeidheid (problemen met...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Moe voelen"],
                    ])
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Lichamelijk zwak voelen (niet sterk)"],
                    ])
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Te moe voelen om dingen te doen die hij/zij leuk vindt"],
                    ])
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Te moe voelen om tijd door te brengen met zijn/haar vrienden"],
                    ])
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Moeite om dingen af te maken"],
                    ])
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Moeite om aan dingen te beginnen"],
                    ])
                },
            ]
        });
    }

// L411g - L4q11l
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Slaap/Rust vermoeidheid (problemen met...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'g', content: new Map([
                        ["nl", "Veel slapen"],
                    ])
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Moeite om de nacht door te slapen"],
                    ])
                },
                {
                    key: 'i', content: new Map([
                        ["nl", "Moe voelen wanneer hij/zij 's ochtends wakker wordt"],
                    ])
                },
                {
                    key: 'j', content: new Map([
                        ["nl", "Veel rusten"],
                    ])
                },
                {
                    key: 'k', content: new Map([
                        ["nl", "Veel dutjes doen"],
                    ])
                },
                {
                    key: 'l', content: new Map([
                        ["nl", "Veel tijd in bed doorbrengen "],
                    ])
                },
            ]
        });
    }

// L4q12m - L4q12r
    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Cognitieve vermoeidheid (problemen met...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'm', content: new Map([
                        ["nl", "Moeite om zijn/haar aandacht bij dingen te houden"],
                    ])
                },
                {
                    key: 'n', content: new Map([
                        ["nl", "Moeite om te onthouden wat mensen hem/haar vertellen"],
                    ])
                },
                {
                    key: 'o', content: new Map([
                        ["nl", "Moeite om te onthouden wat hij/zij net gehoord heeft"],
                    ])
                },
                {
                    key: 'p', content: new Map([
                        ["nl", "Moeite met snel denken"],
                    ])
                },
                {
                    key: 'q', content: new Map([
                        ["nl", "Moeite te onthouden waar hij/zij net aan dacht"],
                    ])
                },
                {
                    key: 'r', content: new Map([
                        ["nl", "Moeite om meer dan één ding tegelijk te onthouden"],
                    ])
                },
            ]
        });
    }
}


/**
 * Vermoeidheid [Pedsql-fatigue versie 8-12] [afnemen bij leeftijd 8-<13jr]
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
De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan je kind zelf de antwoorden kiezen.

Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn.

Kun je ons vertellen hoezeer elk ding voor jou een probleem is geweest in de afgelopen week, door op het bolletje te klikken bij:

0 als het nooit een probleem is

1 als het bijna nooit een probleem is

2 als het soms een probleem is

3 als het vaak een probleem is

4 als het bijna altijd een probleem is

Er zijn geen goede of foute antwoorden.

### Hoezeer is dit voor jou in de afgelopen week een probleem geweest:
                        `]
                    ])
                })]
        })
    }

// L4q13a - L4q13f
    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Algemene vermoeidheid (problemen met...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'a', content: new Map([
                        ["nl", "Ik voel me moe"],
                    ])
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Ik voel me lichamelijk zwak (niet sterk)"],
                    ])
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Ik voel me te moe om dingen te doen die ik leuk vind"],
                    ])
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Ik voel me te moe om tijd met mijn vrienden door te brengen"],
                    ])
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Ik vind het lastig dingen af te maken"],
                    ])
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Ik vind het lastig dingen te beginnen"],
                     ])
                },
            ]
        });
    }

// L4q13g - L4q13l
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Slaap/Rust vermoeidheid (problemen met...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'g', content: new Map([
                        ["nl", "Ik slaap veel"],
                    ])
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Het is moeilijk voor me om ‘s nachts door te slapen"],
                    ])
                },
                {
                    key: 'i', content: new Map([
                        ["nl", "Ik voel me moe als ik ‘s ochtends wakker word"],
                    ])
                },
                {
                    key: 'j', content: new Map([
                        ["nl", "Ik rust veel"],
                    ])
                },
                {
                    key: 'k', content: new Map([
                        ["nl", "Ik doe veel dutjes"],
                    ])
                },
                {
                    key: 'l', content: new Map([
                        ["nl", "Ik breng veel tijd door in bed "],
                    ])
                },
            ]
        });
    }

// L4q13m - L4q13r
    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Cognitieve vermoeidheid (problemen met...)"],
            ]),
            topDisplayCompoments: [{
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "TODO: 0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak , 4 = Bijna altijd"],
                ]))
            }],
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                }, {
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
                    ]),
                }, {
                    key: '4', content: new Map([
                        ["nl", "4"],
                    ])
                },
            ],
            rows: [
                {
                    key: 'm', content: new Map([
                        ["nl", "Ik heb moeite mijn aandacht bij dingen te houden"],
                    ])
                },
                {
                    key: 'n', content: new Map([
                        ["nl", "Het is moeilijk voor me te onthouden wat mensen me vertellen"],
                    ])
                },
                {
                    key: 'o', content: new Map([
                        ["nl", "Het is moeilijk voor me te onthouden wat ik net gehoord heb"],
                    ])
                },
                {
                    key: 'p', content: new Map([
                        ["nl", "Het is moeilijk voor me om snel te denken"],
                    ])
                },
                {
                    key: 'q', content: new Map([
                        ["nl", "Ik vind het lastig om te onthouden waar ik net aan dacht"],
                    ])
                },
                {
                    key: 'r', content: new Map([
                        ["nl", "Ik vind het lastig om meer dan één ding tegelijk te onthouden "],
                    ])
                },
            ]
        });
    }
}


/**
 * Vermoeidheid [Pedsql-fatigue versie 13-18] [afnemen bij leeftijd 13-<18jr]
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
De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan je kind zelf de antwoorden kiezen.

Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn.

Kun je ons vertellen hoezeer elk ding voor jou een probleem is geweest in de afgelopen week, door op het bolletje te klikken bij:

0 als het nooit een probleem is

1 als het bijna nooit een probleem is

2 als het soms een probleem is

3 als het vaak een probleem is

4 als het bijna altijd een probleem is

Er zijn geen goede of foute antwoorden.

### Hoezeer is dit voor jou in de afgelopen week een probleem geweest:
                        `]
                    ])
                })]
        })
    }
// L4q13a - L4q13f
    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Algemene vermoeidheid (problemen met...)"],
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

// L4q13q - L4q13l
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Slaap/Rust vermoeidheid (problemen met...)"],
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

// L4q13m-L4q13r
    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Cognitieve vermoeidheid (problemen met...)"],
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
                ["nl", "Hoe veel pijn heeft uw kind gehad de afgelopen week ? Plaats het blokje op de lijn waar die het best de ernst de pijn van uw kind weergeeft ."],
            ]),
            questionSubText: new Map([
                ["nl", "0 = geen pijn, 10 = veel pijn"],
            ]),
            sliderLabel: new Map([
                ["nl", "Jouw selectie:"],
            ]),
            noResponseLabel: new Map([
                ["nl", "Beweeg de slider om je antwoord te geven"],
            ]),
            min: 0,
            max: 10, // TODO can the min and max have a label in the slider?
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
                ['nl', 'uur']
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
                ['nl', 'uur']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 80
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
                ['nl', 'dagen']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 180
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
                ["nl", "Deze vraag gaat over of je de afgelopen week pijn hebt gehad: Plaats het blokje op de lijn waar die het best de ernst van jouw pijn weergeeft. Hoe veel pijn heb je gehad de afgelopen week?"],
            ]),
            questionSubText: new Map([
                ["nl", "0 = geen pijn, 10 = veel pijn"],
            ]),
            sliderLabel: new Map([
                ["nl", "Jouw selectie:"],
            ]),
            noResponseLabel: new Map([
                ["nl", "Beweeg de slider om je antwoord te geven"],
            ]),
            min: 0,
            max: 10, // TODO can the min and max have a label in the slider?
        });
    }
// TODO add text  above the following three questionS
// De volgende vragen vraag gaat over de afgelopen twee weken, en kunnen zonodig ook door de ouder/verzorger worden ingevuld:
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is het totaal aantal lesuren per week dat geroosterd stond voor leerlingen uit je klas?"],
            ]),
            content: new Map([
                ['nl', 'uur']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 40
            }
        })
    }


    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Aantal lesuren dat je gevolgd hebt in de afgelopen 2 weken:"],
            ]),
            content: new Map([
                ['nl', 'uur']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 80
            }
        })
    }

    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoeveel schoolverzuim heb je het laatste half jaar ongeveer gehad?"],
            ]),
            content: new Map([
                ['nl', 'dagen']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 180
            }
        })
    }
}

