import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { datePickerKey, responseGroupKey, singleChoiceKey } from "../../../../editor-engine/utils/key-definitions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class DemographieGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'DEM';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        const Q_Age = q_age(this.key, true);
        const Q_gender = q_gender(this.key, true);
        this.addItem(Q_Age)
        this.addItem(Q_gender)
        this.addItem(q_postal_code(this.key, true))

        const Q_pregnancy = Q3(this.key, Q_gender.key, Q_Age.key, true);
        this.addItem(Q_pregnancy)
        this.addItem(Q4(this.key, Q_pregnancy.key, true))

        this.addItem(Q5(this.key, true))
        this.addItem(Q6(this.key, true))
        this.addItem(Q7(this.key, true))

        const q11Condition = expWithArgs('gt', 10, 1);
        this.addItem(new Q12Group(this.key, q11Condition).getItem());
    }
}

const q_age = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        dateInputMode: 'YM',
        questionText: new Map([
            ["nl", "Wat is je geboortemaand en jaar?"],
        ]),
        minRelativeDate: {
            years: -110
        },
        maxRelativeDate: {
            years: -10
        },
        isRequired: isRequired,
    });
}

const q_gender = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat is je geslacht?"],
        ]),
        responseOptions: [
            {
                key: 'M', role: 'option',
                content: new Map([
                    ["nl", "Man"],
                ])
            },
            {
                key: 'F', role: 'option',
                content: new Map([
                    ["nl", "Vrouw"],
                ])
            },
            {
                key: 'other', role: 'option',
                content: new Map([
                    ["nl", "Anders"],
                ])
            },
        ]
    })
}

const q_postal_code = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'PC';
    const fullKey = [parentKey, itemKey].join('.');

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat zijn de 4 cijfers van je postcode?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'input',
                // style: [{ key: 'className', value: 'w-100' }],
                content: new Map([
                    ["nl", "Postcode"],
                ]),
                description: new Map([
                    ["nl", "de eerste vier cijfers"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Dit wil ik niet aangeven"],
                ])
            },
        ],
        bottomDisplayCompoments: [
            {
                role: 'error',
                content: generateLocStrings(new Map([
                    ["nl", "Voer de eerste vier cijfers van je postcode in"],
                ])),
                displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
            }
        ],
        customValidations: [
            {
                key: 'r2',
                type: 'hard',
                rule: expWithArgs('or',
                    expWithArgs('not', expWithArgs('hasResponse', fullKey, responseGroupKey)),
                    expWithArgs('checkResponseValueWithRegex', fullKey, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9][0-9][0-9][0-9]$'),
                    expWithArgs('responseHasKeysAny', fullKey, [responseGroupKey, singleChoiceKey].join('.'), '1')
                )
            }
        ]
    })
}


const Q3 = (parentKey: string, keyQGender: string, keyQBirthday: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';

    const condition = expWithArgs('and',
        CommonExpressions.singleChoiceOptionsSelected(keyQGender, 'F'),

        expWithArgs('gte',
            expWithArgs('dateResponseDiffFromNow', keyQBirthday, [responseGroupKey, datePickerKey].join('.'), 'years', 1),
            14
        ),
        expWithArgs('lte',
            expWithArgs('dateResponseDiffFromNow', keyQBirthday, [responseGroupKey, datePickerKey].join('.'), 'years', 1),
            45
        ),
    )

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["nl", "Ben je op dit moment zwanger?"],
        ]),
        responseOptions: [
            {
                key: 'yes', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
            {
                key: 'no', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Dit weet ik niet/wil ik liever niet aangeven"],
                ])
            },
        ]
    })
}

const Q4 = (parentKey: string, keyQPregnancy: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';

    const condition = CommonExpressions.singleChoiceOptionsSelected(keyQPregnancy, 'yes');

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["nl", "In welk trimester ben je van je zwangerschap?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Eerste trimester (week 1-12)"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Tweede trimester (week 13-28)"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Derde trimester (week 29 tot bevalling)"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Dit weet ik niet / wil ik niet aangeven"],
                ])
            },
        ]
    })
}


const Q5 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5';

    return SurveyItemGenerators.numericInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Hoeveel kilo weeg je zonder kleren? (afronden op hele kilo's)"],
        ]),
        topDisplayCompoments: [{
            key: 'expl',
            role: 'text',
            content: generateLocStrings(new Map([
                ['nl', 'Indien je zwanger bent, hier graag je gewicht van vóór de zwangerschap invullen.']
            ])),
            style: [{ key: 'className', value: 'mb-2' }]
        }],
        content: new Map([
            ['nl', 'kg']
        ]),
        contentBehindInput: true,
        componentProperties: {
            min: 0,
            max: 300
        }
    })
}

const Q6 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';

    return SurveyItemGenerators.numericInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Hoe lang ben je? (zonder schoenen aan)"],
        ]),
        content: new Map([
            ['nl', 'cm']
        ]),
        contentBehindInput: true,
        componentProperties: {
            min: 0,
            max: 250
        }
    })
}

const Q7 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q7';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Rook je?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'eerder', role: 'option',
                content: new Map([
                    ["nl", "Nee, maar ik heb in het verleden wel gerookt"],
                ])
            },
            {
                key: 'afentoe', role: 'option',
                content: new Map([
                    ["nl", "Ja, af en toe"],
                ])
            },
            {
                key: 'minder10', role: 'option',
                content: new Map([
                    ["nl", "Dagelijks, minder dan 10 sigaretten/sigaren per dag"],
                ])
            },
            {
                key: 'meer10', role: 'option',
                content: new Map([
                    ["nl", "Dagelijks, 10 keer of vaker per dag"],
                ])
            },
            {
                key: 'esigaret', role: 'option',
                content: new Map([
                    ["nl", "Ja, alleen e-sigaretten"],
                ])
            },
        ]

    })
}



class Q12Group extends GroupItemEditor {
    constructor(parentKey: string, condition: Expression, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'DEM';
        super(parentKey, groupKey);
        this.groupEditor.setCondition(condition)
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_12a(this.key, true))
        this.addItem(q_12b(this.key, true))
        //TODO: Add following questions.
    }
}

const q_12a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'a';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Q12a?"],
        ]),
        responseOptions: []
    });
}

const q_12b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'b';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Q12b?"],
        ]),
        responseOptions: []
    });
}
