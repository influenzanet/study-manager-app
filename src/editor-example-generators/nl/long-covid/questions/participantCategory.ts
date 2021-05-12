import { SurveyItem } from "survey-engine/lib/data_types";
import { datePickerKey, responseGroupKey, singleChoiceKey } from "../../../../editor-engine/utils/key-definitions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class ParticipantCategoryGroup extends GroupItemEditor {
    private Q_age: SurveyItem;

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'CAT';
        super(parentKey, groupKey);
        this.Q_age = q_age(this.key, true);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_person_def(this.key, true));
        this.addItem(this.Q_age);
        this.addItem(q_postal_code(this.key, true));
        this.addPageBreak();
    }

    getAgeInYearsExpression() {
        return expWithArgs('dateResponseDiffFromNow', this.Q_age.key, [responseGroupKey, datePickerKey].join('.'), 'years', 1)
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
                    ["nl", "Voor mijn kind van jonger dan 16 jaar oud"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_age = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';
    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        dateInputMode: 'YM',
        questionText: new Map([
            ["nl", "Wat is je geboortejaar en maand?"],
        ]),
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
                years: -5
            }
        },
        isRequired: isRequired,
    });
}

const q_postal_code = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';
    const fullKey = [parentKey, itemKey].join('.');

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
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
