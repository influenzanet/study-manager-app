import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { datePickerKey, numericInputKey, responseGroupKey, singleChoiceKey } from "../../../../editor-engine/utils/key-definitions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class DemographieGroup extends GroupItemEditor {

    constructor(parentKey: string, getAgeInYearsExpression: Expression, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'DEM';
        super(parentKey, groupKey);
        this.initQuestions(getAgeInYearsExpression);
    }

    initQuestions(getAgeInYearsExpression: Expression) {

        const Q_gender = q_gender(this.key, true);
        this.addItem(Q_gender)


        const showQPregnancy = expWithArgs('and',
            CommonExpressions.singleChoiceOptionsSelected(Q_gender.key, 'F'),
            expWithArgs('gte',
                getAgeInYearsExpression,
                14
            ),
            expWithArgs('lte',
                getAgeInYearsExpression,
                45
            ),
        )

        const Q_pregnancy = Q3(this.key, Q_gender.key, showQPregnancy, true);
        this.addItem(Q_pregnancy)

        const showQTrimester = CommonExpressions.singleChoiceOptionsSelected(Q_pregnancy.key, 'yes');
        this.addItem(Q4(this.key, showQTrimester, true))

        this.addItem(Q5(this.key, true))
        this.addItem(Q6(this.key, true))
        this.addItem(Q7(this.key, true))
        this.addItem(Q8(this.key, true))
        this.addItem(Q9(this.key, true))
        this.addItem(Q10(this.key, true))

        const nrOfPersons = Q11(this.key, true);
        this.addItem(Q11(this.key, true))

        const q12Condition = expWithArgs('gt',
            expWithArgs('getAttribute',
                expWithArgs('getResponseItem', nrOfPersons.key, [responseGroupKey, numericInputKey].join('.')),
                'value'
            ),
            1
        );
        this.addItem(Q12(this.key, q12Condition, true))
    }
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


const Q3 = (parentKey: string, keyQGender: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';

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

const Q4 = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';

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


const Q8 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q8';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat is je geboorteland?"],
        ]),
        responseOptions: [
            {
                key: 'nl', role: 'option',
                content: new Map([
                    ["nl", "Nederland"],
                ])
            },
            {
                key: 'anders', role: 'input',
                content: new Map([
                    ["nl", "Anders, namelijk"],
                ])
            },
        ]
    });
}


const Q9 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q9';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat is het geboorteland van je moeder?"],
        ]),
        responseOptions: [
            {
                key: 'nl', role: 'option',
                content: new Map([
                    ["nl", "Nederland"],
                ])
            },
            {
                key: 'anders', role: 'input',
                content: new Map([
                    ["nl", "Anders, namelijk"],
                ])
            },
        ]
    });
}

const Q10 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q10';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat is het geboorteland van je vader?"],
        ]),
        responseOptions: [
            {
                key: 'nl', role: 'option',
                content: new Map([
                    ["nl", "Nederland"],
                ])
            },
            {
                key: 'anders', role: 'input',
                content: new Map([
                    ["nl", "Anders, namelijk"],
                ])
            },
        ]
    });
}

const Q11 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q11';

    return SurveyItemGenerators.numericInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Met hoeveel andere mensen woon je samen?"],
        ]),
        questionSubText: new Map([
            ["nl", "jezelf meegeteld en inclusief kinderen, iedereen meetellen waarmee je algemene ruimtes deelt als woonkamer, keuken, toilet en/of badkamer"],
        ]),
        content: new Map([
            ['nl', 'Nr.:']
        ]),
        componentProperties: {
            min: 0,
            max: 20
        }
    });
}


const Q12 = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q12';

    const inputProperties = {
        min: 1,
        max: 50
    };
    const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoe oud zijn de mensen met wie je samen woont?"],
        ]),
        questionSubText: new Map([
            ["nl", "Noteer achter de leeftijdsgroepen hoeveel van je huisgenoten deze leeftijd hebben."],
        ]),
        responseOptions: [
            {
                key: 'a', role: 'numberInput',
                content: new Map([
                    ["nl", "<4 jaar"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: 'b', role: 'numberInput',
                content: new Map([
                    ["nl", "4-12 jaar"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: 'c', role: 'numberInput',
                content: new Map([
                    ["nl", "13-18 jaar"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: 'd', role: 'numberInput',
                content: new Map([
                    ["nl", "19-25 jaar"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            }, {
                key: 'e', role: 'numberInput',
                content: new Map([
                    ["nl", "26-50 jaar"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            }, {
                key: 'f', role: 'numberInput',
                content: new Map([
                    ["nl", "51-65 jaar"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            }, {
                key: 'g', role: 'numberInput',
                content: new Map([
                    ["nl", "vanaf 65 jaar"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
        ]
    });
}


