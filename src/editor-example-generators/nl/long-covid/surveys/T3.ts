import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { CFQGroup } from "../questions/cfq";
import { Q_CIS } from "../questions/cis";
import { CovidTestGroup } from "../questions/covidTest";
import { DemographieGroup } from "../questions/demographie";
import { EQ5DGroup } from "../questions/eq5d";
import { HADSGroup } from "../questions/hads";
import { Q_IPAQ } from "../questions/ipaq";
import { MedicineGroup } from "../questions/medicine";
import { Q_mMRC } from "../questions/mMRC";
import { NCSIGroup } from "../questions/ncsi";
import { SaTGroup } from "../questions/sat";
import { SF36Group } from "../questions/sf-36";
import { VaccinationGroup } from "../questions/vaccination";
import { surveyKeys } from "../studyRules";

export const generateT3 = (): Survey | undefined => {
    const surveyKey = surveyKeys.T3;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Nieuwe vragenlijst LongCOVID-onderzoek: 3 maanden"],
        ]),
        description: new Map([
            ["nl", "Drie maanden geleden ben je gestart met het LongCOVID-onderzoek. Dit is een vervolgvragenlijst. De vragenlijst richt zich op je gezondheid, vaccinaties en zorggebruik."],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost ongeveer 20 minuten van je tijd."],
        ])
    })


    // *******************************
    // Questions
    // *******************************
    const covidTestGroupEditor = new CovidTestGroup(surveyKey, false);
    surveyEditor.addSurveyItemToRoot(covidTestGroupEditor.getItem());

    // const vaccineGroupEditor = new VaccinationGroup(surveyKey, false);
    // surveyEditor.addSurveyItemToRoot(vaccineGroupEditor.getItem());

    // const acuteHealthGroupEditor = new AcuteHealthGroup(surveyKey);
    // surveyEditor.addSurveyItemToRoot(acuteHealthGroupEditor.getItem());

    // // const hasKortademigCondition = CommonExpressions.multipleChoiceOptionsSelected(acuteHealthGroupEditor.getQAcuteHealthKey(), 'kortademig')
    // // surveyEditor.addSurveyItemToRoot(Q_mMRC(surveyKey, hasKortademigCondition, true));

    // // const ncsiGroupEditor = new NCSIGroup(surveyKey, hasKortademigCondition);
    // // surveyEditor.addSurveyItemToRoot(ncsiGroupEditor.getItem());

    // // const satGroupEditor = new SaTGroup(surveyKey);
    // // surveyEditor.addSurveyItemToRoot(satGroupEditor.getItem());

    // // const eq5dGroupEditor = new EQ5DGroup(surveyKey, true, true);
    // // surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    // // surveyEditor.addSurveyItemToRoot(Q_CIS(surveyKey, true));

    // // const cfqGroup = new CFQGroup(surveyKey);
    // // surveyEditor.addSurveyItemToRoot(cfqGroup.getItem());

    // // const hadsGroup = new HADSGroup(surveyKey);
    // // surveyEditor.addSurveyItemToRoot(hadsGroup.getItem());

    // // // surveyEditor.addSurveyItemToRoot(Q_CBS(surveyKey, true));

    // // surveyEditor.addSurveyItemToRoot(Q_IPAQ(surveyKey, true));

    // // const sf36Group = new SF36Group(surveyKey);
    // // surveyEditor.addSurveyItemToRoot(sf36Group.getItem());

    // const medicineGroupEditor = new MedicineGroup(surveyKey);
    // surveyEditor.addSurveyItemToRoot(medicineGroupEditor.getItem());

    const demographieGroupEditor = new DemographieGroup(
        surveyKey,
        undefined, // not relevant here, since pregnancy question only in T0
        covidTestGroupEditor.getQ11JaCondition(),
    );
    surveyEditor.addSurveyItemToRoot(demographieGroupEditor.getItem());


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat. Voor het onderzoek is het heel belangrijk dat je de vragenlijsten blijft invullen, ook als je geen klachten (meer) hebt door corona.']
    ])));


    return surveyEditor.getSurvey();
}
