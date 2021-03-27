import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";

export const Q_mMRC = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'mMRC';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Welke van de onderstaande uitspraken is voor u het meest van toepassing?"],
        ]),
        responseOptions: [{
            key: '1', role: 'option',
            content: new Map([
                ["nl", "Ik word alleen kortademig bij zware inspanning."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl", "Ik word alleen kortademig als ik me moet haasten op vlak terrein of als ik tegen een lichte helling oploop."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl", "Door mijn kortademigheid loop ik op vlak terrein langzamer dan andere mensen van mijn leeftijd of moet ik stoppen om op adem te komen als ik mijn eigen tempo loop."],
            ])
        },
       {
            key: '4', role: 'option',
            content: new Map([
                ["nl", "Na ongeveer 100 meter lopen op vlak terrein moet ik na een paar minuten stoppen om op adem te komen."],
            ])
        },
       {
            key: '5', role: 'option',
            content: new Map([
                ["nl", "Ik ben te kortademig om het huis uit te gaan, of ik ben kortademig tijdens het aan- of uitkleden."],
            ])
        },
    ],
    })
}