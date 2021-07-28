import { Survey } from "survey-engine/lib/data_types";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../studyRules";
import { getPOLINT, getWKINT, getWBT, getWABS, getSWABS, getSKPART, getSKPOL, getPROB1, getKPROB1, getPROB2, getKPROB2, getIMAGEAL, getIMAGEOS, getIMAGEAB, getKANZLER, getEPERF, getESTRATAL, getESTRATOS, getESTRATAB, getWK, getPID, getSTPID, getAGE, getSEX, getPERS1, getPERS2 } from "./question_pool/questions";


export const generate_EG0829PRE = (): Survey | undefined => {
    const surveyKey = surveyKeys.EG_0829_PRE;

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


    // add questions
    surveyEditor.addSurveyItemToRoot(getPOLINT(surveyKey,true));
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
    surveyEditor.addSurveyItemToRoot(getEPERF(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getESTRATAL(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getESTRATOS(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getESTRATAB(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getWK(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getPID(surveyKey,true));
    //TODO Peter display of STPID depends on PID answer
    surveyEditor.addSurveyItemToRoot(getSTPID(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getSEX(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getAGE(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getPERS1(surveyKey,true));
    surveyEditor.addSurveyItemToRoot(getPERS2(surveyKey,true));



    //surveyEditor.addSurveyItemToRoot(Q2(surveyKey));
    //surveyEditor.addSurveyItemToRoot(getQ1c(surveyKey,true));

    // Survey End
    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['de', 'TODO: Text for end of survey']
    ])));

    return surveyEditor.getSurvey();
}

