import { SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class PrehistoryGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'PRE';
        super(parentKey, groupKey);

        this.initQuestions();
    }

    initQuestions() {
        const isRequired = true;
        this.addItem(Q_instructions(this.key));
        this.addItem(Q1a(this.key, isRequired));
        this.addItem(Q1b(this.key, isRequired));
        this.addItem(Q1c(this.key, isRequired));
        this.addItem(Q1d(this.key, isRequired));
        this.addItem(Q2(this.key, isRequired));
        this.addPageBreak();
    }
}

const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Voorgeschiedenis
`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ["nl", markdownContent],
                ]),
                className: 'mb-n1'
            })
        ]
    });
}

const Q1a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1a';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Heb je ooit last gehad van angstklachten?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'ja', role: 'dateInput',
                content: new Map([
                    ["nl", "Ja, voor het laatst in het jaar: (kies jaartal)"],
                ]),
                optionProps: {
                    dateInputMode: { str: 'Y' },
                    min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -3311280000) },
                    max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
                }
            },
        ],
        isRequired: isRequired,
    });
}

const Q1b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1b';

    const optionsDisabled = CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), 'nee');

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Ben je voor deze angstklachten behandeld?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),

        responseOptions: [
            {
                key: 'nee', role: 'option',
                disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), 'nee'),
                content: new Map([
                    ["nl", "Nee"],
                ])
            }, {
                key: '1', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, door een psychiater"],
                ])
            }, {
                key: '2', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, door een psycholoog"],
                ])
            }, {
                key: '3', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, door een maatschappelijk werker"],
                ])
            }, {
                key: '4', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, maar niet door een psychiater, psycholoog of maatschappelijk werker"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const Q1c = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1c';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Heb je ooit last gehad van depressieve klachten?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'ja', role: 'dateInput',
                content: new Map([
                    ["nl", "Ja, voor het laatst in het jaar: (kies jaartal)"],
                ]),
                optionProps: {
                    dateInputMode: { str: 'Y' },
                    min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -3311280000) },
                    max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
                }
            },
        ],
        isRequired: isRequired,
    });
}

const Q1d = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1d';

    const optionsDisabled = CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), 'nee');

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Ben je voor deze depressieve klachten behandeld?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),

        responseOptions: [
            {
                key: 'nee', role: 'option',
                disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), 'nee'),
                content: new Map([
                    ["nl", "Nee"],
                ])
            }, {
                key: '1', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, door een psychiater"],
                ])
            }, {
                key: '2', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, door een psycholoog"],
                ])
            }, {
                key: '3', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, door een maatschappelijk werker"],
                ])
            }, {
                key: '4', role: 'option',
                disabled: optionsDisabled,
                content: new Map([
                    ["nl", "Ja, maar niet door een psychiater, psycholoog of maatschappelijk werker"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const Q2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'CBS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "De 4 vragen hieronder bestaan uit vragen die betrekking hebben op de 3 maanden voordat je de klachten kreeg die (mogelijk) door corona komen (of als je geen klachten door corona hebt gehad, de 3 maanden voordat je startte met het onderzoek)."],
        ]),
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
                ])
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
            },
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
                            ['nl', 'Geef aan op een schaal van 0 (niet vermoeid) tot 10 (ernstig vermoeid)']
                        ]),
                        className: "fst-italic mb-1"
                    }),
                ]
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Hoe ernstig waren je klachten met betrekking tot jouw mentaal functioneren (concentratiezwakte, vergeetachtigheid, moeilijk op woorden komen of meerdere dingen tegelijkertijd doen)?"],
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
