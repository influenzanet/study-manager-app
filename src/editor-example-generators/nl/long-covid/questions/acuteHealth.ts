import { SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class AcuteHealthGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'AH';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_acuteSymptoms_1(this.key, true));
        this.addItem(q_acuteSymptoms_2(this.key, true));
        this.addItem(q_acuteSymptoms_3(this.key, true));
        this.addItem(q_acuteSymptoms_4(this.key, true));
        this.addItem(q_acuteSymptoms_5(this.key, true));
        this.addItem(q_acuteSymptoms_6(this.key, true));

        const q3 = l3q3(this.key, true);
        this.addItem(q3);

        this.addItem(l3q4(this.key, q3.key, true));

        this.addItem(l3q5(this.key, q3.key, true));
    }
}



const q_acuteSymptoms_1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_1';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'koor',
                content: new Map([
                    ["nl", "Koorts"],
                ]),
            },
            {
                key: 'koud',
                content: new Map([
                    ["nl", "Koude rillingen"],
                ])
            },
            {
                key: 'loop',
                content: new Map([
                    ["nl", "Loopneus of verstopte neus"],
                ])
            },
            {
                key: 'niez',
                content: new Map([
                    ["nl", "Niezen"],
                ])
            },
            {
                key: 'keel',
                content: new Map([
                    ["nl", "Keelpijn"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}


const q_acuteSymptoms_2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_2';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'hoes',
                content: new Map([
                    ["nl", "Hoesten"],
                ])
            },
            {
                key: 'kort',
                content: new Map([
                    ["nl", "Kortademig (snel buiten adem) of benauwd"],
                ]),
            },
            {
                key: 'spie',
                content: new Map([
                    ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                ])
            },
            {
                key: 'bekl',
                content: new Map([
                    ["nl", "Beklemming of pijn op de borst"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_3';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'verm',
                content: new Map([
                    ["nl", "Vermoeidheid"],
                ])
            },
            {
                key: 'alge',
                content: new Map([
                    ["nl", "Algehele malaise"],
                ])
            },
            {
                key: 'eetl',
                content: new Map([
                    ["nl", "Verminderde eetlust"],
                ])
            },
            {
                key: 'slij',
                content: new Map([
                    ["nl", "Verkleurd slijm"],
                ])
            },
            {
                key: 'ogen',
                content: new Map([
                    ["nl", "Waterige of bloeddoorlopen ogen"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_4 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_4';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'duiz',
                content: new Map([
                    ["nl", "Duizeligheid"],
                ])
            },
            {
                key: 'miss',
                content: new Map([
                    ["nl", "Misselijkheid"],
                ])
            },
            {
                key: 'over',
                content: new Map([
                    ["nl", "Overgeven"],
                ])
            },
            {
                key: 'diar',
                content: new Map([
                    ["nl", "Diarree (minstens 3 keer per dag)"],
                ])
            },
            {
                key: 'buik',
                content: new Map([
                    ["nl", "Buikpijn"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_5 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_5';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'reuk',
                content: new Map([
                    ["nl", "Geen reuk of reuk sterk verminderd"],
                ])
            },
            {
                key: 'smaa',
                content: new Map([
                    ["nl", "Geen smaak of smaak sterk verminderd"],
                ])
            },
            {
                key: 'bloe',
                content: new Map([
                    ["nl", "Bloedneus"],
                ])
            },
            {
                key: 'huid',
                content: new Map([
                    ["nl", "Huiduitslag"],
                ])
            },
            {
                key: 'hart',
                content: new Map([
                    ["nl", "Hartkloppingen"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_6 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_6';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'conc',
                content: new Map([
                    ["nl", "Concentratieproblemen"],
                ])
            },
            {
                key: 'slaa',
                content: new Map([
                    ["nl", "Slaapproblemen"],
                ])
            },
            {
                key: 'tint',
                content: new Map([
                    ["nl", "Tintelingen of gevoelloosheid"],
                ])
            },
            {
                key: 'verw',
                content: new Map([
                    ["nl", "Verwardheid"],
                ])
            },
            {
                key: 'oorp',
                content: new Map([
                    ["nl", "Oorpijn"],
                ])
            },
            {
                key: 'oors',
                content: new Map([
                    ["nl", "Oorsuizen"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const l3q3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q3';

    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Heb je een arts gezien, gesproken of gebeld vanwege je klachten? En zo ja, waar?"],
        ]),
        topDisplayCompoments: [
            {
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "Meerdere antwoorden mogelijk"],
                ]))
            }
        ], responseOptions: [
            {
                key: '0', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Nee, ik heb geen medische hulp gezocht"],
                ])
            },
            {
                key: '1', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                content: new Map([
                    ["nl", "Ja, bij de huisarts of huisarts assistent"],
                ])
            },
            {
                key: '2', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                content: new Map([
                    ["nl", "Ja, bij de eerste hulp van het ziekenhuis of de huisartsenpost"],
                ])
            },
            {
                key: '3', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                content: new Map([
                    ["nl", "Ja, ik ben opgenomen in het ziekenhuis"],
                ])
            },
            {
                key: '4', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0', '5'),
                content: new Map([
                    ["nl", "Ja, ik heb andere medische hulp gezocht"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Nog niet, maar ik heb een afspraak gemaakt"],
                ])
            }
        ],
        isRequired: isRequired,
    })
}

const l3q4 = (parentKey: string, keyQ3: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q4';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: CommonExpressions.multipleChoiceOptionsSelected(keyQ3, '3'),
        questionText: new Map([
            ["nl", "Vink aan wat van toepassing is bij je ziekenhuisopname"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Ik ben op de Intensive Care (IC) opgenomen "],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik heb zuurstof toegediend gekregen"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Geen van beide"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}


const l3q5 = (parentKey: string, keyQ3: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q5';

    return QuestionGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: CommonExpressions.multipleChoiceOptionOnlyOtherKeysSelected(keyQ3, '0'),
        questionText: new Map([
            ["nl", "Hoe snel na de start van je klachten heb je voor de EERSTE keer medische hulp gezocht?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Op dezelfde dag als de eerste klachten"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "1 dag"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "2 dagen"],
                ]),
            }, {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "3 dagen"],
                ]),
            }, {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "4 dagen"],
                ]),
            }, {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "5 dagen"],
                ]),
            }, {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "6 dagen"],
                ]),
            }, {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "7 dagen"],
                ]),
            }, {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "8 dagen"],
                ]),
            }, {
                key: '9', role: 'option',
                content: new Map([
                    ["nl", "9 dagen"],
                ]),
            }, {
                key: '10', role: 'option',
                content: new Map([
                    ["nl", "10 dagen"],
                ]),
            }, {
                key: '11', role: 'option',
                content: new Map([
                    ["nl", "11 dagen"],
                ]),
            }, {
                key: '12', role: 'option',
                content: new Map([
                    ["nl", "12 dagen"],
                ]),
            }, {
                key: '13', role: 'option',
                content: new Map([
                    ["nl", "13 dagen"],
                ]),
            }, {
                key: '14', role: 'option',
                content: new Map([
                    ["nl", "14 dagen"],
                ]),
            },
            {
                key: '15', role: 'option',
                content: new Map([
                    ["nl", "> 14 dagen"],
                ])
            },
            {
                key: '16', role: 'option',
                content: new Map([
                    ["nl", "Dat weet ik niet (meer)"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}
