import { Survey, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { generateLocStrings } from "../../editor-engine/utils/simple-generators";
import { IntakeQuestions as DefaultIntake } from "../common_question_pool/influenzanet-intake";


const intake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "About You"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "The intake survey focues on some background and demographic information."],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "This will take 15 minutes."],
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

    const Q_postal = DefaultIntake.postalCode(rootKey, true);
    survey.addExistingSurveyItem(Q_postal, rootKey);

    const Q_main_activity = DefaultIntake.mainActivity(rootKey, true);
    survey.addExistingSurveyItem(Q_main_activity, rootKey);

    const Q_highest_education = DefaultIntake.highestEducation(rootKey, true);
    survey.addExistingSurveyItem(Q_highest_education, rootKey);

    const Q_people_met = DefaultIntake.peopleMet(rootKey, true);
    survey.addExistingSurveyItem(Q_people_met, rootKey);

    const Q_age_groups = DefaultIntake.ageGroups(rootKey, true);
    survey.addExistingSurveyItem(Q_age_groups, rootKey);

    const Q_children_in_school = DefaultIntake.childrenInSchool(rootKey, Q_age_groups.key, true);
    survey.addExistingSurveyItem(Q_children_in_school, rootKey);

    const Q_means_of_transport = DefaultIntake.meansOfTransport(rootKey, true);
    survey.addExistingSurveyItem(Q_means_of_transport, rootKey);

    const Q_pub_transport_duration = DefaultIntake.pubTransportDuration(rootKey, true);
    survey.addExistingSurveyItem(Q_pub_transport_duration, rootKey);

    const Q_common_cold_frequ = DefaultIntake.commonColdFrequency(rootKey, true);
    survey.addExistingSurveyItem(Q_common_cold_frequ, rootKey);

    const Q_flu_vaccine_last_season = DefaultIntake.fluVaccineLastSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_last_season, rootKey);

    const Q_flu_vaccine_this_season = DefaultIntake.fluVaccineThisSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, rootKey);

    const Q_flu_vaccine_this_season_when = DefaultIntake.fluVaccineThisSeasonWhen(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_when, rootKey);

    const Q_flu_vaccine_this_season_reasons_for = DefaultIntake.fluVaccineThisSeasonReasonFor(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_for, rootKey);

    const Q_flu_vaccine_this_season_reasons_against = DefaultIntake.fluVaccineThisSeasonReasonAgainst(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_against, rootKey);

    const Q_regular_medication = DefaultIntake.regularMedication(rootKey, true);
    survey.addExistingSurveyItem(Q_regular_medication, rootKey);


    /*
    // pregnant --------------------------------------
    const q12 = survey.addNewSurveyItem({ itemKey: 'Q12' }, rootKey);
    if (!q12) { return; }
    survey.updateSurveyItem(q12_def(q12, q1.key));
    // -----------------------------------------

    // trimester --------------------------------------
    const q12b = survey.addNewSurveyItem({ itemKey: 'Q12b' }, rootKey);
    if (!q12b) { return; }
    survey.updateSurveyItem(q12b_def(q12b, q12.key));
    // -----------------------------------------

    // do you smoke --------------------------------------
    const q13 = survey.addNewSurveyItem({ itemKey: 'Q13' }, rootKey);
    if (!q13) { return; }
    survey.updateSurveyItem(q13_def(q13));
    // -----------------------------------------

    //survey.addNewSurveyItem({ itemKey: 'pbQ14', type: 'pageBreak' }, rootKey);

    // allergies --------------------------------------
    const q14 = survey.addNewSurveyItem({ itemKey: 'Q14' }, rootKey);
    if (!q14) { return; }
    survey.updateSurveyItem(q14_def(q14));
    // -----------------------------------------

    // special diet --------------------------------------
    const q15 = survey.addNewSurveyItem({ itemKey: 'Q15' }, rootKey);
    if (!q15) { return; }
    survey.updateSurveyItem(q15_def(q15));
    // -----------------------------------------

    // pets --------------------------------------
    const q16 = survey.addNewSurveyItem({ itemKey: 'Q16' }, rootKey);
    if (!q16) { return; }
    survey.updateSurveyItem(q16_def(q16));
    // -----------------------------------------


    */

    return survey.getSurvey();
}

export default intake;