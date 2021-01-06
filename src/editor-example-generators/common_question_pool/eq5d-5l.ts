import { SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
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
        ]))
    );


    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
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
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I have slight problems walking"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I have moderate problems walking"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I have severe problems walking"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I am unable to walk"],
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
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I have no problems washing or dressing myself"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I have slight problems washing or dressing myself"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I have moderate problems washing or dressing myself"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I have severe problems washing or dressing myself"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I am unable to wash or dress myself"],
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
            ]),
            new Map([
                ["en", "(e.g. work, study, housework, family or leisure activities)"],
            ]),
        )
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I have no problems doing my usual activities"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I have slight problems doing my usual activities"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I have moderate problems doing my usual activities"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I have severe problems doing my usual activities"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I am unable to do my usual activities"],
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
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I have no pain or discomfort"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I have slight pain or discomfort"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I have moderate pain or discomfort"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I have severe pain or discomfort"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I have extreme pain or discomfort"],
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
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
            ]))
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I am not anxious or depressed"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I am slightly anxious or depressed"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I am moderately anxious or depressed"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I am severely anxious or depressed"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I am extremely anxious or depressed"],
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
                    ])),
                    style: [{ key: 'variant', value: 'li' }]
                },
                {
                    role: 'text', content: generateLocStrings(new Map([
                        ["en", "This scale is numbered from 0 to 100."],
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
                            ]))
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "best"],
                            ])),
                            style: [{ key: 'className', value: 'text-decoration-underline' }]
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", " health you can imagine."],
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
                            ]))
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "worst"],
                            ])),
                            style: [{ key: 'className', value: 'text-decoration-underline' }]
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", " health you can imagine."],
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
        ]),
        valueBoxText: new Map([
            ["en", "YOUR HEALTH TODAY ="],
        ]),
        minHealthText: new Map([
            ["en", "The worst health you can imagine"],
        ]),
        maxHealthText: new Map([
            ["en", "The best health you can imagine"],
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
