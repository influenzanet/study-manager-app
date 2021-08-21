import { Survey } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generatePageBreak } from "../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { getPOLINT, getWKINT, getWBT, getWABS, getSWABS, getSKPART, getSKPOL, getPROB1, getKPROB1, getPROB2, getKPROB2, getIMAGEAL, getIMAGEOS, getIMAGEAB, getKANZLER, getEPERF, getESTRATAL, getESTRATOS, getESTRATAB, getWK, getPID, getSTPID, getAGE, getSEX, getPERS1, getPERS2, getEDUC, getWBR } from "./question_pool/questions";


export const generate_PUB0912PRE = (): Survey | undefined => {
    const surveyKey = surveyKeys.PUB_0912_PRE;

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["de", "0929 Pre"],
        ]),
        description: new Map([
            ["de", "not defined"],
        ]),
        durationText: new Map([
            ["de", "not defined"],
        ])
    })

    surveyEditor.editor.setMaxItemPerPage({ small: 1, large: 1 });

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.display({
        parentKey: surveyKey,
        itemKey: 'intro',
        content: [ComponentGenerators.markdown({
            content: new Map([
                ['de', `
Zunächst möchten wir Ihnen einige Fragen zur Bundestagswahl, den Parteien und Kandidaten stellen.

Im Fragebogen gibt es keine richtigen oder falschen Antworten, sondern nur solche, die Ihrer Perspektive besser oder schlechter entsprechen. Bitte geben Sie deshalb jeweils die Antwort, die Ihrer Ansicht oder Ihrer Situation am nächsten kommt.

Wenn Sie eine Frage nicht beantworten können oder möchten, gehen Sie bitte zur nächsten Frage weiter.

Die Umfrage dauert nach unseren Erfahrungen ca. 3-4 Minuten.
                `]
            ]),
        })],
    }));

    const isRequired = false;

    // add questions
    const WBT = getWBT(surveyKey, isRequired);
    surveyEditor.addSurveyItemToRoot(WBT);
    surveyEditor.addSurveyItemToRoot(getWABS(surveyKey, WBT.key, isRequired));
    surveyEditor.addSurveyItemToRoot(getSKPART(surveyKey, isRequired, true));
    surveyEditor.addSurveyItemToRoot(getSKPOL(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getPROB1(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getKPROB1(surveyKey, isRequired));


    surveyEditor.addSurveyItemToRoot(generatePageBreak(surveyKey));

    surveyEditor.addSurveyItemToRoot(getKANZLER(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getEPERF(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWK(surveyKey, isRequired, true));


    const PID = getPID(surveyKey, isRequired)
    surveyEditor.addSurveyItemToRoot(PID);
    surveyEditor.addSurveyItemToRoot(getSTPID(surveyKey, PID.key, isRequired));
    surveyEditor.addSurveyItemToRoot(getSEX(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getAGE(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getEDUC(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWBR(surveyKey, isRequired));


    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'Vielen Dank für Ihre Angaben! Bitte schließen Sie nun die Umfrage ab.']
    ])));

    return surveyEditor.getSurvey();
}

