import { Survey, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { generateLocStrings } from "../../editor-engine/utils/simple-generators";
import { IntakeQuestions as CommonPoolIntake } from "../common_question_pool/influenzanet-intake";

const intake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "Intake questionnaire"],
            ["it", "Intake questionnaire"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "The purpose of the background questionnaire is to find out a little more about each user."],
            ["it", "The purpose of the background questionnaire is to find out a little more about each user."],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "It takes approximately 5-15 minutes to complete this questionnaire."],
            ["it", "It takes approximately 5-15 minutes to complete this questionnaire."],
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

    const Q_gender = CommonPoolIntake.gender(rootKey, true);
    survey.addExistingSurveyItem(Q_gender, rootKey);

    const Q_birthdate = CommonPoolIntake.dateOfBirth(rootKey, true);
    survey.addExistingSurveyItem(Q_birthdate, rootKey);

    const Q_postal = CommonPoolIntake.postalCode(rootKey, true);
    survey.addExistingSurveyItem(Q_postal, rootKey);

    const Q_main_activity = CommonPoolIntake.mainActivity(rootKey, true);
    survey.addExistingSurveyItem(Q_main_activity, rootKey);

    const Q_postal_work = CommonPoolIntake.postalCodeWork(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_postal_work, rootKey);

    const Q_work_type = CommonPoolIntake.workType(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_work_type, rootKey);

    const Q_highest_education = CommonPoolIntake.highestEducation(rootKey, true);
    survey.addExistingSurveyItem(Q_highest_education, rootKey);

    const Q_people_met = CommonPoolIntake.peopleMet(rootKey, true);
    survey.addExistingSurveyItem(Q_people_met, rootKey);

    const Q_age_groups = CommonPoolIntake.ageGroups(rootKey, true);
    survey.addExistingSurveyItem(Q_age_groups, rootKey);

    //const Q_age_groups_likert = age_groups_likert(rootKey);
    //survey.addExistingSurveyItem(Q_age_groups_likert, rootKey);

    const Q_children_in_school = CommonPoolIntake.childrenInSchool(rootKey, Q_age_groups.key, true);
    survey.addExistingSurveyItem(Q_children_in_school, rootKey);

    const Q_means_of_transport = CommonPoolIntake.meansOfTransport(rootKey, true);
    survey.addExistingSurveyItem(Q_means_of_transport, rootKey);

    const Q_pub_transport_duration = CommonPoolIntake.pubTransportDuration(rootKey, true);
    survey.addExistingSurveyItem(Q_pub_transport_duration, rootKey);

    const Q_common_cold_frequ = CommonPoolIntake.commonColdFrequency(rootKey, true);
    survey.addExistingSurveyItem(Q_common_cold_frequ, rootKey);

    const Q_flu_vaccine_last_season = CommonPoolIntake.fluVaccineLastSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_last_season, rootKey);

    const Q_flu_vaccine_this_season = CommonPoolIntake.fluVaccineThisSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, rootKey);

    const Q_flu_vaccine_this_season_when = CommonPoolIntake.fluVaccineThisSeasonWhen(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_when, rootKey);

    const Q_flu_vaccine_this_season_reasons_for = CommonPoolIntake.fluVaccineThisSeasonReasonFor(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_for, rootKey);

    const Q_flu_vaccine_this_season_reasons_against = CommonPoolIntake.fluVaccineThisSeasonReasonAgainst(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_against, rootKey);

    const Q_regular_medication = CommonPoolIntake.regularMedication(rootKey, true);
    survey.addExistingSurveyItem(Q_regular_medication, rootKey);

    const Q_pregnancy = CommonPoolIntake.pregnancy(rootKey, Q_gender.key, Q_birthdate.key, true);
    survey.addExistingSurveyItem(Q_pregnancy, rootKey);

    const Q_pregnancy_trimester = CommonPoolIntake.pregnancyTrimester(rootKey, Q_gender.key, Q_birthdate.key, Q_pregnancy.key, true);
    survey.addExistingSurveyItem(Q_pregnancy_trimester, rootKey);

    const Q_smoking = CommonPoolIntake.smoking(rootKey, true);
    survey.addExistingSurveyItem(Q_smoking, rootKey);

    const Q_allergies = CommonPoolIntake.allergies(rootKey, true);
    survey.addExistingSurveyItem(Q_allergies, rootKey);

    const Q_special_diet = CommonPoolIntake.specialDiet(rootKey, true);
    survey.addExistingSurveyItem(Q_special_diet, rootKey);

    const Q_pets = CommonPoolIntake.pets(rootKey, true);
    survey.addExistingSurveyItem(Q_pets, rootKey);

    const Q_find_infectieradar = CommonPoolIntake.findPlatform(rootKey, true);
    survey.addExistingSurveyItem(Q_find_infectieradar, rootKey);

    const surveyEndText = CommonPoolIntake.surveyEnd(rootKey);
    survey.addExistingSurveyItem(surveyEndText, rootKey);

    return survey.getSurvey();
}

export default intake;
