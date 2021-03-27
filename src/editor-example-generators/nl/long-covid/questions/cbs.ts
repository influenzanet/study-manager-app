import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";

export const Q_CBS = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'CBS';
    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Eenzaamheid"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'variant', value: 'p' }],
            content: generateLocStrings(new Map([
                ["nl", "Hieronder volgen 6 uitspraken. Wil je van elk van de volgende uitspraken aangeven in hoeverre die op jou, zoals je de laatste tijd bent, van toepassing is?"],
            ]))
        },
    ],
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "ja"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "min of meer"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "nee"],
                ])
            },
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "Ik ervaar een leegte om me heen"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "Er zijn genoeg mensen op wie ik in geval van narigheid kan terugvallen"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Ik heb veel mensen op wie ik volledig kan vertrouwen"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "Ik mis mensen om me heen"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "Er zijn voldoende mensen met wie ik me nauw verbonden voel"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "Vaak voel ik me in de steek gelaten"],
                ])
            },
           
        ]
    });
}
