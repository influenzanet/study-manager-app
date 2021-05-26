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
            ["nl-be", "Het doel van deze vaccinatievragenlijst is om onderzoek te voeren naar de bescherming die het vaccin geeft en de vaccinatiestatus van België in kaart brengen. "],
            ["en", "The purpose of the vaccination questionnaire is to find out more about protection given by the vaccine and monitor vaccination uptake in Belgium."],
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

    const Q_vaccineShots = vaccineShots(rootKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineShots, rootKey);

    const Q_dateFirstVaccine = dateFirstVaccine(rootKey, Q_vac.key, Q_vaccineShots.key, true);
    survey.addExistingSurveyItem(Q_dateFirstVaccine, rootKey);

    const Q_dateSecondVaccine = dateSecondVaccine(rootKey, Q_vac.key, Q_vaccineShots.key, Q_dateFirstVaccine.key, true);
    survey.addExistingSurveyItem(Q_dateSecondVaccine, rootKey);

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
            ["nl-be", "Bent u reeds gevaccineerd voor COVID-19?"],
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
                    ["nl-be", "We willen onderzoeken hoeveel bescherming vaccinatie geeft."],
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
                    ["nl-be", "Antwoord ja indien u een COVID-19 vaccin heeft ontvangen (sinds december 2020). "],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Report yes, if you received a COVID-19 vaccine (since December 2020)."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik heb al minstens 1 dosis gekregen."],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Yes, I received at least one COVID-19 vaccine"],
            ])
        },
        {
            key: '01', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik ben uitgenodigd en zal binnekort een eerste dosis ontvangen"],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "No, I was invited and will receive a vaccine soon"],
            ])
        },
        {
            key: '02', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik ben uitgenodigd, maar heb de vaccinatie geweigerd"],
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
                ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin halen"],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "When invited, I will decline the vaccine"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin weigeren"],
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
            ["nl-be", "Welk COVID-19 vaccin heeft u ontvangen? "],
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

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "AstraZeneca"],
                ["fr-be", "AstraZeneca"],
                ["de-be", "AstraZeneca"],
                ["en", "AstraZeneca"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Pfizer/BioNTech"],
                ["fr-be", "Pfizer/BioNTech"],
                ["de-be", "Pfizer/BioNTech"],
                ["en", "Pfizer/BioNTech"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Moderna"],
                ["fr-be", "Moderna"],
                ["de-be", "Moderna"],
                ["en", "Moderna"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
                ["fr-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
                ["de-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
                ["en", "Janssen Pharmaceutica (Johnson & Johnson)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "CureVac"],
                ["fr-be", "CureVac"],
                ["de-be", "CureVac"],
                ["en", "CureVac"],
            ])
        },
        {
            key: '6', role: 'input',
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
                ["nl-be", "Ik weet het niet meer"],
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
 * VACCINE SHOTS: How many times has the participant been vaccinated
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
 const vaccineShots = (parentKey: string, keyvac?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35c'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoeveel dosissen van het vaccin heeft u reeds ontvangen? "],
            ["fr-be", "?"],
            ["de-be", "?"],
            ["en", "How many doses of the vaccine did you receive?"],
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
                    ["nl-be", "We willen onderzoeken hoeveel bescherming een volledige vaccinatie geeft."],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "We would like to be able to work out how much protection a complete vaccination scheme gives."],
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
                    ["nl-be", "Rapporteer het aantal dosissen die u reeds ontvangen heeft (dit komt overeen met het aantal keer dat u werd gevaccineerd voor COVID-19). "],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Report the number of doses you received (which corresponds to the number of time you were vaccinated against COVID-19 )."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Eén"],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "One"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Twee"],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Two"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Meer dan twee"],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "More than two"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet meer"],
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
 * DATE VACCINE 1: What is the date of the first vaccination
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
 const dateFirstVaccine = (parentKey: string, keyvac?: string, keyvaccineShots?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35d'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wanneer heeft u de eerste dosis van het vaccin ontvangen? "],
            ["fr-be", "?"],
            ["de-be", "?"],
            ["en", "When did you receive your first injection of vaccine against COVID-19? If you do not know the exact date, provide an estimate."],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '1'),
            expWithArgs('responseHasKeysAny', keyvaccineShots, [responseGroupKey, singleChoiceKey].join('.'), '1', '2', '3')
        )
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
                    ["nl-be", "Dit vertelt ons hoe de vaccinatie campgane wordt uitgevoerd. "],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Knowing when people are vaccinated tells us how well the vaccination program is being carried out."],
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
                    ["nl-be", "Gelieve zo correct mogelijk te antwoorden. Indien u de exacte datum niet meer weet, geef een zo goed mogelijke schatting van maand en jaar van de vaccinatie. "],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Please try and answer as accurately as possible. If you do not know the precise date, please give your best estimate of the month and year of vaccination."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

        // RESPONSE PART
        const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
        const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
            {
                key: '1', role: 'dateInput',
                optionProps: {
                    min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -86400*365) },
                    max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
                },
                description: new Map([
                    ["nl-be", "Kies een datum"],
                    ["fr-be", "Choisissez la date"],
                    ["de-be", "Datum auswählen"],
                    ["en", "Choose date"],
                ]),
            },
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl-be", "Ik weet het niet (meer)"],
                    ["fr-be", "Je ne sais pas (plus)"],
                    ["de-be", "Ich weiß es nicht (mehr)"],
                    ["en", "I don’t know/can’t remember"],
    
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
 * DATE VACCINE 2: What is the date of the second vaccination
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
 const dateSecondVaccine = (parentKey: string, keyVac?: string, keyVaccineShots?: string, keyDateFirstVaccine?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35e'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wanneer heeft u de tweede dosis van het vaccin ontvangen? "],
            ["fr-be", ""],
            ["de-be", ""],
            ["en", "When did you receive your second injection of vaccine against COVID-19? If you do not know the exact date, provide an estimate."],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyVac, [responseGroupKey, singleChoiceKey].join('.'), '1'),
            expWithArgs('responseHasKeysAny', keyVaccineShots, [responseGroupKey, singleChoiceKey].join('.'), '2', '3')
        )
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
                    ["nl-be", "Dit vertelt ons hoe de vaccinatie campgane wordt uitgevoerd. "],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Knowing when people are vaccinated tells us how well the vaccination program is being carried out."],
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
                    ["nl-be", "Gelieve zo correct mogelijk te antwoorden. Indien u de exacte datum niet meer weet, geef een zo goed mogelijke schatting van maand en jaar van de vaccinatie. "],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Please try and answer as accurately as possible. If you do not know the precise date, please give your best estimate of the month and year of vaccination."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'dateInput',
            optionProps: {
                min: {
                    dtype: 'exp', exp: {
                        name: 'getAttribute',
                        data: [
                            { dtype: 'exp', exp: expWithArgs('getResponseItem', keyDateFirstVaccine, [singleChoiceKey, '1'].join('.')) },
                            { str: 'value', dtype: 'str' }
                        ],
                        returnType: 'int',
                    }
                },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
            content: new Map([
                ["nl-be", "Kies een datum"],
                ["fr-be", "Choisissez une date."],
                ["de-be", "Wählen Sie das Datum"],
                ["en", "Choose date"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
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
            ["nl-be", "Heeft u ernstige nevenwerkingen ondervonden van deze vaccinatie? Indien ja, selecteer maximaal 3 opties die het meest van toepassing zijn."],
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
                    ["nl-be", "We willen onderzoeken welke neveneffecten mensen ervaren na een COVID-19 vaccinatie. "],
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
                    ["nl-be", "Gelieve de neveneffecten aan te duiden die het meest van toepassing zijn voor u. "],
                    ["fr-be", ""],
                    ["de-be", ""],
                    ["en", "Please select up to 3 side effects that you experienced after COVID-19 vaccination."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Geen"],
                ["fr-be", ""],
                ["de-be", ""],
                ["en", "None"],
            ])
        },
        {
            key: 'GCS1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Allergische reactie"],
                ["fr-be", "Réaction allergique"],
                ["de-be", "Allergische Reaktion"],
                ["en", "Allergic reaction"],
            ])
        },
        {
            key: 'GCS4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hevige allergische reactie (met medische interventie)"],
                ["fr-be", "Réaction allergique grave (avec intervention médicale)"],
                ["de-be", "Schwere allergische Reaktion (mit medizinischer Intervention)"],
                ["en", "Severe allergic reaction (with medical intervention)"],
            ])
        },
        {
            key: 'GCS2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Diarree"],
                ["fr-be", "Diarrhée"],
                ["de-be", "Durchfall"],
                ["en", "Diarrhea"],
            ])
        },
        {
            key: 'GCS3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Gevoel van koorts (niet gemeten)"],
                ["fr-be", "Sensation de fièvre (non mesurée)"],
                ["de-be", "Gefühl von Fieber (nicht gemessen)"],
                ["en", "Feeling of being feverish (not measured)"],
            ])
        },
        {
            key: 'GCS6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koorts boven de 38°c (gemeten)"],
                ["fr-be", "Fièvre (mesurée et supérieure à 38°C)"],
                ["de-be", "Fieber (gemessen und über 38°C)"],
                ["en", "Fever (measured and above 38°C)"],
            ])
        },
        {
            key: 'GCS5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoofdpijn"],
                ["fr-be", "Maux de tête"],
                ["de-be", "Kopfschmerzen"],
                ["en", "Headache"],
            ])
        },
        {
            key: 'GCS7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Kortademigheid"],
                ["fr-be", "L'essouflement"],
                ["de-be", "Kurzatmigkeit"],
                ["en", "Shortness of breath"],
            ])
        },
        {
            key: 'GCS8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Misselijkheid of braken"],
                ["fr-be", "Des nausées ou des vommissements"],
                ["de-be", "Übelkeit oder Erbrechen"],
                ["en", "Nausea or vomiting"],
            ])
        },
        {
            key: 'GCS9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Moeheid"],
                ["fr-be", "La fatigue"],
                ["de-be", "Müdigkeit"],
                ["en", "Tiredness"],
            ])
        },
        {
            key: 'GCS10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Pijn ter hoogte van borst of maag"],
                ["fr-be", "Des douleurs à la hauteur de la poitrine ou de l'estomac"],
                ["de-be", "Schmerzen in Höhe der Brust oder des Magens"],
                ["en", "Chest or stomach pain"],
            ])
        },
        {
            key: 'GCS11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Pijnlijke en/of gezwollen plek op de arm die geprikt is"],
                ["fr-be", "Un endroit douloureur et/ou enflé sur le bras qui a été piqué"],
                ["de-be", "Schmerzhafte und/ oder geschwollene Stelle an dem Arm, an dem geimpft wurde"],
                ["en", "Painful and/or swollen arm at the vaccination site"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Gewrichtspijn"],
                ["fr-be", "Des douleurs musculaires, articulaires"],
                ["de-be", "Muskelschmerzen, Gelenkschmerzen"],
                ["en", "Muscle or joint pain"],
            ])
        },
        {
            key: 'GCS14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Zwelling of koud aanvoelen van een arm of been"],
                ["fr-be", "Un gonflement ou une sensation de froid dans un bras ou une jambe"],
                ["de-be", "Schwellung oder kaltes Gefühl in einem Arm oder Bein"],
                ["en", "Swelling or cold feeling in arm or leg"],
            ])
        },
        {
            key: 'GCS15', role: 'input',
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