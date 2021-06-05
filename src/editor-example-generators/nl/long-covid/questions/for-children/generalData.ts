import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { numericInputKey, responseGroupKey } from "../../../../../editor-engine/utils/key-definitions";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { expWithArgs } from "../../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";


export class GeneralDataGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        q11Ja: Expression;
    }, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'GEN';
        super(parentKey, groupKey);

        const isRequired = true;

        const Q7 = this.Q7('Q7', isRequired);
        const Q7GreaterThanOne = expWithArgs('gt', CommonExpressions.getResponseValueAsNum(
            Q7.key, [responseGroupKey, numericInputKey].join('.')
        ), 1);


        // TODO: use q11ja expression - question was missing in Word file
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
        this.addItem(this.Q10('Q10', isRequired));
        this.addItem(this.Q11('Q11', isRequired));
        this.addItem(this.Q12('Q12', isRequired));
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
                         De vragen hieronder zijn gericht aan een minderjarige. Bent u een ouder/verzorger dan kunt u
                          de antwoorden invullen voor/over uw kind.

                          In dit onderdeel stellen wij je enkele algemene vragen over jezelf en je achtergrond.
                        `]
                    ])
                })]
        })
    }

    Q1(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Wat is je geslacht?"],
            ]),
            responseOptions: [
                {
                    key: 'M', role: 'option',
                    content: new Map([
                        ["nl", "Man"],
                    ])
                },
                {
                    key: 'F', role: 'option',
                    content: new Map([
                        ["nl", "Vrouw"],
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
                max: 300
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
                max: 250
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
                ["nl", "Met hoeveel andere mensen woon je samen?"],
            ]),
            questionSubText: new Map([
                ["nl", "jezelf meegeteld en inclusief kinderen, iedereen meetellen waarmee je algemene ruimtes deelt als woonkamer, keuken, toilet en/of badkamer"],
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
                        ["nl", "Basisonderwijs of lager onderwijs"],
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
                        ["nl", "Anders"],
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
                        ["nl", "Basisonderwijs of lager onderwijs"],
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
                        ["nl", "Anders"],
                    ]),
                },
            ]
        });
    }

    Q11(itemKey: string, isRequired: boolean) {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.key,
            itemKey: itemKey,
            isRequired: isRequired,
            questionText: new Map([
                ["nl", "TODO: Hoe heb je over het LongCOVID-onderzoek gehoord?"],
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
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Uitnodiging via e-mail na deelname aan ander RIVM onderzoek (b.v. CONTEST)"],
                    ]),
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Uitnodiging via de e-mail na contact met de GGD voor bron en contactonderzoek"],
                    ]),
                }, {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Uitnodiging per brief"],
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
                }, {
                    key: '7', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk:"],
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

}
