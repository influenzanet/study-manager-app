import { Survey } from "survey-engine/lib/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";

export const generate_EG0829PRE = (): Survey | undefined => {
    const surveyKey = surveyKeys.EG_0829_PRE;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["de", "Vragenlijst start LongCOVID-onderzoek"],
        ]),
        description: new Map([
            ["de", "Dit is de eerste vragenlijst van het LongCOVID-onderzoek. De vragenlijst richt zich op je gezondheid, vaccinaties en zorggebruik."],
        ]),
        durationText: new Map([
            ["de", "Invullen van deze vragenlijst kost ongeveer 30 minuten van je tijd."],
        ])
    })

    // TODO: add questions
    surveyEditor.addSurveyItemToRoot(Q1(surveyKey));

    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'TODO: Text for end of survey']
    ])));

    return surveyEditor.getSurvey();
}

const Q1 = (parentKey: string) => {
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: "TODO",
        isRequired: true,
        questionText: new Map([
            ["nl", "Geef aan hoe benauwd / kortademig je jezelf de meeste dagen van de afgelopen maand voelde:"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["nl", "1 = helemaal niet benauwd/kortademig, 10 = heel erg benauwd/kortademig"],
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
                    ["de", "3"],
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
            }, {
                key: '8', content: new Map([
                    ["nl", "8"],
                ])
            }, {
                key: '9', content: new Map([
                    ["nl", "9"],
                ])
            }, {
                key: '10', content: new Map([
                    ["nl", "10"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "Test test test"],
                ])
            },
        ]
    });
}
