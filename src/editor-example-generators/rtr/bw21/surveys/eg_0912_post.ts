import { Survey } from "survey-engine/lib/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { getATTACKAL, getAUFM1, getAUFM2, getBIASMI, getBIASOK, getIMAGEAB, getIMAGEAL, getIMAGEOS, getJSTRATMI, getJSTRATOK, getKANZLER, getPERS3, getPERS4, getPROB1, getKPROB1, getPROB2, getKPROB2, getREZEPT, getSKPART, getSKPOL, getSWABS, getWABS, getWBT, getWK, getWKINT, getWPERF, getWSTRATAB, getWSTRATAL, getWSTRATOS, getSYNC1, getSYNC2, getSYNC3 } from "./question_pool/questions";


export const generate_EG0912POST = (): Survey | undefined => {
    const surveyKey = surveyKeys.EG_0912_POST;

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


    surveyEditor.addSurveyItemToRoot(getWPERF(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getAUFM1(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getAUFM2(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWSTRATAL(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWSTRATOS(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWSTRATAB(surveyKey,true));

    //3 ATTACK questions here
    surveyEditor.addSurveyItemToRoot(getATTACKAL(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWKINT(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWBT(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWABS(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getSWABS(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getSKPART(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getSKPOL(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getPROB1(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getKPROB1(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getPROB2(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getKPROB2(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getIMAGEAL(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getIMAGEOS(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getIMAGEAB(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getKANZLER(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWK(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getJSTRATMI(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getJSTRATOK(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getBIASMI(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getBIASOK(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getREZEPT(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getSYNC1(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getSYNC2(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getSYNC3(surveyKey,true));

    



    //surveyEditor.addSurveyItemToRoot(Q2(surveyKey));
    //surveyEditor.addSurveyItemToRoot(getQ1c(surveyKey,true));

    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'TODO: Text for end of survey']
    ])));

    return surveyEditor.getSurvey();
}

