import { Expression, Survey } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";
import { SCGroup } from "../questions/StopContinue";
//Trouble
import { DemographieGroup } from "../questions/demographie_catch";
import { Q_mMRC } from "../questions/mMRC_catch";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
//Trouble
import { CovidTestGroup } from "../questions/covidTest_catch";
import { VaccinationGroup } from "../questions/vaccination_catch_up";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { GeneralHealthGroup } from "../questions/ticp";
import { EQ5DGroup } from "../questions/eq5d";
import { CFQGroup } from "../questions/cfq";
import { SF36Group } from "../questions/sf-36";
import { MedicineGroup } from "../questions/medicine_catchup";
import { NCSIGroup } from "../questions/ncsi_catch";
import { Q_CIS } from "../questions/cis";


export const generateTstopcontinue = (): Survey | undefined => {
    const surveyKey = surveyKeys.Tstopcontinue;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKeys.Tstopcontinue,
        name: new Map([
            ["nl", "Laatste vragenlijst LongCOVID-onderzoek of vragenlijsten stopzetten."],
        ]),
        description: new Map([
            ["nl", "Je kunt via deze knop de laatste vragenlijst invullen of je vragenlijsten stopzetten."],
        ]),
        durationText: new Map([
            ["nl", "Vragenlijsten stopzetten kan in minder dan 1 minuut."],
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
        SCGroupEditor.S1JaCondition!,
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

    initQuestions() {
        const covidTestGroupEditor = new CovidTestGroup(this.key, false);
        this.addItem(covidTestGroupEditor.getItem());

         const vaccineGroupEditor = new VaccinationGroup(this.key, false);
         this.addItem(vaccineGroupEditor.getItem());

         const AcuteHealthGroupEditor = new AcuteHealthGroup(this.key);
         this.addItem(AcuteHealthGroupEditor.getItem());

         const GeneralHealthGroupEditor = new GeneralHealthGroup(this.key);
         this.addItem(GeneralHealthGroupEditor.getItem());

        // const hasKortademigCondition = CommonExpressions.multipleChoiceOptionsSelected(AcuteHealthGroupEditor.getQAcuteHealthKey(), 'kortademig')
        // this.addItem(Q_mMRC(this.key, hasKortademigCondition, true));

        // const hasKortademigCondition = CommonExpressions.multipleChoiceOptionsSelected(AcuteHealthGroupEditor.getQAcuteHealthKey(), 'kortademig')
         this.addItem(Q_mMRC(this.key,true));

         //const ncsiGroupEditor = new NCSIGroup(this.key, hasKortademigCondition);
         //this.addItem(ncsiGroupEditor.getItem());

         const ncsiGroupEditor = new NCSIGroup(this.key);
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

        const demographieGroupEditor = new DemographieGroup(
            this.key,
            {
                getAgeInYearsExpression: undefined, // not relevant here, since pregnancy question only in T0
                testQ11jaCondition: covidTestGroupEditor.getQ11JaCondition(),
            }
        );
        this.addItem(demographieGroupEditor.getItem());
    }
}
