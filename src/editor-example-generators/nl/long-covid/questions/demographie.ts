import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { numericInputKey, responseGroupKey } from "../../../../editor-engine/utils/key-definitions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../studyRules";

export class DemographieGroup extends GroupItemEditor {

    constructor(parentKey: string, getAgeInYearsExpression?: Expression, testQ11jaCondition?: Expression, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'DEM';
        super(parentKey, groupKey);
        this.initQuestions(getAgeInYearsExpression, testQ11jaCondition);
    }

    initQuestions(
        getAgeInYearsExpression?: Expression,
        testQ11jaCondition?: Expression,
    ) {
        this.addItem(Q_instructions(this.key))

        if (this.isPartOfSurvey(surveyKeys.T0)) {
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
                CommonExpressions.getResponseValueAsNum(nrOfPersons.key, [responseGroupKey, numericInputKey].join('.')),
                1
            );
            this.addItem(Q12(this.key, q12Condition, true));

            this.addItem(Q13(this.key, true))
        }

        const Q14a = gen_Q14a(this.key, testQ11jaCondition, true);
        if (this.isPartOfSurvey(surveyKeys.T0)) { this.addItem(Q14a) }

        const PaidJob = Q14(this.key, true);
        this.addItem(PaidJob)
        let conditionWerkveranderdJa = undefined;
        if (!this.isPartOfSurvey(surveyKeys.T0)) {
            const qwv = Qwerkveranderd(this.key, true)
            conditionWerkveranderdJa = CommonExpressions.singleChoiceOptionsSelected(qwv.key, 'ja');
            this.addItem(qwv)
        }
        const q15 = Q15(this.key, conditionWerkveranderdJa, true)
        this.addItem(q15);

        let qWorkcondition = CommonExpressions.or(
            CommonExpressions.singleChoiceOptionsSelected(PaidJob.key, '1'),
            CommonExpressions.singleChoiceOptionsSelected(Q14a.key, 'ja'),
        )
        if (!this.isPartOfSurvey(surveyKeys.T0)) {
            qWorkcondition = CommonExpressions.and(
                conditionWerkveranderdJa,
                CommonExpressions.or(
                    CommonExpressions.singleChoiceOptionsSelected(PaidJob.key, '1'),
                    CommonExpressions.singleChoiceOptionsSelected(Q14a.key, 'ja'),
                )
            )
        }

        this.addItem(Q16(this.key, qWorkcondition, true))
        this.addItem(Q17(this.key, qWorkcondition, true))
        this.addItem(Q18(this.key, qWorkcondition, true))

        const conditionQ11JaAndStudent = CommonExpressions.and(
            testQ11jaCondition,
            CommonExpressions.or(
                CommonExpressions.hasParticipantFlag("student", "yes"),
                CommonExpressions.singleChoiceOptionsSelected(q15.key, '4'),
            )

        )
        const Q_minderschool = this.Q_minderschool('Q_minderschool', conditionQ11JaAndStudent, true)
        const Q_verzuim_school = this.Q_verzuim_school('Q_verzuim_school',
            CommonExpressions.singleChoiceOnlyOtherKeysSelected(Q_minderschool.key,
                'onveranderd', 'niet'
            ), true)

        const Q_langafwezig_school = this.Q_langafwezig_school('Q_langafwezig_school',
            CommonExpressions.singleChoiceOnlyOtherKeysSelected(Q_minderschool.key,
                'onveranderd', 'niet'
            ),
            true);
        const conditionAfwezig = CommonExpressions.singleChoiceOptionsSelected(
            Q_langafwezig_school.key, 'ja'
        )
        this.addItem(Q_minderschool);
        this.addItem(Q_verzuim_school);
        this.addItem(Q_langafwezig_school);
        this.addItem(this.Q_datumziek('Q_datumziek', conditionAfwezig, true));
        this.addItem(this.Q_zorgenschool('Q_zorgenschool', conditionQ11JaAndStudent, true));
        this.addPageBreak();


        let q11AndQ14aCondition = CommonExpressions.and(
            testQ11jaCondition,
            CommonExpressions.or(
                CommonExpressions.singleChoiceOptionsSelected(Q14a.key, 'ja'),
                CommonExpressions.singleChoiceOptionsSelected(PaidJob.key, '1')
            )
        )
        // Overwrite for not T0 surveys:
        if (!this.isPartOfSurvey(surveyKeys.T0)) {
            q11AndQ14aCondition = CommonExpressions.and(
                testQ11jaCondition,
                CommonExpressions.or(
                    CommonExpressions.hasParticipantFlag("paidJobAtInfection", "yes"),
                    CommonExpressions.hasParticipantFlag("paidJobAtT0", "yes")
                )
            )
        }

        const Q_minderwerk = gen_Q_minderwerk(this.key, q11AndQ14aCondition, true);
        this.addItem(Q_minderwerk);
        const Q_arbo = gen_Q_arbo(this.key, q11AndQ14aCondition, true);
        this.addItem(Q_arbo);

        const conditionOnMinderwerk = CommonExpressions.singleChoiceOnlyOtherKeysSelected(
            Q_minderwerk.key, '1'
        )
        const Q_verzuim = gen_Q_verzuim(this.key, conditionOnMinderwerk, true);
        this.addItem(Q_verzuim);
        const Q_langafwezig = gen_Q_langafwezig(this.key, conditionOnMinderwerk, true);
        this.addItem(Q_langafwezig);

        const conditionOnLangafwezig = CommonExpressions.singleChoiceOptionsSelected(
            Q_langafwezig.key, 'ja'
        );
        const Q_datumziek = gen_Q_datumziek(this.key, conditionOnLangafwezig, true);
        this.addItem(Q_datumziek);

        const Q_steunwerkgever = gen_Q_steunwerkgever(this.key, q11AndQ14aCondition, true);
        this.addItem(Q_steunwerkgever);

        const Q_zorgenwerk = gen_Q_zorgenwerk(this.key, q11AndQ14aCondition, true);
        this.addItem(Q_zorgenwerk);


        const Q_lotgenoten = gen_Q_lotgenoten(this.key, testQ11jaCondition, true);
        this.addItem(Q_lotgenoten);

        const Q_steunsociaal = gen_Q_steunsociaal(this.key, testQ11jaCondition, true);
        this.addItem(Q_steunsociaal);

        const Q_hulp = gen_Q_hulp(this.key, testQ11jaCondition, true);
        this.addItem(Q_hulp);

        const conditionQHulp = CommonExpressions.singleChoiceOptionsSelected(
            Q_hulp.key, 'ja'
        )

        const Q_welkehulp = gen_Q_welkehulp(this.key, conditionQHulp, true);
        this.addItem(Q_welkehulp);

        const Q_wekenhulp = gen_Q_wekenhulp(this.key, conditionQHulp, true);
        this.addItem(Q_wekenhulp);

        const Q_urenhulp = gen_Q_urenhulp(this.key, conditionQHulp, true);
        this.addItem(Q_urenhulp);


        this.addItem(Q19(this.key, true))
        this.addItem(Q20(this.key, true))
        this.addItem(Q21(this.key, true))

        this.addItem(Q_instructions_eind(this.key, testQ11jaCondition))
    }


    Q_minderschool(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            condition: condition,
            questionText: new Map([
                ["nl", "Heb je sinds je (vermoedelijke) besmetting met het coronavirus minder lesuren op school/opleiding kunnen volgen dan je normaalgesproken deed?"],
            ]),
            responseOptions: [
                {
                    key: 'onveranderd', role: 'option',
                    content: new Map([
                        ["nl", "Mijn gevolgde lesuren zijn onveranderd"],
                    ]),
                },
                {
                    key: 'minder', role: 'option',
                    content: new Map([
                        ["nl", "Ik volg af en toe minder lessen"],
                    ]),
                },
                {
                    key: 'structureel', role: 'option',
                    content: new Map([
                        ["nl", "Ik volg structureel minder lessen"],
                    ]),
                },
                {
                    key: 'volledig', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben volledig ziekgemeld"],
                    ]),
                },
                {
                    key: 'gestopt', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben gestopt met school/opleiding door de langdurige klachten"],
                    ]),
                },
                {
                    key: 'niet', role: 'option',
                    content: new Map([
                        ["nl", "Ik ga niet naar school/opleiding om andere reden"],
                    ]),
                },
            ]
        });
    }

    Q_verzuim_school(itemKey: string, condition: Expression, isRequired: boolean) {
        const inputProperties = {
            min: 0,
            max: 20
        };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoeveel dagen in de afgelopen 4 weken heb je helemaal niet, of minder lessen kunnen volgen door langdurige gezondheidsklachten (tel het aantal lesdagen)? Je mag het antwoord ook inschatten."],
            ]),
            questionSubText: new Map([
                ["nl", "Meerdere antwoorden mogelijk"]
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'numberInput',
                    content: new Map([
                        ["nl", "Dagen helemaal geen les kunnen volgen:"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'minder', role: 'numberInput',
                    content: new Map([
                        ["nl", "Aantal dagen minder les kunnen volgen:"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
            ]
        });
    }

    // if Q_minderschool != onveranderd OR Q_minderschool != niet
    Q_langafwezig_school(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Was je langer dan de gehele periode van 4 weken afwezig van school/opleiding doordat je ziek was?"],
            ]),
            questionSubText: new Map([
                ["nl", "Het gaat om een aaneengesloten periode van schoolverzuim."]
            ]),
            responseOptions: [
                {
                    key: 'nee', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ]),
                },
                {
                    key: 'ja', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ]),
                }
            ]
        });
    }

    // if Q_langafwezig == ja
    Q_datumziek(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Wanneer heb je je ziek gemeld?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: { delta: { days: -10 } },
            maxRelativeDate: { delta: { seconds: 1 } },
            isRequired: isRequired,
        });
    }

    Q_zorgenschool(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Maak je je zorgen over je school/opleiding in het komende jaar door de langdurige gezondheidsklachten?"],
            ]),
            responseOptions: [
                {
                    key: 'ernstig', role: 'option',
                    content: new Map([
                        ["nl", "Ernstige zorgen"],
                    ]),
                },
                {
                    key: 'redelijk', role: 'option',
                    content: new Map([
                        ["nl", "Redelijk veel zorgen"],
                    ]),
                },
                {
                    key: 'weinig', role: 'option',
                    content: new Map([
                        ["nl", "Weinig zorgen"],
                    ]),
                },
                {
                    key: 'geen1', role: 'option',
                    content: new Map([
                        ["nl", "Geen zorgen, ik ben redelijk positief"],
                    ]),
                },
                {
                    key: 'geen2', role: 'option',
                    content: new Map([
                        ["nl", "Geen zorgen, ik ben positief"],
                    ]),
                },
            ]
        });
    }

}

const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
## **Onderdeel 5 - Algemene gegevens**
`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ["nl", markdownContent],
                ]),
                className: ''
            })
        ]
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
            {
                key: 'wilnietzeggen', role: 'option',
                content: new Map([
                    ["nl", "Wil ik niet zeggen"],
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
                    ["nl", "< 4 jaar"],
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

const Q13 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q13';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat is je hoogst (met diploma) afgeronde opleiding?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Geen onderwijs of lager onderwijs"],
                ]),
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Lbo (ambachtsschool, huishoudschool, lts, leao, etc.)"],
                ]),
            }, {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Vmbo, mavo of (m)ulo"],
                ]),
            }, {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Havo of vwo"],
                ]),
            }, {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Mbo"],
                ]),
            }, {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Hbo"],
                ]),
            }, {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Universiteit"],
                ]),
            }, {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "Anders"],
                ]),
            },
        ]
    });
}

const gen_Q14a = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q14a';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Had je betaald werk op het moment dat je besmet raakte met het coronavirus?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
        ]
    });
}

const Q14 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q14';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Heb je op dit moment betaald werk?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
        ]
    });
}

const Qwerkveranderd = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Qwerkveranderd';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Is er sinds de vorige vragenlijst iets veranderd in je dagelijkse activiteiten (werk, studie of andere dagbesteding)?"],
        ]),
        questionSubText: new Map([
            ["nl", "Ook veranderingen in werktijden vanwege klachten door corona."],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
        ]
    });
}

const Q15 = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q15';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat is je voornaamste bezigheid overdag?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik werk fulltime in loondienst"],
                ]),
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik werk parttime in loondienst"],
                ]),
            }, {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik werk als zelfstandige/ ondernemer"],
                ]),
            }, {
                key: 'reintegreren', role: 'option',
                content: new Map([
                    ["nl", "Ik ben aan het re-integreren op mijn werk"],
                ]),
            }, {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Ik ben een scholier of student"],
                ]),
            }, {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Ik ben huisman/huisvrouw"],
                ]),
            }, {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Ik ben werkloos"],
                ]),
            }, {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Ik ben thuis vanwege langdurige ziekte of zwangerschapsverlof"],
                ]),
            }, {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "Ik ben met pensioen"],
                ]),
            }, {
                key: '9', role: 'option',
                content: new Map([
                    ["nl", "Anders"],
                ]),
            },
        ]
    });
}

const Q16 = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q16';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["nl", "Welke omschrijving past het beste bij je dagelijkse werkzaamheden?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik werk in de gezondheidzorg"],
                ]),
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik heb een contactberoep (bijvoorbeeld kapper, schoonheidsspecialist)"],
                ]),
            }, {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik werk in de kinderopvang/onderwijs (basis, voortgezet, MBO, HBO of WO-onderwijs)"],
                ]),
            }, {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Ik werk in de horeca"],
                ]),
            }, {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Ik werk in de detailhandel (supermarkt, verkoop in andere winkels)"],
                ]),
            }, {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Ik werk in het openbaar vervoer (bijv. trein, bus, metro of taxi)"],
                ]),
            }, {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Ik ben thuis vanwege langdurige ziekte of zwangerschapsverlof"],
                ]),
            }, {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "Ik doe overig kenniswerk (manager, onderzoeker, accountant)"],
                ]),
            }, {
                key: '9', role: 'option',
                content: new Map([
                    ["nl", "Ik doe administratief werk (administratie, financieel assistent, receptionist etc.)"],
                ]),
            },
            {
                key: '10', role: 'option',
                content: new Map([
                    ["nl", "Ik doe technisch werk (uitvoerend in techniek, bouw, productie)"],
                ]),
            },
            {
                key: '11', role: 'option',
                content: new Map([
                    ["nl", "Anders, valt niet in bovengenoemde opties"],
                ]),
            },
        ]
    });
}

const Q17 = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q17';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel uur per week werk je normaalgesproken?"],
        ]),
        questionSubText: new Map([
            ["nl", "Tel alleen de uren waarvoor je betaald wordt"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "8 uur"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "16 uur"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "24 uur"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "32 uur"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "36 uur"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "38 uur"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "40 uur"],
                ])
            },
            {
                key: '8', role: 'input',
                content: new Map([
                    ["nl", "Anders, namelijk"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}


const Q18 = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q18';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op hoeveel dagen in de week werk je normaalgesproken?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "1 dag"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "2 dagen"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "3 dagen"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "4 dagen"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "5 dagen"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "6 dagen"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "7 dagen"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}


const gen_Q_minderwerk = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'minderwerk';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je sinds je (vermoedelijke) besmetting met het coronavirus minder kunnen werken dan je normaalgesproken deed?"],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Mijn werktijden zijn onveranderd"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik werk af en toe minder"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik werk structureel minder"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Ik ben volledig ziekgemeld"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Ik ben geen werk meer door de langdurige klachten"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Ik heb geen werk meer om andere reden"],
                ])
            },
        ],
    });
}

const gen_Q_arbo = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'arbo';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Bepaal je je werktijden of werkdruk in overleg met een arts (bijvoorbeeld ARBO arts, huisarts of specialist)?"],
        ]),
        isRequired: isRequired,
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
    });
}

const gen_Q_verzuim = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'verzuim';
    const inputProperties = {
        min: 1,
        max: 500
    };
    const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel dagen in de afgelopen 4 weken heb je helemaal niet, of minder kunnen werken door langdurige gezondheidsklachten (tel het aantal werkdagen)?"],
        ]),
        questionSubText: new Map([
            ["nl", "Je mag het antwoord ook inschatten."],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal dagen helemaal niet kunnen werken: "],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '2', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal dagen minder kunnen werken: "],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
        ],
    });
}


const gen_Q_langafwezig = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'langafwezig';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Was je langer dan de gehele periode van 4 weken afwezig van je werk doordat je ziek was?"],
        ]),
        questionSubText: new Map([
            ["nl", "Het gaat om een aaneengesloten periode van werkverzuim."],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
        ],
    });
}

const gen_Q_datumziek = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'datumziek';
    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wanneer heb je jezelf ziek gemeld?"],
        ]),
        isRequired: isRequired,
        dateInputMode: 'YMD',
        inputLabelText: new Map([
            ["nl", "Kies hier de datum"],
        ]),
        placeholderText: new Map([
            ["nl", "Datum"],
        ]),
    });
}


const gen_Q_steunwerkgever = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'steunwerkgever';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Voel je je gesteund door je werkgever in het omgaan met je langdurige klachten?"],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ja, ik voel me gesteund"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ja, ik voel me redelijk gesteund"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Nee, ik voel me weinig of niet gesteund"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Nee, ik voel me niet serieus genomen"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Niet van toepassing, eigen bedrijf /zzp"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Niet van toepassing, overig"],
                ])
            },
        ],
    });
}

const gen_Q_zorgenwerk = (parentKey: string, condition: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'zorgenwerk';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Maak je je zorgen over je inkomen werk en carrière in het komende jaar door de langdurige gezondheidsklachten?"],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ernstige zorgen"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Redelijk veel zorgen"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Weinig zorgen"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Geen zorgen, ik ben redelijk positief"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Geen zorgen, ik ben positief"],
                ])
            },
        ],
    });
}

const gen_Q_lotgenoten = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'lotgenoten';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je contact met andere personen met langdurige klachten door het coronavirus?"],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ja, vaak"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ja, af en toe"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik ken wel andere mensen met langdurige klachten maar spreek er niet over"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Ik ken geen andere mensen met langdurige klachten, maar heb wel behoefte aan contact"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Ik ken geen andere mensen met langdurige klachten, en heb ook geen behoefte aan contact"],
                ])
            },
        ],
    });
}

const gen_Q_steunsociaal = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'steunsociaal';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Voel je je gesteund in het omgaan met je langdurige klachten in je directe sociale omgeving (familie, vrienden en collega’s)?"],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ja, ik voel me gesteund"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ja, ik voel me redelijk gesteund"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Nee, ik voel me weinig of niet gesteund"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Nee, ik voel me niet serieus genomen"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Niet van toepassing"],
                ])
            },
        ],
    });
}


const gen_Q_hulp = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'hulp';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je in de afgelopen 3 maanden hulp gekregen van een familielid of een bekende vanwege je langdurige gezondheidsklachten?"],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
        ],
    });
}

const gen_Q_welkehulp = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'welkehulp';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wat voor hulp van familieleden of bekenden heb je gehad in de afgelopen 3 maanden?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: 'huishouden', role: 'option',
                content: new Map([
                    ["nl", "Huishoudelijke hulp (voorbeeld: stofzuigen, bed opmaken, boodschappen doen, klaarmaken van eten en drinken, verzorgen van kinderen)"],
                ])
            },
            {
                key: 'verzorging', role: 'option',
                content: new Map([
                    ["nl", "Verzorging van uzelf (voorbeeld: hulp bij douchen of aankleden, hulp bij het eten en drinken of het geven van medicijnen)"],
                ])
            },
            {
                key: 'praktisch', role: 'option',
                content: new Map([
                    ["nl", "Praktische hulp (voorbeeld: ondersteuning bij wandelen, het maken van uitstapjes of bezoekjes aan bekenden, bezoeken aan de huisarts of het ziekenhuis, het regelen van hulp of het regelen van financiële zaken)"],
                ])
            },
        ],
    });
}

const gen_Q_wekenhulp = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'wekenhulp';
    const inputProperties = {
        min: 1,
        max: 13
    };
    const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel weken heb je deze hulp gehad? Tel alle weken in de afgelopen 3 maanden bij elkaar op."],
        ]),
        questionSubText: new Map([
            ["nl", "Let op: een periode van 3 maanden telt 13 weken."],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal weken huishoudelijke hulp: "],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '2', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal weken hulp bij verzorging van jezelf:"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '3', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal weken praktische hulp: "],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
        ],
    });
}

const gen_Q_urenhulp = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'urenhulp';
    const inputProperties = {
        min: 1,
        max: 168
    };
    const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel uur hulp kreeg je in deze weken gemiddeld?"],
        ]),
        isRequired: isRequired,
        responseOptions: [
            {
                key: '1', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal uur huishoudelijke hulp in de week:"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '2', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal uur hulp bij verzorging van jezelf in de week:"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '3', role: 'numberInput',
                content: new Map([
                    ["nl", "Aantal uur praktische hulp in de week: "],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
        ],
    });
}


const Q19 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q19';
    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Hoe heb je over het LongCOVID-onderzoek gehoord?"],
        ]),
        topDisplayCompoments: [
            ComponentGenerators.text({
                content: new Map([[
                    'nl', 'Meerdere antwoorden mogelijk'
                ]]),
                className: "mb-2"
            })
        ],
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Uitnodiging via e-mail na deelname aan ander RIVM onderzoek (b.v. CONTEST)"],
                ]),
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Uitnodiging via de e-mail na contact met de GGD voor bron en contactonderzoek"],
                ]),
            }, {
                key: '3', role: 'input',
                content: new Map([
                    ["nl", "Uitnodiging per brief, vul hier je onderzoekscode in:"],
                ]),
            }, {
                key: '4', role: 'input',
                content: new Map([
                    ["nl", "Via de media, namelijk:"],
                ]),
            }, {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Via vrienden of familie"],
                ]),
            }, {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Via google of een andere internet zoekmachine"],
                ]),
            }, {
                key: '7', role: 'input',
                content: new Map([
                    ["nl", "Anders, namelijk:"],
                ]),
            },
        ]
    });
}

const Q20 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q20';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Zouden wij je eventueel mogen benaderen voor toekomstig aanvullend onderzoek over het coronavirus of andere infectieziekten?"],
        ]),
        responseOptions: [
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ]),
            },
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ]),
            },
        ]
    });
}


const Q21 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q21';

    return SurveyItemGenerators.multilineTextInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Als je nog aanvullende opmerkingen hebt over de vragenlijst of het onderzoek, kun je die hieronder invullen."],
        ]),
        questionSubText: new Map([
            ["nl", "Let op, je krijgt geen persoonlijke reactie op deze opmerkingen. "],
        ]),
        placeholderText: new Map([
            ["nl", "Opmerkingen"]
        ])
    });
}


const Q_instructions_eind = (parentKey: string, condition?: Expression): SurveyItem => {
    const markdownContent = `
### Advies en ondersteuning langdurige gezondheidsklachten

Voor advies en ondersteuning rondom langdurige gezondheidsklachten door het coronavirus kun je terecht bij [c-support](https://www.c-support.nu/). Op [coronaplein.nu](https://coronaplein.nu/) vind je informatie en advies over herstel, ontmoet je lotgenoten en kun je jouw ervaringen delen. Ook kun je op dit patiëntenplatform via een chatfunctie vragen stellen aan zorgprofessionals.
`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        condition: condition,
        itemKey: 'ondersteuning',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ["nl", markdownContent],
                ]),
                className: ''
            })
        ]
    });
}
