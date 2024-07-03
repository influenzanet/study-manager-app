import { Survey, SurveyItem } from "survey-engine/data_types";
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
// import { SaTGroup } from "../questions/sat";
import { SF36Group } from "../questions/sf-36";
import { GeneralHealthGroup } from "../questions/ticp";
import { VaccinationGroup } from "../questions/vaccination";
import { VaccinationGroup as ChildrenVaccinationGroup } from "../questions/for-children/vaccination";
import { surveyKeys } from "../studyRules";
import { SymptomsGroup as ChildrenSymptomsGroup } from "../questions/for-children/symptoms";
import { IntroGroup as ChildrenGroupIntro } from "../questions/for-children/childGroupIntro";
import { HealthGroup as ChildrenGeneralHealthGroup } from "../questions/for-children/health";
import { GeneralDataGroup as ChildrenGeneralDataGroup } from "../questions/for-children/generalData";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";

const PostCovidInfo = (parentKey: string): SurveyItem => {
    const markdownContent = `
<div style="text-align: center; width: 100%;">
<a href="https://www.postcovidonderzoek.nl/">
  <img src="https://www.postcovidonderzoek.nl/logo.png" alt="Postcovid" style="width: 100%; max-width: 250px; ">
</a>
</div>

## Geen nieuwe deelnemers meer nodig voor onderzoek via longcovid.rivm.nl

Het RIVM LongCOVID onderzoek levert belangrijke informatie op over LongCOVID (tegenwoordig vaker post-COVID genoemd) in Nederland. Toch blijft nog veel onbekend over de oorzaak en beste aanpak van post-COVID. Daarom is in Nederland in 2024 het Post-COVID Netwerk Nederland opgericht waarin vele onderzoeks- en patiëntorganisaties samenwerken voor nieuw en divers onderzoek naar post-COVID.

Binnen het netwerk is gekozen om patiënten voor nieuw onderzoek centraal te werven via het nieuwe patiëntportaal [Postcovidonderzoek.nl](https://www.postcovidonderzoek.nl/). Om die reden stopt de inclusie via deze website. Wel willen we benadrukken dat als je nu nog meedoet aan het LongCOVID onderzoek dat je voortdurende betrokkenheid en het invullen van vragenlijsten bijdraagt aan het afronden van de studie.

Als je zelf post-COVID klachten hebt, nodigen we uit om je aan te melden via het landelijke portaal, [Postcovidonderzoek.nl](https://www.postcovidonderzoek.nl/).


`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'postCovidInfo',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ["nl", markdownContent],
                ]),
                className: ''
            })
        ]
    });
}


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
            ["nl", "Invullen van deze vragenlijst kost ongeveer 20-30 minuten van je tijd."],
        ])
    })

    surveyEditor.editor.setRequireLoginBeforeSubmission(true);

    surveyEditor.addSurveyItemToRoot(PostCovidInfo(surveyKey));



    return surveyEditor.getSurvey();
}
