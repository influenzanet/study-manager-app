import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../studyRules";

export class VaccinationGroup extends GroupItemEditor {

    constructor(parentKey: string, isT0: boolean, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'VAC';
        super(parentKey, groupKey);
        this.initQuestions(isT0);
    }

    initQuestions(isT0: boolean) {

        if (!this.isPartOfSurvey(surveyKeys.short)) {
            this.addItem(Q_instructions(this.key))
        }
        if (!this.isPartOfSurvey(surveyKeys.T0)) {this.addItem(Q_instructionsVACCFU(this.key));}
        const vacc = q_vacc_def(this.key, true);
        const vacc_FU = q_vacc_def_FU(this.key, true);
        const condition_vacc_yes = CommonExpressions.singleChoiceOptionsSelected(vacc.key, 'yes');
        const condition_vacc_yes_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_FU.key, 'yes');
        const vacc_num = q_vacc_num_def(this.key, true, condition_vacc_yes);
        const vacc_num_FU = q_vacc_num_def_FU(this.key, true, condition_vacc_yes_FU);
        const condition_1vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '1vacc');
        const condition_1vacc_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_num_FU.key, '1vacc');
        const condition_2vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '2vacc');
        const condition_2vacc_FU = CommonExpressions.singleChoiceOptionsSelected(vacc_num_FU.key, '2vacc');
        const vacc2_date1 = q_vacc2_date1_def(this.key, true, condition_2vacc);
        const vacc2_date1_FU = q_vacc2_date1_def_FU(this.key, true, condition_2vacc_FU);

        if (this.isPartOfSurvey(surveyKeys.T0)) {this.addItem(vacc);}
        if (!this.isPartOfSurvey(surveyKeys.T0)) {this.addItem(vacc_FU);}
        this.addItem(vacc_num);
        this.addItem(vacc_num_FU);
        this.addItem(q_vacc_type_def(this.key, true, condition_vacc_yes));
        this.addItem(q_vacc_type_def_FU(this.key, true, condition_vacc_yes_FU));
        this.addItem(q_vacc1_date_def(this.key, true, condition_1vacc));
        this.addItem(q_vacc1_date_def_FU(this.key, true, condition_1vacc_FU));

        this.addItem(vacc2_date1);
        this.addItem(vacc2_date1_FU);
        this.addItem(q_vacc2_date2_def(this.key, true, condition_2vacc, vacc2_date1.key));
        this.addItem(q_vacc2_date2_def_FU(this.key, true, condition_2vacc_FU, vacc2_date1_FU.key));

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

const Q_instructionsVACCFU = (parentKey: string): SurveyItem => {
    const markdownContent = `
**LET OP: deze vragen over vaccinaties hoef je alleen in te vullen indien je sinds de vorige vragenlijst een vaccinatie hebt gehad.**
`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'introVACC',
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
            ["nl", "Heb je een vaccinatie tegen het coronavirus gehad sinds de vorige vragenlijst?"],
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

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel vaccinaties tegen het coronavirus heb je gehad?"],
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
        ],
        isRequired: isRequired,
    });
}

const q_vacc_num_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2_FU';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel vaccinaties tegen het coronavirus heb je gehad sinds de vorige vragenlijst?"],
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
        ],
        isRequired: isRequired,
    });
}

const q_vacc_type_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Welk vaccin tegen het coronavirus heb je ontvangen?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Onbekend"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "BioNTech / Pfizer (Comirnaty)"],
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
                    ["nl", "Universiteit van Oxford / AstraZeneca"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "CureVac"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Janssen / Johnson&Johnson"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "GSK / Sanofi Pasteur"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_vacc_type_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3_FU';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Welk vaccin tegen het coronavirus heb je ontvangen sinds de vorige vragenlijst?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Onbekend"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "BioNTech / Pfizer (Comirnaty)"],
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
                    ["nl", "Universiteit van Oxford / AstraZeneca"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "CureVac"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Janssen / Johnson&Johnson"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "GSK / Sanofi Pasteur"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}


const q_vacc1_date_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// TODO: add restrictions date: not in future and not before january 2021
const q_vacc1_date_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4_FU';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de vaccinatie tegen het coronavirus gehad sinds de vorige vragenlijst (je mag de datum ook schatten)?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'dateInput',
                content: new Map([
                    ["nl", "Op deze datum:"],
                ]),
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

const q_vacc2_date1_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// TODO: add restrictions date: not in future and not before january 2021
const q_vacc2_date1_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5_FU';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad sinds de vorige vragenlijst (je mag de datum ook schatten)?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'dateInput',
                content: new Map([
                    ["nl", "Op deze datum:"],
                ]),
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

const q_vacc2_date2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';
    const firstVaccinationExpression = firstVaccinationKey
        ? {
            reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
            delta: { days: 5 }
        }
        : undefined;

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de laatste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: firstVaccinationExpression,
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

// TODO: add restrictions date: not in future and not before january 2021
const q_vacc2_date2_def_FU = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6_FU';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Op welke datum heb je de tweede vaccinatie tegen het coronavirus gehad sinds de vorige vragenlijst (je mag de datum ook schatten)?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'dateInput',
                content: new Map([
                    ["nl", "Op deze datum:"],
                ]),
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
            ["nl", "Heb je een griepvaccinatie gehad in het najaar van 2020?"],
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
            ["nl", "Ben je in het najaar van 2020 gevaccineerd tegen pneumokokken?"],
        ]),
        questionSubText: new Map([
            ["nl", "Mensen die in aanmerking komen voor het pneumokokkenvaccin hebben hiervoor in het najaar van 2020 een uitnodiging ontvangen van de huisarts."],
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