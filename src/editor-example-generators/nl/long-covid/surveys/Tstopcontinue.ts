import { Survey } from "survey-engine/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { AgeCategoryFlagName, surveyKeys } from "../studyRules";
import { SCGroup } from "../questions/StopContinue";


export const generateTstopcontinue = (): Survey | undefined => {
    const surveyKey = surveyKeys.Tstopcontinue;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKeys.Tstopcontinue,
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

    const SCGroupEditor = new SCGroup(surveyKey);
    surveyEditor.addSurveyItemToRoot(SCGroupEditor.getItem());

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Als je hebt aangegeven nog een jaar door te willen gaan met het onderzoek dan kun je hieronder op submit klikken en dan staat een nieuwe vragenlijst voor je klaar op de startpagina.']
    ])));

    return surveyEditor.getSurvey();
}
