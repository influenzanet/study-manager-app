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
    surveyEditor.addSurveyItemToRoot(Q2(surveyKey));
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
            ["de", "Inwieweit stimmen Sie den folgenden Aussagen zu? "],
        ]),
        //topDisplayCompoments: [{
          //  role: 'text',
           // style: [{ key: 'className', value: 'mb-2' }]
            //content: generateLocStrings(new Map([
            //    ["de", "1 = Stimme voll und ganz zu, 10 = Stimme überhaupt nicht zu"],
            //]))
        //}],
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stimme voll und ganz zu"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Stimme eher zu"],
                ])
            }, {
                key: '3', content: new Map([
                    ["de", "Teils, teils"],
                ])
            }, {
                key: '4', content: new Map([
                    ["de", "Stimme eher nicht zu"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["de", "Stimme überhaupt nicht zu"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Es ist mir unbegreiflich, wie es aufregend sein kann, gemein zu anderen zu sein."],
                ])

            },
            {
                key: 'b', content: new Map([
                    ["de", "Ich neige dazu, andere zu kritisieren."],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["de", "Die meisten Menschen verdienen Respekt."],
                ])

            },
            {
                key: 'd', content: new Map([
                    ["de", "Ich versuche, niemanden bei der Verfolgung meiner Ziele zu verletzen."],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["de", "Ich erledige Aufgaben gründlich."],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["de", "Manche Leute würde ich gerne leiden lassen, selbst wenn ich dafür mit ihnen in die Hölle käme."],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["de", "Es ist ratsam, Informationen im Auge zu behalten, die man später gegen andere verwenden kann."],
                ])
            },
        ]
    });
}


const Q2 = (parentKey: string) => {
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: "TODO2",
        isRequired: true,
        questionText: new Map([
            ["de", "Hat Peter Kloeppel - alles in allem - einen Kandidaten bevorzugt oder benachteiligt?"],
        ]),
        //topDisplayCompoments: [{
          //  role: 'text',
            //style: [{ key: 'className', value: 'mb-2' }]
            //content: generateLocStrings(new Map([
            //    ["de", "1 = Stimme voll und ganz zu, 10 = Stimme überhaupt nicht zu"],
            //]))
        //}],
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt"],
                ])
            }, {
                key: '3', content: new Map([
                    ["de", "Weder bevorzugt, noch benachteiligt"],
                ])
            }, {
                key: '4', content: new Map([
                    ["de", "Eher benachteiligt"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["de", "Stark benachteiligt"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Armin Laschet"],
                ])

            },
            {
                key: 'b', content: new Map([
                    ["de", "Olaf Scholz"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["de", "Annalena Baerbock"],
                ])

            },
        ]
    });
}
