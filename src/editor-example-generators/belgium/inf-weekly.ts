import { Survey, SurveyItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";

import { WeeklyQuestions as InfluenzanetWeekly } from "../common_question_pool/influenzanet-weekly";
import { WeeklyCustomQuestions as BelgiumWeekly } from "./inf-weekly-custom"

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
    const Q_symptoms = BelgiumWeekly.symptoms(rootKey, true);
    survey.addExistingSurveyItem(Q_symptoms, rootKey);

    // Q_BE_1_3 COVID-19 test
    const Q_covidTest = BelgiumWeekly.covidTest(rootKey, true, "Q_BE_1_3");
    survey.addExistingSurveyItem(Q_covidTest, rootKey);

    // Q_BE_1_4 reason test
    const Q_reasonTest = BelgiumWeekly.reasonTest(rootKey, Q_covidTest.key, true, "Q_BE_1_4");
    survey.addExistingSurveyItem(Q_reasonTest, rootKey);

    // Q_BE_1_5 date test
    const Q_dateTest = BelgiumWeekly.dateTest(rootKey, Q_covidTest.key, true, "Q_BE_1_5");
    survey.addExistingSurveyItem(Q_dateTest, rootKey);

    //Q_BE_cov16e duration untill test
    const Q_durationTest = BelgiumWeekly.durationTest(rootKey, Q_covidTest.key, Q_reasonTest.key, true, "Q_BE_cov16e")
    survey.addExistingSurveyItem(Q_durationTest, rootKey);

    //Qcov_BE_16b test result
    const Q_resultTest = BelgiumWeekly.resultTest(rootKey, Q_covidTest.key, true, "Qcov_BE_16b")
    survey.addExistingSurveyItem(Q_resultTest, rootKey);

    //Q_BE_cov16z duration untill test result
    const Q_durationTestResult = BelgiumWeekly.durationTestResult(rootKey, Q_covidTest.key, Q_resultTest.key, true, "Qcov_BE_16z")
    survey.addExistingSurveyItem(Q_durationTestResult, rootKey);

    // Q1_2_def consent to further symptom questions
    const Q_consentSymptomQuestion = BelgiumWeekly.consentForSymptoms(rootKey, Q_symptoms.key, true, "Q_BE_1_2")
    survey.addExistingSurveyItem(Q_consentSymptomQuestion, rootKey);

    // // -------> HAS SYMPTOMS GROUP
    const userConsentedSymptomsGroup = InfluenzanetWeekly.userConsentedSymptomsGroup(rootKey, Q_consentSymptomQuestion.key);
    survey.addExistingSurveyItem(userConsentedSymptomsGroup, rootKey);
    const hasSymptomGroupKey = userConsentedSymptomsGroup.key;

    // // Q2 same illnes --------------------------------------
    const Q_same_illnes = BelgiumWeekly.sameIllnes(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_same_illnes, hasSymptomGroupKey);

    // // Q3 when first symptoms --------------------------------------
    const Q_symptomStart = BelgiumWeekly.symptomsStart(hasSymptomGroupKey, Q_same_illnes.key, true);
    survey.addExistingSurveyItem(Q_symptomStart, hasSymptomGroupKey);

    // // Qcov_BE_3 pcr tested contact COVID-19--------------------------------------
    const Q_covidPCRTestedContact = BelgiumWeekly.pcrTestedContact(hasSymptomGroupKey, true, "Qcov_BE_3");
    survey.addExistingSurveyItem(Q_covidPCRTestedContact, hasSymptomGroupKey);

    // // Qcov_BE_3b household pcr contacts COVID-19--------------------------
    const Q_pcrHouseholdContact = BelgiumWeekly.pcrHouseholdContact(hasSymptomGroupKey, Q_covidPCRTestedContact.key, true, "Qcov_BE_3b");
    survey.addExistingSurveyItem(Q_pcrHouseholdContact, hasSymptomGroupKey);

    // // Qcov_BE_8 contact with people showing symptoms -------------------------------------
    const Q_covidContact = BelgiumWeekly.covidSymptomsContact(hasSymptomGroupKey, true, "Qcov_BE_8");
    survey.addExistingSurveyItem(Q_covidContact, hasSymptomGroupKey);

    // // Qcov_BE_8b contact with people showing symtoms in your household ---------------------------
    const Q_covidHouseholdContact = BelgiumWeekly.covidHouseholdContact(hasSymptomGroupKey, Q_covidContact.key, true, "Qcov_BE_8b");
    survey.addExistingSurveyItem(Q_covidHouseholdContact, hasSymptomGroupKey);

    // // Q4 when symptoms end --------------------------------------
    const Q_symptomsEnd = BelgiumWeekly.symptomsEnd(hasSymptomGroupKey, Q_symptomStart.key, true);
    survey.addExistingSurveyItem(Q_symptomsEnd, hasSymptomGroupKey);

    // // Q5 symptoms developed suddenly --------------------------------------
    const Q_symptomsSuddenlyDeveloped = BelgiumWeekly.symptomsSuddenlyDeveloped(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_symptomsSuddenlyDeveloped, hasSymptomGroupKey);

    // // ----> fever group  - 4 questions
    const feverGroup = BelgiumWeekly.feverGroup.all(hasSymptomGroupKey, Q_symptoms.key, Q_symptomStart.key, true);
    survey.addExistingSurveyItem(feverGroup, hasSymptomGroupKey);

    // // Q_BE_7 visited medical service --------------------------------------
    const Q_visitedMedicalService = BelgiumWeekly.visitedMedicalService(hasSymptomGroupKey, true, "Q_BE_7");
    survey.addExistingSurveyItem(Q_visitedMedicalService, hasSymptomGroupKey);

    // // Q7a visited GP practice --------------------------------------
    // const Q_visitedGPPractice = InfluenzanetWeekly.visitedGP(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    // survey.addExistingSurveyItem(Q_visitedGPPractice, hasSymptomGroupKey);

    // // Q_BE_7b how soon visited medical service --------------------------------------
    const Q_visitedMedicalServiceWhen = BelgiumWeekly.visitedMedicalServiceWhen(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7b");
    survey.addExistingSurveyItem(Q_visitedMedicalServiceWhen, hasSymptomGroupKey);

    // // Qcov_BE_18 reasons no medical services-----------------------------------------
    const Q_visitedNoMedicalService = BelgiumWeekly.visitedNoMedicalService(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Qcov_BE_18");
    survey.addExistingSurveyItem(Q_visitedNoMedicalService, hasSymptomGroupKey);

    // // Qcov_BE_18b consequences fear-------------------------------------------------
    const Q_consFear = BelgiumWeekly.consFear(hasSymptomGroupKey, Q_visitedMedicalService.key, Q_visitedNoMedicalService.key, true, "Qcov_BE_18b");
    survey.addExistingSurveyItem(Q_consFear, hasSymptomGroupKey);

    // // Q_BE_7x duration hospitalisation----------------------------------------------
    const Q_durHosp = BelgiumWeekly.durHosp(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7x");
    survey.addExistingSurveyItem(Q_durHosp, hasSymptomGroupKey);

    // // Q_BE_7y ICU ------------------------------------------------------------------
    const Q_addICU = BelgiumWeekly.addICU(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7y");
    survey.addExistingSurveyItem(Q_addICU, hasSymptomGroupKey);

    // // Q_BE_7z Coma -----------------------------------------------------------------
    const Q_inComa = BelgiumWeekly.inComa(hasSymptomGroupKey, Q_visitedMedicalService.key, true, "Q_BE_7z");
    survey.addExistingSurveyItem(Q_inComa, hasSymptomGroupKey);

    // // Q_BE_9 took medication --------------------------------------
    const Q_tookMedication = BelgiumWeekly.tookMedication(hasSymptomGroupKey, true, "Q_BE_9");
    survey.addExistingSurveyItem(Q_tookMedication, hasSymptomGroupKey);

    // // Q9b how soon after symptoms taking antivirals --------------------------------------
    const Q_whenAntivirals = InfluenzanetWeekly.whenAntivirals(hasSymptomGroupKey, Q_tookMedication.key, true);
    survey.addExistingSurveyItem(Q_whenAntivirals, hasSymptomGroupKey);

    // // Q10 daily routine------------------------------------------------
    const Q_dailyRoutine = BelgiumWeekly.dailyRoutine(hasSymptomGroupKey, true, "Q10");
    survey.addExistingSurveyItem(Q_dailyRoutine, hasSymptomGroupKey);

    // // Q_BE_10b today-------------------------------------------------------
    const Q_dailyRoutineToday = BelgiumWeekly.dailyRoutineToday(hasSymptomGroupKey, Q_dailyRoutine.key, true, "Q_BE_10b");
    survey.addExistingSurveyItem(Q_dailyRoutineToday, hasSymptomGroupKey);

    // // Q10_BE_c daily routine days-----------------------------------------
    const Q_dailyRoutineDaysMissed = BelgiumWeekly.dailyRoutineDaysMissed(hasSymptomGroupKey, Q_dailyRoutine.key, true, "Q_BE_10c");
    survey.addExistingSurveyItem(Q_dailyRoutineDaysMissed, hasSymptomGroupKey);

    // // Q11 think cause of symptoms --------------------------------------
    const Q_causeOfSymptoms = InfluenzanetWeekly.causeOfSymptoms(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_causeOfSymptoms, hasSymptomGroupKey);

    // // Qcov_BE_16 test -----------------------------------------------------
    const Q_SymptomImpliedCovidTest = BelgiumWeekly.SymptomImpliedCovidTest(hasSymptomGroupKey, true, "Qcov_BE_16");
    survey.addExistingSurveyItem(Q_SymptomImpliedCovidTest, hasSymptomGroupKey);

    // // Qcov_BE_7 Covid 19 habits change question ------------------------------------------------------
    const Q_covidHabits = BelgiumWeekly.covidHabitsChange(hasSymptomGroupKey, false, "Qcov_BE_7");
    survey.addExistingSurveyItem(Q_covidHabits, hasSymptomGroupKey);

    const surveyEndText = surveyEnd(rootKey);
    survey.addExistingSurveyItem(surveyEndText, rootKey);

    return survey.getSurvey();
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

export default weekly;

