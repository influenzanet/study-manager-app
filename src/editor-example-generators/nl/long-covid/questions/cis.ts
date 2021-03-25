import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";

export const Q_CIS = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'CIS';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "CIS?"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["nl", "1 = ja, dat klopt, 7 = nee, dat klopt niet"],
            ]))
        }],
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "1"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "2"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "3"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "4"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "5"],
                ])
            }, {
                key: '6', content: new Map([
                    ["nl", "6"],
                ])
            }, {
                key: '7', content: new Map([
                    ["nl", "7"],
                ])
            }
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
            {
                key: 'h', content: new Map([
                    ["nl", "TODO: h"],
                ])
            },
        ]
    });
}
