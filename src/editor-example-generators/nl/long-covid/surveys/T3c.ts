import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";
import { CovidTestGroup as ChildrenCovidTestGroup } from "../questions/for-children/covidTest";
import { VaccinationGroup as ChildrenVaccinationGroup } from "../questions/for-children/vaccination";
import { HealthGroup as ChildrenGeneralHealthGroup } from "../questions/for-children/health";
import { SymptomsGroup as ChildrenSymptomsGroup } from "../questions/for-children/symptoms";

export const generateT3c = (): Survey | undefined => {
    const surveyKey = surveyKeys.T3c;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["en", "Nieuwe vragenlijst LongCOVID-onderzoek: 3 maanden"],
        ]),
        description: new Map([
            ["en", "Drie maanden geleden ben je gestart met het LongCOVID-onderzoek. Dit is een vervolgvragenlijst. De vragenlijst richt zich op je gezondheid, en zorggebruik."],
        ]),
        durationText: new Map([
            ["en", "Invullen van deze vragenlijst kost ongeveer 20 minuten van je tijd."],
        ])
    })

    // COVID test group for children
    const childrenCovidTestGroupEditor = new ChildrenCovidTestGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(childrenCovidTestGroupEditor.getItem());

    // COVID vaccination for children
    const childrenVaccinationGroupEditor = new ChildrenVaccinationGroup(surveyKey, {
        groupCondition: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.older15, 'true'),
    });
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
        youngerThan8: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger8, 'true'),
        youngerThan11: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger11, 'true'),
        between8And12: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.between8and12, 'true'),
        between13And18: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.older12, 'true'),
    });
    surveyEditor.addSurveyItemToRoot(childrenGeneralHealthGroupEditor.getItem());

    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat.']
    ])));

    return surveyEditor.getSurvey();
}
