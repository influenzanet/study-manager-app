import { Survey, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../../editor-engine/survey-editor/survey-editor";
import { generateLocStrings } from "../../../editor-engine/utils/simple-generators";
import getEQ5DGroup from "./eq5d-5l";

import getEq5dGroup from './eq5d-5l';

export const generateIntake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // define name and description of the survey
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
    // max item per page
    // set prefill rules
    // set context rules


    const rootItemEditor = new ItemEditor(survey.findSurveyItem(surveyKey) as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;



    const eq5d = getEQ5DGroup(rootKey, 'EQ5D');
    survey.addExistingSurveyItem(eq5d, rootKey);

    return survey.getSurvey();
}

export default generateIntake;