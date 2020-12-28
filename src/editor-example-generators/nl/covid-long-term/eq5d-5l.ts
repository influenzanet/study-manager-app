import { SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../../editor-engine/survey-editor/item-editor";
import { initEQ5DHealthIndicatorQuestion, initSingleChoiceGroup } from "../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings, generatePageBreak, generateTitleComponent } from "../../../editor-engine/utils/simple-generators";

const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';

const getEQ5DGroup = (parentKey: string, itemKey: string): SurveyGroupItem => {
    const key = [parentKey, itemKey].join('.');
    const groupEditor = new ItemEditor(undefined, {
        itemKey: key,
        isGroup: true
    });
    groupEditor.setSelectionMethod({ name: 'sequential' })


    groupEditor.addSurveyItem(
        q_mobility_def(key, 'MOB')
    );
    groupEditor.addSurveyItem(generatePageBreak(key, '1'));

    groupEditor.addSurveyItem(
        q_selfcare_def(key, 'SC')
    );
    groupEditor.addSurveyItem(generatePageBreak(key, '2'));

    groupEditor.addSurveyItem(
        q_activities_def(key, 'ACT')
    );
    groupEditor.addSurveyItem(generatePageBreak(key, '3'));

    groupEditor.addSurveyItem(
        q_pain_def(key, 'PAIN')
    );
    groupEditor.addSurveyItem(generatePageBreak(key, '4'));

    groupEditor.addSurveyItem(
        q_anxiety_def(key, 'ANX')
    );
    groupEditor.addSurveyItem(generatePageBreak(key, '5'));

    groupEditor.addSurveyItem(
        q_healthstatus_instructions_def(key, 'HEALTH_INST')
    );
    groupEditor.addSurveyItem(
        q_healthstatus_def(key, 'HEALTH')
    );
    return groupEditor.getItem() as SurveyGroupItem;
}

export default getEQ5DGroup;

const eq5dCopyright = {
    role: 'footnote', content: generateLocStrings(new Map([
        ["en", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation. NL (English) v2.1"],
    ])), style: [
        { key: 'className', value: 'fs-small fst-italic text-center' }
    ]
};


const q_mobility_def = (parentKey: string, key: string): SurveyItem => {
    const itemKey = parentKey + '.' + key;
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "MOBILITY"],
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
            ]))
        }
    )

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

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    editor.addDisplayComponent(eq5dCopyright);
    return editor.getItem();
}

const q_selfcare_def = (parentKey: string, key: string): SurveyItem => {
    const itemKey = parentKey + '.' + key;
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "SELF-CARE"],
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
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

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    editor.addDisplayComponent(eq5dCopyright);
    return editor.getItem();
}

const q_activities_def = (parentKey: string, key: string): SurveyItem => {
    const itemKey = parentKey + '.' + key;
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

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
            role: 'text', content: generateLocStrings(new Map([
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

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    editor.addDisplayComponent(eq5dCopyright);
    return editor.getItem();
}

const q_pain_def = (parentKey: string, key: string): SurveyItem => {
    const itemKey = parentKey + '.' + key;
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "PAIN / DISCOMFORT"],
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
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

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    editor.addDisplayComponent(eq5dCopyright);
    return editor.getItem();
}

const q_anxiety_def = (parentKey: string, key: string): SurveyItem => {
    const itemKey = parentKey + '.' + key;
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "ANXIETY / DEPRESSION"],
        ]))
    );

    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
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

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    editor.addDisplayComponent(eq5dCopyright);
    return editor.getItem();
}

const q_healthstatus_instructions_def = (parentKey: string, key: string): SurveyItem => {
    const itemKey = parentKey + '.' + key;
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

const q_healthstatus_def = (parentKey: string, key: string): SurveyItem => {
    const itemKey = parentKey + '.' + key;
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

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    editor.addDisplayComponent(eq5dCopyright);
    return editor.getItem();
}
