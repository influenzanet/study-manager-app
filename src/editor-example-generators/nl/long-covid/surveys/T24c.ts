import { Survey } from "survey-engine/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";
import { CovidTestGroup as ChildrenCovidTestGroup } from "../questions/for-children/covidTest";
import { VaccinationGroup as ChildrenVaccinationGroup } from "../questions/for-children/vaccination";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { HealthGroup as ChildrenGeneralHealthGroup } from "../questions/for-children/health";
import { SymptomsGroup as ChildrenSymptomsGroup } from "../questions/for-children/symptoms";
import { EQ5DProxyGroup } from "../questions/for-children/eq5dProxy";
import { GeneralDataGroup as ChildrenGeneralDataGroup } from "../questions/for-children/generalData";


export const generateT24c = (): Survey | undefined => {
    const surveyKey = surveyKeys.T24c;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Nieuwe vragenlijst LongCOVID-onderzoek: 24 maanden"],
        ]),
        description: new Map([
            ["nl", "Vierentwintig maanden geleden ben je gestart met het LongCOVID-onderzoek. Dit is een vervolgvragenlijst. De vragenlijst richt zich op je gezondheid en zorggebruik."],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost ongeveer 20 minuten van je tijd."],
        ])
    })

    surveyEditor.editor.setRequireLoginBeforeSubmission(true);

    // *******************************
    // Questions
    // *******************************
    // COVID test group for children
    const childrenCovidTestGroupEditor = new ChildrenCovidTestGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(childrenCovidTestGroupEditor.getItem());

    // COVID vaccination for children
    const childrenVaccinationGroupEditor = new ChildrenVaccinationGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(childrenVaccinationGroupEditor.getItem());

    // SymptomsGroup for children
    const childrenSymptomsGroupEditor = new ChildrenSymptomsGroup(surveyKey, {
        olderThan10: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger11, 'false'),
        q11Ja: childrenCovidTestGroupEditor.q11JaSelectedExp,
    });
    surveyEditor.addSurveyItemToRoot(childrenSymptomsGroupEditor.getItem());

    // General Health for children
    const childrenGeneralHealthGroupEditor = new ChildrenGeneralHealthGroup(surveyKey, {
        hasDifficultyWithBreathing: childrenSymptomsGroupEditor.hasDifficultyBreathingExp,
        hasReportedSymptomsQ1: childrenSymptomsGroupEditor.hasAnyReportedSymptoms,
        youngerThan8: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger8, 'true'),
        youngerThan11: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger11, 'true'),
        between8And12: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.between8and12, 'true'),
        between13And18: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.older12, 'true'),
    });
    surveyEditor.addSurveyItemToRoot(childrenGeneralHealthGroupEditor.getItem());

   // EQ5D group
   const eq5dGroupEditor = new EQ5DProxyGroup(surveyKey, {
    olderThan7: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger8, 'false')
       });
surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    // General data group
    const childrenGeneralDataGroupEditor = new ChildrenGeneralDataGroup(surveyKey, {
        q11Ja: childrenCovidTestGroupEditor.q11JaSelectedExp,
    });
    surveyEditor.addSurveyItemToRoot(childrenGeneralDataGroupEditor.getItem());

    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Dit was de laatste vragenlijst voor het LongCOVID-onderzoek. Hartelijk dank voor het invullen van deze en van de andere vragenlijsten van het onderzoek.']
    ])));

    return surveyEditor.getSurvey();
}