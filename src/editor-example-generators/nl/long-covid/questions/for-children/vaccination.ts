import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";

export class VaccinationGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression;
    }, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'VAC';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        const Q1 = this.Q1("Q1", isRequired);
        const conditionQ1Ja = CommonExpressions.singleChoiceOptionsSelected(Q1.key, 'yes');

        const Q2 = this.Q2('Q2', conditionQ1Ja, isRequired)
        const condition1Vac = CommonExpressions.singleChoiceOptionsSelected(Q2.key, '1vacc');
        const condition2Vac = CommonExpressions.singleChoiceOptionsSelected(Q2.key, '2vacc');

        const Q5 = this.Q5('Q5', condition2Vac, isRequired);
        const dateForFirstVac = CommonExpressions.getDatePickerResponseValue(Q5.key);

        this.addItem(this.groupIntro());
        this.addItem(Q1);
        this.addItem(Q2);
        this.addItem(this.Q3('Q3', conditionQ1Ja, isRequired));
        this.addItem(this.Q4('Q4', condition1Vac, isRequired));
        this.addItem(Q5);
        this.addItem(this.Q6('Q6', condition2Vac, dateForFirstVac, isRequired));
        this.addItem(this.Q7('Q7', isRequired));
        this.addItem(this.Q8('Q8', isRequired));
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
## Vaccinaties

**De vragen hieronder zijn gericht aan een minderjarige.**

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
                        `]
                    ])
                })]
        })
    }

    Q1(key: string, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "Heb je een vaccinatie tegen het coronavirus gehad?"],
            ]),
            responseOptions: [
                {
                    key: 'no', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
                {
                    key: 'yes', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
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
                        ["nl", "Weet ik niet"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q2(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
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

    Q3(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Welk vaccin tegen het coronavirus heb je ontvangen? "],
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

    Q4(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Op welke datum heb je de vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            //minRelativeDate: { delta: { days: -10 } },
            maxRelativeDate: { delta: { seconds: 1 } },
            isRequired: isRequired,
        });
    }

    Q5(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Op welke datum heb je de eerste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            //minRelativeDate: { delta: { days: -10 } },
            maxRelativeDate: { delta: { seconds: 1 } },
            isRequired: isRequired,
        });
    }

    Q6(key: string, condition: Expression, dateForFirstVac: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Op welke datum heb je de laatste vaccinatie tegen het coronavirus gehad (je mag de datum ook schatten)"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: {
                reference: dateForFirstVac,
                delta: { days: 5 }
            },
            maxRelativeDate: { delta: { seconds: 1 } },
            isRequired: isRequired,
        });
    }

    Q7(key: string, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "Heb je een griepvaccinatie gehad in het najaar van 2020? "],
            ]),
            questionSubText: new Map([
                ["nl", "Kinderen die in aanmerking komen voor de griepprik ontvangen hiervoor elk jaar in oktober een uitnodiging van de huisarts."],
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

    Q8(key: string, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "Ben je gevaccineerd volgens het Rijksvaccinatieprogramma? "],
            ]),
            responseOptions: [
                {
                    key: 'yes', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ])
                },
                {
                    key: 'yesnotall', role: 'option',
                    content: new Map([
                        ["nl", "Ja, maar niet alle vaccinaties"],
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
}
