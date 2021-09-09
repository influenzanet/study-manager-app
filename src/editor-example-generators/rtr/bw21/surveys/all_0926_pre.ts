import { Survey } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { getAUFM1, getAUFM2, getKANZLER, getPROB1, getKPROB1, getREZEPT, getSKPART, getSKPOL, getWABS, getWBT, getWK, getWPERF, getWSTRATAB, getWSTRATAL, getWSTRATOS, getBIASLZ, getBIASCB, getWAHL1, getWAHL2 } from "./question_pool/questions";
import { getSYNC1, getSYNC4, getSYNC5, getSYNC2, getSYNC3, getSYNC6, getSYNC7 } from "./question_pool/sync_questions";


export const generate_ALL0926PRE = (): Survey | undefined => {
    const surveyKey = surveyKeys.ALL_0926_PRE;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["de", "Vragenlijst start LongCOVID-onderzoek"],
        ]),
        description: new Map([
            ["de", "Dit is de eerste vragenlijst van het LongCOVID-onderzoek. De vragenlijst richt zich op je gezondheid, vaccinaties en zorggebruik."],
        ]),
        durationText: new Map([
            ["de", "Invullen van deze vragenlijst kost ongeveer 30 minuten van je tijd."],
        ])
    })

    const isRequired = false;

    surveyEditor.editor.setMaxItemPerPage({ small: 1, large: 1 });

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.display({
        parentKey: surveyKey,
        itemKey: 'intro',
        content: [ComponentGenerators.markdown({
            content: new Map([
                ['de', `
Im Fragebogen gibt es keine richtigen oder falschen Antworten, sondern nur solche, die Ihrer Perspektive besser oder schlechter entsprechen. Bitte geben Sie deshalb jeweils die Antwort, die Ihrer Ansicht oder Ihrer Situation am nächsten kommt.

Wenn Sie eine Frage nicht beantworten können oder möchten, gehen Sie bitte zur nächsten Frage weiter.

Die Umfrage dauert nach unseren Erfahrungen ca. 3-4 Minuten.
                `]
            ]),
        })],
    }));


    const WAHL1 = getWAHL1(surveyKey, isRequired);
    surveyEditor.addSurveyItemToRoot(WAHL1);

    surveyEditor.addSurveyItemToRoot(getWAHL2(surveyKey, WAHL1.key, isRequired));


    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'Vielen Dank für Ihre Angaben! Bitte schließen Sie nun die Umfrage ab.']
    ])));

    return surveyEditor.getSurvey();
}
