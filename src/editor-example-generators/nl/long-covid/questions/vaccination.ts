import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class VaccinationGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'VAC';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        const C2q1 = q_C2q1_def(this.key, true);
        const condition_vaccine_received = CommonExpressions.singleChoiceOptionsSelected(C2q1.key, '1');
        const C2q2 = q_C2q2_def(this.key, true, condition_vaccine_received);
        const condition_1_vaccine = CommonExpressions.singleChoiceOptionsSelected(C2q2.key, '0');
        const condition_2_vaccines = CommonExpressions.singleChoiceOptionsSelected(C2q2.key, '1');
        const C2q5 = q_C2q5_def(this.key, true, condition_2_vaccines);

        this.addItem(C2q1);
        this.addItem(C2q2);
        this.addItem(q_C2q3_def(this.key, true, condition_vaccine_received));
        this.addItem(q_C2q4_def(this.key, true, condition_1_vaccine));
        this.addItem(C2q5);
        this.addItem(q_C2q6_def(this.key, true, condition_2_vaccines, C2q5.key));
        this.addItem(q_C2q7_def(this.key, true));
        this.addItem(q_C2q8_def(this.key, true));
    }
}

const q_C2q1_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q1';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je een vaccinatie tegen het coronavirus gehad?"],
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
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_C2q2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q2';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Hoeveel vaccinaties tegen het coronavirus heb je gehad?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "1 vaccinatie"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "2 vaccinaties"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_C2q3_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q3';

    return QuestionGenerators.singleChoice({
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

const q_C2q4_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q4';

    return QuestionGenerators.dateInput({
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


const q_C2q5_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q5';

    return QuestionGenerators.dateInput({
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

const q_C2q6_def = (parentKey: string, isRequired?: boolean, condition?: Expression, firstVaccintationKey?: string, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q6';
    const firstVaccinationExpression = firstVaccintationKey ? CommonExpressions.getDatePickerResponseValue(firstVaccintationKey) : undefined;

    return QuestionGenerators.dateInput({
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
        minRelativeDate: {
            reference: firstVaccinationExpression,
            days: 5
        },
        maxRelativeDate: { seconds: 1 },
        isRequired: isRequired,
    });
}

//TODO: Bold
const q_C2q7_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q7';

    return QuestionGenerators.singleChoice({
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
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

//TODO: Bold
const q_C2q8_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C2q8';

    return QuestionGenerators.singleChoice({
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
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}
