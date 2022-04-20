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
import { GeneralHealthGroup } from "../questions/ticp";
import { VaccinationGroup } from "../questions/vaccination";
import { surveyKeys } from "../studyRules";

export const generateT24 = (): Survey | undefined => {
    const surveyKey = surveyKeys.T24;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Nieuwe vragenlijst LongCOVID-onderzoek: 24 maanden"],
        ]),
        description: new Map([
            ["nl", "Een jaar geleden ben je gestart met het LongCOVID-onderzoek. Dit is de laatste vragenlijst. De vragenlijst richt zich op je gezondheid, vaccinaties en zorggebruik."],
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

    const generalHealthGroupEditor = new GeneralHealthGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(generalHealthGroupEditor.getItem());

    const hasKortademigCondition = CommonExpressions.multipleChoiceOptionsSelected(acuteHealthGroupEditor.getQAcuteHealthKey(), 'kortademig')
    surveyEditor.addSurveyItemToRoot(Q_mMRC(surveyKey, hasKortademigCondition, true));

    const ncsiGroupEditor = new NCSIGroup(surveyKey, hasKortademigCondition);
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

    const demographieGroupEditor = new DemographieGroup(
        surveyKey,
        {
            getAgeInYearsExpression: undefined, // not relevant here, since pregnancy question only in T0
            testQ11jaCondition: covidTestGroupEditor.getQ11JaCondition(),
            geenReukSmaak: acuteHealthGroupEditor.geenReukSmaak,
        }
    );
    surveyEditor.addSurveyItemToRoot(demographieGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Dit was de laatste vragenlijst voor het LongCOVID-onderzoek. Hartelijk dank voor het invullen van deze en van de andere vragenlijsten van het onderzoek. Als je hebt aangegeven dat je dat wilt zullen we je benaderen om nog een jaar langer deel te nemen aan het onderzoek.']
    ])));

    return surveyEditor.getSurvey();
}
