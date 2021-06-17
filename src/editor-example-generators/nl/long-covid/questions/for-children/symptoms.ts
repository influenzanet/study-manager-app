import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../../studyRules";

export class SymptomsGroup extends GroupItemEditor {
    hasDifficultyBreathingExp: Expression;

    constructor(parentKey: string, conditions: {
        groupCondition?: Expression,
        olderThan10: Expression,
        q11Ja: Expression,
    }) {
        const groupKey = 'SYM';
        super(parentKey, groupKey);

        if (conditions.groupCondition !== undefined) {
            this.groupEditor.setCondition(conditions.groupCondition);
        }

        const isRequired = true;

        const Q1 = this.Q1("Q1", undefined, isRequired);
        const hasReportedSymptomsQ1 = CommonExpressions.multipleChoiceOnlyOtherKeysSelected(
            Q1.key, 'geen'
        );
        this.hasDifficultyBreathingExp = CommonExpressions.multipleChoiceOnlyOtherKeysSelected(
            Q1.key, 'kortademig'
        );
        /*
            Commented, in case we discover that need this later - for now, Short is only asked of people had symptoms
        const hadReportedSymptomsInT0ButNotAnymore = CommonExpressions.and(
            CommonExpressions.hasParticipantFlag('acute_symptoms_T0', 'yes'),
            CommonExpressions.multipleChoiceOptionsSelected(Q1.key, 'geen'),
        )*/

        const ipqCondtion = CommonExpressions.and(
            hasReportedSymptomsQ1,
            conditions.olderThan10
        )

        const Q6 = this.Q6('Q6', hasReportedSymptomsQ1, isRequired);
        const conditionQ6ziekenhuis = CommonExpressions.multipleChoiceOptionsSelected(Q6.key, 'ziekenhuis');
        const conditionQ6nee = CommonExpressions.multipleChoiceOnlyOtherKeysSelected(Q6.key, 'nee');
        const Q7 = this.Q7('Q7', conditionQ6ziekenhuis, isRequired)
        const conditionQ7KIC = CommonExpressions.multipleChoiceOptionsSelected(Q7.key, 'picu')

        const hasReportedSymptomsQ1AndPossibleCovid = CommonExpressions.and(
            hasReportedSymptomsQ1,
            conditions.q11Ja
        )

        const Q12 = this.Q12('Q12', hasReportedSymptomsQ1, isRequired)
        const conditionQ12ja = CommonExpressions.singleChoiceOptionsSelected(Q12.key, 'ja-klachten' || Q12.key, '3')

        this.addItem(this.groupIntro());
        this.addItem(this.Q1_notyes("Q1_notyes", conditions.q11Ja, isRequired));
        this.addItem(Q1);
        if (this.isPartOfSurvey(surveyKeys.shortC)) {
            this.addItem(this.Qklachtenperiode('Qklachtenperiode', hasReportedSymptomsQ1, isRequired));
        }
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(this.Q2('Q2', hasReportedSymptomsQ1, isRequired));
        }
        this.addItem(this.Q3('Q3', hasReportedSymptomsQ1, isRequired));
        if (this.isPartOfSurvey(surveyKeys.shortC)) {
            this.addItem(this.Q2b('Q2b', CommonExpressions.multipleChoiceOptionsSelected(Q1.key, 'geen'), isRequired));
        }
        this.addItem(this.Q4('Q4', ipqCondtion, isRequired));
        this.addItem(this.Q5('Q5', hasReportedSymptomsQ1, isRequired));
        this.addItem(Q6);
        this.addItem(Q7);
        this.addItem(this.Q8('Q8', conditionQ7KIC, isRequired));
        this.addItem(this.Q9('Q9', conditionQ6ziekenhuis, isRequired));
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(this.Q10('Q10', conditionQ6nee, isRequired));
        }
        this.addItem(this.Q11('Q11', hasReportedSymptomsQ1AndPossibleCovid, isRequired));
        this.addItem(this.Q11_yes('Q11_yes', hasReportedSymptomsQ1, isRequired));
        this.addItem(Q12);
        this.addItem(this.Q13('Q13', conditionQ12ja, isRequired));

        this.addPageBreak();
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
**De vragen hieronder zijn gericht aan een minderjarige.**

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
                        `]
                    ])
                })]
        })
    }

    Q1(key: string, condition: Expression | undefined, isRequired?: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Kruis bij elke klacht hieronder aan, of je hier last van hebt gehad in de afgelopen week."],
            ]),
            questionSubText: new Map([
                ["nl", "Meerdere antwoorden mogelijk."],
            ]),
            responseOptions: [
                {
                    key: 'long1', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
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
                        ["nl", "Moeite met ademen of benauwd"],
                    ])
                },
                {
                    key: 'hoofdpijn', role: 'option',
                    content: new Map([
                        ["nl", "Hoofdpijn"],
                    ])
                },
                {
                    key: 'spierpijn', role: 'option',
                    content: new Map([
                        ["nl", "Spierpijn of pijn aan mijn gewrichten (niet door sporten)"],
                    ])
                },
                {
                    key: 'beklemming_pijn_op_borst', role: 'option',
                    content: new Map([
                        ["nl", "Pijn op de borst"],
                    ])
                },
                {
                    key: 'vermoeidheid', role: 'option',
                    content: new Map([
                        ["nl", "Vermoeidheid"],
                    ])
                },
                {
                    key: 'malaise', role: 'option',
                    content: new Map([
                        ["nl", "Niet lekker voelen (algehele malaise)"],
                    ])
                },
                {
                    key: 'eetlust', role: 'option',
                    content: new Map([
                        ["nl", "Minder trek hebben (verminderde eetlust)"],
                    ])
                },
                {
                    key: 'slijm', role: 'option',
                    content: new Map([
                        ["nl", "Slijm uit keel of neus"],
                    ])
                },
                {
                    key: 'ogen', role: 'option',
                    content: new Map([
                        ["nl", "Ontstoken ogen"],
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
                    key: 'andere-ontlasting', role: 'option',
                    content: new Map([
                        ["nl", "Andere ontlasting (zoals diarree, slijm of veranderd patroon)"],
                    ])
                },
                {
                    key: 'buikpijn', role: 'option',
                    content: new Map([
                        ["nl", "Buikpijn"],
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
                    key: 'wintertenen', role: 'option',
                    content: new Map([
                        ["nl", "Wintertenen"],
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
                    key: 'drukke_omgeving', role: 'option',
                    content: new Map([
                        ["nl", "Moeite met drukke omgeving"],
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
                    key: 'brainfog', role: 'option',
                    content: new Map([
                        ["nl", "Brainfog/ hersenmist"],
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
                    key: 'long3', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Vink aan als geen van bovenstaande van toepassing is"],
                    ])
                },
                {
                    key: 'geen', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([this.key, key].join('.'), 'geen'),
                    content: new Map([
                        ["nl", "Geen van de bovenstaande klachten"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Q1_notyes(key: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Kruis bij elke klacht hieronder aan, of je hier last van hebt gehad in de week nadat je (vermoedelijk) besmet bent geraakt met het coronavirus "],
            ]),
            questionSubText: new Map([
                ["nl", "Meerdere antwoorden mogelijk."],
            ]),
            responseOptions: [
                {
                    key: 'long1', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
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
                        ["nl", "Moeite met ademen of benauwd"],
                    ])
                },
                {
                    key: 'hoofdpijn', role: 'option',
                    content: new Map([
                        ["nl", "Hoofdpijn"],
                    ])
                },
                {
                    key: 'spierpijn', role: 'option',
                    content: new Map([
                        ["nl", "Spierpijn of pijn aan mijn gewrichten (niet door sporten)"],
                    ])
                },
                {
                    key: 'beklemming_pijn_op_borst', role: 'option',
                    content: new Map([
                        ["nl", "Pijn op de borst"],
                    ])
                },
                {
                    key: 'vermoeidheid', role: 'option',
                    content: new Map([
                        ["nl", "Vermoeidheid"],
                    ])
                },
                {
                    key: 'malaise', role: 'option',
                    content: new Map([
                        ["nl", "Niet lekker voelen (algehele malaise)"],
                    ])
                },
                {
                    key: 'eetlust', role: 'option',
                    content: new Map([
                        ["nl", "Minder trek hebben (verminderde eetlust)"],
                    ])
                },
                {
                    key: 'slijm', role: 'option',
                    content: new Map([
                        ["nl", "Slijm uit keel of neus"],
                    ])
                },
                {
                    key: 'ogen', role: 'option',
                    content: new Map([
                        ["nl", "Ontstoken ogen"],
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
                    key: 'andere-ontlasting', role: 'option',
                    content: new Map([
                        ["nl", "Andere ontlasting (zoals diarree, slijm of veranderd patroon)"],
                    ])
                },
                {
                    key: 'buikpijn', role: 'option',
                    content: new Map([
                        ["nl", "Buikpijn"],
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
                    key: 'wintertenen', role: 'option',
                    content: new Map([
                        ["nl", "Wintertenen"],
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
                    key: 'drukke_omgeving', role: 'option',
                    content: new Map([
                        ["nl", "Moeite met drukke omgeving"],
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
                    key: 'brainfog', role: 'option',
                    content: new Map([
                        ["nl", "Brainfog/ hersenmist"],
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
                    key: 'long3', role: 'text',
                    style: [{ key: 'className', value: 'fw-bold mb-2' }],
                    content: new Map([
                        ["nl", "Vink aan als geen van bovenstaande van toepassing is"],
                    ])
                },
                {
                    key: 'geen', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([this.key, key].join('.'), 'geen'),
                    content: new Map([
                        ["nl", "Geen van de bovenstaande klachten"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Qklachtenperiode(itemKey: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
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

    Q2(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Op welke datum begonnen de eerste klachten (je mag de datum ook schatten)?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: { delta: { days: -500 } },
            maxRelativeDate: { delta: { seconds: 1 } },
        });
    }

    Q2b(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Op welke datum waren de klachten voorbij (je mag de datum ook schatten)? "],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: { delta: { days: -500 } },
            maxRelativeDate: { delta: { seconds: 1 } },
        });
    }

    Q3(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Denk je dat deze klachten geheel of deels door het coronavirus komen? "],
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
                    key: 'waarschijnlijk', role: 'option',
                    content: new Map([
                        ["nl", "Ja, waarschijnlijk wel"],
                    ])
                },
                {
                    key: 'andere-oorzaak', role: 'input',
                    content: new Map([
                        ["nl", "Nee, andere oorzaak namelijk:"],
                    ])
                },
                {
                    key: 'weet-niet', role: 'option',
                    content: new Map([
                        ["nl", "Weet ik niet"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }


    Q4(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                // toDo Ka Yin: deze lijst vragen zou naar nieuw scherm moeten, en dan de tekst hieronder bovenaan dat scherm (onder titelkopje dat daar nog toegevoegd moet)
                ["nl", `
                **LET OP: De vragen hieronder zijn gericht aan een minderjarige.** 
                
                Als een ouder/verzorger helpt met invullen **laat dan je kind zelf de antwoorden kiezen.**
                `],
            ]),
            questionSubText: new Map([
                ["nl", "Je hebt hierboven aangegeven dat je afgelopen week klachten had. Onderstaande vragen gaan over alle klachten die je eerder hebt aangegeven, of ze nu wel of niet door het coronavirus komen. Klik alsjeblieft bij elke vraag het getal aan dat je mening het beste weergeeft. "],
            ]),
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                },
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ]),
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
                        ["nl", "Hoeveel beïnvloeden je klachten je leven?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen invloed – 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Hoe lang denk je dat je klachten zullen duren?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 een zeer korte tijd – 10 mijn hele leven']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Hoeveel controle vind je dat je hebt over je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen controle - 10 zeer veel controle']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Hoeveel denk je dat een behandeling kan helpen bij je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 Helemaal niet -  10 zeer veel']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Hoe sterk ervaar je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen klachten - 10 veel ernstige klachten']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Hoe bezorgd ben je over je klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal niet bezorgd - 10 zeer bezorgd']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'g', content: new Map([
                        ["nl", "In welke mate vind je dat je je klachten begrijpt?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen begrip - 10 zeer veel begrip']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Hoeveel invloed hebben de klachten op je stemming? (Bijvoorbeeld: maakt de ziekte je boos, bang, van streek of somber?)"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen invloed - 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
            ]
        });
    }


    Q5(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.simpleLikertGroup({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                // toDo Ka Yin: deze lijst vragen zou naar nieuw scherm moeten, en dan de tekst hieronder bovenaan dat scherm (onder titelkopje dat daar nog toegevoegd moet)
                // extra punt: dit hoofdstuk hieronder met IPQ ouder-vragen zou bij voorkeur op een andere plaats in de vragenlijst afgenomen moeten worden, zodat pubers niet 2x bijna hetzelfde hoofdstuk achter elkaar langs
                // zien komen (eerst die van henzelf en dan voor hun ouders). Voorstel om deze vragen voor de ouders bijna helemaal achteraan te doen als voorlaatste dus, kan dat? 
                ["nl", `
                **LET OP: De vragen hieronder zijn voor een ouder/verzorger.**
                
                Als je deze vragenlijst voor jezelf invult, **vraag dan je ouder/verzorger de antwoorden op onderstaande vragen te geven.**
                `],
            ]),
            questionSubText: new Map([
                ["nl", "Je hebt hierboven aangegeven dat je kind afgelopen week klachten had. Onderstaande vragen gaan over alle klachten van je kind die je eerder hebt aangegeven, of ze nu wel of niet door het coronavirus komen. Omcirkel alsjeblieft bij elke vraag het getal dat je mening het beste weergeeft. "],
            ]),
            scaleOptions: [
                {
                    key: '0', content: new Map([
                        ["nl", "0"],
                    ])
                },
                {
                    key: '1', content: new Map([
                        ["nl", "1"],
                    ]),
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
                        ["nl", "Hoeveel beïnvloeden de klachten van je kind je leven? "],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '-	0 helemaal geen invloed – 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'b', content: new Map([
                        ["nl", "Hoe lang denk je dat de klachten van je kind zullen duren? "],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 een zeer korte tijd – 10 het hele leven']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'c', content: new Map([
                        ["nl", "Hoeveel controle vind je dat je hebt over de klachten van je kind?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen controle - 10 zeer veel controle']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'd', content: new Map([
                        ["nl", "Hoeveel denk je dat de behandeling van je kind helpt bij de klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal niet-  10 zeer veel']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'e', content: new Map([
                        ["nl", "Hoe sterk ervaart je kind klachten?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen klachten - 10 veel ernstige klachten ']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'f', content: new Map([
                        ["nl", "Hoe bezorgd ben je over de klachten van je kind?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal niet bezorgd - 10 zeer bezorgd ']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'g', content: new Map([
                        ["nl", "In welke mate vind je dat je de klachten van je kind begrijpt?"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen begrip - 10 zeer veel begrip']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
                {
                    key: 'h', content: new Map([
                        ["nl", "Hoeveel invloed hebben de klachten van je kind op je stemming? (Bijvoorbeeld: maakt de ziekte je boos, bang, van streek of somber?)"],
                    ]), descriptions: [
                        ComponentGenerators.text({
                            content: new Map([
                                ['nl', '0 helemaal geen invloed - 10 zeer veel invloed']
                            ]),
                            className: "fst-italic mb-1"
                        }),
                    ]
                },
            ]
        });
    }


    Q6(itemKey: string, condition: Expression, isRequired: boolean) {
        const parentKey = this.key;
        return SurveyItemGenerators.multipleChoice({
            parentKey: parentKey,
            itemKey: itemKey,
            condition: condition,
            questionText: new Map([
                ["nl", "Heb je een dokter gezien, gesproken of gebeld vanwege je klachten? En zo ja, waar? (meerdere antwoorden mogelijk) "],
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
                    key: 'nee', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'),
                        'nee'),
                    content: new Map([
                        ["nl", "Nee, ik heb geen medische hulp gezocht"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), 'nee',
                        '5'),
                    content: new Map([
                        ["nl", "Ja, bij de huisarts of huisartsenpost"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), 'nee',
                        '5'),
                    content: new Map([
                        ["nl", "Ja, bij de eerste hulp van het ziekenhuis"],
                    ])
                },
                {
                    key: 'ziekenhuis', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), 'nee',
                        '5'),
                    content: new Map([
                        ["nl", "Ja, ik ben opgenomen in het ziekenhuis"],
                    ])
                },
                {
                    key: '4', role: 'input',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), 'nee',
                        '5'),
                    content: new Map([
                        ["nl", "Ja, ik heb andere medische hulp gezocht, namelijk"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOnlyOtherKeysSelected([parentKey, itemKey].join('.'), '5'),
                    content: new Map([
                        ["nl", "Nog niet, maar ik heb een afspraak gemaakt"],
                    ])
                }
            ],
            isRequired: isRequired,
        })
    }

    Q7(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Vink aan wat van toepassing is bij je ziekenhuisopname. Er zijn meerdere antwoorden mogelijk."],
            ]),
            responseOptions: [
                {
                    key: 'picu', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben op de Kinder Intensive Care (PICU/IC) opgenomen "],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben op de kinderafdeling opgenomen"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Ik heb zuurstof toegediend gekregen"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q8(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Waarom was je op de Kinder Intensive Care (PICU/IC) opgenomen?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Ik had het inflammatoir syndroom (MIS-C)"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Ik had COVID-19"],
                    ])
                },
                {
                    key: '3', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk:"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }


    Q9(key: string, condition: Expression, isRequired?: boolean) {
        const inputProperties = {
            min: 1,
            max: 365
        };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Hoe lang was je opgenomen in het ziekenhuis"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'numberInput',
                    content: new Map([
                        ["nl", "Typ hier een aantal dagen"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben nog steeds opgenomen"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Q10(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.dropDown({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
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

    Q11(itemKey: string, condition: Expression | undefined, isRequired?: boolean) {
        const parentKey = this.key;
        return SurveyItemGenerators.multipleChoice({
            parentKey: parentKey,
            condition: condition,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "Heb je vanwege je klachten medicijnen gebruikt in de week nadat je (vermoedelijk) besmet bent geraakt met het coronavirus? En zo ja, welke?"],
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
                        ["nl", "Ja, pijnstillers zoals paracetamol, diclofenac of ibuprofen"],
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
                    key: 'afweerremmers', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, afweerremmende medicatie zoals prednison of dexamethason"],
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
                        ["nl", "Ja, medicijnen voor hooikoorts (anti-allergie tablet of drank of allergie-neusspray) of astma"],
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
                        ["nl", "Ja, vitamines (bijvoorbeeld vitamine C of vitamine D)"],
                    ])
                },
                {
                    key: '9', role: 'input',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, andere medicatie, namelijk"],
                    ])
                },
                {
                    key: '10', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Dit wil ik niet aangeven"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Q11_yes(itemKey: string, condition: Expression | undefined, isRequired?: boolean) {
        const parentKey = this.key;
        return SurveyItemGenerators.multipleChoice({
            parentKey: parentKey,
            condition: condition,
            itemKey: itemKey,
            questionText: new Map([
                ["nl", "Heb je vanwege je klachten medicijnen gebruikt? En zo ja, welke?"],
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
                        ["nl", "Ja, pijnstillers zoals paracetamol, diclofenac of ibuprofen"],
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
                    key: 'afweerremmers', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, afweerremmende medicatie zoals prednison of dexamethason"],
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
                        ["nl", "Ja, medicijnen voor hooikoorts (anti-allergie tablet of drank of allergie-neusspray) of astma"],
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
                        ["nl", "Ja, vitamines (bijvoorbeeld vitamine C of vitamine D)"],
                    ])
                },
                {
                    key: '9', role: 'input',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Ja, andere medicatie, namelijk"],
                    ])
                },
                {
                    key: '10', role: 'option',
                    disabled: CommonExpressions.multipleChoiceOptionsSelected([parentKey, itemKey].join('.'), '0'),
                    content: new Map([
                        ["nl", "Dit wil ik niet aangeven"],
                    ])
                },
            ],
            isRequired: isRequired,
        })
    }

    Q12(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Heb je je in de afgelopen 7 dagen ziek gemeld van school of opleiding? "],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Nee, maar het had wel effect op mijn dagelijkse bezigheden"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Ja, want met deze klachten/coronauitslag mag ik niet naar school "],
                    ])
                },
                {
                    key: 'ja-klachten', role: 'option',
                    content: new Map([
                        ["nl", "Ja, vanwege de klachten"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["nl", "Niet van toepassing, ik ga niet naar school of opleiding"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }

    Q13(key: string, condition: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Hoeveel dagen ben je ziek gemeld van school of opleiding? "],
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
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "3 dagen"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    content: new Map([
                        ["nl", "4 dagen"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["nl", "5 dagen"],
                    ])
                },
                {
                    key: '6', role: 'option',
                    content: new Map([
                        ["nl", "6 tot 10 dagen"],
                    ])
                },
                {
                    key: '7', role: 'option',
                    content: new Map([
                        ["nl", "11 tot 15 dagen"],
                    ])
                },
                {
                    key: '8', role: 'option',
                    content: new Map([
                        ["nl", "meer dan 15 dagen"],
                    ])
                },
            ],
            isRequired: isRequired,
        });
    }
}
