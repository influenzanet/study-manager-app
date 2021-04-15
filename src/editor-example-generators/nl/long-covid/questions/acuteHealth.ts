import { SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../studyRules";

export class AcuteHealthGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'AH';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        const Q_symptoms = q_acuteSymptoms(this.key, true);
        this.addItem(Q_symptoms);

        const hasReportedSymptoms = CommonExpressions.multipleChoiceOnlyOtherKeysSelected(
            Q_symptoms.key, 'geen'
        );

        const hasSymptomsGroup = new GroupItemEditor(this.key, 'WS');
        hasSymptomsGroup.groupEditor.setCondition(hasReportedSymptoms);

        if (this.isPartOfSurvey(surveyKeys.short)) {
            hasSymptomsGroup.addItem(Q1a(hasSymptomsGroup.key, true));
        }

        hasSymptomsGroup.addItem(Q1b(hasSymptomsGroup.key, true));

        if (
            this.isPartOfSurvey(surveyKeys.T0) ||
            this.isPartOfSurvey(surveyKeys.T3) ||
            this.isPartOfSurvey(surveyKeys.T6)
        ) {
            hasSymptomsGroup.addItem(Q2(hasSymptomsGroup.key, true));
            hasSymptomsGroup.addItem(IPQ(hasSymptomsGroup.key, true));
        }

        if (
            this.isPartOfSurvey(surveyKeys.T0) ||
            this.isPartOfSurvey(surveyKeys.short)
        ) {
            const q4 = Q4(hasSymptomsGroup.key, true);
            hasSymptomsGroup.addItem(q4);

            hasSymptomsGroup.addItem(Q5(hasSymptomsGroup.key, q4.key, true));

            hasSymptomsGroup.addItem(Q6(hasSymptomsGroup.key, q4.key, true));

            hasSymptomsGroup.addItem(Q7(hasSymptomsGroup.key, true));

            const q8 = Q8(hasSymptomsGroup.key, true);
            hasSymptomsGroup.addItem(q8)

            hasSymptomsGroup.addItem(Q9(hasSymptomsGroup.key, q8.key, true));
        }

        this.addItem(hasSymptomsGroup.getItem());
    }
}


const q_acuteSymptoms = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';

    return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier last van hebt gehad in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Meerdere antwoorden mogelijk."],
        ]),
        responseOptions: [
            {
                key: 'long', role: 'text',
                style: [{ key: 'className', value: 'mb-2' }],
                content: new Map([
                    ["nl", "Selecteer je klachten"],
                ])
            },
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
            {
                key: 'long', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Selecteer je klachten"],
                ])
            },
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
            {
                key: 'long', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Selecteer je klachten"],
                ])
            },
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
            {
                key: 'geen', role: 'option',
                content: new Map([
                    ["nl", "Geen van deze klachten"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}




const Q1a = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1a';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Horen de klachten die je nu meldt bij dezelfde klachtenperiode als die in de vorige vragenlijst?"],
        ]),
        responseOptions: [
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja, dit is een aaneengesloten klachtenperiode"],
                ])
            },
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee, dit zijn nieuwe of andere klachten dan die ik hiervoor had"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Ik weet het niet"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const Q1b = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1b';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Denk je dat deze klachten geheel of deels door het coronavirus komen?"],
        ]),
        responseOptions: [
            {
                key: 'nee', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
            {
                key: 'misschien', role: 'option',
                content: new Map([
                    ["nl", "Misschien"],
                ])
            },
            {
                key: 'ja', role: 'option',
                content: new Map([
                    ["nl", "Ja, waarschijnlijk wel"],
                ])
            },
            {
                key: 'andere', role: 'input',
                content: new Map([
                    ["nl", "Nee, andere oorzaak namelijk:"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}


const Q2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Op welke datum begonnen de eerste klachten (je mag de datum ook schatten)?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { delta: { days: -40 } },
        maxRelativeDate: { delta: { seconds: 1 } },
    });
}

const IPQ = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'IPQ';
    return SurveyItemGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Je hebt eerder aangegeven dat je afgelopen week klachten had."],
        ]),
        questionSubText: new Map([
            ["nl", "Onderstaande vragen gaan over alle klachten die je eerder hebt aangegeven, of ze nu wel of niet door het coronavirus komen. Omcirkel alsjeblieft bij elke vraag het getal dat je mening het beste weergeeft."],
        ]),
        topDisplayCompoments: [
            ComponentGenerators.text({
                content: new Map([
                    ['nl', '0 helemaal geen invloed – 10 zeer veel invloed']
                ]),
                className: 'mb-2'
            })
        ],
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ["nl", "1"],
                ])
            }, {
                key: '2', content: new Map([
                    ["nl", "2"],
                ])
            }, {
                key: '3', content: new Map([
                    ["nl", "3"],
                ])
            }, {
                key: '4', content: new Map([
                    ["nl", "4"],
                ]),
            }, {
                key: '5', content: new Map([
                    ["nl", "5"],
                ])
            }, {
                key: '6', content: new Map([
                    ["nl", "6"],
                ])
            }, {
                key: '7', content: new Map([
                    ["nl", "7"],
                ])
            }, {
                key: '8', content: new Map([
                    ["nl", "8"],
                ])
            }, {
                key: '9', content: new Map([
                    ["nl", "9"],
                ])
            }, {
                key: '10', content: new Map([
                    ["nl", "10"],
                ])
            }
        ],
        rows: [
            {
                key: 'a', content: new Map([
                    ["nl", "Hoeveel beïnvloeden uw klachten je leven?"],
                ])
            },
            {
                key: 'b', content: new Map([
                    ["nl", "Hoe lang denk je dat je klachten zullen duren?"],
                ])
            },
            {
                key: 'c', content: new Map([
                    ["nl", "Hoeveel controle vind je dat je hebt over je klachten?"],
                ])
            },
            {
                key: 'd', content: new Map([
                    ["nl", "Hoeveel denk je dat je behandeling kan helpen bij je klachten?"],
                ])
            },
            {
                key: 'e', content: new Map([
                    ["nl", "Hoe sterk ervaar je klachten?"],
                ])
            },
            {
                key: 'f', content: new Map([
                    ["nl", "Hoe bezorgd ben je over je klachten?"],
                ])
            },
            {
                key: 'g', content: new Map([
                    ["nl", "In welke mate vind je dat je je klachten begrijpt?"],
                ])
            },
            {
                key: 'h', content: new Map([
                    ["nl", "h.	Hoeveel invloed hebben de klachten op je stemming? (Bijvoorbeeld: maakt de ziekte je boos, bang, van streek of somber?)"],
                ])
            },
        ]
    });
}


const Q4 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';

    return SurveyItemGenerators.multipleChoice({
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
                disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '0'),
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


const Q5 = (parentKey: string, keyQ4: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5';

    return SurveyItemGenerators.singleChoice({
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


const Q6 = (parentKey: string, keyQ4: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';

    return SurveyItemGenerators.dropDown({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: CommonExpressions.multipleChoiceOnlyOtherKeysSelected(keyQ4, '0'),
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


const Q7 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q7';

    return SurveyItemGenerators.multipleChoice({
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
                disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '0'),
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
                    ["nl", "Ja, homeopathische middelen"],
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

const Q8 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q8';

    return SurveyItemGenerators.singleChoice({
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

const Q9 = (parentKey: string, keyQ8: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q9';
    return SurveyItemGenerators.dropDown({
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
