import { SurveyItem } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class GeneralHealthGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'TICP';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_L4q1(this.key, true));
    }
}

const q_L4q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Welke lichamelijke en psychische problemen heb je?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["nl", "Kruis aan welke problemen je nu hebt of in de afgelopen 12 maanden hebt gehad."],
            ]))
        }],
        responseOptions: [

            {
                key: 'long', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Longen en hoofdholten"],
                ])
            },
            {
                key: 'long1', role: 'option',
                content: new Map([
                    ["nl", "Astma, chronische bronchitis of kaakholten"],
                ])
            },
            {
                key: 'long2', role: 'option',
                content: new Map([
                    ["nl", "Ontsteking van de neusbijholte, voorhoofdsholte of kaakholten"],
                ])
            },
            {
                key: 'hart', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Hart en bloedvaten"],
                ])
            },
            {
                key: 'hart1', role: 'option',
                content: new Map([
                    ["nl", "Ernstige hartkwaal of hartinfarct"],
                ])
            },
            {
                key: 'hart2', role: 'option',
                content: new Map([
                    ["nl", "Hoge bloeddruk"],
                ])
            },
            {
                key: 'hart3', role: 'option',
                content: new Map([
                    ["nl", "Beroerte of gevolgen van beroerte"],
                ])
            },
            {
                key: 'maagdarm', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Maag en darmen"],
                ])
            },
            {
                key: 'maagdarm1', role: 'option',
                content: new Map([
                    ["nl", "Maagzweer of zweer aan de 12-vingerige darm"],
                ])
            },
            {
                key: 'maagdarm2', role: 'option',
                content: new Map([
                    ["nl", "Ernstige darmstoornissen, langer dan 3 maanden"],
                ])
            },
            {
                key: 'gallever', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Galblaas, lever en nieren"],
                ])
            },
            {
                key: 'gallever1', role: 'option',
                content: new Map([
                    ["nl", "Galstenen of galblaasontsteking"],
                ])
            },
            {
                key: 'gallever2', role: 'option',
                content: new Map([
                    ["nl", "Leverziekte of levercirrose"],
                ])
            },
            {
                key: 'gallever3', role: 'option',
                content: new Map([
                    ["nl", "Nierstenen"],
                ])
            },
            {
                key: 'gallever4', role: 'option',
                content: new Map([
                    ["nl", "Ernstige nierziekte"],
                ])
            },
            {
                key: 'blaas', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Blaas en baarmoeder"],
                ])
            },
            {
                key: 'blaas1', role: 'option',
                content: new Map([
                    ["nl", "Chronische blaasontsteking"],
                ])
            },
            {
                key: 'blaas2', role: 'option',
                content: new Map([
                    ["nl", "Verzakking"],
                ])
            },
            ComponentGenerators.multipleChoiceOptionSubtitle({
                key: 'andereziektes',
                className: 'fw-bold mb-2',
                content: new Map([
                    ["nl", "Andere ziektes"],
                ])
            }),
            {
                key: 'andereziektes1', role: 'option',
                content: new Map([
                    ["nl", "Suikerziekte"],
                ])
            },
            {
                key: 'andereziektes2', role: 'option',
                content: new Map([
                    ["nl", "Schildklierafwijking"],
                ])
            },
            {
                key: 'ruggewrichten', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Rug en gewrichten"],
                ])
            },
            {
                key: 'ruggewrichten1', role: 'option',
                content: new Map([
                    ["nl", "Rugaandoening van hardnekkige aard, langer dan 3 maanden, of hernia"],
                ])
            },
            {
                key: 'ruggewrichten2', role: 'option',
                content: new Map([
                    ["nl", "Gewrichtsslijtage (artrose) van knieën, heupen of handen"],
                ])
            },
            {
                key: 'ruggewrichten3', role: 'option',
                content: new Map([
                    ["nl", "Gewrichtsontsteking (reuma) van handen en/of voeten"],
                ])
            },
            {
                key: 'ruggewrichten4', role: 'option',
                content: new Map([
                    ["nl", "Andere chronische reuma, langer dan 3 maanden"],
                ])
            },
            {
                key: 'zenuw', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Zenuwstelsel"],
                ])
            },
            {
                key: 'zenuw1', role: 'option',
                content: new Map([
                    ["nl", "Epilepsie"],
                ])
            },
            {
                key: 'zenuw2', role: 'option',
                content: new Map([
                    ["nl", "Andere ziekten van het zenuwstelsel, zoals ziekte van Parkinson"],
                ])
            },

            {
                key: 'zenuw3', role: 'option',
                content: new Map([
                    ["nl", "Multiple sclerose"],
                ])
            },

            {
                key: 'zenuw4', role: 'option',
                content: new Map([
                    ["nl", "Duizeligheid met vallen"],
                ])
            },

            {
                key: 'zenuw5', role: 'option',
                content: new Map([
                    ["nl", "Migraine"],
                ])
            },
            // ---------------------------
            ComponentGenerators.multipleChoiceOptionSubtitle({
                key: 'andereproblemen',
                className: 'fw-bold mb-2',
                content: new Map([
                    ["nl", "Andere lichamelijke of psychische problemen"],
                ])
            }),
            {
                key: 'andereproblemen1', role: 'option',
                content: new Map([
                    ["nl", "Kwaadaardige aandoening of kanker"],
                ])
            },
            {
                key: 'andereproblemen2', role: 'option',
                content: new Map([
                    ["nl", "Overspannen, depressie, ernstige nervositeit"],
                ])
            },

            {
                key: 'andereproblemen3', role: 'option',
                content: new Map([
                    ["nl", "Chronische huidziekte of eczeem"],
                ])
            },

            {
                key: 'andereproblemen4', role: 'option',
                content: new Map([
                    ["nl", "Letsel door ongeluk in en om huis sport, school, werk of in het verkeer"],
                ])
            },

            {
                key: 'andereproblemen5', role: 'option',
                content: new Map([
                    ["nl", "Afweerstoornis"],
                ])
            },
            {
                key: 'andereproblemen6', role: 'option',
                content: new Map([
                    ["nl", "Ondergaan van transplantatie"],
                ])
            },
            {
                key: 'andereproblemen7', role: 'option',
                content: new Map([
                    ["nl", "Alcoholverslaving"],
                ])
            },

            {
                key: 'andereproblemen8', role: 'option',
                content: new Map([
                    ["nl", "Drugsverslaving"],
                ])
            },

            {
                key: 'andereproblemen9', role: 'option',
                content: new Map([
                    ["nl", "Ernstige vermoeidheid, langer dan 3 maanden"],
                ])
            },

            {
                key: 'andereproblemen10', role: 'option',
                content: new Map([
                    ["nl", "Ernstige pijnklachten, langer dan 3 maanden"],
                ])
            },
            {
                key: 'andereproblemen11', role: 'option',
                content: new Map([
                    ["nl", "Ernstige concentratiestoornissen, langer dan 3 maanden"],
                ])
            },
            {
                key: 'geenvandezeText', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Vink aan als geen van bovenstaande van toepassing is"],
                ])
            },
            {
                key: 'geenvandeze', role: 'option',
                content: new Map([
                    ["nl", "Geen van bovenstaande"],
                ])
            },

        ],
        isRequired: isRequired,
    })
}
