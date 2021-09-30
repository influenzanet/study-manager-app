import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { initDropdownGroup, initSingleChoiceGroup } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { WeeklyQuestions as CommonPoolWeekly } from "../common_question_pool/influenzanet-weekly";
import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";

const weekly = (): Survey | undefined => {
    const surveyKey = 'weekly';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "Weekly questionnaire"],
            ["it", "Questionario settimanale"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Click here for your questionnaire about your complaints in the past week. Please also report if you had no complaints."],
            ["it", "Clicca qui per il questionario sui reclami della scorsa settimana. Si prega di segnalare anche se non si hanno lamentele."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "Filling in takes 15 seconds to 5 minutes, depending on your complaints."],
            ["it", "La compilazione richiede da 15 secondi a 5 minuti, a seconda dei reclami."],
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

    // Symptoms Q1
    const Q_symptoms = CommonPoolWeekly.symptomps(rootKey, true);
    survey.addExistingSurveyItem(Q_symptoms, rootKey);

    // Q1a consent to further symptom questions
    /* const Q_consentSymptomQuestion = CommonPoolWeekly.consentForSymptoms(rootKey, Q_symptoms.key, true)
    survey.addExistingSurveyItem(Q_consentSymptomQuestion, rootKey); */

    // // -------> HAS SYMPTOMS GROUP
    const hasSymptomGroup = CommonPoolWeekly.hasSymptomsGroup(rootKey, Q_symptoms.key);
    survey.addExistingSurveyItem(hasSymptomGroup, rootKey);
    const hasSymptomGroupKey = hasSymptomGroup.key;

    /*
    // OLDER CONFIG WITH CONSENT FOR MORE QUESTIONS
    const userConsentedSymptomsGroup = CommonPoolWeekly.userConsentedSymptomsGroup(rootKey, Q_consentSymptomQuestion.key);
    survey.addExistingSurveyItem(userConsentedSymptomsGroup, rootKey);
    const hasSymptomGroupKey = userConsentedSymptomsGroup.key; */

    // // Q2 same illnes --------------------------------------
    const Q_same_illnes = CommonPoolWeekly.sameIllnes(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_same_illnes, hasSymptomGroupKey);

    // // Qcov3 pcr tested contact COVID-19--------------------------------------
    const Q_covidPCRTestedContact = CommonPoolWeekly.pcrTestedContact(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_covidPCRTestedContact, hasSymptomGroupKey);

    // // Qcov3b household pcr contacts COVID-19--------------------------
    const Q_pcrHouseholdContact = CommonPoolWeekly.pcrHouseholdContact(hasSymptomGroupKey, Q_covidPCRTestedContact.key, true);
    survey.addExistingSurveyItem(Q_pcrHouseholdContact, hasSymptomGroupKey);

    // // Qcov8 contact with people showing symptoms -------------------------------------
    const Q_covidContact = CommonPoolWeekly.covidSymptomsContact(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_covidContact, hasSymptomGroupKey);

    // // Qcov8b contact with people showing symtoms in your household ---------------------------
    const Q_covidHouseholdContact = CommonPoolWeekly.covidHouseholdContact(hasSymptomGroupKey, Q_covidContact.key, true);
    survey.addExistingSurveyItem(Q_covidHouseholdContact, hasSymptomGroupKey);

    // // Q3 when first symptoms --------------------------------------
    const Q_symptomStart = CommonPoolWeekly.symptomsStart(hasSymptomGroupKey, Q_same_illnes.key, true);
    survey.addExistingSurveyItem(Q_symptomStart, hasSymptomGroupKey);

    // // Q4 when symptoms end --------------------------------------
    const Q_symptomsEnd = CommonPoolWeekly.symptomsEnd(hasSymptomGroupKey, Q_symptomStart.key, true);
    survey.addExistingSurveyItem(Q_symptomsEnd, hasSymptomGroupKey);

    // // Q5 symptoms developed suddenly --------------------------------------
    const Q_symptomsSuddenlyDeveloped = CommonPoolWeekly.symptomsSuddenlyDeveloped(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_symptomsSuddenlyDeveloped, hasSymptomGroupKey);

    // Q6 fever start questions
    // Separated into individual questions and Key code overriden to prevent Q6.a and keep Q6
    const Q_feverStart = CommonPoolWeekly.feverGroup.feverStart(hasSymptomGroupKey, Q_symptoms.key, Q_symptomStart.key, true, "Q6");
    survey.addExistingSurveyItem(Q_feverStart, hasSymptomGroupKey);

    // Q6b fever developed suddenly
    const Q_feverDevelopedSuddenly = CommonPoolWeekly.feverGroup.feverDevelopedSuddenly(hasSymptomGroupKey, Q_symptoms.key, true, "Q6b");
    survey.addExistingSurveyItem(Q_feverDevelopedSuddenly, hasSymptomGroupKey);

    // Q6c temperature taken
    const Q_didUMeasureTemp = CommonPoolWeekly.feverGroup.didUMeasureTemperature(hasSymptomGroupKey, Q_symptoms.key, true, "Q6c");
    survey.addExistingSurveyItem(Q_didUMeasureTemp, hasSymptomGroupKey);

    // Q6d highest temperature taken
    const Q_highestTempMeasured = CommonPoolWeekly.feverGroup.highestTemprerature(hasSymptomGroupKey, Q_symptoms.key, Q_didUMeasureTemp.key, true, "Q6d");
    survey.addExistingSurveyItem(Q_highestTempMeasured, hasSymptomGroupKey);

    // // Q7 visited medical service --------------------------------------
    const Q_visitedMedicalService = CommonPoolWeekly.visitedMedicalService(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_visitedMedicalService, hasSymptomGroupKey);

    // // Q7b how soon visited medical service --------------------------------------
    const Q_visitedMedicalServiceWhen = CommonPoolWeekly.visitedMedicalServiceWhen(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    survey.addExistingSurveyItem(Q_visitedMedicalServiceWhen, hasSymptomGroupKey);

    // // Q8 contacted medical service --------------------------------------
    const Q_contactedMedicalService = CommonPoolWeekly.contactedMedicalService(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_contactedMedicalService, hasSymptomGroupKey);

    // // Q8b how soon contacted medical service --------------------------------------
    const Q_contactedMedicalServiceWhen = CommonPoolWeekly.contactedMedicalServiceWhen(hasSymptomGroupKey, Q_contactedMedicalService.key, true);
    survey.addExistingSurveyItem(Q_contactedMedicalServiceWhen, hasSymptomGroupKey);

    // // Qcov18 reasons no medical services-----------------------------------------
    const Q_visitedNoMedicalService = CommonPoolWeekly.visitedNoMedicalService(hasSymptomGroupKey, Q_visitedMedicalService.key, Q_contactedMedicalService.key, true);
    survey.addExistingSurveyItem(Q_visitedNoMedicalService, hasSymptomGroupKey);

    // // Qcov18b consequences fear-------------------------------------------------
    const Q_consFear = CommonPoolWeekly.consFear(hasSymptomGroupKey, Q_visitedMedicalService.key, Q_contactedMedicalService.key, Q_visitedNoMedicalService.key, true);
    survey.addExistingSurveyItem(Q_consFear, hasSymptomGroupKey);

    // // Qcov16 test -----------------------------------------------------
    const Q_SymptomImpliedCovidTest = CommonPoolWeekly.symptomImpliedCovidTest(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_SymptomImpliedCovidTest, hasSymptomGroupKey);

    //Qcov16b PCR test result
    const Q_resultPCRTest = CommonPoolWeekly.resultPCRTest(hasSymptomGroupKey, Q_SymptomImpliedCovidTest.key, true)
    survey.addExistingSurveyItem(Q_resultPCRTest, hasSymptomGroupKey);

    //Qcov16c Serological test result
    const Q_resultSeroTest = CommonPoolWeekly.resultSerologicalTest(hasSymptomGroupKey, Q_SymptomImpliedCovidTest.key, true)
    survey.addExistingSurveyItem(Q_resultSeroTest, hasSymptomGroupKey);

    //Qcov16d duration between symptoms and lab search for testing
    const Q_durationTestResult = CommonPoolWeekly.durationLabSearch(hasSymptomGroupKey, Q_SymptomImpliedCovidTest.key, true)
    survey.addExistingSurveyItem(Q_durationTestResult, hasSymptomGroupKey);

    //Qcov16e duration between symptoms and test sampling
    const Q_durationLabSampling = CommonPoolWeekly.durationLabSampling(hasSymptomGroupKey, Q_SymptomImpliedCovidTest.key, true)
    survey.addExistingSurveyItem(Q_durationLabSampling, hasSymptomGroupKey);

    //Qcov16f rapid test result
    const Q_resultRapidTest = CommonPoolWeekly.resultRapidTest(hasSymptomGroupKey, Q_SymptomImpliedCovidTest.key, true)
    survey.addExistingSurveyItem(Q_resultRapidTest, hasSymptomGroupKey);

    // // Qcov19 test -----------------------------------------------------
    const Q_fluTest = CommonPoolWeekly.fluTest(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_fluTest, hasSymptomGroupKey);

    //Qcov19b Flu PCR test result
    const Q_resultFluPCRTest = CommonPoolWeekly.resultFluTest(hasSymptomGroupKey, Q_fluTest.key, true)
    survey.addExistingSurveyItem(Q_resultFluPCRTest, hasSymptomGroupKey);

    // // Q9 took medication --------------------------------------
    const Q_tookMedication = CommonPoolWeekly.tookMedication(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_tookMedication, hasSymptomGroupKey);

    // // Q9b how soon after symptoms taking antivirals --------------------------------------
    const Q_whenAntivirals = CommonPoolWeekly.whenAntivirals(hasSymptomGroupKey, Q_tookMedication.key, true);
    survey.addExistingSurveyItem(Q_whenAntivirals, hasSymptomGroupKey);

    // // Q10 daily routine------------------------------------------------
    const Q_hospitalized = CommonPoolWeekly.hospitalized(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_hospitalized, hasSymptomGroupKey);

    // // Q10 daily routine------------------------------------------------
    const Q_dailyRoutine = CommonPoolWeekly.dailyRoutine(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_dailyRoutine, hasSymptomGroupKey);

    // // Q10b today-------------------------------------------------------
    const Q_dailyRoutineToday = CommonPoolWeekly.dailyRoutineToday(hasSymptomGroupKey, Q_dailyRoutine.key, true);
    survey.addExistingSurveyItem(Q_dailyRoutineToday, hasSymptomGroupKey);

    // // Q10c daily routine days-----------------------------------------
    const Q_dailyRoutineDaysMissed = CommonPoolWeekly.dailyRoutineDaysMissed(hasSymptomGroupKey, Q_dailyRoutine.key, true);
    survey.addExistingSurveyItem(Q_dailyRoutineDaysMissed, hasSymptomGroupKey);

    // // Qcov7 Covid 19 habits change question ------------------------------------------------------
    const Q_covidHabits = CommonPoolWeekly.covidHabitsChange(hasSymptomGroupKey, false);
    survey.addExistingSurveyItem(Q_covidHabits, hasSymptomGroupKey);

    // // Q11 think cause of symptoms --------------------------------------
    const Q_causeOfSymptoms = CommonPoolWeekly.causeOfSymptoms(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_causeOfSymptoms, hasSymptomGroupKey);

    // // Qcov9 why do you think you have covid-19 --------------------------------------
    const Q_reasonForDisease = CommonPoolWeekly.perceivedReasonForDisease(hasSymptomGroupKey, Q_causeOfSymptoms.key, true);
    survey.addExistingSurveyItem(Q_reasonForDisease, hasSymptomGroupKey);

    // // Qcov9b inform contacts of suspected covid-19 --------------------------------------
    const Q_informContacts = CommonPoolWeekly.informedContacts(hasSymptomGroupKey, Q_causeOfSymptoms.key, true);
    survey.addExistingSurveyItem(Q_informContacts, hasSymptomGroupKey);

    const surveyEndText = surveyEnd(rootKey);
    survey.addExistingSurveyItem(surveyEndText, rootKey);

    return survey.getSurvey();
}

export default weekly;

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
            ["it", "Grazie! Per ora è tutto, per favore invia le tue risposte premendo il pulsante « Invia ». Ti ricontatteremo la prossima settimana."],
        ]))
    );

    // CONDITION
    // None

    return editor.getItem();
}
