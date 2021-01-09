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
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Survey about your health status in the last week."],
            ["nl", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "15 seconds to 3 minutes, depending on your symptoms."],
            ["nl", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
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

    // const Q_gender = DefaultIntake.gender(rootKey, true);
    // survey.addExistingSurveyItem(Q_gender, rootKey);


    return survey.getSurvey();
}

export default weekly;