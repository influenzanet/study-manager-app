import { SurveyItem } from "survey-engine/lib/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";

export const Q_IPAQ = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'DvIPAQ';
    return SurveyItemGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Hoeveel tijd bracht je gewoonlijk zittend door gedurende een doordeweekse dag in de afgelopen 7 dagen?"],
        ]),
    
        topDisplayCompoments: [
            {
                role: 'text',
                style: [{ key: 'variant', value: 'p' }],
                content: generateLocStrings(new Map([
                    ["nl", "Bij deze tijd mag zitten achter een bureau, tijd die zittend wordt doorgebracht met vrienden, zittend lezen, studeren of tv kijken worden gerekend."],
                ]))
            },
        ],
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "minder dan 1 uur"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "1 uur"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "2 uur"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "3 uur"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "4 uur"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "5 uur"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "6 uur"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "7 uur"],
                ])
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "8 uur"],
                ])
            },
            {
                key: '9', role: 'option',
                content: new Map([
                    ["nl", "9 uur"],
                ])
            },
            {
                key: '10', role: 'option',
                content: new Map([
                    ["nl", "10 uur"],
                ])
            },
            {
                key: '11', role: 'option',
                content: new Map([
                    ["nl", "11 uur"],
                ])
            },
            {
                key: '12', role: 'option',
                content: new Map([
                    ["nl", "12 uur"],
                ])
            },
            {
                key: '13', role: 'option',
                content: new Map([
                    ["nl", "13 uur"],
                ])
            },
            {
                key: '14', role: 'option',
                content: new Map([
                    ["nl", "14 uur"],
                ])
            },
            {
                key: '15', role: 'option',
                content: new Map([
                    ["nl", "15 uur"],
                ])
            },
            {
                key: '16', role: 'option',
                content: new Map([
                    ["nl", "16 uur"],
                ])
            },
            {
                key: '17', role: 'option',
                content: new Map([
                    ["nl", "meer dan 16 uur"],
                ])
            },
        ]
    });
}
