import { Survey } from "survey-engine/lib/data_types";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { EQ5DGroup } from "../questions/eq5d";
import { surveyKeys } from "../studyRules";
import { CovidTestGroup } from "../questions/covidTest";
import { VaccinationGroup } from "../questions/vaccination";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { Q_mMRC } from "../questions/mMRC";
import { NCSIGroup } from "../questions/ncsi";
import { SaTGroup } from "../questions/sat";
import { Q_CIS } from "../questions/cis";
import { CFQGroup } from "../questions/cfq";
import { HADSGroup } from "../questions/hads";
import { Q_CBS } from "../questions/cbs";
import { Q_IPAQ } from "../questions/ipaq";
import { SF36Group } from "../questions/sf-36";
import { MedicineGroup } from "../questions/medicine";

export const generateT6 = (): Survey | undefined => {
    const surveyKey = surveyKeys.T6;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Nieuwe vragenlijst LongCOVID-onderzoek: 6 maanden"],
        ]),
        description: new Map([
            ["nl", "Zes maanden geleden ben je gestart met het LongCOVID-onderzoek. Dit is een vervolgvragenlijst. De vragenlijst richt zich op je gezondheid, vaccinaties en zorggebruik."],
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

    const vaccineGroupEditor = new VaccinationGroup(surveyKey, false);
    surveyEditor.addSurveyItemToRoot(vaccineGroupEditor.getItem());

    const acuteHealthGroupEditor = new AcuteHealthGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(acuteHealthGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(Q_mMRC(surveyKey, true));

    const ncsiGroupEditor = new NCSIGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(ncsiGroupEditor.getItem());

    const satGroupEditor = new SaTGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(satGroupEditor.getItem());

    const eq5dGroupEditor = new EQ5DGroup(surveyKey, true, true);
    surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(Q_CIS(surveyKey, true));

    const cfqGroup = new CFQGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(cfqGroup.getItem());

    const hadsGroup = new HADSGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(hadsGroup.getItem());

    // surveyEditor.addSurveyItemToRoot(Q_CBS(surveyKey, true));

    surveyEditor.addSurveyItemToRoot(Q_IPAQ(surveyKey, true));

    const sf36Group = new SF36Group(surveyKey);
    surveyEditor.addSurveyItemToRoot(sf36Group.getItem());

    const medicineGroupEditor = new MedicineGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(medicineGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat.']
    ])));


    return surveyEditor.getSurvey();
}
