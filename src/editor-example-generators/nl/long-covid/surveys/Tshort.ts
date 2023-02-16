import { Survey } from "survey-engine/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AcuteHealthGroup } from "../questions/acuteHealth";
import { CovidTestGroup } from "../questions/covidTest";
import { EQ5DGroup } from "../questions/eq5d";
import { surveyKeys } from "../studyRules";

export const generateShort = (): Survey | undefined => {
    const surveyKey = surveyKeys.short;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKeys.short,
        name: new Map([
            ["nl", "Wekelijkse update van klachten LongCOVID-onderzoek"],
        ]),
        description: new Map([
            ["nl", "In de vorige vragenlijst heb je aangegeven klachten te hebben. In deze update vragen we je of deze klachten nog steeds aanwezig zijn, en hoe je je voelt."],
        ]),
        durationText: new Map([
            ["nl", "Invullen van deze vragenlijst kost ongeveer 5 minuten van je tijd."],
        ])
    })

    surveyEditor.editor.setRequireLoginBeforeSubmission(true);

    // *******************************
    // Questions
    // *******************************
    const covidTestGroupEditor = new CovidTestGroup(surveyKey, false);
    surveyEditor.addSurveyItemToRoot(covidTestGroupEditor.getItem());

    const acuteHealthGroupEditor = new AcuteHealthGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(acuteHealthGroupEditor.getItem());

    const eq5dGroupEditor = new EQ5DGroup(surveyKey, true, true, false, undefined, {
        geenReukSmaak: acuteHealthGroupEditor.geenReukSmaak,
    });
    surveyEditor.addSurveyItemToRoot(eq5dGroupEditor.getItem());


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Hartelijk dank voor het invullen. Je krijgt via de mail een uitnodiging als er een nieuwe vragenlijst voor je klaar staat. Voor het onderzoek is het heel belangrijk dat je de vragenlijsten blijft invullen, ook als je geen klachten (meer) hebt door corona.']
    ])));

    return surveyEditor.getSurvey();
}
