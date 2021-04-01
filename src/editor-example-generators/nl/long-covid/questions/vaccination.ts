import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class VaccinationGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'VAC';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        const vacc = q_vacc_def(this.key, true);
        const condition_vacc_yes = CommonExpressions.singleChoiceOptionsSelected(vacc.key, 'yes');
        const vacc_num = q_vacc_num_def(this.key, true, condition_vacc_yes);
        const condition_1vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '1vacc');
        const condition_2vacc = CommonExpressions.singleChoiceOptionsSelected(vacc_num.key, '2vacc');
        const vacc2_date1 = q_vacc2_date1_def(this.key, true, condition_2vacc);

        this.addItem(vacc);
        this.addItem(vacc_num);
        this.addItem(q_vacc_type_def(this.key, true, condition_vacc_yes));
        this.addItem(q_vacc1_date_def(this.key, true, condition_1vacc));
        this.addItem(vacc2_date1);
        this.addItem(q_vacc2_date2_def(this.key, true, condition_2vacc, vacc2_date1.key));
        this.addItem(q_vacc_influenza_def(this.key, true));
        this.addItem(q_vacc_pneumoc_def(this.key, true));
    }
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

const q_vacc_type_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Welk vaccin tegen het coronavirus heb je ontvangen?"],
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
        maxRelativeDate: { seconds: 1 },
        isRequired: isRequired,
    });
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
        maxRelativeDate: { seconds: 1 },
        isRequired: isRequired,
    });
}

const q_vacc2_date2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccinationKey?: string, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';
    const firstVaccinationExpression = firstVaccinationKey
        ? {
            reference: CommonExpressions.getDatePickerResponseValue(firstVaccinationKey),
            days: 5
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
        maxRelativeDate: { seconds: 1 },
        isRequired: isRequired,
    });
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
