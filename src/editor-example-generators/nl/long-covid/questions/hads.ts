import { SurveyItem } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class HADSGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'HADS';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(Q_instructions(this.key))
        this.addItem(Q_a(this.key, true))
        this.addItem(Q_b(this.key, true))
        this.addItem(Q_c(this.key, true))
        this.addItem(Q_d(this.key, true))
        this.addItem(Q_e(this.key, true))
        this.addItem(Q_f(this.key, true))
        this.addItem(Q_g(this.key, true))
        this.addItem(Q_h(this.key, true))
        this.addItem(Q_i(this.key, true))
        this.addItem(Q_j(this.key, true))
        this.addItem(Q_k(this.key, true))
        this.addItem(Q_l(this.key, true))
        this.addItem(Q_m(this.key, true))
        this.addItem(Q_n(this.key, true))
       
    }
}


const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
# Angst en depressie

Het is bekend dat emoties bij de meeste ziektes een belangrijke rol spelen.
Met deze vragenlijst willen wij te weten te komen hoe je je voelt. Lees iedere vraag goed door en geef je antwoord aan met een kruisje in het hokje dat het beste weergeeft hoe je je gedurende **de afgelopen week** gevoeld hebt.

Denk niet te lang na over een antwoord. Het gaat bij deze uitspraken om je eigen indruk. Er bestaan geen foute antwoorden, elk antwoord is goed, zolang het maar je eigen indruk weergeeft.
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

const Q_a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'a';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik voel me gespannen:"],
        ]),
        responseOptions: [
            ComponentGenerators.option({
                key: '1',
                content: new Map([
                    ["nl", "meestal"],
                ])
            }),
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "vaak"],
                ]),
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "af en toe, soms"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
        ]
    });
}

const Q_b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'b';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik geniet nog steeds van de dingen waar ik vroeger van genoot:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "zeker zo veel"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "wel wat minder"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "duidelijk minder"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "eigenlijk nauwelijks nog"],
                ])
            },
        ]
    });
}

const Q_c = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'c';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik heb een soort angstgevoel alsof er iets vreselijks zal gebeuren:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "jazeker, en vrij erg"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "ja, maar niet zo erg"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "een beetje, maar het hindert me niet"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
        ]
    });
}

const Q_d = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'd';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik kan  best lachen en de dingen van de vrolijke kant zien:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "net zoveel als vroeger"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "nu wel wat minder"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "duidelijk minder"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
        ]
    });
}

const Q_e = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'e';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik maak me ongerust:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "heel erg vaak"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "vaak"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "af en toe, maar niet zo vaak"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "heel soms"],
                ])
            },
        ]
    });
}

const Q_f = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'f';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik voel me opgewekt:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "heel af en toe"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "soms"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "meestal"],
                ])
            },
        ]
    });
}

const Q_g = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'g';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik kan best rustig zitten en me ontspannen:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "jazeker"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "meestal"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "af en toe"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
        ]
    });
}

const Q_h = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'h';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik heb het gevoel dat alles moeizamer gaat:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "bijna altijd"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "heel vaak"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "soms"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
        ]
    });
}

const Q_i = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'i';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik heb een soort angstig, gespannen gevoel in mijn buik:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "soms"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "vrij vaak"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "heel vaak"],
                ])
            },

        ]
    });
}

const Q_j = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'j';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Het interesseert me niet meer hoe ik eruit zie:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "inderdaad, helemaal niet meer"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "niet meer zoveel als eigenlijk zou moeten"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "het interesseert me wel, maar iets minder dan vroeger"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "het interesseert me nog net zoveel als vroeger"],
                ])
            },
        ]
    });
}

const Q_k = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'k';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik ben onrustig en voel dat ik iets te doen moet hebben:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "inderdaad, heel duidelijk"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "duidelijk"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "enigszins"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "helemaal niet"],
                ])
            },
        ]
    });
}

const Q_l = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'l';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik verheug me van tevoren op dingen die komen gaan:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "net zoveel als vroeger"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "een beetje minder dan vroeger"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "veel minder dan vroeger"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "bijna nooit"],
                ])
            },
        ]
    });
}

const Q_m = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'm';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik raak plotseling in paniek:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "inderdaad, zeer vaak"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "tamelijk vaak"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "soms"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "helemaal nooit"],
                ])
            },
        ]
    });
}

const Q_n = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'n';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ik kan van een goed boek genieten, of van zoiets als een radio- of televisieprogramma:"],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "vaak"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "tamelijk vaak"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "af en toe"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "heel zelden"],
                ])
            },

        ]
    });
}
