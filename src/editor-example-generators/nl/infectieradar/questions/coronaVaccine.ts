import { SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../../../editor-engine/survey-editor/item-editor";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { initMultipleChoiceGroup, initSingleChoiceGroup } from "../../../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../../../editor-engine/utils/simple-generators";
import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../../../common_question_pool/key-definitions";


/**
 * CORONA VACCINE: single choice question
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param key key of this item (e.g. Q2)
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const coronavaccine = (parentKey: string, key: string, isRequired?: boolean): SurveyItem => {
    const itemKey = [parentKey, key].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you receive a vaccination against corona since the last survey?"],
            ["nl", "Heb je sinds de vorige vragenlijst een vaccinatie ontvangen tegen het coronavirus?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why do we ask this question?"],
                    ["nl", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To create an overview of how many participants are vaccinated"],
                    ["nl", "Om een overzicht te krijgen hoeveel mensen binnen infectieradar al gevaccineerd zijn"],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should you answer this question?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please indicate whether you are vaccinated."],
                    ["nl", "Geef aan of je sinds het invullen van de vorige vragenlijst een vaccinatie gehad hebt.  Wij onthouden de antwoorden  uit eerdere vragenlijsten en weten dus zo of je al gevaccineerd bent. Vul 'nee' in wanneer je sinds het invullen van de vorige vragenlijst geen nieuwe vaccinatie hebt gehad, maar al wel een of twee keer gevaccineerd bent."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["nl", "Nee"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No, I have been invited and are planning to go"],
                ["nl", "Nee, ik ben sinds de vorige vragenlijst wel uitgenodigd voor vaccinatie en ben van plan om nog te gaan"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "No, I have been invited, but refuse to go"],
                ["nl", "Nee, ik ben sinds de vorige vragenlijst wel uitgenodigd, maar ik ben van plan om NIET te gaan"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, I have been vaccinated for the first time against the coronavirus"],
                ["nl", "Ja, ik heb sinds de vorige vragenlijst een eerste vaccinatie ontvangen tegen het coronavirus"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Yes, I have been vaccinated for the second time against the coronavirus"],
                ["nl", "Ja, ik heb sinds de vorige vragenlijst een tweede vaccinatie ontvangen tegen het coronavirus"],
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
 * CORONA VACCINE WHEN: single choice question
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param key key of this item (e.g. Q2)
 * @param keyCoronaVaccination reference to the question if you are vaccinated
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const coronavaccineWhen = (parentKey: string, key: string, keyCoronaVaccination: string, isRequired?: boolean): SurveyItem => {
    const itemKey = [parentKey, key].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "At what date did you get your vaccination? Please guess if you can't remember the date exactly."],
            ["nl", "Wat is de datum waarop je bent gevaccineerd? Als je de datum niet meer precies weet mag je deze schatten."],
        ]))
    );

    // CONDITION
    editor.setCondition(
        CommonExpressions.singleChoiceOptionsSelected(keyCoronaVaccination, '3', '4')
    )

    // INFO POPUP
    // none

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        key: '0', role: 'dateInput',
        properties: {
            min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -7776000) },
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
        },
        content: generateLocStrings(new Map([
            ["en", "Choose date"],
            ["nl", "Kies de dag"],
        ]))
    }, rg?.key);

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
 * CORONA VACCINE WHICH: single choice question
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param key key of this item (e.g. Q2)
 * @param keyCoronaVaccination reference to the question if you are vaccinated
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const coronavaccineWhich = (parentKey: string, key: string, keyCoronaVaccination: string, isRequired?: boolean): SurveyItem => {
    const itemKey = [parentKey, key].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "With which vaccin are you vaccinated?"],
            ["nl", "Met welk vaccin ben je gevaccineerd?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', [keyCoronaVaccination].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '3', '4')
    )

    // INFO POPUP
    // none

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "BioNTech/Pfizer"],
                ["nl", "BioNTech/Pfizer"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Moderna"],
                ["nl", "Moderna"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "AstraZeneca"],
                ["nl", "AstraZeneca"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "CureVac"],
                ["nl", "CureVac"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Janssen"],
                ["nl", "Janssen"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Sanofi"],
                ["nl", "Sanofi"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["nl", "Weet ik niet"],
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
 * CORONA VACCINE REASON AGAINTS: multiple choice question
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param key key of this item (e.g. Q2c)
 * @param keyCoronaVaccination reference to the vaccination question to apply the dependency.
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const coronavaccineReasonAgainst = (parentKey: string, key: string, keyCoronaVaccination: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = [parentKey, key].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for NOT getting a coronavirus vaccination?"],
            ["nl", "Wat zijn voor jouw de belangrijkste redenen om geen vaccin tegen het coronavirus te halen?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyCoronaVaccination, [responseGroupKey, singleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to know why some people get vaccinated and others do not."],
                    ["nl", "We willen graag onderzoeken waarom sommige mensen zich wel laten vaccineren en anderen niet."],
                    ["fr", "Nous aimerions savoir pourquoi certaines personnes se font vacciner et d'autres pas."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick all those reasons that were important in your decision."],
                    ["nl", "Geef alle redenen aan die een rol spelen in de beslissing."],
                    ["fr", "Cochez toutes les raisons qui ont influencé votre décision."],
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
                ['en', 'Select all options that apply'],
                ['nl', 'Meerdere antwoorden mogelijk'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I have already had corona"],
                ["nl", "Ik heb al corona gehad"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't belong to a risk group"],
                ["nl", "Ik behoor niet tot een risicogroep"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I believe the vaccine is too new"],
                ["nl", "Ik vind het vaccin te nieuw"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I am afraid of possible side-effects"],
                ["nl", "Ik ben bang voor mogelijke bijwerkingen (op lange of korte termijn)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I don't like vaccinations"],
                ["nl", "Ik hou niet van het krijgen van vaccinaties"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I doubt the effectiveness of the coronavaccine"],
                ["nl", "Ik twijfel aan de werking van het coronavaccin"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Other reason(s)"],
                ["nl", "Andere reden"],
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





export const CoronaVaccineQuestions = {
    coronavaccine,
    coronavaccineWhen,
    coronavaccineWhich,
    coronavaccineReasonAgainst,
}
