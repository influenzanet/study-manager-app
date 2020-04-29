import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent, generateHelpGroupComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
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

    survey.addNewSurveyItem({ itemKey: 'pb1', type: 'pageBreak' }, rootKey);

    // Q2 symptoms same bout of illness --------------------------------------
    const q2 = survey.addNewSurveyItem({ itemKey: 'Q2' }, rootKey);
    if (!q2) { return; }
    survey.updateSurveyItem(q2_def(q2, anySymptomSelected));
    // -----------------------------------------

    // Qcov3 14 days contact with Covid-19 --------------------------------------
    const qcov3 = survey.addNewSurveyItem({ itemKey: 'Qcov3' }, rootKey);
    if (!qcov3) { return; }
    survey.updateSurveyItem(qcov3_def(qcov3, q2.key, anySymptomSelected));
    // -----------------------------------------

    // Q3 when first symptoms --------------------------------------
    const q3 = survey.addNewSurveyItem({ itemKey: 'Q3' }, rootKey);
    if (!q3) { return; }
    survey.updateSurveyItem(q3_def(q3, anySymptomSelected));
    // -----------------------------------------

    // Q4 when symptoms end --------------------------------------
    const q4 = survey.addNewSurveyItem({ itemKey: 'Q4' }, rootKey);
    if (!q4) { return; }
    survey.updateSurveyItem(q4_def(q4, anySymptomSelected));
    // -----------------------------------------

    // Q5 symptoms developed suddenly --------------------------------------
    const q5 = survey.addNewSurveyItem({ itemKey: 'Q5' }, rootKey);
    if (!q5) { return; }
    survey.updateSurveyItem(q5_def(q5, anySymptomSelected));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pb7', type: 'pageBreak' }, rootKey);

    // Q6 when fever began -------------------------------------- TODO
    // const q6 = survey.addNewSurveyItem({ itemKey: 'Q6' }, rootKey);
    // if (!q6) { return; }
    // survey.updateSurveyItem(q6_def(q6, anySymptomSelected));
    // -----------------------------------------

    // Q6b fever developed suddenly -------------------------------------- TODO
    // const q6b = survey.addNewSurveyItem({ itemKey: 'Q6b' }, rootKey);
    // if (!q6b) { return; }
    // survey.updateSurveyItem(q6b_def(q6b, anySymptomSelected));
    // -----------------------------------------

    // Q6c took temperature -------------------------------------- TODO
    // const q6c = survey.addNewSurveyItem({ itemKey: 'Q6c' }, rootKey);
    // if (!q6c) { return; }
    // survey.updateSurveyItem(q6c_def(q6c, anySymptomSelected));
    // -----------------------------------------

    // Q6d highest temperature -------------------------------------- TODO
    // const q6d = survey.addNewSurveyItem({ itemKey: 'Q6d' }, rootKey);
    // if (!q6d) { return; }
    // survey.updateSurveyItem(q6d_def(q6d, anySymptomSelected));
    // -----------------------------------------

    // Q7 visited medical service --------------------------------------
    const q7 = survey.addNewSurveyItem({ itemKey: 'Q7' }, rootKey);
    if (!q7) { return; }
    survey.updateSurveyItem(q7_def(q7, anySymptomSelected));
    // -----------------------------------------

    // Q7b how soon visited medical service --------------------------------------
    const q7b = survey.addNewSurveyItem({ itemKey: 'Q7b' }, rootKey);
    if (!q7b) { return; }
    survey.updateSurveyItem(q7b_def(q7b, q7.key, anySymptomSelected));
    // -----------------------------------------

    // Qcov4 call COVID-19 emergency line -------------------------------------- TODO
    // const qcov4 = survey.addNewSurveyItem({ itemKey: 'Qcov4' }, rootKey);
    // if (!qcov4) { return; }
    // survey.updateSurveyItem(qcov4_def(qcov4, anySymptomSelected));
    // -----------------------------------------

    // Qcov5 call general emergency line -------------------------------------- TODO
    // const qcov5 = survey.addNewSurveyItem({ itemKey: 'Qcov5' }, rootKey);
    // if (!qcov5) { return; }
    // survey.updateSurveyItem(qcov5_def(qcov5, anySymptomSelected));
    // -----------------------------------------

    // Q8 contacted medical service --------------------------------------
    const q8 = survey.addNewSurveyItem({ itemKey: 'Q8' }, rootKey);
    if (!q8) { return; }
    survey.updateSurveyItem(q8_def(q8, anySymptomSelected));
    // -----------------------------------------

    // Q8b how soon contacted medical service --------------------------------------
    const q8b = survey.addNewSurveyItem({ itemKey: 'Q8b' }, rootKey);
    if (!q8b) { return; }
    survey.updateSurveyItem(q8b_def(q8b, q8.key, anySymptomSelected));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pb10', type: 'pageBreak' }, rootKey);

    // Q9 took medication -------------------------------------- TODO
    // const q9 = survey.addNewSurveyItem({ itemKey: 'Q9' }, rootKey);
    // if (!q9) { return; }
    // survey.updateSurveyItem(q9_def(q9, anySymptomSelected));
    // -----------------------------------------

    // Q9b how soon after symptoms taking antivirals -------------------------------------- TODO
    // const q9b = survey.addNewSurveyItem({ itemKey: 'Q9b' }, rootKey);
    // if (!q9b) { return; }
    // survey.updateSurveyItem(q9b_def(q9b, anySymptomSelected));
    // -----------------------------------------

    // Q14 hospitalized because symptoms -------------------------------------- TODO
    // const q14 = survey.addNewSurveyItem({ itemKey: 'Q14' }, rootKey);
    // if (!q14) { return; }
    // survey.updateSurveyItem(q14_def(q14, anySymptomSelected));
    // -----------------------------------------

    // Q10 changed daily routine because illness -------------------------------------- TODO
    // const q10 = survey.addNewSurveyItem({ itemKey: 'Q10' }, rootKey);
    // if (!q10) { return; }
    // survey.updateSurveyItem(q10_def(q10, anySymptomSelected));
    // -----------------------------------------

    // Q10b still off work/school -------------------------------------- TODO
    // const q10b = survey.addNewSurveyItem({ itemKey: 'Q10b' }, rootKey);
    // if (!q10b) { return; }
    // survey.updateSurveyItem(q10b_def(q10b, anySymptomSelected));
    // -----------------------------------------

    // Q10c still off work/school -------------------------------------- TODO
    // const q10c = survey.addNewSurveyItem({ itemKey: 'Q10c' }, rootKey);
    // if (!q10c) { return; }
    // survey.updateSurveyItem(q10c_def(q10c, anySymptomSelected));
    // -----------------------------------------

    // Qcov6 wear mask because symptoms -------------------------------------- TODO
    // const qcov6 = survey.addNewSurveyItem({ itemKey: 'Qcov6' }, rootKey);
    // if (!qcov6) { return; }
    // survey.updateSurveyItem(qcov6_def(qcov6, anySymptomSelected));
    // -----------------------------------------

    // Qcov7 took or strengthened measures because symptoms -------------------------------------- TODO
    // const qcov7 = survey.addNewSurveyItem({ itemKey: 'Qcov7' }, rootKey);
    // if (!qcov7) { return; }
    // survey.updateSurveyItem(qcov7_def(qcov7, anySymptomSelected));
    // -----------------------------------------

    // Qcov8 14 days contact COVID-19 before symptoms -------------------------------------- TODO
    // const qcov8 = survey.addNewSurveyItem({ itemKey: 'Qcov8' }, rootKey);
    // if (!qcov8) { return; }
    // survey.updateSurveyItem(qcov8_def(qcov8, anySymptomSelected));
    // -----------------------------------------

    // Q11 think cause of symptoms -------------------------------------- TODO
    // const q11 = survey.addNewSurveyItem({ itemKey: 'Q11' }, rootKey);
    // if (!q11) { return; }
    // survey.updateSurveyItem(q11_def(q11, anySymptomSelected));
    // -----------------------------------------

    // Qcov9 think reasons having disease -------------------------------------- TODO
    // const qcov9 = survey.addNewSurveyItem({ itemKey: 'Qcov9' }, rootKey);
    // if (!qcov9) { return; }
    // survey.updateSurveyItem(qcov9_def(qcov9, anySymptomSelected));
    // -----------------------------------------

    // Qcov9b informed contacts about suspicion COVID-19b infection -------------------------------------- TODO
    // const qcov9b = survey.addNewSurveyItem({ itemKey: 'Qcov9b' }, rootKey);
    // if (!qcov9b) { return; }
    // survey.updateSurveyItem(qcov9b_def(qcov9b, anySymptomSelected));
    // -----------------------------------------

    // Qcov10 lockdown professional activity --------------------------------------
    const qcov10 = survey.addNewSurveyItem({ itemKey: 'Qcov10' }, rootKey);
    if (!qcov10) { return; }
    survey.updateSurveyItem(qcov10_def(qcov10));
    // -----------------------------------------

    // Qcov10b days work outside home  --------------------------------------
    const qcov10b = survey.addNewSurveyItem({ itemKey: 'Qcov10b' }, rootKey);
    if (!qcov10b) { return; }
    survey.updateSurveyItem(qcov10b_def(qcov10b, qcov10.key));
    // -----------------------------------------

    // Qcov11 frequency go out to buy products -------------------------------------- TODO
    // const qcov11 = survey.addNewSurveyItem({ itemKey: 'Qcov11' }, rootKey);
    // if (!qcov11) { return; }
    // survey.updateSurveyItem(qcov11_def(qcov11, anySymptomSelected));
    // -----------------------------------------

    // Qcov12 frequency go out for fresh air or exercise -------------------------------------- TODO
    // const qcov12 = survey.addNewSurveyItem({ itemKey: 'Qcov12' }, rootKey);
    // if (!qcov12) { return; }
    // survey.updateSurveyItem(qcov12_def(qcov12, anySymptomSelected));
    // -----------------------------------------

    // Qcov13 how many people nearer then 1 meter -------------------------------------- TODO
    // const qcov13 = survey.addNewSurveyItem({ itemKey: 'Qcov13' }, rootKey);
    // if (!qcov13) { return; }
    // survey.updateSurveyItem(qcov13_def(qcov13, anySymptomSelected));
    // -----------------------------------------

    // Qcov14 situation if lockdown lifted, but childcare/schools closed -------------------------------------- TODO
    // const qcov14 = survey.addNewSurveyItem({ itemKey: 'Qcov14' }, rootKey);
    // if (!qcov14) { return; }
    // survey.updateSurveyItem(qcov14_def(qcov14, anySymptomSelected));
    // -----------------------------------------

    // Qcov14b days work outside from home -------------------------------------- TODO
    // const qcov14b = survey.addNewSurveyItem({ itemKey: 'Qcov14b' }, rootKey);
    // if (!qcov14b) { return; }
    // survey.updateSurveyItem(qcov14b_def(qcov14b, anySymptomSelected));
    // -----------------------------------------

    // Qcov15 lockdown extended, would follow --------------------------------------
    // TODO: not working on mobile
    // const qcov15 = survey.addNewSurveyItem({ itemKey: 'Qcov15' }, rootKey);
    // if (!qcov15) { return; }
    // survey.updateSurveyItem(qcov15_def(qcov15));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pblast', type: 'pageBreak' }, rootKey);

    // q_postal_code --------------------------------------
    const q_postal_code = survey.addNewSurveyItem({ itemKey: 'Q0' }, rootKey);
    if (!q_postal_code) { return; }
    survey.updateSurveyItem(q0_def(q_postal_code));
    // -----------------------------------------


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
        ["de", "Falls zutreffend, geben Sie bitte Ihre Antwort hier ein:"],
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
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To make filling out the rest of the survey quicker for you."],
                    ["de", "Um das Ausfüllen des restlichen Fragebogens für Sie schneller zu gestalten."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "If you believe that the symptoms you have reported today are caused by the same bout of illness as your previous symptoms, please tick “yes”. To save you time, we have filled in the information you gave us previously about your illness.Please check that it is still correct, and make any changes – for instance, if you have visited a doctor or taken additional time off work since you last completed the survey."],
                    ["de", "Falls Sie denken, dass die Symptome, die Sie heute angeben, vom selben Krankheitsschub stammen wie Ihre vorherigen, wählen Sie bitte „Ja“. Um Ihre Zeit zu sparen, haben wir die Informationen, die Sie uns letztes Mal gegeben haben, bereits eingetragen. Bitte prüfen Sie, ob diese noch richtig sind und machen sie gegebenenfalls Änderungen (z.B falls Sie einen Arzt besucht oder Sie sich zusätzliche Zeit von der Arbeit abgemeldet haben, seit Sie das letzte Mal den Fragebogen ausgefüllt haben)."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
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
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To help us work out the number of cases of flu that arise each day."],
                    ["de", "Sie helfen uns damit, die täglich hinzukommenden Fälle von Grippe zu bestimmen."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte geben Ihre Schätzung so genau wie möglich an."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -2592000) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
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
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Using the beginning and end dates of symptoms we can work out how long respiratory infections last."],
                    ["de", "Durch Verwendung der Anfangs- und Enddaten der Symptome können wir feststellen, wie lange Atemwegserkrankungen dauern."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte geben Ihre Schätzung so genau wie möglich an."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -2592000) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
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
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Sudden onset of symptoms is believed to be common for flu."],
                    ["de", "Plötzliches Auftreten von Symptomen gilt als häufig für die Grippe."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick yes if your symptoms appeared over a few hours rather than gradually developing over a few days."],
                    ["de", "Wählen Sie ja, falls Ihre Symptome über wenige Stunden aufgetreten sind statt über einige Tage hinweg."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
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
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["de", "Um herauszufinden, ob Menschen aufgrund Ihrer Symptome Kontakt zu gesundheitlichen Einrichtungen suchen."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all of those that apply. If you are due to see attend, then tick the final option."],
                    ["de", "Wählen Sie alle Optionen, die zutreffen. Falls Sie es vorhaben, wählen Sie bitte die letzte Option."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "GP or GP's practice nurse"],
                ["de", "Allgemeinarzt oder Allgemeinarztassisten/in"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital accident & emergency department / out of hours service"],
                ["de", "Notaufnahme/ Notfallstelle/ Notdienst außerhalb der Öffnungszeiten"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital admission"],
                ["de", "Einlieferung ins Krankenhaus"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Other medical services"],
                ["de", "Andere medizinische Einrichtungen"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
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
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out how quickly people with symptoms are seen by the health services."],
                    ["de", "Um herauszufinden, wie schnell Menschen mit Symptomen von gesundheitlichen Einrichtungen wahrgenommen werden."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only record the time until your FIRST contact with the health services."],
                    ["de", "Geben Sie nur die Zeit an, bis Sie zum ERSTEN MAL Kontakt zu gesundheitlichen Einrichtungen aufgenommen haben."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    editor.setCondition(
        expWithArgs('and', anySymptomSelected, expWithArgs('responseHasKeysAny', q7, [responseGroupKey, multipleChoiceKey].join('.'), '1', '2', '3', '4')));


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

const q8_def = (itemSkeleton: SurveyItem, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you contact via TELEPHONE or INTERNET any of medical services?"],
            ["de", "Haben Sie aufgrund Ihrer Syptome irgendwelche medizinischen Einrichtungen per TELEFON oder INTERNET kontaktiert?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["de", "Um herauszufinden, ob Menschen aufgrund Ihrer Symptome medizinische Einrichtungen kontaktieren."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all options that apply"],
                    ["de", "Wählen Sie alle Optionen, die zutreffen."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    editor.setCondition(
        anySymptomSelected
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            // disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GP - spoke to receptionist only"],
                ["de", "Allgemeinarzt (habe nur mit der Empfangsperson gesprochen)"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GP - spoke to doctor or nurse"],
                ["de", "Allgemeinarzt (habe mit Arzt oder Assistent/in gesprochen)"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "NHS Direct / NHS 24 / NHS Choices"],
                ["de", "Bezug von Informationen über Telefon oder Internet, direkt beim Gesundheitsministerium"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "NPFS"],
                ["de", "Öffentlicher Grippe-Informationsdienst"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q8b_def = (itemSkeleton: SurveyItem, q8: string, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How soon after your symptoms appeared did you first contact a medical service via TELEPHONE or INTERNET?"],
            ["de", "Wie lange, nachdem Ihre Symptome aufgetreten sind, haben Sie eine medizinische Einrichtung das erste Mal per TELEFON oder INTERNET kontaktiert?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out how quickly people with symptoms contact the health services."],
                    ["de", "Um herauszufinden, wie schnell Menschen mit Symptomen Kontakt zu medizinischen Einrichtungen aufnehmen."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only record the time until your FIRST contact with the health services."],
                    ["de", "Geben Sie nur die Zeit an, nach der Sie das ERSTE MAL Kontakt aufgenommen haben."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    editor.setCondition(
        expWithArgs('and', anySymptomSelected, expWithArgs('responseHasKeysAny', q8, [responseGroupKey, multipleChoiceKey].join('.'), '1', '2', '3', '5')));


    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["en", "Medical Service"],
                        ["de", "Medizinische Dienstleistung"],
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
                        ["en", "GP - spoke to receptionist only"],
                        ["de", "Allgemeinarzt (habe nur mit Empfangsperson gesprochen)"],
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
            ], displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '1')
        },
        {
            key: 'r2', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "GP – spoke to doctor or nurse"],
                        ["de", "Allgemeinarzt (habe mit Arzt oder Assistent/in gesprochen)"],
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
            ], displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '2')
        },
        {
            key: 'r3', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "NHS Direct / NHS 24 / NHS Choices"],
                        ["de", "Bezug von Informationen über Telefon oder Internet, direkt beim Gesundheitsministerium"],
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
            ], displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '3')
        },
        {
            key: 'r4', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Other"],
                        ["de", "Andere"],
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
            ], displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '5')
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
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3', '4', '5'),
            content: new Map([
                ["en", "Yes, I work from home"],
                ["de", "Ja, ich arbeite von zu Hause aus "],
            ])
        },
        {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3', '4', '5'),
            content: new Map([
                ["en", "Yes, I work outside from home"],
                ["de", "Ja, ich arbeite ausser Haus "],
            ])
        },
        {
            key: '3',
            role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3'),
            content: new Map([
                ["en", "No, I have a leave of absence to take care of my kid(s)"],
                ["de", "Nein, ich habe eine Beurlaubung, um mich um mein(e) Kind(er) zu kümmern "],
            ])
        },
        {
            key: '4',
            role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "No, I have a sick leave (because of Covid-19)"],
                ["de", "Nein, ich bin krankgeschrieben (wegen Covid-19) "],
            ])
        },
        {
            key: '5',
            role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
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