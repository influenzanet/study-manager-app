import { Expression, Survey } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";
import { SCGroup } from "../questions/StopContinue";
import { DemographieGroup } from "../questions/demographie";
import { Q_mMRC } from "../questions/mMRC";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { CovidTestGroup } from "../questions/covidTest";
import { VaccinationGroup } from "../questions/vaccination";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { GeneralHealthGroup } from "../questions/ticp";
import { EQ5DGroup } from "../questions/eq5d";
import { CFQGroup } from "../questions/cfq";
import { SF36Group } from "../questions/sf-36";
import { MedicineGroup } from "../questions/medicine";
import { NCSIGroup } from "../questions/ncsi";
import { Q_CIS } from "../questions/cis";


export const generateTstopcontinue = (): Survey | undefined => {
    const surveyKey = surveyKeys.Tstopcontinue;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKeys.Tstopcontinue,
        name: new Map([
            ["nl", "Korte update LongCOVID-onderzoek"],
        ]),
        description: new Map([
            ["nl", "Je kunt in deze vragenlijst aangeven of je mee blijft doen aan het LongCOVID onderzoek"],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost enkele minuten van je tijd."],
        ])
    })

    surveyEditor.editor.setRequireLoginBeforeSubmission(true);

    // *******************************
    // Questions
    // *******************************

    const SCGroupEditor = new SCGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(SCGroupEditor.getItem());


    // We want to ask participants that want to continue the regular questions once and immediately
    //TODO; Can't get the group condition to work

    const continueGroupEditor = new ContinueGroup(
        surveyKey,
        SCGroupEditor.S1JaCondition!
    );
    surveyEditor.addSurveyItemToRoot(continueGroupEditor.getItem());


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Als je hebt aangegeven dat je geen vragenlijsten meer wil ontvangen dan zul je deze in de toekomst niet meer krijgen. Als je hebt aangegeven nog een jaar door te willen gaan met het onderzoek dan kun je hieronder op submit klikken en dan staat een nieuwe vragenlijst voor je klaar op de startpagina.']
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

    initQuestions() {
        const covidTestGroupEditor = new CovidTestGroup(this.key, false);
        this.addItem(covidTestGroupEditor.getItem());

        const vaccineGroupEditor = new VaccinationGroup(this.key, false);
        this.addItem(vaccineGroupEditor.getItem());

        const AcuteHealthGroupEditor = new AcuteHealthGroup(this.key);
        this.addItem(AcuteHealthGroupEditor.getItem());

        const GeneralHealthGroup = new AcuteHealthGroup(this.key);
        this.addItem(GeneralHealthGroup.getItem());

        const hasKortademigCondition = CommonExpressions.multipleChoiceOptionsSelected(AcuteHealthGroupEditor.getQAcuteHealthKey(), 'kortademig')
        this.addItem(Q_mMRC(this.key, hasKortademigCondition, true));

        const ncsiGroupEditor = new NCSIGroup(this.key, hasKortademigCondition);
        this.addItem(ncsiGroupEditor.getItem());

        const EQ5DGroupEditor = new EQ5DGroup(this.key, true, true);
        this.addItem(EQ5DGroupEditor.getItem());

        this.addItem(Q_CIS(this.key, true));

        const CFQGroupEditor = new CFQGroup(this.key);
        this.addItem(CFQGroupEditor.getItem());

        const SF36GroupEditor = new SF36Group(this.key);
        this.addItem(SF36GroupEditor.getItem());

        const MedicineGroupEditor = new MedicineGroup(this.key);
        this.addItem(MedicineGroupEditor.getItem());

        const demographieGroupEditor = new DemographieGroup(this.key, {});
        this.addItem(demographieGroupEditor.getItem());
    }
}
