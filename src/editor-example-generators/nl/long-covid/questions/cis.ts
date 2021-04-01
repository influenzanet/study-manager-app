import { SurveyItem } from "survey-engine/lib/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";

export const Q_CIS = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'CIS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Vermoeidheid"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'variant', value: 'p' }],
            content: generateLocStrings(new Map([
                ["nl", "Op deze pagina staan 8 uitspraken waarmee je kunt aangeven hoe je jezelf de laatste twee weken hebt gevoeld."],
            ]))
        },

        {
            role: 'text',
            style: [{ key: 'variant', value: 'p' }],
            content: generateLocStrings(new Map([
                ["nl", "Klik hieronder aan welk van de antwoorden het meest overeenkomt met uw gevoel."],
            ]))
        },
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-1 border-bottom border-1 border-grey-5 pt-1 mt-2 fw-bold' }],
            content: generateLocStrings(new Map([
                ["nl", "1 = ja, dat klopt, 7 = nee, dat klopt niet"],
            ]))
        }
        ],
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
                    ["nl", "Ik voel me moe"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "Lichamelijk voel ik me uitgeput"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Ik voel me fit"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "Ik voel me slap"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "Ik voel me uitgerust"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "Lichamelijk voel ik me in een slechte conditie"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "Ik ben gauw moe"],
                ])
            },
            {
                key: 'h', content: new Map([
                    ["nl", "Lichamelijk voel ik me in een uitstekende conditie"],
                ])
            },
        ]
    });
}
