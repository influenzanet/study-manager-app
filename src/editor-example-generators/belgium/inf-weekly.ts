import { Survey, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { generateLocStrings } from "../../editor-engine/utils/simple-generators";
import { WeeklyQuestions as InfluenzanetWeekly } from "../common_question_pool/influenzanet-weekly";

const weekly = (): Survey | undefined => {
    const surveyKey = 'weekly';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["nl", "Wekelijkse vragenlijst"],
            ["nl-be", "Wekelijkse vragenlijst"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Survey about your health status in the last week."],
            ["nl", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
            ["nl-be", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "15 seconds to 3 minutes, depending on your symptoms."],
            ["nl", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
            ["nl-be", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
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

    // Symptoms
    const Q_symptoms = InfluenzanetWeekly.symptomps(rootKey, true);
    survey.addExistingSurveyItem(Q_symptoms, rootKey);

    // -------> HAS SYMPTOMS GROUP
    const hasSymptomGroup = InfluenzanetWeekly.hasSymptomsGroup(rootKey, Q_symptoms.key);
    survey.addExistingSurveyItem(hasSymptomGroup, rootKey);
    const hasSymptomGroupKey = hasSymptomGroup.key;

    // Q2 same illnes --------------------------------------
    const Q_same_illnes = InfluenzanetWeekly.sameIllnes(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_same_illnes, hasSymptomGroupKey);
    // Q3 when first symptoms --------------------------------------
    const Q_symptomStart = InfluenzanetWeekly.symptomsStart(hasSymptomGroupKey, Q_same_illnes.key, true);
    survey.addExistingSurveyItem(Q_symptomStart, hasSymptomGroupKey);

    // Q4 when symptoms end --------------------------------------
    const Q_symptomsEnd = InfluenzanetWeekly.symptomsEnd(hasSymptomGroupKey, Q_symptomStart.key, true);
    survey.addExistingSurveyItem(Q_symptomsEnd, hasSymptomGroupKey);

    // Q5 symptoms developed suddenly --------------------------------------
    const Q_symptomsSuddenlyDeveloped = InfluenzanetWeekly.symptomsSuddenlyDeveloped(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_symptomsSuddenlyDeveloped, hasSymptomGroupKey);

    // ----> fever group  - 4 questions
    const feverGroup = InfluenzanetWeekly.feverGroup.all(hasSymptomGroupKey, Q_symptoms.key, true);
    survey.addExistingSurveyItem(feverGroup, hasSymptomGroupKey);

    // Q7 visited medical service --------------------------------------
    const Q_visitedMedicalService = InfluenzanetWeekly.visitedMedicalService(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_visitedMedicalService, hasSymptomGroupKey);

    // Q7a visited GP practice --------------------------------------
    const Q_visitedGPPractice = InfluenzanetWeekly.visitedGP(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    survey.addExistingSurveyItem(Q_visitedGPPractice, hasSymptomGroupKey);

    // Q7b how soon visited medical service --------------------------------------
    const Q_visitedMedicalServiceWhen = InfluenzanetWeekly.visitedMedicalServiceWhen(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    survey.addExistingSurveyItem(Q_visitedMedicalServiceWhen, hasSymptomGroupKey);

    // Q9 took medication --------------------------------------
    const Q_tookMedication = InfluenzanetWeekly.tookMedication(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_tookMedication, hasSymptomGroupKey);

    // Q9b how soon after symptoms taking antivirals --------------------------------------
    const Q_whenAntivirals = InfluenzanetWeekly.whenAntivirals(hasSymptomGroupKey, Q_tookMedication.key, true);
    survey.addExistingSurveyItem(Q_whenAntivirals, hasSymptomGroupKey);

    // Q11 think cause of symptoms --------------------------------------
    const Q_causeOfSymptoms = InfluenzanetWeekly.causeOfSymptoms(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_causeOfSymptoms, hasSymptomGroupKey);

    return survey.getSurvey();
}

export default weekly;