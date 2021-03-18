import { SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../../editor-engine/survey-editor/item-editor";
import { initEQ5DHealthIndicatorQuestion, QuestionGenerators } from "../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../editor-engine/utils/simple-generators";
import { SimpleQuestionEditor } from "../../../editor-engine/utils/simple-question-editor";
import { GroupItemEditor } from "../../../editor-engine/utils/survey-group-editor-helper";


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
        this.addItem(q_mobility_def(this.key, this.isRequired, this.useCopyRight), this.usePageBreaks);
        this.addItem(q_selfcare_def(this.key, this.isRequired, this.useCopyRight), this.usePageBreaks);
        this.addItem(q_activities_def(this.key, this.isRequired, this.useCopyRight), this.usePageBreaks);
        this.addItem(q_pain_def(this.key, this.isRequired, this.useCopyRight), this.usePageBreaks);
        this.addItem(q_anxiety_def(this.key, this.isRequired, this.useCopyRight), this.usePageBreaks);
        this.addItem(q_healthstatus_instructions_def(this.key));
        this.addItem(q_healthstatus_def(this.key, this.isRequired, this.useCopyRight), this.usePageBreaks);
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

const q_mobility_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'MOB';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "MOBILITY"],
            ["nl", "MOBILITEIT"],
        ]),
        topDisplayCompoments: [
            {
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["en", "Please select the ONE option that best describes your health TODAY."],
                    ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
                ]))
            }
        ],
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

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "SELF-CARE"],
            ["nl", "ZELFZORG"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }],
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

    return QuestionGenerators.singleChoice({
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
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }],
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

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "PAIN / DISCOMFORT"],
            ["nl", "PIJN / ONGEMAK"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }],
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
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "ANXIETY / DEPRESSION"],
            ["nl", "ANGST / SOMBERHEID"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }],
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
                        ["nl", "We willen weten hoe goed of slecht uw gezondheid VANDAAG is."],
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
                                ["nl", " gezondheid die u zich kunt voorstellen."],
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
                                ["en", " gezondheid die u zich kunt voorstellen."],
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
            ["nl", "Klik op de meetschaal om aan te geven hoe uw gezondheid VANDAAG is."],
        ]),
        valueBoxText: new Map([
            ["en", "YOUR HEALTH TODAY ="],
            ["nl", "UW GEZONDHEID VANDAAG ="],
        ]),
        minHealthText: new Map([
            ["en", "The worst health you can imagine"],
            ["nl", "De slechste gezondheid die u zich kunt voorstellen"],
        ]),
        maxHealthText: new Map([
            ["en", "The best health you can imagine"],
            ["nl", "De beste gezondheid die u zich kunt voorstellen"],
        ]),
    });
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (useCopyRight) { simpleEditor.addDisplayComponent(eq5dCopyright); }
    return simpleEditor.getItem();
}
