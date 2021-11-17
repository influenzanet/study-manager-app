import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../../studyRules";

export class CovidTestGroup extends GroupItemEditor {
    q11JaSelectedExp?: Expression;

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'TEST';
        super(parentKey, groupKey);

        const isRequired = true
        if (this.isPartOfSurvey(surveyKeys.T3) || this.isPartOfSurvey(surveyKeys.short)) {
            const followUpCondition = CommonExpressions.hasParticipantFlag('testResult', 'unknown');
            this.addItem(this.Q_testFollowUp('Q5followup', followUpCondition, isRequired))
        }
        const q1 = this.Q_hadTest('Q1', isRequired);
        const q1_FU = this.Q_hadTest_FU('Q1_FU', isRequired);
        const conditionQ1Ja = CommonExpressions.or(
            CommonExpressions.singleChoiceOptionsSelected(q1.key, 'yes', 'yes>7', 'yes>14'),
            CommonExpressions.singleChoiceOptionsSelected(q1_FU.key, 'yes')
        );
        const q5 = this.Q5('Q5', conditionQ1Ja, isRequired)
        const conditionQ5Positive = CommonExpressions.singleChoiceOptionsSelected(q5.key, 'pos');
        const q7 = this.Q7('Q7', isRequired);
        const conditionQ7Positive = CommonExpressions.singleChoiceOptionsSelected(q7.key, 'pos_earl_test');
        const conditionQ7Geen = CommonExpressions.singleChoiceOptionsSelected(q7.key, 'pos_earl_notest');
        // const conditionQ7Nee = CommonExpressions.singleChoiceOptionsSelected(q7.key, 'no');
        const conditionQ7Ja = CommonExpressions.singleChoiceOptionsSelected(q7.key, 'pos_earl_test', 'pos_earl_notest', 'pos_earl_maybe_notest', 'unknown');

        this.addItem(this.groupIntro());
        if (this.isPartOfSurvey(surveyKeys.T0) || this.isPartOfSurvey(surveyKeys.short)) {
            this.addItem(q1);
        } else {
            this.addItem(q1_FU);
        }
        this.addItem(this.Q_test_date('Q2', conditionQ1Ja, isRequired));
        this.addItem(this.Q3('Q3', conditionQ1Ja, isRequired));
        this.addItem(this.Q4('Q4', conditionQ1Ja, isRequired));
        this.addItem(q5);
        this.addItem(this.Q6('Q6', conditionQ5Positive, isRequired));
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(q7);
            this.addItem(this.Q8('Q8', conditionQ7Positive, isRequired));
            this.addItem(this.Q9('Q9', conditionQ7Positive, isRequired));
            this.addItem(this.Q10('Q10', conditionQ7Geen, isRequired));
        }

        if (!this.isPartOfSurvey(surveyKeys.shortC)) {
            const q11 = this.Q11(
                'Q11',
                this.isPartOfSurvey(surveyKeys.T0) ? conditionQ7Ja : undefined, // condition when to display, if undefined, it will be displayed
                isRequired
            );
            this.q11JaSelectedExp = CommonExpressions.singleChoiceOptionsSelected(q11.key, 'ja');
            this.addItem(q11);
        }
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
## Testen op het coronavirus

**De vragen hieronder zijn gericht aan een minderjarige.**

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
                        `]
                    ])
                })]
        })
    }

    Q_testFollowUp(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
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

    /**
     *
     */
    Q_hadTest(key: string, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
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

    Q_hadTest_FU(key: string, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "Heb je sinds de vorige vragenlijst een test gedaan om te weten of je corona hebt?"],
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
            ],
            isRequired: isRequired,
        });
    }

    /**
     *
     */
    Q_test_date(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Wanneer is deze test afgenomen?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: { delta: { days: -300 } },
            maxRelativeDate: { delta: { seconds: 1 } },
            isRequired: isRequired,
        });
    }


    Q3(key: string, condition: Expression, isRequired: boolean) {

        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Waar heb je jezelf laten testen op het coronavirus?"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["nl", "Ziekenhuis of huisarts"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "GGD Teststraat"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "GGD kwam naar mijn huis"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Met een zelftest"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    content: new Map([
                        ["nl", "Op school"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["nl", "Op mijn werk"],
                    ])
                },
                {
                    key: '6', role: 'option',
                    content: new Map([
                        ["nl", "In het buitenland"],
                    ])
                },
                {
                    key: '7', role: 'option',
                    content: new Map([
                        ["nl", "Dat weet ik niet (meer)"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }





    /**
     *
     */
    Q4(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
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



    /**
     *
     */
    Q5(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
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


    /**
     *
     */
    Q6(key: string, condition: Expression, isRequired: boolean) {
        const optionNoneSelected = CommonExpressions.multipleChoiceOptionsSelected([this.key, key].join('.'), '3');

        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Met welk type coronatest is deze uitslag bepaald?"],
            ]),
            questionSubText: new Map([
                ["nl", "Meerdere antwoorden mogelijk."],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    disabled: optionNoneSelected,
                    content: new Map([
                        ["nl", "Met een PCR of antigeen sneltest"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    disabled: optionNoneSelected,
                    content: new Map([
                        ["nl", "Met een bloedtest (serologie) "],
                    ])
                },
                {
                    key: '2', role: 'option',
                    disabled: optionNoneSelected,
                    content: new Map([
                        ["nl", "Met een zelftest"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([this.key, key].join('.'), '3'),
                    content: new Map([
                        ["nl", "Weet ik niet"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }



    /**
     *
     */
    Q7(key: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "Ben je al eerder besmet geweest met het coronavirus sinds de start van de pandemie in Nederland (februari 2020)?"],
            ]),
            questionSubText: new Map([
                ["nl", "Het gaat hier om een eerdere infectie, meer dan 30 dagen geleden."],
            ]),
            responseOptions: [
                {
                    key: 'pos_earl_test', role: 'option',
                    content: new Map([
                        ["nl", "Ja, bevestigd met een positieve test"],
                    ])
                },
                {
                    key: 'pos_earl_notest', role: 'option',
                    content: new Map([
                        ["nl", "Ja, ik denk het wel maar er is geen test gedaan"],
                    ])
                },
                {
                    key: 'pos_earl_maybe_notest', role: 'option',
                    content: new Map([
                        ["nl", "Misschien wel, maar er is geen test gedaan"],
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



    /**
     *
     */
    Q8(key: string, condition: Expression, isRequired: boolean) {
        const optionNoneSelected = CommonExpressions.multipleChoiceOptionsSelected([this.key, key].join('.'), '3');

        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Met welk type coronatest is deze uitslag bepaald?"],
            ]),
            questionSubText: new Map([
                ["nl", "Meerdere antwoorden mogelijk."],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    disabled: optionNoneSelected,
                    content: new Map([
                        ["nl", "Met een PCR of antigeen sneltest"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    disabled: optionNoneSelected,
                    content: new Map([
                        ["nl", "Met een bloedtest (serologie)"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    disabled: optionNoneSelected,
                    content: new Map([
                        ["nl", "Met een zelftest"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([this.key, key].join('.'), '3'),
                    content: new Map([
                        ["nl", "Weet ik niet"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }



    /**
     *
     */
    Q9(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Wanneer is deze test (ongeveer) afgenomen?"],
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

    /**
     *
     */
    Q10(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Wanneer denk je dat je besmet bent met het coronavirus (ongeveer)?"],
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

    /**
     *
     */
    Q11(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Heb je langdurige gezondheidsklachten waarvan je denkt dat deze door het kunnen coronavirus komen?"],
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
                {
                    key: 'notanymore', role: 'option',
                    content: new Map([
                        ["nl", "Nee, niet meer"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

}
