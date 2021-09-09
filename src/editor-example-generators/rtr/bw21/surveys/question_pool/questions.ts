import { SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";


export const getPOLINT = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'POLINT';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wie stark interessieren Sie sich im Allgemeinen für Politik? "],
        ]),
        titleClassName: 'sticky-top',
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



export const getWKINT = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WKINT';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wie stark interessiert Sie speziell der gerade laufende Wahlkampf zur bevorstehenden Bundestagswahl?"],
        ]),
        titleClassName: 'sticky-top',
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


export const getWBT = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WBT';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wenn Wahlen stattfinden, geben viele Leute ihre Stimme ab. Andere kommen nicht dazu, ihre Stimme abzugeben oder nehmen aus anderen Gründen nicht an der Wahl teil. Wie ist das bei Ihnen? Werden Sie am 26. September bei der Bundestagswahl… "],
        ]),
        titleClassName: 'sticky-top',
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


export const getWABS = (parentKey: string, wbtKey: string, isRequired?: boolean): SurveyItem => {
    const condition = CommonExpressions.singleChoiceOnlyOtherKeysSelected(wbtKey, '5');
    const itemKey = 'WABS';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Und welcher Partei werden Sie dann Ihre Zweitstimme geben? (Falls Sie bereits per Briefwahl gewählt haben: Welcher Partei haben Sie Ihre Zweitstimme gegeben?) "],
        ]),
        titleClassName: 'sticky-top',
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


export const getSWABS = (parentKey: string, wbtKey: string, isRequired?: boolean): SurveyItem => {
    const condition = CommonExpressions.singleChoiceOnlyOtherKeysSelected(wbtKey, '5');
    const itemKey = 'SWABS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["de", "Wie sicher sind Sie sich dieser Wahlentscheidung?"],
        ]),
        titleClassName: 'sticky-top',
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

    const shortFormRows = [
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
            key: 'GRU', content: new Map([
                ["de", "B90/Die Grünen"],
            ])
        },
    ]

    const longFormRows = [
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

    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Was halten Sie ganz allgemein von den folgenden Parteien?"],
        ]),
        titleClassName: 'sticky-top',
        /*questionSubText: new Map([
            ["de", "Bitte beschreiben Sie dies mit Hilfe einer Skala von -3 bis +3. -3 bedeutet, dass Sie überhaupt nichts von der Partei halten, \n\n+3 bedeutet, dass Sie sehr viel von der Partei halten. \n\nMit den Werten dazwischen können Sie Ihre Meinung abstufen."],
        ]),*/
        topDisplayCompoments: [
            ComponentGenerators.markdown({
                content: new Map([
                    ['de', 'Bitte beschreiben Sie dies mit Hilfe einer Skala von -3 bis +3. \n\n-3 bedeutet, dass Sie überhaupt nichts von der Partei halten, \n\n+3 bedeutet, dass Sie sehr viel von der Partei halten. \n\nMit den Werten dazwischen können Sie Ihre Meinung abstufen.']
                ]),
                className: 'border-bottom border-1 pb-2 mb-1'
            })
        ],
        stackOnSmallScreen: false,
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
            }, {
                key: '6', content: new Map([
                    ["de", "+2"],
                ])
            }, {
                key: '7', content: new Map([
                    ["de", "+3"],
                ])
            },
        ],
        rows: shortForm ? shortFormRows : longFormRows,
    });
}


export const getSKPOL = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SKPOL';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Was halten Sie ganz allgemein von den folgenden Politikern?"],
        ]),
        titleClassName: 'sticky-top',
        stackOnSmallScreen: false,
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
            }, {
                key: '6', content: new Map([
                    ["de", "+2"],
                ])
            }, {
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


export const getPROB1 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'PROB1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: [
            {
                content: new Map([
                    ["de", "Welches der folgenden Themen ist Ihrer Meinung nach das "],
                ]),
            },
            {
                content: new Map([
                    ["de", "wichtigste"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " Problem in Deutschland?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        //questionText: new Map([
        //    ["de", "Welches der folgenden Themen ist Ihrer Meinung nach das wichtigste Problem in Deutschland?"],
        //]),
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


export const getKPROB1 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'KPROB1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Und welche Partei kann dieses Problem am ehesten lösen? "],
        ]),
        titleClassName: 'sticky-top',
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


export const getPROB2 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'PROB2';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: [
            {
                content: new Map([
                    ["de", "Welches der folgenden Themen ist Ihrer Meinung nach das "],
                ]),
            },
            {
                content: new Map([
                    ["de", "zweitwichtigste"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " Problem in Deutschland?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        /* questionText: new Map([
            ["de", "Welches der folgenden Themen ist Ihrer Meinung nach das zweitwichtigste Problem in Deutschland?"],
        ]), */
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


export const getKPROB2 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'KPROB2';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Und welche Partei kann dieses Problem am ehesten lösen? "],
        ]),
        titleClassName: 'sticky-top',
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


export const getIMAGEAL = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'IMAGEAL';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und nun genauer zu den Kanzlerkandidaten. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Armin Laschet"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zutreffen."],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        //questionText: new Map([
        //   ["de", "Und nun genauer zu den Kanzlerkandidaten. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf Armin Laschet zutreffen."],
        //]),
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


export const getIMAGEOS = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'IMAGEOS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Olaf Scholz"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zu?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf Olaf Scholz zu?"],
        // ]),
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


export const getIMAGEAB = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'IMAGEAB';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Annalena Baerbock"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zu?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf Annalena Baerbock zu?"],
        // ]),
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


export const getKANZLER = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'KANZLER';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wen hätten Sie nach der Bundestagswahl lieber als Bundeskanzlerin oder Bundeskanzler? "],
        ]),
        titleClassName: 'sticky-top',
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


export const getEPERF = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'EPERF';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Einmal ganz allgemein gesprochen, wie werden Ihrer Meinung nach die Kandidaten in der heutigen TV-Debatte abschneiden?"],
        ]),
        titleClassName: 'sticky-top',
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


export const getWPERF = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WPERF';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Einmal ganz allgemein gesprochen, wie haben Ihrer Meinung nach die Kandidaten in der TV-Debatte abgeschnitten?"],
        ]),
        titleClassName: 'sticky-top',
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


export const getRPERF = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'RPERF';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Im Folgenden geht es um die "],
                ]),
            },
            {
                content: new Map([
                    ["de", "TV-Debatte vom 29.8.2021"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", ". Einmal ganz allgemein gesprochen, wie haben Ihrer Meinung nach die Kandidaten in dieser TV-Debatte abgeschnitten?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Im Folgenden geht es um die TV-Debatte vom 29.8.2021. Einmal ganz allgemein gesprochen, wie haben Ihrer Meinung nach die Kandidaten in dieser TV-Debatte abgeschnitten? "],
        // ]),
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


export const getESTRATAL = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ESTRATAL';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Im Folgenden geht es um das mögliche Auftreten der Kandidaten in der TV-Debatte. Welchen Auftritt erwarten Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Armin Laschet"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Im Folgenden geht es um das mögliche Auftreten der Kandidaten in der TV-Debatte. Welchen Auftritt erwarten Sie von Armin Laschet?"],
        // ]),
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


export const getESTRATOS = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ESTRATOS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und welchen Auftritt erwarten Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Olaf Scholz"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und welchen Auftritt erwarten Sie von Olaf Scholz?"],
        // ]),
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
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und welchen Auftritt erwarten Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Annalena Baerbock"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und welchen Auftritt erwarten Sie von Annalena Baerbock?"],
        // ]),
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



export const getWSTRATAL = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'WSTRATAL';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Nun geht es um den Auftritt der Kandidaten in der TV-Debatte. Welchen Eindruck haben Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Armin Laschet"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Nun geht es um den Auftritt der Kandidaten in der TV-Debatte. Welchen Eindruck haben Sie von Armin Laschet?"],
        // ]),
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
                    ["de", "Er hat die anderen Kandidaten häufig angegriffen."],
                ])

            },
            {
                key: 'AL2', content: new Map([
                    ["de", "Er hat häufig für seine Politik geworben."],
                ])
            },
            {
                key: 'AL3', content: new Map([
                    ["de", "Er musste sich häufig verteidigen."],
                ])

            },
        ]
    });
}




export const getWSTRATOS = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WSTRATOS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und welchen Eindruck haben Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Olaf Scholz"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und welchen Eindruck haben Sie von Olaf Scholz? "],
        // ]),
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
                    ["de", "Er hat die anderen Kandidaten häufig angegriffen."],
                ])

            },
            {
                key: 'OS2', content: new Map([
                    ["de", "Er hat häufig für seine Politik geworben."],
                ])
            },
            {
                key: 'OS3', content: new Map([
                    ["de", "Er musste sich häufig verteidigen."],
                ])

            },
        ]
    });
}




export const getWSTRATAB = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WSTRATAB';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und welchen Eindruck haben Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Annalena Baerbock"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und welchen Eindruck haben Sie von Annalena Baerbock? "],
        // ]),
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
                    ["de", "Sie hat die anderen Kandidaten häufig angegriffen."],
                ])

            },
            {
                key: 'AB2', content: new Map([
                    ["de", "Sie hat häufig für ihre Politik geworben."],
                ])
            },
            {
                key: 'AB3', content: new Map([
                    ["de", "Sie musste sich häufig verteidigen."],
                ])

            },
        ]
    });
}



export const getRSTRATAL = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'RSTRATAL';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Nun geht um den Auftritt der Kandidaten in der "],
                ]),
            },
            {
                content: new Map([
                    ["de", "TV-Debatte vom 29.8.2021"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", ". Welchen Eindruck hatten Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Armin Laschet"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Nun geht um den Auftritt der Kandidaten in der TV-Debatte vom 29.8.2021. Welchen Eindruck hatten Sie von Armin Laschet?"],
        // ]),
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
                    ["de", "Er hat die anderen Kandidaten häufig angegriffen."],
                ])

            },
            {
                key: 'AL2', content: new Map([
                    ["de", "Er hat häufig für seine Politik geworben."],
                ])
            },
            {
                key: 'AL3', content: new Map([
                    ["de", "Er musste sich häufig verteidigen."],
                ])

            },
        ]
    });
}




export const getRSTRATOS = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'RSTRATOS';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und welchen Eindruck hatten Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Olaf Scholz"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und welchen Eindruck hatten Sie von Olaf Scholz? "],
        // ]),
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
                    ["de", "Er hat die anderen Kandidaten häufig angegriffen."],
                ])

            },
            {
                key: 'OS2', content: new Map([
                    ["de", "Er hat häufig für seine Politik geworben."],
                ])
            },
            {
                key: 'OS3', content: new Map([
                    ["de", "Er musste sich häufig verteidigen."],
                ])

            },
        ]
    });
}



export const getRSTRATAB = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'RSTRATAB';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und welchen Eindruck hatten Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Annalena Baerbock"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        /*    questionText: new Map([
               ["de", "Und welchen Eindruck hatten Sie von Annalena Baerbock? "],
           ]), */
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
                    ["de", "Sie hat die anderen Kandidaten häufig angegriffen."],
                ])

            },
            {
                key: 'AB2', content: new Map([
                    ["de", "Sie hat häufig für ihre Politik geworben."],
                ])
            },
            {
                key: 'AB3', content: new Map([
                    ["de", "Sie musste sich häufig verteidigen."],
                ])

            },
        ]
    });
}



export const getATTACKAL = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ATTACKAL';
    return SurveyItemGenerators.responsiveBipolarLikertArray({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: [
            {
                content: new Map([
                    ['de', 'Wenn Sie jetzt nur einmal an die Kandidaten und ihre ']
                ]),
            },
            {
                content: new Map([
                    ['de', 'Angriffe']
                ]),
                className: 'text-primary'
            },
            {
                content: new Map([
                    ['de', '  auf den politischen Gegner in der heutigen TV-Debatte denken. Wie würden Sie die Angriffe von ']
                ]),
            },
            {
                content: new Map([
                    ['de', 'Armin Laschet']
                ]),
                className: 'text-primary'
            },
            {
                content: new Map([
                    ['de', ' beschreiben? Seine Angriffe...']
                ]),
            }
        ],
        scaleOptions: [
            {
                key: '-2',
            }, {
                key: '-1',
            }, {
                key: '0',
            }, {
                key: '1',
            }, {
                key: '2',
            },
        ],
        rows: [
            {
                key: 'AL1',
                startLabel: new Map([
                    ['de', '...zielten auf die Politik des Gegners']
                ]),
                endLabel: new Map([
                    ['de', '...zielten auf die Persönlichkeit des Gegners']
                ]),
            },
            {
                key: 'AL2',
                startLabel: new Map([
                    ['de', '...waren respektvoll']
                ]),
                endLabel: new Map([
                    ['de', '...waren respektlos']
                ]),
            },
            {
                key: 'AL3',
                startLabel: new Map([
                    ['de', '...haben wichtige Punkte angesprochen']
                ]),
                endLabel: new Map([
                    ['de', '...haben unwichtige Punkte angesprochen']
                ]),
            }
        ],
        defaultMode: 'withLabelRow',
        responsiveModes: {
            // sm: 'withLabelRow',
            lg: 'table',
        },
        withLabelRowModeProps: {
            maxLabelWidth: '120px',

        },
        verticalModeProps: {},
        tableModeProps: {},
        titleClassName: 'sticky-top',
    });
}

export const getATTACKOS = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ATTACKOS';
    return SurveyItemGenerators.responsiveBipolarLikertArray({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: [
            {
                content: new Map([
                    ['de', 'Und wie würden Sie die ']
                ]),
            },
            {
                content: new Map([
                    ['de', 'Angriffe']
                ]),
                className: 'text-primary'
            },
            {
                content: new Map([
                    ['de', ' von ']
                ]),
            },
            {
                content: new Map([
                    ['de', 'Olaf Scholz']
                ]),
                className: 'text-primary'
            },
            {
                content: new Map([
                    ['de', ' beschreiben? Seine Angriffe...']
                ]),
            }
        ],
        scaleOptions: [
            {
                key: '-2',
            }, {
                key: '-1',
            }, {
                key: '0',
            }, {
                key: '1',
            }, {
                key: '2',
            },
        ],
        rows: [
            {
                key: 'OS1',
                startLabel: new Map([
                    ['de', '...zielten auf die Politik des Gegners']
                ]),
                endLabel: new Map([
                    ['de', '...zielten auf die Persönlichkeit des Gegners']
                ]),
            },
            {
                key: 'OS2',
                startLabel: new Map([
                    ['de', '...waren respektvoll']
                ]),
                endLabel: new Map([
                    ['de', '...waren respektlos']
                ]),
            },
            {
                key: 'OS3',
                startLabel: new Map([
                    ['de', '...haben wichtige Punkte angesprochen']
                ]),
                endLabel: new Map([
                    ['de', '...haben unwichtige Punkte angesprochen']
                ]),
            }
        ],
        defaultMode: 'withLabelRow',
        responsiveModes: {
            // sm: 'withLabelRow',
            lg: 'table',
        },
        withLabelRowModeProps: {
            maxLabelWidth: '120px',

        },
        verticalModeProps: {},
        tableModeProps: {},
        titleClassName: 'sticky-top',
    });
}

export const getATTACKAB = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ATTACKAB';
    return SurveyItemGenerators.responsiveBipolarLikertArray({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: [
            {
                content: new Map([
                    ['de', 'Und wie würden Sie die ']
                ]),
            },
            {
                content: new Map([
                    ['de', 'Angriffe']
                ]),
                className: 'text-primary'
            },
            {
                content: new Map([
                    ['de', ' von ']
                ]),
            },
            {
                content: new Map([
                    ['de', 'Annalena Baerbock']
                ]),
                className: 'text-primary'
            },
            {
                content: new Map([
                    ['de', ' beschreiben? Ihre Angriffe...']
                ]),
            }
        ],
        scaleOptions: [
            {
                key: '-2',
            }, {
                key: '-1',
            }, {
                key: '0',
            }, {
                key: '1',
            }, {
                key: '2',
            },
        ],
        rows: [
            {
                key: 'AB1',
                startLabel: new Map([
                    ['de', '...zielten auf die Politik des Gegners']
                ]),
                endLabel: new Map([
                    ['de', '...zielten auf die Persönlichkeit des Gegners']
                ]),
            },
            {
                key: 'AB2',
                startLabel: new Map([
                    ['de', '...waren respektvoll']
                ]),
                endLabel: new Map([
                    ['de', '...waren respektlos']
                ]),
            },
            {
                key: 'AB3',
                startLabel: new Map([
                    ['de', '...haben wichtige Punkte angesprochen']
                ]),
                endLabel: new Map([
                    ['de', '...haben unwichtige Punkte angesprochen']
                ]),
            }
        ],
        defaultMode: 'withLabelRow',
        responsiveModes: {
            // sm: 'withLabelRow',
            lg: 'table',
        },
        withLabelRowModeProps: {
            maxLabelWidth: '120px',

        },
        verticalModeProps: {},
        tableModeProps: {},
        titleClassName: 'sticky-top',
    });
}

export const getANKOMM = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ANKOMM';
    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Haben Sie Berichte zum Ausgang der "],
                ]),
            },
            {
                content: new Map([
                    ["de", "TV-Debatte vom 29.8.2021"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " wahrgenommen oder Gespräche mit anderen Personen hierzu geführt? (Mehrfachantworten möglich)?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Haben Sie Berichte zum Ausgang der TV-Debatte vom 29.8.2021 wahrgenommen oder Gespräche mit anderen Personen hierzu geführt? (Mehrfachantworten möglich)?"],
        // ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja, Berichte in den Medien (inkl. Online-Auftritte)"],
                ]),
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '4')
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Ja, Beiträge im Internet oder in den sozialen Medien (ausgenommen Online-Auftritte von Medien)"],
                ]),
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '4')
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Ja, Gespräche mit Dritten"],
                ]),
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '4')
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Nein"],
                ]),
                disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '4')
            },
        ],
    });
}


export const getANKOMMSIEG = (parentKey: string, ANKOMMKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ANKOMMSIEG';
    const condition = CommonExpressions.multipleChoiceOnlyOtherKeysSelected(ANKOMMKey, '4');
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Welcher Kandidat wurde in diesen Berichten oder Gesprächen – alles in allem – als Debattensieger gesehen?"],
        ]),
        titleClassName: 'sticky-top',
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
                    ["de", "Es gab keinen eindeutigen Sieger"],
                ]),
            },
        ],
    });
}


export const getWK = (parentKey: string, isRequired?: boolean, shortForm?: boolean): SurveyItem => {
    const itemKey = 'WK';

    const lastItems = !shortForm ? [
        {
            key: 'WK3', content: new Map([
                ["de", "Im Wahlkampf geht es zu wenig um politische Inhalte."],
            ])
        },
    ] : [];

    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Wenn Sie einmal an den laufenden Wahlkampf denken, inwieweit stimmen Sie den folgenden Aussagen zu? "],
        ]),
        titleClassName: 'sticky-top',
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
                key: 'WK1', content: new Map([
                    ["de", "Der Wahlkampf der Parteien ist zu negativ."],
                ])

            },
            {
                key: 'WK2', content: new Map([
                    ["de", "Im Wahlkampf stehen Personen zu sehr im Vordergrund."],
                ])
            },
            ...lastItems,
        ]
    });
}


export const getPID = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'PID';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "In Deutschland neigen viele Leute längere Zeit einer bestimmten politischen Partei zu, obwohl sie auch ab und zu eine andere Partei wählen. Wie ist das bei Ihnen: Neigen Sie – ganz allgemein – einer bestimmten Partei zu? Und wenn ja, welcher?"],
        ]),
        titleClassName: 'sticky-top',
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "CDU bzw. CSU"],
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
                    ["de", "Einer anderen Partei"],
                ]),
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["de", "Nein, keiner Partei"],
                ]),
            },
        ],
    });
}



export const getSTPID = (parentKey: string, PIDkey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'STPID';
    const condition = CommonExpressions.singleChoiceOnlyOtherKeysSelected(PIDkey, '8')
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["de", "Wie stark oder wie schwach neigen Sie – alles zusammengenommen – dieser Partei zu?"],
        ]),
        titleClassName: 'sticky-top',
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
                    ["de", "Schwach"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["de", "Sehr schwach"],
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



export const getSEX = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'SEX';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Ihr Geschlecht:"],
        ]),
        titleClassName: 'sticky-top',
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Männlich"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Weiblich"],
                ]),
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Divers"],
                ]),
            },
        ],
    });
}


export const getAGE = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'AGE';

    return SurveyItemGenerators.numericInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Ihr Alter:"],
        ]),
        titleClassName: 'sticky-top',
        inputMaxWidth: '80px',
        content: new Map([
            ['de', 'Jahre']
        ]),
        contentBehindInput: true,
        componentProperties: {
            min: 0,
            max: 120
        }
    })
}


export const getEDUC = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'EDUC';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Was ist Ihr höchster allgemeinbildender Schulabschluss?"],
        ]),
        titleClassName: 'sticky-top',
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Kein Schulabschluss"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Hauptschule, Volksschule bzw. POS 8./9. Klasse"],
                ]),
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Realschule, mittlere Reife, qualifizierter Sekundarabschluss I bzw. POS 10. Klasse"],
                ]),
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Fachhochschulreife"],
                ]),
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["de", "Abitur bzw. EOS 12. Klasse"],
                ]),
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["de", "Noch Schüler"],
                ]),
            },
        ],
    });
}


export const getWBR = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WBR';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Sind Sie bei der kommenden Bundestagswahl wahlberechtigt?"],
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


export const getPERS1 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'PERS1';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Inwieweit stimmen Sie den folgenden Aussagen zu?"],
        ]),
        titleClassName: 'sticky-top',
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
                key: 'DCORE1', content: new Map([
                    ["de", "Es fällt mir schwer, jemanden leiden zu sehen."],
                ])

            },
            {
                key: 'CA1', content: new Map([
                    ["de", "Ich hasse Streit."],
                ])
            },
            {
                key: 'DCORE2', content: new Map([
                    ["de", "Insgesamt ist es besser, bescheiden und ehrlich zu sein, als wichtig und unehrlich."],
                ])

            },
            {
                key: 'BFI1', content: new Map([
                    ["de", "Ich bin eher zurückhaltend, reserviert."],
                ])
            },
            {
                key: 'DCORE3', content: new Map([
                    ["de", "Rache muss schnell und fies sein."],
                ])
            },
            {
                key: 'BFI2', content: new Map([
                    ["de", "Ich schenke anderen leicht Vertrauen, glaube an das Gute im Menschen."],
                ])
            },
            {
                key: 'DCORE4', content: new Map([
                    ["de", "Mein eigenes Vergnügen ist das Einzige was zählt."],
                ])
            },
        ]
    });
}



export const getPERS2 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'PERS2';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Inwieweit stimmen Sie diesen Aussagen zu?"],
        ]),
        titleClassName: 'sticky-top',
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
                key: 'BFI3', content: new Map([
                    ["de", "Ich bin bequem, neige zur Faulheit."],
                ])

            },
            {
                key: 'DCORE5', content: new Map([
                    ["de", "Ich würde mich sehr unwohl dabei fühlen, andere Menschen zu verletzen."],
                ])
            },
            {
                key: 'BFI4', content: new Map([
                    ["de", "Ich bin entspannt, lasse mich durch Stress nicht aus der Ruhe bringen."],
                ])

            },
            {
                key: 'DCORE6', content: new Map([
                    ["de", "Menschen bereuen es immer, wenn sie sich mit mir anlegen."],
                ])
            },
            {
                key: 'BFI5', content: new Map([
                    ["de", "Ich habe nur wenig künstlerisches Interesse."],
                ])
            },
            {
                key: 'DCORE7', content: new Map([
                    ["de", "Warum sollte ich mich für andere interessieren, wenn sich niemand für mich interessiert?"],
                ])
            },
            {
                key: 'BFI6', content: new Map([
                    ["de", "Ich gehe aus mir heraus, bin gesellig."],
                ])
            },
        ]
    });
}



export const getPERS3 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'PERS3';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Inwieweit stimmen Sie den folgenden Aussagen zu?"],
        ]),
        titleClassName: 'sticky-top',
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
                key: 'DCORE8', content: new Map([
                    ["de", "Es ist mir unbegreiflich, wie es aufregend sein kann, gemein zu anderen zu sein."],
                ])

            },
            {
                key: 'BFI7', content: new Map([
                    ["de", "Ich neige dazu, andere zu kritisieren."],
                ])
            },
            {
                key: 'DCORE9', content: new Map([
                    ["de", "Die meisten Menschen verdienen Respekt."],
                ])

            },
            {
                key: 'DCORE10', content: new Map([
                    ["de", "Ich versuche, niemanden bei der Verfolgung meiner Ziele zu verletzen."],
                ])
            },
            {
                key: 'BFI8', content: new Map([
                    ["de", "Ich erledige Aufgaben gründlich."],
                ])
            },
            {
                key: 'DCORE11', content: new Map([
                    ["de", "Manche Leute würde ich gerne leiden lassen, selbst wenn ich dafür mit ihnen in die Hölle käme."],
                ])
            },
            {
                key: 'DCORE12', content: new Map([
                    ["de", "Es ist ratsam, Informationen im Auge zu behalten, die man später gegen andere verwenden kann."],
                ])
            },
        ]
    });
}


export const getPERS4 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'PERS4';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Inwieweit stimmen Sie diesen Aussagen zu?"],
        ]),
        titleClassName: 'sticky-top',
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
                key: 'BFI9', content: new Map([
                    ["de", "Ich werde leicht nervös und unsicher."],
                ])

            },
            {
                key: 'DCORE13', content: new Map([
                    ["de", "Ich vermeide es, andere zu demütigen."],
                ])
            },
            {
                key: 'DCORE14', content: new Map([
                    ["de", "Leute, die schlecht behandelt werden, haben dies üblicherweise verdient."],
                ])

            },
            {
                key: 'BFI10', content: new Map([
                    ["de", "Ich habe eine aktive Vorstellungskraft, bin fantasievoll."],
                ])
            },
            {
                key: 'DCORE15', content: new Map([
                    ["de", "Ich würde selbst einen Schlag hinnehmen, wenn das bedeuten würde, dass jemand, den ich nicht mag, zwei Schläge erhalten würde."],
                ])
            },
            {
                key: 'CA2', content: new Map([
                    ["de", "Wenn möglich, versuche ich Konflikte zu vermeiden."],
                ])
            },
            {
                key: 'DCORE16', content: new Map([
                    ["de", "Es tut mir leid, wenn Dinge, die ich tue, andere Menschen verärgern."],
                ])
            },
        ]
    });
}


export const getAUFM1 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'AUFM1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "An welchen Kandidaten ging die erste Frage?"],
        ]),
        titleClassName: 'sticky-top',
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
                    ["de", "Weiß nicht"],
                ]),
            },
        ],
    });
}


export const getAUFM2 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'AUFM2';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Und welcher Kandidat hat am Ende der TV-Debatte mehr Redezeit gehabt?"],
        ]),
        titleClassName: 'sticky-top',
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
                    ["de", "Weiß nicht"],
                ]),
            },
        ],
    });
}


export const getJSTRATPA = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'JSTRATPA';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Nun geht es um die "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Moderatoren"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " der TV-Debatte. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Pinar Atalay"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zutreffen."],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Nun geht es um die Moderatoren der TV-Debatte. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf Pinar Atalay zutreffen."],
        // ]),
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
                    ["de", "Teils, teils"],
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
                key: 'PA1', content: new Map([
                    ["de", "Sie hat den Kandidaten häufig Fragen zu ihrem Programm und ihren Problemlösungsvorschlägen gestellt."],
                ])

            },
            {
                key: 'PA2', content: new Map([
                    ["de", "Sie hat die Antworten der Kandidaten häufig kritisch hinterfragt und Nachfragen gestellt, wenn Fragen nicht oder nur unvollständig beantwortet wurden. "],
                ])
            },
            {
                key: 'PA3', content: new Map([
                    ["de", "Sie hat häufig Fragen zur Wahlkampfführung und zu den Koalitionspräferenzen der Kandidaten gestellt."],
                ])

            },
            {
                key: 'PA4', content: new Map([
                    ["de", "Sie hat häufig versucht, Schwächen der Kandidaten aufzudecken und sie in die Enge zu treiben."],
                ])
            },
            {
                key: 'PA5', content: new Map([
                    ["de", "Sie hat die Kandidaten häufig unterbrochen."],
                ])
            },
        ]
    });
}


export const getJSTRATPK = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'JSTRATPK';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Peter Kloeppel"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zu?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf Peter Kloeppel zu?"],
        // ]),
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
                    ["de", "Teils, teils"],
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
                key: 'PK1', content: new Map([
                    ["de", "Er hat den Kandidaten häufig Fragen zu ihrem Programm und ihren Problemlösungsvorschlägen gestellt."],
                ])

            },
            {
                key: 'PK2', content: new Map([
                    ["de", "Er hat die Antworten der Kandidaten häufig kritisch hinterfragt und Nachfragen gestellt, wenn Fragen nicht oder nur unvollständig beantwortet wurden. "],
                ])
            },
            {
                key: 'PK3', content: new Map([
                    ["de", "Er hat häufig Fragen zur Wahlkampfführung und zu den Koalitionspräferenzen der Kandidaten gestellt."],
                ])

            },
            {
                key: 'PK4', content: new Map([
                    ["de", "Er hat häufig versucht, Schwächen der Kandidaten aufzudecken und sie in die Enge zu treiben."],
                ])
            },
            {
                key: 'PK5', content: new Map([
                    ["de", "Er hat die Kandidaten häufig unterbrochen."],
                ])
            },
        ]
    });
}

export const getJSTRATMI = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'JSTRATMI';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Nun geht es um die "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Moderatoren"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " der TV-Debatte. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Maybrit Illner"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zutreffen."],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Nun geht es um die Moderatoren der TV-Debatte. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf Maybrit Illner zutreffen."],
        // ]),
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
                    ["de", "Teils, teils"],
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
                key: 'MI1', content: new Map([
                    ["de", "Sie hat den Kandidaten häufig Fragen zu ihrem Programm und ihren Problemlösungsvorschlägen gestellt."],
                ])

            },
            {
                key: 'MI2', content: new Map([
                    ["de", "Sie hat die Antworten der Kandidaten häufig kritisch hinterfragt und Nachfragen gestellt, wenn Fragen nicht oder nur unvollständig beantwortet wurden. "],
                ])
            },
            {
                key: 'MI3', content: new Map([
                    ["de", "Sie hat häufig Fragen zur Wahlkampfführung und zu den Koalitionspräferenzen der Kandidaten gestellt."],
                ])

            },
            {
                key: 'MI4', content: new Map([
                    ["de", "Sie hat häufig versucht, Schwächen der Kandidaten aufzudecken und sie in die Enge zu treiben."],
                ])
            },
            {
                key: 'MI5', content: new Map([
                    ["de", "Sie hat die Kandidaten häufig unterbrochen."],
                ])
            },
        ]
    });
}

export const getJSTRATOK = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'JSTRATOK';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Oliver Köhr"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zu?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf Oliver Köhr zu?"],
        // ]),
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
                    ["de", "Teils, teils"],
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
                key: 'OK1', content: new Map([
                    ["de", "Er hat den Kandidaten häufig Fragen zu ihrem Programm und ihren Problemlösungsvorschlägen gestellt."],
                ])

            },
            {
                key: 'OK2', content: new Map([
                    ["de", "Er hat die Antworten der Kandidaten häufig kritisch hinterfragt und Nachfragen gestellt, wenn Fragen nicht oder nur unvollständig beantwortet wurden. "],
                ])
            },
            {
                key: 'OK3', content: new Map([
                    ["de", "Er hat häufig Fragen zur Wahlkampfführung und zu den Koalitionspräferenzen der Kandidaten gestellt."],
                ])

            },
            {
                key: 'OK4', content: new Map([
                    ["de", "Er hat häufig versucht, Schwächen der Kandidaten aufzudecken und sie in die Enge zu treiben."],
                ])
            },
            {
                key: 'OK5', content: new Map([
                    ["de", "Er hat die Kandidaten häufig unterbrochen."],
                ])
            },
        ]
    });
}


export const getBIASPA = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'BIASPA';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Hat "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Pinar Atalay"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Hat Pinar Atalay – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
        // ]),
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt "],
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


export const getBIASPK = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'BIASPK';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Hat "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Peter Kloeppel"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Hat Peter Kloeppel – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
        // ]),
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt "],
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


export const getBIASMI = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'BIASMI';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Hat "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Maybritt Illner"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Hat Maybritt Illner – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
        // ]),
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt "],
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


export const getBIASOK = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'BIASOK';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Hat "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Oliver Köhr"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Hat Oliver Köhr – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
        // ]),
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt "],
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


export const getREZEPT = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'REZEPT';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Haben Sie sich die TV-Debatte allein oder gemeinsam mit anderen Personen gesehen?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Allein"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Mit anderen Personen"],
                ]),
            },
        ],
    });
}




export const getRPERF1209 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'RPERF1209';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Im Folgenden geht es um die "],
                ]),
            },
            {
                content: new Map([
                    ["de", "letzte TV-Debatte"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", ", also die Debatte, die am "],
                ]),
            },
            {
                content: new Map([
                    ["de", "12.9.2021 in ARD und ZDF"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " ausgestrahlt wurde. Einmal ganz allgemein gesprochen, wie haben Ihrer Meinung nach die Kandidaten in dieser TV-Debatte abgeschnitten?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",    
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




export const getRSTRATAL1209 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'RSTRATAL1209';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Nun geht um den Auftritt der Kandidaten in der "],
                ]),
            },
            {
                content: new Map([
                    ["de", "TV-Debatte vom 12.9.2021"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", ". Welchen Eindruck hatten Sie von "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Armin Laschet"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", "?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
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
                    ["de", "Er hat die anderen Kandidaten häufig angegriffen."],
                ])

            },
            {
                key: 'AL2', content: new Map([
                    ["de", "Er hat häufig für seine Politik geworben."],
                ])
            },
            {
                key: 'AL3', content: new Map([
                    ["de", "Er musste sich häufig verteidigen."],
                ])

            },
        ]
    });
}


export const getANKOMM1209 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'ANKOMM1209';
    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Haben Sie Berichte zum Ausgang der "],
                ]),
            },
            {
                content: new Map([
                    ["de", "TV-Debatte vom 12.9.2021"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " wahrgenommen oder Gespräche mit anderen Personen hierzu geführt? (Mehrfachantworten möglich)?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        // questionText: new Map([
        //     ["de", "Haben Sie Berichte zum Ausgang der TV-Debatte vom 29.8.2021 wahrgenommen oder Gespräche mit anderen Personen hierzu geführt? (Mehrfachantworten möglich)?"],
        // ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja, Berichte in den Medien (inkl. Online-Auftritte)"],
                ]),
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '4')
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Ja, Beiträge im Internet oder in den sozialen Medien (ausgenommen Online-Auftritte von Medien)"],
                ]),
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '4')
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["de", "Ja, Gespräche mit Dritten"],
                ]),
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '4')
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["de", "Nein"],
                ]),
                disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '4')
            },
        ],
    });
}


export const getJSTRATLZ = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'JSTRATLZ';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Nun geht es um die "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Moderatoren"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " der TV-Debatte. Geben Sie bitte an, in welchem Maße die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Linda Zervakis"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zutreffen."],
                ]),
            },
        ],
        titleClassName: "sticky-top",
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
                    ["de", "Teils, teils"],
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
                key: 'LZ1', content: new Map([
                    ["de", "Sie hat den Kandidaten häufig Fragen zu ihrem Programm und ihren Problemlösungsvorschlägen gestellt."],
                ])

            },
            {
                key: 'LZ2', content: new Map([
                    ["de", "Sie hat die Antworten der Kandidaten häufig kritisch hinterfragt und Nachfragen gestellt, wenn Fragen nicht oder nur unvollständig beantwortet wurden. "],
                ])
            },
            {
                key: 'LZ3', content: new Map([
                    ["de", "Sie hat häufig Fragen zur Wahlkampfführung und zu den Koalitionspräferenzen der Kandidaten gestellt."],
                ])

            },
            {
                key: 'LZ4', content: new Map([
                    ["de", "Sie hat häufig versucht, Schwächen der Kandidaten aufzudecken und sie in die Enge zu treiben."],
                ])
            },
            {
                key: 'LZ5', content: new Map([
                    ["de", "Sie hat die Kandidaten häufig unterbrochen."],
                ])
            },
        ]
    });
}



export const getJSTRATCB = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'JSTRATCB';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Und in welchem Maße treffen die verschiedenen Aussagen Ihrer Meinung nach auf "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Claudia von Brauchitsch"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " zu?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
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
                    ["de", "Teils, teils"],
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
                key: 'CB1', content: new Map([
                    ["de", "Sie hat den Kandidaten häufig Fragen zu ihrem Programm und ihren Problemlösungsvorschlägen gestellt."],
                ])

            },
            {
                key: 'CB2', content: new Map([
                    ["de", "Sie hat die Antworten der Kandidaten häufig kritisch hinterfragt und Nachfragen gestellt, wenn Fragen nicht oder nur unvollständig beantwortet wurden. "],
                ])
            },
            {
                key: 'CB3', content: new Map([
                    ["de", "Sie hat häufig Fragen zur Wahlkampfführung und zu den Koalitionspräferenzen der Kandidaten gestellt."],
                ])

            },
            {
                key: 'CB4', content: new Map([
                    ["de", "Sie hat häufig versucht, Schwächen der Kandidaten aufzudecken und sie in die Enge zu treiben."],
                ])
            },
            {
                key: 'CB5', content: new Map([
                    ["de", "Sie hat die Kandidaten häufig unterbrochen."],
                ])
            },
        ]
    });
}



export const getBIASLZ = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'BIASLZ';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Hat "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Linda Zervakis"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt "],
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


export const getBIASCB = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'BIASCB';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        //bold text here
        questionText: [
            {
                content: new Map([
                    ["de", "Hat "],
                ]),
            },
            {
                content: new Map([
                    ["de", "Claudia von Brauchitsch"],
                ]),
                className: "text-primary"
            },
            {
                content: new Map([
                    ["de", " – alles in allem – einen Kandidaten bevorzugt oder benachteiligt?"],
                ]),
            },
        ],
        titleClassName: "sticky-top",
        stackOnSmallScreen: true,
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["de", "Stark bevorzugt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Eher bevorzugt "],
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


export const getWAHL1 = (parentKey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WAHL1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["de", "Bei der Bundestagswahl am 26. September kamen viele Bürger nicht dazu, ihre Stimme abzugeben oder nahmen aus anderen Gründen nicht an der Wahl teil. Wie war es bei Ihnen: Haben Sie gewählt oder haben Sie nicht gewählt?"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["de", "Ja, habe gewählt"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["de", "Nein, habe nicht gewählt"],
                ]),
            },
        ],
    });
}


export const getWAHL2 = (parentKey: string, PIDkey: string, isRequired?: boolean): SurveyItem => {
    const itemKey = 'WAHL2';
    const condition = CommonExpressions.singleChoiceOptionsSelected(PIDkey, '1');
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["de", "Und welcher Partei haben Sie Ihre Zweitstimme gegeben?"],
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
                    ["de", "Bündnis 90/Die Grünen"],
                ]),
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["de", "Einer anderen Partei"],
                ]),
            },
        ],
    });
}


