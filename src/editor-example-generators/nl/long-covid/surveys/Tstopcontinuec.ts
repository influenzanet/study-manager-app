import { Survey } from "survey-engine/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { SCGroup } from "../questions/for-children/childStopcontinue";


export const generateTstopcontinuec = (): Survey | undefined => {
    const surveyKey = surveyKeys.Tstopcontinuec;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
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
        ['nl', 'Dit was de laatste vraag. Als je hebt aangegeven dat je geen vragenlijsten meer wil ontvangen dan zul je deze in de toekomst niet meer krijgen. Als je hebt aangegeven nog een jaar door te willen gaan met het onderzoek dan kun je hieronder op submit klikken en dan staat een nieuwe vragenlijst voor je klaar op de startpagina.']
    ])));

    return surveyEditor.getSurvey();
}
