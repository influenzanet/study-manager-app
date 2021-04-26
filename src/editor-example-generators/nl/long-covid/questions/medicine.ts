import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class MedicineGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'MED';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        const healthcare_provider = Q1(this.key, true);
        const use_medicine = Q3(this.key, true);
        const condition_healthcare_provider = CommonExpressions.singleChoiceOptionsSelected(healthcare_provider.key, 'ja');
        const condition_use_medicine = CommonExpressions.singleChoiceOptionsSelected(use_medicine.key, 'ja');

        this.addItem(healthcare_provider)
        this.addItem(Q2a(this.key, true, condition_healthcare_provider));
        this.addPageBreak();
        this.addItem(use_medicine)
        this.addItem(Q4(this.key, true, condition_use_medicine))
        this.addItem(Q16(this.key, true))
        this.addPageBreak();
    }
}

const Q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Heb je in de afgelopen 3 maanden contact gehad met een zorgverlener, anders dan voor corona?"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'variant', value: 'p' }],
            content: generateLocStrings(new Map([
                ["nl", "Met zorgverleners bedoelen wij je huisarts, specialist, fysiotherapeut, psycholoog, maatschappelijk werker, homeopaat, logopedist of andere arts, therapeut of zorgconsulent."],
            ]))
        },],
        responseOptions: [
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
        ]
    });
}

const Q2a = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2a';

    const inputProperties = {
        min: 1,
        max: 50
    };
    const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Met welke zorgverleners heb je contact gehad in de afgelopen 3 maanden, en hoe vaak? "],
        ]),
        responseOptions: [
            {
                key: 'huisarts', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Huisarts"],
                ])
            },
            {
                key: '0', role: 'numberInput',
                content: new Map([
                    ["nl", "Huisarts"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: 'specialist', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Medisch specialist"],
                ])
            },
            {
                key: '1', role: 'numberInput',
                content: new Map([
                    ["nl", "Cardioloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '2', role: 'numberInput',
                content: new Map([
                    ["nl", "Dermatoloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
           
            {
                key: '4', role: 'numberInput',
                content: new Map([
                    ["nl", "Endocrinoloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '7', role: 'numberInput',
                content: new Map([
                    ["nl", "Gynaecoloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },

            {
                key: '10', role: 'numberInput',
                content: new Map([
                    ["nl", "Immunoloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '11', role: 'numberInput',
                content: new Map([
                    ["nl", "Internist"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            
            {
                key: '14', role: 'numberInput',
                content: new Map([
                    ["nl", "Neuroloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
          
            {
                key: '16', role: 'numberInput',
                content: new Map([
                    ["nl", "Oogarts"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '17', role: 'numberInput',
                content: new Map([
                    ["nl", "Oncoloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '18', role: 'numberInput',
                content: new Map([
                    ["nl", "Psychiater"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '20', role: 'numberInput',
                content: new Map([
                    ["nl", "Reumatoloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '21', role: 'numberInput',
                content: new Map([
                    ["nl", "Plastisch chirurg"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '22', role: 'numberInput',
                content: new Map([
                    ["nl", "Uroloog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '23', role: 'numberInput',
                content: new Map([
                    ["nl", "Revalidatiearts"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: 'paraspecialist', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Paramedisch specialist"],
                ])
            },
            {
                key: '3', role: 'numberInput',
                content: new Map([
                    ["nl", "Diëtist"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '5', role: 'numberInput',
                content: new Map([
                    ["nl", "Ergotherapeut"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '6', role: 'numberInput',
                content: new Map([
                    ["nl", "Fysiotherapeut"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '15', role: 'numberInput',
                content: new Map([
                    ["nl", "Oefentherapeut"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '12', role: 'numberInput',
                content: new Map([
                    ["nl", "Logopedist"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: 'overigespec', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Overig"],
                ])
            },
            {
                key: '8', role: 'numberInput',
                content: new Map([
                    ["nl", "Homeopaat"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '13', role: 'numberInput',
                content: new Map([
                    ["nl", "Maatschappelijk werker"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '19', role: 'numberInput',
                content: new Map([
                    ["nl", "Psycholoog"],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
            {
                key: '24', role: 'input',
                content: new Map([
                    ["nl", "Andere zorgverlener"],
                ]),
            },
        ]
    });
}





const Q3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Gebruik je op dit moment medicijnen?"],
        ]),
        responseOptions: [
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
        ]
    });
}

const Q4 = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';
    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Welke medicijnen zijn dit?"],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),

        responseOptions: [
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Medicijnen vanwege een infectie/ontsteking (bijvoorbeeld antibiotica, antivirale middelen)"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Afweerremmende medicatie/immunosuppressiva (bijvoorbeeld prednison)"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Maagbeschermers/ maagzuurremmers (bijvoorbeeld omeprazol)"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Cholesterolverlagers (bijvoorbeeld atorvastatine, simvastatine)"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Chemokuur/chemotherapie"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "Medicijnen voor diabetes (bijvoorbeeld insuline of metformine)"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Hormoonbehandeling"],
                ])
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "Bloeddrukverlagers (angiotensine convertering enzyme (ACE)-remmers en angiotensine receptorblokkers (ARB’s))"],
                ])
            },
            {
                key: '9', role: 'option',
                content: new Map([
                    ["nl", "Bloedverdunners (bijvoorbeeld clopidogrel)"],
                ])
            },
            {
                key: '10', role: 'input',
                content: new Map([
                    ["nl", "Andere medicijnen, namelijk:"],
                ])
            },
        ]
    });
}

const Q16 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q16';

    const inputProperties = {
        min: 1,
        max: 92
    };
    const inputStyle = [{ key: 'inputMaxWidth', value: '80px' }];

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Ben je in de afgelopen 3 maanden afwezig geweest van je werk omdat je ziek was, anders dan corona?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ]),
            },
            {
                key: 'ja', role: 'numberInput',
                content: new Map([
                    ["nl", "Ja, ik ben ongeveer het volgende aantal dagen afwezig geweest: "],
                ]),
                optionProps: inputProperties,
                style: inputStyle,
            },
        ]
    });
}
