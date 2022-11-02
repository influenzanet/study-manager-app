import { SurveyItem } from "survey-engine/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class SF36Group extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'SF36';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addPageBreak();
        this.addItem(Q_instructions(this.key))
        this.addItem(Q1(this.key, true))
        // this.addItem(Q2(this.key, true))
        this.addItem(Q3(this.key, true))
        this.addItem(Q4(this.key, true))
        this.addItem(Q5(this.key, true))
        this.addItem(Q6(this.key, true))
        this.addItem(Q7(this.key, true))
        this.addItem(Q8(this.key, true))
        this.addItem(Q9(this.key, true))
        this.addItem(Q10(this.key, true))
        // this.addItem(Q11(this.key, true))
        this.addPageBreak();
    }
}

const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Functioneren

De volgende vragen gaan over je algemene gezondheid. Wanneer je twijfelt over het antwoord op een vraag, probeer dan het antwoord te geven dat het meest van toepassing is.
    `

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ["nl", markdownContent],
                ]),
                className: ''
            })
        ]
    });
}
// SF12
const Q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat vind je, over het algemeen genomen, van je gezondheid?"],
        ]),
        responseOptions: [
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Uitstekend"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Zeer goed"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Goed"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Matig"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Slecht"],
                ])
            },
        ]
    });
}

// const Q2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q2';
//     return SurveyItemGenerators.singleChoice({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         isRequired: isRequired,
//         questionText: new Map([
//             ["nl", "In vergelijking met een jaar geleden, hoe zou je nu je gezondheid in het algemeen beoordelen?"],
//         ]),
//         responseOptions: [
//             {
//                 key: '5', role: 'option',
//                 content: new Map([
//                     ["nl", "Veel beter dan een jaar geleden"],
//                 ])
//             },
//             {
//                 key: '4', role: 'option',
//                 content: new Map([
//                     ["nl", "Iets beter dan een jaar geleden"],
//                 ])
//             },
//             {
//                 key: '3', role: 'option',
//                 content: new Map([
//                     ["nl", "Ongeveer hetzelfde als een jaar geleden"],
//                 ])
//             },
//             {
//                 key: '2', role: 'option',
//                 content: new Map([
//                     ["nl", "Iets slechter dan een jaar geleden"],
//                 ])
//             },
//             {
//                 key: '1', role: 'option',
//                 content: new Map([
//                     ["nl", "Veel slechter dan een jaar geleden"],
//                 ])
//             },
//         ]
//     });
// }

// SF12
const Q3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "De volgende vragen gaan over dagelijkse bezigheden."],
        ]),
        questionSubText: new Map([
            ["nl", "Word je door je gezondheid op dit moment beperkt in deze bezigheden? Zo ja, in welke mate?"],
        ]),
        scaleOptions: [
            {
                key: '3', content: new Map([
                    ["nl", "ja, ernstig beperkt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "ja, een beetje beperkt"],
                ])
            }, {
                key: '1', content: new Map([
                    ["nl", "nee, helemaal niet beperkt"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "Forse inspanning zoals hardlopen, zware voorwerpen tillen, inspannend sporten"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "Matige inspanning zoals het verplaatsen van een tafel, stofzuigen, fietsen"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Tillen of boodschappen dragen"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "Een paar trappen oplopen"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "Eén trap oplopen"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "Buigen, knielen of bukken"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "Meer dan een kilometer lopen"],
                ])
            },
            {
                key: 'h', content: new Map([
                    ["nl", "Een halve kilometer lopen"],
                ])
            },
            {
                key: 'i', content: new Map([
                    ["nl", "Honderd meter lopen"],
                ])
            },
            {
                key: 'j', content: new Map([
                    ["nl", "Jezelf wassen of aankleden"],
                ])
            }
        ]
    });
}


const Q4 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Had je, ten gevolge van je lichamelijke gezondheid, de afgelopen 4 weken één van de volgende problemen bij je werk of andere dagelijkse bezigheden?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Ja"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Nee"],
                ])
            }
        ],
        rows: [
            // {
            //     key: 'a', content: new Map([
            //         ["nl", "Je hebt minder tijd kunnen besteden aan werk of andere bezigheden"],
            //     ])
            // },
            {
                key: 'b', content: new Map([
                    ["nl", "Je hebt minder bereikt dan je zou willen"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Je was beperkt in het soort werk of het soort bezigheden"],
                ])
            },
            // {
            //     key: 'd', content: new Map([
            //         ["nl", "Je had moeite met het werk of andere bezigheden (het kostte je bijvoorbeeld extra inspanning)"],
            //     ])
            // },
        ]
    });
}

const Q5 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Had je, ten gevolge van een emotioneel probleem (bijvoorbeeld doordat je jezelf depressief of angstig voelde), de afgelopen 4 weken één van de volgende problemen bij je werk of andere dagelijkse bezigheden?"],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Ja"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Nee"],
                ])
            }
        ],
        rows: [
            // {
            //     key: 'a', content: new Map([
            //         ["nl", "Je hebt minder tijd kunnen besteden aan werk of andere bezigheden"],
            //     ])
            // },
            {
                key: 'b', content: new Map([
                    ["nl", "Je hebt minder bereikt dan je zou willen"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Je hebt werk of andere bezigheden niet zo zorgvuldig gedaan als je gewend bent"],
                ])
            },
        ]
    });
}

const Q6 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "In hoeverre heeft je lichamelijke gezondheid of hebben je emotionele problemen je de afgelopen 4 weken belemmerd in je normale sociale bezigheden met gezin, vrienden, buren of anderen?"],
        ]),
        responseOptions: [
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Helemaal niet"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Enigszins"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Nogal"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Veel"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Heel erg veel"],
                ])
            },
        ]
    });
}

const Q7 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q7';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Hoeveel pijn had je de afgelopen 4 weken?"],
        ]),
        responseOptions: [
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Geen"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Heel licht"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Licht"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Nogal"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ernstig"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Heel ernstig"],
                ])
            },
        ]
    });
}

// SF12
const Q8 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q8';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "In welke mate heeft pijn je de afgelopen vier weken belemmerd in je normale werkzaamheden (zowel werk buitenshuis als huishoudelijk werk)?"],
        ]),
        responseOptions: [
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Helemaal niet"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Enigszins"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Nogal"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Veel"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Heel erg veel"],
                ])
            },
        ]
    });
}

const Q9 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q9';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Deze vragen gaan over hoe je jezelf de afgelopen 4 weken hebt gevoeld. Wil je bij elke vraag het antwoord aankruisen dat het beste aansluit bij hoe je jezelf hebt gevoeld?"],
        ]),
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "voortdurend"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "meestal"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "vaak"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "soms"],
                ])
            }, {
                key: '5', content: new Map([
                    ["nl", "zelden"],
                ])
            }, {
                key: '6', content: new Map([
                    ["nl", "nooit"],
                ])
            }
        ],
        rows: [
            // {
            //     key: 'a', content: new Map([
            //         ["nl", "Voelde je jezelf levenslustig?"],
            //     ])
            // },
            // {
            //     key: 'b', content: new Map([
            //         ["nl", "Voelde je jezelf erg zenuwachtig?"],
            //     ])
            // },
            // {
            //     key: 'c', content: new Map([
            //         ["nl", "Zat je zo erg in de put dat niets je kon opvrolijken?"],
            //     ])
            // },
            {
                key: 'd', content: new Map([
                    ["nl", "Voelde je jezelf kalm en rustig?"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "Voelde je jezelf erg energiek?"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "Voelde je jezelf neerslachtig en somber?"],
                ])
            },
            // {
            //     key: 'g', content: new Map([
            //         ["nl", "Voelde je jezelf uitgeblust?"],
            //     ])
            // },
            // {
            //     key: 'h', content: new Map([
            //         ["nl", "Voelde je jezelf gelukkig?"],
            //     ])
            // },
            // {
            //     key: 'i', content: new Map([
            //         ["nl", "Voelde je jezelf moe?"],
            //     ])
            // },
        ]
    });
}

// SF12
const Q10 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q10';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Hoe vaak heeft je lichamelijke gezondheid of hebben emotionele problemen gedurende de afgelopen 4 weken je sociale activiteiten (zoals bezoek aan vrienden of naaste familieleden) belemmerd?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Voortdurend"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Meestal"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Soms"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Zelden"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Nooit"],
                ])
            },
        ]
    });
}

// const Q11 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
//     const itemKey = keyOverride ? keyOverride : 'Q11';
//     return SurveyItemGenerators.simpleLikertGroup({
//         parentKey: parentKey,
//         itemKey: itemKey,
//         isRequired: isRequired,
//         questionText: new Map([
//             ["nl", "Wil je het antwoord kiezen dat het beste weergeeft hoe juist of onjuist je elk van de volgende uitspraken voor jezelf vindt?"],
//         ]),
//         stackOnSmallScreen: true,
//         scaleOptions: [
//             {
//                 key: '1', content: new Map([
//                     ["nl", "volkomen juist"],
//                 ])
//             }, {
//                 key: '2', content: new Map([
//                     ["nl", "grotendeels juist"],
//                 ])
//             }, {
//                 key: '3', content: new Map([
//                     ["nl", "weet ik niet"],
//                 ])
//             },
//             {
//                 key: '4', content: new Map([
//                     ["nl", "grotendeels onjuist"],
//                 ])
//             }, {
//                 key: '5', content: new Map([
//                     ["nl", "volkomen onjuist"],
//                 ])
//             },
//         ],
//         rows: [
//             {
//                 key: 'a', content: new Map([
//                     ["nl", "Ik lijk gemakkelijker ziek te worden dan andere mensen"],
//                 ])
//             },
//             {
//                 key: 'b', content: new Map([
//                     ["nl", "Ik ben net zo gezond als andere mensen die ik ken"],
//                 ])
//             },
//             {
//                 key: 'c', content: new Map([
//                     ["nl", "Ik verwacht dat mijn gezondheid achteruit zal gaan"],
//                 ])
//             },
//             {
//                 key: 'd', content: new Map([
//                     ["nl", "Mijn gezondheid is uitstekend"],
//                 ])
//             },
//         ]
//     });
// }
