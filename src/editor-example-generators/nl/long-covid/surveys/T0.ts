import { Survey } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs } from "../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { Q_CBS } from "../questions/cbs";
import { CFQGroup } from "../questions/cfq";
import { Q_CIS } from "../questions/cis";
import { DemographieGroup } from "../questions/demographie";
import { EQ5DGroup } from '../questions/eq5d';
import { HADSGroup } from "../questions/hads";
import { Q_IPAQ } from "../questions/ipaq";
import { MedicineGroup } from "../questions/medicine";
import { Q_mMRC } from "../questions/mMRC";
import { NCSIGroup } from "../questions/ncsi";
import { ParticipantCategoryGroup } from "../questions/participantCategory";
import { SaTGroup } from "../questions/sat";
import { SF36Group } from "../questions/sf-36";
import { GeneralHealthGroup } from "../questions/ticp";
import { surveyKeys } from "../studyRules";


export const generateT0 = (): Survey | undefined => {
    const surveyKey = surveyKeys.T0;

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
    const categoryQuestions = new ParticipantCategoryGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(categoryQuestions.getItem());


    const isChildParticipant = expWithArgs('lt',
        categoryQuestions.getAgeInYearsExpression(),
        16
    )
    const isNotChildParticipant = expWithArgs('gte',
        categoryQuestions.getAgeInYearsExpression(),
        16
    )

    // ===========================
    // ADULT QUESTIONS BRANCH
    const adultVersion = new GroupItemEditor(surveyKey, 'A');
    adultVersion.groupEditor.setCondition(isNotChildParticipant)

    const generalHealthGroupEditor = new GeneralHealthGroup(adultVersion.key);
    adultVersion.addItem(generalHealthGroupEditor.getItem());

    adultVersion.addItem(Q_mMRC(adultVersion.key, true));

    const ncsiGroupEditor = new NCSIGroup(adultVersion.key);
    adultVersion.addItem(ncsiGroupEditor.getItem());

    const satGroupEditor = new SaTGroup(adultVersion.key);
    adultVersion.addItem(satGroupEditor.getItem());

    const eq5dGroupEditor = new EQ5DGroup(adultVersion.key, true, false);
    adultVersion.addItem(eq5dGroupEditor.getItem());

    adultVersion.addItem(Q_CIS(adultVersion.key, true));

    const cfqGroup = new CFQGroup(adultVersion.key);
    adultVersion.addItem(cfqGroup.getItem());

    const hadsGroup = new HADSGroup(adultVersion.key);
    adultVersion.addItem(hadsGroup.getItem());

    adultVersion.addItem(Q_CBS(adultVersion.key, true));

    adultVersion.addItem(Q_IPAQ(adultVersion.key, true));

    const sf36Group = new SF36Group(adultVersion.key);
    adultVersion.addItem(sf36Group.getItem());

    const medicineGroupEditor = new MedicineGroup(adultVersion.key);
    adultVersion.addItem(medicineGroupEditor.getItem());

    const demographieGroupEditor = new DemographieGroup(adultVersion.key);
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
                    ['nl', `Child version info`]
                ])
            })]
    }))



    surveyEditor.addSurveyItemToRoot(adultVersion.getItem());
    surveyEditor.addSurveyItemToRoot(childVersion.getItem());


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Thank you for your time, please submit here.']
    ])));

    return surveyEditor.getSurvey();
}
