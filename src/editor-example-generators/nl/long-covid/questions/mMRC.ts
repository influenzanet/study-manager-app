import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";

export const Q_mMRC = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'mMRC';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "mMRC?"],
        ]),
        responseOptions: [{
            key: 'todo', role: 'option',
            content: new Map([
                ["nl", "TODO"],
            ])
        },]
    })
}
