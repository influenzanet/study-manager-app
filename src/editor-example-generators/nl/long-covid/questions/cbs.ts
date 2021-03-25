import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";

export const Q_CBS = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'CBS';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "CBS?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "TODO"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "TODO: a"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "TODO: b"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "TODO: c"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "TODO: d"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "TODO: e"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "TODO: f"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "TODO: g"],
                ])
            },
        ]
    });
}
