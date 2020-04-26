import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { SurveyGroupItem, SurveyItem, Survey, Expression } from "survey-engine/lib/data_types";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { initSingleChoiceGroup, initMultipleChoiceGroup, initDropdownGroup, initSliderCategoricalGroup, initMatrixQuestion } from "../editor-engine/utils/question-type-generator";
import { ComponentEditor } from "../editor-engine/survey-editor/component-editor";



const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';
const multipleChoiceKey = 'mcg';
const dropDownKey = 'ddg'
const sliderCategoricalKey = "scc"
const inputKey = "ic"
const matrixKey = "mat"

export const generateCovid19Weekly = (): Survey | undefined => {
    const survey = new SurveyEditor();
    survey.changeItemKey('survey', 'weekly');

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["de", "Wie fühlen Sie sich?"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Weekly survey about health status."],
            ["de", "Wöchentliche Fragebogen über den Gesundheitszustand."],
        ])
    ));

    const rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());

    const rootKey = rootItemEditor.getItem().key;


    const qg32 = survey.addNewSurveyItem({ itemKey: '32', isGroup: true }, rootKey);

    const qg32ItemEditor = new ItemEditor(qg32 as SurveyGroupItem);
    qg32ItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(qg32ItemEditor.getItem());

    const q32Key = qg32ItemEditor.getItem().key;

    // 32 title
    const q32_title = survey.addNewSurveyItem({ itemKey: 'title' }, q32Key);
    if (!q32_title) { return; }
    survey.updateSurveyItem(q32title_def(q32_title));


    // 32a --------------------------------------
    const q32a = survey.addNewSurveyItem({ itemKey: '1' }, q32Key);
    if (!q32a) { return; }
    survey.updateSurveyItem(q32a_def(q32a));
    // -----------------------------------------

    // 32b --------------------------------------
    const q32b = survey.addNewSurveyItem({ itemKey: '2' }, q32Key);
    if (!q32b) { return; }
    survey.updateSurveyItem(q32b_def(q32b));
    // -----------------------------------------

    // 32c --------------------------------------
    const q32c = survey.addNewSurveyItem({ itemKey: '3' }, q32Key);
    if (!q32c) { return; }
    survey.updateSurveyItem(q32c_def(q32c));
    // -----------------------------------------

    // 32d --------------------------------------
    const q32d = survey.addNewSurveyItem({ itemKey: '4' }, q32Key);
    if (!q32d) { return; }
    survey.updateSurveyItem(q32d_def(q32d));
    // -----------------------------------------

    // 32e --------------------------------------
    const q32e = survey.addNewSurveyItem({ itemKey: '5' }, q32Key);
    if (!q32e) { return; }
    survey.updateSurveyItem(q32e_def(q32e));
    // -----------------------------------------

    const q32_1_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q32Key, '1'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q32_2_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q32Key, '2'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q32_3_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q32Key, '3'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q32_4_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q32Key, '4'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q32_5_symptom = expWithArgs('checkResponseValueWithRegex', [q32Key, '5'].join('.'), [responseGroupKey, '160'].join('.'), '.*\\S.*');

    const anySymptomSelected = expWithArgs('or',
        q32_1_symptom,
        q32_2_symptom,
        q32_3_symptom,
        q32_4_symptom,
        q32_5_symptom
    );


    // Q0 --------------------------------------
    const q0 = survey.addNewSurveyItem({ itemKey: 'Q0' }, rootKey);
    if (!q0) { return; }
    survey.updateSurveyItem(q0_def(q0));
    // -----------------------------------------

    // Q2 --------------------------------------
    const q2 = survey.addNewSurveyItem({ itemKey: 'Q2' }, rootKey);
    if (!q2) { return; }
    survey.updateSurveyItem(q2_def(q2, anySymptomSelected));
    // -----------------------------------------

    // Qcov3 --------------------------------------
    const qcov3 = survey.addNewSurveyItem({ itemKey: 'Qcov3' }, rootKey);
    if (!qcov3) { return; }
    survey.updateSurveyItem(qcov3_def(qcov3, q2.key, anySymptomSelected));
    // -----------------------------------------

    // Q3 --------------------------------------
    const q3 = survey.addNewSurveyItem({ itemKey: 'Q3' }, rootKey);
    if (!q3) { return; }
    survey.updateSurveyItem(q3_def(q3, anySymptomSelected));
    // -----------------------------------------

    // Q4 --------------------------------------
    const q4 = survey.addNewSurveyItem({ itemKey: 'Q4' }, rootKey);
    if (!q4) { return; }
    survey.updateSurveyItem(q4_def(q4, anySymptomSelected));
    // -----------------------------------------

    // Q5 --------------------------------------
    const q5 = survey.addNewSurveyItem({ itemKey: 'Q5' }, rootKey);
    if (!q5) { return; }
    survey.updateSurveyItem(q5_def(q5, anySymptomSelected));
    // -----------------------------------------

    // Q7 --------------------------------------
    const q7 = survey.addNewSurveyItem({ itemKey: 'Q7' }, rootKey);
    if (!q7) { return; }
    survey.updateSurveyItem(q7_def(q7, anySymptomSelected));
    // -----------------------------------------

    // Q7b --------------------------------------
    const q7b = survey.addNewSurveyItem({ itemKey: 'Q7b' }, rootKey);
    if (!q7b) { return; }
    survey.updateSurveyItem(q7b_def(q7b, q7.key, anySymptomSelected));
    // -----------------------------------------

    // Qcov10 --------------------------------------
    const qcov10 = survey.addNewSurveyItem({ itemKey: 'Qcov10' }, rootKey);
    if (!qcov10) { return; }
    survey.updateSurveyItem(qcov10_def(qcov10));
    // -----------------------------------------

    // Qcov10b --------------------------------------
    const qcov10b = survey.addNewSurveyItem({ itemKey: 'Qcov10b' }, rootKey);
    if (!qcov10b) { return; }
    survey.updateSurveyItem(qcov10b_def(qcov10b, qcov10.key));
    // -----------------------------------------

    // Qcov15 --------------------------------------
    const qcov15 = survey.addNewSurveyItem({ itemKey: 'Qcov15' }, rootKey);
    if (!qcov15) { return; }
    survey.updateSurveyItem(qcov15_def(qcov15));
    // -----------------------------------------


    const testItem = survey.addNewSurveyItem({ itemKey: 'test' }, rootKey);
    const tie = new ItemEditor(testItem);
    tie.setTitleComponent(generateTitleComponent(new Map([
        ['en', 'test']
    ])))
    tie.setCondition(anySymptomSelected);
    survey.updateSurveyItem(tie.getItem());


    survey.addNewSurveyItem({ itemKey: 'pb1', type: 'pageBreak' }, rootKey);

    console.log(anySymptomSelected);
    // console.log(q32Editor.findResponseComponent('rg'));
    // q32Editor.removeResponseComponent('rg.scg');

    console.log(survey.getSurvey());
    // console.log(survey.getSurveyJSON());


    // console.log(JSON.stringify(expOr, undefined, '  '));
    return survey.getSurvey();
}

const q32title_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Hint"],
            ["de", "Hinweis"],
        ]))
    );
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "Please choose if you had any of the following symptoms since your last visit. If this is your first visit, please consider last week."],
                ["de", "Bitte beantworten Sie, ob Sie irgendwelche der folgenden Symptome seit Ihrem letzten Besuch hatten.  Falls dies Ihr erster Besuch ist, betrachten Sie bitte die vergangene Woche."],
            ]))
        }
    )
    return editor.getItem();
}


const q32a_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any general symptoms such as"],
            ["de", "Hatten Sie allgemeine Symptome wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '142', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Fever"],
                ["de", "Fieber"],
            ])
        },
        {
            key: '143', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chills"],
                ["de", "Schüttelfrost"],
            ])
        },
        {
            key: '149', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Headache"],
                ["de", "Kopfschmerzen"],
            ])
        },
        {
            key: '152', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Feeling tired or exhausted (malaise)"],
                ["de", "Müdigkeit oder Erschöpfung"],
            ])
        },
        {
            key: '153', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of appetite"],
                ["de", "Appetitlosigkeit"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32b_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any respiratorial symptoms such as"],
            ["de", "Hatten Sie Atemwegsbeschwerden wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '145', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sneezing"],
                ["de", "Niesen"],
            ])
        },
        {
            key: '146', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sore throat"],
                ["de", "Halsweh"],
            ])
        },
        {
            key: '147', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Cough"],
                ["de", "Husten"],
            ])
        },
        {
            key: '144', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Runny or blocked nose"],
                ["de", "Laufende oder verstopfte Nase"],
            ])
        },
        {
            key: '148', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Shortness of breath"],
                ["de", "Atemnot"],
            ])
        },
        {
            key: '154', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Coloured sputum/phlegm"],
                ["de", "Farbiger Auswurf/Schleim"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32c_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any gastroenterological symptoms such as"],
            ["de", "Hatten Sie Beschwerden im Magen-Darm Trakt wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '156', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nausea"],
                ["de", "Brechreiz"],
            ])
        },
        {
            key: '157', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Vomiting"],
                ["de", "Erbrechen"],
            ])
        },
        {
            key: '158', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diarrhoea"],
                ["de", "Durchfall"],
            ])
        },
        {
            key: '159', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Stomach ache"],
                ["de", "Bauchweh"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32d_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have of the following symptoms?"],
            ["de", "Hatten Sie eins der folgenden Beschwerden?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '150', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Muscle/joint pain"],
                ["de", "Muskel-/ Gelenkschmerzen"],
            ])
        },
        {
            key: '151', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chest pain"],
                ["de", "Schmerzen in der Brust"],
            ])
        },
        {
            key: '155', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Watery, bloodshot eyes"],
                ["de", "Wässrige, rote Augen"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nose bleed"],
                ["de", "Nasenbluten"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of smell"],
                ["de", "Geruchsverlust"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of taste"],
                ["de", "Geschmacksverlust"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32e_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any other symptoms?"],
            ["de", "Hatten Sie andere Beschwerden?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const descEdit = new ComponentEditor(undefined, {
        role: 'text'
    });
    descEdit.setContent(generateLocStrings(new Map([
        ["en", "If applies enter your response into the box:"],
        ["de", "Falls zutrifft, geben Sie bitte Ihre Antwort hier ein:"],
    ])));
    descEdit.setStyles([{ key: 'variant', value: 'annotation' }])
    editor.addExistingResponseComponent(descEdit.getComponent(), rg?.key);

    const input = new ComponentEditor(undefined, {
        key: '160',
        role: 'multilineTextInput'
    }).getComponent();
    editor.addExistingResponseComponent(input, rg?.key);
    return editor.getItem();
}

const q0_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your postal code?"],
            ["de", "Wie lautet ihre Postleitzahl?"],
        ]))
    );

    editor.addValidation(
        {
            key: 'V1',
            type: 'soft',
            rule:
                expWithArgs('and',
                    expWithArgs('checkResponseValueWithRegex', editor.getItem().key, [responseGroupKey, inputKey].join('.'), '.*\\S.*'),
                    expWithArgs('not', expWithArgs('checkResponseValueWithRegex', editor.getItem().key, [responseGroupKey, inputKey].join('.'), '^(?=(\\D*\\d){5}\\D*$)')),
                )

        }
    );
    editor.addDisplayComponent(
        {
            role: 'warning',
            content: generateLocStrings(new Map([
                ["en", "Please enter a correct value"],
                ["de", "Bitte geben Sie eine korrekte PLZ ein"],
            ])),
            displayCondition: expWithArgs('getSurveyItemValidation', 'this', 'V1')
        }
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const descEdit = new ComponentEditor(undefined, {
        role: 'text'
    });
    descEdit.setContent(generateLocStrings(new Map([
        ["en", "The completeness of your postal code is automatically checked:"],
        ["de", "Die Vollständigkeit ihrer Postleitzahl wird automatisch geprüft:"],
    ])));
    descEdit.setStyles([{ key: 'variant', value: 'annotation' }])
    editor.addExistingResponseComponent(descEdit.getComponent(), rg?.key);

    const input = new ComponentEditor(undefined, {
        key: inputKey,
        role: 'input'
    }).getComponent();
    editor.addExistingResponseComponent(input, rg?.key);
    return editor.getItem();
}

const q2_def = (itemSkeleton: SurveyItem, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "On your last visit, you reported that you were still ill. Are the symptoms you report today part of the same bout of illness?"],
            ["de", "Bei Ihrem letzten Besuch haben Sie angegeben, noch krank zu sein. Sind die Symptome, die Sie heute berichten, Teil des gleichen Krankheitsschubs?"],
        ]))
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q3_def = (itemSkeleton: SurveyItem, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When did the first symptoms appear?"],
            ["de", "Wann sind die ersten Symptome aufgetreten?"]
        ]))
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            content: new Map([
                ["en", "Choose date"],
                ["de", "Wählen Sie ein Datum"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q4_def = (itemSkeleton: SurveyItem, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When did your symptoms end?"],
            ["de", "Wann sind Ihre Symptome abgeklungen?"],
        ]))
    );
    // editor.setHelpGroupComponent(
    //     [

    //     ]
    // )
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            content: new Map([
                ["en", "Choose date"],
                ["de", "Wählen Sie ein Datum"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I am still ill"],
                ["de", "Ich bin immer noch krank"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q5_def = (itemSkeleton: SurveyItem, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did your symptoms develop suddenly over a few hours?"],
            ["de", "Sind Ihre Symptome plötzlich über wenige Stunden erschienen?"],
        ]))
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern."],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q7_def = (itemSkeleton: SurveyItem, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you VISIT (see face to face) any medical services?"],
            ["de", "Haben Sie auf Grund Ihrer Symptome irgendeine Form von medizinischer Einrichtung BESUCHT (persönlich dort erschienen)?"],
        ]))
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "GP or GP's practice nurse"],
                ["de", "Allgemeinarzt oder Allgemeinarztassisten/in"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Hospital accident & emergency department / out of hours service"],
                ["de", "Notaufnahme/ Notfallstelle/ Notdienst außerhalb der Öffnungszeiten"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Hospital admission"],
                ["de", "Einlieferung ins Krankenhaus"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Other medical services"],
                ["de", "Andere medizinische Einrichtungen"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "No, but I have an appointment scheduled"],
                ["de", "Nein, aber ich habe schon einen Termin"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q7b_def = (itemSkeleton: SurveyItem, q7: string, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How soon after your symptoms appeared did you first VISIT a medical service?"],
            ["de", "Wie lange, nachdem Ihre Symptome aufgetreten sind, haben Sie das erste Mal eine medizinische Einrichtung BESUCHT?"],
        ]))
    );
    editor.setCondition(
        expWithArgs('and', anySymptomSelected, expWithArgs('and', expWithArgs('responseHasOnlyKeysOtherThan', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0'), expWithArgs('responseHasOnlyKeysOtherThan', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '5'))));


    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["en", "Medical Service"],
                        ["de", "Medizinische Einrichtungen"],
                    ]),
                },
                {
                    key: 'col1', role: 'text'
                },
            ]
        },
        {
            key: 'r1', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "GP or GP'r practice nurse"],
                        ["de", "Allgemeinarzt oder Allgemeinarztassistent/in"],
                    ]),
                },
                {
                    key: 'col1', role: 'dropDownGroup', items: [
                        {
                            key: '0', role: 'option', content: new Map([
                                ["en", "Same day"],
                                ["de", "Am gleichen Tag"],
                            ]),
                        },
                        {
                            key: '1', role: 'option', content: new Map([
                                ["en", "1 day"],
                                ["de", "1 Tag"],
                            ]),
                        },
                        {
                            key: '2', role: 'option', content: new Map([
                                ["en", "2 days"],
                                ["de", "2 Tage"],
                            ]),
                        },
                        {
                            key: '3', role: 'option', content: new Map([
                                ["en", "3 days"],
                                ["de", "3 Tage"],
                            ]),
                        },
                        {
                            key: '4', role: 'option', content: new Map([
                                ["en", "4 days"],
                                ["de", "4 Tage"],
                            ]),
                        },
                        {
                            key: '5', role: 'option', content: new Map([
                                ["en", "5-7 days"],
                                ["de", "5-7 Tage"],
                            ]),
                        },
                        {
                            key: '6', role: 'option', content: new Map([
                                ["en", "More than 7 days"],
                                ["de", "Mehr als 7 Tage"],
                            ]),
                        },
                        {
                            key: '7', role: 'option', content: new Map([
                                ["en", "I don't know/can't remember"],
                                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                            ]),
                        },
                    ]
                }
            ], displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '1')
        },
        {
            key: 'r2', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Hospital admission"],
                        ["de", "Einlieferung ins Krankenhaus"],
                    ]),
                },
                {
                    key: 'col1', role: 'dropDownGroup', items: [
                        {
                            key: '0', role: 'option', content: new Map([
                                ["en", "Same day"],
                                ["de", "Am gleichen Tag"],
                            ]),
                        },
                        {
                            key: '1', role: 'option', content: new Map([
                                ["en", "1 day"],
                                ["de", "1 Tag"],
                            ]),
                        },
                        {
                            key: '2', role: 'option', content: new Map([
                                ["en", "2 days"],
                                ["de", "2 Tage"],
                            ]),
                        },
                        {
                            key: '3', role: 'option', content: new Map([
                                ["en", "3 days"],
                                ["de", "3 Tage"],
                            ]),
                        },
                        {
                            key: '4', role: 'option', content: new Map([
                                ["en", "4 days"],
                                ["de", "4 Tage"],
                            ]),
                        },
                        {
                            key: '5', role: 'option', content: new Map([
                                ["en", "5-7 days"],
                                ["de", "5-7 Tage"],
                            ]),
                        },
                        {
                            key: '6', role: 'option', content: new Map([
                                ["en", "More than 7 days"],
                                ["de", "Mehr als 7 Tage"],
                            ]),
                        },
                        {
                            key: '7', role: 'option', content: new Map([
                                ["en", "I don't know/can't remember"],
                                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                            ]),
                        },
                    ]
                }
            ], displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '3')
        },
        {
            key: 'r3', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Hospital accident & department/out of hours service"],
                        ["de", "Notaufnahme/ Notfallstelle/ Notdienst außerhalb der Öffnungszeiten"],
                    ]),
                },
                {
                    key: 'col1', role: 'dropDownGroup', items: [
                        {
                            key: '0', role: 'option', content: new Map([
                                ["en", "Same day"],
                                ["de", "Am gleichen Tag"],
                            ]),
                        },
                        {
                            key: '1', role: 'option', content: new Map([
                                ["en", "1 day"],
                                ["de", "1 Tag"],
                            ]),
                        },
                        {
                            key: '2', role: 'option', content: new Map([
                                ["en", "2 days"],
                                ["de", "2 Tage"],
                            ]),
                        },
                        {
                            key: '3', role: 'option', content: new Map([
                                ["en", "3 days"],
                                ["de", "3 Tage"],
                            ]),
                        },
                        {
                            key: '4', role: 'option', content: new Map([
                                ["en", "4 days"],
                                ["de", "4 Tage"],
                            ]),
                        },
                        {
                            key: '5', role: 'option', content: new Map([
                                ["en", "5-7 days"],
                                ["de", "5-7 Tage"],
                            ]),
                        },
                        {
                            key: '6', role: 'option', content: new Map([
                                ["en", "More than 7 days"],
                                ["de", "Mehr als 7 Tage"],
                            ]),
                        },
                        {
                            key: '7', role: 'option', content: new Map([
                                ["en", "I don't know/can't remember"],
                                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                            ]),
                        },
                    ]
                }
            ], displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '2')
        },
        {
            key: 'r4', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Other medical services"],
                        ["de", "Andere medizinische Einrichtungen"],
                    ]),
                },
                {
                    key: 'col1', role: 'dropDownGroup', items: [
                        {
                            key: '0', role: 'option', content: new Map([
                                ["en", "Same day"],
                                ["de", "Am gleichen Tag"],
                            ]),
                        },
                        {
                            key: '1', role: 'option', content: new Map([
                                ["en", "1 day"],
                                ["de", "1 Tag"],
                            ]),
                        },
                        {
                            key: '2', role: 'option', content: new Map([
                                ["en", "2 days"],
                                ["de", "2 Tage"],
                            ]),
                        },
                        {
                            key: '3', role: 'option', content: new Map([
                                ["en", "3 days"],
                                ["de", "3 Tage"],
                            ]),
                        },
                        {
                            key: '4', role: 'option', content: new Map([
                                ["en", "4 days"],
                                ["de", "4 Tage"],
                            ]),
                        },
                        {
                            key: '5', role: 'option', content: new Map([
                                ["en", "5-7 days"],
                                ["de", "5-7 Tage"],
                            ]),
                        },
                        {
                            key: '6', role: 'option', content: new Map([
                                ["en", "More than 7 days"],
                                ["de", "Mehr als 7 Tage"],
                            ]),
                        },
                        {
                            key: '7', role: 'option', content: new Map([
                                ["en", "I don't know/can't remember"],
                                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                            ]),
                        },
                    ]
                }
            ], displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '4')
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    return editor.getItem();
}

const qcov3_def = (itemSkeleton: SurveyItem, q2: string, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "In the 14 days before your symptoms started, have you been in contact with someone for whom tests have confirmed that they have Covid-19?"],
            ["de", "Hatten Sie in den 14 Tagen vor dem Beginn Ihrer Symptome Kontakt zu jemandem, für den Tests bestätigt haben, dass er Covid-19 hat?"],
        ]))
    );
    editor.setCondition(
        expWithArgs('and', anySymptomSelected, expWithArgs('responseHasOnlyKeysOtherThan', [q2].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1'))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Don’t Know"],
                ["de", "Ich weiss es nicht."],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Since the beginning of COVID-19 lockdown measures, do you carry out a professional activity? (Select all the relevant answers)"],
            ["de", "Führen Sie seit Beginn der COVID-19-Sperrmassnahmen eine berufliche Tätigkeit aus? (Wählen Sie alle relevanten Antworten aus) "],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "Yes, I work from home"],
                ["de", "Ja, ich arbeite von zu Hause aus "],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "Yes, I work outside from home"],
                ["de", "Ja, ich arbeite ausser Haus "],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "No, I have a leave of absence to take care of my kid(s)"],
                ["de", "Nein, ich habe eine Beurlaubung, um mich um mein(e) Kind(er) zu kümmern "],
            ])
        },
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "No, I have a sick leave (because of Covid-19)"],
                ["de", "Nein, ich bin krankgeschrieben (wegen Covid-19) "],
            ])
        },
        {
            key: '5',
            role: 'option',
            content: new Map([
                ["en", "No, I have another situation (retired, job-seeker, student, house-wife/husband, other sick-leave, partial unemployment, forced leave…)"],
                ["de", "Nein, ich habe eine andere Situation (Rentner, Arbeitssuchender, Student, Hausfrau/Ehemann, anderen Krankheitsurlaub...) "],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov10b_def = (itemSkeleton: SurveyItem, qcov10: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How many days a week do you work outside from home?"],
            ["de", "Wie viele Tage in der Woche arbeiten Sie ausserhalb von zu Hause?"],
        ]))
    );
    editor.addToFollows(qcov10);
    editor.setCondition(
        expWithArgs('responseHasKeysAny', [qcov10].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '2'),
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const sliderNumericEditor = new ComponentEditor(undefined, {
        key: 'sliderNumeric',
        role: 'sliderNumeric'
    });
    sliderNumericEditor.setProperties({
        min: { dtype: 'num', num: 1 },
        max: { dtype: 'num', num: 7 },
        stepSize: { dtype: 'num', num: 1 },
    })
    editor.addExistingResponseComponent(sliderNumericEditor.getComponent(), rg?.key);
    return editor.getItem();
}

const qcov15_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "If lockdown measures were extended (that is to say, continued beyond the date announced by the government), do you think you would follow the recommendations with as much rigour as you do now?"],
            ["de", "Falls die Sperrmassnahmen über das von der Regierung angekundigte Datum hinaus verlängert würden, glauben Sie, dass Sie die Empfehlungen mit gleicher Disziplin weiter verfolgen würden?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSliderCategoricalGroup(sliderCategoricalKey, [
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "Yes, absolutely"],
                ["de", "Ja, absolut"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "Yes, moderately"],
                ["de", "Ja, mässig"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "No, not really"],
                ["de", "Nein, nicht wirklich"],
            ])
        },
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "No, not at all"],
                ["de", "Nein, überhaupt nicht"],
            ])
        },
        {
            key: '99',
            role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss nicht"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}