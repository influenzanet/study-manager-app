import { Survey } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { getATTACKAL, getAUFM1, getAUFM2, getBIASPA, getBIASPK, getIMAGEAB, getIMAGEAL, getIMAGEOS, getJSTRATPA, getJSTRATPK, getKANZLER, getPERS3, getPERS4, getPROB1, getKPROB1, getPROB2, getKPROB2, getREZEPT, getSKPART, getSKPOL, getSWABS, getWABS, getWBT, getWK, getWKINT, getWPERF, getWSTRATAB, getWSTRATAL, getWSTRATOS, getATTACKOS, getATTACKAB } from "./question_pool/questions";
import { getSYNC1, getSYNC2, getSYNC3 } from "./question_pool/sync_questions";


export const generate_EG0829POST = (): Survey | undefined => {
    const surveyKey = surveyKeys.EG_0829_POST;

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

    const isRequired = true;

    surveyEditor.editor.setMaxItemPerPage({ small: 1, large: 1 });

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.display({
        parentKey: surveyKey,
        itemKey: 'intro',
        content: [ComponentGenerators.markdown({
            content: new Map([
                ['de', `
Im Fragebogen gibt es keine richtigen oder falschen Antworten, sondern nur solche, die Ihrer Perspektive besser oder schlechter entsprechen. Bitte geben Sie deshalb jeweils die Antwort, die Ihrer Ansicht oder Ihrer Situation am nächsten kommt.

Die Umfrage dauert nach unseren Erfahrungen ca. 10 Minuten.
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

    //3 ATTACK questions here
    surveyEditor.addSurveyItemToRoot(getATTACKAL(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getATTACKOS(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getATTACKAB(surveyKey, isRequired));

    surveyEditor.addSurveyItemToRoot(getWKINT(surveyKey, isRequired));
    const WBT = getWBT(surveyKey, isRequired);
    surveyEditor.addSurveyItemToRoot(WBT);
    surveyEditor.addSurveyItemToRoot(getWABS(surveyKey, WBT.key, isRequired));
    surveyEditor.addSurveyItemToRoot(getSWABS(surveyKey, WBT.key, isRequired));
    surveyEditor.addSurveyItemToRoot(getSKPART(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getSKPOL(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getPROB1(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getKPROB1(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getPROB2(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getKPROB2(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getIMAGEAL(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getIMAGEOS(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getIMAGEAB(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getKANZLER(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWK(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getJSTRATPA(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getJSTRATPK(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getBIASPA(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getBIASPK(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getPERS3(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getPERS4(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getREZEPT(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getSYNC1(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getSYNC2(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getSYNC3(surveyKey, isRequired));


    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'Vielen Dank für Ihre Angaben! Bitte schließen Sie nun die Umfrage ab.']
    ])));

    return surveyEditor.getSurvey();
}
