import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent, generateHelpGroupComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { SurveyGroupItem, SurveyItem, Survey, Expression } from "survey-engine/lib/data_types";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { initSingleChoiceGroup, initMultipleChoiceGroup, initDropdownGroup, initSliderCategoricalGroup, initMatrixQuestion, ResponseRowCell } from "../editor-engine/utils/question-type-generator";
import { ComponentEditor } from "../editor-engine/survey-editor/component-editor";


const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';
const multipleChoiceKey = 'mcg';
const dropDownKey = 'ddg'
const sliderCategoricalKey = "scc"
const inputKey = "ic"
const matrixKey = "mat"

export const generateCovidSISWeekly = (): Survey | undefined => {
    const surveyKey = 'weekly';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["de", "Wie geht's dir?"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Survey about health status."],
            ["de", "Fragebogen über den Gesundheitszustand."],
        ])
    ));

    const rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());

    const rootKey = rootItemEditor.getItem().key;

    // ------> Symptoms group
    const qg1 = survey.addNewSurveyItem({ itemKey: 'q1', isGroup: true }, rootKey);

    const qg1ItemEditor = new ItemEditor(qg1 as SurveyGroupItem);
    qg1ItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(qg1ItemEditor.getItem());

    const q1Key = qg1ItemEditor.getItem().key;

    // 1 title
    const q1_title = survey.addNewSurveyItem({ itemKey: 'title' }, q1Key);
    if (!q1_title) { return; }
    survey.updateSurveyItem(q1_title_def(q1_title));


    // general --------------------------------------
    const q1_1 = survey.addNewSurveyItem({ itemKey: '1' }, q1Key);
    if (!q1_1) { return; }
    survey.updateSurveyItem(q1_1_def(q1_1));
    // -----------------------------------------

    // respriratory --------------------------------------
    const q1_2 = survey.addNewSurveyItem({ itemKey: '2' }, q1Key);
    if (!q1_2) { return; }
    survey.updateSurveyItem(q1_2_def(q1_2));
    // -----------------------------------------

    // gastro --------------------------------------
    const q1_3 = survey.addNewSurveyItem({ itemKey: '3' }, q1Key);
    if (!q1_3) { return; }
    survey.updateSurveyItem(q1_3_def(q1_3));
    // -----------------------------------------

    // misc --------------------------------------
    const q1_4 = survey.addNewSurveyItem({ itemKey: '4' }, q1Key);
    if (!q1_4) { return; }
    survey.updateSurveyItem(q1_4_def(q1_4));
    // -----------------------------------------

    // Other symptom --------------------------------------
    const q1_5 = survey.addNewSurveyItem({ itemKey: '5' }, q1Key);
    if (!q1_5) { return; }
    survey.updateSurveyItem(q1_5_def(q1_5));
    // -----------------------------------------

    const q1_1_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q1Key, '1'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q1_2_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q1Key, '2'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q1_3_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q1Key, '3'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q1_4_symptom = expWithArgs('responseHasOnlyKeysOtherThan', [q1Key, '4'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');
    const q1_5_symptom = expWithArgs('checkResponseValueWithRegex', [q1Key, '5'].join('.'), [responseGroupKey, '1'].join('.'), '.*\\S.*');

    const anySymptomSelected = expWithArgs('or',
        q1_1_symptom,
        q1_2_symptom,
        q1_3_symptom,
        q1_4_symptom,
        q1_5_symptom
    );
    // <------ Symptoms group

    survey.addNewSurveyItem({ itemKey: 'pb1', type: 'pageBreak' }, rootKey);

    // -------> HAS SYMPTOMS GROUP
    const hasSymptomGroup = survey.addNewSurveyItem({ itemKey: 'HS', isGroup: true }, rootKey);
    const hasSymptomGroupEditor = new ItemEditor(hasSymptomGroup as SurveyGroupItem);
    hasSymptomGroupEditor.setSelectionMethod({ name: 'sequential' });
    hasSymptomGroupEditor.setCondition(anySymptomSelected)
    survey.updateSurveyItem(hasSymptomGroupEditor.getItem());

    const hasSymptomGroupKey = hasSymptomGroupEditor.getItem().key;

    // Qcov3 14 days contact with Covid-19 --------------------------------------
    const qcov3 = survey.addNewSurveyItem({ itemKey: 'Qcov3' }, hasSymptomGroupKey);
    if (!qcov3) { return; }
    survey.updateSurveyItem(qcov3_def(qcov3));
    // -----------------------------------------

    // Qcov3b 14 days contact with Covid-19 --------------------------------------
    const qcov3b = survey.addNewSurveyItem({ itemKey: 'Qcov3b' }, hasSymptomGroupKey);
    if (!qcov3b) { return; }
    survey.updateSurveyItem(qcov3b_def(qcov3b, qcov3.key));
    // -----------------------------------------

    // Qcov8 14 days contact COVID-19 before symptoms --------------------------------------
    const qcov8 = survey.addNewSurveyItem({ itemKey: 'Qcov8' }, hasSymptomGroupKey);
    if (!qcov8) { return; }
    survey.updateSurveyItem(qcov8_def(qcov8));
    // -----------------------------------------

    // Qcov8b same household --------------------------------------
    const qcov8b = survey.addNewSurveyItem({ itemKey: 'Qcov8b' }, hasSymptomGroupKey);
    if (!qcov8b) { return; }
    survey.updateSurveyItem(qcov8b_def(qcov8b, qcov8.key));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pbQ3', type: 'pageBreak' }, hasSymptomGroupKey);
    // Q3 when first symptoms --------------------------------------
    const q3 = survey.addNewSurveyItem({ itemKey: 'Q3' }, hasSymptomGroupKey);
    if (!q3) { return; }
    survey.updateSurveyItem(q3_def(q3));
    // -----------------------------------------

    // Q4 when symptoms end --------------------------------------
    const q4 = survey.addNewSurveyItem({ itemKey: 'Q4' }, hasSymptomGroupKey);
    if (!q4) { return; }
    survey.updateSurveyItem(q4_def(q4));
    // -----------------------------------------

    // Q5 symptoms developed suddenly --------------------------------------
    const q5 = survey.addNewSurveyItem({ itemKey: 'Q5' }, hasSymptomGroupKey);
    if (!q5) { return; }
    survey.updateSurveyItem(q5_def(q5));
    // -----------------------------------------

    // survey.addNewSurveyItem({ itemKey: 'pb7', type: 'pageBreak' }, rootKey);

    survey.addNewSurveyItem({ itemKey: 'pbFever', type: 'pageBreak' }, hasSymptomGroupKey);
    // ----> fever group
    const feverGroup = survey.addNewSurveyItem({ itemKey: 'Q6', isGroup: true }, hasSymptomGroupKey);
    const feverGroupEditor = new ItemEditor(feverGroup as SurveyGroupItem);
    feverGroupEditor.setSelectionMethod({ name: 'sequential' });
    feverGroupEditor.setCondition(
        expWithArgs('responseHasKeysAny', [q1Key, '1'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '1')
    )
    survey.updateSurveyItem(feverGroupEditor.getItem());

    const feverGroupKey = feverGroupEditor.getItem().key;

    // Q6 when fever began --------------------------------------
    const q6a = survey.addNewSurveyItem({ itemKey: 'a' }, feverGroupKey);
    if (!q6a) { return; }
    survey.updateSurveyItem(q6a_def(q6a));
    // -----------------------------------------

    // Q6b fever developed suddenly --------------------------------------
    const q6b = survey.addNewSurveyItem({ itemKey: 'b' }, feverGroupKey);
    if (!q6b) { return; }
    survey.updateSurveyItem(q6b_def(q6b));
    // -----------------------------------------

    // Q6c took temperature --------------------------------------
    const q6c = survey.addNewSurveyItem({ itemKey: 'c' }, feverGroupKey);
    if (!q6c) { return; }
    survey.updateSurveyItem(q6c_def(q6c));
    // -----------------------------------------

    // Q6d highest temperature --------------------------------------
    const q6d = survey.addNewSurveyItem({ itemKey: 'd' }, feverGroupKey);
    if (!q6d) { return; }
    survey.updateSurveyItem(q6d_def(q6d, q6c.key));
    // -----------------------------------------
    // <------ fever group


    survey.addNewSurveyItem({ itemKey: 'pbContact', type: 'pageBreak' }, hasSymptomGroupKey);
    // -----> contact/visit group
    const contactGroup = survey.addNewSurveyItem({ itemKey: 'contact', isGroup: true }, hasSymptomGroupKey);
    const contactGroupEditor = new ItemEditor(contactGroup as SurveyGroupItem);
    contactGroupEditor.setSelectionMethod({ name: 'sequential' });
    // contactGroupEditor.setCondition(anySymptomSelected)
    survey.updateSurveyItem(contactGroupEditor.getItem());

    const contactGroupKey = contactGroupEditor.getItem().key;

    // Q7 visited medical service --------------------------------------
    const q7 = survey.addNewSurveyItem({ itemKey: 'Q7' }, contactGroupKey);
    if (!q7) { return; }
    survey.updateSurveyItem(q7_def(q7));
    // -----------------------------------------

    // Q7b how soon visited medical service --------------------------------------
    const q7b = survey.addNewSurveyItem({ itemKey: 'Q7b' }, contactGroupKey);
    if (!q7b) { return; }
    survey.updateSurveyItem(q7b_def(q7b, q7.key));
    // -----------------------------------------

    // Q8 contacted medical service --------------------------------------
    const q8 = survey.addNewSurveyItem({ itemKey: 'Q8' }, contactGroupKey);
    if (!q8) { return; }
    survey.updateSurveyItem(q8_def(q8));
    // -----------------------------------------

    // Q8b how soon contacted medical service --------------------------------------
    const q8b = survey.addNewSurveyItem({ itemKey: 'Q8b' }, contactGroupKey);
    if (!q8b) { return; }
    survey.updateSurveyItem(q8b_def(q8b, q8.key));
    // -----------------------------------------

    // Qcov4 call COVID-19 emergency line --------------------------------------
    const qcov4 = survey.addNewSurveyItem({ itemKey: 'Qcov4' }, contactGroupKey);
    if (!qcov4) { return; }
    survey.updateSurveyItem(qcov4_def(qcov4));
    // -----------------------------------------

    // Qcov5 call general emergency line --------------------------------------
    const qcov5 = survey.addNewSurveyItem({ itemKey: 'Qcov5' }, contactGroupKey);
    if (!qcov5) { return; }
    survey.updateSurveyItem(qcov5_def(qcov5));
    // -----------------------------------------

    // analysis if infection --------------------------------------
    const qcov16 = survey.addNewSurveyItem({ itemKey: 'Qcov16' }, hasSymptomGroupKey);
    if (!qcov16) { return; }
    survey.updateSurveyItem(qcov16_def(qcov16));
    // -----------------------------------------

    // test PCR result --------------------------------------
    const qcov16b = survey.addNewSurveyItem({ itemKey: 'Qcov16b' }, hasSymptomGroupKey);
    if (!qcov16b) { return; }
    survey.updateSurveyItem(qcov16b_def(qcov16b, qcov16.key));
    // -----------------------------------------

    // test serological result --------------------------------------
    const qcov16c = survey.addNewSurveyItem({ itemKey: 'Qcov16c' }, hasSymptomGroupKey);
    if (!qcov16c) { return; }
    survey.updateSurveyItem(qcov16c_def(qcov16c, qcov16.key));
    // -----------------------------------------
    // <----- contact/visit group

    // survey.addNewSurveyItem({ itemKey: 'pb10', type: 'pageBreak' }, rootKey);

    survey.addNewSurveyItem({ itemKey: 'pbMedication', type: 'pageBreak' }, rootKey);
    // Q9 took medication --------------------------------------
    const q9 = survey.addNewSurveyItem({ itemKey: 'Q9' }, hasSymptomGroupKey);
    if (!q9) { return; }
    survey.updateSurveyItem(q9_def(q9));
    // -----------------------------------------

    // Q9b how soon after symptoms taking antivirals --------------------------------------
    const q9b = survey.addNewSurveyItem({ itemKey: 'Q9b' }, hasSymptomGroupKey);
    if (!q9b) { return; }
    survey.updateSurveyItem(q9b_def(q9b, q9.key));
    // -----------------------------------------

    // Q14 hospitalized because symptoms --------------------------------------
    const q14 = survey.addNewSurveyItem({ itemKey: 'Q14' }, hasSymptomGroupKey);
    if (!q14) { return; }
    survey.updateSurveyItem(q14_def(q14));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pbChange', type: 'pageBreak' }, rootKey);
    // Q10 changed daily routine because illness --------------------------------------
    const q10 = survey.addNewSurveyItem({ itemKey: 'Q10' }, hasSymptomGroupKey);
    if (!q10) { return; }
    survey.updateSurveyItem(q10_def(q10));
    // -----------------------------------------

    // Q10b still off work/school --------------------------------------
    const q10b = survey.addNewSurveyItem({ itemKey: 'Q10b' }, hasSymptomGroupKey);
    if (!q10b) { return; }
    survey.updateSurveyItem(q10b_def(q10b, q10.key));
    // -----------------------------------------

    // Q10c still off work/school --------------------------------------
    const q10c = survey.addNewSurveyItem({ itemKey: 'Q10c' }, hasSymptomGroupKey);
    if (!q10c) { return; }
    survey.updateSurveyItem(q10c_def(q10c, q10.key));
    // -----------------------------------------

    // Qcov6 wear mask because symptoms --------------------------------------
    const qcov6 = survey.addNewSurveyItem({ itemKey: 'Qcov6' }, hasSymptomGroupKey);
    if (!qcov6) { return; }
    survey.updateSurveyItem(qcov6_def(qcov6));
    // -----------------------------------------

    // Qcov7 took or strengthened measures because symptoms --------------------------------------
    const qcov7 = survey.addNewSurveyItem({ itemKey: 'Qcov7' }, hasSymptomGroupKey);
    if (!qcov7) { return; }
    survey.updateSurveyItem(qcov7_def(qcov7));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pbCause', type: 'pageBreak' }, rootKey);
    // Q11 think cause of symptoms --------------------------------------
    const q11 = survey.addNewSurveyItem({ itemKey: 'Q11' }, hasSymptomGroupKey);
    if (!q11) { return; }
    survey.updateSurveyItem(q11_def(q11));
    // -----------------------------------------

    // Qcov9 think reasons having disease --------------------------------------
    const qcov9 = survey.addNewSurveyItem({ itemKey: 'Qcov9' }, hasSymptomGroupKey);
    if (!qcov9) { return; }
    survey.updateSurveyItem(qcov9_def(qcov9, q11.key));
    // -----------------------------------------

    // Qcov9b informed contacts about suspicion COVID-19b infection --------------------------------------
    const qcov9b = survey.addNewSurveyItem({ itemKey: 'Qcov9b' }, hasSymptomGroupKey);
    if (!qcov9b) { return; }
    survey.updateSurveyItem(qcov9b_def(qcov9b, q11.key));
    // -----------------------------------------

    // <------- HAS SYMPTOMS GROUP

    survey.addNewSurveyItem({ itemKey: 'pbBehave', type: 'pageBreak' }, rootKey);
    // Qcov10 lockdown professional activity --------------------------------------
    const qcov10 = survey.addNewSurveyItem({ itemKey: 'Qcov10' }, rootKey);
    if (!qcov10) { return; }
    survey.updateSurveyItem(qcov10_def(qcov10));
    // -----------------------------------------

    // Qcov11 frequency go out to buy products --------------------------------------
    const qcov11 = survey.addNewSurveyItem({ itemKey: 'Qcov11' }, rootKey);
    if (!qcov11) { return; }
    survey.updateSurveyItem(qcov11_def(qcov11));
    // -----------------------------------------

    // Qcov12 frequency go out for fresh air or exercise --------------------------------------
    const qcov12 = survey.addNewSurveyItem({ itemKey: 'Qcov12' }, rootKey);
    if (!qcov12) { return; }
    survey.updateSurveyItem(qcov12_def(qcov12));
    // -----------------------------------------

    // Qcov13 how many people nearer then 1 meter --------------------------------------
    const qcov13 = survey.addNewSurveyItem({ itemKey: 'Qcov13' }, rootKey);
    if (!qcov13) { return; }
    survey.updateSurveyItem(qcov13_def(qcov13));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pbLockdown', type: 'pageBreak' }, rootKey);
    // Qcov14 situation if lockdown lifted, but childcare/schools closed --------------------------------------
    const qcov14 = survey.addNewSurveyItem({ itemKey: 'Qcov14' }, rootKey);
    if (!qcov14) { return; }
    survey.updateSurveyItem(qcov14_def(qcov14));
    // -----------------------------------------

    // Qcov14b days work outside from home --------------------------------------
    const qcov14b = survey.addNewSurveyItem({ itemKey: 'Qcov14b' }, rootKey);
    if (!qcov14b) { return; }
    survey.updateSurveyItem(qcov14b_def(qcov14b, qcov14.key));
    // -----------------------------------------

    // Qcov15 lockdown extended, would follow --------------------------------------
    const qcov15 = survey.addNewSurveyItem({ itemKey: 'Qcov15' }, rootKey);
    if (!qcov15) { return; }
    survey.updateSurveyItem(qcov15_def(qcov15));
    // -----------------------------------------



    survey.addNewSurveyItem({ itemKey: 'pblast', type: 'pageBreak' }, rootKey);

    const final_text = survey.addNewSurveyItem({ itemKey: 'finalText' }, rootKey);
    if (!final_text) { return; }
    survey.updateSurveyItem(qfinaltext_def(final_text));


    // q_postal_code -------------------------------------
    // const q_postal_code = survey.addNewSurveyItem({ itemKey: 'Q0' }, rootKey);
    // if (!q_postal_code) { return; }
    // survey.updateSurveyItem(q0_def(q_postal_code));
    // -----------------------------------------

    // console.log(q32Editor.findResponseComponent('rg'));
    // q32Editor.removeResponseComponent('rg.scg');

    console.log(survey.getSurvey());
    // console.log(survey.getSurveyJSON());


    // console.log(JSON.stringify(expOr, undefined, '  '));
    return survey.getSurvey();
}

const q1_title_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "Please choose if you had any of the following symptoms since your last visit. If this is your first visit, please consider last week."],
                ["de", "Hast du irgendwelche der folgenden Symptome seit deinem letzten Besuch?  Falls dies dein erster Besuch ist, betrachte bitte die vergangene Woche."],
            ]))
        }
    )
    return editor.getItem();
}

const qfinaltext_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "This was all for now, please submit your responses. By filling out this survey regularly, you can help us fight the virus."],
                ["de", "Das war die letzte Frage. Du kannst deine Antworten nun absenden. Mit regelmäßiger Teilnahme an dieser Umfrage unterstützt du die Medizinforscher bei ihrer Arbeit. Danke!"],
            ]))
        }
    )
    return editor.getItem();
}


const q1_1_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any general symptoms such as"],
            ["de", "Allgemeine Symptome wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Fever"],
                ["de", "Fieber"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chills"],
                ["de", "Schüttelfrost"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Headache"],
                ["de", "Kopfschmerzen"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Feeling tired or exhausted (malaise)"],
                ["de", "Müdigkeit oder Erschöpfung"],
            ])
        },
        {
            key: '5', role: 'option',
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

const q1_2_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any respiratorial symptoms such as"],
            ["de", "Atemwegsbeschwerden wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sneezing"],
                ["de", "Niesen"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sore throat"],
                ["de", "Halsweh"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Cough"],
                ["de", "Husten"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Runny or blocked nose"],
                ["de", "Laufende oder verstopfte Nase"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Shortness of breath"],
                ["de", "Atemnot"],
            ])
        },
        {
            key: '6', role: 'option',
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

const q1_3_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any gastroenterological symptoms such as"],
            ["de", "Beschwerden im Magen-Darm Trakt wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nausea"],
                ["de", "Brechreiz"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Vomiting"],
                ["de", "Erbrechen"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diarrhoea"],
                ["de", "Durchfall"],
            ])
        },
        {
            key: '4', role: 'option',
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

const q1_4_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have of the following symptoms?"],
            ["de", "Oder eins der folgenden Beschwerden?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Muscle/joint pain"],
                ["de", "Muskel-/ Gelenkschmerzen"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chest pain"],
                ["de", "Schmerzen in der Brust"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Watery, bloodshot eyes"],
                ["de", "Wässrige, rote Augen"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nose bleed"],
                ["de", "Nasenbluten"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of smell"],
                ["de", "Geruchsverlust"],
            ])
        },
        {
            key: '6', role: 'option',
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

const q1_5_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any other symptoms?"],
            ["de", "Falls deine Symptome oben nicht aufgelistet sind, kannst du uns diese hier gerne erzählen."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const descEdit = new ComponentEditor(undefined, {
        role: 'text'
    });
    descEdit.setContent(generateLocStrings(new Map([
        ["en", "If applies enter your response into the box:"],
        ["de", "Falls zutreffend, gib deine Antwort bitte hier ein:"],
    ])));
    descEdit.setStyles([{ key: 'variant', value: 'annotation' }])
    editor.addExistingResponseComponent(descEdit.getComponent(), rg?.key);

    const input = new ComponentEditor(undefined, {
        key: '1',
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
            ["de", "Hattest du in den 14 Tagen vor dem Beginn deiner Symptome Kontakt zu jemandem, für den Tests bestätigt haben, dass er Covid-19 hat?"],
            ["fr", "Dans les 14 jours avant l’apparition de vos symptômes, avez-vous été en contact étroit avec une personne pour laquelle les analyses ont confirmé qu’elle avait le Covid-19 ?"],
        ]))
    );
    /*editor.setCondition(
        expWithArgs('and', anySymptomSelected, expWithArgs('responseHasOnlyKeysOtherThan', [q2].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1'))
    );*/

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Don’t Know"],
                ["de", "Ich weiss es nicht."],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const qcov3b_def = (itemSkeleton: SurveyItem, qcov3Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you live in the same household as that person?"],
            ["de", "Wohnst du im selben Haushalt wie diese Person?"],
            ["fr", "Vivez-vous sous le même toit que cette personne ?"],
        ]))
    );
    editor.setCondition(
        expWithArgs('responseHasKeysAny', [qcov3Key].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1')
    )
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Don’t Know"],
                ["de", "Ich weiss es nicht."],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const qcov8_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "In the 14 days before your symptoms started, have you been in close contact with someone presenting symptoms of COVID-19? (Symptoms of COVID-19 include: fever or chills, cough, sore throat, shortness of breath, sore muscles and headache.)"],
            ["de", "Hattest du in den 14 Tagen vor dem Auftreten deiner Symptome engen Kontakt mit jemandem, der Symptome von COVID-19 aufweist?"],
            ["fr", "Dans les 14 jours avant l’apparition de vos symptômes, avez-vous été en contact étroit avec une personne présentant des symptômes du COVID-19 ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Don’t Know"],
                ["de", "Ich weiss es nicht."],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov8b_def = (itemSkeleton: SurveyItem, qcov8Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you live in the same household as that person?"],
            ["de", "Wohnst du im selben Haushalt wie diese Person?"],
            ["fr", "Vivez-vous sous le même toit que cette personne ?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [qcov8Key].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Don’t Know"],
                ["de", "Ich weiss es nicht."],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q3_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When did the first symptoms appear?"],
            ["de", "Wann sind die ersten Symptome aufgetreten?"],
            ["fr", " Quand les premiers symptômes sont-ils apparus?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To help us work out the number of cases of flu that arise each day."],
                    ["de", "Sie helfen uns damit, die täglich hinzukommenden Fälle von Grippe zu bestimmen."],
                    ["fr", "Pour nous aider à travailler sur le nombre de cas de grippe qui se déclarent chaque jour."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte geben Ihre Schätzung so genau wie möglich an."],
                    ["fr", "Donnez, s'il vous plaît, une estimation aussi précise que possible."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    // editor.setCondition(anySymptomSelected);

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
                ["fr", "Sélectionner la date"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q4_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When did your symptoms end?"],
            ["de", "Wann sind Ihre Symptome abgeklungen?"],
            ["fr", "Quand vos symptômes ont-ils disparu?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Using the beginning and end dates of symptoms we can work out how long respiratory infections last."],
                    ["de", "Durch Verwendung der Anfangs- und Enddaten der Symptome können wir feststellen, wie lange Atemwegserkrankungen dauern."],
                    ["fr", "En utilisant les dates de début et de fin des symptômes, nous pouvons travailler sur la durée des infections respiratoires."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte geben Ihre Schätzung so genau wie möglich an."],
                    ["fr", "Donnez, s'il vous plaît, une estimation aussi précise que possible."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    // editor.setCondition(anySymptomSelected);

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
                ["de", "Wähle ein Datum"],
                ["fr", "Sélectionner la date"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I am still ill"],
                ["de", "Ich bin immer noch krank"],
                ["fr", "Je suis encore malade"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q5_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did your symptoms develop suddenly over a few hours?"],
            ["de", "Sind deine Symptome plötzlich über wenige Stunden erschienen?"],
            ["fr", "Est-ce que vos symptômes se sont déclarés soudainement, en l'espace de quelques heures?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Sudden onset of symptoms is believed to be common for flu."],
                    ["de", "Plötzliches Auftreten von Symptomen gilt als häufig für die Grippe."],
                    ["fr", "L'apparition soudaine des symptômes est considéré comme commune pour la grippe."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick yes if your symptoms appeared over a few hours rather than gradually developing over a few days."],
                    ["de", "Wählen Sie ja, falls Ihre Symptome über wenige Stunden aufgetreten sind statt über einige Tage hinweg."],
                    ["fr", "Cochez «oui» si vos symptômes sont apparus en quelques heures plutôt que progressivement sur quelques jours."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    // editor.setCondition(anySymptomSelected);

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q6a_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When did your fever begin?"],
            ["de", "Wann hat dein Fieber angefangen?"],
            ["fr", " Quand est-ce que votre fièvre a commencé ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Fever is very important for diagnosing flu, so we want to know when this started."],
                    ["de", "Fieber ist sehr wichtig für die Diagnose von Grippe. Aus diesem Grund möchten wir gern wissen, wann dieses angefangen hat."],
                    ["fr", "La fièvre est très importante pour le diagnostic de la grippe. Nous voulons donc savoir quand cela a commencé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte geben Sie Ihre Abschätzung so genau wie möglich an."],
                    ["fr", "Donnez, s'il vous plaît, une estimation aussi précise que possible."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            content: new Map([
                ["en", "Choose date"],
                ["de", "Wähle ein Datum"],
                ["fr", "Sélectionner la date"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don't know/can't rember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q6b_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did your fever develop suddenly over a few hours?"],
            ["de", "Ist dein Fieber plötzlich über wenige Stunden aufgetreten?"],
            ["fr", "Est-ce que votre fièvre s'est déclarée soudainement, en l'espace de quelques heures?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Flu is often associated with a sudden onset of fever"],
                    ["de", "Grippe wird oft mit einem plötzlichen Auftreten von Fieber in Verbindung gebracht."],
                    ["fr", "La grippe est souvent associée à une apparition soudaine de fièvre."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick yes if your fever appeared over a few hours rather than gradually developing over a few days."],
                    ["de", "Wählen Sie ja, falls Ihr Fieber über wenige Stunden aufgetreten ist, statt über einige Tage hinweg."],
                    ["fr", "Cochez «oui» si votre fièvre est apparue en quelques heures plutôt que progressivement sur quelques jours."],
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
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q6c_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you take your temperature?"],
            ["de", "Hast du deine Temperatur gemessen?"],
            ["fr", "Avez-vous pris votre température?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Flu often causes a high temperature. However, not everyone takes their temperature when they are ill."],
                    ["de", "Grippe verursacht häufig eine hohe Körpertemperatur. Aber nicht jeder misst seine Körpertemperatur, wenn er krank ist."],
                    ["fr", "La grippe est souvent associée à une température élevée. Cependant tout le monde ne prend pas sa température lorsqu'il est malade."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Answer yes, if you took your temperature using a thermometer."],
                    ["de", "Wählen Sie ja, falls Sie Ihre Körpertemperatur mit einem Thermometer gemessen haben."],
                    ["fr", "Cochez «oui» si vous avez pris votre température à l'aide d'un thermomètre."],
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
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q6d_def = (itemSkeleton: SurveyItem, q6cKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What was your highest temperature measured?"],
            ["de", "Was war deine höchste gemessene Temperatur?"],
            ["fr", " Quel a été votre température mesurée la plus élevée?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q6cKey].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Flu often causes a high temperature."],
                    ["de", "Grippe verursacht häufig eine hohe Körpertemperatur."],
                    ["fr", "La grippe provoque souvent une température élevée."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Give the highest temperature you recorded during this episode of illness."],
                    ["de", "Geben Sie die höchste Körpertemperatur an, die Sie während Ihrer Krankheit gemessen haben."],
                    ["fr", "Indiquez la plus haute température que vous avez enregistrée au cours de cette épisode de maladie."],
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
                ["en", "Below 37°C"],
                ["de", "Unter 37°C"],
                ["fr", "Moins de 37°C"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "37° - 37.4°C"],
                ["de", "37°C - 37.4°C"],
                ["fr", "37° – 37.4°C"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "37.5° - 37.9°C"],
                ["de", "37.5° - 37.9°C"],
                ["fr", "37.5° – 37.9°C"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "38° - 38.9°C"],
                ["de", "38° - 38.9°C"],
                ["fr", "38° – 38.9°C"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "39° - 39.9°C"],
                ["de", "39° - 39.9°C"],
                ["fr", "39° – 39.9°C"],
            ])
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["en", "40°C or more"],
                ["de", "40°C oder mehr"],
                ["fr", "40°C ou plus"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const q7_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you VISIT (see face to face) any medical services?"],
            ["de", "Hast du auf Grund deiner Symptome irgendeine Form von medizinischer Einrichtung BESUCHT (persönlich dort erschienen)?"],
            ["fr", "En raison de vos symptômes, avez-vous rendu visite (en personne) à des services médicaux ?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["de", "Um herauszufinden, ob Menschen aufgrund Ihrer Symptome Kontakt zu gesundheitlichen Einrichtungen suchen."],
                    ["fr", "Pour savoir si la population entre en contact avec les services de santé en raison de ses symptômes."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all of those that apply. If you are due to see attend, then tick the final option."],
                    ["de", "Wählen Sie alle Optionen, die zutreffen. Falls Sie es vorhaben, wählen Sie bitte die letzte Option."],
                    ["fr", "Merci de cocher toutes les réponses qui s'appliquent . Si vous avez rendez-vous prochainement, merci de cocher l'option finale."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "GP or GP's practice nurse"],
                ["de", "Allgemeinarzt oder Allgemeinarztassisten/in"],
                ["fr", "Médecin généraliste"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital accident & emergency department / out of hours service"],
                ["de", "Notaufnahme/ Notfallstelle/ Notdienst außerhalb der Öffnungszeiten"],
                ["fr", "Service des urgences d'un hôpital/clinique ou médecin de garde"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital admission"],
                ["de", "Einlieferung ins Krankenhaus"],
                ["fr", "Consultation ambulatoire à l'hôpital"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Other medical services"],
                ["de", "Andere medizinische Einrichtungen"],
                ["fr", "Autre service médical"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "No, but I have an appointment scheduled"],
                ["de", "Nein, aber ich habe schon einen Termin"],
                ["fr", "Non, mais j'ai rendez-vous prochainement"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q7b_def = (itemSkeleton: SurveyItem, q7: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How soon after your symptoms appeared did you first VISIT a medical service?"],
            ["de", "Wie lange, nachdem deine Symptome aufgetreten sind, hast du das erste Mal eine medizinische Einrichtung BESUCHT?"],
            ["fr", "Combien de temps après que vos symptômes soient apparus avez-vous visité un service médical ?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out how quickly people with symptoms are seen by the health services."],
                    ["de", "Um herauszufinden, wie schnell Menschen mit Symptomen von gesundheitlichen Einrichtungen wahrgenommen werden."],
                    ["fr", "Pour savoir à quelle vitesse les personnes présentant des symptômes sont vus par les services de santé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only record the time until your FIRST contact with the health services."],
                    ["de", "Geben Sie nur die Zeit an, bis Sie zum ERSTEN MAL Kontakt zu gesundheitlichen Einrichtungen aufgenommen haben."],
                    ["fr", "En saisissant le temps séparant l'apparition de vos symptômes et votre PREMIER contact avec les services de santé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    editor.setCondition(
        expWithArgs('responseHasOnlyKeysOtherThan', q7, [responseGroupKey, multipleChoiceKey].join('.'), '0', '5')
    );


    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const ddOptions: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup', items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["en", "Same day"],
                    ["de", "Am gleichen Tag"],
                    ["fr", "Jour même"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["en", "1 day"],
                    ["de", "1 Tag"],
                    ["fr", "1 jour"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["en", "2 days"],
                    ["de", "2 Tage"],
                    ["fr", "2 jours"],
                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["en", "3 days"],
                    ["de", "3 Tage"],
                    ["fr", "3 jours"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["en", "4 days"],
                    ["de", "4 Tage"],
                    ["fr", "4 jours"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["en", "5-7 days"],
                    ["de", "5-7 Tage"],
                    ["fr", "5–7 jours"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["en", "More than 7 days"],
                    ["de", "Mehr als 7 Tage"],
                    ["fr", "Plus de 7 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "I don't know/can't remember"],
                    ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                    ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["en", "Medical Service"],
                        ["de", "Medizinische Einrichtungen"],
                        ["fr", "Service médical"],
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
                        ["fr", "Médecin généraliste"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '1')
        },
        {
            key: 'r2', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Hospital accident & department/out of hours service"],
                        ["de", "Notaufnahme/ Notfallstelle/ Notdienst außerhalb der Öffnungszeiten"],
                        ["fr", "Service des urgences d'un hôpital/clinique ou médecin de garde"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '3')
        },
        {
            key: 'r3', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Hospital admission"],
                        ["de", "Einlieferung ins Krankenhaus"],
                        ["fr", "Consultation ambulatoire à l'hôpital"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '2')
        },
        {
            key: 'r4', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Other medical services"],
                        ["de", "Andere medizinische Einrichtungen"],
                        ["fr", "Autre service médical"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q7].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '4')
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    return editor.getItem();
}

const q8_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you contact via TELEPHONE or INTERNET any of medical services?"],
            ["de", "Hast du aufgrund deiner Syptome irgendwelche medizinischen Einrichtungen per TELEFON oder INTERNET kontaktiert?"],
            ["fr", "En raison de vos symptômes, avez-vous contacté un service médical par téléphone ou par Internet?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["de", "Um herauszufinden, ob Menschen aufgrund Ihrer Symptome medizinische Einrichtungen kontaktieren."],
                    ["fr", "Pour savoir si la population entre en contact avec les services de santé en raison de ses symptômes."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all options that apply"],
                    ["de", "Wählen Sie alle Optionen, die zutreffen."],
                    ["fr", "Cochez toutes les options qui s'appliquent"],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            // disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GP - spoke to receptionist only"],
                ["de", "Allgemeinarzt (habe nur mit der Empfangsperson gesprochen)"],
                ["fr", "Médecin généraliste – Echange avec la réceptionniste uniquement"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GP - spoke to doctor or nurse"],
                ["de", "Allgemeinarzt (habe mit Arzt oder Assistent/in gesprochen)"],
                ["fr", "Médecin généraliste – Echange avec le médecin ou l'infirmière"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "NHS Direct / NHS 24 / NHS Choices"],
                ["de", "Bezug von Informationen über Telefon oder Internet, direkt beim Gesundheitsministerium"],
                ["fr", "Service de conseil santé par téléphone (par exemple : compagnie d'assurance)"],
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
                ["fr", "Autre"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q8b_def = (itemSkeleton: SurveyItem, q8: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How soon after your symptoms appeared did you first contact a medical service via TELEPHONE or INTERNET?"],
            ["de", "Wie lange, nachdem deine Symptome aufgetreten sind, hast du eine medizinische Einrichtung das erste Mal per TELEFON oder INTERNET kontaktiert?"],
            ["fr", "Combien de temps après l'apparition de vos symptômes avez-vous contacté un service médical par téléphone ou par Internet?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out how quickly people with symptoms contact the health services."],
                    ["de", "Um herauszufinden, wie schnell Menschen mit Symptomen Kontakt zu medizinischen Einrichtungen aufnehmen."],
                    ["fr", "Pour savoir à quelle vitesse la population présentant des symptômes entre en contact avec les services de santé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only record the time until your FIRST contact with the health services."],
                    ["de", "Geben Sie nur die Zeit an, nach der Sie das ERSTE MAL Kontakt aufgenommen haben."],
                    ["fr", "En saisissant le temps séparant l'apparition de vos symptômes et votre PREMIER contact avec les services de santé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );
    editor.setCondition(expWithArgs('responseHasKeysAny', q8, [responseGroupKey, multipleChoiceKey].join('.'), '1', '2', '3', '5'));

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const ddOptions: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup', items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["en", "Same day"],
                    ["de", "Am selben Tag"],
                    ["fr", "Le jour même"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["en", "1 day"],
                    ["de", "1 Tag"],
                    ["fr", "1 jour"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["en", "2 days"],
                    ["de", "2 Tage"],
                    ["fr", "2 jours"],
                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["en", "3 days"],
                    ["de", "3 Tage"],
                    ["fr", "3 jours"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["en", "4 days"],
                    ["de", "4 Tage"],
                    ["fr", "4 jours"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["en", "5-7 days"],
                    ["de", "5-7 Tage"],
                    ["fr", "5-7 jours"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["en", "More than 7 days"],
                    ["de", "Mehr als 7 Tage"],
                    ["fr", "Plus de 7 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "I don't know/can't remember"],
                    ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                    ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["en", "Medical Service"],
                        ["de", "Medizinische Dienstleistung"],
                        ["fr", "Service médical"],
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
                        ["fr", "Médecin généraliste – Echange avec la réceptionniste uniquement"],
                    ]),
                },
                { ...ddOptions },
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '1')
        },
        {
            key: 'r2', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "GP – spoke to doctor or nurse"],
                        ["de", "Allgemeinarzt (habe mit Arzt oder Assistent/in gesprochen)"],
                        ["fr", "Médecin généraliste – Echange avec le médecin ou l'infirmière"],
                    ]),
                },
                { ...ddOptions },
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '2')
        },
        {
            key: 'r3', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "NHS Direct / NHS 24 / NHS Choices"],
                        ["de", "Bezug von Informationen über Telefon oder Internet, direkt beim Gesundheitsministerium"],
                        ["fr", "Service de conseil santé par téléphone (par exemple : compagnie d'assurance)"],
                    ]),
                },
                { ...ddOptions },
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '3')
        },
        {
            key: 'r4', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Other"],
                        ["de", "Andere"],
                        ["fr", "Autre"],
                    ]),
                },
                { ...ddOptions },
            ],
            displayCondition: expWithArgs('responseHasKeysAny', [q8].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '5')
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    return editor.getItem();
}

const qcov4_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you call [write the COVID-19 emergency line of your country]?"],
            ["de", "Hast du wegen deiner Symptome die Infoline Coronavirus angerufen?"],
            ["fr", "En raison de vos symptômes, avez-vous contacté par téléphone l'infoline Coronavirus mise en place par le gouvernement ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov5_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you call [write the general emergency line of your country]?"],
            ["de", 'Hast du wegen deiner Symptome "144" angerufen?'],
            ["fr", "En raison de vos symptômes, avez-vous contacté le 144 par téléphone?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov16_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you undergo analyses to know if you have COVID-19 (infection due to SRAS-CoV-2)?"],
            ["de", "Hast du dich aufgrund Ihrer Symptome Analysen unterzogen, um zu wissen, ob du COVID-19 (Infektion durch SARS-CoV-2) hast?"],
            ["fr", "En raison de vos symptômes, avez-vous effectué des analyses pour savoir si vous aviez le COVID-19 (infection due au nouveau coronavirus SARS-CoV-2) ?"],
        ]))
    );


    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, a PCR test (virus search, on a swab in nose or mouth, or a sputum or saliva sample)"],
                ["de", "Ja, ein PCR-Test (Virussuche, auf einem Abstrich in Nase oder Mund oder auf einer Sputum- oder Speichelprobe)"],
                ["fr", "Oui, un test PCR (recherche du virus à partir d’un frottis dans le nez ou dans la bouche, ou d’un prélèvement de crachat ou de salive)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, a serological analysis (screening for antibodies against this virus, from a drop of blood at fingertip or a blood sample)"],
                ["de", "Ja, eine serologische Analyse (Screening auf Antikörper gegen dieses Virus, aus einem Blutstropfen an der Fingerspitze oder einer Blutprobe)"],
                ["fr", "Oui, une sérologie (recherche d’anticorps contre le virus à partir d’une goutte de sang au bout du doigt ou d’une prise de sang)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Not yet, I have a prescription and plan to shortly undergo a test"],
                ["de", "Noch nicht, ich habe ein Rezept und plane, mich in Kürze einem Test zu unterziehen"],
                ["fr", "Pas encore, j'ai une prescription et prévois de réaliser un test prochainement"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "No, I have a prescription but will not undergo the test"],
                ["de", "Nein, ich habe ein Rezept, unterziehe mich aber nicht dem Test"],
                ["fr", "Non, j'ai une prescription mais ne prévois pas de réaliser de test"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    return editor.getItem();
}
const qcov16b_def = (itemSkeleton: SurveyItem, qcov16Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you already get the result of this PCR test?"],
            ["de", "Hast du das Ergebnis dieses PCR-Tests bereits erhalten?"],
            ["fr", "Avez-vous déjà reçu le résultat de cette analyse par PCR ?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [qcov16Key].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, Positive for this new coronavirus (SARS-CoV-2, COVID-19)"],
                ["de", "Ja, positiv für das SARS-CoV-2 Coronavirus (COVID-19)"],
                ["fr", "Oui, positif pour le coronavirus SARS-CoV-2 (COVID-19)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, Negative for this new coronavirus (SARS-CoV-2, COVID-19)"],
                ["de", "Ja, negativ für das SARS-CoV-2 Coronavirus (COVID-19)"],
                ["fr", "Oui, négatif pour le coronavirus SARS-CoV-2 (COVID-19)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, the result is non interpretable"],
                ["de", "Ja, das Ergebnis ist nicht interpretierbar"],
                ["fr", "Oui, le résultat est non interprétable"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "No, I do not have the result yet"],
                ["de", "Nein, ich habe das Ergebnis noch nicht"],
                ["fr", "Non, je n'ai pas encore le résultat"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov16c_def = (itemSkeleton: SurveyItem, qcov16Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you already get the result of this serological analysis?"],
            ["de", "Hast du das Ergebnis dieser serologischen Analyse bereits erhalten?"],
            ["fr", "Avez-vous déjà reçu le résultat de cette analyse de sang ?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [qcov16Key].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '2')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, Positive for this new coronavirus (SARS-CoV-2, COVID-19)"],
                ["de", "Ja, positiv für das SARS-CoV-2 Coronavirus (COVID-19)"],
                ["fr", "Oui, positif pour le coronavirus SARS-CoV-2 (COVID-19)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, Negative for this new coronavirus (SARS-CoV-2, COVID-19)"],
                ["de", "Ja, negativ für das SARS-CoV-2 Coronavirus (COVID-19)"],
                ["fr", "Oui, négatif pour le coronavirus SARS-CoV-2 (COVID-19)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, the result is non interpretable"],
                ["de", "Ja, das Ergebnis ist nicht interpretierbar"],
                ["fr", "Oui, le résultat est non interprétable"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "No, I do not have the result yet"],
                ["de", "Nein, ich habe das Ergebnis noch nicht"],
                ["fr", "Non, je n'ai pas encore le résultat"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q9_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you take medication for these symptoms?"],
            ["de", "Hast du Medikamente gegen die folgenden Symptome genommen?"],
            ["fr", "Avez-vous pris des médicaments pour ces symptômes ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out who gets treated, and how effective treatment is."],
                    ["de", "Um herauszufinden, wer behandelt wird und wie effektiv die Behandlung ist."],
                    ["fr", "Pour savoir qui se fait soigner, et si le traitement est efficace."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only record those medications that you used because of  this bout of illness. If you are on other medications because of a pre-existing illness then do not record these."],
                    ["de", "Geben Sie nur die Medikamente an, die Sie aufgrund dieses Krankheitsschubs nehmen. Falls Sie auch Medikamente aufgrund von bereits existierenden Krankheiten nehmen, geben Sie diese bitte nicht an."],
                    ["fr", "Ne saisissez que les médicaments que vous pris en raison de cette épisode de maladie. Si vous avez pris d'autres médicaments pour une maladie préexistante, alors ne les enregistrez pas."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );


    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Pain killers (e.g. paracetamol, lemsip, ibuprofen, aspirin, calpol, etc)"],
                ["de", "Schmerzmittel (z.B. Paracetamol, Aspirin, Ibuprofen)"],
                ["fr", "Médicaments contre la douleur ou la fièvre (p. ex. Paracetamol, Dafalgan, Ibuprofen, Aspirin, Pretuval, etc)"],
            ])
        },
        {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Cough medication (e.g. expectorants)"],
                ["de", "Erkältungsmittel (z.B. Schleimlöser)"],
                ["fr", "Médicaments contre la toux (p. ex. expectorants)"],
            ])
        },
        {
            key: '3',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Antivirals (Tamiflu, Relenza)"],
                ["de", "Antivirale Medikamente (Tamiflu, Relenza)"],
                ["fr", "Antiviraux (par ex. Tamiflu)"],
            ])
        },
        {
            key: '4',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Antibiotics"],
                ["de", "Antibiotica"],
                ["fr", "Antibiotiques"],
            ])
        },
        {
            key: '7',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Homeopathy"],
                ["de", "Homöopathie"],
                ["fr", "Homéopathie"],
            ])
        },
        {
            key: '8',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Alternative medicine (essential oil, phytotherapy, etc.)"],
                ["de", "Alternativmedizin (ätherisches Öl, Phytotherapie usw.)"],
                ["fr", "Médecines douces (huiles essentielles, phytothérapie, etc.)"],
            ])
        },
        {
            key: '5',
            role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
                ["fr", "Autre"],
            ])
        },
        {
            key: '6',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
        {
            key: '0',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '6'),
            content: new Map([
                ["en", "No medication"],
                ["de", "Keine Medikamente"],
                ["fr", "Aucun médicament"],
            ])
        },
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q9b_def = (itemSkeleton: SurveyItem, q9Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How long after the beginning of your symptoms did you start taking antiviral medication?"],
            ["de", "Wie lange nach Beginn deiner Symptome hast du angefangen, antivirale Medikamente zu nehmen?"],
            ["fr", "Combien de temps après le début de vos symptômes avez-vous commencé à prendre des médicaments antiviraux ?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q9Key, [responseGroupKey, multipleChoiceKey].join('.'), '3')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Antivirals are thought to be most effective if taken quickly after disease onset."],
                    ["de", "Antivirale Medikamente gelten als am effektivsten, wenn Sie kurz nach Beginn der Krankheit eingenommen werden."],
                    ["fr", "Les antiviraux sont supposés être plus efficace si pris rapidement après l'apparition de la maladie ."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Report the time until  you first started taking antivirals (which may not be the same day as you got your prescription)."],
                    ["de", "Geben Sie die Zeit an, nach der Sie das erste Mal angefangen haben, antivirale Medikamente zu nehmen (was möglicherweise nicht der selbe Tag ist, an dem Sie Ihnen verschrieben wurden)."],
                    ["fr", "Signaler le temps écoulé jusqu'à ce que vous ayez commencé à prendre des antiviraux (qui peut ne pas être le même jour que celui ou vous avez obtenu votre prescription)."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Same day (within 24 hours)"],
                ["de", "Am selben Tag (innerhalb von 24 Stunden)"],
                ["fr", "Le jour même (dans les 24 heures)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "1 day"],
                ["de", "1 Tag"],
                ["fr", "1 jour"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "2 days"],
                ["de", "2 Tage"],
                ["fr", "2 jours"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "3 days"],
                ["de", "3 Tage"],
                ["fr", "3 jours"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "4 days"],
                ["de", "4 Tage"],
                ["fr", "4 jours"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "5-7 days"],
                ["de", "5-7 Tage"],
                ["fr", "5 – 7 jours"],
            ])
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["en", "More than 7 days"],
                ["de", "Mehr als 7 Tage"],
                ["fr", "Plus de 7 jours"],
            ])
        }, {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q14_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, were you hospitalized?"],
            ["de", "Wurdest du wegen deiner Symptome ins Krankenhaus eingeliefert?"],
            ["fr", "Avez-vous été hospitalisé à cause des symptômes que vous rapportez aujourd’hui ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you change your daily routine because of your illness?"],
            ["de", "Hast du aufgrund deiner Krankheit deinen Tagesablauf geändert?"],
            ["fr", "Avez-vous changé votre routine quotidienne en raison de votre maladie ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Antivirals are thought to be most effective if taken quickly after disease onset."],
                    ["de", "Antivirale Medikamente gelten als am effektivsten, wenn Sie kurz nach Beginn der Krankheit eingenommen werden."],
                    ["fr", "Les antiviraux sont supposés être plus efficace si pris rapidement après l'apparition de la maladie ."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Report the time until  you first started taking antivirals (which may not be the same day as you got your prescription)."],
                    ["de", "Geben Sie die Zeit an, nach der Sie das erste Mal angefangen haben, antivirale Medikamente zu nehmen (was möglicherweise nicht der selbe Tag ist, an dem Sie Ihnen verschrieben wurden)."],
                    ["fr", "Signaler le temps écoulé jusqu'à ce que vous ayez commencé à prendre des antiviraux (qui peut ne pas être le même jour que celui ou vous avez obtenu votre prescription)."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, but I did not take time off work/school"],
                ["de", "Ja, aber ich habe mich nicht von der Arbeit/ Schule abgemeldet"],
                ["fr", "Oui, mais je n'ai pas pris congé au travail / à l'école"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, I took time off work/school"],
                ["de", "Ja, ich habe mich von der Schule/Arbeit abgemeldet"],
                ["fr", "Oui, j'ai pris congé au travail / à l'école"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q10b_def = (itemSkeleton: SurveyItem, q10Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Are you still off work/school?"],
            ["de", "Bist du immer noch von der Arbeit/ Schule abgemeldet?"],
            ["fr", "Êtes-vous toujours en arrêt maladie ?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q10Key, [responseGroupKey, singleChoiceKey].join('.'), '2')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To estimate the average  amount of time that people take off work, we need to know if people are still off work."],
                    ["de", "Um die durchschnittliche Zeit abzuschätzen, für die sich Menschen von der Schule/ Arbeit abmelden, müssen wir wissen, ob sie immer noch abwesend sind."],
                    ["fr", "Afin d'estimer le temps moyen que les gens passent en arrêt de travail."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick “yes” if you would be at work/school today if you were not currently ill."],
                    ["de", "Wählen Sie „Ja“, wenn Sie heute in der Arbeit/ Schule wären, wenn Sie nicht gerade krank wären."],
                    ["fr", "Cochez «oui» si vous vous seriez rendu au travail / à l'école aujourd'hui si vous n'étiez pas actuellement malade."],
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
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Other (e.g. I wouldn’t usually be at work/school today anyway)"],
                ["de", "Andere (z.B. Ich wäre jetzt sowieso nicht in der Arbeit/Schule)"],
                ["fr", "Autre (p. ex «Je ne me serais de toute façon pas rendu au travail / à l'école aujourd'hui»)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q10c_def = (itemSkeleton: SurveyItem, q10Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How long have you been off work/school?"],
            ["de", "Wie lange bist du schon von der Arbeit/ Schule abwesend?"],
            ["fr", "Combien de temps avez-vous été absent du travail / de l'école ?"],
        ]))
    );


    editor.setCondition(
        expWithArgs('responseHasKeysAny', q10Key, [responseGroupKey, singleChoiceKey].join('.'), '2')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To measure the effect of symptoms on people’s daily lives."],
                    ["de", "Um zu sehen, wie die Krankheitssymptome das tägliche Leben von Menschen beeinflussen."],
                    ["fr", "Afin de mesurer l'effet des symptômes sur la vie quotidienne des gens."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only count the days that you normally would have been in school or work (e.g. don’t count weekends)."],
                    ["de", "Zählen Sie nur die Tage, die Sie normalerweise in der Arbeit/ Schule gewesen wären (zählen sie z.B. keine Wochenenden)."],
                    ["fr", "Ne comptez que les jours durant lesquels vous seriez normalement allé à l'école ou au travail (par exemple, ne comptez pas le week-end)."],
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
                ["en", "1 day"],
                ["de", "1 Tag"],
                ["fr", "1 jour"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "2 days"],
                ["de", "2 Tage"],
                ["fr", "2 jours"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "3 days"],
                ["de", "3 Tage"],
                ["fr", "3 jours"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "4 days"],
                ["de", "4 Tage"],
                ["fr", "4 jours"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "5 days"],
                ["de", "5 Tage"],
                ["fr", "5 jours"],
            ])
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["en", "6 to 10 days"],
                ["de", "6 bis 10 Tage"],
                ["fr", "6 à 10 jours"],
            ])
        }, {
            key: '7', role: 'option',
            content: new Map([
                ["en", "11 to 15 days"],
                ["de", "11 bis 15 Tage"],
                ["fr", "11 à 15 jours"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "More than 15 days"],
                ["de", "Mehr als 15 Tage"],
                ["fr", "Plus de 15 jours"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov6_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you wear a mask (surgical mask sold in pharmacies)?"],
            ["de", "Hast du aufgrund deiner Symptome eine Maske (chirurgische Maske, die in Apotheken verkauft wird) getragen?"],
            ["fr", "En raison de vos symptômes, avez-vous porté un masque (masque chirurgical en vente en pharmacie, ou masque FFP1, FFP2, FFP3)) ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "No, I would have liked but could not find any"],
                ["de", "Nein, ich hätte gerne, konnte aber keine finden."],
                ["fr", "Non, j’aurais aimé mais je n’ai pas réussi à en trouver"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov7_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, have you taken or strengthened one or more of the following measures?"],
            ["de", "Hast du aufgrund deiner Symptome eine oder mehrere der folgenden Massnahmen ergriffen oder verstärkt?"],
            ["fr", "En raison de vos symptômes, avez-vous adopté ou renforcé une ou plusieurs des mesure(s) suivante(s) ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Regularly wash or disinfect hands"],
                ["de", "regelmässiges Waschen oder Desinfizieren der Hände"],
                ["fr", "Vous laver ou désinfecter les mains régulièrement"],
            ])
        }, {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Use a disposable tissue"],
                ["de", "Verwendung eines Taschentuchs"],
                ["fr", "Utiliser un mouchoir à usage unique"],
            ])
        }, {
            key: '3',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Cough or sneeze into your elbow"],
                ["de", "in den Ellenbogen husten oder niesen"],
                ["fr", "Tousser ou éternuer dans votre coude"],
            ])
        }, {
            key: '4',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Wear a disposable mask"],
                ["de", "Tragen einer Einwegmaske"],
                ["fr", "Porter un masque jetable"],
            ])
        },
        {
            key: '5',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid shaking hands"],
                ["de", "Vermeiden von Händeschütteln"],
                ["fr", "Eviter de serrer les mains"],
            ])
        },
        {
            key: '11',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Stop greeting by hugging and/or kissing on both cheeks"],
                ["de", "durch Umarmen und/oder Küssen zu grüssen aufgehört"],
                ["fr", "Eviter de faire la bise et/ou serrer les gens dans vos bras"],
            ])
        },
        {
            key: '6',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Limit your use of public transport"],
                ["de", "Ihre Nutzung der öffentlichen Verkehrsmittel eingeschränkt"],
                ["fr", "Limiter votre utilisation des transports en commun"],
            ])
        },
        {
            key: '7',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid gatherings (going to the theater, cinema, stadium, supermarket, etc.)"],
                ["de", "Vermeiden von Versammlungen (Ausflüge ins Theater, Kino, Stadion, in den Supermarkt usw.)"],
                ["fr", "Eviter les rassemblements (sortie au théâtre, au cinéma, au stade, au supermarché …)"],
            ])
        },
        {
            key: '8',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Stay at home"],
                ["de", "zu Hause bleiben"],
                ["fr", "Rester chez vous"],
            ])
        },
        {
            key: '9',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Telework or increase your number of telework days"],
                ["de", "Telearbeit oder Erhöhung der Anzahl von Telearbeitstagen"],
                ["fr", "Télétravailler ou augmenter votre nombre de jours de télétravail"],
            ])
        },
        {
            key: '10',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid travel outside your own country or region"],
                ["de", "Vermeiden der Reisen ausserhalb Ihres eigenen Landes oder Ihrer Region"],
                ["fr", "Eviter de voyager à l'extérieur de votre pays ou région"],
            ])
        },
        {
            key: '13',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Have your food-shopping delivered by a store or a friend/family member"],
                ["de", "sich Ihre Einkäufe von einem Laden oder einem Freund/Familienmitglied liefern gelassen"],
                ["fr", "Vous faire livrer vos courses par un magasin ou un ami/membre de la famille"],
            ])
        },
        {
            key: '14',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid seeing friends and family"],
                ["de", "Freunde und Familie vermieden zu sehen"],
                ["fr", "Eviter de voir vos amis et famille"],
            ])
        }, {
            key: '15',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid being in contact with people over 65 years or with a chronic disease"],
                ["de", "Den Kontakt mit Menschen über 65 Jahre oder mit einer chronischen Krankheit vermieden"],
                ["fr", "Eviter le contact avec des personnes de plus de 65 ans ou avec une maladie chronique"],
            ])
        },
        {
            key: '16',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid being in contact with children"],
                ["de", "Den Kontakt mit Kindern vermieden"],
                ["fr", "Eviter le contact avec les enfants"],
            ])
        },
        {
            key: '12',
            role: 'option',
            content: new Map([
                ["en", "None of these measures"],
                ["de", "Keine dieser Massnahmen"],
                ["fr", "Aucune de ces mesures"],
            ])
        },

    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q11_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What do you think is causing your symptoms?"],
            ["de", "Was hälst du für die Ursache deiner Symptome?"],
            ["fr", "Quelle est selon vous l'origine de vos symptômes ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To help find out if our assessment of your illness based on your symptoms matches what you believe to be the cause. You might have a better idea of what is causing your illness than our computer algorithms."],
                    ["de", "Um herauszufinden, ob Ihre Einschätzung der Ursache mit der tatsächlichen Ursache übereinstimmt. Sie könnten eine bessere Vorstellung der Ursache haben, als unsere Computeralgorithmen."],
                    ["fr", "Pour nous aider à trouver si notre évaluation de votre maladie en fonction de vos symptômes correspond à ce que vous croyez en être la cause. Vous pourriez avoir une meilleure idée de ce qui est la cause de votre maladie que nos algorithmes informatiques ."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "If you are reasonably sure about what is causing your symptoms, please tick the appropriate box. Otherwise, please tick “I don’t know”."],
                    ["de", "Falls Sie sich sicher genug sind, was die Ursache Ihrer Symptome ist, wählen Sie die entsprechenden Option. Wählen Sie ansonsten „Ich weiss nicht“."],
                    ["fr", "Si vous êtes raisonnablement sûr de ce qui est la cause de vos symptômes, s'il vous plaît cochez la case appropriée. Sinon, cochez la case «Je ne sais pas»."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Flu or flu-like illness"],
                ["de", "Grippe oder grippeähnliche Krankheit"],
                ["fr", " Grippe ou syndrome pseudo-grippal"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Common cold"],
                ["de", "Gewöhnliche Erkältung"],
                ["fr", "Rhume / refroidissement"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Allergy/hay fever"],
                ["de", "Allergie/ Heuschnupfen"],
                ["fr", " Allergie / rhume des foins"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Ashtma"],
                ["de", "Asthma"],
                ["fr", "Asthme"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Gastroenteritis/gastric flu"],
                ["de", "Magen-Darm-Grippe"],
                ["fr", "Gastro-entérite / grippe intestinale"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "New coronavirus (Covid-19)"],
                ["de", "Neues Coronavirus (Covid-19)"],
                ["fr", "Nouveau coronavirus (Covid-19)"],
            ])
        }, {
            key: '4', role: 'input',
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
                ["fr", "Autre"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov9_def = (itemSkeleton: SurveyItem, q11Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "For which reason(s) do you think you have this disease?"],
            ["de", "Warum glaubst du, dass du diese Krankheit hast?"],
            ["fr", "Pour quelle(s) raison(s) pensez-vous avoir cette maladie ?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q11Key, [responseGroupKey, singleChoiceKey].join('.'), '9')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "My doctor told me I have this disease"],
                ["de", "Mein Arzt hat mir gesagt, dass ich diese Krankheit habe "],
                ["fr", "Mon médecin m’a dit qu’il s’agissait de cette maladie "],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "I had a laboratory confirmation that I have this disease"],
                ["de", "Die Krankheit wurde durch Labortests bestätigt "],
                ["fr", "J’ai fait des analyses en laboratoire qui ont confirmé que j’ai cette maladie "],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "I had direct contact with a laboratory confirmed case"],
                ["de", "Ich hatte direkten Kontakt mit einem im Labor bestätigten Fall "],
                ["fr", "J’ai été en contact direct avec un cas confirmé en laboratoire"],
            ])
        },
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "I had close contact with someone for whom a doctor diagnosed this disease"],
                ["de", "Ich hatte engen Kontakt zu jemandem, bei dem ein Arzt diese Krankheit diagnostiziert hat"],
                ["fr", "J’ai été en contact étroit avec une personne pour laquelle le médecin a diagnostiqué cette maladie"],
            ])
        },
        {
            key: '5',
            role: 'option',
            content: new Map([
                ["en", "I was in close contact with someone presenting symptoms of this disease"],
                ["de", "Ich war in engem Kontakt mit jemandem, der Symptome dieser Krankheit zeigt"],
                ["fr", "J’ai été en contact étroit avec une personne présentant des symptômes de cette maladie"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "I was at an event/location with a confirmed case"],
                ["de", "Ich war bei einer Veranstaltung/einem Ort mit einem bestätigten Fall"],
                ["fr", "J’ai été dans un lieu ou à un évènement où s’est rendu un cas confirmé "],
            ])
        },
        {
            key: '7',
            role: 'option',
            content: new Map([
                ["en", "I think I have this disease"],
                ["de", "Ich glaube, ich habe diese Krankheit "],
                ["fr", "J’ai l’impression d’avoir cette maladie "],
            ])
        },

    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov9b_def = (itemSkeleton: SurveyItem, q11Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Have you informed people who have been in close contact with you about your suspicion of COVID-19 infection?"],
            ["de", "Hast du Personen, die mit dir in engem Kontakt waren, über deinen Verdacht auf eine COVID-19-Infektion informiert?"],
            ["fr", "Avez-vous informé les personnes avec qui vous avez eu un contact rapproché de votre suspicion de COVID-19 ?"],
        ]))
    );


    editor.setCondition(
        expWithArgs('responseHasKeysAny', q11Key, [responseGroupKey, singleChoiceKey].join('.'), '9')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "Some of them"],
                ["de", "Einige von ihnen "],
                ["fr", "Quelques personnes, pas toutes"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you currently carry out a professional activity?"],
            ["de", "Führst du zurzeit eine berufliche Tätigkeit aus?"],
            ["fr", "Exercez-vous une activité professionnelle ? "],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);


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

const qcov11_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Over recent days, at which frequency did you go out of home to buy products, on average?"],
            ["de", "Wie oft hast du in den letzten Tagen im Durchschnitt deine Wohnung verlassen, um Waren zu kaufen?"],
            ["fr", "Durant ces derniers jours, à quelle fréquence êtes-vous sorti de la maison pour acheter des produits, en moyenne ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "I do not go out of home anymore"],
                ["de", "Ich gehe nicht mehr aus dem Haus "],
                ["fr", "Je ne sors plus de la maison"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "Less than once a week"],
                ["de", "Weniger als einmal pro Woche "],
                ["fr", "Moins d'une fois par semaine"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "Once a week"],
                ["de", "Einmal wöchentlich "],
                ["fr", "Une fois par semaine"],
            ])
        },
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "2 to 6 times a week"],
                ["de", "2 bis 6 Mal pro Woche "],
                ["fr", "2 à 6 fois par semaine"],
            ])
        },
        {
            key: '5',
            role: 'option',
            content: new Map([
                ["en", "Once a day"],
                ["de", "Einmal täglich "],
                ["fr", "Une fois par jour"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "Several times per day"],
                ["de", "Mehrmals am Tag "],
                ["fr", "Plusieurs fois par jour"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov12_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Over recent days, at which frequency did you go out of home to get fresh air or exercise (outside your home, balcony, garden, private courtyard), on average?"],
            ["de", "Wie oft bist du in den letzten Tagen durchschnittlich aus dem Haus gegangen, um frische Luft zu schnappen oder sich zu bewegen?"],
            ["fr", "Durant ces derniers jours, à quelle fréquence êtes vous sorti, en moyenne, pour prendre l'air ou faire de l'exercice (en dehors de votre maison, balcon, jardin ou terrain privé) ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "I do not go out of home anymore"],
                ["de", "Ich gehe nicht mehr aus dem Haus "],
                ["fr", "Je ne sors plus de la maison"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "Less than once a week"],
                ["de", "Weniger als einmal pro Woche "],
                ["fr", "Moins d'une fois par semaine"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "Once a week"],
                ["de", "Einmal wöchentlich "],
                ["fr", "Une fois par semaine"],
            ])
        },
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "2 to 6 times a week"],
                ["de", "2 bis 6 Mal pro Woche "],
                ["fr", "2 à 6 fois par semaine"],
            ])
        },
        {
            key: '5',
            role: 'option',
            content: new Map([
                ["en", "Once a day"],
                ["de", "Einmal täglich "],
                ["fr", "Une fois par jour"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "Several times per day"],
                ["de", "Mehrmals am Tag "],
                ["fr", "Plusieurs fois par jour"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov13_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Over the course of yesterday, how many people (outside your household) did you approach at a distance lower than 1 meter?"],
            ["de", "Wie viele Personen (ausserhalb deines Haushalts) hast du dich im Laufe des gestrigen Tages aus einer Entfernung von weniger als 1 Meter angenähert?"],
            ["fr", "Durant la journée d'hier, avec combien de personnes (en dehors de votre foyer) avez vous été en contact à moins d'un mètre ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "0"],
                ["de", "0"],
                ["fr", "0"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "1"],
                ["de", "1"],
                ["fr", "1"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "2 to 5"],
                ["de", "2 bis 5"],
                ["fr", "2 à 5"],
            ])
        },
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "6 to 10"],
                ["de", "6 bis 10"],
                ["fr", "6 à 10"],
            ])
        },
        {
            key: '99',
            role: 'option',
            content: new Map([
                ["en", "More than 10"],
                ["de", "Merh als 10"],
                ["fr", "Plus de 10"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov14_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "If lockdown measures were lifted up, but collective childcare / schools / university were closed, what would be your situation?"],
            ["de", "Wenn die Sperrmassnahmen aufgehoben würden, aber kollektive Kinderbetreuungseinrichtungen / Schulen/Universitäten geschlossen würden, wie würde deine Situation aussehen?"],
            ["fr", "Si les mesures de confinement étaient levées, mais les garderies / crèches / écoles/universités étaient fermées, quelle serait votre situation ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "I would work from home"],
                ["de", "Ich würde von zu Hause aus arbeiten "],
                ["fr", "Je travaillerais depuis mon domicile"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "I would work outside from home"],
                ["de", "Ich würde ausserhalb von zu Hause arbeiten "],
                ["fr", "Je travaillerais hors de mon domicile"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "I would have a leave of absence to take care of my kid(s)"],
                ["de", "Ich hätte eine Arbeitsbefreiung, um mich um mein(e) Kind(er) zu kümmern "],
                ["fr", "Je serais en congé pour pouvoir m'occuper de mes enfants"],
            ])
        },
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "I would have a sick leave (because of Covid-19)"],
                ["de", "Ich wäre krankgeschrieben (wegen Covid-19) "],
                ["fr", "Je serais en congé-maladie (en raison du COVID-19)"],
            ])
        },
        {
            key: '5',
            role: 'option',
            content: new Map([
                ["en", "I would be in another situation (retired, job-seeker, student, house-wife/husband, other sick-leave, partial unemployment, forced leave…)"],
                ["de", "Ich befände mich in einer anderen Situation (Rentner, Arbeitssuchender, Student, Hausfrau/-mann, andere krankheitsbedingte Abwesenheit...) "],
                ["fr", "Je serais dans une autre situation (retraité, au chômage, étudiant, femme/homme au foyer, congé-maladie pour une autre raison, au chomâge partiel, ...)"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "I don’t know"],
                ["de", "Ich weiss es nicht"],
                ["fr", "Je ne sais pas"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov14b_def = (itemSkeleton: SurveyItem, qcov14Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How many days a week would you work outside from home?"],
            ["de", "Wie viele Tage pro Woche würdest du ausserhalb von zu Hause arbeiten?"],
            ["fr", "Combien de jours par semaine travailleriez-vous hors de votre domicile ?"],
        ]))
    );


    editor.setCondition(
        expWithArgs('responseHasKeysAny', qcov14Key, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSliderCategoricalGroup(sliderCategoricalKey, [
        {
            key: '0',
            role: 'option',
            content: new Map([
                ["en", "0"],
                ["de", "0"],
                ["fr", "0"],
            ])
        },
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "1"],
                ["de", "1"],
                ["fr", "1"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "2"],
                ["de", "2"],
                ["fr", "2"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "3"],
                ["de", "3"],
                ["fr", "3"],
            ])
        },
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "4"],
                ["de", "4"],
                ["fr", "4"],
            ])
        },
        {
            key: '5',
            role: 'option',
            content: new Map([
                ["en", "5"],
                ["de", "5"],
                ["fr", "5"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "6"],
                ["de", "6"],
                ["fr", "6"],
            ])
        },
        {
            key: '7',
            role: 'option',
            content: new Map([
                ["en", "7"],
                ["de", "7"],
                ["fr", "7"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov15_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "If lockdown measures were extended (that is to say, continued beyond the date announced by the government), do you think you would follow the recommendations with as much rigour as you do now?"],
            ["de", "Falls die Sperrmassnahmen über das von der Regierung angekundigte Datum hinaus verlängert würden, glaubst du, dass du die Empfehlungen mit gleicher Disziplin weiter verfolgen würdest?"],
            ["fr", "Si les mesures de confinement étaient prolongées (c'est-à-dire au-delà de la date annoncée par le gouvernement), pensez-vous que vous suivriez les recommandations avec autant de rigueur qu'actuellement ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "Yes, absolutely"],
                ["de", "Ja, absolut"],
                ["fr", "Oui, absolument"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "Yes, moderately"],
                ["de", "Ja, mässig"],
                ["fr", "Oui, plus ou moins"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "No, not really"],
                ["de", "Nein, nicht wirklich"],
                ["fr", "Non, pas vraiment"],
            ])
        },
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "No, not at all"],
                ["de", "Nein, überhaupt nicht"],
                ["fr", "Non, pas du tout"],
            ])
        },
        {
            key: '99',
            role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss nicht"],
                ["fr", "Je ne sais pas"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}
