import { SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../../../editor-engine/survey-editor/item-editor";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { initEQ5DHealthIndicatorQuestion, SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { SimpleQuestionEditor } from "../../../../editor-engine/utils/simple-question-editor";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";


export class EQ5DGroup extends GroupItemEditor {
    useCopyRight: boolean;
    isRequired: boolean;
    usePageBreaks: boolean;

    constructor(parentKey: string, isRequired: boolean, usePageBreaks: boolean, hideCopyRight?: boolean, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'EQ5D-5L';
        super(parentKey, groupKey);

        this.useCopyRight = hideCopyRight !== true;
        this.usePageBreaks = usePageBreaks;
        this.isRequired = isRequired;

        this.initQuestions();
    }

    initQuestions() {
        this.addItem(Q_instructions(this.key))
        this.addItem(q_mobility_def(this.key, this.isRequired, this.useCopyRight));
        this.addPageBreak();
        this.addItem(q_selfcare_def(this.key, this.isRequired, this.useCopyRight));
        this.addPageBreak();
        this.addItem(q_activities_def(this.key, this.isRequired, this.useCopyRight));
        this.addPageBreak();
        this.addItem(q_pain_def(this.key, this.isRequired, this.useCopyRight));
        this.addPageBreak();
        this.addItem(q_anxiety_def(this.key, this.isRequired, this.useCopyRight));
        this.addPageBreak();
        this.addItem(q_healthstatus_instructions_def(this.key));
        this.addItem(q_healthstatus_def(this.key, this.isRequired, this.useCopyRight));
        // if (this.isPartOfSurvey(surveyKeys.short)) { this.addItem(Q_instr_reuksmaak(this.key))}
        // this.addPageBreak();
    }
}


const copyRightText = new Map([
    ["en", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation. NL (English) v2.1"],
    ["nl", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation."],
]);


const eq5dCopyright = {
    role: 'footnote', content: generateLocStrings(copyRightText), style: [
        { key: 'className', value: 'fs-small fst-italic text-center' }
    ]
};

const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Kwaliteit van leven

Vink bij iedere groep in de lijst aan wat het best past bij jouw gezondheid zoals je die VANDAAG ervaart.
    `

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ["nl", markdownContent],
                ]),
                className: ''
            })
        ]
    });
}

const q_mobility_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'MOB';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "MOBILITY"],
            ["nl", "MOBILITEIT"],
        ]),

        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["en", "I have no problems walking"],
                    ["nl", "Ik heb geen problemen met lopen"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["en", "I have slight problems walking"],
                    ["nl", "Ik heb een beetje problemen met lopen"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["en", "I have moderate problems walking"],
                    ["nl", "Ik heb matige problemen met lopen"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["en", "I have severe problems walking"],
                    ["nl", "Ik heb ernstige problemen met lopen"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["en", "I am unable to walk"],
                    ["nl", "Ik ben niet in staat om te lopen"],
                ])
            },
        ],
        isRequired: isRequired,
        footnoteText: useCopyRight ? copyRightText : undefined,
    })
}

const q_selfcare_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SC';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "SELF-CARE"],
            ["nl", "ZELFZORG"],
        ]),

        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["en", "I have no problems washing or dressing myself"],
                    ["nl", "Ik heb geen problemen met mijzelf wassen of aankleden"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["en", "I have slight problems washing or dressing myself"],
                    ["nl", "Ik heb een beetje problemen met mijzelf wassen of aankleden"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["en", "I have moderate problems washing or dressing myself"],
                    ["nl", "Ik heb matige problemen met mijzelf wassen of aankleden"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["en", "I have severe problems washing or dressing myself"],
                    ["nl", "Ik heb ernstige problemen met mijzelf wassen of aankleden"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["en", "I am unable to wash or dress myself"],
                    ["nl", "Ik ben niet in staat mijzelf te wassen of aan te kleden"],
                ])
            },
        ],
        isRequired: isRequired,
        footnoteText: useCopyRight ? copyRightText : undefined,
    });
}

const q_activities_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'ACT';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "USUAL ACTIVITIES"],
            ["nl", "DAGELIJKSE ACTIVITEITEN"],
        ]),
        questionSubText: new Map([
            ["en", "(e.g. work, study, housework, family or leisure activities)"],
            ["nl", "(bijv. werk, studie, huishouden, gezins- en vrijetijdsactiviteiten)"],
        ]),

        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["en", "I have no problems doing my usual activities"],
                    ["nl", "Ik heb geen problemen met mijn dagelijkse activiteiten"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["en", "I have slight problems doing my usual activities"],
                    ["nl", "Ik heb een beetje problemen met mijn dagelijkse activiteiten"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["en", "I have moderate problems doing my usual activities"],
                    ["nl", "Ik heb matige problemen met mijn dagelijkse activiteiten"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["en", "I have severe problems doing my usual activities"],
                    ["nl", "Ik heb ernstige problemen met mijn dagelijkse activiteiten"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["en", "I am unable to do my usual activities"],
                    ["nl", "Ik ben niet in staat mijn dagelijkse activiteiten uit te voeren"],
                ])
            },
        ],
        isRequired: isRequired,
        footnoteText: useCopyRight ? copyRightText : undefined,
    });
}

const q_pain_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'PAIN';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "PAIN / DISCOMFORT"],
            ["nl", "PIJN / ONGEMAK"],
        ]),

        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["en", "I have no pain or discomfort"],
                    ["nl", "Ik heb geen pijn of ongemak"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["en", "I have slight pain or discomfort"],
                    ["nl", "Ik heb een beetje pijn of ongemak"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["en", "I have moderate pain or discomfort"],
                    ["nl", "Ik heb matige pijn of ongemak"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["en", "I have severe pain or discomfort"],
                    ["nl", "Ik heb ernstige pijn of ongemak"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["en", "I have extreme pain or discomfort"],
                    ["nl", "Ik heb extreme pijn of ongemak"],
                ])
            },
        ],
        isRequired: isRequired,
        footnoteText: useCopyRight ? copyRightText : undefined,
    });
}

const q_anxiety_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'ANX';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "ANXIETY / DEPRESSION"],
            ["nl", "ANGST / SOMBERHEID"],
        ]),

        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["en", "I am not anxious or depressed"],
                    ["nl", "Ik ben niet angstig of somber"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["en", "I am slightly anxious or depressed"],
                    ["nl", "Ik ben een beetje angstig of somber"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["en", "I am moderately anxious or depressed"],
                    ["nl", "Ik ben matig angstig of somber"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["en", "I am severely anxious or depressed"],
                    ["nl", "Ik ben erg angstig of somber"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["en", "I am extremely anxious or depressed"],
                    ["nl", "Ik ben extreem angstig of somber"],
                ])
            },
        ],
        isRequired: isRequired,
        footnoteText: useCopyRight ? copyRightText : undefined,
    });
}

const q_healthstatus_instructions_def = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'HEALTH_INS'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'bullets', items: [
                {
                    role: 'text', content: generateLocStrings(new Map([
                        ["en", "We would like to know how good or bad your health is TODAY."],
                        ["nl", "We willen weten hoe goed of slecht je gezondheid VANDAAG is."],
                    ])),
                    style: [{ key: 'variant', value: 'li' }]
                },
                {
                    role: 'text', content: generateLocStrings(new Map([
                        ["en", "This scale is numbered from 0 to 100."],
                        ["nl", "Deze meetschaal loopt van 0 tot 100."],
                    ])),
                    style: [{ key: 'variant', value: 'li' }]
                },
                {
                    role: 'text',
                    style: [{ key: 'variant', value: 'li' }],
                    items: [
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "100 means the "],
                                ["nl", "100 staat voor de "],
                            ]))
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "best"],
                                ["nl", "beste"],
                            ])),
                            style: [{ key: 'className', value: 'text-decoration-underline' }]
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", " health you can imagine."],
                                ["nl", " gezondheid die je je kunt voorstellen."],
                            ]))
                        },
                    ],
                },
                {
                    role: 'text',
                    items: [
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "0 means the "],
                                ["nl", "0 staat voor de "],
                            ]))
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "worst"],
                                ["nl", "slechtste"],
                            ])),
                            style: [{ key: 'className', value: 'text-decoration-underline' }]
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", " health you can imagine."],
                                ["en", " gezondheid die je je kunt voorstellen."],
                            ]))
                        },
                    ],
                },
            ]
        }
    )
    return editor.getItem();
}

const q_healthstatus_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'HEALTH';
    const simpleEditor = new SimpleQuestionEditor(parentKey, itemKey, 1);

    // role: 'eq5d-health-indicator'
    const rg_inner = initEQ5DHealthIndicatorQuestion({
        key: '0',
        role: 'eq5d-health-indicator',
        instructionText: new Map([
            ["en", "Please indicate on the scale how your health is TODAY."],
            ["nl", "Klik op de meetschaal om aan te geven hoe je gezondheid VANDAAG is."],
        ]),
        valueBoxText: new Map([
            ["en", "YOUR HEALTH TODAY ="],
            ["nl", "JE GEZONDHEID VANDAAG ="],
        ]),
        minHealthText: new Map([
            ["en", "The worst health you can imagine"],
            ["nl", "De slechtste gezondheid die je je kunt voorstellen"],
        ]),
        maxHealthText: new Map([
            ["en", "The best health you can imagine"],
            ["nl", "De beste gezondheid die je je kunt voorstellen"],
        ]),
    });
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (useCopyRight) { simpleEditor.addDisplayComponent(eq5dCopyright); }
    return simpleEditor.getItem();
}

// const Q_instr_reuksmaak = (parentKey: string): SurveyItem => {
//     const markdownContent = `
// ## Onderzoek naar reuk- of smaakverlies

// Je hebt aangegeven dat je na de besmetting met het coronavirus nog steeds last hebt van reuk- en/of smaakverlies. Ben je geïnteresseerd in deelname aan aanvullend onderzoek naar veranderingen in reuk en smaak door corona? Kijk dan [hier](https://www.wur.nl/nl/Waardecreatie-Samenwerking/Voedingsonderzoek-WUR/Show-Voedingsonderzoek/COVORTS-studie.htm), of stuur een mail naar COVORTS.studie@wur.nl.

//     `

//     return SurveyItemGenerators.display({
//         parentKey: parentKey,
//         itemKey: 'intro_reuksmaak',
//         content: [
//             ComponentGenerators.markdown({
//                 content: new Map([
//                     ["nl", markdownContent],
//                 ]),
//                 className: ''
//             })
//         ]
//     });
// }
