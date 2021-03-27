import { Survey } from "survey-engine/lib/data_types";
import { SimpleSurveyEditor } from "../../../editor-engine/utils/simple-survey-editor";
import { Q_CBS } from "./questions/cbs";
import { CFQGroup } from "./questions/cfq";
import { Q_CIS } from "./questions/cis";
import { DemographieGroup } from "./questions/demographie";
import { EQ5DGroup } from './questions/eq5d';
import { HADSGroup } from "./questions/hads";
import { Q_IPAQ } from "./questions/ipaq";
import { MedicineGroup } from "./questions/medicine";
import { Q_mMRC } from "./questions/mMRC";
import { NCSIGroup } from "./questions/ncsi";
import { SaTGroup } from "./questions/sat";
import { SF36Group } from "./questions/sf-36";
import { GeneralHealthGroup } from "./questions/ticp";


export const generateT0 = (): Survey | undefined => {
    const surveyKey = 'TO';

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["en", "T0"],
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
    const generalHealthGroupEditor = new GeneralHealthGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(generalHealthGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(Q_mMRC(surveyKey, true));

    const ncsiGroupEditor = new NCSIGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(ncsiGroupEditor.getItem());

    const satGroupEditor = new SaTGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(satGroupEditor.getItem());

    const eq5dGroupEditor = new EQ5DGroup(surveyKey, true, false);
    surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(Q_CIS(surveyKey, true));

    const cfqGroup = new CFQGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(cfqGroup.getItem());

    const hadsGroup = new HADSGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(hadsGroup.getItem());

    surveyEditor.addSurveyItemToRoot(Q_CBS(surveyKey, true));

    surveyEditor.addSurveyItemToRoot(Q_IPAQ(surveyKey, true));

    const sf36Group = new SF36Group(surveyKey);
    surveyEditor.addSurveyItemToRoot(sf36Group.getItem());

    const medicineGroupEditor = new MedicineGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(medicineGroupEditor.getItem());

    const demographieGroupEditor = new DemographieGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(demographieGroupEditor.getItem());

    return surveyEditor.getSurvey();
}
