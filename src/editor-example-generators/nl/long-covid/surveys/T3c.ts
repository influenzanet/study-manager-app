import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { EQ5DProxyGroup } from "../questions/for-children/eq5dProxy";
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

    /*
    "<8": "true",
    "<11": "true",
    "8-12": "true",
    "13-18": "true"
    */

    // *******************************
    // Questions
    // *******************************
    // EQ5D group
    const eq5dGroupEditor = new EQ5DProxyGroup(surveyKey, {
        olderThan7: CommonExpressions.hasParticipantFlag('<8', 'false')
    });
    surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    return surveyEditor.getSurvey();
}
