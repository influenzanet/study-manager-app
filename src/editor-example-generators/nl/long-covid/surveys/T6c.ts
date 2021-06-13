import { Survey } from "survey-engine/lib/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";
import { CovidTestGroup as ChildrenCovidTestGroup } from "../questions/for-children/covidTest";
import { VaccinationGroup as ChildrenVaccinationGroup } from "../questions/for-children/vaccination";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";

export const generateT6c = (): Survey | undefined => {
    const surveyKey = surveyKeys.T6c;

    // TODO: add survey name, description and duration text
    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["en", "T6c"],
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

    // COVID test group for children
    const childrenCovidTestGroupEditor = new ChildrenCovidTestGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(childrenCovidTestGroupEditor.getItem());

    // COVID vaccination for children
    const childrenVaccinationGroupEditor = new ChildrenVaccinationGroup(surveyKey, {
        groupCondition: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.older15, 'true'),
    });
    surveyEditor.addSurveyItemToRoot(childrenVaccinationGroupEditor.getItem());


    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat.']
    ])));

    return surveyEditor.getSurvey();
}
