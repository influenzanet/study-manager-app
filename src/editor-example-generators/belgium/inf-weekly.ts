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
            ["nl-be", "Wekelijkse vragenlijst"],
            ["fr-be",""],
            ["de-be",""],
            ["en-be",""],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["nl-be", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
            ["fr-be",""],
            ["de-be",""],
            ["en-be",""],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["nl-be", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
            ["fr-be",""],
            ["de-be",""],
            ["en-be",""],
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

    // Symptoms Q_BE_1
    const Q_symptoms = symptomps(rootKey, true);
    survey.addExistingSurveyItem(Q_symptoms, rootKey);

    // Q_BE_1_3 COVID-19 test
    const Q_covidTest = covidTest(rootKey, true);
    survey.addExistingSurveyItem(Q_covidTest, rootKey);

    // Q_BE_1_4 reason test
    const Q_reasonTest= reasonTest(rootKey, Q_covidTest.key, true);
    survey.addExistingSurveyItem(Q_reasonTest, rootKey);

    // Q_BE_1_5 date test
    const Q_dateTest= dateTest(rootKey, Q_covidTest.key, true);
    survey.addExistingSurveyItem(Q_dateTest, rootKey);

    //Q_BE_cov16e duration untill test
    const Q_durationTest= durationTest(rootKey,Q_reasonTest.key,true)
    survey.addExistingSurveyItem(Q_durationTest, rootKey);

    //Qcov_BE_16b test result
    const Q_resultTest= resultTest(rootKey,Q_covidTest.key,true)
    survey.addExistingSurveyItem(Q_resultTest, rootKey);

    //Q_BE_cov16d duration untill test result
    const Q_durationTestResult= durationTestResult(rootKey,Q_resultTest.key,true)
    survey.addExistingSurveyItem(Q_durationTestResult, rootKey);

    // // -------> HAS SYMPTOMS GROUP
    const hasSymptomGroup = InfluenzanetWeekly.hasSymptomsGroup(rootKey, Q_symptoms.key);
    survey.addExistingSurveyItem(hasSymptomGroup, rootKey);
    const hasSymptomGroupKey = hasSymptomGroup.key;

    // // Q2 same illnes --------------------------------------
    const Q_same_illnes = InfluenzanetWeekly.sameIllnes(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_same_illnes, hasSymptomGroupKey);
    
    // // Q3 when first symptoms --------------------------------------
    const Q_symptomStart = InfluenzanetWeekly.symptomsStart(hasSymptomGroupKey, Q_same_illnes.key, true);
    survey.addExistingSurveyItem(Q_symptomStart, hasSymptomGroupKey);

    // // Qcov3 contact COVID-19--------------------------------------
    const Q_contactCOVID = contactCOVID(hasSymptomGroupKey, Q_same_illnes.key, true);
    survey.addExistingSurveyItem(Q_contactCOVID, hasSymptomGroupKey);   

    // // Q4 when symptoms end --------------------------------------
    const Q_symptomsEnd = InfluenzanetWeekly.symptomsEnd(hasSymptomGroupKey, Q_symptomStart.key, true);
    survey.addExistingSurveyItem(Q_symptomsEnd, hasSymptomGroupKey);

    // // Q5 symptoms developed suddenly --------------------------------------
    const Q_symptomsSuddenlyDeveloped = InfluenzanetWeekly.symptomsSuddenlyDeveloped(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_symptomsSuddenlyDeveloped, hasSymptomGroupKey);

    // // ----> fever group  - 4 questions
    const feverGroup = InfluenzanetWeekly.feverGroup.all(hasSymptomGroupKey, Q_symptoms.key, true);
    survey.addExistingSurveyItem(feverGroup, hasSymptomGroupKey);

    // // Q7_BE visited medical service --------------------------------------
    const Q_visitedMedicalService = visitedMedicalService(hasSymptomGroupKey, true);
    survey.addExistingSurveyItem(Q_visitedMedicalService, hasSymptomGroupKey);

    // // Q7a visited GP practice --------------------------------------
    // const Q_visitedGPPractice = InfluenzanetWeekly.visitedGP(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    // survey.addExistingSurveyItem(Q_visitedGPPractice, hasSymptomGroupKey);

    // // Q7b how soon visited medical service --------------------------------------
    const Q_visitedMedicalServiceWhen = visitedMedicalServiceWhen(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    survey.addExistingSurveyItem(Q_visitedMedicalServiceWhen, hasSymptomGroupKey);

    // // Q7c reasons no medical services
    const Q_visitedNoMedicalService = visitedNoMedicalService(hasSymptomGroupKey, Q_visitedMedicalService.key, true);
    survey.addExistingSurveyItem(Q_visitedNoMedicalService, hasSymptomGroupKey);

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
 * SYMPTOMS: multiple choice question about symptoms
 * TO DO: ADD description in multiple languages
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const symptomps = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_1'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Had u sinds de vorige vragenlijst één of meerdere van deze klachten/symptomen (of in de afgelopen 7 dagen indien dit uw eerste bezoek is)?"],
            ["fr-be","Depuis le dernier questionnaire, avez-vous ressenti un ou plusieurs des troubles médicaux / des symptômes détaillés ci-dessous ?"],
            ["de-be","Hatten Sie seit der vorigen Fragenliste eines oder mehrere dieser Beschwerden/Symptome (oder in den vergangenen 7 Tagen, wenn dieser Ihr erster Besuch ist)?"],
            ["en-be","Have you had any of the following symptoms since your last visit (or in the past week, if this is your first visit)?"],
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
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be","Het belangrijkste onderdeel van deze enquête is het opvolgen van de door u gerapporteerde symptomen."],
                    ["fr-be","La partie la plus importante de cette enquête a trait au suivi des symptômes que vous avez signalés."],
                    ["de-be","Der wichtigste Teil dieser Umfrage ist das Verfolgen der von Ihnen gemeldeten Symptome."],
                    ["en-be","The most important part of this investigation is about following up on the symptoms you have reported."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be","Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be","Comment dois-je répondre à cette question?"],
                    ["de-be","Wie soll ich diese Frage beantworten?"],
                    ["en-be","How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Voor mensen met chronische (langdurige) ziekten, vink alleen veranderingen in symptomen aan. Dus als u bijvoorbeeld chronische kortademigheid heeft, vink dit vakje dan alleen aan als dit recentelijk erger is geworden."],
                    ["fr-be","Pour les personnes souffrant de maladies chroniques (de longue durée), ne cochez que les changements au niveau des symptômes. Ainsi, si vous souffrez d'un essoufflement chronique, ne cochez cette case que si ce symptôme s'est récemment aggravé. Plusieurs réponses sont possibles."],
                    ["de-be","Für Menschen mit chronischen (längeren) Krankheiten haken Sie bitte nur Veränderungen in Symptomen ab. Wenn Sie zum Beispiel Dus als u bijvoorbeeld chronische kortademigheid heeft, vink dit vakje dan alleen aan als dit recentelijk erger is geworden. Mehrere Antworten sind möglich."],
                    ["en-be","If you suffer from chronic illness, only indicate symptoms that have changed. For example, if you experience chronic shortness of breath, only mark this symptom if it has recently gotten worse. Multiple answers are possible."],
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
                ["fr-be","Plusieurs réponses sont possibles"],
                ["de-be","Mehrere Antworten möglich"],
                ["en-be","Multiple answers possible"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be","Nee, geen van deze symptomen/klachten"],
                ["fr-be","Non, aucun de ces symptômes / de ces troubles médicaux"],
                ["de-be","Nein, keines dieser Symptome/Beschwerden"],
                ["en-be","No symptoms"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koorts"],
                ["fr-be","De la fièvre"],
                ["de-be","Fieber"],
                ["en-be","Fever"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Koude rillingen"],
                ["fr-be","Des frissons"],
                ["de-be","Schüttelfrost"],
                ["en-be","Chills"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Loopneus of verstopte neus"],
                ["fr-be","Un nez qui coule ou un nez bouché"],
                ["de-be","Laufende oder verstopfte Nase"],
                ["en-be","Runny or blocked nose"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ['nl-be', "Niezen"],
                ["fr-be","Des éternuements"],
                ["de-be","Niesen"],
                ["en-be","Sneezing"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Keelpijn"],
                ["fr-be","Un mal de gorge"],
                ["de-be","Halsschmerzen"],
                ["en-be","Sore throat"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be","Hoesten"],
                ["fr-be","De la toux"],
                ["de-be","Husten"],
                ["en-be","Cough"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Kortademig (snel buiten adem)"],
                ["fr-be","Des difficultés respiratoires (rapidement à court de souffle)"],
                ["de-be","Kurzatmig (schnell außer Atem)"],
                ["en-be","Shortness of breath"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Hoofdpijn"],
                ["fr-be","Un mal de tête"],
                ["de-be","Kopfschmerzen"],
                ["en-be","Headache"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                ["fr-be","Des douleurs musculaires/articulaires (non liées au sport)"],
                ["de-be","Muskelschmerzen/Gelenkschmerzen (nicht mit Sport zusammenhängend)"],
                ["en-be","Muscle/joint pain"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Pijn op de borst"],
                ["fr-be","Des douleurs thoraciques"],
                ["de-be","Brustschmerzen"],
                ["en-be","Chest pain"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Vermoeid en lamlendig (algehele malaise)"],
                ["fr-be","Une sensation de fatigue et de léthargie (malaise général)"],
                ["de-be","Ermüdet und lendenlahm (allgemeines Unwohlsein)"],
                ["en-be","Feeling tired or exhausted (malaise)"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verminderde eetlust"],
                ["fr-be","Une perte d'appétit"],
                ["de-be","Verminderter Appetit"],
                ["en-be","Loss of appetite"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verkleurd slijm ophoesten"],
                ["fr-be","L’expectoration de mucus coloré"],
                ["de-be","Verfärbten Schleim aushusten"],
                ["en-be","Coloured sputum/phlegm"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Waterige of bloeddoorlopen ogen"],
                ["fr-be","Des yeux larmoyants ou rouges"],
                ["de-be","Wässrige oder blutunterlaufene Augen"],
                ["en-be","Watery, bloodshot eyes"],
            ])
        },
        {
            key: '15', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Misselijkheid"],
                ["fr-be","Des nausées"],
                ["de-be","Unpässlichkeit"],
                ["en-be","Nausea"],
            ])
        },
        {
            key: '16', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Overgeven/braken"],
                ["fr-be","Des envies de vomir / des vomissements"],
                ["de-be","Übergeben / Erbrechen"],
                ["en-be","Vomiting"],
            ])
        },
        {
            key: '17', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Diarree"],
                ["fr-be","De la diarrhée"],
                ["de-be","Durchfall (Diarrhö)"],
                ["en-be","Diarrhoea"],
            ])
        },
        {
            key: '18', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Buikpijn"],
                ["fr-be","Des douleurs abdominales"],
                ["de-be","Bauchschmerzen"],
                ["en-be","Stomach ache"],
            ])
        },
        {
            key: '23', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van geur"],
                ["fr-be","Une perte de l'odorat"],
                ["de-be","Geruchsverlust"],
                ["en-be","Loss of smell"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van smaak"],
                ["fr-be","Une perte du goût"],
                ["de-be","Geschmacksverlust"],
                ["en-be","Loss of taste"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Bloedneus"],
                ["fr-be","Un saignement de nez"],
                ["de-be","Nasenbluten"],
                ["en-be","Nose bleed"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Huiduitslag"],
                ["fr-be","Une éruption cutanée"],
                ["de-be","Hautausschlag"],
                ["en-be","Rash"],
            ])
        },
        {
            key: '24', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verwardheid"],
                ["fr-be","Un état confusionnel"],
                ["de-be","Verwirrtheit"],
                ["en-be","Confusion"],
            ])
        },
        {
            key: '19', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be","Autre"],
                ["de-be","Andere"],
                ["en-be","Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Décris (facultatif)"],
                ["de-be", "hier beschreiben (Optional)"],
                ["en-be", "Desribe here (optional)"],
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
    const defaultKey = 'Q_BE_1_3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u sinds de vorige vragenlijst een COVID-19 test laten uitvoeren (of in de afgelopen 7 dagen indien dit uw eerste bezoek is)?"],
            ["fr-be","Avez-vous passé un test de dépistage du coronavirus depuis le dernier questionnaire (ou au cours des 7 derniers jours s'il s'agit de votre première visite)?"],
            ["de-be","Haben Sie seit der vorigen Fragenliste einen COVID-19-Test durchführen lassen (oder in den vergangenen 7 Tagen, wenn dieser Ihr erster Besuch ist)?"],
            ["en-be","Have you been tested for coronavirus since the last questionnaire (or within the past 7 days if this is your first visit)?"],
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
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten hoe COVID-19 zich verspreidt in de bevolking."],
                    ["fr-be","Nous voulons savoir comment le coronavirus se propage au sein de la population."],
                    ["de-be","Wir möchten wissen, wie Covid-19 sich in der Bevölkerung verbreitet."],
                    ["en-be","We want to understand how the coronavirus is spreading within the population."],
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
                ["fr-be","Oui"],
                ["de-be","Ja"],
                ["en-be","Yes"],

            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be","Non"],
                ["de-be","Nein"],
                ["en-be","No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet (meer)"],
                ["fr-be","Je ne sais pas (plus)"],
                ["de-be","Ich weiß es nicht (mehr)"],
                ["en-be","I don’t know/can’t remember"],
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
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const reasonTest = (parentKey: string, keycovidTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q_BE_1_4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat was de reden dat u een COVID-19 test liet uitvoeren?"],
            ["fr-be","Pour quelle raison avez-vous effectué un test de dépistage du coronavirus?"],
            ["de-be","Was war der Grund dafür, dass Sie einen COVID-19-Test durchführen ließen?"],
            ["en-be","Why are you being tested for coronavirus?"],
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
                    ["nl-be","Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be","Comment dois-je répondre à cette question?"],
                    ["de-be","Wie soll ich diese Frage beantworten?"],
                    ["en-be","How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord zo precies mogelijk."],
                    ["fr-be","Répondez de la manière la plus précise possible."],
                    ["de-be","Bitte antworten Sie so genau wie möglich."],
                    ["en-be","Answer as precisely as possible."],
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
                ["fr-be","Uniquement en raison de mes symptômes"],
                ["de-be","Nur aufgrund meiner Symptome"],
                ["en-be","Solely because of my symptoms"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege symptomen of een positieve test bij één van mijn huisgenoten"],
                ["fr-be","En raison de symptômes ou d'un test positif auprès de l'une des personnes vivant avec moi"],
                ["de-be","Aufgrund von Symptomen oder einem positiven Test bei einem meiner Mitbewohner (Hausgenossen)"],
                ["en-be","Because a person who lives with me experienced symptoms or had a positive coronavirus test"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege symptomen of een positieve test bij één van mijn contacten buitenshuis"],
                ["fr-be","En raison de symptômes ou d'un test positif auprès de l'un de mes contacts extérieurs"],
                ["de-be","Aufgrund von Symptomen oder einem positiven Test bei einem meiner Kontakte außerhalb des Hauses"],
                ["en-be","Because one of my external contacts experienced symptoms or had a positive coronavirus test"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn terugkeer uit een risicogebied (ik had geen symptomen)"],
                ["fr-be","En raison de mon retour d'une zone à risque (je ne présentais pas de symptômes)"],
                ["de-be","Aufgrund meiner Rückkehr aus einem Risikogebiet (ich hatte keine Symptome)"],
                ["en-be","Because I returned from a risk area (I do not have any symptoms) "],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn deelname aan een risico-activiteit (vliegreis, evenement, ...) (ik had geen symptomen)"],
                ["fr-be","En raison de ma participation à une activité à risque (un voyage en avion, un événement, etc.) (je ne présentais aucun symptôme)"],
                ["de-be","Aufgrund meiner Teilnahme an einer Risiko-Aktivität (Flugreise, Veranstaltung, Event usw.) (ich hatte keine Symptome)"],
                ["en-be","Because I took part in a high-risk activity (a plane trip, an event, etc.) (I do not have any symptoms) "],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Vanwege mijn beroep (ik had geen symptomen)"],
                ["fr-be","En raison de ma profession (je ne présentais pas de symptômes) "],
                ["de-be","Aufgrund meines Berufs (ich hatte keine Symptome)"],
                ["en-be","Because of my profession (I do not have any symptoms) "],
            ])
        },
        {
            key: '6', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be","Autre"],
                ["de-be","Andere"],
                ["en-be","Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Décris (facultatif)"],
                ["de-be", "hier beschreiben (Optional)"],
                ["en-be", "Desribe here (optional)"],
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
    const defaultKey = 'Q_BE_1_5'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wanneer heeft u een test laten uitvoeren voor COVID-19? Als u de datum niet meer precies weet, mag u deze schatten."],
            ["fr-be","Quand avez-vous fait réaliser un test de dépistage du coronavirus? Si vous ne vous souvenez pas (plus) de la date exacte, vous pouvez l'estimer."],
            ["de-be","Wann haben Sie einen Test auf COVID-19 durchführen lassen? Wenn Sie das Datum nicht mehr genau wissen, dürfen Sie es schätzen."],
            ["en-be","When did you get tested for the coronavirus? If you don't remember the exact date, please give an estimate."],
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
            key: '0', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            description: new Map([
                ["nl-be", "Kies datum"],
                ["fr-be","Choisissez la date"],
                ["de-be","Datum auswählen"],
                ["en-be","Choose date"],
            ]),
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be","Je ne sais pas (plus)"],
                ["de-be","Ich weiß es nicht (mehr)"],
                ["en-be","I don’t know/can’t remember"],

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
 * DURATION COVID-19 TEST: duration untill COVID-19 test
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
            ["fr-be","Combien de temps après le début de vos symptômes/plaintes avez-vous pu passer un test de dépistage du coronavirus?"],
            ["de-be","Wie schnell nach dem Beginn Ihrer Symptome/Beschwerden konnten Sie einen COVID-19-Test durchführen lassen?"],
            ["en-be","How long after the onset of your symptoms / complaints were you able to get tested for coronavirus?"],
        ]))
    );

    // CONDITION
    if (keyreasonTest) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyreasonTest, [responseGroupKey, singleChoiceKey].join('.'), '0','1','2')
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
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen onderzoeken hoeveel tijd er gaat tussen de ontwikkeling van de symptomen en het moment dat een persoon zich laat of kan laten testen."],
                    ["fr-be","Nous voulons savoir combien de temps s'écoule entre l'apparition des symptômes et le moment où une personne se fait ou peut se faire tester."],
                    ["de-be","Wir möchten untersuchen, wieviel Zeit zwischen der Entwicklung der Symptome und dem Moment vergeht, in dem eine Person sich testen lässt oder testen lassen kann."],
                    ["en-be","We want to know how much time elapses between the onset of symptoms and the moment a person is or can get tested."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be","Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be","Comment dois-je répondre à cette question?"],
                    ["de-be","Wie soll ich diese Frage beantworten?"],
                    ["en-be","How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Maak een zo goed mogelijke inschatting."],
                    ["fr-be","Faites une estimation de la manière la plus précise possible."],
                    ["de-be","Nehmen Sie eine bestmögliche Einschätzung vor."],
                    ["en-be","Please provide as precise an estimate as possible."],
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
                ["fr-be","Menu déroulant (jours)"],
                ["de-be","Dropdown (Tage)"],
                ["en-be","Dropdown menu (days)"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be","Je ne sais pas (plus)"],
                ["de-be","Ich weiß es nicht (mehr)"],
                ["en-be","I don’t know/can’t remember"],

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
 * RESULT COVID-19 TEST: result COVID-19 test
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const resultTest = (parentKey: string, keycovidTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov_BE_16b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u de COVID-19 testresultaten reeds ontvangen?"],
            ["fr-be","Avez-vous déjà reçu les résultats du test de dépistage du coronavirus ?"],
            ["de-be","Haben Sie die COVID-19-Testergebnisse bereits erhalten?"],
            ["en-be","Have you received the results of your coronavirus test?"],
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
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten hoe COVID-19 zich verspreidt in de bevolking."],
                    ["fr-be","Nous voulons savoir comment le coronavirus se propage au sein de la population."],
                    ["de-be","Wir möchten wissen, wie COVID-19 sich in der Bevölkerung ausbreitet."],
                    ["en-be","We want to understand how the coronavirus is spreading within the population."],
                ]),
                //style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, positief voor COVID-19"],
                ["fr-be","Oui, positif au coronavirus"],
                ["de-be","Ja, positiv auf COVID-19"],
                ["en-be","Yes, the test is positive for coronavirus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ja, negatief voor COVID-19"],
                ["fr-be","Oui, négatif au coronavirus"],
                ["de-be","Ja, negativ auf COVID-19"],
                ["en-be","Yes, the test is negative for coronavirus"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ja, niet-interpreteerbaar resultaat"],
                ["fr-be","Oui, résultat non interprétable"],
                ["de-be","Ja, nicht interpretierbares Ergebnis"],
                ["en-be","Yes, the results are inconclusive"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik heb nog geen testresultaat"],
                ["fr-be","Non, je n'ai pas encore reçu le résultat du test"],
                ["de-be","Nein, ich habe noch kein Testergebnis"],
                ["en-be","No, I have not yet received the test results"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Dat wil ik niet aangeven"],
                ["fr-be","Je ne préfère ne pas le spécifier"],
                ["de-be","Das möchte ich nicht angeben"],
                ["en-be","I prefer not to specify"],
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
 * DURATION COVID-19 TEST RESULT: duration untill COVID-19 test result
 * TO DO: Add dropdown menu for 1 day or more
 * TO DO: question fails
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const durationTestResult = (parentKey: string, keyresultTest?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
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
    //if (keyresultTest) {
    //    editor.setCondition(
    //       expWithArgs('responseHasKeysAny', keyresultTest, [responseGroupKey, singleChoiceKey].join('.'), '1','2','3')
    //   );
    //}

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen onderzoeken hoeveel tijd er gaat tussen het afnemen van een COVID-19 test en het ontvangen van het testresultaat."],
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
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Op dezelfde dag"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Dropdown menu"],
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
 * CONTACT COVID-19: contact with other people with COVID-19
 * TO DO: Condition does not work
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySameIllnes reference to same illnes question
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const contactCOVID = (parentKey: string, keySameIllnes: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "In de 14 dagen voor de start van uw symptomen, bent u in nauw contact geweest met één of meerdere personen die een positieve test hadden voor COVID-19 (deze persoon kan al dan niet symptomen vertonen)?"],

        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('not', expWithArgs('responseHasKeysAny', keySameIllnes, [responseGroupKey, singleChoiceKey].join('.'), '0'))
    );


    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te onderzoeken hoe COVID-19 zich verspreidt in de algemene bevolking."],
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
 * VISITED MEDICAL SERVICE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedMedicalService = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q7_BE';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
                 ["nl-be","Heeft u medische hulp gezocht vanwege uw symptomen/klachten? En zo ja, waar? (meerdere antwoorden mogelijk)"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be","Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
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
                    ["nl-be", "Selecteer alle relevante vormen van medische hulp die u heeft bezocht. Wanneer u nog niet bent geweest maar wel een afspraak heeft gemaakt, selecteer dan de laaste optie."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Nee, ik heb geen medische hulp gezocht"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, fysiek bij de huisarts of huisarts assistent"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, fysiek bij de spoedafdeling van het ziekenhuis"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, fysiek bij de huisartsenwachtpost"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, maar enkel telefonisch of via e-mail contact met huisdokter, receptioniste, verpleger/verpleegster"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, ik ben opgenomen in het ziekenhuis"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ja, ik heb andere medische hulp gezocht"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Nog niet, maar ik heb een afspraak gemaakt"],
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
 * WHEN VISITED MEDICAL SERVICE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ: reference to quesiton if visited any medical service
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedMedicalServiceWhen = (parentKey: string, keyVisitedMedicalServ: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q7b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be","Hoe snel na de start van uw symptomen/klachten heeft u voor de EERSTE keer medische hulp gezocht?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasOnlyKeysOtherThan', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0', '5')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be","Om uit te zoeken hoe snel mensen met klachten worden gezien door een medische hulpverlener/specialist."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be","Hoe moet ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be","Geef alleen het aantal dagen van het begin van de klachten tot uw EERSTE bezoek aan de desbetreffende medische hulpverlener/specialist."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Selecteer het juiste aantal dagen'],
            ])),
    }, rg?.key);
    const ddOptions: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup', items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["nl-be", "Op dezelfde dag als de eerste klachten"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["nl-be", "1 dag"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["nl-be", "2 dagen"],

                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["nl-be", "3 dagen"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["nl-be", "4 dagen"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["nl-be", "5 dagen"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["nl-be", "6 dagen"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["nl-be", "7 dagen"],
                ]),
            },
            {
                key: '8', role: 'option', content: new Map([
                    ["nl-be", "8 dagen"],
                ]),
            },
            {
                key: '9', role: 'option', content: new Map([
                    ["nl-be", "9 dagen"],
                ]),
            },
            {
                key: '10', role: 'option', content: new Map([
                    ["nl-be", "10 dagen"],
                ]),
            },
            {
                key: '11', role: 'option', content: new Map([
                    ["nl-be", "11 dagen"],
                ]),
            },
            {
                key: '12', role: 'option', content: new Map([
                    ["nl-be", "12 dagen"],
                ]),
            },
            {
                key: '13', role: 'option', content: new Map([
                    ["nl-be", "13 dagen"],
                ]),
            },
            {
                key: '14', role: 'option', content: new Map([
                    ["nl-be", "14 dagen"],
                ]),
            },
            {
                key: '15', role: 'option', content: new Map([
                    ["nl-be", "meer dan 14 dagen"],
                ]),
            },
            {
                key: '16', role: 'option', content: new Map([
                    ["nl", "Ik weet het niet (meer)"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["nl-be", "Medische hulp"],
                    ]),
                },
                {
                    key: 'col1', role: 'text'
                },
            ]
        },
        {
            key: 'r1', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Fysiek bij de huisarts of huisarts assistent"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '1')
        },
        {
            key: 'r2', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Fysiek bij de spoedafdeling van het ziekenhuis"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '3')
        },
        {
            key: 'r6', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Fysiek bij de huisartsenwachtpost"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '6')
        },
        {
            key: 'r7', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Telefonisch of via e-mail contact met huisdokter, receptioniste, verpleger/verpleegster"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '7')
        },
        {
            key: 'r3', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Ziekenhuisopname"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '2')
        },
        {
            key: 'r4', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["nl-be", "Andere medische hulp."],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '4')
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
 * WHY VISITED NO MEDICAL SERVICE
 * TO DO: Condition does not work
 * 
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedNoMedicalService = (parentKey: string, keyVisitedMedicalServ?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q7b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be","Wat zijn de voornaamste redenen dat u geen medische hulp zocht in verband met de gerapporteerde symptomen? (meerdere antwoorden mogelijk)"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en-be","Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be","Om uit te zoeken waarom sommige mensen geen medische hulp zoeken."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be","Hoe moet ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be","Meerdere antwoorden mogelijk."],
                ]),    
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Mijn symptomen kwamen recent op."],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Mijn symptomen zijn mild."],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ik heb deze symptomen vaker."],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ik denk te weten wat ik heb en gebruik eigen medicatie."],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ik denk dat er geen goede behandeling is voor mijn ziekte."],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Het is te moeilijk om snel een afspraak te verkrijgen."],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["nl-be", "Ik heb onvoldoende tijd."],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Omwille van financiële redenen."],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Omwille van angst voor de gevolgen als de dokter vermoedt dat ik COVID-19 heb."],
            ])
        },
        {
            key: '10', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Ik weet het niet/verkies niet te antwoorden."],
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