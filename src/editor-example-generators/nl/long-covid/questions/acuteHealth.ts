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

        const q4 = l3q4(this.key, true);
        this.addItem(q4);

        this.addItem(l3q5(this.key, q4.key, true));

        this.addItem(l3q6(this.key, q4.key, true));

        this.addItem(l3q7(this.key, true));

        const q8 = l3q8(this.key, true);
        this.addItem(q8)

        this.addItem(l3q9(this.key, q8.key, true));
    }
}



const q_acuteSymptoms_1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_1';

    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        topDisplayCompoments: [
            {
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "Meerdere antwoorden mogelijk"],
                ]))
            }
        ],
        responseOptions: [
            {
                key: 'koorts', role: 'option',
                content: new Map([
                    ["nl", "Koorts"],
                ])
            },
            {
                key: 'koude_rillingen', role: 'option',
                content: new Map([
                    ["nl", "Koude rillingen"],
                ])
            },
            {
                key: 'loopneus_of_verstopte_neus', role: 'option',
                content: new Map([
                    ["nl", "Loopneus of verstopte neus"],
                ])
            },
            {
                key: 'niezen', role: 'option',
                content: new Map([
                    ["nl", "Niezen"],
                ])
            },
            {
                key: 'keelpijn', role: 'option',
                content: new Map([
                    ["nl", "Keelpijn"],
                ])
            },
            {
                key: 'hoesten', role: 'option',
                content: new Map([
                    ["nl", "Hoesten"],
                ])
            },
            {
                key: 'kortademig', role: 'option',
                content: new Map([
                    ["nl", "Kortademig (snel buiten adem) of benauwd"],
                ])
            },
            {
                key: 'spierpijn', role: 'option',
                content: new Map([
                    ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                ])
            },
            {
                key: 'beklemming_pijn_op_borst', role: 'option',
                content: new Map([
                    ["nl", "Beklemming of pijn op de borst"],
                ])
            },
            {
                key: 'vermoeidheid', role: 'option',
                content: new Map([
                    ["nl", "Vermoeidheid"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}


const q_acuteSymptoms_2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_2';

    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        topDisplayCompoments: [
            {
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "Meerdere antwoorden mogelijk"],
                ]))
            }
        ],
        responseOptions: [
            {
                key: 'malaise', role: 'option',
                content: new Map([
                    ["nl", "Algehele malaise"],
                ])
            },
            {
                key: 'eetlust', role: 'option',
                content: new Map([
                    ["nl", "Verminderde eetlust"],
                ])
            },
            {
                key: 'spierpijn', role: 'option',
                content: new Map([
                    ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                ])
            },
            {
                key: 'verkleurd_slijm', role: 'option',
                content: new Map([
                    ["nl", "Verkleurd slijm"],
                ])
            },
            {
                key: 'ogen', role: 'option',
                content: new Map([
                    ["nl", "Waterige of bloeddoorlopen ogen"],
                ])
            },
            {
                key: 'duizeligheid', role: 'option',
                content: new Map([
                    ["nl", "Duizeligheid"],
                ])
            },
            {
                key: 'misselijkheid', role: 'option',
                content: new Map([
                    ["nl", "Misselijkheid"],
                ])
            },
            {
                key: 'overgeven', role: 'option',
                content: new Map([
                    ["nl", "Overgeven"],
                ])
            },
            {
                key: 'diarree', role: 'option',
                content: new Map([
                    ["nl", "Diarree (minstens 3 keer per dag)"],
                ])
            },
            {
                key: 'buikpijn', role: 'option',
                content: new Map([
                    ["nl", "Buikpijn"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_3';

    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        topDisplayCompoments: [
            {
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "Meerdere antwoorden mogelijk"],
                ]))
            }
        ],
        responseOptions: [
            {
                key: 'geen_reuk', role: 'option',
                content: new Map([
                    ["nl", "Geen reuk (of sterk verminderd)"],
                ])
            },
            {
                key: 'geen_smaak', role: 'option',
                content: new Map([
                    ["nl", "Geen smaak (of sterk verminderd)"],
                ])
            },
            {
                key: 'bloedneus', role: 'option',
                content: new Map([
                    ["nl", "Bloedneus"],
                ])
            },
            {
                key: 'huiduitslag', role: 'option',
                content: new Map([
                    ["nl", "Huiduitslag"],
                ])
            },
            {
                key: 'hartkloppingen', role: 'option',
                content: new Map([
                    ["nl", "Hartkloppingen"],
                ])
            },
            {
                key: 'concentratieproblemen', role: 'option',
                content: new Map([
                    ["nl", "Concentratieproblemen"],
                ])
            },
            {
                key: 'slaapproblemen', role: 'option',
                content: new Map([
                    ["nl", "Slaapproblemen"],
                ])
            },
            {
                key: 'tintelingen', role: 'option',
                content: new Map([
                    ["nl", "Tintelingen of gevoelloosheid"],
                ])
            },
            {
                key: 'verwardheid', role: 'option',
                content: new Map([
                    ["nl", "Verwardheid"],
                ])
            },
            {
                key: 'oorpijn', role: 'option',
                content: new Map([
                    ["nl", "Oorpijn"],
                ])
            },
            {
                key: 'oorsuizen', role: 'option',
                content: new Map([
                    ["nl", "Oorsuizen"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const l3q4 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q4';

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


const l3q5 = (parentKey: string, keyQ4: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q5';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: CommonExpressions.multipleChoiceOptionsSelected(keyQ4, '3'),
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


const l3q6 = (parentKey: string, keyQ4: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q6';

    return QuestionGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: CommonExpressions.multipleChoiceOptionOnlyOtherKeysSelected(keyQ4, '0'),
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


const l3q7 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q7';

    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Heb je vanwege je klachten medicijnen gebruikt de afgelopen 14 dagen? En zo ja, welke?"],
        ]),
        topDisplayCompoments: [
            {
                role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: generateLocStrings(new Map([
                    ["nl", "Meerdere antwoorden mogelijk"],
                ]))
            }
        ],
        responseOptions: [
            {
                key: '0', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Nee, ik heb geen medicijnen gebruikt"],
                ])
            },
            {
                key: '1', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, pijnstillers zoals paracetamol, aspirine of ibuprofen"],
                ])
            },
            {
                key: '2', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, medicijnen om het hoesten te onderdrukken"],
                ])
            },
            {
                key: '3', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, antivirale middelen zoals Tamiflu of Relenza"],
                ])
            },
            {
                key: '4', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, antibiotica"],
                ])
            },
            {
                key: '5', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, medicijnen voor hooikoorts"],
                ])
            },
            {
                key: '6', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, homeopathisch middelen"],
                ])
            },
            {
                key: '7', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, alternatieve medicatie (essentiële olie, fytotherapie enz.)"],
                ])
            },
            {
                key: '8', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Ja, andere medicatie"],
                ])
            },
            {
                key: '9', role: 'option',
                disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                content: new Map([
                    ["nl", "Dit wil ik niet aangeven"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const l3q8 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q8';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Heb je je in deze klachtenperiode ziek gemeld van werk/school?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'nee_effect', role: 'option',
                content: new Map([
                    ["nl", "Nee, maar het had wel effect op mijn dagelijkse bezigheden"],
                ])
            },
            {
                key: 'ja_magniet', role: 'option',
                content: new Map([
                    ["nl", "Ja, want met deze klachten/coronauitslag mag ik niet werken en naar school"],
                ])
            },
            {
                key: 'ja_klachten', role: 'option',
                content: new Map([
                    ["nl", "Ja, vanwege de klachten"],
                ])
            },
            {
                key: 'nvt', role: 'option',
                content: new Map([
                    ["nl", "Niet van toepassing, ik heb geen werk/school"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const l3q9 = (parentKey: string, keyQ8: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'q9';
    return QuestionGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: CommonExpressions.singleChoiceOptionsSelected(keyQ8, 'ja_klachten'),
        questionText: new Map([
            ["nl", "Hoeveel dagen ben je ziek gemeld van werk/school? "],
        ]),
        responseOptions: [
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
                key: '6-10', role: 'option',
                content: new Map([
                    ["nl", "6-10 dagen"],
                ]),
            }, {
                key: '11-15', role: 'option',
                content: new Map([
                    ["nl", "11-15 dagen"],
                ]),
            }, {
                key: 'meerdan_15', role: 'option',
                content: new Map([
                    ["nl", "Meer dan 15 dagen"],
                ]),
            },
        ],
        isRequired: isRequired,
    })
}
