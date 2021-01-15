import { Survey, SurveyItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { WeeklyQuestions as InfluenzanetWeekly } from "../common_question_pool/influenzanet-weekly";
import { initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";

const weekly = (): Survey | undefined => {
    const surveyKey = 'weekly';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["nl", "Wekelijkse vragenlijst"],
            ["nl-be", "Wekelijkse vragenlijst"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Survey about your health status in the last week."],
            ["nl", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
            ["nl-be", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "15 seconds to 3 minutes, depending on your symptoms."],
            ["nl", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
            ["nl-be", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
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

    // Symptoms
    const Q_symptoms = symptomps(rootKey, true);
    survey.addExistingSurveyItem(Q_symptoms, rootKey);

    // Q1_3BE COVID-19 test
    const Q_covidTest = covidTest(rootKey, true);
    survey.addExistingSurveyItem(Q_covidTest, rootKey);

    // Q1_4BE reason test
    const Q_reasonTest= reasonTest(rootKey, Q_covidTest.key, true);
    survey.addExistingSurveyItem(Q_reasonTest, rootKey);

    // Qcov16c_BE date test
    const Q_dateTest= dateTest(rootKey, Q_covidTest.key, true);
    survey.addExistingSurveyItem(Q_dateTest, rootKey);

    //Qcov16d_BE duration test result
    const Q_durationTest= durationTest(rootKey,Q_reasonTest.key,true)
    survey.addExistingSurveyItem(Q_durationTest, rootKey);

    // // -------> HAS SYMPTOMS GROUP
    // const hasSymptomGroup = InfluenzanetWeekly.hasSymptomsGroup(rootKey, Q_symptoms.key);
    // survey.addExistingSurveyItem(hasSymptomGroup, rootKey);
    // const hasSymptomGroupKey = hasSymptomGroup.key;

    // // Q2 same illnes --------------------------------------
    // const Q_same_illnes = InfluenzanetWeekly.sameIllnes(hasSymptomGroupKey, true);
    // survey.addExistingSurveyItem(Q_same_illnes, hasSymptomGroupKey);
    // // Q3 when first symptoms --------------------------------------
    // const Q_symptomStart = InfluenzanetWeekly.symptomsStart(hasSymptomGroupKey, Q_same_illnes.key, true);
    // survey.addExistingSurveyItem(Q_symptomStart, hasSymptomGroupKey);

    // // Q4 when symptoms end --------------------------------------
    // const Q_symptomsEnd = InfluenzanetWeekly.symptomsEnd(hasSymptomGroupKey, Q_symptomStart.key, true);
    // survey.addExistingSurveyItem(Q_symptomsEnd, hasSymptomGroupKey);

    // // Q5 symptoms developed suddenly --------------------------------------
    // const Q_symptomsSuddenlyDeveloped = InfluenzanetWeekly.symptomsSuddenlyDeveloped(hasSymptomGroupKey, true);
    // survey.addExistingSurveyItem(Q_symptomsSuddenlyDeveloped, hasSymptomGroupKey);

    // // ----> fever group  - 4 questions
    // const feverGroup = InfluenzanetWeekly.feverGroup.all(hasSymptomGroupKey, Q_symptoms.key, true);
    // survey.addExistingSurveyItem(feverGroup, hasSymptomGroupKey);

    // // Q7 visited medical service --------------------------------------
    // const Q_visitedMedicalService = InfluenzanetWeekly.visitedMedicalService(hasSymptomGroupKey, true);
    // survey.addExistingSurveyItem(Q_visitedMedicalService, hasSymptomGroupKey);

    // // Q7a visited GP practice --------------------------------------
    // const Q_visitedGPPractice = InfluenzanetWeekly.visitedGP(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    // survey.addExistingSurveyItem(Q_visitedGPPractice, hasSymptomGroupKey);

    // // Q7b how soon visited medical service --------------------------------------
    // const Q_visitedMedicalServiceWhen = InfluenzanetWeekly.visitedMedicalServiceWhen(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    // survey.addExistingSurveyItem(Q_visitedMedicalServiceWhen, hasSymptomGroupKey);

    // // Q9 took medication --------------------------------------
    // const Q_tookMedication = InfluenzanetWeekly.tookMedication(hasSymptomGroupKey, true);
    // survey.addExistingSurveyItem(Q_tookMedication, hasSymptomGroupKey);

    // // Q9b how soon after symptoms taking antivirals --------------------------------------
    // const Q_whenAntivirals = InfluenzanetWeekly.whenAntivirals(hasSymptomGroupKey, Q_tookMedication.key, true);
    // survey.addExistingSurveyItem(Q_whenAntivirals, hasSymptomGroupKey);

    // // Q11 think cause of symptoms --------------------------------------
    // const Q_causeOfSymptoms = InfluenzanetWeekly.causeOfSymptoms(hasSymptomGroupKey, true);
    // survey.addExistingSurveyItem(Q_causeOfSymptoms, hasSymptomGroupKey);

    return survey.getSurvey();
}

export default weekly;

/**
 * SYMPTOMS: multiple choice question about allergies
 * TO DO: add open text field for option 'Andere'
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const symptomps = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q1'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Had u sinds de vorige vragenlijst één of meerdere van deze klachten/symptomen (of in de afgelopen 7 dagen indien dit uw eerste bezoek is)?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Het belangrijkste onderdeel van deze enquête is het opvolgen van de door u gerapporteerde symptomen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Voor mensen met chronische (langdurige) ziekten, vink alleen veranderingen in symptomen aan. Dus als u bijvoorbeeld chronische kortademigheid heeft, vink dit vakje dan alleen aan als dit recentelijk erger is geworden."],
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
                ['nl-be', 'Meerdere antwoorden mogelijk'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "Nee, geen van deze symptomen/klachten"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koorts"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koude rillingen"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Loopneus of verstopte neus"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ['nl-be', "Niezen"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Keelpijn"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoesten"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Kortademig (snel buiten adem)"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoofdpijn"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Pijn op de borst"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Vermoeid en lamlendig (algehele malaise)"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verminderde eetlust"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verkleurd slijm ophoesten"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Waterige of bloeddoorlopen ogen"],
            ])
        },
        {
            key: '15', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Misselijkheid"],
            ])
        },
        {
            key: '16', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Overgeven/braken"],
            ])
        },
        {
            key: '17', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Diarree"],
            ])
        },
        {
            key: '18', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Buikpijn"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Huiduitslag"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl", "Verlies van smaak"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl", "Bloedneus"],
            ])
        },
        {
            key: '23', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl", "Verlies van geur"],
            ])
        },
        {
            key: '24', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl", "Verwardheid"],
            ])
        },
        {
            key: '19', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl", "Andere"],
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
 * TEST COVID-19: single choice question about COVID-19  test
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covidTest = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q1_3BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u sinds de vorige vragenlijst een COVID-19 test laten uitvoeren (of in de afgelopen 7 dagen indien dit uw eerste bezoek is)?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten hoe COVID-19 zich verspreidt in de bevolking."],
                ]),
                //style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "Ja"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet (meer)"],
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
 * REASON COVID-19 test: single choice question about COVID-19  test
 * TO DO: Add free text field for option 6 'Andere'
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const reasonTest = (parentKey: string, keycovidTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q1_4BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat was de reden dat u een COVID-19 test liet uitvoeren?"],
        ]))
    );

    // CONDITION
    if (keycovidTest) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keycovidTest, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord zo precies mogelijk."],
                ]),
                //style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "Enkel vanwege mijn symptomen"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege symptomen of een positieve test bij één van mijn huisgenoten"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege symptomen of een positieve test bij één van mijn contacten buitenshuis"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn terugkeer uit een risicogebied (ik had geen symptomen)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn deelname aan een risico-activiteit (vliegreis, evenement, ...) (ik had geen symptomen)"],
             ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn beroep (ik had geen symptomen)"],
             ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
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
 * DATE COVID-19 test: date COVID-19 test
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dateTest = (parentKey: string, keycovidTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov16c_BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wanneer heeft u een test laten uitvoeren voor COVID-19? Als u de datum niet meer precies weet, mag u deze schatten."],
        ]))
    );

    // CONDITION
    if (keycovidTest) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keycovidTest, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    //

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            description: new Map([
                ["nl-be", "Kies datum"],
            ]),
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
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
 * DURATION COVID-19 test: duration untill COVID-19 test result
 * TO DO: Option 1 program as dropdown 'number of days'
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const durationTest = (parentKey: string, keyreasonTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov16d_BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoe snel na de start van uw symptomen/klachten heeft u een COVID-19 test kunnen laten uitvoeren?"],
        ]))
    );

    // CONDITION
    if (keyreasonTest) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyreasonTest, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen onderzoeken hoeveel tijd er gaat tussen de ontwikkeling van de symptomen en het moment dat een persoon zich laat of kan laten testen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Maak een zo goed mogelijke inschatting."],
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
                ["nl-be", "Dropdown (dagen)"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
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