import { Survey } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { getATTACKAL, getAUFM1, getAUFM2, getBIASPA, getBIASPK, getIMAGEAB, getIMAGEAL, getIMAGEOS, getJSTRATPA, getJSTRATPK, getKANZLER, getPERS3, getPERS4, getPROB1, getKPROB1, getPROB2, getKPROB2, getREZEPT, getSKPART, getSKPOL, getSWABS, getWABS, getWBT, getWK, getWKINT, getWPERF, getWSTRATAB, getWSTRATAL, getWSTRATOS, getSYNC1, getSYNC2, getSYNC3 } from "./question_pool/questions";


export const generate_KG0912POST = (): Survey | undefined => {
    const surveyKey = surveyKeys.KG_0912_POST;

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

    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.display({
        parentKey: surveyKey,
        itemKey: 'intro',
        content: [ComponentGenerators.markdown({
            content: new Map([
                ['de', `## ${surveyKey}`]
            ]),
        })],
    }));

    surveyEditor.addSurveyItemToRoot(getWKINT(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWBT(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getWABS(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getSWABS(surveyKey, isRequired));
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
    surveyEditor.addSurveyItemToRoot(getPERS3(surveyKey, isRequired));
    surveyEditor.addSurveyItemToRoot(getPERS4(surveyKey, isRequired));
    
    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'TODO: Text for end of survey']
    ])));

    return surveyEditor.getSurvey();
}
