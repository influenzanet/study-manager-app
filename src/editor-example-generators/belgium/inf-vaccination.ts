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
    survey.addExistingSurveyItem(vac, rootKey);


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
                ["en", "Yes, I received at least one COVID-19 vaccine "],
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
