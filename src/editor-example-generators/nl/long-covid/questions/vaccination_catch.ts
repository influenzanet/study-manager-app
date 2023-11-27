import { Expression, ExpressionArg, SurveyItem } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../studyRules";

export class VaccinationGroup extends GroupItemEditor {

    constructor(parentKey: string, isT0: boolean, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'VAC';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {

        if (!this.isPartOfSurvey(surveyKeys.short)) {
            this.addItem(Q_instructions(this.key))
        }
        const vacc = q_vacc_def(this.key, true);
        const vacc_FU = q_vacc_def_FU(this.key, true);
        const condition_vacc_yes = CommonExpressions.singleChoiceOptionsSelected(vacc.key, 'yes');
        const condition_vacc_yes_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_FU.key, 'yes');
        const vacc_num = q_vacc_num_def(this.key, true, condition_vacc_yes);
        const vacc_num_FU = q_vacc_num_def_FU(this.key, true);
        // const condition_1vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '1vacc');
        // const condition_1vacc_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_num_FU.key, '1vacc');
        // const condition_2vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '2vacc');
        // const condition_2vacc_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_num_FU.key, '2vacc');
        // const condition_3vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '3vacc');
        // const condition_3vacc_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_num_FU.key, '3vacc');
        // const condition_4vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '4vacc');
        // const condition_4vacc_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_num_FU.key, '4vacc');
        // const condition_5vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '5vacc');
        // const condition_5vacc_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_num_FU.key, '5vacc');
        // const vacc2_date1 = q_vacc2_date1_def(this.key, true, condition_2vacc);
        // const vacc2_date1_FU = q_vacc2_date1_def_FU(this.key, true, condition_2vacc_FU);
        // const vacc3_date1 = q_vacc3_date1_def(this.key, true, condition_3vacc);
        // const vacc3_date1_FU = q_vacc3_date1_def_FU(this.key, true, condition_3vacc_FU);
        // const vacc4_date1 = q_vacc4_date1_def(this.key, true, condition_4vacc);
        // const vacc4_date1_FU = q_vacc4_date1_def_FU(this.key, true, condition_4vacc_FU);
        // const vacc5_date1 = q_vacc5_date1_def(this.key, true, condition_5vacc);
        // const vacc5_date1_FU = q_vacc5_date1_def_FU(this.key, true, condition_5vacc_FU);
        // const vacc_date_latest = q_vacc_date_latest_def(this.key, true, condition_vacc_yes);
        // const vacc_date_latest_FU = q_vacc_date_latest_FU(this.key, true, condition_vacc_yes_FU);

        if (this.isPartOfSurvey(surveyKeys.T0)) { this.addItem(vacc); }
        if (!this.isPartOfSurvey(surveyKeys.T0)) { this.addItem(vacc_FU); }
        this.addItem(vacc_num);

        //change this back
        this.addItem(vacc_num_FU);

        //change
        //this.addItem(q_vacc_num_def_FU(this.key, true, condition_vacc_yes));
        this.addItem(q_vacc_type_latest_def(this.key, true, condition_vacc_yes));
        //this.addItem(q_vacc_type_latest_def_FU(this.key, true,condition_vacc_yes_FU));
        // this.addItem(q_vacc1_date_def(this.key, true, condition_1vacc));
        // this.addItem(q_vacc1_date_def_FU(this.key, true, condition_1vacc_FU));

        // this.addItem(vacc2_date1);
        // this.addItem(vacc2_date1_FU);
        // this.addItem(vacc3_date1);
        // this.addItem(vacc3_date1_FU);
        // this.addItem(vacc4_date1);
        // this.addItem(vacc4_date1_FU);
        // this.addItem(vacc5_date1);
        // this.addItem(vacc5_date1_FU);
        // this.addItem(q_vacc2_date2_def(this.key, true, condition_2vacc, vacc2_date1.key));
        // this.addItem(q_vacc2_date2_def_FU(this.key, true, condition_2vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc3_date2_def(this.key, true, condition_3vacc, vacc2_date1.key));
        // this.addItem(q_vacc3_date2_def_FU(this.key, true, condition_3vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc3_date3_def(this.key, true, condition_3vacc, vacc2_date1.key));
        // this.addItem(q_vacc3_date3_def_FU(this.key, true, condition_3vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc4_date2_def(this.key, true, condition_4vacc, vacc2_date1.key));
        // this.addItem(q_vacc4_date2_def_FU(this.key, true, condition_4vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc4_date3_def(this.key, true, condition_4vacc, vacc2_date1.key));
        // this.addItem(q_vacc4_date3_def_FU(this.key, true, condition_4vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc4_date4_def(this.key, true, condition_4vacc, vacc2_date1.key));
        // this.addItem(q_vacc4_date4_def_FU(this.key, true, condition_4vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc5_date2_def(this.key, true, condition_5vacc, vacc2_date1.key));
        // this.addItem(q_vacc5_date2_def_FU(this.key, true, condition_5vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc5_date3_def(this.key, true, condition_5vacc, vacc2_date1.key));
        // this.addItem(q_vacc5_date3_def_FU(this.key, true, condition_5vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc5_date4_def(this.key, true, condition_5vacc, vacc2_date1.key));
        // this.addItem(q_vacc5_date4_def_FU(this.key, true, condition_5vacc_FU, vacc2_date1_FU.key));
        // this.addItem(q_vacc5_date5_def(this.key, true, condition_5vacc, vacc2_date1.key));
        // this.addItem(q_vacc5_date5_def_FU(this.key, true, condition_5vacc_FU, vacc2_date1_FU.key));
        this.addItem(q_vacc_date_latest_def(this.key, true, condition_vacc_yes));
        this.addItem(q_vacc_date_latest_FU(this.key, true));


        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(q_vacc_influenza_def(this.key, true));
            this.addItem(q_vacc_pneumoc_def(this.key, true));
        }
        this.addItem(Q_instructions2(this.key))
        this.addPageBreak();
    }
}

const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
## **Onderdeel 2 - Vaccinaties**
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

const q_vacc_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je een vaccinatie tegen het coronavirus gehad?"],
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
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_vacc_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1_FU';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Ben je gevaccineerd tegen het coronavirus?"],
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
                     ["nl", "Weet ik niet"],
                 ])
             },
        ],
        isRequired: isRequired,
    });
}

const q_vacc_num_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';

    return SurveyItemGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel vaccinaties tegen het coronavirus heb je in totaal gehad? Als je het niet weet mag je ook een schatting maken."],
        ]),
        responseOptions: [
            
            {
                key: '1vacc', role: 'option',
                content: new Map([
                    ["nl", "1 vaccinatie"],
                ])
            },
            {
                key: '2vacc', role: 'option',
                content: new Map([
                    ["nl", "2 vaccinaties"],
                ])
            },
            {
                key: '3vacc', role: 'option',
                content: new Map([
                    ["nl", "3 vaccinaties"],
                ])
            },
            {
                key: '4vacc', role: 'option',
                content: new Map([
                    ["nl", "4 vaccinaties"],
                ])
            },
            {
                key: '5vacc', role: 'option',
                content: new Map([
                    ["nl", "5 vaccinaties"],
                ])
            },
            {
                key: '6vacc', role: 'option',
                content: new Map([
                    ["nl", "6 vaccinaties"],
                ])
            },
            {
                key: '7vacc', role: 'option',
                content: new Map([
                    ["nl", "7 vaccinaties"],
                ])
            },
            {
                key: '8vacc', role: 'option',
                content: new Map([
                    ["nl", "8 vaccinaties"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_vacc_num_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2_FU';

    return SurveyItemGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel vaccinaties tegen het coronavirus heb je nu in totaal gehad? Als je het niet weet mag je ook een schatting maken."],
        ]),
        responseOptions: [
            {
                key: '1vacc', role: 'option',
                content: new Map([
                    ["nl", "1 vaccinatie"],
                ])
            },
            {
                key: '2vacc', role: 'option',
                content: new Map([
                    ["nl", "2 vaccinaties"],
                ])
            },
            {
                key: '3vacc', role: 'option',
                content: new Map([
                    ["nl", "3 vaccinaties"],
                ])
            },
            {
                key: '4vacc', role: 'option',
                content: new Map([
                    ["nl", "4 vaccinaties"],
                ])
            },
            {
                key: '5vacc', role: 'option',
                content: new Map([
                    ["nl", "5 vaccinaties"],
                ])
            },
            {
                key: '6vacc', role: 'option',
                content: new Map([
                    ["nl", "6 vaccinaties"],
                ])
            },
            {
                key: '7vacc', role: 'option',
                content: new Map([
                    ["nl", "7 vaccinaties"],
                ])
            },
            {
                key: '8vacc', role: 'option',
                content: new Map([
                    ["nl", "8 vaccinaties"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_vacc_type_latest_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Welk vaccin tegen het coronavirus heb je voor het laatst ontvangen?"],
        ]),
        // questionSubText: new Map([
        //     ["nl", "Meerdere antwoorden mogelijk."],
        // ]),
        responseOptions: [
        //    {
        //        key: '0', role: 'option',
        //        content: new Map([
        //            ["nl", "Onbekend"],
        //        ])
        //    },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Pfizer / BioNTech (Comirnaty)"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Moderna"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "AstraZeneca"],
                ])
            },
        //    {
          //      key: '4', role: 'option',
            //    content: new Map([
              //      ["nl", "CureVac"],
             //   ])
           // },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Janssen"],
                ])
            },
         //   {
          //      key: '6', role: 'option',
           //     content: new Map([
           //         ["nl", "GSK / Sanofi Pasteur"],
          //      ])
        //    },
        //    {
        //        key: '8', role: 'option',
         //       content: new Map([
        //            ["nl", "Novavax"],
        //        ])
        //    },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "Anders"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_vacc_type_latest_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3_FU';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Welk vaccin tegen het coronavirus heb je voor het laatst ontvangen?"],
        ]),
        // questionSubText: new Map([
        //     ["nl", "Meerdere antwoorden mogelijk."],
        // ]),
        responseOptions: [
        //    {
        //        key: '0', role: 'option',
        //        content: new Map([
        //            ["nl", "Onbekend"],
        //        ])
        //    },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Pfizer / BioNTech (Comirnaty)"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Moderna"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "AstraZeneca"],
                ])
            },
        //    {
          //      key: '4', role: 'option',
            //    content: new Map([
              //      ["nl", "CureVac"],
             //   ])
           // },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Janssen"],
                ])
            },
         //   {
          //      key: '6', role: 'option',
           //     content: new Map([
           //         ["nl", "GSK / Sanofi Pasteur"],
          //      ])
        //    },
        //    {
        //        key: '8', role: 'option',
         //       content: new Map([
        //            ["nl", "Novavax"],
        //        ])
        //    },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "Anders"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}


// const q_vacc1_date_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q4';

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }


// const q_vacc1_date_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q4_FU';

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vaccinatie tegen het coronavirus gehad sinds de vorige vragenlijst?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc2_date1_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q5';

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }


// const q_vacc2_date1_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q5_FU';
//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc3_date1_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q9';

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }


// const q_vacc3_date1_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q9_FU';
//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc4_date1_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q12';

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }


// const q_vacc4_date1_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q12_FU';
//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }
// const q_vacc5_date1_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q16';

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }


// const q_vacc5_date1_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q16_FU';
//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc2_date2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q6';
//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
//             delta: { days: 5 }
//         }
//         : undefined;

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: firstVaccinationExpression,
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }

// const q_vacc3_date2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q10';
//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
//             delta: { days: 5 }
//         }
//         : undefined;

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: firstVaccinationExpression,
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }


// const q_vacc4_date2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q13';
//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
//             delta: { days: 5 }
//         }
//         : undefined;

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: firstVaccinationExpression,
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }

// const q_vacc5_date2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q17';
//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
//             delta: { days: 5 }
//         }
//         : undefined;

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: firstVaccinationExpression,
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }

// const q_vacc3_date3_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q11';
//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
//             delta: { days: 5 }
//         }
//         : undefined;

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de derde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: firstVaccinationExpression,
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }


// const q_vacc4_date3_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q14';
//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
//             delta: { days: 5 }
//         }
//         : undefined;

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de derde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: firstVaccinationExpression,
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }

// const q_vacc5_date3_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q18';
//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
//             delta: { days: 5 }
//         }
//         : undefined;

//     return SurveyItemGenerators.dateInput({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de derde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         dateInputMode: 'YMD',
//         placeholderText: new Map([
//             ["nl", "dd-mm-jjjj"],
//         ]),
//         minRelativeDate: firstVaccinationExpression,
//         maxRelativeDate: { delta: { seconds: 1 } },
//         isRequired: isRequired,
//     });
// }

// const q_vacc2_date2_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q6_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc3_date2_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q10_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc4_date2_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q13_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc5_date2_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q17_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc3_date3_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q11_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de derde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc4_date3_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q14_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de derde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc5_date3_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q18_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de derde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc4_date4_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q15';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vierde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc5_date4_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q19';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vierde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//         ],
//         isRequired: isRequired,
//     })
// }


// const q_vacc4_date4_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q15_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vierde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc5_date4_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q19_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vierde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }


// const q_vacc5_date5_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q20';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vijfde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

// const q_vacc5_date5_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
//     const itemKey = 'Q20_FU';

//     const firstVaccinationExpression = firstVaccinationKey
//         ? {
//             dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
//                 { days: 5 },
//                 CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
//             )
//         } : undefined;

//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         condition: condition,
//         questionText: new Map([
//             ["nl", "Op welke datum heb je de vijfde vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '0', role: 'dateInput',
//                 content: new Map([
//                     ["nl", "Op deze datum:"],
//                 ]),
//                 optionProps: {
//                     min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
//                     max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
//                 },
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
//                 ])
//             },
//         ],
//         isRequired: isRequired,
//     })
// }

const q_vacc_date_latest_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
        const itemKey = 'Q21';
    
    const firstVaccinationExpression = firstVaccinationKey
        ? {
            dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
                { days: 5 },
                CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
            )
        } : undefined;

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de laatste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'dateInput',
                content: new Map([
                    ["nl", "Op deze datum:"],
                ]),
                optionProps: {
                    min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
                    max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
                },
            },
        ],
        isRequired: isRequired,
    })
}
       
const q_vacc_date_latest_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string,): SurveyItem => {
    const itemKey = 'Q21_FU';

    const firstVaccinationExpression = firstVaccinationKey
        ? {
            dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
                { days: 5 },
                CommonExpressions.getResponseValueAsNum(firstVaccinationKey, 'rg.scg.0'),
            )
        } : undefined;

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de laatste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'dateInput',
                content: new Map([
                    ["nl", "Op deze datum:"],
                ]),
                optionProps: {
                    min: firstVaccinationExpression ? firstVaccinationExpression as ExpressionArg : { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }, 1609459200) },
                    max: { dtype: 'exp', exp: CommonExpressions.timestampWithOffset({ seconds: 1 }) },
                },
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Dat heb ik in de vorige vragenlijst al aangegeven"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_vacc_influenza_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q7';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je een griepvaccinatie gehad het afgelopen najaar?"],
        ]),
        questionSubText: new Map([
            ["nl", "Mensen die in aanmerking komen voor de griepprik ontvangen hiervoor elk jaar in oktober een uitnodiging van de huisarts of de werkgever."],
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
                key: 'dontknow', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Dat wil ik niet aangeven"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_vacc_pneumoc_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q8';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Ben je het afgelopen najaar gevaccineerd tegen pneumokokken?"],
        ]),
        questionSubText: new Map([
            ["nl", "Mensen die in aanmerking komen voor het pneumokokkenvaccin hebben hiervoor in het najaar een uitnodiging ontvangen van de huisarts."],
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
                key: 'dontknow', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Dat wil ik niet aangeven"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const Q_instructions2 = (parentKey: string): SurveyItem => {
    const markdownContent = `
###### _Dit is het einde van Onderdeel 2. Onderdeel 3 van deze vragenlijst gaat over gezondheidsklachten en zorggebruik._

`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro3',
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
