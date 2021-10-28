import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { EQ5DProxyGroup } from "../questions/for-children/eq5dProxy";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";
import { CovidTestGroup as ChildrenCovidTestGroup } from "../questions/for-children/covidTest";
import { SymptomsGroup as ChildrenSymptomsGroup } from "../questions/for-children/symptoms";

export const generateShortC = (): Survey | undefined => {
    const surveyKey = surveyKeys.shortC;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Wekelijkse update van klachten LongCOVID-onderzoek"],
        ]),
        description: new Map([
            ["nl", "In de vorige vragenlijst heb je aangegeven klachten te hebben. In deze update vragen we je of deze klachten nog steeds aanwezig zijn, en hoe je je voelt."],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost ongeveer 5 minuten van je tijd."],
        ])
    })


    // *******************************
    // Questions
    // *******************************
    // COVID test group for children
    const childrenCovidTestGroupEditor = new ChildrenCovidTestGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(childrenCovidTestGroupEditor.getItem());

    // SymptomsGroup for children
    const childrenSymptomsGroupEditor = new ChildrenSymptomsGroup(surveyKey, {
        olderThan10: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger11, 'false'),
        q11Ja: childrenCovidTestGroupEditor.q11JaSelectedExp,
    });
    surveyEditor.addSurveyItemToRoot(childrenSymptomsGroupEditor.getItem());

    // EQ5D group
    const eq5dGroupEditor = new EQ5DProxyGroup(surveyKey, {
        olderThan7: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger8, 'false')
    });
    surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());


    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat.']
    ])));

    return surveyEditor.getSurvey();
}
