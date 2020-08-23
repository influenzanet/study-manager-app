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

export const generateNLWeekly = (): Survey | undefined => {
    const surveyKey = 'weekly';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["de", "Wie geht es Dir?"],
            ["nl", "Wekelijkse vragenlijst"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Survey about your health status in the last week."],
            ["de", "Ein Fragebogen über Deinen Gesundheitszustand."],
            ["nl", "Vragenlijst over uw klachten in de afgelopen week. Meld alstublieft ook als u geen klachten had."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "15 seconds to 3 minutes, depending on your symptoms."],
            ["de", "3 Min."],
            ["nl", "Invullen duurt 15 seconden tot 3 minuten, afhanklijk van uw klachten."],
        ])
    ));

    const rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());

    const rootKey = rootItemEditor.getItem().key;



    // Test results yes/no
    const q1aNL = survey.addNewSurveyItem({ itemKey: 'Q1aNL' }, rootKey);
    if (!q1aNL) { return; }
    survey.updateSurveyItem(q1aNL_def(q1aNL));
    // ---------------------------------------------------------

    // Test results positive/negative
    const q1bNL = survey.addNewSurveyItem({ itemKey: 'Q1bNL' }, rootKey);
    if (!q1bNL) { return; }
    survey.updateSurveyItem(q1bNL_def(q1bNL, q1aNL.key));
    // ---------------------------------------------------------

    // Test PCR how long after symptoms
    const q1cNL = survey.addNewSurveyItem({ itemKey: 'Q1cNL' }, rootKey);
    if (!q1cNL) { return; }
    survey.updateSurveyItem(q1cNL_def(q1cNL, q1aNL.key));
    // ---------------------------------------------------------

    // Test SERO date
    const q1dNL = survey.addNewSurveyItem({ itemKey: 'Q1dNL' }, rootKey);
    if (!q1dNL) { return; }
    survey.updateSurveyItem(q1dNL_def(q1dNL, q1aNL.key));
    // ---------------------------------------------------------

    // Test results positive/negative
    const q1eNL = survey.addNewSurveyItem({ itemKey: 'Q1eNL' }, rootKey);
    if (!q1eNL) { return; }
    survey.updateSurveyItem(q1eNL_def(q1eNL, q1aNL.key));
    // ---------------------------------------------------------


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

    const anySymptomSelected = expWithArgs('responseHasOnlyKeysOtherThan', [q1Key, '1'].join('.'), [responseGroupKey, multipleChoiceKey].join('.'), '0');




    survey.addNewSurveyItem({ itemKey: 'pb1', type: 'pageBreak' }, rootKey);

    // -------> HAS SYMPTOMS GROUP
    const hasSymptomGroup = survey.addNewSurveyItem({ itemKey: 'HS', isGroup: true }, rootKey);
    const hasSymptomGroupEditor = new ItemEditor(hasSymptomGroup as SurveyGroupItem);
    hasSymptomGroupEditor.setSelectionMethod({ name: 'sequential' });
    hasSymptomGroupEditor.setCondition(anySymptomSelected)
    survey.updateSurveyItem(hasSymptomGroupEditor.getItem());

    const hasSymptomGroupKey = hasSymptomGroupEditor.getItem().key;

    survey.addNewSurveyItem({ itemKey: 'pbQ3', type: 'pageBreak' }, hasSymptomGroupKey);

    // Q3 when first symptoms --------------------------------------
    const q3 = survey.addNewSurveyItem({ itemKey: 'Q3' }, hasSymptomGroupKey);
    if (!q3) { return; }
    survey.updateSurveyItem(q3_def(q3));
    // -----------------------------------------

    // Q4 when symptoms end --------------------------------------
    const q4 = survey.addNewSurveyItem({ itemKey: 'Q4' }, hasSymptomGroupKey);
    if (!q4) { return; }
    survey.updateSurveyItem(q4_def(q4, q3.key));
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
    //const q8 = survey.addNewSurveyItem({ itemKey: 'Q8' }, contactGroupKey);
    //if (!q8) { return; }
    //survey.updateSurveyItem(q8_def(q8));
    // -----------------------------------------

    // Q8b how soon contacted medical service --------------------------------------
    //const q8b = survey.addNewSurveyItem({ itemKey: 'Q8b' }, contactGroupKey);
    //if (!q8b) { return; }
    //survey.updateSurveyItem(q8b_def(q8b, q8.key));
    // -----------------------------------------

    // test serological result --------------------------------------
    //const qcov16c = survey.addNewSurveyItem({ itemKey: 'Qcov16c' }, hasSymptomGroupKey);
    //if (!qcov16c) { return; }
    //survey.updateSurveyItem(qcov16c_def(qcov16c, qcov16.key));
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
    // const q14 = survey.addNewSurveyItem({ itemKey: 'Q14' }, hasSymptomGroupKey);
    // if (!q14) { return; }
    // survey.updateSurveyItem(q14_def(q14));
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

    survey.addNewSurveyItem({ itemKey: 'pbCause', type: 'pageBreak' }, rootKey);

    // Q11 think cause of symptoms --------------------------------------
    const q11 = survey.addNewSurveyItem({ itemKey: 'Q11' }, hasSymptomGroupKey);
    if (!q11) { return; }
    survey.updateSurveyItem(q11_def(q11));
    // -----------------------------------------

    //q1aNL_def

    // Qcov9 think reasons having disease --------------------------------------
    //const qcov9 = survey.addNewSurveyItem({ itemKey: 'Qcov9' }, hasSymptomGroupKey);
    //if (!qcov9) { return; }
    //survey.updateSurveyItem(qcov9_def(qcov9, q11.key));
    // -----------------------------------------

    // Qcov9b informed contacts about suspicion COVID-19b infection --------------------------------------
    //const qcov9b = survey.addNewSurveyItem({ itemKey: 'Qcov9b' }, hasSymptomGroupKey);
    //if (!qcov9b) { return; }
    //survey.updateSurveyItem(qcov9b_def(qcov9b, q11.key));
    // -----------------------------------------

    // <------- HAS SYMPTOMS GROUP

    //survey.addNewSurveyItem({ itemKey: 'pbBehave', type: 'pageBreak' }, rootKey);
    // Qcov10 lockdown professional activity --------------------------------------
    //const qcov10 = survey.addNewSurveyItem({ itemKey: 'Qcov10' }, rootKey);
    //if (!qcov10) { return; }
    //survey.updateSurveyItem(qcov10_def(qcov10));
    // -----------------------------------------

    // Qcov11 frequency go out to buy products --------------------------------------
    //const qcov11 = survey.addNewSurveyItem({ itemKey: 'Qcov11' }, rootKey);
    //if (!qcov11) { return; }
    //survey.updateSurveyItem(qcov11_def(qcov11));
    // -----------------------------------------

    // Qcov12 frequency go out for fresh air or exercise --------------------------------------
    //const qcov12 = survey.addNewSurveyItem({ itemKey: 'Qcov12' }, rootKey);
    //if (!qcov12) { return; }
    //survey.updateSurveyItem(qcov12_def(qcov12));
    // -----------------------------------------

    // Qcov13 how many people nearer then 1 meter --------------------------------------
    //const qcov13 = survey.addNewSurveyItem({ itemKey: 'Qcov13' }, rootKey);
    //if (!qcov13) { return; }
    //survey.updateSurveyItem(qcov13_def(qcov13));
    // -----------------------------------------

    //survey.addNewSurveyItem({ itemKey: 'pbLockdown', type: 'pageBreak' }, rootKey);
    // Qcov14 situation if lockdown lifted, but childcare/schools closed --------------------------------------
    //const qcov14 = survey.addNewSurveyItem({ itemKey: 'Qcov14' }, rootKey);
    //if (!qcov14) { return; }
    //survey.updateSurveyItem(qcov14_def(qcov14));
    // -----------------------------------------

    // Qcov14b days work outside from home --------------------------------------
    //const qcov14b = survey.addNewSurveyItem({ itemKey: 'Qcov14b' }, rootKey);
    //if (!qcov14b) { return; }
    //survey.updateSurveyItem(qcov14b_def(qcov14b, qcov14.key));
    // -----------------------------------------

    // Qcov15 lockdown extended, would follow --------------------------------------
    //const qcov15 = survey.addNewSurveyItem({ itemKey: 'Qcov15' }, rootKey);
    //if (!qcov15) { return; }
    //survey.updateSurveyItem(qcov15_def(qcov15));
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
                ["en", "Please choose if you had any of the following symptoms since your last survey."],
                ["de", "Hast du irgendwelche der folgenden Symptome seit dem letzten Fragebogen?"],
                ["nl", "Geef alstublieft aan of u geen of tenminste één van de volgende klachten heeft gehad in de afgelopen week"],
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
                ["en", "This was all for now, please submit your responses. By filling out this survey regularly (eg. weekly), you can help us fight the virus."],
                ["de", "Das war die letzte Frage. Du kannst deine Antworten nun absenden. Mit regelmäßiger Teilnahme (z.B. wöchentlich) an dieser Umfrage unterstützt Du Mediziner und Epidemiologen bei ihrer Arbeit. Danke!"],
                ["nl", "Dit was de laatste vraag. Sla nu uw antwoorden op. Dank voor het invullen. Volgende week vragen we u weer."],
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
            ["de", "Allgemeine Symptome"],
            ["nl", "Had u in de afgelopen week geen, één of meerdere van deze klachten?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine allgemeinen Symptome"],
                ["nl", "Nee, geen van deze klachten"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Fever"],
                ["de", "Fieber"],
                ["nl", "Koorts"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chills"],
                ["de", "Schüttelfrost"],
                ["nl", "Koude rillingen"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Runny or blocked nose"],
                ["de", "Laufende oder verstopfte Nase"],
                ["nl", "Loopneus of verstopte neus"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sneezing"],
                ["de", "Niesen"],
                ['nl', "Niezen"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sore throat"],
                ["de", "Halsweh"],
                ["nl", "Zere keel"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Cough"],
                ["de", "Husten"],
                ["nl", "Hoesten"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Shortness of breath"],
                ["de", "Atemnot"],
                ["nl", "Kortademig (snel buiten adem)"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Headache"],
                ["de", "Kopfschmerzen"],
                ["nl", "Hoofdpijn"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Muscle/joint pain"],
                ["de", "Muskel- oder Gelenkschmerzen"],
                ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chest pain"],
                ["de", "Schmerzen in der Brust"],
                ["nl", "Pijn op de borst"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Feeling tired or exhausted (malaise)"],
                ["de", "Müdigkeit oder Erschöpfung"],
                ["nl", "Vermoeid en lamlendig (algehele malaise)"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of appetite"],
                ["de", "Appetitlosigkeit"],
                ["nl", "Verminderde eetlust"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Coloured sputum/phlegm"],
                ["de", "Farbiger Auswurf/Schleim"],
                ["nl", "Verkleurd slijm"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Watery, bloodshot eyes"],
                ["de", "tränende, blutunterlaufene Augen"],
                ["nl", "Waterige of bloeddoorlopen ogen"],
            ])
        },
        {
            key: '15', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nausea"],
                ["de", "Übelkeit"],
                ["nl", "Misselijkheid"],
            ])
        },
        {
            key: '16', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Vomiting"],
                ["de", "Erbrechen"],
                ["nl", "Overgeven"],
            ])
        },
        {
            key: '17', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diarrhoea"],
                ["de", "Durchfall"],
                ["nl", "Diarree"],
            ])
        },
        {
            key: '18', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Stomach ache"],
                ["de", "Bauchschmerzen"],
                ["nl", "Buikpijn"],
            ])
        },
        {
            key: '19', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of smell"],
                ["de", "Geruchsverlust"],
                ["nl", "Geen reuk en/of smaak"],
            ])
        },



    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}



const q2_def = (itemSkeleton: SurveyItem, anySymptomSelected: Expression): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "On your last visit, you reported that you were still ill. Are the symptoms you report today part of the same bout of illness?"],
            ["de", "Bei Ihrem letzten Besuch haben Sie angegeben, noch krank zu sein. Sind die Symptome, die Sie heute berichten, Teil des gleichen Krankheitsschubs?"],
            ["nl", "In uw laatste vragenlijst gaf u aan nog steeds klachten te hebben. Behoren de klachten die u nu meldt tot dezelfde klachtenperiode als de klachten die u de vorige keer al gemeld heeft?"],
            ["fr", "Lors de votre dernière visite, vous aviez déclaré être toujours malade. Est-ce que les symptômes que vous rapportez aujourd'hui font partie du même épisode de maladie?"],
        ]))
    );
    editor.setCondition(anySymptomSelected);
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To make filling out the rest of the survey quicker for you."],
                    ["de", "Um das Ausfüllen des restlichen Fragebogens für Sie schneller zu gestalten."],
                    ["nl", "Om te bepalen of uw klachten worden veroorzaakt door (mogelijk) een nieuwe of dezelfde infectie als de vorige keer."],
                    ["fr", "Afin que vous puissiez remplir le reste de l'enquête plus rapidement."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "If you believe that the symptoms you have reported today are caused by the same bout of illness as your previous symptoms, please tick “yes”."],
                    ["de", "Falls Sie denken, dass die Symptome, die Sie heute angeben, vom selben Krankheitsschub stammen wie Ihre vorherigen, wählen Sie bitte „Ja“. Um Ihre Zeit zu sparen, haben wir die Informationen, die Sie uns letztes Mal gegeben haben, bereits eingetragen. Bitte prüfen Sie, ob diese noch richtig sind und machen sie gegebenenfalls Änderungen (z.B falls Sie einen Arzt besucht oder Sie sich zusätzliche Zeit von der Arbeit abgemeldet haben, seit Sie das letzte Mal den Fragebogen ausgefüllt haben)."],
                    ["nl", "Als u denkt dat de klachten die u vandaag raporteert nog worden veroorzaakt door dezelfde infectie/probleem (dezelfde klachten periode), beantwoord dan de vraag met 'Ja'"],
                    ["fr", "Si vous pensez que les symptômes que vous avez déclarés aujourd'hui sont causés par le même épisode de maladie que vos symptômes précédents, s'il vous plaît cochez «oui» . Pour gagner du temps, nous avons rempli les informations que vous nous avez déjà fournies sur votre maladie.  S'il vous plaît, vérifiez qu'elles sont toujours correctes ou faites les modifications nécessaires si, par exemple, vous avez consulté un médecin ou pris plus de temps hors travail depuis la dernière fois que vous avez répondu au questionnaire."],
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
                ["en", "Yes"],
                ["de", "Ja"],
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss nicht bzw. ich kann mich nicht erinnern"],
                ["nl", "Ik weet het niet (meer)."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
            ["nl", "Op welke dag kwamen de eerste klachten opzetten? Als u de datum niet precies meer weet, kies dan een geschatte datum"],
            ["fr", " Quand les premiers symptômes sont-ils apparus?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To help us work out the number of cases that arise each day."],
                    ["de", "Du hilfst uns damit, die täglich hinzukommenden Fälle zu bestimmen."],
                    ["nl", "Dit helpt ons vast te stellen hoeveel mensen er klachten krijgen per dag."],
                    ["fr", "Pour nous aider à travailler sur le nombre de cas de grippe qui se déclarent chaque jour."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte gib Deine Schätzung so genau wie möglich an."],
                    ["nl", "Wees alstublieft zo nauwkeurig mogelijk."],
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
                ["nl", "Kies de dag"],
                ["fr", "Sélectionner la date"],
            ])
        },
        //{
        //    key: '1', role: 'option',
        //    content: new Map([
        //        ["en", "I don't know/can't remember"],
        //        ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
        //       ["nl", "Ik weet het niet (meer)."],
        //        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
        //    ])
        //},
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q4_def = (itemSkeleton: SurveyItem, q3Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When did your symptoms end?"],
            ["de", "Wann sind die Symptome abgeklungen?"],
            ["nl", "Op welke dag waren uw klachten weer verdwenen?"],
            ["fr", "Quand vos symptômes ont-ils disparu?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Using the beginning and end dates of symptoms we can work out how long respiratory infections last."],
                    ["de", "Durch Verwendung der Anfangs- und Enddaten der Symptome können wir feststellen, wie lange Atemwegserkrankungen dauern."],
                    ["nl", "Op basis van de eerste en laatste dag van klachten kunnen we uitrekenen hoelang u last heeft gehad van (deze) klachten."],
                    ["fr", "En utilisant les dates de début et de fin des symptômes, nous pouvons travailler sur la durée des infections respiratoires."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte gib Deine Schätzung so genau wie möglich an."],
                    ["nl", "Wees alstublieft zo nauwkeurig mogelijk."],
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
                min: {
                    dtype: 'exp', exp: {
                        name: 'getAttribute',
                        data: [
                            { dtype: 'exp', exp: expWithArgs('getResponseItem', q3Key, [responseGroupKey, singleChoiceKey, '0'].join('.')) },
                            { str: 'value', dtype: 'str' }
                        ],
                        returnType: 'int',
                    }
                },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
            content: new Map([
                ["en", "Choose date"],
                ["de", "Wähle ein Datum"],
                ["nl", "Kies de dag"],
                ["fr", "Sélectionner la date"],
            ])
        },
        //{
        //    key: '1', role: 'option',
        //    content: new Map([
        //        ["en", "I don't know/can't remember"],
        //        ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
        //        ["nl", "Dit weet ik niet (meer)?"],
        //        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
        //    ])
        //},
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I am still ill"],
                ["de", "Die Symptome dauern aktuell noch an."],
                ["nl", "Ik heb nog steeds klachten."],
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
            ["nl", "Kwamen uw klachten plotseling opzetten? (binnen een paar uur)"],
            ["fr", "Est-ce que vos symptômes se sont déclarés soudainement, en l'espace de quelques heures?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Sudden onset of symptoms is believed to be common for flu."],
                    ["de", "Plötzliches Auftreten von Symptomen gilt als häufig für die Grippe."],
                    ["nl", "Dat klachten plotseling (binnen een paar uur) opzetten is gelinkt aan griep"],
                    ["fr", "L'apparition soudaine des symptômes est considéré comme commune pour la grippe."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick yes if your symptoms appeared over a few hours rather than gradually developing over a few days."],
                    ["de", "Wählen Sie ja, falls Ihre Symptome innerhalb weniger Stunden aufgetreten sind anstatt über einige Tage hinweg."],
                    ["nl", "Beantwoord de vraag met Ja wanneer de klachten binnen enkele uren kwamen opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
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
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern."],
                ["nl", "Ik weet dit niet (meer)."],
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
            ["nl", "Op welke dag kwam de koorts opzetten? Als u de dag niet precies weet, kies dan een geschatte datum"],
            ["fr", " Quand est-ce que votre fièvre a commencé ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Fever is very important for diagnosing, so we want to know when this started."],
                    ["de", "Fieber ist sehr wichtig für die Diagnose. Aus diesem Grund möchten wir gern wissen, wann dieses angefangen hat."],
                    ["nl", "Koorts is belangrijk in de diagnose, daarom willen we graag weten wanneer deze klachten begonnen."],
                    ["fr", "La fièvre est très importante pour le diagnostic de la grippe. Nous voulons donc savoir quand cela a commencé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["de", "Bitte gib Deine Abschätzung so genau wie möglich an."],
                    ["nl", "Wees alstublieft zo nauwkeurig mogelijk."],
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
                ["nl", "Kies de dag"],
                ["fr", "Sélectionner la date"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don't know/can't rember"],
                ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
                ["nl", "Ik weet het niet (meer)."],
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
            ["nl", "Kwam de koorts plotseling opzetten? (binnen een paar uur)"],
            ["fr", "Est-ce que votre fièvre s'est déclarée soudainement, en l'espace de quelques heures?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Certain illnesses are associated with a sudden onset of fever"],
                    ["de", "Bestimmte Erkrankungen werden mit einem plötzlichen Auftreten von Fieber in Verbindung gebracht."],
                    ["nl", "Sommige ziekten veroorzaken een plotselinge koorts."],
                    ["fr", "La grippe est souvent associée à une apparition soudaine de fièvre."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick yes if your fever appeared over a few hours rather than gradually developing over a few days."],
                    ["de", "Wähle ja, falls das Fieber über wenige Stunden aufgetreten ist, statt über einige Tage hinweg."],
                    ["nl", "Beantwoord de vraag met Ja wanneer de koorts binnen enkele uren kwam opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
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
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss es nicht"],
                ["nl", "Dat weet ik niet (meer)"],
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
            ["de", "Hast du Deine Körpertemperatur gemessen?"],
            ["nl", "Heeft u uw temperatuur gemeten?"],
            ["fr", "Avez-vous pris votre température?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Infections often cause a high temperature. However, not everyone takes their temperature when they are ill."],
                    ["de", "Infektionen verursacht häufig eine hohe Körpertemperatur. Aber nicht jeder misst seine Körpertemperatur, wenn er krank ist."],
                    ["nl", "Infecties veroorzaken vaak een hoge temperatuur. Echter, niet iedereen meet hun temperatuur wanneer ze ziek zijn."],
                    ["fr", "La grippe est souvent associée à une température élevée. Cependant tout le monde ne prend pas sa température lorsqu'il est malade."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Answer yes, if you took your temperature using a thermometer."],
                    ["de", "Wähle ja, falls Du Deine Körpertemperatur mit einem Thermometer gemessen hast."],
                    ["nl", "Beantwoord deze vraag met Ja wanneer u uw temperatuur heeft gemeten met een thermometer."],
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
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich kann mich nicht erinnern"],
                ["nl", "Dat weet ik niet (meer)"],
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
            ["de", "Was war die höchste gemessene Temperatur?"],
            ["nl", "Wat is uw hoogst gemeten temperatuur?"],
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
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Certain infections often causes a high temperature."],
                    ["de", "Bestimmte Infektionen verursachen häufig eine hohe Körpertemperatur."],
                    ["nl", "Bepaalde infectieziekten veroorzaken een hoge temperatuur."],
                    ["fr", "La grippe provoque souvent une température élevée."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Give the highest temperature you recorded during this episode of illness."],
                    ["de", "Gib die höchste Körpertemperatur an, die Du während Deiner Krankheit gemessen hast."],
                    ["nl", "Geef de hoogste temperatuur die u gemeten heeft tijdens uw klachtenperiode."],
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
                ["en", "Below 37.0°C"],
                ["de", "Unter 37°C"],
                ["nl", "Onder de 37,0°C"],
                ["fr", "Moins de 37°C"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "37.0° - 37.4°C"],
                ["de", "37°C - 37,4°C"],
                ["nl", "37,0°C - 37,4°C"],
                ["fr", "37° – 37.4°C"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "37.5° - 37.9°C"],
                ["de", "37,5° - 37,9°C"],
                ["nl", "37,5° - 37,9°C"],
                ["fr", "37.5° – 37.9°C"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "38.0° - 38.9°C"],
                ["de", "38° - 38,9°C"],
                ["nl", "38,0° - 38,9°C"],
                ["fr", "38° – 38.9°C"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "39.0° - 39.9°C"],
                ["de", "39° - 39,9°C"],
                ["nl", "39,0° - 39,9°C"],
                ["fr", "39° – 39.9°C"],
            ])
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["en", "40.0°C or more"],
                ["de", "40°C oder mehr"],
                ["nl", "40,0°C of meer"],
                ["fr", "40°C ou plus"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
                ["nl", "Dat weet ik niet (meer)."],
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
            ["de", "Hast du auf Grund deiner Symptome irgendeine Form von medizinischer Einrichtung besucht (persönlich dort erschienen)?"],
            ["nl", "Heeft u medische hulp gezocht vanwege uw klachten? En zo ja, waar? (meerdere antwoorden mogelijk)"],
            ["fr", "En raison de vos symptômes, avez-vous rendu visite (en personne) à des services médicaux ?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["de", "Wir wollen herausfinden, ob Menschen aufgrund Ihrer Symptome Kontakt zu gesundheitlichen Einrichtungen suchen."],
                    ["nl", "Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
                    ["fr", "Pour savoir si la population entre en contact avec les services de santé en raison de ses symptômes."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all of those that apply. If you are due to see attend, then tick the final option."],
                    ["de", "Wähle alle Optionen, die zutreffen. Falls Du planst eine Einrichtung zu besuchen, wähle bitte die letzte Option."],
                    ["nl", "Selecteer alle relevante vormen van medische hulp die u heeft bezocht. Wanneer u nog niet bent geweest maar wel een afspraak heeft gemaakt, selecteer dan de laatste optie."],
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
                ["nl", "Nee, ik heb geen medische hulp gezocht"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "GP or GP's practice nurse"],
                ["de", "Allgemeinarzt"],
                ["nl", "Ja, bij de huisarts of huisarts assistent"],
                ["fr", "Médecin généraliste"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital accident & emergency department / out of hours service"],
                ["de", "Notaufnahme/Notdienst außerhalb der Öffnungszeiten"],
                ["nl", "Ja, bij de eerste hulp van het ziekenhuis of de huisartsenpost"],
                ["fr", "Service des urgences d'un hôpital/clinique ou médecin de garde"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital admission"],
                ["de", "Einlieferung ins Krankenhaus"],
                ["nl", "Ja, ik ben opgenomen in het ziekenhuis"],
                ["fr", "Consultation ambulatoire à l'hôpital"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Other medical services"],
                ["de", "andere medizinische Einrichtungen"],
                ["nl", "Ja, ik heb andere medische hulp gezocht"],
                ["fr", "Autre service médical"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "No, but I have an appointment scheduled"],
                ["de", "Nein, aber ich habe schon einen Termin"],
                ["nl", "Nog niet, maar ik heb een afspraak gemaakt"],
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
            ["de", "Wie lange, nachdem die Symptome aufgetreten sind, hast Du das erste Mal eine medizinische Einrichtung besucht?"],
            ["nl", "Waar en hoe snel na de start van uw klachten heeft u voor de EERSTE keer medische hulp gezocht?"],
            ["fr", "Combien de temps après que vos symptômes soient apparus avez-vous visité un service médical ?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out how quickly people with symptoms are seen by the health services."],
                    ["de", "Um herauszufinden, wie schnell Menschen mit Symptomen von gesundheitlichen Einrichtungen wahrgenommen werden."],
                    ["nl", "Om uit te zoeken hoe snel mensen met klachten worden gezien door een medische hulpdienst/specialist."],
                    ["fr", "Pour savoir à quelle vitesse les personnes présentant des symptômes sont vus par les services de santé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only record the time until your FIRST contact with the health services."],
                    ["de", "Gib nur die Zeit an, bis Du zum ERSTEN MAL Kontakt zu gesundheitlichen Einrichtungen aufgenommen haben."],
                    ["nl", "Geef alleen het aantal dagen van het begin van de klachten tot uw EERSTE bezoek aan de desbetreffende medische hulpverlener/specialist."],
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
                    ["de", "am gleichen Tag"],
                    ["nl", "Op dezelfde dag als de eerste klachten"],
                    ["fr", "Jour même"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["en", "1 day"],
                    ["de", "1 Tag"],
                    ["nl", "1 dag"],
                    ["fr", "1 jour"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["en", "2 days"],
                    ["de", "2 Tage"],
                    ["nl", "2 dagen"],
                    ["fr", "2 jours"],
                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["en", "3 days"],
                    ["de", "3 Tage"],
                    ["nl", "3 dagen"],
                    ["fr", "3 jours"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["en", "4 days"],
                    ["de", "4 Tage"],
                    ["nl", "4 dagen"],
                    ["fr", "4 jours"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["en", "5 days"],
                    ["de", "5 Tage"],
                    ["nl", "5 dagen"],
                    ["fr", "5 jours"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["en", "6 days"],
                    ["de", "6 Tage"],
                    ["nl", "6 dagen"],
                    ["fr", "6 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "7 days"],
                    ["de", "7 Tage"],
                    ["nl", "7 dagen"],
                    ["fr", "7 jours"],
                ]),
            },
            {
                key: '8', role: 'option', content: new Map([
                    ["en", "8 days"],
                    ["de", "8 Tage"],
                    ["nl", "8 dagen"],
                    ["fr", "8 jours"],
                ]),
            },
            {
                key: '9', role: 'option', content: new Map([
                    ["en", "9 days"],
                    ["de", "9 Tage"],
                    ["nl", "9 dagen"],
                    ["fr", "9 jours"],
                ]),
            },
            {
                key: '10', role: 'option', content: new Map([
                    ["en", "10 days"],
                    ["de", "10 Tage"],
                    ["nl", "10 dagen"],
                    ["fr", "10 jours"],
                ]),
            },
            {
                key: '11', role: 'option', content: new Map([
                    ["en", "11 days"],
                    ["de", "11 Tage"],
                    ["nl", "11 dagen"],
                    ["fr", "11 jours"],
                ]),
            },
            {
                key: '12', role: 'option', content: new Map([
                    ["en", "12 days"],
                    ["de", "12 Tage"],
                    ["nl", "12 dagen"],
                    ["fr", "12 jours"],
                ]),
            },
            {
                key: '13', role: 'option', content: new Map([
                    ["en", "13 days"],
                    ["de", "13 Tage"],
                    ["nl", "13 dagen"],
                    ["fr", "13 jours"],
                ]),
            },
            {
                key: '14', role: 'option', content: new Map([
                    ["en", "14 days"],
                    ["de", "14 Tage"],
                    ["nl", "14 dagen"],
                    ["fr", "14 jours"],
                ]),
            },
            {
                key: '15', role: 'option', content: new Map([
                    ["en", "More than 14 days"],
                    ["de", "mehr als 14 Tage"],
                    ["nl", "meer dan 14 dagen"],
                    ["fr", "Plus de 14 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "I don't know/can't remember"],
                    ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
                    ["nl", "Dat weet ik niet (meer)"],
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
                        ["de", "med. Einrichtungen"],
                        ["nl", "Medische hulpverlener"],
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
                        ["de", "Allgemeinarzt"],
                        ["nl", "Huisarts of huisarts assistent"],
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
                        ["de", "Notaufnahme/Notdienst außerhalb der Öffnungszeiten"],
                        ["nl", "Eerste hulp van het ziekenhuis of huisartsenpost"],
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
                        ["nl", "Ziekenhuisopname"],
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
                        ["de", "andere medizinische Einrichtungen"],
                        ["nl", "Andere medische hulp."],
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

const q9_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you take medication for these symptoms?"],
            ["de", "Hast du Medikamente gegen die Symptome genommen?"],
            ["nl", "Heeft u vanwege uw klachten medicijnen gebruikt? En zo ja, welke?"],
            ["fr", "Avez-vous pris des médicaments pour ces symptômes ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out who gets treated, and how effective treatment is."],
                    ["de", "Um herauszufinden, wer behandelt wird und wie effektiv die Behandlung ist."],
                    ["nl", "Om uit te zoeken wie er medicatie neemt, en hoe effectief deze behandeling is."],
                    ["fr", "Pour savoir qui se fait soigner, et si le traitement est efficace."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only record those medications that you used because of this illness. If you are on other medications because of a pre-existing illness then do not record these."],
                    ["de", "Gib  nur die Medikamente an, die Du aufgrund dieser aktuellen Krankheit nimmst. Falls Du auch Medikamente aufgrund von bereits existierender Krankheiten nimmst, gib diese bitte nicht an."],
                    ["nl", "Geef alleen de medicatie aan die u gebruikt in verband met uw gemelde klachten. Medicatie die u gebruikt voor een al bestaande aandoening hoeft u niet te noemen."],
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
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '6'),
            content: new Map([
                ["en", "No medication"],
                ["de", "keine Medikamente"],
                ["nl", "Nee, ik heb geen medicijnen gebruikt"],
                ["fr", "Aucun médicament"],
            ])
        },
        {
            key: '1',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Pain killers (e.g. paracetamol, lemsip, ibuprofen, aspirin, calpol, etc)"],
                ["de", "Schmerzmittel (z.B. Paracetamol, Aspirin, Ibuprofen)"],
                ["nl", "Ja, pijnstillers zoals paracetamol, aspirine of ibuprofen"],
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
                ["nl", "Ja, medicijnen om het hoesten te onderdrukken"],
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
                ["nl", "Ja, antivirale middelen zoals Tamiflu of Relenza"],
                ["fr", "Antiviraux (par ex. Tamiflu)"],
            ])
        },
        {
            key: '4',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Antibiotics"],
                ["de", "Antibiotika"],
                ["nl", "Ja, antibiotica"],
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
                ["nl", "Ja, homeopathisch middelen"],
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
                ["nl", "Ja, alternatieve medicatie (essentiële olie, fytotherapie enz.)"],
                ["fr", "Médecines douces (huiles essentielles, phytothérapie, etc.)"],
            ])
        },
        {
            key: '5',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Other"],
                ["de", "andere"],
                ["nl", "Ja, andere medicatie"],
                ["fr", "Autre"],
            ])
        },
        {
            key: '6',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
                ["nl", "Dit wil ik niet aangeven"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
            ["nl", "Hoe snel nadat uw klachten opkwamen bent u begonnen met het gebruiken van antivirale middelen?"],
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
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Antivirals are thought to be most effective if taken quickly after disease onset."],
                    ["de", "Antivirale Medikamente gelten als am effektivsten, wenn Sie kurz nach Beginn der Krankheit eingenommen werden."],
                    ["nl", "Antivirale middelen werken beter wanneer ze snel worden genomen na het begin van de klachten."],
                    ["fr", "Les antiviraux sont supposés être plus efficace si pris rapidement après l'apparition de la maladie ."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Report the time until you first started taking antivirals (which may not be the same day as you got your prescription)."],
                    ["de", "Gib die Zeit an, nach der Du das erste mal angefangen hast, antivirale Medikamente zu nehmen (was möglicherweise nicht der selbe Tag ist, an dem Du sie verschrieben bekommen hast)."],
                    ["nl", "Geef het aantal dagen tussen het begin van de klachten en de dag u met de antivirale middelen begon."],
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
                ["de", "am selben Tag (innerhalb von 24 Stunden)"],
                ["nl", "Dezelfde dag (binnen 24 uur)"],
                ["fr", "Le jour même (dans les 24 heures)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "1 day"],
                ["de", "1 Tag"],
                ["nl", "1 dag"],
                ["fr", "1 jour"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "2 days"],
                ["de", "2 Tage"],
                ["nl", "2 dagen"],
                ["fr", "2 jours"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "3 days"],
                ["de", "3 Tage"],
                ["nl", "3 dagen"],
                ["fr", "3 jours"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "4 days"],
                ["de", "4 Tage"],
                ["nl", "4 dagen"],
                ["fr", "4 jours"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "5-7 days"],
                ["de", "5-7 Tage"],
                ["nl", "5-7 dagen"],
                ["fr", "5 – 7 jours"],
            ])
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["en", "More than 7 days"],
                ["de", "mehr als 7 Tage"],
                ["nl", "Meer dan 7 dagen"],
                ["fr", "Plus de 7 jours"],
            ])
        }, {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiss es nicht bzw.  kann mich nicht erinnern"],
                ["nl", "Dat weet ik niet (meer)."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
            ["de", "Hat sich Dein Tagesablauf aufgrund Deiner Krankheit geändert?"],
            ["nl", "Heeft u vanwege uw klachten uw dagelijkse bezigheden moeten aanpassen?"],
            ["fr", "Avez-vous changé votre routine quotidienne en raison de votre maladie ?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, but I did not take time off work/school"],
                ["de", "Ja, aber ich habe mich nicht von der Arbeit/Schule abgemeldet"],
                ["nl", "Ja, maar ik ben wel gewoon naar werk/school gegaan"],
                ["fr", "Oui, mais je n'ai pas pris congé au travail / à l'école"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, I took time off work/school"],
                ["de", "Ja, ich habe mich von der Schule/Arbeit abgemeldet"],
                ["nl", "Ja, ik ben thuis gebleven terwijl ik eigenlijk naar werk/school had gemoeten"],
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
            ["de", "Bist du aktuell immer noch von der Arbeit/Schule abgemeldet?"],
            ["nl", "Blijft u nog steeds thuis in plaats van werk/school?"],
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
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To estimate the average  amount of time that people take off work, we need to know if people are still off work."],
                    ["de", "Um die durchschnittliche Zeit abzuschätzen, für die sich Menschen von der Schule/ Arbeit abmelden, müssen wir wissen, ob Du immer noch abwesend bist."],
                    ["nl", "Om uit te rekenen hoeveel dagen mensen thuisblijven vanwege klachten."],
                    ["fr", "Afin d'estimer le temps moyen que les gens passent en arrêt de travail."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick “yes” if you would be at work/school today if you were not currently ill."],
                    ["de", "Wähle „Ja“, wenn Du heute eigentlich in der Arbeit/ Schule wärst, falls Du nicht gerade krank wärst."],
                    ["nl", "Antwoord 'Ja' als u vanwege klachten vandaag nog thuis zit in plaats van werk/school"],
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
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Other (e.g. I wouldn’t usually be at work/school today anyway)"],
                ["de", "Andere (z.B. Ich wäre jetzt sowieso nicht in der Arbeit/Schule)"],
                ["nl", "Anders (ik hoefde vandaag sowieso niet naar werk/school)"],
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
            ["de", "Hoeveel dagen bent u niet naar werk/school geweest (terwijl dat wel had gemoeten)?"],
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
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To measure the effect of symptoms on people’s daily lives."],
                    ["de", "Um zu sehen, wie die Krankheitssymptome das tägliche Leben von Menschen beeinflussen."],
                    ["nl", "Om het effect te bepalen van de klachten op uw dagelijksleven"],
                    ["fr", "Afin de mesurer l'effet des symptômes sur la vie quotidienne des gens."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Only count the days that you normally would have been in school or work (e.g. don’t count weekends)."],
                    ["de", "Zähle nur die Tage, die Du normalerweise in der Arbeit/ Schule gewesen wärst (zählen z.B. keine Wochenenden)."],
                    ["nl", "Tel alleen de dagen waar u normaal naar het werk/school had moeten gaan"],
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
                ["nl", "1 dag"],
                ["fr", "1 jour"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "2 days"],
                ["de", "2 Tage"],
                ["nl", "2 dagen"],
                ["fr", "2 jours"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "3 days"],
                ["de", "3 Tage"],
                ["nl", "3 dagen"],
                ["fr", "3 jours"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "4 days"],
                ["de", "4 Tage"],
                ["nl", "4 dagen"],
                ["fr", "4 jours"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "5 days"],
                ["de", "5 Tage"],
                ["nl", "5 dagen"],
                ["fr", "5 jours"],
            ])
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["en", "6 to 10 days"],
                ["de", "6 bis 10 Tage"],
                ["nl", "6 tot 10 dagen"],
                ["fr", "6 à 10 jours"],
            ])
        }, {
            key: '7', role: 'option',
            content: new Map([
                ["en", "11 to 15 days"],
                ["de", "11 bis 15 Tage"],
                ["nl", "11 tot 15 dagen"],
                ["fr", "11 à 15 jours"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "More than 15 days"],
                ["de", "Mehr als 15 Tage"],
                ["nl", "Meer dan 15 dagen"],
                ["fr", "Plus de 15 jours"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q11_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What do you think is causing your symptoms?"],
            ["de", "Was hälst du für die Ursache deiner Symptome?"],
            ["nl", "Heeft u zelf enig idee waar uw klachten vandaan komen?"],
            ["fr", "Quelle est selon vous l'origine de vos symptômes ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To help find out if our assessment of your illness based on your symptoms matches what you believe to be the cause. You might have a better idea of what is causing your illness than our computer algorithms."],
                    ["de", "Um herauszufinden, ob Deine Einschätzung der Ursache mit der tatsächlichen Ursache übereinstimmt. Du könntest eine viel bessere Vorstellung der Ursache haben, als unsere Computeralgorithmen."],
                    ["nl", "Om uit te zoeken of uw eigen idee wat de oorzaak kan zijn past bij uw eigen klachten, en klachten van anderen. Ook heeft u waarschijnlijk een beter idee wat het zou kunnen zijn dan computer algoritmes."],
                    ["fr", "Pour nous aider à trouver si notre évaluation de votre maladie en fonction de vos symptômes correspond à ce que vous croyez en être la cause. Vous pourriez avoir une meilleure idée de ce qui est la cause de votre maladie que nos algorithmes informatiques ."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "If you are reasonably sure about what is causing your symptoms, please tick the appropriate box. Otherwise, please tick “I don’t know”."],
                    ["de", "Falls Du Dir sicher genug bist, was die Ursache Deiner Symptome ist, wählen  die entsprechenden Option. Wählen ansonsten „Ich weiss es nicht“."],
                    ["nl", "Bent u vrij zeker van de oorzaak van uw klachten geef deze oorzaak dan aan."],
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
                ["nl", "Ja, ik heb griep, of griepachtige verschijnselen"],
                ["fr", " Grippe ou syndrome pseudo-grippal"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Common cold"],
                ["de", "Gewöhnliche Erkältung"],
                ["nl", "Ja, ik ben verkouden"],
                ["fr", "Rhume / refroidissement"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Allergy/hay fever"],
                ["de", "Allergie/ Heuschnupfen"],
                ["nl", "Ja ik heb last van een allergie/ hooikoorts"],
                ["fr", " Allergie / rhume des foins"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Ashtma"],
                ["de", "Asthma"],
                ["nl", "Ja, ik heb last van asthma"],
                ["fr", "Asthme"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Gastroenteritis/gastric flu"],
                ["de", "Magen-Darm-Grippe"],
                ["nl", "Ja, ik heb maag-darmklachten of buikgriep"],
                ["fr", "Gastro-entérite / grippe intestinale"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "New coronavirus (Covid-19)"],
                ["de", "neuartiges Coronavirus (Covid-19)"],
                ["nl", "Ja, het nieuwe coronavirus (Covid-19)"],
                ["fr", "Nouveau coronavirus (Covid-19)"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Other"],
                ["de", "andere"],
                ["nl", "Ja, ik heb een andere ziekte of reden die de klachten hebben veroorzaakt"],
                ["fr", "Autre"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiss es nicht"],
                ["nl", "Nee, ik heb geen idee"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

// Additional questions for the Dutch survey

const q1aNL_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you receive a corona test result since the last survey? (positive or negative?"],
            ["nl", "Heeft u sind de vorige vragenlijst een testuitslag (positief of negatief) gehad voor het nieuwe coronavirus?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why do we ask this question?"],
                    ["nl", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To create an overview (over time) of how many participants tested positive"],
                    ["nl", "Om een overzicht te krijgen (over de tijd) hoeveel mensen binnen infectieradar al eens positief zijn getest"],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should you answer this question?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please indicate your test result."],
                    ["nl", "Geef aan voor welke test u een uitslag heeft gehad."],
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
                ["en", "No, I did not receive a test result"],
                ["nl", "Nee, ik heb geen testuitslag gehad"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, I recieved the result of a throat/nose swap (PCR)"],
                ["nl", "Ja, ik heb een testuitslag gehad voor een keel/neus slijmvliestest (PCR)"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, I recieved the result of a bloodtest (antibodytest)"],
                ["nl", "Ja, ik heb een testuitslag gehad voor een bloedtest (antistoftest)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const q1bNL_def = (itemSkeleton: SurveyItem, q1aNLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What was your test result?"],
            ["de", "Was war die höchste gemessene Temperatur?"],
            ["nl", "Wat was de uitslag van de test?"],
            ["fr", " Quel a été votre température mesurée la plus élevée?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q1aNLKey].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1', '2')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Positive, evidence for infection with coronavirus"],
                ["nl", "Positief, dus WEL bestmet (geweest) met het nieuwe coronavirus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Negative, NO evidence for infection with coronavirus"],
                ["nl", "Negatief, dus GEEN bewijs voor besmetting met het nieuwe coronavirus"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I prever not to say"],
                ["nl", "Dit wil ik niet aangeven"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const q1cNL_def = (itemSkeleton: SurveyItem, q1aNLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How many days after your first symptoms was the swap/sample taken?"],
            ["nl", "Hoeveel dagen na de eerste klachten heeft u zich laten testen?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q1aNLKey].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1')
    )


    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const ddOptions: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup', items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["en", "On the same day as the first symptoms"],
                    ["nl", "Op dezelfde dag als de eerste klachten"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["en", "1 day"],
                    ["de", "1 Tag"],
                    ["nl", "1 dag"],
                    ["fr", "1 jour"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["en", "2 days"],
                    ["de", "2 Tage"],
                    ["nl", "2 dagen"],
                    ["fr", "2 jours"],
                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["en", "3 days"],
                    ["de", "3 Tage"],
                    ["nl", "3 dagen"],
                    ["fr", "3 jours"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["en", "4 days"],
                    ["de", "4 Tage"],
                    ["nl", "4 dagen"],
                    ["fr", "4 jours"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["en", "5 days"],
                    ["de", "5 Tage"],
                    ["nl", "5 dagen"],
                    ["fr", "5 jours"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["en", "6 days"],
                    ["de", "6 Tage"],
                    ["nl", "6 dagen"],
                    ["fr", "6 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "7 days"],
                    ["de", "7 Tage"],
                    ["nl", "7 dagen"],
                    ["fr", "7 jours"],
                ]),
            },
            {
                key: '8', role: 'option', content: new Map([
                    ["en", "8 days"],
                    ["de", "8 Tage"],
                    ["nl", "8 dagen"],
                    ["fr", "8 jours"],
                ]),
            },
            {
                key: '9', role: 'option', content: new Map([
                    ["en", "9 days"],
                    ["de", "9 Tage"],
                    ["nl", "9 dagen"],
                    ["fr", "9 jours"],
                ]),
            },
            {
                key: '10', role: 'option', content: new Map([
                    ["en", "10 days"],
                    ["de", "10 Tage"],
                    ["nl", "10 dagen"],
                    ["fr", "10 jours"],
                ]),
            },
            {
                key: '11', role: 'option', content: new Map([
                    ["en", "11 days"],
                    ["de", "11 Tage"],
                    ["nl", "11 dagen"],
                    ["fr", "11 jours"],
                ]),
            },
            {
                key: '12', role: 'option', content: new Map([
                    ["en", "12 days"],
                    ["de", "12 Tage"],
                    ["nl", "12 dagen"],
                    ["fr", "12 jours"],
                ]),
            },
            {
                key: '13', role: 'option', content: new Map([
                    ["en", "13 days"],
                    ["de", "13 Tage"],
                    ["nl", "13 dagen"],
                    ["fr", "13 jours"],
                ]),
            },
            {
                key: '14', role: 'option', content: new Map([
                    ["en", "14 days"],
                    ["de", "14 Tage"],
                    ["nl", "14 dagen"],
                    ["fr", "14 jours"],
                ]),
            },
            {
                key: '15', role: 'option', content: new Map([
                    ["en", "More than 14 days"],
                    ["de", "mehr als 14 Tage"],
                    ["nl", "meer dan 14 dagen"],
                    ["fr", "Plus de 14 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "I don't know/can't remember"],
                    ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
                    ["nl", "Dat weet ik niet (meer)"],
                    ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ]),
            },
        ]
    };

    //editor.addExistingResponseComponent(ddOptions, rg?.key);

    return editor.getItem();
}


const q1dNL_def = (itemSkeleton: SurveyItem, q1aNLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "On which day was the blood taken for the corona test? Please guess if you can't remember the date exactly."],
            ["nl", "Wanneer is de test voor het nieuwe coronavirus bij u gedaan? Als u de datum niet meer precies weet mag u deze schatten. Het gaat om de datum dat uw bloed is afgenomen."],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q1aNLKey].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '2')
    )

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
                ["nl", "Kies de dag"],
                ["fr", "Sélectionner la date"],
            ])
        },
        //{
        //    key: '1', role: 'option',
        //    content: new Map([
        //        ["en", "I don't know/can't remember"],
        //        ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
        //       ["nl", "Ik weet het niet (meer)."],
        //        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
        //    ])
        //},
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const q1eNL_def = (itemSkeleton: SurveyItem, q1aNLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "In the two weeks before your test were you approached in the context of contact-tracing by the GGD (local public health service)?"],
            ["nl", "Bent u in de twee weken voor uw test benaderd door de GGD in verband met contactonderzoek?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q1aNLKey].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '1')
    )

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No, I have not been contacted"],
                ["nl", "Nee, ik ben niet door de GGD benaderd in verband met contactonderzoek"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, I am contacted"],
                ["nl", "Ja, ik ben wel door de GGD benaderd in verband met contactonderzoek"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I don't want to say"],
                ["nl", "Dit wil ik niet aangeven"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}




// Questions of the Influenzanet questionnaire which are not used in Dutch version
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
                    ["de", "Wähle alle Optionen, die zutreffen."],
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
                ["de", "Allgemeinarzt (nur mit der Empfangsperson gesprochen)"],
                ["fr", "Médecin généraliste – Echange avec la réceptionniste uniquement"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GP - spoke to doctor or nurse"],
                ["de", "Allgemeinarzt (mit Arzt gesprochen)"],
                ["fr", "Médecin généraliste – Echange avec le médecin ou l'infirmière"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "NHS Direct / NHS 24 / NHS Choices"],
                ["de", "Gesundheitsamt"],
                ["fr", "Service de conseil santé par téléphone (par exemple : compagnie d'assurance)"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "NPFS"],
                ["de", "öffentlicher Corona-Informationsdienst"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Other"],
                ["de", "andere"],
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
                    ["de", "Gib  nur die Zeit an, nach der Du das ERSTE MAL Kontakt aufgenommen hast."],
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
                    ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
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
                        ["de", "medizinischer Dienst"],
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
                        ["de", "Allgemeinarzt (nur mit Empfangsperson gesprochen)"],
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
                        ["de", "Allgemeinarzt ( mit Arzt gesprochen)"],
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
                        ["de", "Gesundheitsamt"],
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
                        ["de", "andere"],
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

// COVID questions which are not used in the Dutch version
const qcov4_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you call [write the COVID-19 emergency line of your country]?"],
            ["de", "Hast du wegen Deiner Symptome eine Coronavirus Infohotline angerufen?"],
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
                ["de", "Keine Ahnung"],
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
            ["de", 'Hast du wegen deiner Symptome den Notruf angerufen?'],
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
                ["de", "Keine Ahnung"],
                ["fr", "Je ne sais pas"],
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
            ["de", "Hast du aufgrund deiner Symptome eine oder mehrere der folgenden Maßnahmen ergriffen oder verstärkt?"],
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
                ['de', 'Wähle alle Optionen, die zutreffen'],
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
                ["de", "aufgehört durch Umarmen und/oder Küssen zu grüssen"],
                ["fr", "Eviter de faire la bise et/ou serrer les gens dans vos bras"],
            ])
        },
        {
            key: '6',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Limit your use of public transport"],
                ["de", "Nutzung von öffentlichen Verkehrsmittel eingeschränkt"],
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
                ["de", "Vermeiden von Reisen ausserhalb des eigenen Landes oder der Region"],
                ["fr", "Eviter de voyager à l'extérieur de votre pays ou région"],
            ])
        },
        {
            key: '13',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Have your food-shopping delivered by a store or a friend/family member"],
                ["de", "sich Einkäufe von einem Laden oder einem Freund/Familienmitglied liefern lassen"],
                ["fr", "Vous faire livrer vos courses par un magasin ou un ami/membre de la famille"],
            ])
        },
        {
            key: '14',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid seeing friends and family"],
                ["de", "vermieden Freunde und Familie zu treffen"],
                ["fr", "Eviter de voir vos amis et famille"],
            ])
        }, {
            key: '15',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid being in contact with people over 65 years or with a chronic disease"],
                ["de", "Kontakt mit Menschen über 65 Jahren oder mit einer chronischen Krankheit vermieden"],
                ["fr", "Eviter le contact avec des personnes de plus de 65 ans ou avec une maladie chronique"],
            ])
        },
        {
            key: '16',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '12'),
            content: new Map([
                ["en", "Avoid being in contact with children"],
                ["de", "Kontakt mit Kindern vermieden"],
                ["fr", "Eviter le contact avec les enfants"],
            ])
        },
        {
            key: '12',
            role: 'option',
            content: new Map([
                ["en", "None of these measures"],
                ["de", "keine dieser Massnahmen"],
                ["fr", "Aucune de ces mesures"],
            ])
        },

    ])
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
                ['de', 'Wähle alle Optionen, die zutreffen'],
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
                ["de", "einige von ihnen"],
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
                ['de', 'Wähle alle Optionen, die zutreffen'],
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
                ["de", "Nein, ich befinde mich in einer anderen Situation (Rentner, Arbeitssuchender, Student, Hausfrau/Ehemann, anderen Krankheitsurlaub...) "],
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
                ["de", "Ich gehe nicht mehr aus dem Haus."],
                ["fr", "Je ne sors plus de la maison"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "Less than once a week"],
                ["de", "weniger als einmal pro Woche "],
                ["fr", "Moins d'une fois par semaine"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "Once a week"],
                ["de", "einmal wöchentlich "],
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
                ["de", "einmal täglich "],
                ["fr", "Une fois par jour"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "Several times per day"],
                ["de", "mehrmals am Tag "],
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
            ["de", "Wie oft bist du in den letzten Tagen durchschnittlich aus dem Haus gegangen, um frische Luft zu schnappen oder Dich zu bewegen?"],
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
                ["de", "Ich gehe nicht mehr aus dem Haus."],
                ["fr", "Je ne sors plus de la maison"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "Less than once a week"],
                ["de", "weniger als einmal pro Woche "],
                ["fr", "Moins d'une fois par semaine"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "Once a week"],
                ["de", "einmal wöchentlich "],
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
                ["de", "einmal täglich "],
                ["fr", "Une fois par jour"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "Several times per day"],
                ["de", "mehrmals am Tag "],
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
            ["de", "Wievielen Personen (ausserhalb deines Haushalts) hast du Dich im Laufe des gestrigen Tages aus einer Entfernung von weniger als 1 Meter angenähert?"],
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
                ["de", "mehr als 10"],
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
            ["de", "Wenn die Sperrmassnahmen aufgehoben würden, aber kollektive Kinderbetreuungseinrichtungen / Schulen/Universitäten weiter geschlossen bleiben, wie würde deine Situation aussehen?"],
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
                ['de', 'Wähle alle Optionen, die zutreffen'],
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
                ["de", "Ich weiss es nicht"],
                ["fr", "Je ne sais pas"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov16_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you undergo analyses to know if you have COVID-19 (infection due to SRAS-CoV-2)?"],
            ["de", "Bist Du aufgrund Deiner Symptome getestet worden auf Infektion durch SARS-CoV-2?"],
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


//{
  //  key: '19', role: 'option',
   //disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
    //content: new Map([
    //    ["en", "Nose bleed"],
      //  ["de", "Nasenbluten"],
       // ["nl", "Bloedneus"],
   // ])
//},

//{
  //  key: '21', role: 'option',
   // disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
    //content: new Map([
     //   ["en", "Loss of taste"],
      //  ["de", "Geschmacksverlust"],
       // ["nl", "Verlies van smaakvermogen"],
    //])
//},
