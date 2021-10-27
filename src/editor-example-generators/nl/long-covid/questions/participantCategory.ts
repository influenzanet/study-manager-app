import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { datePickerKey, responseGroupKey, singleChoiceKey } from "../../../../editor-engine/utils/key-definitions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class ParticipantCategoryGroup extends GroupItemEditor {
    private Q_age: SurveyItem;
    private isAdultVersionCondition: Expression;

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'CAT';
        super(parentKey, groupKey);
        const qCategory = q_person_def(this.key, true);
        this.isAdultVersionCondition = CommonExpressions.singleChoiceOptionsSelected(qCategory.key, 'mijzelf');

        this.addItem(qCategory);
        this.addPageBreak();
        this.Q_age = q_age(this.key, undefined,
            expWithArgs(
                'gt',
                expWithArgs('dateResponseDiffFromNow', 'T0.CAT.Q2', [responseGroupKey, datePickerKey].join('.'), 'years', 1),
                18,
            ),
            CommonExpressions.singleChoiceOptionsSelected(qCategory.key, 'kind'),
            true);
        this.addItem(this.Q_age);
        this.addItem(q_postal_code(this.key, undefined, true));
        this.addPageBreak();
    }

    getAgeInYearsExpression() {
        return expWithArgs('dateResponseDiffFromNow', this.Q_age.key, [responseGroupKey, datePickerKey].join('.'), 'years', 1)
    }

    isOlder(age: number, allowEqual?: boolean): Expression {
        return expWithArgs(
            allowEqual ? 'gte' : 'gt',
            this.getAgeInYearsExpression(),
            age,
        )
    }

    isYounger(age: number, allowEqual?: boolean): Expression {
        return expWithArgs(
            allowEqual ? 'lte' : 'lt',
            this.getAgeInYearsExpression(),
            age,
        )
    }

    isBetweenAges(minAge: number, maxAge: number, allowEqual?: boolean): Expression {
        return expWithArgs(
            'and',
            expWithArgs(
                allowEqual ? 'gte' : 'gt',
                this.getAgeInYearsExpression(),
                minAge,
            ),
            expWithArgs(
                allowEqual ? 'lte' : 'lt',
                this.getAgeInYearsExpression(),
                maxAge,
            )
        );
    }

    getIsForAKind() {
        return expWithArgs('not', this.isAdultVersionCondition);
    }
}

const q_person_def = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Vul je deze lijst in voor jezelf of voor een kind?"],
        ]),
        responseOptions: [
            {
                key: 'mijzelf', role: 'option',
                content: new Map([
                    ["nl", "Voor mijzelf"],
                ])
            },
            {
                key: 'kind', role: 'option',
                content: new Map([
                    ["nl", "Voor mijn kind"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_age = (parentKey: string, condition?: Expression,
    isOlderThan18?: Expression,
    fillingOutForChild?: Expression,
    isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        dateInputMode: 'YM',
        condition: condition,
        questionText: new Map([
            ["nl", "Wat is je geboortejaar en maand?"],
        ]),
        bottomDisplayCompoments: [
            {
                role: 'error',
                content: generateLocStrings(new Map([
                    ["nl", "Let op: vul hier geboortejaar en maand van je kind in"],
                ])),
                displayCondition: expWithArgs('getSurveyItemValidation', 'this', 'ageNotChild'),
            }
        ],
        questionSubText: new Map([
            ["nl", "Het gaat hier om geboortejaar en maand van diegene voor wie je de vragenlijst invult."],
        ]),
        minRelativeDate: {
            delta: {
                years: -110
            }
        },
        maxRelativeDate: {
            delta: {
                years: 0,
            }
        },
        customValidations: [
            {
                key: 'ageNotChild',
                type: 'soft',
                rule: CommonExpressions.and(
                    fillingOutForChild,
                    isOlderThan18,
                )
            }
        ],
        isRequired: isRequired,
    });
}

const q_postal_code = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';
    const fullKey = [parentKey, itemKey].join('.');

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat zijn de 4 cijfers van je postcode?"],
        ]),
        responseOptions: [
            {
                key: 'postcode', role: 'input',
                // style: [{ key: 'className', value: 'w-100' }],
                content: new Map([
                    ["nl", "Postcode"],
                ]),
                description: new Map([
                    ["nl", "de eerste vier cijfers"],
                ])
            },
            {
                key: 'nietaangeven', role: 'option',
                content: new Map([
                    ["nl", "Dit wil ik niet aangeven"],
                ])
            },
        ],
        bottomDisplayCompoments: [
            {
                role: 'error',
                content: generateLocStrings(new Map([
                    ["nl", "Voer de eerste vier cijfers van je postcode in"],
                ])),
                displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
            }
        ],
        customValidations: [
            {
                key: 'r2',
                type: 'hard',
                rule: expWithArgs('or',
                    expWithArgs('not', expWithArgs('hasResponse', fullKey, responseGroupKey)),
                    expWithArgs('checkResponseValueWithRegex', fullKey, [responseGroupKey, singleChoiceKey, 'postcode'].join('.'), '^[0-9][0-9][0-9][0-9]$'),
                    expWithArgs('responseHasKeysAny', fullKey, [responseGroupKey, singleChoiceKey].join('.'), 'nietaangeven')
                )
            }
        ]
    })
}
