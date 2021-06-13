import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { EQ5DProxyGroup } from "../questions/for-children/eq5dProxy";
import { surveyKeys } from "../studyRules";

export const generateT3c = (): Survey | undefined => {
    const surveyKey = surveyKeys.T3c;

    // TODO: add survey name, description and duration text
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

    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat.']
    ])));

    return surveyEditor.getSurvey();
}
