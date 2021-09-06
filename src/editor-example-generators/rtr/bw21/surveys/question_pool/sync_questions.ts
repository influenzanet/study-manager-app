import { SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";




export const getSYNC1 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wann haben Sie die Echtzeitmessung gestartet?"],
        ]),
        titleClassName: 'sticky-top',
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ein paar Minuten vor Beginn der Sendung"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Ein paar Sekunden vor Beginn der Sendung"],
                ]),
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Genau zum Beginn der Sendung"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Ein paar Sekunden nach Beginn der Sendung"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Ein paar Minuten nach Beginn der Sendung"],
                ]),
            },
        ],
    });
}



export const getSYNC2 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC2';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wurde die Wiedergabe der Debatte unterbrochen?"],
        ]),
        questionSubText: new Map([
            ["de", "z.B. durch Pausieren oder technische Probleme"],
        ]),
        titleClassName: 'sticky-top',
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Nein"],
                ]),
            },
        ],
    });
}



export const getSYNC3 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC3';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Haben Sie die Echtzeitbewertung der Kandidaten für mehr als 30 Sekunden unterbrochen?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Nein"],
                ]),
            },
        ],
    });
}



export const getSYNC4 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC4';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Auf welchem Bildschirmgerät haben Sie die Debatte geschaut?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "TV"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Laptop- oder Desktop-Computer"],
                ]),
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Smartphone"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Tablet"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Andere"],
                ]),
            },
        ],
    });
}



export const getSYNC5 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC5';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Über welche Empfangstechnologie haben sie die Debatte geschaut?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Satellitenempfang"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Kabelfernsehen"],
                ]),
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Internet (z.B. Smart TV, Apple TV, Magenta TV Stick, Fire TV,…)"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Andere"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Weiß ich nicht"],
                ]),
            },
            
        ],
    });
}



export const getSYNC6 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC6';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Hatten Sie technische Probleme bei der Übertragung?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Nein"],
                ]),
            },
            
        ],
    });
}



export const getSYNC7 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC7';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Haben Sie die Sendung pausiert/angehalten?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Nein"],
                ]),
            },
            
        ],
    });
}



export const getSYNC8 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC8';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Hatten Sie das Gefühl, Ihre Meinung durch die Umfragen sinnvoll mitteilen zu können?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Nein"],
                ]),
            },
            
        ],
    });
}



export const getSYNC9 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SYNC9';

    return SurveyItemGenerators.multilineTextInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Feedback:"],
        ]),
        //questionSubText: new Map([
        //    ["nl", "Let op, je krijgt geen persoonlijke reactie op deze opmerkingen. "],
        //]),
        //placeholderText: new Map([
        //    ["nl", "Opmerkingen"]
        //])
    });
}