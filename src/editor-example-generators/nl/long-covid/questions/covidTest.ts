import { Expression, SurveyItem } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../studyRules";

export class CovidTestGroup extends GroupItemEditor {
    Q11JaCondition?: Expression;

    constructor(parentKey: string, isT0: boolean, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'TEST';
        super(parentKey, groupKey);
        this.Q11JaCondition = undefined;

        this.initQuestions(isT0);
    }

    initQuestions(isT0: boolean,) {
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(Q_instructionsT0(this.key))
        }

        if (this.isPartOfSurvey(surveyKeys.T3) || this.isPartOfSurvey(surveyKeys.T6) || this.isPartOfSurvey(surveyKeys.T9) || this.isPartOfSurvey(surveyKeys.T12)) {
            this.addItem(Q_instructionsT36912(this.key))
        }

        if (this.isPartOfSurvey(surveyKeys.T3) || this.isPartOfSurvey(surveyKeys.short)) {
            const followUpCondition = CommonExpressions.hasParticipantFlag('testResult', 'unknown');
            this.addItem(Q_testFollowUp(this.key, true, followUpCondition))
        }

        if (this.isPartOfSurvey(surveyKeys.short)) {
            this.addItem(Q_instructionsTshort(this.key))
        } else {
            this.addItem(Q_instructions1(this.key))
        }

        const test = q_test_def(this.key, true);
        const testpos_FU = POS_FU(this.key, true);
        // const test_FU = q_test_def_FU(this.key, true);

        const condition_test_yes = CommonExpressions.or(
            CommonExpressions.singleChoiceOptionsSelected(test.key, 'yes', 'yes>7', 'yes>14'),
            // CommonExpressions.singleChoiceOptionsSelected(test_FU.key, 'yes')
        )
        const test_result = q_test_result_def(this.key, true, condition_test_yes);
        const condition_test_result_pos = CommonExpressions.singleChoiceOptionsSelected(test_result.key, 'pos');
        const condition_test_result_pos_FU = CommonExpressions.singleChoiceOptionsSelected(testpos_FU.key, 'pos');
        // const infect_earlier = q_infect_earlier_def(this.key, true);
        const infect_earlier2 = q_infect_earlier_def2(this.key, true);
        const langdurige_klachten = q_langdurige_klachten(this.key , true);
        // const condition_pos_earl_test = CommonExpressions.singleChoiceOptionsSelected(infect_earlier.key, 'pos_earl_test');
        // const condition_pos_earl_notest = CommonExpressions.singleChoiceOptionsSelected(infect_earlier.key, 'pos_earl_notest');
        // const condition_for_langdurige_klachten = CommonExpressions.singleChoiceOptionsSelected(infect_earlier.key, 'pos_earl_test', 'pos_earl_notest', 'pos_earl_maybe_notest', 'unknown');
        const condition_infect_earlier1x = CommonExpressions.singleChoiceOptionsSelected(infect_earlier2.key, '1keer', '2keer', '3keer', 'vaker');
        const condition_infect_earlier2x = CommonExpressions.singleChoiceOptionsSelected(infect_earlier2.key, '2keer', '3keer', 'vaker');
        const condition_infect_earlier3x = CommonExpressions.singleChoiceOptionsSelected(infect_earlier2.key, '3keer', 'vaker');
        // const condition_infect_earlier_vaker = CommonExpressions.singleChoiceOptionsSelected(infect_earlier2.key, 'vaker');
        const condition_for_langdurige_klachten = CommonExpressions.singleChoiceOptionsSelected(infect_earlier2.key, '1keer', '2keer', '3keer', 'vaker', 'unknown');
        const condition_for_langdurige_klachten_date = CommonExpressions.singleChoiceOptionsSelected(langdurige_klachten.key, 'ja_beetje', 'ja_veel', 'ja_zeerveel');    

        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(test);
        } else {
            this.addItem(testpos_FU);
        }
        this.addItem(q_test_date_def(this.key, true, condition_test_yes));
        // this.addItem(q_test_location_def(this.key, true, condition_test_yes));
        this.addItem(q_test_reason_def(this.key, true, condition_test_yes));
        this.addItem(q_test_date_def_FU(this.key, true, condition_test_result_pos_FU));
        // this.addItem(q_test_location_def_FU(this.key, true, condition_test_result_pos_FU));
        this.addItem(q_test_reason_def_FU(this.key, true, condition_test_result_pos_FU));
        this.addItem(test_result);
        this.addItem(q_test_type_def(this.key, true, condition_test_result_pos));
        this.addItem(q_test_type_def_FU(this.key, true, condition_test_result_pos_FU));
        if (isT0) {
            // this.addItem(infect_earlier);
            // this.addItem(q_inf_earlier_type_def(this.key, true, condition_pos_earl_test));
            // this.addItem(q_inf_earlier_testdate_def(this.key, true, condition_pos_earl_test));
            // this.addItem(q_inf_earlier_date_def(this.key, true, condition_pos_earl_notest));
            const Q11 = q_langdurige_klachten(this.key, true, condition_for_langdurige_klachten);
            this.addItem(infect_earlier2);
            // this.addItem(q13a(this.key, true, condition_infect_earlier1x));
            this.addItem(q13b(this.key, true, condition_infect_earlier1x));
            // this.addItem(q13c(this.key, true, condition_infect_earlier1x));
            // this.addItem(q14a(this.key, true, condition_infect_earlier2x));
            this.addItem(q14b(this.key, true, condition_infect_earlier2x));
            // this.addItem(q14c(this.key, true, condition_infect_earlier2x));
            // this.addItem(q15a(this.key, true, condition_infect_earlier3x));
            this.addItem(q15b(this.key, true, condition_infect_earlier3x));
            // this.addItem(q15c(this.key, true, condition_infect_earlier3x));
            // this.addItem(q16(this.key, true, condition_infect_earlier_vaker));
            this.addItem(Q11);
            this.Q11JaCondition = CommonExpressions.singleChoiceOptionsSelected(Q11.key, 'ja_beetje', 'ja_veel', 'ja_zeerveel');
            const Q17 = q_langdurige_klachten_date(this.key, true, condition_for_langdurige_klachten_date);
            this.addItem(Q17)
        } else if (!this.isPartOfSurvey(surveyKeys.short)) {
            const Q11 = q_langdurige_klachten(this.key, true, undefined);
            this.addItem(Q11);
            this.Q11JaCondition = CommonExpressions.singleChoiceOptionsSelected(Q11.key, 'ja_beetje', 'ja_veel', 'ja_zeerveel');
            const Q17 = q_langdurige_klachten_date(this.key, true, condition_for_langdurige_klachten_date);
            this.addItem(Q17)
        // }
        // if (!this.isPartOfSurvey(surveyKeys.short)) {
        //     this.addItem(Q_instructions2(this.key))
        }
        this.addPageBreak();
    }

    getQ11JaCondition(): Expression | undefined {
        return this.Q11JaCondition;
    }
}

const Q_instructionsT0 = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Deze vragenlijst bestaat uit 5 onderdelen:

1. Testen op het coronavirus
2. Vaccinaties
3. Gezondheidsklachten en zorggebruik
4. Algemene gezondheid
5. Algemene gegevens

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


const Q_instructionsT36912 = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Deze vragenlijst bestaat uit 4 onderdelen:

1. Testen op het coronavirus
2. Vaccinaties
3. Gezondheidsklachten en zorggebruik
4. Algemene gezondheid

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

const Q_instructionsTshort = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Deze update gaat over testen op het coronavirus en over je gezondheid en zorgebruik.

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

const Q_instructions1 = (parentKey: string): SurveyItem => {
    const markdownContent = `
## **Onderdeel 1 - Testen op het coronavirus**
`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro2',
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

const Q_testFollowUp = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5followup';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "In de eerdere vragenlijst gaf je aan de uitslag van je coronatest nog niet te hebben. Heb je inmiddels de uitslag van deze test?"],
        ]),
        responseOptions: [
            {
                key: 'pos', role: 'option',
                content: new Map([
                    ["nl", "Positief, dus WEL besmet (geweest) met het coronavirus"],
                ])
            },
            {
                key: 'neg', role: 'option',
                content: new Map([
                    ["nl", "Negatief, dus GEEN bewijs voor besmetting met het coronavirus"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Ik heb de uitslag nog niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_test_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je afgelopen 30 dagen een test gedaan om te weten of je corona hebt?"],
        ]),
        responseOptions: [
            {
                key: 'yes', role: 'option',
                content: new Map([
                    ["nl", "Ja, 7 dagen of minder geleden"],
                ])
            },
            {
                key: 'yes>7', role: 'option',
                content: new Map([
                    ["nl", "Ja, 7-14 dagen geleden"],
                ])
            },
            {
                key: 'yes>14', role: 'option',
                content: new Map([
                    ["nl", "Ja, meer dan 14 dagen geleden"],
                ])
            },
            {
                key: 'no', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

// const q_test_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q1_FU';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Heb je sinds de vorige vragenlijst een test gedaan om te weten of je corona hebt?"],
//         ]),
//         responseOptions: [
//             {
//                 key: 'yes', role: 'option',
//                 content: new Map([
//                     ["nl", "Ja"],
//                 ])
//             },
//             {
//                 key: 'no', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }


const POS_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'POS_FU';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Ben je sinds de vorige vragenlijst positief getest op het coronavirus?"],
        ]),
        responseOptions: [
            {
                key: 'pos', role: 'option',
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
        ],
        isRequired: isRequired,
    });
}

const q_test_date_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wanneer is deze test afgenomen?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { delta: { days: -125 } },
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// const q_test_location_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q3';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Waar heb je jezelf laten testen op corona?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'option',
//                 content: new Map([
//                     ["nl", "Ziekenhuis of huisarts"],
//                 ])
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "GGD Teststraat"],
//                 ])
//             },
//             {
//                 key: '2', role: 'option',
//                 content: new Map([
//                     ["nl", "GGD kwam naar mijn huis"],
//                 ])
//             },
//             {
//                 key: '3', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een zelftest"],
//                 ])
//             },
//             {
//                 key: '4', role: 'option',
//                 content: new Map([
//                     ["nl", "Bij een bedrijf (op eigen initiatief)"],
//                 ])
//             },
//             {
//                 key: '5', role: 'option',
//                 content: new Map([
//                     ["nl", "Bij een bedrijf (via mijn werkgever)"],
//                 ])
//             },
//             {
//                 key: '6', role: 'option',
//                 content: new Map([
//                     ["nl", "In het buitenland"],
//                 ])
//             },
//             {
//                 key: '7', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat weet ik niet (meer)"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }

const q_test_reason_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wat is de reden dat je jezelf hebt laten testen op het coronavirus?"],
        ]),

        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Ik had klachten"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik heb contact gehad met iemand die positief getest is op corona"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik ben benaderd door de GGD om mij te laten testen, omdat ik mogelijk in contact ben geweest met iemand die positief getest is op corona"],
                ])
            },
            // {
            //     key: '3', role: 'option',
            //     content: new Map([
            //         ["nl", "Ik heb een melding gekregen van de Coronamelder app dat ik in de buurt ben geweest van iemand die corona had"],
            //     ])
            // },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "In verband met een uitje (bijv. evenement, attractiepark, dierentuin)"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Vanwege een andere reden"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}


const q_test_date_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2_FU';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wanneer is deze test afgenomen?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { delta: { days: -125 } },
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// const q_test_location_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q3_FU';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Waar heb je jezelf laten testen op corona?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'option',
//                 content: new Map([
//                     ["nl", "Ziekenhuis of huisarts"],
//                 ])
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "GGD Teststraat"],
//                 ])
//             },
//             {
//                 key: '2', role: 'option',
//                 content: new Map([
//                     ["nl", "GGD kwam naar mijn huis"],
//                 ])
//             },
//             {
//                 key: '3', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een zelftest"],
//                 ])
//             },
//             {
//                 key: '4', role: 'option',
//                 content: new Map([
//                     ["nl", "Bij een bedrijf (op eigen initiatief)"],
//                 ])
//             },
//             {
//                 key: '5', role: 'option',
//                 content: new Map([
//                     ["nl", "Bij een bedrijf (via mijn werkgever)"],
//                 ])
//             },
//             {
//                 key: '6', role: 'option',
//                 content: new Map([
//                     ["nl", "In het buitenland"],
//                 ])
//             },
//             {
//                 key: '7', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat weet ik niet (meer)"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }

const q_test_reason_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4_FU';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wat is de reden dat je jezelf hebt laten testen op het coronavirus?"],
        ]),

        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Ik had klachten"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik heb contact gehad met iemand die positief getest is op corona"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik ben benaderd door de GGD om mij te laten testen, omdat ik mogelijk in contact ben geweest met iemand die positief getest is op corona"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik heb een melding gekregen van de Coronamelder app dat ik in de buurt ben geweest van iemand die corona had"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "In verband met een uitje (bijv. evenement, attractiepark, dierentuin)"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Vanwege een andere reden"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_test_result_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wat was de uitslag van de test?"],
        ]),
        responseOptions: [
            {
                key: 'pos', role: 'option',
                content: new Map([
                    ["nl", "Positief, dus WEL besmet (geweest) met het coronavirus"],
                ])
            },
            {
                key: 'neg', role: 'option',
                content: new Map([
                    ["nl", "Negatief, dus GEEN bewijs voor besmetting met het coronavirus"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Ik heb de uitslag nog niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_test_type_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Met welk type coronatest is deze uitslag bepaald?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        responseOptions: [
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Met een zelftest"],
                ])
            },
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Met een PCR of antigeen sneltest die door een expert is afgenomen"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Met een bloedtest (serologie) "],
                ])
            },
            
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_test_type_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6_FU';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Met welk type coronatest is deze uitslag bepaald?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        responseOptions: [
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Met een zelftest"],
                ])
            },
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Met een PCR of antigeen sneltest die door een expert is afgenomen"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Met een bloedtest (serologie) "],
                ])
            },
            
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

// const q_infect_earlier_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q7';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Ben je al eerder besmet geweest met het coronavirus sinds de start van de pandemie in Nederland (februari 2020)?"],
//         ]),
//         questionSubText: new Map([
//             ["nl", "Het gaat hier om een eerdere infectie, meer dan 30 dagen geleden."],
//         ]),
//         responseOptions: [
//             {
//                 key: 'pos_earl_test', role: 'option',
//                 content: new Map([
//                     ["nl", "Ja, bevestigd met een positieve test"],
//                 ])
//             },
//             {
//                 key: 'pos_earl_notest', role: 'option',
//                 content: new Map([
//                     ["nl", "Ja, ik denk het wel maar er is geen test gedaan"],
//                 ])
//             },
//             {
//                 key: 'pos_earl_maybe_notest', role: 'option',
//                 content: new Map([
//                     ["nl", "Misschien wel, maar er is geen test gedaan"],
//                 ])
//             },
//             {
//                 key: 'no', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee, ik denk het niet"],
//                 ])
//             },
//             {
//                 key: 'unknown', role: 'option',
//                 content: new Map([
//                     ["nl", "Weet ik niet"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }

// const q_inf_earlier_type_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q8';

//     return SurveyItemGenerators.multipleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Met welk type coronatest is deze uitslag bepaald?"],
//         ]),
//         questionSubText: new Map([
//             ["nl", "Meerdere antwoorden mogelijk."],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een PCR of antigeen sneltest"],
//                 ])
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een bloedtest (serologie)"],
//                 ])
//             },
//             {
//                 key: '2', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een zelftest"],
//                 ])
//             },
//             {
//                 key: '3', role: 'option',
//                 content: new Map([
//                     ["nl", "Weet ik niet"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }

// const q_inf_earlier_testdate_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q9';

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Wanneer is deze test (ongeveer) afgenomen?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: { delta: { days: -1500 } },
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }

// const q_inf_earlier_date_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q10';

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Wanneer denk je dat je besmet bent met het coronavirus (ongeveer)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: { delta: { days: -1500 } },
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }

const q_langdurige_klachten = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q11';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je op dit moment langdurige gezondheidsklachten waarvan je denkt dat deze deels of geheel door het coronavirus komen?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            // {
            //     key: 'ja', role: 'option',
            //     content: new Map([
            //         ["nl", "Ja"],
            //     ])
            // },
            {
                key: 'ja_beetje', role: 'option',
                content: new Map([
                    ["nl", "Ja, nog een beetje klachten door het coronavirus"],
                ])
            },
            {
                key: 'ja_veel', role: 'option',
                content: new Map([
                    ["nl", "Ja, nog veel klachten door het coronavirus"],
                ])
            },
            {
                key: 'ja_zeerveel', role: 'option',
                content: new Map([
                    ["nl", "Ja, nog zeer veel klachten door het coronavirus"],
                ])
            },
            {
                key: 'notanymore', role: 'option',
                content: new Map([
                    ["nl", "Nee, niet meer"],
                ])
            }
        ],
        isRequired: isRequired,
    });
}


const q_langdurige_klachten_date = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q17';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Kan je aangeven wanneer deze langdurige klachten ongeveer zijn begonnen? Als je het niet meer weet dan kan je de datum schatten."],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { delta: { days: -1500 } },
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}


const q_infect_earlier_def2 = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q12';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Ben je al eerder besmet geweest met het coronavirus sinds de start van de pandemie in Nederland (februari 2020)?"],
        ]),
        questionSubText: new Map([
            ["nl", "Het gaat hier om een eerdere infectie, meer dan 30 dagen geleden."],
        ]),
        responseOptions: [
            {
                key: '1keer', role: 'option',
                content: new Map([
                    ["nl", "Ja, ik denk het wel, 1x eerder"],
                ])
            },
            {
                key: '2keer', role: 'option',
                content: new Map([
                    ["nl", "Ja, ik denk het wel, 2x eerder"],
                ])
            },
            {
                key: '3keer', role: 'option',
                content: new Map([
                    ["nl", "Ja, ik denk het wel, 3x eerder"],
                ])
            },
            {
                key: 'vaker', role: 'input',
                content: new Map([
                    ["nl", "Ja, ik denk het wel, vaker dan 3x, vul hier het aantal keer in:"],
                ])
            },

            {
                key: 'no', role: 'option',
                content: new Map([
                    ["nl", "Nee, ik denk het niet"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}



// const q13a = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q13a';

//     return SurveyItemGenerators.multipleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Is je eerste besmetting met een coronatest bepaald, en zo ja wat voor test?"],
//         ]),
//         questionSubText: new Map([
//             ["nl", "Meerdere antwoorden mogelijk."],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een PCR of antigeen sneltest"],
//                 ])
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een bloedtest (serologie) "],
//                 ])
//             },
//             {
//                 key: '2', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een zelftest"],
//                 ])
//             },
//             {
//                 key: '3', role: 'option',
//                 content: new Map([
//                     ["nl", "Weet ik niet"],
//                 ])
//             },
//             {
//                 key: '4', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee, niet getest"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }

const q13b = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q13b';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "	Wanneer denk je dat je de eerste keer besmet bent  geraakt met het coronavirus (ongeveer), of wanneer is de test afgenomen?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { delta: { days: -1500 } },
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// const q13c = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q13c';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Ben je volledig hersteld van de eerste keer dat je besmet raakte met het coronavirus?"],
//         ]),
//         // questionSubText: new Map([
//         //     ["nl", "Meerdere antwoorden mogelijk."],
//         // ]),
//         responseOptions: [
//             {
//                 key: 'yes', role: 'option',
//                 content: new Map([
//                     ["nl", "Ja"],
//                 ])
//             },
//             {
//                 key: 'no', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee, ik heb nog steeds klachten"],
//                 ])
//             },
//             {
//                 key: 'dontknow', role: 'option',
//                 content: new Map([
//                     ["nl", "Ik weet het niet"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }



// const q14a = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q14a';

//     return SurveyItemGenerators.multipleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Is je tweede besmetting met een coronatest bepaald, en zo ja wat voor test?"],
//         ]),
//         questionSubText: new Map([
//             ["nl", "Meerdere antwoorden mogelijk."],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een PCR of antigeen sneltest"],
//                 ])
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een bloedtest (serologie) "],
//                 ])
//             },
//             {
//                 key: '2', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een zelftest"],
//                 ])
//             },
//             {
//                 key: '3', role: 'option',
//                 content: new Map([
//                     ["nl", "Weet ik niet"],
//                 ])
//             },
//             {
//                 key: '4', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee, niet getest"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }

const q14b = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q14b';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "	Wanneer denk je dat je de tweede keer besmet bent  geraakt met het coronavirus (ongeveer), of wanneer is de test afgenomen?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { delta: { days: -1500 } },
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// const q14c = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q14c';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Ben je volledig hersteld van de tweede keer dat je besmet raakte met het coronavirus?"],
//         ]),
//         // questionSubText: new Map([
//         //     ["nl", "Meerdere antwoorden mogelijk."],
//         // ]),
//         responseOptions: [
//             {
//                 key: 'yes', role: 'option',
//                 content: new Map([
//                     ["nl", "Ja"],
//                 ])
//             },
//             {
//                 key: 'no', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee, ik heb nog steeds klachten"],
//                 ])
//             },
//             {
//                 key: 'dontknow', role: 'option',
//                 content: new Map([
//                     ["nl", "Ik weet het niet"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }



// const q15a = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q15a';

//     return SurveyItemGenerators.multipleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Is je derde besmetting met een coronatest bepaald, en zo ja wat voor test?"],
//         ]),
//         questionSubText: new Map([
//             ["nl", "Meerdere antwoorden mogelijk."],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een PCR of antigeen sneltest"],
//                 ])
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een bloedtest (serologie) "],
//                 ])
//             },
//             {
//                 key: '2', role: 'option',
//                 content: new Map([
//                     ["nl", "Met een zelftest"],
//                 ])
//             },
//             {
//                 key: '3', role: 'option',
//                 content: new Map([
//                     ["nl", "Weet ik niet"],
//                 ])
//             },
//             {
//                 key: '4', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee, niet getest"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }

const q15b = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q15b';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "	Wanneer denk je dat je de derde keer besmet bent  geraakt met het coronavirus (ongeveer), of wanneer is de test afgenomen?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { delta: { days: -1500 } },
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// const q15c = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q15c';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Ben je volledig hersteld van de derde keer dat je besmet raakte met het coronavirus?"],
//         ]),
//         // questionSubText: new Map([
//         //     ["nl", "Meerdere antwoorden mogelijk."],
//         // ]),
//         responseOptions: [
//             {
//                 key: 'yes', role: 'option',
//                 content: new Map([
//                     ["nl", "Ja"],
//                 ])
//             },
//             {
//                 key: 'no', role: 'option',
//                 content: new Map([
//                     ["nl", "Nee, ik heb nog steeds klachten"],
//                 ])
//             },
//             {
//                 key: 'dontknow', role: 'option',
//                 content: new Map([
//                     ["nl", "Ik weet het niet"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     });
// }


// const q16 = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q16';

//     return SurveyItemGenerators.multilineTextInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Je geeft aan dat je vaker dan 3x keer eerder besmet bent geweest met het coronavirus. Kun je hieronder aangeven hoe vaak dat was, wanneer je besmet bent geraakt en of je volledig hersteld bent na deze besmettingen?"],
//         ]),
//         placeholderText: new Map([
//             ["nl", "Antwoord"]
//         ])
//     });
// }


// const Q_instructions2 = (parentKey: string): SurveyItem => {
//     const markdownContent = `
// ###### _Dit is het einde van Onderdeel 1. Onderdeel 2 van deze vragenlijst gaat over vaccinaties._

// `

//     return SurveyItemGenerators.display({
//         parentKey: parentKey,
//         itemKey: 'intro3',
//         content: [
//             ComponentGenerators.markdown({
//                 content: new Map([
//                     ["nl", markdownContent],
//                 ]),
//                 className: ''
//             })
//         ]
//     });
// }
