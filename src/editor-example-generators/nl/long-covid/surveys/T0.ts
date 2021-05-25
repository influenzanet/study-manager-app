import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs } from "../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { CFQGroup } from "../questions/cfq";
import { Q_CIS } from "../questions/cis";
import { CovidTestGroup } from "../questions/covidTest";
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
import { surveyKeys } from "../studyRules";


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
    const categoryQuestions = new ParticipantCategoryGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(categoryQuestions.getItem());

    const isChildParticipant =
        expWithArgs('or',
            expWithArgs('lt',
                categoryQuestions.getAgeInYearsExpression(),
                16
            ),
            categoryQuestions.getIsForAKind()
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

    const medicineGroupEditor = new MedicineGroup(adultVersion.key);
    adultVersion.addItem(medicineGroupEditor.getItem());

    const demographieGroupEditor = new DemographieGroup(
        adultVersion.key,
        categoryQuestions.getAgeInYearsExpression(),
        covidTestGroupEditor.getQ11JaCondition(),
    );
    adultVersion.addItem(demographieGroupEditor.getItem());


    // ===========================
    // CHILD QUESTIONS BRANCH
    const childVersion = new GroupItemEditor(surveyKey, 'C');
    childVersion.groupEditor.setCondition(isChildParticipant);

    childVersion.addItem(SurveyItemGenerators.display({
        parentKey: childVersion.key,
        itemKey: 'info',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ['nl', `Het LongCOVID-onderzoek bij kinderen is helaas nog niet van start gegaan. Volg de informatie op de website [longcovid.rivm.nl](longcovid.rivm.nl) over de start van het onderzoek bij kinderen.`]
                ])
            })]
    }))



    surveyEditor.addSurveyItemToRoot(adultVersion.getItem());
    surveyEditor.addSurveyItemToRoot(childVersion.getItem());


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat.']
    ])));

    return surveyEditor.getSurvey();
}
