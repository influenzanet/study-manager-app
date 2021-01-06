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

    /*
    // regular medication --------------------------------------
    const q11 = survey.addNewSurveyItem({ itemKey: 'Q11' }, rootKey);
    if (!q11) { return; }
    survey.updateSurveyItem(q11_def(q11));
    // -----------------------------------------

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

    // common cold how often  --------------------------------------
    const q8 = survey.addNewSurveyItem({ itemKey: 'Q8' }, rootKey);
    if (!q8) { return; }
    survey.updateSurveyItem(q8_def(q8));
    // -----------------------------------------

    // flu vaccine last season --------------------------------------
    const q9 = survey.addNewSurveyItem({ itemKey: 'Q9' }, rootKey);
    if (!q9) { return; }
    survey.updateSurveyItem(q9_def(q9));
    // -----------------------------------------

    // flue vaccine this season --------------------------------------
    const q10 = survey.addNewSurveyItem({ itemKey: 'Q10' }, rootKey);
    if (!q10) { return; }
    survey.updateSurveyItem(q10_def(q10));
    // -----------------------------------------

    // flue vaccine this season when --------------------------------------
    const q10b = survey.addNewSurveyItem({ itemKey: 'Q10b' }, rootKey);
    if (!q10b) { return; }
    survey.updateSurveyItem(q10b_def(q10b, q10.key));
    // -----------------------------------------

    // flue vaccine reason for --------------------------------------
    const q10c = survey.addNewSurveyItem({ itemKey: 'Q10c' }, rootKey);
    if (!q10c) { return; }
    survey.updateSurveyItem(q10c_def(q10c, q10.key));
    // -----------------------------------------

    // flue vaccine reason against --------------------------------------
    const q10d = survey.addNewSurveyItem({ itemKey: 'Q10d' }, rootKey);
    if (!q10d) { return; }
    survey.updateSurveyItem(q10d_def(q10d, q10.key));
    // -----------------------------------------
    */

    return survey.getSurvey();
}

export default intake;