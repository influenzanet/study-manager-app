import { SurveyItem } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../studyRules";

export class SaTGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'SaT';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(Q_instructions(this.key))
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(q_a(this.key, true))
        }
        if (!this.isPartOfSurvey(surveyKeys.T9)) {
            this.addItem(q_b(this.key, true))
            this.addItem(q_c(this.key, true))
        }

        this.addItem(Q_instructions2(this.key))
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(q_d(this.key, true))
        }
        if (!this.isPartOfSurvey(surveyKeys.T9)) {
            this.addItem(q_e(this.key, true))
            this.addItem(q_f(this.key, true))
        }

        this.addItem(Q_instructions3(this.key))
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(q_g(this.key, true))
        }
        if (!this.isPartOfSurvey(surveyKeys.T9)) {
            this.addItem(q_h(this.key, true))
        }
    }
}

const Q_instructions = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Reukvermogen

Deze vragen gaan over je reukvermogen (bijvoorbeeld het ruiken van bloemen of zeep of stinkend afval) maar niet over de smaakbeleving van eten in je mond.
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

const q_a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'a';
    return SurveyItemGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je reukvermogen voorafgaand aan dit onderzoek"],
        ]),
        questionSubText: new Map([
            ["nl", "Mijn reukvermogen voorafgaand dit onderzoek: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
        ]),
        sliderLabel: new Map([
            ["nl", "Jouw selectie:"],
        ]),
        noResponseLabel: new Map([
            ["nl", "Beweeg de slider om je antwoord te geven"],
        ]),
        min: 0,
        max: 100,
    });
}

const q_b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'b';
    return SurveyItemGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je reukvermogen OP DIT MOMENT"],
        ]),
        questionSubText: new Map([
            ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
        ]),
        sliderLabel: new Map([
            ["nl", "Jouw selectie:"],
        ]),
        noResponseLabel: new Map([
            ["nl", "Beweeg de slider om je antwoord te geven"],
        ]),
        min: 0,
        max: 100,
    });
}


export const q_c = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'c';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Merk je OP DIT MOMENT een van de onderstaande veranderingen in uw reukvermogen?"],
        ]),
        questionSubText: new Map([
            ["nl", "Selecteer alles dat van toepassing is."],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik kan helemaal niet ruiken / Geuren ruiken minder sterk dan voorheen"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Geuren ruiken anders dan voorheen (de kwaliteit van de geur is veranderd)"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik kan dingen ruiken die er niet zijn (bijvoorbeeld ik ruik een brandlucht terwijl er niets in brand staat)"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Reukvermogen varieert (het komt en het gaat)"],
                ])
            },
        ]
    });
}

const Q_instructions2 = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Smaakvermogen

De volgende vragen gaan over je smaakvermogen. Bijvoorbeeld het proeven van zoet, zuur, zout en bitter.
    `

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro2',
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

const q_d = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'd';
    return SurveyItemGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je smaakvermogen voorafgaand aan dit onderzoek"],
        ]),
        questionSubText: new Map([
            ["nl", "Mijn smaakvermogen voorafgaand aan dit onderzoek: (geen smaakvermogen 0 - uitstekend smaakvermogen 100)"],
        ]),
        sliderLabel: new Map([
            ["nl", "Jouw selectie:"],
        ]),
        noResponseLabel: new Map([
            ["nl", "Beweeg de slider om je antwoord te geven"],
        ]),
        min: 0,
        max: 100,
    });
}



const q_e = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'e';
    return SurveyItemGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je smaakvermogen OP DIT MOMENT"],
        ]),
        questionSubText: new Map([
            ["nl", "Mijn smaakvermogen op dit moment: (geen smaakvermogen 0 - uitstekend smaakvermogen 100)"],
        ]),
        sliderLabel: new Map([
            ["nl", "Jouw selectie:"],
        ]),
        noResponseLabel: new Map([
            ["nl", "Beweeg de slider om je antwoord te geven"],
        ]),
        min: 0,
        max: 100,
    });
}


export const q_f = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'f';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Merk je OP DIT MOMENT verandering in specifieke smaken?"],
        ]),
        questionSubText: new Map([
            ["nl", "Selecteer alles waarin je een verandering hebt gemerkt."],
        ]),
        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Zoet"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Zout"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Zuur"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Bitter"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Hartig/umami"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Geen specifieke verandering"],
                ])
            },
        ]
    });
}

const Q_instructions3 = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Sensaties

De volgende vragen gaan over andere sensaties in je mond zoals branden, koelen of tintelen. Bijvoorbeeld van chilipepers, kauwgom, pepermunt of koolzuur.
    `

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro3',
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
const q_g = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'g';
    return SurveyItemGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je vermogen om deze andere sensaties in uw mond te voelen voorafgaand aan dit onderzoek"],
        ]),
        questionSubText: new Map([
            ["nl", "Mijn vermogen voor het voelen van sensaties voorafgaand aan dit onderzoek: (helemaal niet gevoelig 0 - heel erg gevoelig 100)"],
        ]),
        sliderLabel: new Map([
            ["nl", "Jouw selectie:"],
        ]),
        noResponseLabel: new Map([
            ["nl", "Beweeg de slider om je antwoord te geven"],
        ]),
        min: 0,
        max: 100,
    });
}

const q_h = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'h';
    return SurveyItemGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je vermogen om deze andere sensaties in uw mond te voelen OP DIT MOMENT"],
        ]),
        questionSubText: new Map([
            ["nl", "Mijn vermogen voor het voelen van sensaties op dit moment: (helemaal niet gevoelig 0 - heel erg gevoelig 100)"],
        ]),
        sliderLabel: new Map([
            ["nl", "Jouw selectie:"],
        ]),
        noResponseLabel: new Map([
            ["nl", "Beweeg de slider om je antwoord te geven"],
        ]),
        min: 0,
        max: 100,
    });
}
