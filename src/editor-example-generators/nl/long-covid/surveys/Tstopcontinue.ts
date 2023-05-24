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

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['nl', 'Dit was de laatste vraag. Als je hebt aangegeven dat je geen vragenlijsten meer wil ontvangen dan zul je deze in de toekomst niet meer krijgen. Als je hebt aangegeven nog een jaar door te willen gaan met het onderzoek dan kun je hieronder op submit klikken en dan staat een nieuwe vragenlijst voor je klaar op de startpagina.']
    ])));

    return surveyEditor.getSurvey();
}
