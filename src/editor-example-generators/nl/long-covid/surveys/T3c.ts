import { Survey } from "survey-engine/lib/data_types";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { EQ5DGroup } from "../questions/eq5d";
import { surveyKeys } from "../studyRules";

export const generateT3c = (): Survey | undefined => {
    const surveyKey = surveyKeys.T3c;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["en", "T3c"],
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
