import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs } from "../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { CFQGroup } from "../questions/cfq";
import { Q_CIS } from "../questions/cis";
import { CovidTestGroup } from "../questions/covidTest";
import { CovidTestGroup as ChildrenCovidTestGroup } from "../questions/for-children/covidTest";
import { DemographieGroup } from "../questions/demographie";
import { EQ5DGroup } from '../questions/eq5d';
import { HADSGroup } from "../questions/hads";
import { Q_IPAQ } from "../questions/ipaq";
import { MedicineGroup } from "../questions/medicine";
import { Q_mMRC } from "../questions/mMRC";
import { NCSIGroup } from "../questions/ncsi";
import { ParticipantCategoryGroup } from "../questions/participantCategory";
import { PrehistoryGroup } from "../questions/prehistory";
import { SaTGroup } from "../questions/sat";
import { SF36Group } from "../questions/sf-36";
import { GeneralHealthGroup } from "../questions/ticp";
import { VaccinationGroup } from "../questions/vaccination";
import { VaccinationGroup as ChildrenVaccinationGroup } from "../questions/for-children/vaccination";
import { surveyKeys } from "../studyRules";
import { SymptomsGroup as ChildrenSymptomsGroup } from "../questions/for-children/symptoms";
import { IntroGroup as ChildrenGroupIntro } from "../questions/for-children/childGroupIntro";
import { HealthGroup as ChildrenGeneralHealthGroup } from "../questions/for-children/health";


export const generateT0 = (): Survey | undefined => {
    const surveyKey = surveyKeys.T0;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Vragenlijst start LongCOVID-onderzoek"],
        ]),
        description: new Map([
            ["nl", "Dit is de eerste vragenlijst van het LongCOVID-onderzoek. De vragenlijst richt zich op je gezondheid, vaccinaties en zorggebruik."],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost ongeveer 30 minuten van je tijd."],
        ])
    })


    // *******************************
    // Questions
    // *******************************
    const participantInfos = new ParticipantCategoryGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(participantInfos.getItem());

    const isChildParticipant =
        expWithArgs('or',
            participantInfos.isYounger(16),
            participantInfos.getIsForAKind()
        );
    const isNotChildParticipant = expWithArgs('not',
        isChildParticipant
    )

    // ===========================
    // ADULT QUESTIONS BRANCH
    const adultVersion = new GroupItemEditor(surveyKey, 'A');
    adultVersion.groupEditor.setCondition(isNotChildParticipant)

    const covidTestGroupEditor = new CovidTestGroup(adultVersion.key, true);
    adultVersion.addItem(covidTestGroupEditor.getItem());

    const vaccineGroupEditor = new VaccinationGroup(adultVersion.key, true);
    adultVersion.addItem(vaccineGroupEditor.getItem());

    const acuteHealthGroupEditor = new AcuteHealthGroup(adultVersion.key, covidTestGroupEditor.getQ11JaCondition());
    adultVersion.addItem(acuteHealthGroupEditor.getItem());

    const prehistoryGroupEditor = new PrehistoryGroup(adultVersion.key);
    adultVersion.addItem(prehistoryGroupEditor.getItem());

    const generalHealthGroupEditor = new GeneralHealthGroup(adultVersion.key);
    adultVersion.addItem(generalHealthGroupEditor.getItem());

    const hasKortademigCondition = CommonExpressions.multipleChoiceOptionsSelected(acuteHealthGroupEditor.getQAcuteHealthKey(), 'kortademig')
    adultVersion.addItem(Q_mMRC(adultVersion.key, hasKortademigCondition, true));

    const ncsiGroupEditor = new NCSIGroup(adultVersion.key, hasKortademigCondition);
    adultVersion.addItem(ncsiGroupEditor.getItem());

    const satGroupEditor = new SaTGroup(adultVersion.key);
    adultVersion.addItem(satGroupEditor.getItem());

    const eq5dGroupEditor = new EQ5DGroup(adultVersion.key, true, true);
    adultVersion.addItem(eq5dGroupEditor.getItem());

    adultVersion.addItem(Q_CIS(adultVersion.key, true));

    const cfqGroup = new CFQGroup(adultVersion.key);
    adultVersion.addItem(cfqGroup.getItem());

    const hadsGroup = new HADSGroup(adultVersion.key);
    adultVersion.addItem(hadsGroup.getItem());

    // adultVersion.addItem(Q_CBS(adultVersion.key, true));

    adultVersion.addItem(Q_IPAQ(adultVersion.key, true));

    const sf36Group = new SF36Group(adultVersion.key);
    adultVersion.addItem(sf36Group.getItem());

    const medicineGroupEditor = new MedicineGroup(adultVersion.key, covidTestGroupEditor.getQ11JaCondition());
    adultVersion.addItem(medicineGroupEditor.getItem());

    const demographieGroupEditor = new DemographieGroup(
        adultVersion.key,
        participantInfos.getAgeInYearsExpression(),
        covidTestGroupEditor.getQ11JaCondition(),
    );
    adultVersion.addItem(demographieGroupEditor.getItem());


    // ===========================
    // CHILD QUESTIONS BRANCH
    const childVersion = new GroupItemEditor(surveyKey, 'C');
    childVersion.groupEditor.setCondition(isChildParticipant);

    const minAge = 4;

    // For children under 5
    const introGroup = new ChildrenGroupIntro(childVersion.key, {
        belowMinAge: participantInfos.isYounger(minAge, true)
    });
    childVersion.addItem(introGroup.getItem());

    // COVID test group for children
    const childrenCovidTestGroupEditor = new ChildrenCovidTestGroup(childVersion.key);
    childrenCovidTestGroupEditor.groupEditor.setCondition(participantInfos.isOlder(minAge));
    childVersion.addItem(childrenCovidTestGroupEditor.getItem());

    // COVID vaccination for children
    const childrenVaccinationGroupEditor = new ChildrenVaccinationGroup(childVersion.key, {
        groupCondition: participantInfos.isOlder(15),
    });
    childVersion.addItem(childrenVaccinationGroupEditor.getItem());

    // SymptomsGroup for children
    const childrenSymptomsGroupEditor = new ChildrenSymptomsGroup(childVersion.key, {
        groupCondition: participantInfos.isOlder(minAge),
        olderThan10: participantInfos.isOlder(10),
    });
    childVersion.addItem(childrenSymptomsGroupEditor.getItem());

    // General Health for children
    const childrenGeneralHealthGroupEditor = new ChildrenGeneralHealthGroup(childVersion.key, {
        groupCondition: participantInfos.isOlder(minAge),
        hasDifficultyWithBreathing: childrenSymptomsGroupEditor.hasDifficultyBreathingExp,
        youngerThan8: participantInfos.isYounger(8),
        between8And12: participantInfos.isBetweenAges(8, 12, true),
        between13And18: participantInfos.isBetweenAges(13, 18, true),
    });
    childVersion.addItem(childrenGeneralHealthGroupEditor.getItem());

    // TODO: add further child questions


    surveyEditor.addSurveyItemToRoot(adultVersion.getItem());
    surveyEditor.addSurveyItemToRoot(childVersion.getItem());


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat.']
    ])));

    return surveyEditor.getSurvey();
}
