import { SurveyGroupItem, SurveyItem } from "survey-engine/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { initEQ5DHealthIndicatorQuestion, initSingleChoiceGroup } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings, generatePageBreak, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { responseGroupKey, singleChoiceKey } from "./key-definitions";


/**
 * EQ5D-5L: group of questions containing the EQ5D 5L survey items
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to each question to check if they have a response.
 * @param usePageBreaks if true add a page break behind survey items (one question per page)
 * @param itemKeyOverride use this to override the default key (EQ5D-5L) for this item (only last part of the key, parent's key is not influenced).
 */
const getEQ5D5LGroup = (parentKey: string, isRequired?: boolean, usePageBreaks?: boolean, itemKeyOverride?: string): SurveyGroupItem => {
    const defaultKey = 'EQ5D-5L';
    const useCopyRight = true;

    const key = [parentKey, itemKeyOverride ? itemKeyOverride : defaultKey].join('.');
    const groupEditor = new ItemEditor(undefined, {
        itemKey: key,
        isGroup: true
    });
    groupEditor.setSelectionMethod({ name: 'sequential' });

    // MOBILITY
    groupEditor.addSurveyItem(q_mobility_def(key, isRequired, useCopyRight));
    if (usePageBreaks) { groupEditor.addSurveyItem(generatePageBreak(key, '1')); }

    // SELFCARE
    groupEditor.addSurveyItem(q_selfcare_def(key, isRequired, useCopyRight));
    if (usePageBreaks) { groupEditor.addSurveyItem(generatePageBreak(key, '2')); }

    // USUAL ACTIVITIES
    groupEditor.addSurveyItem(q_activities_def(key, isRequired, useCopyRight));
    if (usePageBreaks) { groupEditor.addSurveyItem(generatePageBreak(key, '3')); }

    // PAIN
    groupEditor.addSurveyItem(q_pain_def(key, isRequired, useCopyRight));
    if (usePageBreaks) { groupEditor.addSurveyItem(generatePageBreak(key, '4')); }

    // ANXIETY
    groupEditor.addSurveyItem(q_anxiety_def(key, isRequired, useCopyRight));
    if (usePageBreaks) { groupEditor.addSurveyItem(generatePageBreak(key, '5')); }

    // HEALTH
    groupEditor.addSurveyItem(q_healthstatus_instructions_def(key));
    groupEditor.addSurveyItem(q_healthstatus_def(key, isRequired, useCopyRight));

    return groupEditor.getItem() as SurveyGroupItem;
}

export default getEQ5D5LGroup;

const eq5dCopyright = {
    role: 'footnote', content: generateLocStrings(new Map([
        ["en", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation. NL (English) v2.1"],
        ["nl", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation."],
    ])), style: [
        { key: 'className', value: 'fs-small fst-italic text-center' }
    ]
};


const q_mobility_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'MOB';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "MOBILITY"],
            ["nl", "MOBILITEIT"],
        ]))
    );


    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }
    )

    // RESPONSE
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
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
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    if (useCopyRight) { editor.addDisplayComponent(eq5dCopyright); }
    return editor.getItem();
}

const q_selfcare_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'SC';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "SELF-CARE"],
            ["nl", "ZELFZORG"],
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
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
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    if (useCopyRight) { editor.addDisplayComponent(eq5dCopyright); }
    return editor.getItem();
}

const q_activities_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'ACT';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(
            new Map([
                ["en", "USUAL ACTIVITIES"],
                ["nl", "DAGELIJKSE ACTIVITEITEN"],
            ]),
            new Map([
                ["en", "(e.g. work, study, housework, family or leisure activities)"],
                ["nl", "(bijv. werk, studie, huishouden, gezins- en vrijetijdsactiviteiten)"],
            ]),
        )
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
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
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    if (useCopyRight) { editor.addDisplayComponent(eq5dCopyright); }
    return editor.getItem();
}

const q_pain_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'PAIN'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "PAIN / DISCOMFORT"],
            ["nl", "PIJN / ONGEMAK"],
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
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
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    if (useCopyRight) { editor.addDisplayComponent(eq5dCopyright); }
    return editor.getItem();
}

const q_anxiety_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'ANX'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "ANXIETY / DEPRESSION"],
            ["nl", "ANGST / SOMBERHEID"],
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
                ["nl", "Klik in de lijst hieronder het hokje aan dat het best past bij uw gezondheid VANDAAG."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
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
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    if (useCopyRight) { editor.addDisplayComponent(eq5dCopyright); }
    return editor.getItem();
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
    const defaultKey = 'HEALTH'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

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
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    if (useCopyRight) { editor.addDisplayComponent(eq5dCopyright); }
    return editor.getItem();
}
