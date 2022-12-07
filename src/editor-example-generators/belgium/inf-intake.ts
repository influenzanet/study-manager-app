import { Survey, SurveyGroupItem } from "survey-engine/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { generateLocStrings } from "../../editor-engine/utils/simple-generators";

import { IntakeQuestions as DefaultIntake } from "../common_question_pool/influenzanet-intake";
import { IntakeCustomQuestions as CustomIntake } from "./inf-intake-custom";

const intake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["nl-be", "Achtergrondvragenlijst"],
            ["en", "Intake questionnaire"],
            ["fr-be", "Questionnaire préliminaire"],
            ["de-be", "Hintergrundfrageboge"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["nl-be", "Het doel van de eerste vragenlijst is om elke gebruiker wat beter te leren kennen."],
            ["en", "The purpose of the background questionnaire is to find out a little more about each user."],
            ["fr-be", "Le questionnaire préliminaire a pour but de connaître un peu mieux chaque utilisateur."],
            ["de-be", "Der Zweck des Hintergrundfragebogens ist es, jeden Benutzer ein wenig besser kennen zu lernen."],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["nl-be", "Dit zal ongeveer 5-15 minuten tijd in beslag nemen."],
            ["en", "It takes approximately 5-15 minutes to complete this questionnaire."],
            ["fr-be", "Comptez environ 5-15 minutes pour compléter le questionnaire préliminaire."],
            ["de-be", "Es dauert etwa 5-15 Minuten, um diesen Fragebogen auszufüllen."],
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

    const Q_gender = DefaultIntake.gender(rootKey, true);
    survey.addExistingSurveyItem(Q_gender, rootKey);

    const Q_birthdate = DefaultIntake.dateOfBirth(rootKey, true);
    survey.addExistingSurveyItem(Q_birthdate, rootKey);

    const Q_postal = CustomIntake.postalCode(rootKey, true);
    survey.addExistingSurveyItem(Q_postal, rootKey);

    const Q_main_activity = CustomIntake.main_activity(rootKey, true);
    survey.addExistingSurveyItem(Q_main_activity, rootKey);

    const Q_postal_work = CustomIntake.postal_code_work(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_postal_work, rootKey);

    const Q_work_type = CustomIntake.work_type(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_work_type, rootKey);

    const Q_work_sector = CustomIntake.work_sector(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_work_sector, rootKey);

    const Q_work_school = CustomIntake.work_school(rootKey, Q_main_activity.key, Q_work_sector.key, true);
    survey.addExistingSurveyItem(Q_work_school, rootKey);

    const Q_work_medical = CustomIntake.work_medical(rootKey, Q_main_activity.key, Q_work_sector.key, true);
    survey.addExistingSurveyItem(Q_work_medical, rootKey);

    const Q_highest_education = CustomIntake.highest_education(rootKey, true);
    survey.addExistingSurveyItem(Q_highest_education, rootKey);

    const Q_people_met = CustomIntake.people_met(rootKey, true);
    survey.addExistingSurveyItem(Q_people_met, rootKey);

    const Q_age_groups = CustomIntake.age_groups(rootKey, true);
    survey.addExistingSurveyItem(Q_age_groups, rootKey);

    //const Q_age_groups_likert = age_groups_likert(rootKey);
    //survey.addExistingSurveyItem(Q_age_groups_likert, rootKey);

    const Q_children_in_school = DefaultIntake.childrenInSchool(rootKey, Q_age_groups.key, true);
    survey.addExistingSurveyItem(Q_children_in_school, rootKey);

    const Q_means_of_transport = DefaultIntake.meansOfTransport(rootKey, true);
    survey.addExistingSurveyItem(Q_means_of_transport, rootKey);

    const Q_pub_transport_duration = DefaultIntake.pubTransportDuration(rootKey, true);
    survey.addExistingSurveyItem(Q_pub_transport_duration, rootKey);

    const Q_common_cold_frequ = DefaultIntake.commonColdFrequency(rootKey, true);
    survey.addExistingSurveyItem(Q_common_cold_frequ, rootKey);

    const Q_flu_vaccine_this_season = CustomIntake.flu_vaccine_this_season(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, rootKey);

    const Q_flu_vaccine_this_season_when = DefaultIntake.fluVaccineThisSeasonWhen(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_when, rootKey);

    const Q_flu_vaccine_this_season_reasons_for = CustomIntake.flu_vaccine_this_season_reason_for(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_for, rootKey);

    const Q_flu_vaccine_this_season_reasons_against = CustomIntake.flu_vaccine_this_season_reason_against(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_against, rootKey);

    const Q_flu_vaccine_last_season = DefaultIntake.fluVaccineLastSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_last_season, rootKey);

    const Q_regular_medication = CustomIntake.regular_medication(rootKey, true);
    survey.addExistingSurveyItem(Q_regular_medication, rootKey);

    const Q_pregnancy = DefaultIntake.pregnancy(rootKey, Q_gender.key, Q_birthdate.key, true);
    survey.addExistingSurveyItem(Q_pregnancy, rootKey);

    const Q_pregnancy_trimester = DefaultIntake.pregnancyTrimester(rootKey, Q_gender.key, Q_birthdate.key, Q_pregnancy.key, true);
    survey.addExistingSurveyItem(Q_pregnancy_trimester, rootKey);

    const Q_smoking = CustomIntake.smoking(rootKey, true);
    survey.addExistingSurveyItem(Q_smoking, rootKey);

    const Q_allergies = DefaultIntake.allergies(rootKey, true);
    survey.addExistingSurveyItem(Q_allergies, rootKey);

    const Q_special_diet = CustomIntake.special_diet(rootKey, true);
    survey.addExistingSurveyItem(Q_special_diet, rootKey);

    const Q_pets = DefaultIntake.pets(rootKey, true);
    survey.addExistingSurveyItem(Q_pets, rootKey);

    const Q_find_infectieradar = CustomIntake.find_infectieradar(rootKey, true);
    survey.addExistingSurveyItem(Q_find_infectieradar, rootKey);

    const Q_previous_covid19_episode = CustomIntake.previous_covid19_episode(rootKey, true);
    survey.addExistingSurveyItem(Q_previous_covid19_episode, rootKey);

    const Q_previous_covid19_episode_symptoms = CustomIntake.previous_covid19_episode_symptoms(rootKey, Q_previous_covid19_episode.key, true);
    survey.addExistingSurveyItem(Q_previous_covid19_episode_symptoms, rootKey);

    const Q_additional_covid19_questions = CustomIntake.additional_covid19_questions(rootKey, Q_previous_covid19_episode.key, true);
    survey.addExistingSurveyItem(Q_additional_covid19_questions, rootKey);

    const Q_additional_covid19_questions_medical_aid = CustomIntake.additional_covid19_questions_medical_aid(rootKey, Q_previous_covid19_episode.key, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_medical_aid, rootKey);

    const Q_additional_covid19_questions_hospital = CustomIntake.additional_covid19_questions_hospital(rootKey, Q_previous_covid19_episode.key, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_hospital, rootKey);

    const Q_additional_covid19_questions_hospital_length = CustomIntake.additional_covid19_questions_hospital_length(rootKey, Q_previous_covid19_episode.key, Q_additional_covid19_questions.key, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_hospital_length, rootKey);

    const Q_additional_covid19_questions_ICU = CustomIntake.additional_covid19_questions_ICU(rootKey, Q_previous_covid19_episode.key, Q_additional_covid19_questions.key, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_ICU, rootKey);

    const Q_additional_covid19_questions_coma = CustomIntake.additional_covid19_questions_coma(rootKey, Q_previous_covid19_episode.key, Q_additional_covid19_questions.key, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_coma, rootKey);

    const Q_additional_covid19_questions_returned_health = CustomIntake.additional_covid19_questions_returned_health(rootKey, Q_previous_covid19_episode.key, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_returned_health, rootKey);

    const Q_additional_covid19_questions_ongoing_symptoms = CustomIntake.additional_covid19_questions_ongoing_symptoms(rootKey, Q_previous_covid19_episode.key, Q_additional_covid19_questions.key, Q_additional_covid19_questions_returned_health.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_ongoing_symptoms, rootKey);

    const surveyEndText = DefaultIntake.surveyEnd(rootKey);
    survey.addExistingSurveyItem(surveyEndText, rootKey);

    return survey.getSurvey();
}

export default intake;
