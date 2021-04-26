import { SurveyItem } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class CFQGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'CFQ';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addPageBreak();
        this.addItem(Q_instructions(this.key))
        this.addItem(Q1(this.key, true))
        this.addItem(Q2(this.key, true))
        this.addPageBreak();
        this.addItem(Q3(this.key, true))
        this.addItem(Q4(this.key, true))
        this.addItem(Q5(this.key, true))
        this.addPageBreak();
    }
}

const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Cognitie

De volgende vragen gaan over kleine, alledaagse vergissingen die iedereen van tijd tot tijd maakt. Sommige van die vergissingen overkomen jou mogelijk wat vaker dan anderen.
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
const Q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Cognitie (1/5)"],
        ]),

        questionSubText: new Map([
            ["nl", "Vul hieronder het vakje in dat hoort bij je antwoord."],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Zeer vaak"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Vaak"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "Af en toe"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "Zelden"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "Nooit"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "Iets lezen en vlak daarna niet meer weten wat je gelezen hebt, zodat je nog een keer moet lezen"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "Vergeten waarom je naar een bepaald gedeelte van je huis bent gelopen"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Wegwijzers over het hoofd zien"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "Links en rechts verwarren bij het beschrijven van een route"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "Per ongeluk tegen mensen opbotsen"],
                ])
            },
        ]
    });
}

const Q2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Cognitie (2/5)"],
        ]),
        questionSubText: new Map([
            ["nl", "Vul hieronder het vakje in dat hoort bij je antwoord."],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Zeer vaak"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Vaak"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "Af en toe"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "Zelden"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "Nooit"],
                ])
            }
        ],
        rows: [
            {
                key: 'f', content: new Map([
                    ["nl", "Niet meer weten of je het licht of het gas hebt uitgedaan, of de deur op slot hebt gedaan"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "Niet luisteren naar de naam van een persoon op het moment dat deze persoon zich aan je voorstelt"],
                ])
            },
            {
                key: 'h', content: new Map([
                    ["nl", "Iets er uitflappen en achteraf bedenken dat dat wel eens beledigend voor iemand zou kunnen zijn"],
                ])
            },
            {
                key: 'i', content: new Map([
                    ["nl", "Niet merken dat iemand iets tegen je zegt als je met iets anders bezig bent"],
                ])
            },
            {
                key: 'j', content: new Map([
                    ["nl", "Boos worden en daar later spijt van hebben"],
                ])
            },
        ]
    });
}

const Q3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Cognitie (3/5)"],
        ]),
        questionSubText: new Map([
            ["nl", "Vul hieronder het vakje in dat hoort bij je antwoord."],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Zeer vaak"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Vaak"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "Af en toe"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "Zelden"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "Nooit"],
                ])
            }
        ],
        rows: [
            {
                key: 'k', content: new Map([
                    ["nl", "Belangrijke berichten dagenlang onbeantwoord laten"],
                ])
            },
            {
                key: 'l', content: new Map([
                    ["nl", "Vergeten welke straat je moet inslaan als je een route kiest die je goed kent, maar die je zelden gebruikt"],
                ])
            },
            {
                key: 'm', content: new Map([
                    ["nl", "In een supermarkt niet kunnen vinden wat je zoekt terwijl het er wel is"],
                ])
            },
            {
                key: 'n', content: new Map([
                    ["nl", "Je plotseling afvragen of je een woord op de juiste manier gebruikt"],
                ])
            },
            {
                key: 'o', content: new Map([
                    ["nl", "Moeite hebben met het nemen van beslissingen"],
                ])
            },
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
            ["nl", "Cognitie (4/5)"],
        ]),
        questionSubText: new Map([
            ["nl", "Vul hieronder het vakje in dat hoort bij je antwoord."],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Zeer vaak"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Vaak"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "Af en toe"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "Zelden"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "Nooit"],
                ])
            }
        ],
        rows: [
            {
                key: 'p', content: new Map([
                    ["nl", "Afspraken vergeten"],
                ])
            },
            {
                key: 'q', content: new Map([
                    ["nl", "Vergeten waar je iets hebt neergelegd, zoals een boek of een krant"],
                ])
            },
            {
                key: 'r', content: new Map([
                    ["nl", "Per ongeluk iets weggooien wat je nodig hebt of bewaren wat je wilde weggooien"],
                ])
            },
            {
                key: 's', content: new Map([
                    ["nl", "Dagdromen terwijl je eigenlijk naar iets of iemand zou moeten luisteren"],
                ])
            },
            {
                key: 't', content: new Map([
                    ["nl", "Namen van mensen vergeten"],
                ])
            },
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
            ["nl", "Cognitie (5/5)"],
        ]),
        questionSubText: new Map([
            ["nl", "Vul hieronder het vakje in dat hoort bij je antwoord."],
        ]),
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "Zeer vaak"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "Vaak"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "Af en toe"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "Zelden"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "Nooit"],
                ])
            }
        ],
        rows: [
            {
                key: 'u', content: new Map([
                    ["nl", "Beginnen met iets maar het niet afmaken, omdat je ongemerkt met iets anders bent begonnen"],
                ])
            },
            {
                key: 'v', content: new Map([
                    ["nl", "Niet op een woord kunnen komen terwijl het 'op het puntje van je tong' ligt"],
                ])
            },
            {
                key: 'w', content: new Map([
                    ["nl", "In een winkel vergeten wat je kwam kopen"],
                ])
            },
            {
                key: 'x', content: new Map([
                    ["nl", "Dingen uit je handen laten vallen"],
                ])
            },
            {
                key: 'y', content: new Map([
                    ["nl", "In een gesprek niets meer weten om over te praten"],
                ])
            },
        ]
    });
}
