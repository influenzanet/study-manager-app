import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { SurveyGroupItem, SurveyItem, Survey } from "survey-engine/lib/data_types";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { initSingleChoiceGroup, initMultipleChoiceGroup, initDropdownGroup, initSliderCategoricalGroup } from "../editor-engine/utils/question-type-generator";
import { ComponentEditor } from "../editor-engine/survey-editor/component-editor";



const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';
const multipleChoiceKey = 'mcg';
const sliderCategoricalKey = "scc"

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

    // Qcov3 --------------------------------------
    const qcov3 = survey.addNewSurveyItem({ itemKey: '6' }, rootKey);
    if (!qcov3) { return; }
    survey.updateSurveyItem(qcov3_def(qcov3));
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
    console.log(survey.getSurveyJSON());


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

const qcov3_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "In the 14 days before your symptoms started, have you been in contact with someone for whom tests have confirmed that they have Covid-19?"],
            ["de", "Hatten Sie in den 14 Tagen vor dem Beginn Ihrer Symptome Kontakt zu jemandem, für den Tests bestätigt haben, dass er Covid-19 hat?"],
        ]))
    );
    // editor.setCondition(
    //     expWithArgs()
    // )

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
