import { Expression } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { numericInputKey, responseGroupKey } from "../../../../../editor-engine/utils/key-definitions";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { expWithArgs } from "../../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";
import { surveyKeys } from "../../studyRules";


export class GeneralDataGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition?: Expression,
        q11Ja?: Expression;
    }, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'GEN';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;

        const Q7 = this.Q7('Q7', isRequired);
        const Q7GreaterThanOne = expWithArgs('gt', CommonExpressions.getResponseValueAsNum(
            Q7.key, [responseGroupKey, numericInputKey].join('.')
        ), 1);


        const Q_minderschool = this.Q_minderschool('Q_minderschool', conditions.q11Ja, isRequired)
        const Q_verzuim = this.Q_verzuim('Q_verzuim',
            CommonExpressions.singleChoiceOnlyOtherKeysSelected(Q_minderschool.key,
                'onveranderd', 'niet'
            ), isRequired)

        const Q_langafwezig = this.Q_langafwezig('Q_langafwezig',
            CommonExpressions.singleChoiceOnlyOtherKeysSelected(Q_minderschool.key,
                'onveranderd', 'niet'
            ),
            isRequired);
        const conditionAfwezig = CommonExpressions.singleChoiceOptionsSelected(
            Q_langafwezig.key, 'ja'
        )
        if (this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(this.groupIntro());
            this.addItem(this.Q1('Q1', isRequired));
            this.addItem(this.Q2('Q2', isRequired));
            this.addItem(this.Q3('Q3', isRequired));
            this.addItem(this.Q4('Q4', isRequired));
            this.addItem(this.Q5('Q5', isRequired));
            this.addItem(this.Q6('Q6', isRequired));
            this.addItem(Q7);
            this.addItem(this.Q8('Q8', Q7GreaterThanOne, isRequired));
            this.addItem(this.Q9('Q9', isRequired));
            this.addItem(this.Q10('Q10', false)); // not required
            this.addPageBreak();
        }

        this.addItem(this.Q_minderschoolpreText(conditions.q11Ja));
        this.addItem(this.InfoText2(conditions.q11Ja));
        this.addItem(Q_minderschool);
        this.addItem(Q_verzuim);
        this.addItem(Q_langafwezig);
        this.addItem(this.Q_datumziek('Q_datumziek', conditionAfwezig, isRequired));
        this.addItem(this.Q_zorgenschool('Q_zorgenschool', conditions.q11Ja, isRequired));
        this.addItem(this.Q_lotgenoten('Q_lotgenoten', conditions.q11Ja, isRequired));
        this.addPageBreak();

        if (
            this.isPartOfSurvey(surveyKeys.T0)) {
            this.addItem(this.Q11preText());
            this.addItem(this.Q11('Q11', isRequired));
            this.addItem(this.Q12('Q12', isRequired));
        }
        this.addItem(this.Q13('Q13', false));
        this.addItem(this.Text_pococochi(conditions.q11Ja))
        // TODO add this later
        // this.addItem(this.Q14('Q14', false));
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
## Algemene gegevens

**De vragen hieronder zijn gericht aan een minderjarige.**

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.

#### In dit onderdeel stellen wij je enkele algemene vragen over jezelf en je achtergrond.
                        `]
                    ])
                })]
        })
    }

    InfoText2(condition?: Expression) {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'InfoText2',
            condition: condition,
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
De volgende vragen gaan over je school
                        `]
                    ])
                }),
            ]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is je geslacht?"],
            ]),
            responseOptions: [
                {
                    key: 'M', role: 'option',
                    content: new Map([
                        ["nl", "Jongen"],
                    ])
                },
                {
                    key: 'F', role: 'option',
                    content: new Map([
                        ["nl", "Meisje"],
                    ])
                },
                {
                    key: 'other', role: 'option',
                    content: new Map([
                        ["nl", "Anders"],
                    ])
                },
            ]
        })
    }

    Q2(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoeveel kilo weeg je zonder kleren? (afronden op hele kilo's)"],
            ]),
            content: new Map([
                ['nl', 'kg']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 100
            }
        })
    }

    Q3(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoe lang ben je? (zonder schoenen aan)"],
            ]),
            content: new Map([
                ['nl', 'cm']
            ]),
            contentBehindInput: true,
            componentProperties: {
                min: 0,
                max: 200
            }
        })
    }

    Q4(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is je geboorteland?"],
            ]),
            responseOptions: [
                {
                    key: 'nl', role: 'option',
                    content: new Map([
                        ["nl", "Nederland"],
                    ])
                },
                {
                    key: 'anders', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk"],
                    ])
                },
            ]
        });
    }

    Q5(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is het geboorteland van je moeder?"],
            ]),
            responseOptions: [
                {
                    key: 'nl', role: 'option',
                    content: new Map([
                        ["nl", "Nederland"],
                    ])
                },
                {
                    key: 'anders', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk"],
                    ])
                },
            ]
        });
    }

    Q6(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is het geboorteland van je vader?"],
            ]),
            responseOptions: [
                {
                    key: 'nl', role: 'option',
                    content: new Map([
                        ["nl", "Nederland"],
                    ])
                },
                {
                    key: 'anders', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk"],
                    ])
                },
            ]
        });
    }

    Q7(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.numericInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Met hoeveel mensen woon je samen?"],
            ]),
            questionSubText: new Map([
                ["nl", "Jezelf meegeteld, iedereen meetellen waarmee je algemene ruimtes deelt als woonkamer, keuken, toilet en/of badkamer"],
            ]),
            content: new Map([
                ['nl', 'Nr.:']
            ]),
            componentProperties: {
                min: 0,
                max: 20
            }
        });
    }

    Q8(itemKey: string, condition: Expression, isRequired: boolean) {
        const inputProperties = {
            min: 1,
            max: 50
        };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];

        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            condition: condition,
            questionText: new Map([
                ["nl", "Hoe oud zijn de mensen met wie je samen woont?"],
            ]),
            questionSubText: new Map([
                ["nl", "Noteer achter de leeftijdsgroepen hoeveel van je huisgenoten deze leeftijd hebben."],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'numberInput',
                    content: new Map([
                        ["nl", "< 4 jaar"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'b', role: 'numberInput',
                    content: new Map([
                        ["nl", "4-12 jaar"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'c', role: 'numberInput',
                    content: new Map([
                        ["nl", "13-18 jaar"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'd', role: 'numberInput',
                    content: new Map([
                        ["nl", "19-25 jaar"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                }, {
                    key: 'e', role: 'numberInput',
                    content: new Map([
                        ["nl", "26-50 jaar"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                }, {
                    key: 'f', role: 'numberInput',
                    content: new Map([
                        ["nl", "51-65 jaar"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                }, {
                    key: 'g', role: 'numberInput',
                    content: new Map([
                        ["nl", "vanaf 65 jaar"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
            ]
        });
    }

    Q9(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is de hoogst (met diploma) afgeronde opleiding van je ouder/verzorger?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Geen onderwijs, basisonderwijs of lager onderwijs"],
                    ]),
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Lbo (ambachtsschool, huishoudschool, lts, leao, etc.)"],
                    ]),
                }, {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Vmbo, mavo of (m)ulo"],
                    ]),
                }, {
                    key: '4', role: 'option',
                    content: new Map([
                        ["nl", "Havo of vwo"],
                    ]),
                }, {
                    key: '5', role: 'option',
                    content: new Map([
                        ["nl", "Mbo"],
                    ]),
                }, {
                    key: '6', role: 'option',
                    content: new Map([
                        ["nl", "Hbo"],
                    ]),
                }, {
                    key: '7', role: 'option',
                    content: new Map([
                        ["nl", "Universiteit"],
                    ]),
                },
            ]
        });
    }

    Q10(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Wat is de hoogst (met diploma) afgeronde opleiding van je tweede ouder/verzorger?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Geen onderwijs, basisonderwijs of lager onderwijs"],
                    ]),
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Lbo (ambachtsschool, huishoudschool, lts, leao, etc.)"],
                    ]),
                }, {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Vmbo, mavo of (m)ulo"],
                    ]),
                }, {
                    key: '4', role: 'option',
                    content: new Map([
                        ["nl", "Havo of vwo"],
                    ]),
                }, {
                    key: '5', role: 'option',
                    content: new Map([
                        ["nl", "Mbo"],
                    ]),
                }, {
                    key: '6', role: 'option',
                    content: new Map([
                        ["nl", "Hbo"],
                    ]),
                }, {
                    key: '7', role: 'option',
                    content: new Map([
                        ["nl", "Universiteit"],
                    ]),
                }, {
                    key: '8', role: 'option',
                    content: new Map([
                        ["nl", "Onbekend"],
                    ]),
                },
            ]
        });
    }

    // The following questions should be grouped (kvdw: is already done I think?)
    Q_minderschoolpreText(condition?: Expression) {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'headingQ2',
            condition: condition,
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
## School en lotgenoten

**De vragen hieronder zijn gericht aan een minderjarige.**

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
                        `]
                    ])
                }),
            ]
        })
    }


    Q_minderschool(itemKey: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            condition: condition,
            questionText: new Map([
                ["nl", "Heb je sinds je (vermoedelijke) besmetting met het coronavirus minder lesuren op school/opleiding kunnen volgen dan je normaalgesproken deed?"],
            ]),
            responseOptions: [
                {
                    key: 'onveranderd', role: 'option',
                    content: new Map([
                        ["nl", "Mijn gevolgde lesuren zijn onveranderd"],
                    ]),
                },
                {
                    key: 'minder', role: 'option',
                    content: new Map([
                        ["nl", "Ik volg af en toe minder lessen"],
                    ]),
                },
                {
                    key: 'structureel', role: 'option',
                    content: new Map([
                        ["nl", "Ik volg structureel minder lessen"],
                    ]),
                },
                {
                    key: 'volledig', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben volledig ziekgemeld"],
                    ]),
                },
                {
                    key: 'gestopt', role: 'option',
                    content: new Map([
                        ["nl", "Ik ben gestopt met school/opleiding door de langdurige klachten"],
                    ]),
                },
                {
                    key: 'niet', role: 'option',
                    content: new Map([
                        ["nl", "Ik ga niet naar school/opleiding om andere reden"],
                    ]),
                },
            ]
        });
    }

    Q_verzuim(itemKey: string, condition: Expression, isRequired: boolean) {
        const inputProperties = {
            min: 0,
            max: 20
        };
        const inputStyle = [{ key: 'inputMaxWidth', value: '70px' }];
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoeveel dagen in de afgelopen 4 weken heb je helemaal niet, of minder lessen kunnen volgen door langdurige gezondheidsklachten (tel het aantal lesdagen)? Je mag het antwoord ook inschatten."],
            ]),
            questionSubText: new Map([
                ["nl", "Meerdere antwoorden mogelijk"]
            ]),
            responseOptions: [
                {
                    key: 'geen', role: 'numberInput',
                    content: new Map([
                        ["nl", "Dagen helemaal geen les kunnen volgen:"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
                {
                    key: 'minder', role: 'numberInput',
                    content: new Map([
                        ["nl", "Aantal dagen minder les kunnen volgen:"],
                    ]),
                    optionProps: inputProperties,
                    style: inputStyle,
                },
            ]
        });
    }

    // if Q_minderschool != onveranderd OR Q_minderschool != niet
    Q_langafwezig(itemKey: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Was je langer dan de gehele periode van 4 weken afwezig van school/opleiding doordat je ziek was?"],
            ]),
            questionSubText: new Map([
                ["nl", "Het gaat om een aaneengesloten periode van schoolverzuim."]
            ]),
            responseOptions: [
                {
                    key: 'nee', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ]),
                },
                {
                    key: 'ja', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ]),
                }
            ]
        });
    }

    // if Q_langafwezig == ja
    Q_datumziek(key: string, condition: Expression, isRequired: boolean) {
        return SurveyItemGenerators.dateInput({
            parentKey: this.key,
            itemKey: key,
            condition: condition,
            questionText: new Map([
                ["nl", "Wanneer heb je je ziek gemeld?"],
            ]),
            dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
            minRelativeDate: { delta: { days: -10 } },
            maxRelativeDate: { delta: { seconds: 1 } },
            isRequired: isRequired,
        });
    }

    Q_zorgenschool(itemKey: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Maak je je zorgen over je school/opleiding in het komende jaar door de langdurige gezondheidsklachten?"],
            ]),
            responseOptions: [
                {
                    key: 'ernstig', role: 'option',
                    content: new Map([
                        ["nl", "Ernstige zorgen"],
                    ]),
                },
                {
                    key: 'redelijk', role: 'option',
                    content: new Map([
                        ["nl", "Redelijk veel zorgen"],
                    ]),
                },
                {
                    key: 'weinig', role: 'option',
                    content: new Map([
                        ["nl", "Weinig zorgen"],
                    ]),
                },
                {
                    key: 'geen1', role: 'option',
                    content: new Map([
                        ["nl", "Geen zorgen, ik ben redelijk positief"],
                    ]),
                },
                {
                    key: 'geen2', role: 'option',
                    content: new Map([
                        ["nl", "Geen zorgen, ik ben positief"],
                    ]),
                },
            ]
        });
    }

    Q_lotgenoten(itemKey: string, condition?: Expression, isRequired?: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            condition: condition,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Heb je contact met andere (ouders van) kinderen met langdurige klachten door het coronavirus? "],
            ]),
            responseOptions: [
                {
                    key: 'vaak', role: 'option',
                    content: new Map([
                        ["nl", "Ja, vaak"],
                    ]),
                },
                {
                    key: 'beetje', role: 'option',
                    content: new Map([
                        ["nl", "Ja, af en toe"],
                    ]),
                },
                {
                    key: 'geen-behoefte', role: 'option',
                    content: new Map([
                        ["nl", "Ik ken wel andere (ouders van) kinderen met langdurige klachten, maar spreek er niet met hen over"],
                    ]),
                },
                {
                    key: 'behoeft', role: 'option',
                    content: new Map([
                        ["nl", "Ik ken geen andere (ouders van) kinderen met langdurige klachten, maar heb wel behoefte aan contact"],
                    ]),
                },
                {
                    key: 'onnodig', role: 'option',
                    content: new Map([
                        ["nl", "Ik ken geen andere (ouders van) kinderen met langdurige klachten, en heb ook geen behoefte aan contact"],
                    ]),
                },
            ]
        });
    }

    Q11preText() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'headingQ11',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
## Herkomst en aanvullend onderzoek

**De vragen hieronder zijn gericht aan een minderjarige.**

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
                        `]
                    ])
                }),
            ]
        })
    }

    Q11(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Hoe heb je over het LongCOVID-onderzoek gehoord?"],
            ]),
            topDisplayCompoments: [
                ComponentGenerators.text({
                    content: new Map([[
                        'nl', 'Meerdere antwoorden mogelijk'
                    ]]),
                    className: "mb-2"
                })
            ],
            responseOptions: [
                // {
                //     key: '1', role: 'option',
                //     content: new Map([
                //         ["nl", "Uitnodiging via e-mail na deelname aan CONTEST onderzoek door ouders/verzorgers"],
                //     ]),
                // },
                // {
                //     key: '2', role: 'option',
                //     content: new Map([
                //         ["nl", "Uitnodiging via de e-mail na contact met de GGD voor bron en contactonderzoek"],
                //     ]),
                // }, 
                {
                    key: '3', role: 'input',
                    content: new Map([
                        ["nl", "Uitnodiging per brief, mijn onderzoekscode is:"],
                    ]),
                }, {
                    key: '4', role: 'input',
                    content: new Map([
                        ["nl", "Via de media, namelijk:"],
                    ]),
                }, {
                    key: '5', role: 'option',
                    content: new Map([
                        ["nl", "Via vrienden of familie"],
                    ]),
                }, {
                    key: '6', role: 'option',
                    content: new Map([
                        ["nl", "Via google of een andere internet zoekmachine"],
                    ]),
                }, 
                // {
                //     key: '7', role: 'option',
                //     content: new Map([
                //         ["nl", "Via PoCoCoChi"],
                //     ]),
                // },
                {
                    key: '8', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk"],
                    ]),
                },
            ]
        });
    }

    Q12(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Zouden wij je eventueel mogen benaderen voor toekomstig aanvullend onderzoek over het coronavirus of andere infectieziekten?"],
            ]),
            responseOptions: [
                {
                    key: 'ja', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ]),
                },
                {
                    key: 'nee', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ]),
                },
            ]
        });
    }

    Q13(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.multilineTextInput({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "Als je nog aanvullende opmerkingen hebt over de vragenlijst of het onderzoek, kun je die hieronder invullen."],
            ]),
            questionSubText: new Map([
                ["nl", "Let op je krijgt geen persoonlijke reactie op deze opmerkingen."],
            ]),
        });
    }

    Text_pococochi(condition?: Expression) {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            condition: condition,
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `Je hebt aangegeven aanhoudende klachten te hebben. Als je denkt dat deze klachten mogelijk door het coronavirus komen, kun je contact opnemen met het PoCoCoChi (Post Corona Complaints in Children) team via pocos@amsterdamumc.nl. Als je je telefoonnummer in de mail vermeldt zullen zij telefonisch contact met je opnemen.`
                        ]
                    ])
                })]
        })
    }

    //TODO add this later
    // Q14(itemKey: string, isRequired: boolean) {
    //     return SurveyItemGenerators.multipleChoice({
    //         parentKey: this.key,
    //         itemKey: itemKey,
    //         isRequired: isRequired,
    //         questionText: new Map([
    //             ["nl", "Als je dat wilt kun je hieronder je telefoonnummer opgeven en een extra emailadres zodat we je beter kunnen bereiken om te vragen of je de volgende vragenlijst in wilt vullen. "],
    //         ]),
    //         responseOptions: [
    //             {
    //                 key: 'telefoon', role: 'input',
    //                 content: new Map([
    //                     ["nl", "Telefoonnummer:"],
    //                 ]),
    //             },
    //             {
    //                 key: 'email', role: 'input',
    //                 content: new Map([
    //                     ["nl", "Eventueel extra e-mailadres: "],
    //                 ]),
    //             },
    //         ]
    //     });
    // }

}
