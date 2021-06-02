import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";


export class HealthGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
        hasDifficultyWithBreathing: Expression,
        youngerThan8: Expression,
    }) {
        const groupKey = 'HEALTH';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        const Q2 = this.Q2('Q2', isRequired);
        const conditionQ2ja = CommonExpressions.singleChoiceOptionsSelected(Q2.key, 'ja');

        const Q4 = this.Q4('Q4', isRequired);
        const conditionQ4ja = CommonExpressions.singleChoiceOptionsSelected(Q4.key, 'ja');

        const conditionForQ6 = CommonExpressions.and(
            conditions.hasDifficultyWithBreathing,
            conditions.youngerThan8,
        );

        //
        this.addItem(this.groupIntro());
        this.addItem(this.Q0('Q0', isRequired));
        this.addItem(this.Q1('Q1', isRequired));
        this.addItem(Q2);
        this.addItem(this.Q3('Q3', conditionQ2ja, isRequired));
        this.addItem(Q4)
        this.addItem(this.Q5('Q5', conditionQ4ja, isRequired));
        this.addItem(this.Q6('Q6', conditionForQ6, isRequired));
        this.addItem(this.Q7('Q7', isRequired));

        // TODO: Q8
        // TODO: Q9
        // TODO: Q10
        // TODO: Q11
        // TODO: Q12
        // TODO: Q13
        // TODO: Q14
        // TODO: Q15
        // TODO: Q16
        // TODO: Q17
        // TODO: Q18
        // TODO: Q19
        // TODO: Q20
        // TODO: Q21
        // TODO: Q22
        // TODO: Q23
        // TODO: Q24
        // TODO: Q25



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
TODO: health intro for children
                        `]
                    ])
                })]
        })
    }

    /**
     *
     */
    Q0(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q0"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q1"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q2"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q3(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q3"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q4"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q5(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q5"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q6(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "TODO: Q6"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q7(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q7"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    /**
    *
    */
    Q8(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "TODO: Q8"],
            ]),
            responseOptions: [
                {
                    key: 'todo', role: 'option',
                    content: new Map([
                        ["nl", "TODO"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }
}

