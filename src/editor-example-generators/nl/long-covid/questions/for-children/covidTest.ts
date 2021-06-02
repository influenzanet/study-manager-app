import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";

export class CovidTestGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'TEST';
        super(parentKey, groupKey);

        const isRequired = true;

        const q1 = this.Q_hadTest('Q1', isRequired);
        const conditionQ1Ja = CommonExpressions.singleChoiceOptionsSelected(q1.key, 'yes');
        const q5 = this.Q5('Q5', conditionQ1Ja, isRequired)
        const conditionQ5Positive = CommonExpressions.singleChoiceOptionsSelected(q5.key, 'TODO: add correct option key here');
        const q7 = this.Q7('Q7', isRequired);
        const conditionQ7Positive = CommonExpressions.singleChoiceOptionsSelected(q7.key, 'TODO: add correct option key here');
        const conditionQ7Geen = CommonExpressions.singleChoiceOptionsSelected(q7.key, 'TODO: add correct option key here');
        const conditionQ7Nee = CommonExpressions.singleChoiceOptionsSelected(q7.key, 'TODO: add correct option key here');


        this.addItem(q1);
        this.addItem(this.Q_test_date('Q2', conditionQ1Ja, isRequired));
        this.addItem(this.Q3('Q3', conditionQ1Ja, isRequired));
        this.addItem(this.Q4('Q4', conditionQ1Ja, isRequired));
        this.addItem(q5);
        this.addItem(this.Q6('Q6', conditionQ5Positive, isRequired));
        this.addItem(q7);
        this.addItem(this.Q8('Q8', conditionQ7Positive, isRequired));
        this.addItem(this.Q9('Q9', conditionQ7Positive, isRequired));
        this.addItem(this.Q10('Q10', conditionQ7Geen, isRequired));
        this.addItem(this.Q11('Q11', conditionQ7Nee, isRequired));

        this.addPageBreak();
    }

    /**
     *
     */
    Q_hadTest(key: string, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "Heb je afgelopen 7 dagen een test gedaan om te weten of je corona hebt?"],
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
            minRelativeDate: { delta: { days: -10 } },
            maxRelativeDate: { delta: { seconds: 1 } },
            isRequired: isRequired,
        });
    }

    /**
     *
     */
    Q3(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q3"],
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
    Q4(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q5"],
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
    Q5(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q5"],
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
    Q6(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q5"],
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
    Q7(key: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            questionText: new Map([
                ["nl", "TODO: Q7"],
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
    Q8(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q5"],
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
    Q9(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q9 - Wanneer is deze test afgenomen?"],
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

    /**
     *
     */
    Q10(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q10 - Wanneer is deze test afgenomen?"],
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

    /**
     *
     */
    Q11(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q11"],
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

}
