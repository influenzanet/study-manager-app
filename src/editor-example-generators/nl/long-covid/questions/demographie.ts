import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class DemographieGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'DEM';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_age(this.key, true))
        this.addItem(q_gender(this.key, true))


        const q11Condition = expWithArgs('gt', 10, 1);
        this.addItem(new Q12Group(this.key, q11Condition).getItem());
    }
}

const q_age = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return QuestionGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        dateInputMode: 'YM',
        questionText: new Map([
            ["nl", "Q1: Age?"],
        ]),
        minRelativeDate: {
            years: -110
        },
        maxRelativeDate: {
            years: -10
        },
        isRequired: isRequired,
    });
}

const q_gender = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Q2: Gender?"],
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
        ]
    })
}



class Q12Group extends GroupItemEditor {
    constructor(parentKey: string, condition: Expression, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'DEM';
        super(parentKey, groupKey);
        this.groupEditor.setCondition(condition)
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_12a(this.key, true))
        this.addItem(q_12b(this.key, true))
        //TODO: Add following questions.
    }
}

const q_12a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'a';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Q12a?"],
        ]),
        responseOptions: []
    });
}

const q_12b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'b';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Q12b?"],
        ]),
        responseOptions: []
    });
}
