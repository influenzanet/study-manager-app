import { Survey } from "survey-engine/lib/data_types";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { EQ5DGroup } from "../questions/eq5d";
import { surveyKeys } from "../studyRules";

export const generateShortC = (): Survey | undefined => {
    const surveyKey = surveyKeys.shortC;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["en", "shortC"],
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

    const eq5dGroupEditor = new EQ5DGroup(surveyKey, true, true);
    surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    return surveyEditor.getSurvey();
}
