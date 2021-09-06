import { Survey } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { getAUFM1, getAUFM2, getBIASPA, getBIASPK, getKANZLER, getPROB1, getKPROB1, getREZEPT, getSKPART, getSKPOL, getWABS, getWBT, getWK, getWPERF, getWSTRATAB, getWSTRATAL, getWSTRATOS } from "./question_pool/questions";


export const generate_PUB0829POST = (): Survey | undefined => {
    const surveyKey = surveyKeys.PUB_0829_POST;

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


    surveyEditor.addSurveyItemToRoot(getWPERF(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getAUFM1(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getAUFM2(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWSTRATAL(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWSTRATOS(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWSTRATAB(surveyKey, isRequired));
    const WBT = getWBT(surveyKey, isRequired);
    surveyEditor.addSurveyItemToRoot(WBT);
    surveyEditor.addSurveyItemToRoot(getWABS(surveyKey, WBT.key, isRequired));
    surveyEditor.addSurveyItemToRoot(getSKPART(surveyKey, isRequired, true));
    surveyEditor.addSurveyItemToRoot(getSKPOL(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getPROB1(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getKPROB1(surveyKey, isRequired));

    surveyEditor.addSurveyItemToRoot(getKANZLER(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWK(surveyKey, isRequired, true));

    surveyEditor.addSurveyItemToRoot(getBIASPA(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getBIASPK(surveyKey, isRequired));

    surveyEditor.addSurveyItemToRoot(getREZEPT(surveyKey, isRequired));


    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'Vielen Dank für Ihre Angaben! Bitte schließen Sie nun die Umfrage ab.']
    ])));

    return surveyEditor.getSurvey();
}
