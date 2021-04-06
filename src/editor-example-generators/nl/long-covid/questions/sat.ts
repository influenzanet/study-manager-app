import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class SaTGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'SaT';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_a(this.key, true))
        this.addItem(q_b(this.key, true))
        this.addItem(q_c(this.key, true))
        this.addItem(q_d(this.key, true))
        this.addItem(q_e(this.key, true))
        this.addItem(q_f(this.key, true))
        this.addItem(q_g(this.key, true))
        this.addItem(q_h(this.key, true))
    }
}

const q_a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'a';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je reukvermogen voorafgaand aan dit onderzoek"],
        ]),
        sliderLabel: new Map([
            ["nl", "Mijn reukvermogen voorafgaand dit onderzoek: (geen reukvermogen 0 - uitstekend reukvermogen 100)"],
        ]),
        min: 0,
        max: 100,
    });
}

const q_b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'b';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je reukvermogen OP DIT MOMENT"],
        ]),
        sliderLabel: new Map([
            ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)"],
        ]),
        min: 0,
        max: 100,
    });
}


export const q_c = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'c';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Merk je OP DIT MOMENT een van de onderstaande veranderingen in uw reukvermogen? (Selecteer alles dat van toepassing is)"],
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



const q_d = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'd';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je smaakvermogen voorafgaand aan dit onderzoek"],
        ]),
        sliderLabel: new Map([
            ["nl", "Mijn smaakvermogen voorafgaand aan dit onderzoek: (geen smaakvermogen 0 - uitstekend smaakvermogen 100):"],
        ]),
        min: 0,
        max: 100,
    });
}



const q_e = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'e';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je smaakvermogen OP DIT MOMENT"],
        ]),
        sliderLabel: new Map([
            ["nl", "Mijn smaakvermogen op dit moment: (geen smaakvermogen 0 - uitstekend smaakvermogen 100):"],
        ]),
        min: 0,
        max: 100,
    });
}


export const q_f = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'f';
    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Merk je OP DIT MOMENT verandering in specifieke smaken? (Selecteer alles waar in je een verandering hebt gemerkt)"],
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


const q_g = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'g';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je vermogen om deze andere sensaties in uw mond te voelen voorafgaand aan dit onderzoek"],
        ]),
        sliderLabel: new Map([
            ["nl", "Mijn vermogen voor het voelen van sensaties voorafgaand aan dit onderzoek: (helemaal niet gevoelig 0 - heel erg gevoelig 100"],
        ]),
        min: 0,
        max: 100,
    });
}

const q_h = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'h';
    return QuestionGenerators.numericSlider({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Beoordeel je vermogen om deze andere sensaties in uw mond te voelen OP DIT MOMENT"],
        ]),
        sliderLabel: new Map([
            ["nl", "Mijn vermogen voor het voelen van sensaties op dit moment: (helemaal niet gevoelig 0 - heel erg gevoelig 100)"],
        ]),
        min: 0,
        max: 100,
    });
}
