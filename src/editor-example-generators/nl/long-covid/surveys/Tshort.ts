import { Survey } from "survey-engine/lib/data_types";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { CovidTestGroup } from "../questions/covidTest";
import { EQ5DGroup } from "../questions/eq5d";
import { VaccinationGroup } from "../questions/vaccination";
import { surveyKeys } from "../studyRules";

export const generateShort = (): Survey | undefined => {
    const surveyKey = surveyKeys.short;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKeys.short,
        name: new Map([
            ["en", "short"],
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
    const covidTestGroupEditor = new CovidTestGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(covidTestGroupEditor.getItem());

    const vaccineGroupEditor = new VaccinationGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(vaccineGroupEditor.getItem());

    const acuteHealthGroupEditor = new AcuteHealthGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(acuteHealthGroupEditor.getItem());

    const eq5dGroupEditor = new EQ5DGroup(surveyKey, true, true);
    //surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());

    return surveyEditor.getSurvey();
}
