import { Survey } from "survey-engine/data_types";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { surveyKeys } from "../studyRules";
import { CovidTestGroup } from "../questions/covidTest";
import { VaccinationGroup } from "../questions/vaccination";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { Q_mMRC } from "../questions/mMRC";
import { NCSIGroup } from "../questions/ncsi";
// import { SaTGroup } from "../questions/sat";
import { Q_CIS } from "../questions/cis";
import { CFQGroup } from "../questions/cfq";
import { SF36Group } from "../questions/sf-36";
import { MedicineGroup } from "../questions/medicine";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { DemographieGroup } from "../questions/demographie";

export const generateT9 = (): Survey | undefined => {
    const surveyKey = surveyKeys.T9;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["nl", "Nieuwe vragenlijst LongCOVID-onderzoek: 9 maanden"],
        ]),
        description: new Map([
            ["nl", "Negen maanden geleden ben je gestart met het LongCOVID-onderzoek. Dit is een vervolgvragenlijst. De vragenlijst richt zich op je gezondheid, vaccinaties en zorggebruik."],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost ongeveer 20 minuten van je tijd."],
        ])
    })

    surveyEditor.editor.setRequireLoginBeforeSubmission(true);

    // *******************************
    // Questions
    // *******************************
    const covidTestGroupEditor = new CovidTestGroup(surveyKey, false);
    surveyEditor.addSurveyItemToRoot(covidTestGroupEditor.getItem());

    const vaccineGroupEditor = new VaccinationGroup(surveyKey, false);
    surveyEditor.addSurveyItemToRoot(vaccineGroupEditor.getItem());

    const acuteHealthGroupEditor = new AcuteHealthGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(acuteHealthGroupEditor.getItem());

    const hasKortademigCondition = CommonExpressions.multipleChoiceOptionsSelected(acuteHealthGroupEditor.getQAcuteHealthKey(), 'kortademig')
    surveyEditor.addSurveyItemToRoot(Q_mMRC(surveyKey, hasKortademigCondition, true));

    const ncsiGroupEditor = new NCSIGroup(surveyKey, hasKortademigCondition);
    surveyEditor.addSurveyItemToRoot(ncsiGroupEditor.getItem());

    // const satGroupEditor = new SaTGroup(surveyKey);
    // surveyEditor.addSurveyItemToRoot(satGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(Q_CIS(surveyKey, true));

    const cfqGroup = new CFQGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(cfqGroup.getItem());

    // surveyEditor.addSurveyItemToRoot(Q_CBS(surveyKey, true));

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
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat. Voor het onderzoek is het heel belangrijk dat je de vragenlijsten blijft invullen, ook als je geen klachten (meer) hebt door corona.']
    ])));


    return surveyEditor.getSurvey();
}
