import { Expression, Survey } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
//unkown change, but fixes error, should be checked!
//import { surveyKeys } from "../studyRules";
import { SCGroup } from "../questions/for-children/childStopcontinue";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { CovidTestGroup as ChildrenCovidTestGroup } from "../questions/for-children/covidTest_catch";
import { VaccinationGroup as ChildrenVaccinationGroup } from "../questions/for-children/vaccination_catch";
import { HealthGroup as ChildrenGeneralHealthGroup } from "../questions/for-children/health_Catch";
import { SymptomsGroup as ChildrenSymptomsGroup } from "../questions/for-children/symptoms";
import { EQ5DProxyGroup } from "../questions/for-children/eq5dProxy";
import { GeneralDataGroup as ChildrenGeneralDataGroup } from "../questions/for-children/generalData";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";

export const generateTstopcontinuec = (): Survey | undefined => {
    const surveyKey = surveyKeys.Tstopcontinuec;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Laatste vragenlijst over LongCOVID-onderzoek"],
        ]),
        description: new Map([
            ["nl", "In de vorige vragenlijst heb je aangegeven klachten te hebben. In deze update vragen we je of deze klachten nog steeds aanwezig zijn, en hoe je je voelt."],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost ongeveer 5 minuten van je tijd."],
        ])
    })

    surveyEditor.editor.setRequireLoginBeforeSubmission(true);

    // *******************************
    // Questions
    // *******************************

    const SCGroupEditor = new SCGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(SCGroupEditor.getItem());


    // We want to ask participants that want to continue the regular questions once and immediately
    //TODO; Can't get the group condition to work [done]

    const continueGroupEditor = new ContinueGroup(
        surveyKey,
        SCGroupEditor.S1JaCondition!
    );
    surveyEditor.addSurveyItemToRoot(continueGroupEditor.getItem());


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Heel veel dank voor je medewerking aan het onderzoek. Als je hieronder op verzenden klikt krijg je geen vragenlijsten meer van ons.']
    ])));

    return surveyEditor.getSurvey();
}




export class ContinueGroup extends GroupItemEditor {
    constructor(
        parentKey: string,
        condition: Expression,
    ) {
        const groupKey = 'continue';
        super(parentKey, groupKey);
        this.groupEditor.setCondition(condition);
        this.initQuestions();
    }

    initQuestions() { //adding Qeustion of T12c to the catch-up

        // COVID test group for children
        const childrenCovidTestGroupEditor = new ChildrenCovidTestGroup(this.key);
        this.addItem(childrenCovidTestGroupEditor.getItem());

        // COVID vaccination for children
        const childrenVaccinationGroupEditor = new ChildrenVaccinationGroup(this.key);
        this.addItem(childrenVaccinationGroupEditor.getItem());

        // SymptomsGroup for children
        const childrenSymptomsGroupEditor = new ChildrenSymptomsGroup(this.key, {
            olderThan10: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger11, 'false'),
            q11Ja: childrenCovidTestGroupEditor.q11JaSelectedExp,
        });
        this.addItem(childrenSymptomsGroupEditor.getItem());

        // General Health for children
        const childrenGeneralHealthGroupEditor = new ChildrenGeneralHealthGroup(this.key, {
            hasDifficultyWithBreathing: childrenSymptomsGroupEditor.hasDifficultyBreathingExp,
            hasReportedSymptomsQ1: childrenSymptomsGroupEditor.hasAnyReportedSymptoms,
            youngerThan8: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger8, 'true'),
            youngerThan11: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger11, 'true'),
            between8And12: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.between8and12, 'true'),
            between13And18: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.older12, 'true'),
        });
        this.addItem(childrenGeneralHealthGroupEditor.getItem());

        // EQ5D group
        const eq5dGroupEditor = new EQ5DProxyGroup(this.key, {
            olderThan7: CommonExpressions.hasParticipantFlag(AgeCategoryFlagName.younger8, 'false')
        });
        this.addItem(eq5dGroupEditor.getItem());

        // General data group
        const childrenGeneralDataGroupEditor = new ChildrenGeneralDataGroup(this.key, {
            q11Ja: childrenCovidTestGroupEditor.q11JaSelectedExp,
        });
        this.addItem(childrenGeneralDataGroupEditor.getItem());



    }
}
