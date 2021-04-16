import { Survey, SurveyItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { WeeklyQuestions as InfluenzanetWeekly } from "../common_question_pool/influenzanet-weekly";
import { initLikertScaleItem, initMatrixQuestion, initDropdownGroup, initMultipleChoiceGroup, initSingleChoiceGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { likertScaleKey, matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";

const weekly = (): Survey | undefined => {
    const surveyKey = 'weekly';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["nl-be", "Wekelijkse vragenlijst"],
            ["fr-be", "Questionnaire hebdomadaire"],
            ["de-be", "Wöchentliche Fragen"],
            ["en", "Weekly questionnaire"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["nl-be", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
            ["fr-be", "Cliquez ici pour votre questionnaire sur vos plaintes de la semaine dernière. Veuillez également signaler si vous n'avez aucune plainte."],
            ["de-be", "Klicken Sie hier für Ihren Fragebogen zu Ihren Beschwerden in der letzten Woche. Bitte melden Sie auch, wenn Sie keine Beschwerden hatten."],
            ["en", "Click here for your questionnaire about your complaints in the past week. Please also report if you had no complaints."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["nl-be", "Invullen duurt 15 seconden tot 5 minuten, afhankelijk van je klachten."],
            ["fr-be", "Le remplissage prend de 15 secondes à 5 minutes, selon vos plaintes."],
            ["de-be", "Das Ausfüllen dauert je nach Ihren Beschwerden 15 Sekunden bis 5 Minuten."],
            ["en", "Filling in takes 15 seconds to 5 minutes, depending on your complaints."],
        ])
    ));

    // *******************************
    // Some rules if necessary
    // *******************************
    // max item per page
    // set prefill rules
    // set context rules

    // *******************************
    // Questions
    // *******************************
    const rootItemEditor = new ItemEditor(survey.findSurveyItem(surveyKey) as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;

    // Symptoms Q_BE_1
    const Q_symptoms = symptomps(rootKey, true);
    survey.addExistingSurveyItem(Q_symptoms, rootKey);

    // Q_BE_1_3 COVID-19 test
    const Q_covidTest = covidTest(rootKey, true, "Q_BE_1_3");
    survey.addExistingSurveyItem(Q_covidTest, rootKey);

    // Q_BE_1_4 reason test
    const Q_reasonTest = reasonTest(rootKey, Q_covidTest.key, true, "Q_BE_1_4");
    survey.addExistingSurveyItem(Q_reasonTest, rootKey);

    // Q_BE_1_5 date test
    const Q_dateTest = dateTest(rootKey, Q_covidTest.key, true, "Q_BE_1_5");
    survey.addExistingSurveyItem(Q_dateTest, rootKey);

    //Q_BE_cov16e duration untill test
    const Q_durationTest = durationTest(rootKey, Q_covidTest.key, Q_reasonTest.key, true, "Q_BE_cov16e")
    survey.addExistingSurveyItem(Q_durationTest, rootKey);

    //Qcov_BE_16b test result
    const Q_resultTest = resultTest(rootKey, Q_covidTest.key, true, "Qcov_BE_16b")
    survey.addExistingSurveyItem(Q_resultTest, rootKey);

    //Q_BE_cov16z duration untill test result
    const Q_durationTestResult = durationTestResult(rootKey, Q_covidTest.key, Q_resultTest.key, true, "Qcov_BE_16z")
    survey.addExistingSurveyItem(Q_durationTestResult, rootKey);

    // Q1_2_def consent to further symptom questions
    const Q_consentSymptomQuestion = consentForSymptoms(rootKey, Q_symptoms.key, true, "Q_BE_1_2")
    survey.addExistingSurveyItem(Q_consentSymptomQuestion, rootKey);

    // // -------> HAS SYMPTOMS GROUP
    const userConsentedSymptomsGroup = InfluenzanetWeekly.userConsentedSymptomsGroup(rootKey, Q_consentSymptomQuestion.key);
    survey.addExistingSurveyItem(userConsentedSymptomsGroup, rootKey);
    const hasSymptomGroupKey = userConsentedSymptomsGroup.key;

    // // Q2 same illnes --------------------------------------
    const Q_same_illnes = InfluenzanetWeekly.sameIllnes(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_same_illnes, hasSymptomGroupKey);

    // // Q3 when first symptoms --------------------------------------
    const Q_symptomStart = InfluenzanetWeekly.symptomsStart(hasSymptomGroupKey, Q_same_illnes.key, true);
    survey.addExistingSurveyItem(Q_symptomStart, hasSymptomGroupKey);

    // // Qcov_BE_3 pcr tested contact COVID-19--------------------------------------
    const Q_covidPCRTestedContact = pcrTestedContact(hasSymptomGroupKey, true, "Qcov_BE_3");
    survey.addExistingSurveyItem(Q_covidPCRTestedContact, hasSymptomGroupKey);

    // // Qcov_BE_3b household pcr contacts COVID-19--------------------------
    const Q_pcrHouseholdContact = pcrHouseholdContact(hasSymptomGroupKey, Q_covidPCRTestedContact.key, true, "Qcov_BE_3b");
    survey.addExistingSurveyItem(Q_pcrHouseholdContact, hasSymptomGroupKey);

    // // Qcov_BE_8 contact with people showing symptoms -------------------------------------
    const Q_covidContact = covidSymptomsContact(hasSymptomGroupKey, true, "Qcov_BE_8");
    survey.addExistingSurveyItem(Q_covidContact, hasSymptomGroupKey);

    // // Qcov_BE_8b contact with people showing symtoms in your household ---------------------------
    const Q_covidHouseholdContact = covidHouseholdContact(hasSymptomGroupKey, Q_covidContact.key, true, "Qcov_BE_8b");
    survey.addExistingSurveyItem(Q_covidHouseholdContact, hasSymptomGroupKey);

    // // Q4 when symptoms end --------------------------------------
    const Q_symptomsEnd = InfluenzanetWeekly.symptomsEnd(hasSymptomGroupKey, Q_symptomStart.key, true);
    survey.addExistingSurveyItem(Q_symptomsEnd, hasSymptomGroupKey);

    // // Q5 symptoms developed suddenly --------------------------------------
    const Q_symptomsSuddenlyDeveloped = InfluenzanetWeekly.symptomsSuddenlyDeveloped(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_symptomsSuddenlyDeveloped, hasSymptomGroupKey);

    // // ----> fever group  - 4 questions
    const feverGroup = InfluenzanetWeekly.feverGroup.all(hasSymptomGroupKey, Q_symptoms.key, Q_symptomStart.key, true);
    survey.addExistingSurveyItem(feverGroup, hasSymptomGroupKey);

    // // Q_BE_7 visited medical service --------------------------------------
    const Q_visitedMedicalService = visitedMedicalService(hasSymptomGroupKey, true, "Q_BE_7");
    survey.addExistingSurveyItem(Q_visitedMedicalService, hasSymptomGroupKey);

    // // Q7a visited GP practice --------------------------------------
    // const Q_visitedGPPractice = InfluenzanetWeekly.visitedGP(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    // survey.addExistingSurveyItem(Q_visitedGPPractice, hasSymptomGroupKey);

    // // Q_BE_7b how soon visited medical service --------------------------------------
    const Q_visitedMedicalServiceWhen = visitedMedicalServiceWhen(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7b");
    survey.addExistingSurveyItem(Q_visitedMedicalServiceWhen, hasSymptomGroupKey);

    // // Qcov_BE_18 reasons no medical services-----------------------------------------
    const Q_visitedNoMedicalService = visitedNoMedicalService(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Qcov_BE_18");
    survey.addExistingSurveyItem(Q_visitedNoMedicalService, hasSymptomGroupKey);

    // // Qcov_BE_18b consequences fear-------------------------------------------------
    const Q_consFear = consFear(hasSymptomGroupKey, Q_visitedMedicalService.key, Q_visitedNoMedicalService.key, true, "Qcov_BE_18b");
    survey.addExistingSurveyItem(Q_consFear, hasSymptomGroupKey);

    // // Q_BE_7x duration hospitalisation----------------------------------------------
    const Q_durHosp = durHosp(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7x");
    survey.addExistingSurveyItem(Q_durHosp, hasSymptomGroupKey);

    // // Q_BE_7y ICU ------------------------------------------------------------------
    const Q_addICU = addICU(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7y");
    survey.addExistingSurveyItem(Q_addICU, hasSymptomGroupKey);

    // // Q_BE_7z Coma -----------------------------------------------------------------
    const Q_inComa = inComa(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7z");
    survey.addExistingSurveyItem(Q_inComa, hasSymptomGroupKey);

    // // Q_BE_9 took medication --------------------------------------
    const Q_tookMedication = tookMedication(hasSymptomGroupKey, true, "Q_BE_9");
    survey.addExistingSurveyItem(Q_tookMedication, hasSymptomGroupKey);

    // // Q9b how soon after symptoms taking antivirals --------------------------------------
    const Q_whenAntivirals = InfluenzanetWeekly.whenAntivirals(hasSymptomGroupKey, Q_tookMedication.key, true);
    survey.addExistingSurveyItem(Q_whenAntivirals, hasSymptomGroupKey);

    // // Q10 daily routine------------------------------------------------
    const Q_dailyRoutine = dailyRoutine(hasSymptomGroupKey, true, "Q10");
    survey.addExistingSurveyItem(Q_dailyRoutine, hasSymptomGroupKey);

    // // Q_BE_10b today-------------------------------------------------------
    const Q_dailyRoutineToday = dailyRoutineToday(hasSymptomGroupKey, Q_dailyRoutine.key, true, "Q_BE_10b");
    survey.addExistingSurveyItem(Q_dailyRoutineToday, hasSymptomGroupKey);

    // // Q10_BE_c daily routine days-----------------------------------------
    const Q_dailyRoutineDaysMissed = dailyRoutineDaysMissed(hasSymptomGroupKey, Q_dailyRoutine.key, true, "Q_BE_10c");
    survey.addExistingSurveyItem(Q_dailyRoutineDaysMissed, hasSymptomGroupKey);

    // // Q11 think cause of symptoms --------------------------------------
    const Q_causeOfSymptoms = InfluenzanetWeekly.causeOfSymptoms(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_causeOfSymptoms, hasSymptomGroupKey);

    // // Qcov_BE_16 test -----------------------------------------------------
    const Q_SymptomImpliedCovidTest = SymptomImpliedCovidTest(hasSymptomGroupKey, true, "Qcov_BE_16");
    survey.addExistingSurveyItem(Q_SymptomImpliedCovidTest, hasSymptomGroupKey);

    // // Qcov_BE_7 Covid 19 habits change question ------------------------------------------------------
    const Q_covidHabits = covidHabitsChange(hasSymptomGroupKey, false, "Qcov_BE_7");
    survey.addExistingSurveyItem(Q_covidHabits, hasSymptomGroupKey);

    const surveyEndText = surveyEnd(rootKey);
    survey.addExistingSurveyItem(surveyEndText, rootKey);

    return survey.getSurvey();
}

export default weekly;

/**
 * SYMPTOMS: multiple choice question about symptoms
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const symptomps = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_1'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Had u sinds de vorige vragenlijst één of meerdere van deze klachten/symptomen (of in de afgelopen 7 dagen indien dit uw eerste bezoek is)?"],
            ["fr-be", "Depuis le dernier questionnaire, avez-vous ressenti un ou plusieurs des troubles médicaux / des symptômes détaillés ci-dessous ?"],
            ["de-be", "Hatten Sie seit der letzten Fragen eines oder mehrere dieser Beschwerden/Symptome (oder in den vergangenen 7 Tagen, wenn dieser Ihr erster Besuch ist)?"],
            ["en", "Have you had any of the following symptoms since your last visit (or in the past week, if this is your first visit)?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Het belangrijkste onderdeel van deze enquête is het opvolgen van de door u gerapporteerde symptomen."],
                    ["fr-be", "La partie la plus importante de cette enquête a trait au suivi des symptômes que vous avez signalés."],
                    ["de-be", "Der wichtigste Teil dieser Umfrage ist das Verfolgen der von Ihnen gemeldeten Symptome."],
                    ["en", "The most important part of this study is about following up on the symptoms you have reported."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Voor mensen met chronische (langdurige) ziekten, vink alleen veranderingen in symptomen aan. Dus als u bijvoorbeeld chronische kortademigheid heeft, vink dit vakje dan alleen aan als dit recentelijk erger is geworden. Meerdere antwoorden mogelijk."],
                    ["fr-be", "Pour les personnes souffrant de maladies chroniques (de longue durée), ne cochez que les changements au niveau des symptômes. Ainsi, si vous souffrez d'un essoufflement chronique, ne cochez cette case que si ce symptôme s'est récemment aggravé. Plusieurs réponses sont possibles."],
                    ["de-be", "Für Menschen mit chronischen (längeren) Krankheiten kreuzen Sie bitte nur Veränderungen ihrer Symptome an. Mehrere Antworten sind möglich."],
                    ["en", "If you suffer from chronic illness, only indicate symptoms that have changed. For example, if you experience chronic shortness of breath, only mark this symptom if it has recently gotten worse. Multiple answers possible."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk. Voor mensen met chronische (langdurige) ziekten, vink alleen veranderingen in symptomen aan. Dus als u bijvoorbeeld chronische kortademigheid heeft, vink dit vakje dan alleen aan als dit recentelijk erger is geworden.'],
                ["fr-be", "Plusieurs réponses sont possibles. Pour les personnes souffrant de maladies chroniques (de longue durée), ne cochez que les changements au niveau des symptômes. Ainsi, si vous souffrez d'un essoufflement chronique, ne cochez cette case que si ce symptôme s'est récemment aggravé."],
                ["de-be", "Mehrere Antworten möglich. Für Menschen mit chronischen (längeren) Krankheiten kreuzen Sie bitte nur Veränderungen ihrer Symptome an."],
                ["en", "Multiple answers possible. If you suffer from chronic illness, only indicate symptoms that have changed. For example, if you experience chronic shortness of breath, only mark this symptom if it has recently gotten worse."],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "Nee, geen van deze symptomen/klachten"],
                ["fr-be", "Non, aucun de ces symptômes / de ces troubles médicaux"],
                ["de-be", "Nein, keines dieser Symptome/Beschwerden"],
                ["en", "No symptoms"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koorts"],
                ["fr-be", "De la fièvre"],
                ["de-be", "Fieber"],
                ["en", "Fever"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koude rillingen"],
                ["fr-be", "Des frissons"],
                ["de-be", "Schüttelfrost"],
                ["en", "Chills"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Loopneus of verstopte neus"],
                ["fr-be", "Un nez qui coule ou un nez bouché"],
                ["de-be", "Laufende oder verstopfte Nase"],
                ["en", "Runny or blocked nose"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ['nl-be', "Niezen"],
                ["fr-be", "Des éternuements"],
                ["de-be", "Niesen"],
                ["en", "Sneezing"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Keelpijn"],
                ["fr-be", "Un mal de gorge"],
                ["de-be", "Halsschmerzen"],
                ["en", "Sore throat"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoesten"],
                ["fr-be", "De la toux"],
                ["de-be", "Husten"],
                ["en", "Cough"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Kortademig (snel buiten adem)"],
                ["fr-be", "Des difficultés respiratoires (rapidement à court de souffle)"],
                ["de-be", "Kurzatmig (schnell außer Atem)"],
                ["en", "Shortness of breath"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoofdpijn"],
                ["fr-be", "Un mal de tête"],
                ["de-be", "Kopfschmerzen"],
                ["en", "Headache"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                ["fr-be", "Des douleurs musculaires/articulaires (non liées au sport)"],
                ["de-be", "Muskelschmerzen/Gelenkschmerzen (nicht mit Sport zusammenhängend)"],
                ["en", "Muscle/joint pain"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Pijn op de borst"],
                ["fr-be", "Des douleurs thoraciques"],
                ["de-be", "Brustschmerzen"],
                ["en", "Chest pain"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Vermoeid en lamlendig (algehele malaise)"],
                ["fr-be", "Une sensation de fatigue et de léthargie (malaise général)"],
                ["de-be", "Ermüdet und (körperlich) erschöpft (allgemeines Unwohlsein)"],
                ["en", "Feeling tired or exhausted (malaise)"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verminderde eetlust"],
                ["fr-be", "Une perte d'appétit"],
                ["de-be", "Verminderter Appetit"],
                ["en", "Loss of appetite"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verkleurd slijm ophoesten"],
                ["fr-be", "L’expectoration de mucus coloré"],
                ["de-be", "Verfärbten Schleim aushusten"],
                ["en", "Coloured sputum/phlegm"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Waterige of bloeddoorlopen ogen"],
                ["fr-be", "Des yeux larmoyants ou rouges"],
                ["de-be", "Wässrige oder blutunterlaufene Augen"],
                ["en", "Watery, bloodshot eyes"],
            ])
        },
        {
            key: '15', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Misselijkheid"],
                ["fr-be", "Des nausées"],
                ["de-be", "Unwohlsein"],
                ["en", "Nausea"],
            ])
        },
        {
            key: '16', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Overgeven/braken"],
                ["fr-be", "Des envies de vomir / des vomissements"],
                ["de-be", "Übergeben / Erbrechen"],
                ["en", "Vomiting"],
            ])
        },
        {
            key: '17', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Diarree"],
                ["fr-be", "De la diarrhée"],
                ["de-be", "Durchfall (Diarrhö)"],
                ["en", "Diarrhoea"],
            ])
        },
        {
            key: '18', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Buikpijn"],
                ["fr-be", "Des douleurs abdominales"],
                ["de-be", "Bauchschmerzen"],
                ["en", "Stomach ache"],
            ])
        },
        {
            key: '23', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van geur"],
                ["fr-be", "Une perte de l'odorat"],
                ["de-be", "Geruchsverlust"],
                ["en", "Loss of smell"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van smaak"],
                ["fr-be", "Une perte du goût"],
                ["de-be", "Geschmacksverlust"],
                ["en", "Loss of taste"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Bloedneus"],
                ["fr-be", "Un saignement de nez"],
                ["de-be", "Nasenbluten"],
                ["en", "Nose bleed"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Huiduitslag"],
                ["fr-be", "Une éruption cutanée"],
                ["de-be", "Hautausschlag"],
                ["en", "Rash"],
            ])
        },
        {
            key: '24', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verwardheid"],
                ["fr-be", "Un état confusionnel"],
                ["de-be", "Verwirrtheit"],
                ["en", "Confusion"],
            ])
        },
        {
            key: '19', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
                ["en", "Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * CONSENT FOR SYMPTOMS QUESTIONS: single choice question to get consent for further questions on symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const consentForSymptoms = (parentKey: string, keySymptomsQuestion: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_1_2'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u bereid om meer informatie te geven met betrekking tot de door u gerapporteerde symptomen? Dit zal 5-10 minuten van uw tijd in beslag nemen."],
            ["fr-be", "Êtes-vous disposé(e) à fournir de plus amples informations concernant les symptômes que vous avez signalés ? Cela vous prendra 5 à 10 minutes de votre temps."],
            ["de-be", "Sind Sie bereit, in Bezug auf die von Ihnen gemeldeten Symptome weitere Informationen zu erteilen? Das wird 5-10 Minuten Ihrer Zeit in Beschlag nehmen."],
            ["en", "Are you willing to provide further information regarding the symptoms you have reported? This will take 5 to 10 minutes."],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasOnlyKeysOtherThan', keySymptomsQuestion, [responseGroupKey, multipleChoiceKey].join('.'), '0')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten of je bereid bent de vervolgvragen te beantwoorden. Uw antwoorden op de vervolgvragen kunnen ons onderzoek helpen."],
                    ["fr-be", "Nous voulons savoir si vous êtes prêt à répondre aux questions de suivi. Vos réponses aux questions de suivi peuvent aider notre enquête."],
                    ["de-be", "Wir möchten wissen, ob Sie bereit sind, die Anschlussfragen zu beantworten. Ihre Antworten auf die Anschlussfragen können unsere Untersuchung unterstützen."],
                    ["en", "We want to know if you are willing to answer the follow-up questions. Your answers to the follow-up questions may assist our research."],
                ]),
                //style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        }
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * TEST COVID-19: single choice question about COVID-19  test
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covidTest = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_1_3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u sinds de vorige vragenlijst een COVID-19 test laten uitvoeren (of in de afgelopen 7 dagen indien dit uw eerste bezoek is)?"],
            ["fr-be", "Avez-vous passé un test de dépistage du coronavirus depuis le dernier questionnaire (ou au cours des 7 derniers jours s'il s'agit de votre première visite) ?"],
            ["de-be", "Haben Sie seit der letzten Fragen einen COVID-19-Test durchführen lassen (oder in den vergangenen 7 Tagen, wenn dieser Ihr erster Besuch ist)?"],
            ["en", "Have you been tested for coronavirus since the last questionnaire (or within the past 7 days if this is your first visit)?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten hoe COVID-19 zich verspreidt in de bevolking."],
                    ["fr-be", "Nous voulons savoir comment le coronavirus se propage au sein de la population."],
                    ["de-be", "Wir möchten wissen, wie Covid-19 sich in der Bevölkerung verbreitet."],
                    ["en", "We want to understand how the coronavirus is spreading within the population."],
                ]),
                //style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * REASON COVID-19 test: single choice question about COVID-19  test
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const reasonTest = (parentKey: string, keycovidTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_1_4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat was de reden dat u een COVID-19 test liet uitvoeren?"],
            ["fr-be", "Pour quelle raison avez-vous effectué un test de dépistage du coronavirus ?"],
            ["de-be", "Was war der Grund dafür, dass Sie einen COVID-19-Test durchführen ließen?"],
            ["en", "Why are you being tested for coronavirus?"],
        ]))
    );

    // CONDITION
    if (keycovidTest) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keycovidTest, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord zo precies mogelijk."],
                    ["fr-be", "Répondez de la manière la plus précise possible."],
                    ["de-be", "Bitte antworten Sie so genau wie möglich."],
                    ["en", "Answer as precisely as possible."],
                ]),
                //style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "Vanwege mijn symptomen"],
                ["fr-be", "En raison de mes symptômes"],
                ["de-be", "Aufgrund meiner Symptome"],
                ["en", "Because of my symptoms"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege symptomen of een positieve test bij één van mijn huisgenoten"],
                ["fr-be", "En raison de symptômes ou d'un test positif auprès de l'une des personnes vivant avec moi"],
                ["de-be", "Aufgrund von Symptomen oder einem positiven Test bei einem meiner Mitbewohner (Hausgenossen)"],
                ["en", "Because a person who lives with me experienced symptoms or had a positive coronavirus test"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege symptomen of een positieve test bij één van mijn contacten buitenshuis"],
                ["fr-be", "En raison de symptômes ou d'un test positif auprès de l'un de mes contacts extérieurs"],
                ["de-be", "Aufgrund von Symptomen oder einem positiven Test bei einem meiner Kontakte außerhalb des Hauses"],
                ["en", "Because one of my external contacts experienced symptoms or had a positive coronavirus test"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn terugkeer uit een risicogebied"],
                ["fr-be", "En raison de mon retour d'une zone à risque"],
                ["de-be", "Aufgrund meiner Rückkehr aus einem Risikogebiet"],
                ["en", "Because I returned from a risk area"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn deelname aan een risico-activiteit (vliegreis, evenement, ...)"],
                ["fr-be", "En raison de ma participation à une activité à risque (un voyage en avion, un événement, etc.)"],
                ["de-be", "Aufgrund meiner Teilnahme an einer Risiko-Aktivität (Flugreise, Veranstaltung, Event usw.)"],
                ["en", "Because I took part in a high-risk activity (a plane trip, an event, etc.)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn beroep"],
                ["fr-be", "En raison de ma profession"],
                ["de-be", "Aufgrund meines Berufs"],
                ["en", "Because of my profession"],
            ])
        },
        {
            key: '6', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
                ["en", "Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * DATE COVID-19 test: date COVID-19 test
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dateTest = (parentKey: string, keycovidTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_1_5'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wanneer heeft u een test laten uitvoeren voor COVID-19? Als u de datum niet meer precies weet, mag u deze schatten."],
            ["fr-be", "Quand avez-vous fait réaliser un test de dépistage du coronavirus ? Si vous ne vous souvenez pas (plus) de la date exacte, vous pouvez l'estimer."],
            ["de-be", "Wann haben Sie einen Test auf COVID-19 durchführen lassen? Wenn Sie das Datum nicht mehr genau wissen, dürfen Sie es schätzen."],
            ["en", "When did you get tested for the coronavirus? If you don't remember the exact date, please give an estimate."],
        ]))
    );

    // CONDITION
    if (keycovidTest) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keycovidTest, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    //

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -5184000) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            description: new Map([
                ["nl-be", "Kies een datum"],
                ["fr-be", "Choisissez la date"],
                ["de-be", "Datum auswählen"],
                ["en", "Choose date"],
            ]),
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],

            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * DURATION COVID-19 TEST: duration since symptoms untill COVID-19 test
 * TO DO: fix dropdown menu
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const durationTest = (parentKey: string, keycovidTest?: string, keyreasonTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_16e'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoe snel na de start van uw symptomen/klachten heeft u een COVID-19 test kunnen laten uitvoeren?"],
            ["fr-be", "Combien de temps après le début de vos symptômes/plaintes avez-vous pu passer un test de dépistage du coronavirus ?"],
            ["de-be", "Wie schnell nach dem Beginn Ihrer Symptome/Beschwerden konnten Sie einen COVID-19-Test durchführen lassen?"],
            ["en", "How long after the onset of your symptoms / complaints were you able to get tested for coronavirus?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keycovidTest, [responseGroupKey, singleChoiceKey].join('.'), '0'),
            expWithArgs('responseHasKeysAny', keyreasonTest, [responseGroupKey, multipleChoiceKey].join('.'), '0')
        )
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen onderzoeken hoeveel tijd er gaat tussen de ontwikkeling van de symptomen en het moment dat een persoon zich laat of kan laten testen."],
                    ["fr-be", "Nous voulons savoir combien de temps s'écoule entre l'apparition des symptômes et le moment où une personne se fait ou peut se faire tester."],
                    ["de-be", "Wir möchten untersuchen, wieviel Zeit zwischen der Entwicklung der Symptome und dem Moment vergeht, in dem eine Person sich testen lässt oder testen lassen kann."],
                    ["en", "We want to know how much time elapses between the onset of symptoms and the moment a person is or can get tested."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Maak een zo goed mogelijke inschatting."],
                    ["fr-be", "Faites une estimation de la manière la plus précise possible."],
                    ["de-be", "Nehmen Sie eine bestmögliche Einschätzung vor."],
                    ["en", "Please provide as precise an estimate as possible."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const ddOptions = initDropdownGroup('ddg', [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Op dezelfde dag"],
                ["fr-be", "Le jour même "],
                ["de-be", "Le jour même "],
                ["en", "The same day"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "1 dag"],
                ["fr-be", "1 jour"],
                ["de-be", "1 Tag"],
                ["en", "1 day"],
            ])
        },
        {
            key: '2', role: 'option', content: new Map([
                ["nl-be", "2 dagen"],
                ["fr-be", "2 jours"],
                ["de-be", "2 Tagen"],
                ["en", "2 days"],
            ]),
        },
        {
            key: '3', role: 'option', content: new Map([
                ["nl-be", "3 dagen"],
                ["fr-be", "3 jours"],
                ["de-be", "3 Tagen"],
                ["en", "3 days"],
            ]),
        },
        {
            key: '4', role: 'option', content: new Map([
                ["nl-be", "4 dagen"],
                ["fr-be", "4 jours"],
                ["de-be", "4 Tagen"],
                ["en", "4 days"],
            ]),
        },
        {
            key: '5', role: 'option', content: new Map([
                ["nl-be", "5 dagen"],
                ["fr-be", "5 jours"],
                ["de-be", "5 Tagen"],
                ["en", "5 days"],
            ]),
        },
        {
            key: '6', role: 'option', content: new Map([
                ["nl-be", "6 dagen"],
                ["fr-be", "6 jours"],
                ["de-be", "6 Tagen"],
                ["en", "6 days"],
            ]),
        },
        {
            key: '7', role: 'option', content: new Map([
                ["nl-be", "7 dagen"],
                ["fr-be", "7 jours"],
                ["de-be", "7 Tagen"],
                ["en", "7 days"],
            ]),
        },
        {
            key: '8', role: 'option', content: new Map([
                ["nl-be", "meer dan 7 dagen"],
                ["fr-be", "plus de 7 jours"],
                ["de-be", "mehr als 7 Tage"],
                ["en", "more than 7 days"],
            ]),
        },
        {
            key: '99', role: 'option', content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],

            ])
        },
        // {
        //     key: '1', role: 'numberInput',
        //     //properties:{min:0,max:14},
        //     description: new Map([
        //         ["nl-be", "Dagen"],
        //         ["fr-be", "Jours"],
        //         ["de-be", "Tage"],
        //         ["en", "Days"],
        //     ])
        // },
    ]);

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent(ddOptions, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * RESULT COVID-19 TEST: result COVID-19 test
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const resultTest = (parentKey: string, keycovidTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_16b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u de COVID-19 testresultaten reeds ontvangen?"],
            ["fr-be", "Avez-vous déjà reçu les résultats du test de dépistage du coronavirus ?"],
            ["de-be", "Haben Sie die COVID-19-Testergebnisse bereits erhalten?"],
            ["en", "Have you received the results of your coronavirus test?"],
        ]))
    );

    // CONDITION
    if (keycovidTest) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keycovidTest, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten hoe COVID-19 zich verspreidt in de bevolking."],
                    ["fr-be", "Nous voulons savoir comment le coronavirus se propage au sein de la population."],
                    ["de-be", "Wir möchten wissen, wie COVID-19 sich in der Bevölkerung ausbreitet."],
                    ["en", "We want to understand how the coronavirus is spreading within the population."],
                ]),
                //style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, positief voor COVID-19"],
                ["fr-be", "Oui, positif au coronavirus"],
                ["de-be", "Ja, positiv auf COVID-19"],
                ["en", "Yes, the test is positive for coronavirus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ja, negatief voor COVID-19"],
                ["fr-be", "Oui, négatif au coronavirus"],
                ["de-be", "Ja, negativ auf COVID-19"],
                ["en", "Yes, the test is negative for coronavirus"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ja, niet-interpreteerbaar resultaat"],
                ["fr-be", "Oui, résultat non interprétable"],
                ["de-be", "Ja, nicht interpretierbares Ergebnis"],
                ["en", "Yes, the results are inconclusive"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik heb nog geen testresultaat"],
                ["fr-be", "Non, je n'ai pas encore reçu le résultat du test"],
                ["de-be", "Nein, ich habe noch kein Testergebnis"],
                ["en", "No, I have not yet received the test results"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Dat wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas le spécifier"],
                ["de-be", "Das möchte ich nicht angeben"],
                ["en", "I prefer not to specify"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * DURATION COVID-19 TEST RESULT: duration untill COVID-19 test result
 * TO DO: fix dropdown menu
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const durationTestResult = (parentKey: string, keycovidTest?: string, keyresultTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_16z'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoeveel dagen na het afnemen van de COVID-19 test kreeg u het resultaat?"],
            ["fr-be", "Combien de jours après avoir passé le test de dépistage du coronavirus avez-vous obtenu le résultat ?"],
            ["de-be", "Wie viele Tage nach der Abnahme des COVID-19-Tests erhielten Sie das Ergebnis?"],
            ["en", "How many days after being tested for the coronavirus did you receive the results? "],

        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keycovidTest, [responseGroupKey, singleChoiceKey].join('.'), '0'),
            expWithArgs('responseHasKeysAny', keyresultTest, [responseGroupKey, singleChoiceKey].join('.'), '1', '2', '3')
        )
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen onderzoeken hoeveel tijd er gaat tussen het afnemen van een COVID-19 test en het ontvangen van het testresultaat."],
                    ["fr-be", "Nous voulons savoir combien de temps s'écoule entre la réalisation d'un test de dépistage du coronavirus et la réception du résultat du test en question."],
                    ["de-be", "Wir möchten untersuchen, wieviel Zeit zwischen dem Abnehmen eines COVID-19-Tests und dem Erhalt des Testergebnisses vergeht."],
                    ["en", "We want to know how much time elapses between the moment a coronavirus test is carried out and the results for that test are received."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Maak een zo goed mogelijke inschatting."],
                    ["fr-be", "Veuillez faire une estimation la plus précise possible."],
                    ["de-be", "Nehmen Sie eine bestmögliche Einschätzung vor."],
                    ["en", "Please provide as precise an estimate as possible."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const ddOptions = initDropdownGroup('ddg', [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Op dezelfde dag"],
                ["fr-be", "Le jour même "],
                ["de-be", "Le jour même "],
                ["en", "The same day"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "1 dag"],
                ["fr-be", "1 jour"],
                ["de-be", "1 Tag"],
                ["en", "1 day"],
            ])
        },
        {
            key: '2', role: 'option', content: new Map([
                ["nl-be", "2 dagen"],
                ["fr-be", "2 jours"],
                ["de-be", "2 Tagen"],
                ["en", "2 days"],
            ]),
        },
        {
            key: '3', role: 'option', content: new Map([
                ["nl-be", "3 dagen"],
                ["fr-be", "3 jours"],
                ["de-be", "3 Tagen"],
                ["en", "3 days"],
            ]),
        },
        {
            key: '4', role: 'option', content: new Map([
                ["nl-be", "4 dagen"],
                ["fr-be", "4 jours"],
                ["de-be", "4 Tagen"],
                ["en", "4 days"],
            ]),
        },
        {
            key: '5', role: 'option', content: new Map([
                ["nl-be", "5 dagen"],
                ["fr-be", "5 jours"],
                ["de-be", "5 Tagen"],
                ["en", "5 days"],
            ]),
        },
        {
            key: '6', role: 'option', content: new Map([
                ["nl-be", "6 dagen"],
                ["fr-be", "6 jours"],
                ["de-be", "6 Tagen"],
                ["en", "6 days"],
            ]),
        },
        {
            key: '7', role: 'option', content: new Map([
                ["nl-be", "7 dagen"],
                ["fr-be", "7 jours"],
                ["de-be", "7 Tagen"],
                ["en", "7 days"],
            ]),
        },
        {
            key: '8', role: 'option', content: new Map([
                ["nl-be", "meer dan 7 dagen"],
                ["fr-be", "plus de 7 jours"],
                ["de-be", "mehr als 7 Tage"],
                ["en", "more than 7 days"],
            ]),
        },
        {
            key: '99', role: 'option', content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],

            ])
        },
        // {
        //     key: '1', role: 'numberInput',
        //     //properties:{min:0,max:14},
        //     description: new Map([
        //         ["nl-be", "Dagen"],
        //         ["fr-be", "Jours"],
        //         ["de-be", "Tage"],
        //         ["en", "Days"],
        //     ])
        // },
    ]);

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent(ddOptions, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * PCR TESTED CONTACTS COVID-19: single choice question about contact with PCR tested Covid19 patients
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pcrTestedContact = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "In de 14 dagen voor de start van uw symptomen, bent u in nauw contact geweest met één of meerdere personen die een positieve test hadden voor COVID-19 (deze persoon kan al dan niet symptomen vertonen)?"],
            ["fr-be", "Au cours des 14 jours précédant l'apparition de vos symptômes, avez-vous été en contact étroit avec une ou plusieurs personne(s) ayant obtenu un résultat positif au test de dépistage du coronavirus (cette personne peut présenter ou non des symptômes) ?"],
            ["de-be", "Waren Sie in den 14 Tagen vor dem Beginn Ihrer Symptome in engem Kontakt mit einer oder mehreren Personen, die einen positiven Test auf COVID-19 hatten (Diese Person kann Symptome aufweisen oder auch nicht!)?"],
            ["en", "During the 14 days before your symptoms appeared, were you  in close contact with one or more person(s) who tested positive for coronavirus (whether or not the person had symptoms)?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te onderzoeken hoe COVID-19 zich verspreidt in de algemene bevolking."],
                    ["fr-be", "Afin d'étudier la façon dont le coronavirus se propage au sein de la population générale."],
                    ["de-be", "Um zu untersuchen, wie sich COVID-19 in der allgemeinen Bevölkerung verbreitet."],
                    ["en", "In  order to study how the coronavirus spreads within the general population."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * HOUSEHOLD PCR TESTED CONTACT COVID-19: single choice question about household contacts who are PCR tested Covid19 patients
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pcrHouseholdContact = (parentKey: string, covid19ContactKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_3b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Behoort deze persoon of één van deze personen tot uw huishouden?"],
            ["fr-be", "Cette personne ou l'une de ces personnes fait-elle partie de votre ménage ou de votre foyer ?"],
            ["de-be", "Gehört diese Person oder eine dieser Personen zu Ihrem Haushalt?"],
            ["en", "Was this person or one of these persons a member of your household?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', covid19ContactKey, [responseGroupKey, singleChoiceKey].join('.'), '1'),
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "COVID-19 en griep verspreiden zich zeer binnenshuis."],
                    ["fr-be", "Le coronavirus et la grippe se propagent beaucoup à l'intérieur."],
                    ["de-be", "COVID-19 und Grippe verbreiten sich sehr stark im Hause."],
                    ["en", "The coronavirus and influenza spread quickly indoors."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Een lid van het huishouden wordt gedefinieerd als iemand (niet noodzakelijk verwant) die op hetzelfde adres woont als u en die de kookgelegenheid, woonkamer, zitkamer of eethoek deelt."],
                    ["fr-be", "Un membre du ménage ou du foyer est défini comme une personne (pas nécessairement apparentée) qui vit à la même adresse que vous, et qui partage la cuisine, le salon, la salle de séjour ou la salle à manger."],
                    ["de-be", "Ein Mitglied des Haushalts wird als jemand (nicht notwendigerweise verwandt) definiert, der an derselben Anschrift wie Sie wohnt und mit dem Sie die Kochgelegenheit, Wohnzimmer oder Essecke teilen."],
                    ["en", "A member of the household is defined as a person (not necessary a family member) who lives at the same address as you, and who shares the kitchen, living room, family room or dining room."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet"],
                ["fr-be", "Je ne sais pas"],
                ["de-be", "Ich weiß es nicht"],
                ["en", "I don’t know"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * CONTACT WITH SYMPTOMATIC PERSONS: single choice question about contact with people showing covid symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covidSymptomsContact = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_8'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "In de 14 dagen voor de start van uw symptomen, bent u in nauw contact geweest met iemand die symptomen van COVID-19 vertoonde?"],
            ["fr-be", "Au cours des 14 jours précédant l'apparition de vos symptômes, avez-vous été en contact étroit avec une personne présentant des symptômes du coronavirus ?"],
            ["de-be", "Waren Sie in den 14 Tagen vor dem Beginn Ihrer Symptome in engem Kontakt mit jemandem, der die Symptome von COVID-19 aufwies?"],
            ["en", "During the 14 days before your symptoms appeared, were you in close contact with a person with coronavirus symptoms?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te onderzoeken hoe COVID-19 zich verspreidt in de algemene bevolking."],
                    ["fr-be", "Afin d'étudier la façon dont le coronavirus se propage au sein de la population générale."],
                    ["de-be", "Um zu untersuchen, wie sich COVID-19 in der allgemeinen Bevölkerung verbreitet."],
                    ["en", "In  order to study how the coronavirus spreads within the general population."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * HOUSEHOLD CONTACTS WITH PEOPLE SHOWING COVID-19 SYMPTOMS: single choice question about household contacts who are showing covid19 symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covidHouseholdContact = (parentKey: string, covid19ContactKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_8b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Behoort deze persoon of één van deze personen tot uw huishouden?"],
            ["fr-be", "Cette personne ou l'une de ces personnes fait-elle partie de votre ménage ou de votre foyer ?"],
            ["de-be", "Gehört diese Person oder eine dieser Personen zu Ihrem Haushalt?"],
            ["en", "Was this person or one of these persons a member of your household?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', covid19ContactKey, [responseGroupKey, singleChoiceKey].join('.'), '1'),
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "COVID-19 en griep verspreiden zich snel binnenshuis."],
                    ["fr-be", "Le coronavirus et la grippe se propagent beaucoup à l'intérieur."],
                    ["de-be", "COVID-19 und Grippe verbreiten sich sehr stark im Hause."],
                    ["en", "The coronavirus and influenza spread quickly indoors."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Een lid van het huishouden wordt gedefinieerd als iemand (niet noodzakelijk verwant) die op hetzelfde adres woont als u en die de kookgelegenheid, woonkamer, zitkamer of eethoek deelt."],
                    ["fr-be", "Un membre du ménage ou du foyer est défini comme une personne (pas nécessairement apparentée) qui vit à la même adresse que vous, et qui partage la cuisine, le salon, la salle de séjour ou la salle à manger."],
                    ["de-be", "Ein Mitglied des Haushalts wird als jemand (nicht notwendigerweise verwandt) definiert, der an derselben Anschrift wie Sie wohnt und mit dem Sie die Kochgelegenheit, Wohnzimmer oder Essecke teilen."],
                    ["en", "A member of the household is defined as a person (not necessary a family member) who lives at the same address as you, and who shares the kitchen, living room, family room or dining room."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet"],
                ["fr-be", "Je ne sais pas"],
                ["de-be", "Ich weiß es nicht"],
                ["en", "I don’t know"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * VISITED MEDICAL SERVICE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedMedicalService = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_7';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u medische hulp gezocht vanwege uw symptomen/klachten? En zo ja, waar?"],
            ["fr-be", "Avez-vous consulté un médecin en raison de vos symptômes/plaintes ? Et si oui, où ?"],
            ["de-be", "Haben Sie wegen Ihrer Symptome/Beschwerden ärztliche Hilfe aufgesucht? Und wenn ja, wo?"],
            ["en", "Did you consult medical assistance because of your symptoms / complaints? If yes, where?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
                    ["fr-be", "Pour connaître le pourcentage de personnes présentant certains symptômes qui consultent un médecin."],
                    ["de-be", "Um auszusuchen, welcher Anteil von Menschen mit bestimmten Beschwerden ärztliche Hilfe aufsuchen."],
                    ["en", "To determine the percentage of people with certain symptoms who consult a doctor."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Selecteer alle relevante vormen van medische hulp die u heeft bezocht. Wanneer u nog niet bent geweest maar wel een afspraak heeft gemaakt, selecteer dan de laaste optie."],
                    ["fr-be", "Sélectionnez toutes les formes d'aide médicale pertinentes que vous avez consultées. Si vous n'avez pas encore été chez un médecin, mais que vous avez fixé un rendez-vous, sélectionnez la dernière option."],
                    ["de-be", "Wählen Sie alle relevanten Formen medizinischer Hilfe aus, die Sie besucht haben. Wenn Sie noch nicht dort gewesen sind, aber einen Termin vereinbart haben, dann wählen Sie die letzte Alternative."],
                    ["en", "Select all of the types of relevant medical assistance you consulted. If you have not yet been to a doctor, but you have made an appointment, select the last option."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', "Meerdere antwoorden mogelijk"],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Nee, ik heb geen medische hulp gezocht"],
                ["fr-be", "Non, je n'ai pas consulté un médecin"],
                ["de-be", "Nein, ich habe keine ärztliche Hilfe aufgesucht"],
                ["en", "No, I did not consult a doctor"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, fysiek bij de huisarts of huisarts assistent"],
                ["fr-be", "Oui, physiquement au cabinet du médecin ou de l'assistant"],
                ["de-be", "Ja, physisch beim Hausarzt oder beim Assistenten des Hausarztes"],
                ["en", "Yes, in person at the doctor or assistant's office "],
            ])
        },
        {
            key: '31', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, fysiek bij de spoedafdeling van het ziekenhuis"],
                ["fr-be", "Oui, physiquement au service des urgences de l'hôpital"],
                ["de-be", "Ja, physisch in der Notaufnahme des Krankenhauses"],
                ["en", "Yes, in person at the hospital emergency department"],
            ])
        },
        {
            key: '32', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, fysiek bij de huisartsenwachtpost"],
                ["fr-be", "Oui, physiquement au service de garde de médecine générale"],
                ["de-be", "Ja, physisch beim Wachtposten des Hausarztes"],
                ["en", "Yes, in person at the on-call general medical service "],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, maar enkel telefonisch of via e-mail contact met huisdokter, receptioniste, verpleger/verpleegster"],
                ["fr-be", "Oui, mais seulement par le biais d'un contact téléphonique ou d'un courrier électronique avec le médecin, la réceptionniste, l'infirmier/l'infirmière"],
                ["de-be", "Ja, aber nur telefonisch oder über einem E-Mail-Kontakt mit Hausarzt, Empfangsdame, Krankenpfleger/Krankenschwester"],
                ["en", "Yes, but only through telephone or email contact with the doctor, receptionist, nurse "],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, ik ben opgenomen in het ziekenhuis"],
                ["fr-be", "Oui, j'ai été admis(e) à l'hôpital"],
                ["de-be", "Ja, ich wurde in das Krankenhaus aufgenommen"],
                ["en", "Yes, I was admitted into the hospital"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, ik heb andere medische hulp gezocht"],
                ["fr-be", "Oui, j'ai fait appel à une autre aide médicale"],
                ["de-be", "Ja, ich habe eine andere ärztliche Hilfe aufgesucht"],
                ["en", "Yes, I consulted another healthcare assistance"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Nog niet, maar ik heb een afspraak gemaakt"],
                ["fr-be", "Pas encore, mais j'ai pris un rendez-vous"],
                ["de-be", "Noch nicht, aber ich habe eine Verabredung gemacht"],
                ["en", "Not yet, but I have taken an appointment"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * WHEN VISITED MEDICAL SERVICE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ: reference to quesiton if visited any medical service
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedMedicalServiceWhen = (parentKey: string, keyVisitedMedicalServ: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_7b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoe snel na de start van uw symptomen/klachten heeft u voor de EERSTE keer medische hulp gezocht?"],
            ["fr-be", "Combien de temps après l'apparition de vos symptômes/plaintes avez-vous consulté un médecin pour la PREMIÈRE fois ?"],
            ["de-be", "Wie schnell nach dem Beginn Ihrer Symptome/Beschwerden haben Sie zum ERSTEN Mal ärztliche Hilfe aufgesucht?"],
            ["en", "How soon after your symptoms appeared did you first visit this medical service?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasOnlyKeysOtherThan', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0', '5')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om uit te zoeken hoe snel mensen met klachten worden gezien door een medische hulpverlener/specialist."],
                    ["fr-be", "Pour savoir à quelle vitesse les personnes présentant des symptômes sont vues par un médecin/spécialiste/professionnel de la santé."],
                    ["de-be", "Um festzustellen, wie schnell Menschen mit Beschwerden von einem Arzthelfer/Facharzt gesehen werden."],
                    ["en", "To know how quickly people with symptoms are seen by a doctor/specialist/health professional."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Geef alleen het aantal dagen van het begin van de klachten tot uw EERSTE bezoek aan de desbetreffende medische hulpverlener/specialist."],
                    ["fr-be", "Indiquez simplement le nombre de jours écoulés entre le début des symptômes et votre PREMIÈRE visite auprès du médecin/spécialiste/professionnel de la santé en question."],
                    ["de-be", "Bitte geben Sie nur die Anzahl der Tage vom Beginn der Beschwerden bis zu Ihrem ERSTEN Besuch bei dem betreffenden Arzthelfer/Spezialisten an."],
                    ["en", "Simply indicate how many days passed between the onset of symptoms and your FIRST visit to the doctor/specialist/health professional."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Selecteer het juiste aantal dagen'],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", ""],
            ])),
    }, rg?.key);
    const ddOptions: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup', items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["nl-be", "Op dezelfde dag als de eerste klachten"],
                    ["fr-be", "Le même jour que l’apparition des premiers symptômes"],
                    ["de-be", "An demselben Tag wie die ersten Beschwerden"],
                    ["en", "Same day"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["nl-be", "1 dag"],
                    ["fr-be", "1 jour"],
                    ["de-be", "1 Tag"],
                    ["en", "1 day"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["nl-be", "2 dagen"],
                    ["fr-be", " 2 jours"],
                    ["de-be", "2 Tage"],
                    ["en", "2 days"],

                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["nl-be", "3 dagen"],
                    ["fr-be", "3 jours"],
                    ["de-be", "3 Tage"],
                    ["en", "3 days"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["nl-be", "4 dagen"],
                    ["fr-be", "4 jours"],
                    ["de-be", "4 Tage"],
                    ["en", "4 days"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["nl-be", "5 dagen"],
                    ["fr-be", "5 jours"],
                    ["de-be", "5 Tage"],
                    ["en", "5 days"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["nl-be", "6 dagen"],
                    ["fr-be", "6 jours"],
                    ["de-be", "6 Tage"],
                    ["en", "6 days"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["nl-be", "7 dagen"],
                    ["fr-be", "7 jours"],
                    ["de-be", "7 Tage"],
                    ["en", "7 days"],
                ]),
            },
            {
                key: '8', role: 'option', content: new Map([
                    ["nl-be", "8 dagen"],
                    ["fr-be", "8 jours"],
                    ["de-be", "8 Tage"],
                    ["en", "8 days"],
                ]),
            },
            {
                key: '9', role: 'option', content: new Map([
                    ["nl-be", "9 dagen"],
                    ["fr-be", "9 jours"],
                    ["de-be", "9 Tage"],
                    ["en", "9 days"],
                ]),
            },
            {
                key: '10', role: 'option', content: new Map([
                    ["nl-be", "10 dagen"],
                    ["fr-be", "10 jours"],
                    ["de-be", "10 Tage"],
                    ["en", "10 days"],
                ]),
            },
            {
                key: '11', role: 'option', content: new Map([
                    ["nl-be", "11 dagen"],
                    ["fr-be", "11 jours"],
                    ["de-be", "11 Tage"],
                    ["en", "11 days"],
                ]),
            },
            {
                key: '12', role: 'option', content: new Map([
                    ["nl-be", "12 dagen"],
                    ["fr-be", "12 jours"],
                    ["de-be", "12 Tage"],
                    ["en", "12 days"],
                ]),
            },
            {
                key: '13', role: 'option', content: new Map([
                    ["nl-be", "13 dagen"],
                    ["fr-be", "13 jours"],
                    ["de-be", "13 Tage"],
                    ["en", "13 days"],
                ]),
            },
            {
                key: '14', role: 'option', content: new Map([
                    ["nl-be", "14 dagen"],
                    ["fr-be", "14 jours"],
                    ["de-be", "14 Tage"],
                    ["en", "14 days"],
                ]),
            },
            {
                key: '15', role: 'option', content: new Map([
                    ["nl-be", "meer dan 14 dagen"],
                    ["fr-be", "+ de 14 jours"],
                    ["de-be", "14+ Tage"],
                    ["en", "14+ days"],
                ]),
            },
            {
                key: '16', role: 'option', content: new Map([
                    ["nl-be", "Ik weet het niet (meer)"],
                    ["fr-be", "Je ne sais pas (plus)"],
                    ["de-be", "Ich weiß es nicht (mehr)"],
                    ["en", "I don’t know/can’t remember"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["nl-be", "Medische hulp"],
                        ["fr-be", "Aide médicale"],
                        ["de-be", "ärztliche Hilfe"],
                        ["en", "Healthcare assistance"],
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
                        ["nl-be", "Fysiek bij de huisarts of huisarts assistent"],
                        ["fr-be", "Physiquement au cabinet du médecin ou de l'assistant"],
                        ["de-be", "Physisch beim Hausarzt oder beim Assistenten des Hausarztes"],
                        ["en", "In person at the doctor or assistant's office "],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '1')
        },
        {
            key: 'r31', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Fysiek bij de spoedafdeling van het ziekenhuis"],
                        ["fr-be", "Physiquement au service des urgences de l'hôpital"],
                        ["de-be", "Physisch in der Notaufnahme des Krankenhauses"],
                        ["en", "In person at the hospital emergency department"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '31')
        },
        {
            key: 'r32', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Fysiek bij de huisartsenwachtpost"],
                        ["fr-be", "Physiquement au service de garde de médecine générale"],
                        ["de-be", "Physisch beim Wachtposten des Hausarztes"],
                        ["en", "In person at the on-call general medical service "],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '32')
        },
        {
            key: 'r6', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Telefonisch of via e-mail contact met huisdokter, receptioniste, verpleger/verpleegster"],
                        ["fr-be", "Seulement par le biais d'un contact téléphonique ou d'un courrier électronique avec le médecin, la réceptionniste, l'infirmier/l'infirmière"],
                        ["de-be", "Nur telefonisch oder über einem E-Mail-Kontakt mit Hausarzt, Empfangsdame, Krankenpfleger/Krankenschwester"],
                        ["en", "Only through telephone or email contact with the doctor, receptionist, nurse "],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '6')
        },
        {
            key: 'r2', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Ik ben opgenomen in het ziekenhuis"],
                        ["fr-be", "J'ai été admis(e) à l'hôpital"],
                        ["de-be", "Ich wurde in das Krankenhaus aufgenommen"],
                        ["en", "I was admitted into the hospital"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '2')
        },
        {
            key: 'r4', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Andere medische hulp."],
                        ["fr-be", "Autre aide médicale"],
                        ["de-be", "andere ärztliche Hilfe"],
                        ["en", "Another healthcare assistance"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '4')
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * WHY VISITED NO MEDICAL SERVICE
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedNoMedicalService = (parentKey: string, keyVisitedMedicalServ?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_18';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat zijn de voornaamste redenen dat u geen medische hulp zocht in verband met de gerapporteerde symptomen?"],
            ["fr-be", "Quelles sont les principales raisons pour lesquelles vous n'avez pas consulté un médecin pour les symptômes signalés ?"],
            ["de-be", "Was sind die wichtigsten Gründe dafür, dass Sie im Zusammenhang mit den gemeldeten Symptomen keine ärztliche Hilfe aufsuchten?"],
            ["en", "What is the main reason for which you did not contact any health professional for the symptoms you declared today?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om uit te zoeken waarom sommige mensen geen medische hulp zoeken."],
                    ["fr-be", "Pour savoir pourquoi certaines personnes ne consultent pas un médecin."],
                    ["de-be", "Um festzustellen, warum manche Menschen keine ärztliche Hilfe aufsuchen."],
                    ["en", "To understand why some people do not consult a doctor."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden mogelijk."],
                    ["fr-be", "Plusieurs réponses sont possibles."],
                    ["de-be", "Mehrere Antworten möglich."],
                    ["en", "Multiple answers are possible."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Mijn symptomen kwamen recent op."],
                ["fr-be", "Mes symptômes sont apparus récemment."],
                ["de-be", "Meine Symptome traten erst kürzlich auf."],
                ["en", "My symptoms appeared very recently"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Mijn symptomen zijn mild."],
                ["fr-be", "Mes symptômes sont légers."],
                ["de-be", "Meine Symptome sind mild."],
                ["en", "My symptoms are mild"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik heb deze symptomen vaker."],
                ["fr-be", "Je présente régulièrement ces symptômes."],
                ["de-be", "Ich habe diese Symptome öfter."],
                ["en", "I have these symptoms often"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik denk te weten wat ik heb en gebruik eigen medicatie."],
                ["fr-be", "Je pense que je sais ce dont je souffre, et j'ai recours à ma propre médication."],
                ["de-be", "Ich meine zu wissen, was ich habe, und verwende meine eigene Medikation."],
                ["en", "I think I know what I have and I use self-medication"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik denk dat er geen goede behandeling is voor mijn ziekte."],
                ["fr-be", "Je pense qu'il n'existe pas de bon traitement pour ma maladie."],
                ["de-be", "Ich denke, dass es keine gute Behandlung für meine Krankheit gibt."],
                ["en", "I think there is no effective treatment for the disease I have"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Het is te moeilijk om snel een afspraak te verkrijgen."],
                ["fr-be", "Il est trop difficile d'obtenir rapidement un rendez-vous."],
                ["de-be", "Es ist zu schwierig, schnell einen Termin zu bekommen."],
                ["en", "It is too hard to get an appointment quickly"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik heb onvoldoende tijd."],
                ["fr-be", "Je n'ai pas assez de temps."],
                ["de-be", "Ich habe nicht genug Zeit."],
                ["en", "I do not have time"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Omwille van financiële redenen."],
                ["fr-be", "Pour des raisons financières."],
                ["de-be", "Aus finanziellen Gründen."],
                ["en", "For financial reasons"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Omwille van angst voor de gevolgen als de dokter vermoedt dat ik COVID-19 heb."],
                ["fr-be", "Par crainte des conséquences si le médecin me suspecte d'avoir contracté le coronavirus."],
                ["de-be", "Aufgrund von Angst vor den Folgen, wenn der Arzt vermutet, dass ich COVID-19 habe."],
                ["en", "For fear of consequences if the doctor thinks I have COVID-19"],
            ])
        },
        {
            key: '10', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
                ["en", "Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet/verkies niet te antwoorden."],
                ["fr-be", "Je ne sais pas/je préfère ne pas répondre."],
                ["de-be", "Ich weiss es nicht/ziehe es vor, nicht zu antworten."],
                ["en", "I don't know/can't remember"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);


    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * FEAR CONSEQUENCES
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const consFear = (parentKey: string, keyVisitedMedicalServ?: string, keyvisitedNoMedicalService?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_18b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Kan u aangeven welke gevolgen u vreest?"],
            ["fr-be", "Pouvez-vous indiquer les conséquences que vous craignez ?"],
            ["de-be", "Können Sie angeben, welche Folgen Sie fürchten?"],
            ["en", "Can you specify which consequences you mainly fear? "],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0'),
            expWithArgs('responseHasKeysAny', keyvisitedNoMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '9')
        )
    );

    // INFO POPUP
    // None

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik moet een test laten uitvoeren."],
                ["fr-be", "Je dois me faire tester."],
                ["de-be", "Ich muss einen Test durchführen lassen."],
                ["en", "Have to do a diagnostic test."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik moet in quarantaine."],
                ["fr-be", "Je dois me mettre en quarantaine."],
                ["de-be", "Ich muss in Quarantäne gehen."],
                ["en", "Have to be isolated."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik moet stoppen met werken."],
                ["fr-be", "Je dois arrêter de travailler."],
                ["de-be", "Ich muss mit dem Arbeiten aufhören."],
                ["en", "Have to stop working."],
            ])
        },
        {
            key: '45', role: 'option',
            content: new Map([
                ["nl-be", "Veroordeeld worden door anderen."],
                ["fr-be", "Le jugement des autres."],
                ["de-be", "Durch andere verurteilt werden."],
                ["en", "To be judged by others."],
            ])
        },
        {
            key: '6', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
                ["en", "Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);


    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * DURATION HOSPITAL
 * TO D0: Fix drop down
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ: reference to quesiton if visited any medical service
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const durHosp = (parentKey: string, keyVisitedMedicalServ: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_7x';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoe lang ben je gehospitaliseerd geweest?"],
            ["fr-be", "Combien de temps avez-vous été hospitalisé(e) ?"],
            ["de-be", "Wie lange waren Sie im Krankenhaus?"],
            ["en", "For how long were you hospitalised?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Wees alstublieft zo nauwkeurig mogelijk."],
                    ["fr-be", "Veuillez fournir la réponse la plus précise possible."],
                    ["de-be", "Bitte so genau wie möglich."],
                    ["en", "Answer as precisely as possible."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const ddOptions = initDropdownGroup('ddg', [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "1 dag"],
                ["fr-be", "1 jour"],
                ["de-be", "1 Tage"],
                ["en", "1 day"],
            ]),
        },
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "2 dagen"],
                ["fr-be", "2 jours"],
                ["de-be", "2 Tagen"],
                ["en", "2 days"],
            ]),
        },
        {
            key: '2', role: 'option', content: new Map([
                ["nl-be", "3 dagen"],
                ["fr-be", "3 jours"],
                ["de-be", "3 Tagen"],
                ["en", "3 days"],
            ]),
        },
        {
            key: '3', role: 'option', content: new Map([
                ["nl-be", "4 dagen"],
                ["fr-be", "4 jours"],
                ["de-be", "4 Tagen"],
                ["en", "4 days"],
            ]),
        },
        {
            key: '4', role: 'option', content: new Map([
                ["nl-be", "5 dagen"],
                ["fr-be", "5 jours"],
                ["de-be", "5 Tagen"],
                ["en", "5 days"],
            ]),
        },
        {
            key: '5', role: 'option', content: new Map([
                ["nl-be", "6 dagen"],
                ["fr-be", "6 jours"],
                ["de-be", "6 Tagen"],
                ["en", "6 days"],
            ]),
        },
        {
            key: '6', role: 'option', content: new Map([
                ["nl-be", "7 dagen"],
                ["fr-be", "7 jours"],
                ["de-be", "7 Tagen"],
                ["en", "7 days"],
            ]),
        },
        {
            key: '7', role: 'option', content: new Map([
                ["nl-be", "8 dagen"],
                ["fr-be", "8 jours"],
                ["de-be", "8 Tagen"],
                ["en", "8 days"],
            ]),
        },
        {
            key: '8', role: 'option', content: new Map([
                ["nl-be", "9 dagen"],
                ["fr-be", "9 jours"],
                ["de-be", "9 Tagen"],
                ["en", "9 days"],
            ]),
        },
        {
            key: '9', role: 'option', content: new Map([
                ["nl-be", "10 dagen"],
                ["fr-be", "10 jours"],
                ["de-be", "10 Tagen"],
                ["en", "10 days"],
            ]),
        },
        {
            key: '10', role: 'option', content: new Map([
                ["nl-be", "11 dagen"],
                ["fr-be", "11 jours"],
                ["de-be", "11 Tagen"],
                ["en", "11 days"],
            ]),
        },
        {
            key: '11', role: 'option', content: new Map([
                ["nl-be", "12 dagen"],
                ["fr-be", "12 jours"],
                ["de-be", "12 Tagen"],
                ["en", "12 days"],
            ]),
        },
        {
            key: '12', role: 'option', content: new Map([
                ["nl-be", "13 dagen"],
                ["fr-be", "13 jours"],
                ["de-be", "13 Tagen"],
                ["en", "13 days"],
            ]),
        },
        {
            key: '13', role: 'option', content: new Map([
                ["nl-be", "14 dagen"],
                ["fr-be", "14 jours"],
                ["de-be", "14 Tagen"],
                ["en", "14 days"],
            ]),
        },
        {
            key: '14', role: 'option', content: new Map([
                ["nl-be", "15 dagen"],
                ["fr-be", "15 jours"],
                ["de-be", "15 Tagen"],
                ["en", "15 days"],
            ]),
        },
        {
            key: '15', role: 'option', content: new Map([
                ["nl-be", "16 dagen"],
                ["fr-be", "16 jours"],
                ["de-be", "16 Tagen"],
                ["en", "16 days"],
            ]),
        },
        {
            key: '16', role: 'option', content: new Map([
                ["nl-be", "17 dagen"],
                ["fr-be", "17 jours"],
                ["de-be", "17 Tagen"],
                ["en", "17 days"],
            ]),
        },
        {
            key: '17', role: 'option', content: new Map([
                ["nl-be", "18 dagen"],
                ["fr-be", "18 jours"],
                ["de-be", "18 Tagen"],
                ["en", "18 days"],
            ]),
        },
        {
            key: '18', role: 'option', content: new Map([
                ["nl-be", "19 dagen"],
                ["fr-be", "19 jours"],
                ["de-be", "19 Tagen"],
                ["en", "19 days"],
            ]),
        },
        {
            key: '19', role: 'option', content: new Map([
                ["nl-be", "20 dagen"],
                ["fr-be", "20 jours"],
                ["de-be", "20 Tagen"],
                ["en", "20 days"],
            ]),
        },
        {
            key: '20', role: 'option', content: new Map([
                ["nl-be", "21 dagen"],
                ["fr-be", "21 jours"],
                ["de-be", "21 Tagen"],
                ["en", "21 days"],
            ]),
        },
        {
            key: '21', role: 'option', content: new Map([
                ["nl-be", "22 dagen"],
                ["fr-be", "22 jours"],
                ["de-be", "22 Tagen"],
                ["en", "22 days"],
            ]),
        },
        {
            key: '22', role: 'option', content: new Map([
                ["nl-be", "23 dagen"],
                ["fr-be", "23 jours"],
                ["de-be", "23 Tagen"],
                ["en", "23 days"],
            ]),
        },
        {
            key: '23', role: 'option', content: new Map([
                ["nl-be", "24 dagen"],
                ["fr-be", "24 jours"],
                ["de-be", "24 Tagen"],
                ["en", "24 days"],
            ]),
        },
        {
            key: '24', role: 'option', content: new Map([
                ["nl-be", "25 dagen"],
                ["fr-be", "25 jours"],
                ["de-be", "25 Tagen"],
                ["en", "25 days"],
            ]),
        },
        {
            key: '25', role: 'option', content: new Map([
                ["nl-be", "26 dagen"],
                ["fr-be", "26 jours"],
                ["de-be", "26 Tagen"],
                ["en", "26 days"],
            ]),
        },
        {
            key: '26', role: 'option', content: new Map([
                ["nl-be", "27 dagen"],
                ["fr-be", "27 jours"],
                ["de-be", "27 Tagen"],
                ["en", "27 days"],
            ]),
        },
        {
            key: '27', role: 'option', content: new Map([
                ["nl-be", "28 dagen"],
                ["fr-be", "28 jours"],
                ["de-be", "28 Tagen"],
                ["en", "28 days"],
            ]),
        },
        {
            key: '28', role: 'option', content: new Map([
                ["nl-be", "29 dagen"],
                ["fr-be", "29 jours"],
                ["de-be", "29 Tagen"],
                ["en", "29 days"],
            ]),
        },
        {
            key: '29', role: 'option', content: new Map([
                ["nl-be", "30 dagen"],
                ["fr-be", "30 jours"],
                ["de-be", "30 Tagen"],
                ["en", "30 days"],
            ]),
        },
        {
            key: '30', role: 'option', content: new Map([
                ["nl-be", "31-40 dagen"],
                ["fr-be", "31-40 jours"],
                ["de-be", "31-40 Tagen"],
                ["en", "31-40 days"],
            ]),
        },
        {
            key: '31', role: 'option', content: new Map([
                ["nl-be", "41-50 dagen"],
                ["fr-be", "41-50 jours"],
                ["de-be", "41-50 Tagen"],
                ["en", "41-50 days"],
            ]),
        },
        {
            key: '32', role: 'option', content: new Map([
                ["nl-be", "51-60 dagen"],
                ["fr-be", "51-60 jours"],
                ["de-be", "51-60 Tagen"],
                ["en", "51-60 days"],
            ]),
        },
        {
            key: '33', role: 'option', content: new Map([
                ["nl-be", "meer dan 60 dagen"],
                ["fr-be", "plus de 60 jours"],
                ["de-be", "mehr als 60 Tage"],
                ["en", "more than 60 days"],
            ]),
        },
    ]);

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['nl-be', "Selecteer het juiste aantal dagen"],
                ["fr-be", "Sélectionnez le nombre de jours"],
                ["de-be", "Wählen Sie die Anzahl der Tage"],
                ["en", "Select the number of days"],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(ddOptions, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * ICU addmission
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ: reference to quesiton if visited any medical service
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const addICU = (parentKey: string, keyVisitedMedicalServ: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_7y';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Ben je in ICU (afdeling intensieve zorgen) opgenomen?"],
            ["fr-be", "Avez-vous été admis(e) aux soins intensifs (ICU) ?"],
            ["de-be", "Waren Sie auf einer Intensivstation (ICU)?"],
            ["en", "Were you admitted to the intensive care unit (ICU)?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    //none

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '01', role: 'option',
            content: new Map([
                ["nl-be", "Ja, 1 keer"],
                ["fr-be", "Oui, une fois"],
                ["de-be", "Ja, ein Mal"],
                ["en", "Yes, one time"],
            ])
        },
        {
            key: '02', role: 'option',
            content: new Map([
                ["nl-be", "Ja, meerdere keren"],
                ["fr-be", "Oui, plusieurs fois"],
                ["de-be", "Ja, mehrere Male"],
                ["en", "Yes, several times"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * Coma
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ: reference to quesiton if visited any medical service
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const inComa = (parentKey: string, keyVisitedMedicalServ: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_7z';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Ben je in coma geweest?"],
            ["fr-be", "Avez-vous été dans le coma ?"],
            ["de-be", "Waren Sie im Koma?"],
            ["en", "Were you in a coma?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    //none

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * TOOK ANY MEDICATION
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const tookMedication = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_9';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u vanwege uw symptomen/klachten medicijnen gebruikt? En zo ja, welke?"],
            ["fr-be", "Avez-vous pris des médicaments en raison de vos symptômes / troubles médicaux ? Et si oui, lesquels ?"],
            ["de-be", "Haben Sie aufgrund Ihrer Symptome/Beschwerden Medikamente verwendet? Wenn ja, welche?"],
            ["en", "Did you take medication for these symptoms? "],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om uit te zoeken wie er medicatie neemt vanwege zijn/haar symptomen."],
                    ["fr-be", "Pour savoir qui prend des médicaments en raison de ces symptômes."],
                    ["de-be", "Um festzustellen, wie man Medikamente aufgrund seiner/ihrer Symptome einnimmt."],
                    ["en", "To know who takes medication due to their symptoms."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Geef alleen de medicatie aan die u gebruikt in verband met uw gerapporteerde klachten. Medicatie die u gebruikt voor een reeds gekende aandoening hoeft u niet te noemen."],
                    ["fr-be", "Veuillez n'indiquer que les médicaments que vous prenez en rapport avec les symptômes que vous avez signalés. Vous n'avez pas besoin de mentionner les médicaments que vous prenez pour une affection déjà connue."],
                    ["de-be", "Bitte geben Sie nur die Medikation ein, die Sie im Zusammenhang mit Ihren gemeldeten Beschwerden verwenden. Medikamente, die Sie für eine eigene, bereits bekannte Erkrankung verwenden, brauchen Sie nicht zu nennen."],
                    ["en", "Please indicate only the medications that you are taking specifically for the symptoms that you indicated. You do not need to mention any medications that you are taking for a pre-existing condition."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
            ])),
        style: [{ key: 'className', value: 'mb-1' }]
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '6', '10'),
            content: new Map([
                ["nl-be", "Nee, ik heb geen medicijnen gebruikt"],
                ["fr-be", "Non, je n'ai pris aucun médicament"],
                ["de-be", "Nein, ich habe keine Medikamente verwendet"],
                ["en", "No medication"],
            ])
        },
        {
            key: '1',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, pijnstillers zoals paracetamol, aspirine of ibuprofen"],
                ["fr-be", "Oui, des analgésiques tels que le paracétamol, l'aspirine ou l'ibuprofène"],
                ["de-be", "Ja, Schmerzmittel wie Paracetamol, Aspirin oder Ibuprofen"],
                ["en", "Yes, pain killers (e.g. paracetamol, lemsip, ibuprofen, aspirin, calpol, etc)"],
            ])
        },
        {
            key: '9',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, middelen om de neus vrij te maken (neusspray, enz.)"],
                ["fr-be", "Oui, des produits pour dégager le nez (un spray nasal, etc.)"],
                ["de-be", "Ja, Mittel, um die Nase frei zu machen (Nasenspray usw.)"],
                ["en", "Yes, nasal decongestants (nose spray, etc.)"],
            ])
        },
        {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, medicijnen om het hoesten te onderdrukken (keelpastilles, enz.)"],
                ["fr-be", "Oui, des médicaments pour calmer la toux (des pastilles pour la gorge, etc.)"],
                ["de-be", "Ja, Medikamente, um den Husten zu unterdrücken (Halspastillen usw.)"],
                ["en", "Yes, cough medication (e.g. expectorants)"],
            ])
        },
        {
            key: '3',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, antivirale middelen zoals Tamiflu of Relenza"],
                ["fr-be", "Oui, des antiviraux comme le Tamiflu ou le Relenza"],
                ["de-be", "Ja, antivirale Mittel wie zum Beispiel Tamiflu oder Relenza"],
                ["en", "Yes, antivirals (Tamiflu, Relenza)"],
            ])
        },
        {
            key: '4',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, antibiotica"],
                ["fr-be", "Oui, des antibiotiques"],
                ["de-be", "Ja, Antibiotika"],
                ["en", "Yes, antibiotics"],
            ])
        },
        {
            key: '7',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, homeopathische middelen"],
                ["fr-be", "Oui, des remèdes homéopathiques"],
                ["de-be", "Ja, homöopathische Mittel"],
                ["en", "Yes, homeopathy"],
            ])
        },
        {
            key: '8',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, andere alternatieve medicatie (essentiële olie, fytotherapie enz.)"],
                ["fr-be", "Oui, d’autres médicaments alternatifs (des huiles essentielles, la phytothérapie, etc.)"],
                ["de-be", "Ja, andere alternative Medikamente (essentielles Öl, Phytotherapie usw.)"],
                ["en", "Yes, alternative medicine (essential oil, phytotherapy, etc.)"],
            ])
        },
        {
            key: '5',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6', '10'),
            content: new Map([
                ["nl-be", "Ja, andere medicatie"],
                ["fr-be", "Oui, d'autres médicaments"],
                ["de-be", "Ja, andere Medikation"],
                ["en", "Yes, other medication(s)"],
            ])
        },
        {
            key: '10',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["nl-be", "Dit wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
                ["de-be", "Das möchte ich nicht angeben"],
                ["en", "I prefer not to answer this question"],
            ])
        },
        {
            key: '6',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '10'),
            content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],

            ])
        },

    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}


/**
 * DAILY ROUTINE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dailyRoutine = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u vanwege uw klachten uw dagelijkse bezigheden moeten aanpassen?"],
            ["fr-be", "Avez-vous dû adapter vos activités quotidiennes à cause de vos symptômes ?"],
            ["de-be", "Haben Sie aufgrund Ihrer Beschwerden Ihre täglichen Beschäftigungen anpassen müssen?"],
            ["en", "Did you change your daily routine because of your illness?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om het effect te bepalen van de klachten op uw dagelijks leven."],
                    ["fr-be", "Pour déterminer l'effet des symptômes sur votre vie quotidienne."],
                    ["de-be", "Um die Wirkung der Beschwerden auf Ihr tägliches Leben zu bestimmen."],
                    ["en", "To determine how the symptoms are impacting your daily life."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten of u afwezig was op uw werk of school als gevolg van uw symptomen, of dat u uw routine (vb: niet kunnen sporten) op een andere manier hebt veranderd. Indien u een student bent en online-lessen niet hebt kunnen volgen als gevolg van uw symptomen, kiest u ook best de tweede optie. We vragen naar veranderingen als gevolg van uw symptomen/klachten, niet omwille van een mogelijke quarantaine."],
                    ["fr-be", "Nous voulons savoir si vous avez dû vous absenter de votre travail ou si vous n'avez pas su fréquenter l'école en raison de vos symptômes, ou si vous avez modifié votre routine de quelque manière que ce soit (par exemple, ne pas avoir pu pratiquer de sport). Si vous êtes étudiant(e) et que vous n'avez pas pu assister aux cours en ligne en raison de vos symptômes, choisissez également la deuxième option. Nous nous intéressons aux changements en raison de vos symptômes/plaintes, et non en raison d'une éventuelle quarantaine."],
                    ["de-be", "Wir möchten wissen, ob Sie bei der Arbeit oder in der Schule als Folge Ihrer Symptome anwesend waren, oder ob Sie Ihre Routine (zum Beispiel: keine Sportausübung möglich) auf eine andere Art verändert haben. Wenn Sie ein Student sind und als Folge Ihrer Symptome Online-Lektionen nicht folgen konnten, wählen Sie am besten die zweite Alternative. Wir fragen nach Veränderungen als Folge Ihrer Symptome/Beschwerden, nicht aufgrund einer möglichen Quarantäne."],
                    ["en", "We want to know if you have missed work or school due to your symptoms, or if you have modified your daily routine in any way (for example, if you were unable to engage in sport activities). If you are a student, and were unable to attend online classes due to your symptoms, you should also select option 2. We are interested in changes due to your symptoms/complaints and not due to any quarantine."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
            ])),
        style: [{ key: 'className', value: 'mb-1' }]
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0',
            role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik heb mijn dagelijkse bezigheden zoals normaal kunnen doen"],
                ["fr-be", "Non, j'ai pu vaquer à mes occupations quotidiennes comme d'habitude"],
                ["de-be", "Nein, ich habe meine täglichen Beschäftigungen wie normal durchführen können"],
                ["en", "No, I was able to go about my daily activities as usual"],
            ])
        },
        {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, ik heb mijn beroep niet kunnen uitoefenen of ben niet naar school kunnen gaan"],
                ["fr-be", "Oui, je n'ai pas pu travailler ou me rendre à l'école"],
                ["de-be", "Ja, ich konnte meinen Beruf nicht ausüben oder konnte nicht zur Schule gehen"],
                ["en", "Yes, I was unable to work or go to school"],
            ])
        },
        {
            key: '11',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, ik heb andere dagelijkse activiteiten (uitgezonderd mijn beroep/school) moeten aanpassen"],
                ["fr-be", "Oui, j'ai dû adapter d'autres activités quotidiennes (en dehors de ma profession/de l'école)"],
                ["de-be", "Ja, ich habe andere tägliche Aktivitäten (mit Ausnahme meines Berufs / der Schule) anpassen müssen"],
                ["en", "Yes, I had to adjust other daily activities (other than work/school)"],
            ])
        },

    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * DAILY ROUTINE TODAY
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyDailyRoutine: reference to question if participant missed work/school
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dailyRoutineToday = (parentKey: string, keyDailyRoutine: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_10b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Kan u op dit moment nog steeds niet werken of school volgen vanwege de symptomen/klachten?"],
            ["fr-be", "Êtes-vous actuellement toujours dans l'incapacité de travailler ou de fréquenter l'école en raison des symptômes/plaintes ?"],
            ["de-be", "Können Sie in diesem Augenblick aufgrund der Symptome/Beschwerden noch immer nicht arbeiten oder die Schule besuchen?"],
            ["en", "Are you currently still unable to work or attend school due to your symptoms/complaints?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyDailyRoutine, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om het effect te bepalen van de klachten op uw dagelijks leven."],
                    ["fr-be", "Pour déterminer l'effet des symptômes sur votre vie quotidienne."],
                    ["de-be", "Um die Wirkung der Beschwerden auf Ihr tägliches Leben zu bestimmen."],
                    ["en", "To determine how the symptoms are impacting your daily life."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord 'Ja' als u vanwege klachten vandaag nog niet kan werken of naar school gaan."],
                    ["fr-be", "Répondez « Oui » si vous ne pouvez pas vous rendre au travail ou à l'école aujourd'hui en raison de certains symptômes."],
                    ["de-be", "Antworten Sie 'Ja', wenn Sie aufgrund von Beschwerden heute noch nicht arbeiten oder zur Schule gehen können."],
                    ["en", "Answer 'yes' if you missed work or school today due to certain symptoms."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
            ])
        },
        {
            key: '0',
            role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["nl-be", "Andere (ik hoefde vandaag sowieso niet te werken of niet naar school te gaan)"],
                ["fr-be", "Autre (je ne devais pas travailler ou à aller à l'école aujourd'hui de toute façon)"],
                ["de-be", "Andere (ich brauchte heute sowieso nicht zu arbeiten oder nicht zur Schule zu gehen)"],
                ["en", "Other (I did not have to work or go to school today in any case)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * DAILY ROUTINE DAYS MISSED WORK/SCHOOL
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyDailyRoutine: reference to question if participant missed work/school
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dailyRoutineDaysMissed = (parentKey: string, keyDailyRoutine: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_10c'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoeveel dagen hebt u niet normaal kunnen werken of bent u niet naar school geweest (terwijl dat wel had gemoeten)?"],
            ["fr-be", "Durant combien de jours n’avez-vous pas pu travailler normalement, ou n’êtes-vous pas allé(e) à l'école (alors que vous auriez dû le faire) ?"],
            ["de-be", "Wie viele Tage konnten Sie nicht normal arbeiten oder waren Sie nicht in der Schule (während Sie das jedoch eigentlich gemusst hätten)?"],
            ["en", "For how many days have you been unable to work normally/go to school (when you otherwise would have)?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyDailyRoutine, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om uit te rekenen hoeveel dagen mensen niet kunnen werken/niet naar school gaan vanwege klachten."],
                    ["fr-be", "Pour calculer le nombre de jours pendant lesquels les citoyens ne peuvent pas se rendre au travail ou à l'école en raison de certains symptômes."],
                    ["de-be", "Um auszurechnen, wie viele Tagen Menschen aufgrund von Beschwerden nicht arbeiten können/nicht zur Schule gehen können."],
                    ["en", "To calculate the number of days a person misses work or school due to certain symptoms."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Tel alleen de dagen waar u normaal had moeten werken/school had moeten volgen. Maak een zo goed als mogelijke inschatting."],
                    ["fr-be", "Ne comptez que les jours au cours desquels vous auriez dû normalement vous rendre au travail/à l'école. Fournissez l'estimation la plus précise possible."],
                    ["de-be", "Zählen Sie nur die Tage, an denen Sie normalerweise hätten arbeiten / dem Schulunterricht folgen müssen. Machen Sie eine möglichst gute Einschätzung."],
                    ["en", "Only count the days that you would otherwise have gone to work or school. Provide as precise an estimate as possible."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    const ddOptions = initDropdownGroup('ddg', [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "1 dag"],
                ["fr-be", "1 jour"],
                ["de-be", "1 Tage"],
                ["en", "1 day"],
            ]),
        },
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "2 dagen"],
                ["fr-be", "2 jours"],
                ["de-be", "2 Tagen"],
                ["en", "2 days"],
            ]),
        },
        {
            key: '2', role: 'option', content: new Map([
                ["nl-be", "3 dagen"],
                ["fr-be", "3 jours"],
                ["de-be", "3 Tagen"],
                ["en", "3 days"],
            ]),
        },
        {
            key: '3', role: 'option', content: new Map([
                ["nl-be", "4 dagen"],
                ["fr-be", "4 jours"],
                ["de-be", "4 Tagen"],
                ["en", "4 days"],
            ]),
        },
        {
            key: '4', role: 'option', content: new Map([
                ["nl-be", "5 dagen"],
                ["fr-be", "5 jours"],
                ["de-be", "5 Tagen"],
                ["en", "5 days"],
            ]),
        },
        {
            key: '5', role: 'option', content: new Map([
                ["nl-be", "6 dagen"],
                ["fr-be", "6 jours"],
                ["de-be", "6 Tagen"],
                ["en", "6 days"],
            ]),
        },
        {
            key: '6', role: 'option', content: new Map([
                ["nl-be", "7 dagen"],
                ["fr-be", "7 jours"],
                ["de-be", "7 Tagen"],
                ["en", "7 days"],
            ]),
        },
        {
            key: '7', role: 'option', content: new Map([
                ["nl-be", "8 dagen"],
                ["fr-be", "8 jours"],
                ["de-be", "8 Tagen"],
                ["en", "8 days"],
            ]),
        },
        {
            key: '8', role: 'option', content: new Map([
                ["nl-be", "9 dagen"],
                ["fr-be", "9 jours"],
                ["de-be", "9 Tagen"],
                ["en", "9 days"],
            ]),
        },
        {
            key: '9', role: 'option', content: new Map([
                ["nl-be", "10 dagen"],
                ["fr-be", "10 jours"],
                ["de-be", "10 Tagen"],
                ["en", "10 days"],
            ]),
        },
        {
            key: '10', role: 'option', content: new Map([
                ["nl-be", "11 dagen"],
                ["fr-be", "11 jours"],
                ["de-be", "11 Tagen"],
                ["en", "11 days"],
            ]),
        },
        {
            key: '11', role: 'option', content: new Map([
                ["nl-be", "12 dagen"],
                ["fr-be", "12 jours"],
                ["de-be", "12 Tagen"],
                ["en", "12 days"],
            ]),
        },
        {
            key: '12', role: 'option', content: new Map([
                ["nl-be", "13 dagen"],
                ["fr-be", "13 jours"],
                ["de-be", "13 Tagen"],
                ["en", "13 days"],
            ]),
        },
        {
            key: '13', role: 'option', content: new Map([
                ["nl-be", "14 dagen"],
                ["fr-be", "14 jours"],
                ["de-be", "14 Tagen"],
                ["en", "14 days"],
            ]),
        },
        {
            key: '14', role: 'option', content: new Map([
                ["nl-be", "15 dagen"],
                ["fr-be", "15 jours"],
                ["de-be", "15 Tagen"],
                ["en", "15 days"],
            ]),
        },
        {
            key: '15', role: 'option', content: new Map([
                ["nl-be", "16 dagen"],
                ["fr-be", "16 jours"],
                ["de-be", "16 Tagen"],
                ["en", "16 days"],
            ]),
        },
        {
            key: '16', role: 'option', content: new Map([
                ["nl-be", "17 dagen"],
                ["fr-be", "17 jours"],
                ["de-be", "17 Tagen"],
                ["en", "17 days"],
            ]),
        },
        {
            key: '17', role: 'option', content: new Map([
                ["nl-be", "18 dagen"],
                ["fr-be", "18 jours"],
                ["de-be", "18 Tagen"],
                ["en", "18 days"],
            ]),
        },
        {
            key: '18', role: 'option', content: new Map([
                ["nl-be", "19 dagen"],
                ["fr-be", "19 jours"],
                ["de-be", "19 Tagen"],
                ["en", "19 days"],
            ]),
        },
        {
            key: '19', role: 'option', content: new Map([
                ["nl-be", "20 dagen"],
                ["fr-be", "20 jours"],
                ["de-be", "20 Tagen"],
                ["en", "20 days"],
            ]),
        },
        {
            key: '20', role: 'option', content: new Map([
                ["nl-be", "21 dagen"],
                ["fr-be", "21 jours"],
                ["de-be", "21 Tagen"],
                ["en", "21 days"],
            ]),
        },
        {
            key: '21', role: 'option', content: new Map([
                ["nl-be", "22 dagen"],
                ["fr-be", "22 jours"],
                ["de-be", "22 Tagen"],
                ["en", "22 days"],
            ]),
        },
        {
            key: '22', role: 'option', content: new Map([
                ["nl-be", "23 dagen"],
                ["fr-be", "23 jours"],
                ["de-be", "23 Tagen"],
                ["en", "23 days"],
            ]),
        },
        {
            key: '23', role: 'option', content: new Map([
                ["nl-be", "24 dagen"],
                ["fr-be", "24 jours"],
                ["de-be", "24 Tagen"],
                ["en", "24 days"],
            ]),
        },
        {
            key: '24', role: 'option', content: new Map([
                ["nl-be", "25 dagen"],
                ["fr-be", "25 jours"],
                ["de-be", "25 Tagen"],
                ["en", "25 days"],
            ]),
        },
        {
            key: '25', role: 'option', content: new Map([
                ["nl-be", "26 dagen"],
                ["fr-be", "26 jours"],
                ["de-be", "26 Tagen"],
                ["en", "26 days"],
            ]),
        },
        {
            key: '26', role: 'option', content: new Map([
                ["nl-be", "27 dagen"],
                ["fr-be", "27 jours"],
                ["de-be", "27 Tagen"],
                ["en", "27 days"],
            ]),
        },
        {
            key: '27', role: 'option', content: new Map([
                ["nl-be", "28 dagen"],
                ["fr-be", "28 jours"],
                ["de-be", "28 Tagen"],
                ["en", "28 days"],
            ]),
        },
        {
            key: '28', role: 'option', content: new Map([
                ["nl-be", "29 dagen"],
                ["fr-be", "29 jours"],
                ["de-be", "29 Tagen"],
                ["en", "29 days"],
            ]),
        },
        {
            key: '29', role: 'option', content: new Map([
                ["nl-be", "30 dagen"],
                ["fr-be", "30 jours"],
                ["de-be", "30 Tagen"],
                ["en", "30 days"],
            ]),
        },
        {
            key: '30', role: 'option', content: new Map([
                ["nl-be", "31-40 dagen"],
                ["fr-be", "31-40 jours"],
                ["de-be", "31-40 Tagen"],
                ["en", "31-40 days"],
            ]),
        },
        {
            key: '31', role: 'option', content: new Map([
                ["nl-be", "41-50 dagen"],
                ["fr-be", "41-50 jours"],
                ["de-be", "41-50 Tagen"],
                ["en", "41-50 days"],
            ]),
        },
        {
            key: '32', role: 'option', content: new Map([
                ["nl-be", "51-60 dagen"],
                ["fr-be", "51-60 jours"],
                ["de-be", "51-60 Tagen"],
                ["en", "51-60 days"],
            ]),
        },
        {
            key: '33', role: 'option', content: new Map([
                ["nl-be", "meer dan 60 dagen"],
                ["fr-be", "plus de 60 jours"],
                ["de-be", "mehr als 60 Tage"],
                ["en", "more than 60 days"],
            ]),
        },
    ]);

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent(ddOptions, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * SYMPTOM IMPLIED COVID-19 TEST PERFORMED
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const SymptomImpliedCovidTest = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_16'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u omwille van uw symptomen een test laten uitvoeren voor COVID-19? "],
            ["fr-be", "Avez-vous passé un test de dépistage du coronavirus en raison de vos symptômes ?"],
            ["de-be", "Haben Sie aufgrund Ihrer Symptome einen Test auf COVID-19 durchführen lassen?"],
            ["en", "Because of your symptoms, did you undergo a test/analyses to know if you have COVID-19?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten voor welke klachten mensen zich laten testen op COVID-19."],
                    ["fr-be", "Nous voulons savoir sur la base de quelles plaintes les gens se font tester en vue de dépister le coronavirus."],
                    ["de-be", "Wir möchten wissen, für welche Beschwerden Menschen sich auf COVID-19 testen lassen."],
                    ["en", "We want to know which complaints lead people to get tested for the coronavirus."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
            ])),
        style: [{ key: 'className', value: 'mb-1' }]
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        // {
        //     key: '0', role: 'option', content: new Map([
        //         ["nl-be", "Nee"],
        //         ["fr-be", "Non"],
        //         ["de-be", "Nein"],
        //         ["en", "No"],
        //     ])
        // },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3', '4'),
            content: new Map([
                ["nl-be", "Ja, een test uitgevoerd op basis van een wattenstaafje in mijn neus of mond"],
                ["fr-be", "Oui, un test effectué à l'aide d'un écouvillon dans mon nez ou ma bouche"],
                ["de-be", "Ja, ein Test wurde mit einem Wattestäbchen in meiner Nase oder Mund durchgeführt"],
                ["en", "Yes, a test based on a swab in nose or mouth, or a sputum or saliva sample"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3', '4'),
            content: new Map([
                ["nl-be", "Ja, een bloedtest"],
                ["fr-be", "Oui, un test sanguin"],
                ["de-be", "Ja, ein Bluttest"],
                ["en", "Yes, a serological analysis (screening for antibodies against this virus, from a drop of blood from fingertip or a blood sample)"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '1', '2', '3'),
            content: new Map([
                ["nl-be", "Ja, een sneltest (antigeentest) (met een wattenstaafje in mijn neus of mond, en met een resultaat beschikbaar binnen het uur)"],
                ["fr-be", "Oui, un test antigénique rapide (sur un écouvillon introduit dans le nez ou la bouche, permettant d'obtenir un résultat en moins d'une heure)"],
                ["de-be", "Ja, ein Antigen-Schnelltest (mit einem Wattestäbchen in Nase oder Mund mit einem Ergebnis, das in unter einer Stunde verfügbar ist)"],
                ["en", "Yes, a rapid antigen detection test (on a swab in nose or mouth, with a result available in less than an hour)"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '1', '2', '4'),
            content: new Map([
                ["nl-be", "Nog niet, ik ga binnenkort een test laten uitvoeren"],
                ["fr-be", "Pas encore, je vais bientôt me faire tester"],
                ["de-be", "Noch nicht, ich werde in Kürze einen Test durchführen lassen"],
                ["en", "Not yet, I plan to shortly undergo a test"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '1', '2', '3'),
            content: new Map([
                ["nl-be", "Nee, ik zal geen test laten uitvoeren"],
                ["fr-be", "Non, je ne me ferai pas tester"],
                ["de-be", "Nein, ich werde keinen Test durchführen lassen"],
                ["en", "No, I will not get tested"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}

/**
 * COVID 19 Personal Habits Changes: likert scale question about changes in personal habits after experiencing covid symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covidHabitsChange = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_7'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u vanwege uw symtomen deze maatregelen genomen of verstrengd (in vergelijking met de periode voor uw symptomen)?"],
            ["fr-be", "En raison de vos symptômes, avez-vous pris ou intensifié les mesures reprises ci-dessous (par rapport à la période précédant vos symptômes) ?"],
            ["de-be", "Haben Sie aufgrund Ihrer Symtome diese Maßnahmen ergriffen oder verstärkt (im Vergleich mit dem Zeitraum vor Ihren Symptomen)?"],
            ["en", "Did you begin to follow or increase any of the measures below, due to your symptoms (compared to the period before your symptoms began)?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te onderzoeken hoe verschillende maatregelen worden opgevolgd."],
                    ["fr-be", "Afin d'examiner la manière dont les différentes mesures sont suivies."],
                    ["de-be", "Um zu untersuchen, wie verschiedene Maßnahmen befolgt werden."],
                    ["en", "To examine how different measures are being followed."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Bijvoorbeeld 'Handen schudden vermijden': Kies 'Ja', omwille van mijn symptomen heb ik geen of nog minder handen geschud; Kies 'Nee, ik pas deze maatregel niet toe', ik geef nog steeds mensen de hand ook al heb ik symptomen; Kies 'Nee, ik hield me al aan deze maatregel', want ook voor mijn symptomen gaf ik geen handen en heb dit niet aangepast."],
                    ["fr-be", "Par exemple, « Évitez de serrer les mains » : Choisissez « Oui » si vous avez serré moins de mains ou si vous n'avez plus serré de mains en raison de vos symptômes ; Choisissez « Non, je n'applique pas cette mesure », si vous continuez à serrer la main des gens malgré vos symptômes ; Choisissez « Non, J'appliquais déjà cette mesure » si vous ne serriez déjà plus la main des gens avant l'apparition de vos symptômes, et que vous n'avez pas modifié ce comportement."],
                    ["de-be", "Zum Beispiel so, 'Hände schütteln vermeiden': Wählen Sie 'Ja', aufgrund meiner Symptome habe ich keine oder noch weniger Hände geschüttelt; Wählen Sie 'Nein, ich wende diese Maßnahme nicht an', ich gebe noch immer Menschen die Hand, obwohl ich schon Symptome habe; Wählen Sie 'Nein, ich hielt mich schon an diese Maßnahme', denn auch aufgrund meiner Symptome gab ich niemandem die Hand und habe das nicht gemacht."],
                    ["en", "For example, 'Avoid shaking hands': Answer 'yes' if you shake hands less or not at all due to your symptoms; Answer 'No, I am not following this measure' if you continue to shake hands despite your symptoms; Answer 'No, I was already following this measure' if you had already stopped shaking hands before the onset of your symptoms and you did not change this behaviour."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );


    // RESPONSE PART
    const likertOptions = [
        {
            key: "1", content: new Map([
                ["nl-be", "Ja, ik pas deze maatregel nu (voor het eerst) of meer (verstrengd) toe"],
                ["fr-be", "Oui, j'applique cette mesure maintenant (pour la première fois) ou de manière plus stricte"],
                ["de-be", "Ja, ich wende diese Maßnahme nun (zum ersten Mal) oder mehr (verstärkt) an"],
                ["en", " Yes, I am following this measure now for the first time, or in a stricter way"],
            ])
        },
        {
            key: "3", content: new Map([
                ["nl-be", "Nee, ik hield me al aan deze maatregel"],
                ["fr-be", "Non, j'appliquais déjà cette mesure"],
                ["de-be", "Nein, ich hielt mich schon an diese Maßnahme"],
                ["en", "I was already following this measure"],
            ])
        },
        {
            key: "2", content: new Map([
                ["nl-be", "Nee, ik pas deze maatregel niet toe"],
                ["fr-be", "Non, je n'applique pas cette mesure"],
                ["de-be", "Nein, ich wende diese Maßnahme nicht an"],
                ["en", "No, I am not following this measure"],
            ])
        }
    ];

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Optioneel in te vullen'],
                ["fr-be", "Question facultative"],
                ["de-be", "Optional einzutragen"],
                ["en", "To be completed optionally"],
            ])),
    }, rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Regelmatig handen wassen/desinfecteren"],
                ["fr-be", "Se laver/se désinfecter régulièrement les mains"],
                ["de-be", "Regelmäßig die Hände waschen/desinfiziren"],
                ['en', 'Regularly wash or disinfect hands'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_1', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Niezen en hoesten in uw elleboog"],
                ["fr-be", "Éternuer et tousser dans votre coude"],
                ["de-be", "In Ihren Ellenbogen niesen und husten"],
                ['en', 'Cough or sneeze into your elbow'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_2', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Wegwerptissues gebruiken"],
                ["fr-be", "Utiliser des mouchoirs jetables"],
                ["de-be", "Einwegtaschentücher verwenden"],
                ['en', 'Use a disposable tissue'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_3', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Een mondmasker dragen buitenshuis"],
                ["fr-be", "Porter un masque buccal à l'extérieur"],
                ["de-be", "Außerhalb des Hauses einen Mund-Nasen-Schutz tragen"],
                ['en', 'Wear a face mask outdoors'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_4', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Een mondmasker dragen binnenshuis"],
                ["fr-be", "Porter un masque buccal à l'intérieur"],
                ["de-be", "Im Hause einen Mund-Nasen-Schutz tragen"],
                ['en', 'Wear a face mask indoors'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_5', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Handen schudden vermijden"],
                ["fr-be", "Éviter de serrer les mains"],
                ["de-be", "Hände schütteln vermeiden"],
                ['en', 'Avoid shaking hands'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_6', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Niet meer knuffelen of kus op de wang geven"],
                ["fr-be", "Éviter les embrassades ou les bisous sur la joue"],
                ["de-be", "Nicht mehr knutschen oder einen Kuss auf die Wange geben"],
                ['en', 'Stop greeting by hugging and/or kissing on both cheeks'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_7', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Gebruik van openbaar vervoer beperken"],
                ["fr-be", "Limiter l'utilisation des transports en commun"],
                ["de-be", "Die Nutzung des ÖPNV begrenzen"],
                ['en', 'Limit your use of public transport'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_8', likertOptions), rg?.key);


    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Drukke plaatsen mijden (supermarkt, cinema, stadium,...)"],
                ["fr-be", "Éviter les lieux bondés (un supermarché, un cinéma, un stade, etc.)"],
                ["de-be", "Belebte Plätze meiden (Supermarkt, Kino, Stadion, usw.)"],
                ['en', 'Avoid busy places (supermarket, cinema, stadium)'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_9', likertOptions), rg?.key);


    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Thuis blijven"],
                ["fr-be", "Rester à la maison"],
                ["de-be", "Zu Hause bleiben"],
                ['en', 'Stay at home'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_10', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Telewerken"],
                ["fr-be", "Effectuer du télétravail"],
                ["de-be", "Telearbeit oder erhöhen Sie die Anzahl der Telearbeitstage"],
                ['en', 'Telework or increase your number of telework days'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_11', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Niet meer naar het buitenland reizen"],
                ["fr-be", "Ne plus voyager à l'étranger"],
                ["de-be", "Nicht mehr ins Ausland reisen!"],
                ['en', 'Avoid travel outside your own country or region'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_12', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Boodschappen aan huis laten leveren (door winkel/familie/vriend)"],
                ["fr-be", "Se faire livrer ses achats à domicile (par un magasin/un membre de la famille/un ami)"],
                ["de-be", "Aufträge nach Hause liefern lassen (durch das Geschäft/die Familie/Freunde)"],
                ['en', 'Have your food/shopping delivered by a store or a friend/family member'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_13', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Ontmoetingen met familie en vrienden beperken"],
                ["fr-be", "Limiter les rencontres avec la famille et les amis"],
                ["de-be", "Treffen mit Familie und Freunden einschränken und begrenzen"],
                ['en', 'Avoid seeing friends and family'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_14', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Ontmoetingen met mensen 65+ jaar of met chronische aandoeningen beperken"],
                ["fr-be", "Limiter les rencontres avec les personnes âgées de plus de 65 ans ou souffrant de maladies chroniques"],
                ["de-be", "Treffen mit Menschen im Alter von 65+ Jahren oder mit chronischen Erkrankungen begrenzen"],
                ['en', 'Avoid being in contact with people over 65 years old or with a chronic disease'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_15', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ["nl-be", "Contact met kinderen beperken"],
                ["fr-be", "Limiter les contacts avec les enfants"],
                ["de-be", "Kontakt mit Kindern begrenzen"],
                ['en', 'Avoid being in contact with children'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_16', likertOptions), rg?.key);

    // VALIDATIONs
    // None

    return editor.getItem();
}

/**
 * SURVEY END TEXT
*/
const surveyEnd = (parentKey: string): SurveyItem => {
    const defaultKey = 'surveyEnd'
    const itemKey = [parentKey, defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, type: 'surveyEnd', isGroup: false });

    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Thank you! This was all for now, please submit (push « send ») your responses. We will ask you again next week."],
            ["nl-be", "Dank je wel! Dit was de laatste vraag. Druk « verzenden » om je antwoorden op te slaan. Volgende week vragen we je weer om een nieuwe vragenlijst in te vullen."],
            ["fr-be", "Merci ! C'était la dernière question.  Cliquez sur « envoyer » pour sauvegardé vos réponses. Nous vous contacterons à nouveau la semaine prochaine afin de compléter un nouveau questionnaire."],
            ["de-be", "Vielen Dank! Das war die letzte Frage. Drücken Sie auf « versenden », um Ihre Antworten zu speichern. In der folgenden Woche fragen wir wieder."],
        ]))
    );

    // CONDITION
    // None

    return editor.getItem();
}