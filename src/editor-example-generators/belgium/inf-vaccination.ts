import { Survey, SurveyItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, initDropdownGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";
import { initLikertScaleItem } from "../../editor-engine/utils/question-type-generator";
import { likertScaleKey } from "../common_question_pool/key-definitions";

const vaccination = (): Survey | undefined => {
    const surveyKey = 'vaccination';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["nl-be", "Vaccinatievragenlijst"],
            ["en", "Vaccination questionnaire"],
            ["fr-be", "Questionnaire de vaccination"],
            ["de-be", "Impffragebogen"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["nl-be", ""],
            ["en", "The purpose of the vaccination questionnaire is to find out more about...."],
            ["fr-be", ""],
            ["de-be", ""],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["nl-be", "Dit zal ongeveer 2-5 minuten tijd in beslag nemen."],
            ["en", "It takes approximately 2-5 minutes to complete this questionnaire."],
            ["fr-be", "Comptez environ 2-5 minutes pour compléter le questionnaire préliminaire."],
            ["de-be", "Es dauert etwa 2-5 Minuten, um diesen Fragebogen auszufüllen."],
        ])
    ));

    // *******************************
    // Some rules if necessary
    // *******************************
    // max item per page
    // set prefill rules
    // set context rules

    // *******************************
    // Questions
    // *******************************
    const rootItemEditor = new ItemEditor(survey.findSurveyItem(surveyKey) as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;

    const Q_vac = vac(rootKey, true);
    survey.addExistingSurveyItem(Q_vac, rootKey);

    const Q_vaccineBrand = vaccineBrand(rootKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineBrand, rootKey);

    const Q_sideEffects = sideEffects(rootKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_sideEffects, rootKey);

    return survey.getSurvey();
}

export default vaccination;


/**
 * VAC: single choice question about vaccination status
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const vac = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", ""],
            ["fr-be", "?"],
            ["de-be", "?"],
            ["en", "Have you received a COVID-19 vaccine?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", ""],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "We would like to be able to work out how much protection the vaccine gives."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", ""],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Report yes, if you received a COVID-19 vaccine (since December 2020)."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART test
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Yes, I received at least one COVID-19 vaccine"],
            ])
        },
        {
            key: '01', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "No, I was invited and will receive a vaccine soon"],
            ])
        },
        {
            key: '02', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "No, I was invited but declined the vaccine"],
            ])
        },
        {
            key: '03', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "When invited, I plan to receive a vaccine"],
            ])
        },
        {
            key: '04', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "When invited, I will decline the vaccine"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "I don't know/can't remember"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}


/**
 * VACCINE BRAND: Which vaccine was provided
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
 const vaccineBrand = (parentKey: string, keyvac?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", ""],
            ["fr-be", "?"],
            ["de-be", "?"],
            ["en", "Which COVID-19 vaccine did you receive?"],
        ]))
    );

    // CONDITION
    if (keyvac) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '1')
        );
    }

    // INFO POPUP
    // not applicable

    // RESPONSE PART test
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "AstraZeneca"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Pfizer/BioNTech"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Moderna"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Janssen Pharmaceutica (Johnson & Johnson)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "CureVac"],
            ])
        },
        {
            key: '6', role: 'option',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
                ["en", "Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "I Don't know/Can't remember"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}


/**
 * SIDE EFFECTS: Side effects questions
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
 const sideEffects = (parentKey: string, keyvac?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35h'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", ""],
            ["fr-be", "?"],
            ["de-be", "?"],
            ["en", "Did you experience any side effects of this vaccination? If yes, select up to 3 options that are most applicable."],
        ]))
    );

    // CONDITION
    if (keyvac) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '1')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", ""],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "We want to investigate what are the side effects that people experience from COVID-19 vaccination."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", ""],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Please select up to 3 side effects that you experienced after COVID-19 vaccination."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART test
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "None"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Allergic reaction"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Severe allergic reaction (with medical intervention)"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Diarrhea"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Feeling of being feverish (not measured)"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Fever (measured and above 38°C)"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Headache"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Shortness of breath"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Nausea or vomiting"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Tiredness"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Chest or stomach pain"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Painful and/or swollen arm at the vaccination site"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Muscle or joint pain"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Swelling or cold feeling in arm or leg"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
                ["en", "Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}