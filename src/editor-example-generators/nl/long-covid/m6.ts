import { Survey } from "survey-engine/lib/data_types";
import { SimpleSurveyEditor } from "../../../editor-engine/utils/simple-survey-editor";
import { EQ5DGroup } from "./questions/eq5d";

export const generateM6 = (): Survey | undefined => {
    const surveyKey = 'M6';

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["en", "M6"],
        ]),
        description: new Map([
            ["en", "..."],
        ]),
        durationText: new Map([
            ["en", "..."],
        ])
    })


    // *******************************
    // Questions
    // *******************************
    // EQ5D group
    const eq5dGroupEditor = new EQ5DGroup(surveyKey, true, true);
    surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    return surveyEditor.getSurvey();
}