import { SurveyItem, Survey, Expression } from "survey-engine/lib/data_types";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../../editor-engine/utils/simple-generators";
import { SimpleSurveyEditor } from "../../../../../editor-engine/utils/simple-survey-editor";
import { surveyKeys } from "../../studyRules";



export const getPOLINT = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'POLINT';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: short form for PUB group
        //shortForm: shortForm,
        questionText: new Map([
            ["de", "Wie stark interessieren Sie sich im Allgemeinen für Politik? "],
        ]),
        stackOnSmallScreen: true,
        scaleOptions: [
        {
            key: '1', content: new Map([
                    ["de", "Sehr stark"],
                ])
            }, {
            key: '2', content: new Map([
                    ["de", "Stark"],
                ])
            }, {
            key: '3', content: new Map([
                   ["de", "Mittelmäßig"],
                ])
            }, {
            key: '4', content: new Map([
                    ["de", "Weniger stark"],
                ]),
            }, {
            key: '5', content: new Map([
                    ["de", "Überhaupt nicht"],
                ])
            }
        ],
        rows: [
        {
            key: 'a', content: new Map([
                ["de", ""],
            ])

        },
        
    ]
});
}



export const getWKINT = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'WKINT';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: short form for PUB group
        //shortForm: shortForm,
        questionText: new Map([
            ["de", "Wie stark interessiert Sie speziell der gerade laufende Wahlkampf zur bevorstehenden Bundestagswahl?"],
        ]),
        stackOnSmallScreen: true,
        scaleOptions: [
        {
            key: '1', content: new Map([
                    ["de", "Sehr stark"],
                ])
            }, {
            key: '2', content: new Map([
                    ["de", "Stark"],
                ])
            }, {
            key: '3', content: new Map([
                   ["de", "Mittelmäßig"],
                ])
            }, {
            key: '4', content: new Map([
                    ["de", "Weniger stark"],
                ]),
            }, {
            key: '5', content: new Map([
                    ["de", "Überhaupt nicht"],
                ])
            }
        ],
        rows: [
        {
            key: 'a', content: new Map([
                ["de", ""],
            ])

        },
        
    ]
});
}


export const getWBT = (parentKey: string, isRequired?: boolean, shortForm?: boolean ): SurveyItem => {
    const itemKey = 'WBT';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wenn Wahlen stattfinden, geben viele Leute ihre Stimme ab. Andere kommen nicht dazu, ihre Stimme abzugeben oder nehmen aus anderen Gründen nicht an der Wahl teil. Wie ist das bei Ihnen? Werden Sie am 26. September bei der Bundestagswahl… "],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "bestimmt zur Wahl gehen."],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "wahrscheinlich zur Wahl gehen."],
                ]),    
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "vielleicht zur Wahl gehen."],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "wahrscheinlich nicht zur Wahl gehen."],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "bestimmt nicht zur Wahl gehen."],
                ]),
            },
            {
                key: '6', role: 'option',
                style: [
                    { key: 'className', value: 'pt-2 border-top border-1 border-grey-2' },
                ],
                content: new Map([
                    ["de", "Ich habe bereits per Briefwahl meine Stimme abgegeben."],
                ]),
            },
        ],
    });
}


export const getWABS = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'WABS';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Und welcher Partei werden Sie dann Ihre Zweitstimme geben? (Falls Sie bereits per Briefwahl gewählt haben: Welcher Partei haben Sie Ihre Zweitstimme gegeben?) "],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "CDU/CSU"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "SPD"],
                ]),    
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "AfD"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "FDP"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Die Linke"],
                ]),
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["de", "B90/Die Grünen"],
                ]),
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["de", "Eine andere Partei"],
                ]),
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["de", "Ich habe mich noch nicht entschieden"],
                ]),
            },
        ],
    });
}


export const getSWABS = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'SWABS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: short form for PUB group
        //shortForm: shortForm,
        questionText: new Map([
            ["de", "Wie sicher sind Sie sich bei dieser Wahlentscheidung?"],
        ]),
        stackOnSmallScreen: true,
        scaleOptions: [
        {
            key: '1', content: new Map([
                    ["de", "Sehr sicher"],
                ])
            }, {
            key: '2', content: new Map([
                    ["de", "Sicher"],
                ])
            }, {
            key: '3', content: new Map([
                   ["de", "Nicht so sicher"],
                ])
            }, {
            key: '4', content: new Map([
                    ["de", "Überhaupt nicht sicher"],
                ]),
            }, 
        ],
        rows: [
        {
            key: 'a', content: new Map([
                ["de", ""],
            ])

        },
        
    ]
});
}


export const getSKPART = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'SKPART';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Was halten Sie ganz allgemein von den folgenden Parteien? Bitte beschreiben Sie dies mit Hilfe einer Skala von -3 bis +3. -3 bedeutet, dass Sie überhaupt nichts von der Partei halten, +3 bedeutet, dass Sie sehr viel von der Partei halten. Mit den Werten dazwischen können Sie Ihre Meinung abstufen."],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "-3"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "-2"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "-1"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "0"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "+1"],
            ])
        },{
            key: '6', content: new Map([
                ["de", "+2"],
            ])
        },{
            key: '7', content: new Map([
                ["de", "+3"],
            ])
        },
    ],
    rows: [
        {
            key: 'CDU', content: new Map([
                ["de", "CDU/CSU"],
            ])

        },
        {
            key: 'SPD', content: new Map([
                ["de", "SPD"],
            ])
        },
        {
            key: 'AFD', content: new Map([
                ["de", "AfD"],
            ])

        },
        {
            key: 'FDP', content: new Map([
                ["de", "FDP"],
            ])
        },
        {
            key: 'LINKE', content: new Map([
                ["de", "Die Linke"],
            ])
        },
        {
            key: 'GRU', content: new Map([
                ["de", "B90/Die Grünen"],
            ])
        },
        
    ]
});
}


export const getSKPOL = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'SKPOL';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Was halten Sie ganz allgemein von den folgenden Politikern?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "-3"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "-2"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "-1"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "0"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "+1"],
            ])
        },{
            key: '6', content: new Map([
                ["de", "+2"],
            ])
        },{
            key: '7', content: new Map([
                ["de", "+3"],
            ])
        },
    ],
    rows: [
        {
            key: 'AL', content: new Map([
                ["de", "Armin Laschet"],
            ])

        },
        {
            key: 'OS', content: new Map([
                ["de", "Olaf Scholz"],
            ])
        },
        {
            key: 'AB', content: new Map([
                ["de", "Annalena Baerbock"],
            ])

        },
    ]
});
}


export const getPROB1 = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'PROB1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: "wichtigste" fettgedruckt
        questionText: new Map([
            ["de", "Welches der folgenden Themen ist Ihrer Meinung nach das wichtigste Problem in Deutschland?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Bildung"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Renten"],
                ]),    
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Ausländer, Integration, Flüchtlinge"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Umwelt, Klimaschutz, Energiewende"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Soziale Ungleichheit"],
                ]),
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["de", "Corona"],
                ]),
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["de", "Wirtschaftslage, Arbeitslosigkeit"],
                ]),
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["de", "Rechtsextremismus"],
                ]),
            },
            {
                key: '9', role: 'option',
                content: new Map([
                    ["de", "Mieten, Wohnungsmarkt"],
                ]),
            },
        ],
    });
}


export const getKPROB1 = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'KPROB1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Und welche Partei kann dieses Problem am ehesten lösen? "],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "CDU/CSU"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "SPD"],
                ]),    
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "AfD"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "FDP"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Die Linke"],
                ]),
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["de", "B90/Die Grünen"],
                ]),
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["de", "Eine andere Partei "],
                ]),
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["de", "Alle Parteien gleich gut"],
                ]),
            },
            {
                key: '9', role: 'option',
                content: new Map([
                    ["de", "Keine der genannten Parteien"],
                ]),
            },
        ],
    });
}


export const getPROB2 = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'PROB2';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: "zweitwichtigste" fettgedruckt
        questionText: new Map([
            ["de", "Welches der folgenden Themen ist Ihrer Meinung nach das zweitwichtigste Problem in Deutschland?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Bildung"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Renten"],
                ]),    
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Ausländer, Integration, Flüchtlinge"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Umwelt, Klimaschutz, Energiewende"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Soziale Ungleichheit"],
                ]),
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["de", "Corona"],
                ]),
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["de", "Wirtschaftslage, Arbeitslosigkeit"],
                ]),
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["de", "Rechtsextremismus"],
                ]),
            },
            {
                key: '9', role: 'option',
                content: new Map([
                    ["de", "Mieten, Wohnungsmarkt"],
                ]),
            },
        ],
    });
}


export const getKPROB2 = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'KPROB2';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Und welche Partei kann dieses Problem am ehesten lösen? "],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "CDU/CSU"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "SPD"],
                ]),    
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "AfD"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "FDP"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Die Linke"],
                ]),
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["de", "B90/Die Grünen"],
                ]),
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["de", "Eine andere Partei "],
                ]),
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["de", "Alle Parteien gleich gut"],
                ]),
            },
            {
                key: '9', role: 'option',
                content: new Map([
                    ["de", "Keine der genannten Parteien"],
                ]),
            },
        ],
    });
}


export const getIMAGEAL = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
        const itemKey = 'IMAGEAL';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: short form for PUB group, Armin Laschet fettgedruckt
        //shortForm: shortForm,
        questionText: new Map([
           ["de", "Und nun genauer zu den Kanzlerkandidaten. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf Armin Laschet zutreffen."],
        ]),
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Trifft voll und ganz zu"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Trifft eher zu"],
                ])
            }, {
                key: '3', content: new Map([
                    ["de", "Teils/teils"],
                ])
            }, {
                key: '4', content: new Map([
                    ["de", "Trifft eher nicht zu"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["de", "Trifft überhaupt nicht zu"],
                ])
            }
        ],
        rows: [
            {
                key: 'AL1', content: new Map([
                    ["de", "Er hat ein gutes Konzept, um die Wirtschaft anzukurbeln."],
                ])

            },
            {
                key: 'AL2', content: new Map([
                    ["de", "Er ist politisch vertrauenswürdig."],
                ])
            },
            {
                key: 'AL3', content: new Map([
                    ["de", "Er ist entscheidungsfreudig."],
                ])

            },
            {
                key: 'AL4', content: new Map([
                    ["de", "Er ist mir als Mensch sympathisch."],
                ])
            },
            {
                key: 'AL5', content: new Map([
                    ["de", "Er ist fähig, politische Probleme zu lösen."],
                ])
            },
            {
                key: 'AL6', content: new Map([
                    ["de", "Er ist ein ehrlicher Mensch."],
                ])
            },
            {
                key: 'AL7', content: new Map([
                    ["de", "Er ist führungsstark."],
                ])
            },
            {
                key: 'AL8', content: new Map([
                    ["de", "Er hat eine angenehme Ausstrahlung."],
                ])
            },
        ]
    });
}


export const getIMAGEOS = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'IMAGEOS';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Olaf Scholz fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf Olaf Scholz zu?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Trifft voll und ganz zu"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Trifft eher zu"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Trifft eher nicht zu"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Trifft überhaupt nicht zu"],
            ])
        }
    ],
    rows: [
        {
            key: 'OS1', content: new Map([
                ["de", "Er hat ein gutes Konzept, um die Wirtschaft anzukurbeln."],
            ])

        },
        {
            key: 'OS2', content: new Map([
                ["de", "Er ist politisch vertrauenswürdig."],
            ])
        },
        {
            key: 'OS3', content: new Map([
                ["de", "Er ist entscheidungsfreudig."],
            ])

        },
        {
            key: 'OS4', content: new Map([
                ["de", "Er ist mir als Mensch sympathisch."],
            ])
        },
        {
            key: 'OS5', content: new Map([
                ["de", "Er ist fähig, politische Probleme zu lösen."],
            ])
        },
        {
            key: 'OS6', content: new Map([
                ["de", "Er ist ein ehrlicher Mensch."],
            ])
        },
        {
            key: 'OS7', content: new Map([
                ["de", "Er ist führungsstark."],
            ])
        },
        {
            key: 'OS8', content: new Map([
                ["de", "Er hat eine angenehme Ausstrahlung."],
            ])
        },
    ]
});
}


export const getIMAGEAB = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'IMAGEAB';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Annalena Baerbock fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf Annalena Baerbock zu?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Trifft voll und ganz zu"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Trifft eher zu"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Trifft eher nicht zu"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Trifft überhaupt nicht zu"],
            ])
        }
    ],
    rows: [
        {
            key: 'AB1', content: new Map([
                ["de", "Sie hat ein gutes Konzept, um die Wirtschaft anzukurbeln."],
            ])

        },
        {
            key: 'AB2', content: new Map([
                ["de", "Sie ist politisch vertrauenswürdig."],
            ])
        },
        {
            key: 'AB3', content: new Map([
                ["de", "Sie ist entscheidungsfreudig."],
            ])

        },
        {
            key: 'AB4', content: new Map([
                ["de", "Sie ist mir als Mensch sympathisch."],
            ])
        },
        {
            key: 'AB5', content: new Map([
                ["de", "Sie ist fähig, politische Probleme zu lösen."],
            ])
        },
        {
            key: 'AB6', content: new Map([
                ["de", "Sie ist ein ehrlicher Mensch."],
            ])
        },
        {
            key: 'AB7', content: new Map([
                ["de", "Sie ist führungsstark."],
            ])
        },
        {
            key: 'AB8', content: new Map([
                ["de", "Sie hat eine angenehme Ausstrahlung."],
            ])
        },
    ]
});
}


export const getKANZLER = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'KANZLER';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: "zweitwichtigste" fettgedruckt
        questionText: new Map([
            ["de", "Wen hätten Sie nach der Bundestagswahl lieber als Bundeskanzlerin oder Bundeskanzler? "],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Armin Laschet"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Olaf Scholz"],
                ]),    
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Annalena Baerbock"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Keinen der genannten Kandidaten"],
                ]),
            }, 
        ],
    });
}


export const getEPERF = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'EPERF';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Annalena Baerbock fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Einmal ganz allgemein gesprochen, wie werden Ihrer Meinung nach die Kandidaten in der heutigen TV-Debatte abschneiden?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Sehr gut"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Gut"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Schlecht"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Sehr schlecht"],
            ])
        }
    ],
    rows: [
        {
            key: 'AL', content: new Map([
                ["de", "Armin Laschet"],
            ])

        },
        {
            key: 'OS', content: new Map([
                ["de", "Olaf Scholz"],
            ])
        },
        {
            key: 'AB', content: new Map([
                ["de", "Annalena Baerbock"],
            ])

        },
    ]
});
}


export const getWPERF = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'WPERF';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Annalena Baerbock fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Einmal ganz allgemein gesprochen, wie haben Ihrer Meinung nach die Kandidaten in der TV-Debatte abgeschnitten?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Sehr gut"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Gut"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Schlecht"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Sehr schlecht"],
            ])
        }
    ],
    rows: [
        {
            key: 'AL', content: new Map([
                ["de", "Armin Laschet"],
            ])

        },
        {
            key: 'OS', content: new Map([
                ["de", "Olaf Scholz"],
            ])
        },
        {
            key: 'AB', content: new Map([
                ["de", "Annalena Baerbock"],
            ])

        },
    ]
});
}


export const getRPERF = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'RPERF';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Annalena Baerbock fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Im Folgenden geht es um die TV-Debatte vom 29.8.2021. Einmal ganz allgemein gesprochen, wie haben Ihrer Meinung nach die Kandidaten in dieser TV-Debatte abgeschnitten? "],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Sehr gut"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Gut"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Schlecht"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Sehr schlecht"],
            ])
        }
    ],
    rows: [
        {
            key: 'AL', content: new Map([
                ["de", "Armin Laschet"],
            ])

        },
        {
            key: 'OS', content: new Map([
                ["de", "Olaf Scholz"],
            ])
        },
        {
            key: 'AB', content: new Map([
                ["de", "Annalena Baerbock"],
            ])

        },
    ]
});
}


export const getESTRATAL = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'ESTRATAL';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Armin Laschet fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Im Folgenden geht es um das mögliche Auftreten der Kandidaten in der TV-Debatte. Welchen Auftritt erwarten Sie von Armin Laschet?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Stimme voll und ganz zu"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Stimme eher zu"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Stimme eher nicht zu"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Stimme überhaupt nicht zu"],
            ])
        }
    ],
    rows: [
        {
            key: 'AL1', content: new Map([
                ["de", "Er wird die anderen Kandidaten häufig angreifen. "],
            ])

        },
        {
            key: 'AL2', content: new Map([
                ["de", "Er wird häufig für seine Politik werben."],
            ])
        },
        {
            key: 'AL3', content: new Map([
                ["de", "Er wird sich oft verteidigen müssen."],
            ])

        },
    ]
});
}


export const getESTRATOS = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'ESTRATOS';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Olaf Scholz fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Und welchen Auftritt erwarten Sie von Olaf Scholz?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Stimme voll und ganz zu"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Stimme eher zu"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Stimme eher nicht zu"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Stimme überhaupt nicht zu"],
            ])
        }
    ],
    rows: [
        {
            key: 'OS1', content: new Map([
                ["de", "Er wird die anderen Kandidaten häufig angreifen. "],
            ])

        },
        {
            key: 'OS2', content: new Map([
                ["de", "Er wird häufig für seine Politik werben."],
            ])
        },
        {
            key: 'OS3', content: new Map([
                ["de", "Er wird sich oft verteidigen müssen."],
            ])

        },
    ]
});
}


export const getESTRATAB = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'ESTRATAB';
return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    //TODO Peter: short form for PUB group, Annalena Baerbock fettgedruckt
    //shortForm: shortForm,
    questionText: new Map([
        ["de", "Und welchen Auftritt erwarten Sie von Annalena Baerbock?"],
    ]),
    stackOnSmallScreen: true,
    scaleOptions: [
        {
            key: '1', content: new Map([
                ["de", "Stimme voll und ganz zu"],
            ])
        }, {
            key: '2', content: new Map([
                ["de", "Stimme eher zu"],
            ])
        }, {
            key: '3', content: new Map([
                ["de", "Teils/teils"],
            ])
        }, {
            key: '4', content: new Map([
                ["de", "Stimme eher nicht zu"],
            ]),
        }, {
            key: '5', content: new Map([
                ["de", "Stimme überhaupt nicht zu"],
            ])
        }
    ],
    rows: [
        {
            key: 'AB1', content: new Map([
                ["de", "Sie wird die anderen Kandidaten häufig angreifen. "],
            ])

        },
        {
            key: 'AB2', content: new Map([
                ["de", "Sie wird häufig für ihre Politik werben."],
            ])
        },
        {
            key: 'AB3', content: new Map([
                ["de", "Sie wird sich oft verteidigen müssen."],
            ])

        },
    ]
});
}


/*
export const getQ1c = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
        const itemKey = 'Q1c';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //TODO Peter: short form for PUB group
        //shortForm: shortForm,
        questionText: new Map([
            ["de", "Inwieweit stimmen Sie den folgenden Aussagen zu? "],
        ]),
        //topDisplayCompoments: [{
          //  role: 'text',
           // style: [{ key: 'className', value: 'mb-2' }]
            //content: generateLocStrings(new Map([
            //    ["de", "1 = Stimme voll und ganz zu, 10 = Stimme überhaupt nicht zu"],
            //]))
        //}],
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stimme voll und ganz zu"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Stimme eher zu"],
                ])
            }, {
                key: '3', content: new Map([
                    ["de", "Teils, teils"],
                ])
            }, {
                key: '4', content: new Map([
                    ["de", "Stimme eher nicht zu"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["de", "Stimme überhaupt nicht zu"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Es ist mir unbegreiflich, wie es aufregend sein kann, gemein zu anderen zu sein."],
                ])

            },
            {
                key: 'b', content: new Map([
                    ["de", "Ich neige dazu, andere zu kritisieren."],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["de", "Die meisten Menschen verdienen Respekt."],
                ])

            },
            {
                key: 'd', content: new Map([
                    ["de", "Ich versuche, niemanden bei der Verfolgung meiner Ziele zu verletzen."],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["de", "Ich erledige Aufgaben gründlich."],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["de", "Manche Leute würde ich gerne leiden lassen, selbst wenn ich dafür mit ihnen in die Hölle käme."],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["de", "Es ist ratsam, Informationen im Auge zu behalten, die man später gegen andere verwenden kann."],
                ])
            },
        ]
    });
}


export const Q2 = (parentKey: string) => {
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: "TODO2",
        isRequired: true,
        questionText: new Map([
            ["de", "Hat Peter Kloeppel - alles in allem - einen Kandidaten bevorzugt oder benachteiligt?"],
        ]),
        //topDisplayCompoments: [{
          //  role: 'text',
            //style: [{ key: 'className', value: 'mb-2' }]
            //content: generateLocStrings(new Map([
            //    ["de", "1 = Stimme voll und ganz zu, 10 = Stimme überhaupt nicht zu"],
            //]))
        //}],
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt"],
                ])
            }, {
                key: '3', content: new Map([
                    ["de", "Weder bevorzugt, noch benachteiligt"],
                ])
            }, {
                key: '4', content: new Map([
                    ["de", "Eher benachteiligt"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["de", "Stark benachteiligt"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Armin Laschet"],
                ])

            },
            {
                key: 'b', content: new Map([
                    ["de", "Olaf Scholz"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["de", "Annalena Baerbock"],
                ])

            },
        ]
    });
}*/
