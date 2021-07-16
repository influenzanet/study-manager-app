import { SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { initDropdownGroup, initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions";


/**
 * SYMPTOMS: multiple choice question about allergies
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
            ["en", "Have you had any of the following symptoms since your last visit (or in the past week, if this is your first visit)?"],
            ["it", "Have you had any of the following symptoms since your last visit (or in the past week, if this is your first visit)?"],
            ["nl", "Had je in de afgelopen week geen, één of meerdere van deze klachten? (chronische klachten hoeven hier niet gemeld te worden)"],
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
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Het belangrijkste onderdeel van deze enquête is het opvolgen van de door u gerapporteerde symptomen."],
                    ["fr-be", "La partie la plus importante de cette enquête a trait au suivi des symptômes que vous avez signalés."],
                    ["de-be", "Der wichtigste Teil dieser Umfrage ist das Verfolgen der von Ihnen gemeldeten Symptome."],
                    ["en", "The most important part of this study is about following up on the symptoms you have reported."],
                    ["it", "The most important part of this study is about following up on the symptoms you have reported."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Voor mensen met chronische (langdurige) ziekten, vink alleen veranderingen in symptomen aan. Dus als u bijvoorbeeld chronische kortademigheid heeft, vink dit vakje dan alleen aan als dit recentelijk erger is geworden. Meerdere antwoorden mogelijk."],
                    ["fr-be", "Pour les personnes souffrant de maladies chroniques (de longue durée), ne cochez que les changements au niveau des symptômes. Ainsi, si vous souffrez d'un essoufflement chronique, ne cochez cette case que si ce symptôme s'est récemment aggravé. Plusieurs réponses sont possibles."],
                    ["de-be", "Für Menschen mit chronischen (längeren) Krankheiten kreuzen Sie bitte nur Veränderungen ihrer Symptome an. Mehrere Antworten sind möglich."],
                    ["en", "If you suffer from chronic illness, only indicate symptoms that have changed. For example, if you experience chronic shortness of breath, only mark this symptom if it has recently gotten worse. Multiple answers possible."],
                    ["it", "If you suffer from chronic illness, only indicate symptoms that have changed. For example, if you experience chronic shortness of breath, only mark this symptom if it has recently gotten worse. Multiple answers possible."],
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
                ['nl-be', 'Meerdere antwoorden mogelijk. Voor mensen met chronische (langdurige) ziekten, vink alleen veranderingen in symptomen aan. Dus als u bijvoorbeeld chronische kortademigheid heeft, vink dit vakje dan alleen aan als dit recentelijk erger is geworden.'],
                ["fr-be", "Plusieurs réponses sont possibles. Pour les personnes souffrant de maladies chroniques (de longue durée), ne cochez que les changements au niveau des symptômes. Ainsi, si vous souffrez d'un essoufflement chronique, ne cochez cette case que si ce symptôme s'est récemment aggravé."],
                ["de-be", "Mehrere Antworten möglich. Für Menschen mit chronischen (längeren) Krankheiten kreuzen Sie bitte nur Veränderungen ihrer Symptome an."],
                ["en", "Multiple answers possible. If you suffer from chronic illness, only indicate symptoms that have changed. For example, if you experience chronic shortness of breath, only mark this symptom if it has recently gotten worse."],
                ["it", "Multiple answers possible. If you suffer from chronic illness, only indicate symptoms that have changed. For example, if you experience chronic shortness of breath, only mark this symptom if it has recently gotten worse."],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["it", "No symptoms"],
                ["nl", "Nee, geen van deze klachten"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Fever"],
                ["it", "Fever"],
                ["nl", "Koorts"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chills"],
                ["it", "Chills"],
                ["nl", "Koude rillingen"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Runny or blocked nose"],
                ["it", "Runny or blocked nose"],
                ["nl", "Loopneus of verstopte neus"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sneezing"],
                ["it", "Sneezing"],
                ['nl', "Niezen"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sore throat"],
                ["it", "Sore throat"],
                ["nl", "Zere keel"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Cough"],
                ["it", "Cough"],
                ["nl", "Hoesten"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Shortness of breath"],
                ["it", "Shortness of breath"],
                ["nl", "Kortademig (snel buiten adem)"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Headache"],
                ["it", "Headache"],
                ["nl", "Hoofdpijn"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Muscle/joint pain"],
                ["it", "Muscle/joint pain"],
                ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chest pain"],
                ["it", "Chest pain"],
                ["nl", "Pijn op de borst"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Feeling tired or exhausted (malaise)"],
                ["it", "Feeling tired or exhausted (malaise)"],
                ["nl", "Vermoeid en lamlendig (algehele malaise)"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of appetite"],
                ["it", "Loss of appetite"],
                ["nl", "Verminderde eetlust"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Coloured sputum/phlegm"],
                ["it", "Coloured sputum/phlegm"],
                ["nl", "Verkleurd slijm"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Watery, bloodshot eyes"],
                ["it", "Watery, bloodshot eyes"],
                ["nl", "Waterige of bloeddoorlopen ogen"],
            ])
        },
        {
            key: '15', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nausea"],
                ["it", "Nausea"],
                ["nl", "Misselijkheid"],
            ])
        },
        {
            key: '16', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Vomiting"],
                ["it", "Vomiting"],
                ["nl", "Overgeven"],
            ])
        },
        {
            key: '17', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diarrhoea (at least three times a day)"],
                ["it", "Diarrhoea (at least three times a day)"],
                ["nl", "Diarree (minstens 3 keer per dag)"],
            ])
        },
        {
            key: '18', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Stomach ache"],
                ["it", "Stomach ache"],
                ["nl", "Buikpijn"],
            ])
        },


        {
            key: '23', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of smell"],
                ["it", "Loss of smell"],
                ["nl", "Geen reuk"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of taste"],
                ["it", "Loss of taste"],
                ["nl", "Geen smaak"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nose bleed"],
                ["it", "Nose bleed"],
                ["nl", "Bloedneus"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Rash"],
                ["it", "Rash"],
                ["nl", "Huiduitslag"],
            ])
        },
        {
            key: '19', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Other"],
                ["it", "Other"],
            ]),
            description: new Map([
                ["en", "Enter symptoms"],
                ["it", "Enter symptoms"],
            ]),
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
 * CONSENT FOR SYMPTOMS QUESTIONS: single choice question to get consent for further questions on symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const consentForSymptoms = (parentKey: string, keySymptomsQuestion: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q1a'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u bereid om meer informatie te geven met betrekking tot de door u gerapporteerde symptomen? Dit zal 5-10 minuten van uw tijd in beslag nemen."],
            ["fr-be", "Êtes-vous disposé(e) à fournir de plus amples informations concernant les symptômes que vous avez signalés ? Cela vous prendra 5 à 10 minutes de votre temps."],
            ["de-be", "Sind Sie bereit, in Bezug auf die von Ihnen gemeldeten Symptome weitere Informationen zu erteilen? Das wird 5-10 Minuten Ihrer Zeit in Beschlag nehmen."],
            ["en", "Are you willing to provide further information regarding the symptoms you have reported? This will take 5 to 10 minutes."],
            ["it", "Are you willing to provide further information regarding the symptoms you have reported? This will take 5 to 10 minutes."],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasOnlyKeysOtherThan', keySymptomsQuestion, [responseGroupKey, multipleChoiceKey].join('.'), '0')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten of je bereid bent de vervolgvragen te beantwoorden. Uw antwoorden op de vervolgvragen kunnen ons onderzoek helpen."],
                    ["fr-be", "Nous voulons savoir si vous êtes prêt à répondre aux questions de suivi. Vos réponses aux questions de suivi peuvent aider notre enquête."],
                    ["de-be", "Wir möchten wissen, ob Sie bereit sind, die Anschlussfragen zu beantworten. Ihre Antworten auf die Anschlussfragen können unsere Untersuchung unterstützen."],
                    ["en", "We want to know if you are willing to answer the follow-up questions. Your answers to the follow-up questions may assist our research."],
                    ["it", "We want to know if you are willing to answer the follow-up questions. Your answers to the follow-up questions may assist our research."],
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
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],

            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        }
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
 * GROUP DEPENDING ON IF ANY SYMPTOMS PRESENT
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const hasSymptomsGroup = (parentKey: string, keySymptomsQuestion: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'HS'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: true });

    editor.setCondition(
        expWithArgs('responseHasOnlyKeysOtherThan', keySymptomsQuestion, [responseGroupKey, multipleChoiceKey].join('.'), '0')
    );
    editor.setSelectionMethod({ name: 'sequential' });
    return editor.getItem();
}

/**
 * GROUP DEPENDING ON IF ANY SYMPTOMS PRESENT AND USER WANTS TO ANSWER MORE QUESTIONS
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param userConsentForSymptoms reference to the symptom survey
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const userConsentedSymptomsGroup = (parentKey: string, userConsentForSymptoms: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'HS'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: true });

    editor.setCondition(
        expWithArgs('responseHasKeysAny', userConsentForSymptoms, [responseGroupKey, singleChoiceKey].join('.'), '0'),
    );
    editor.setSelectionMethod({ name: 'sequential' });
    return editor.getItem();
}

/**
 * SAME ILLNES
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const sameIllnes = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q2'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "On your last visit, you reported that you were still ill. Are the symptoms you report today part of the same bout of illness?"], */
            ["nl", "In je laatste vragenlijst gaf je aan nog steeds klachten te hebben. Behoren de klachten die je nu meldt tot dezelfde klachtenperiode als de klachten die je de vorige keer al gemeld had?"],
            ["fr", "Lors de votre dernière visite, vous aviez déclaré être toujours malade. Est-ce que les symptômes que vous rapportez aujourd'hui font partie du même épisode de maladie ?"],
            ["nl-be", "In uw laatste vragenlijst gaf u aan nog steeds ziek te zijn. Behoren de symptomen die u nu meldt tot dezelfde klachtenperiode als de symptomen die u de vorige keer al gemeld heeft?"],
            ["fr-be", "Lorsque vous avez complété le précédent questionnaire, vous avez indiqué que vous étiez toujours malade. Les symptômes que vous signalez actuellement font-ils partie de la même période que les symptômes que vous aviez déjà signalés la dernière fois ?"],
            ["de-be", "In Ihrer letzten Fragen gaben Sie an, noch immer krank zu sein. Gehören die Symptome, die Sie nun melden, zu demselben Beschwerdezeitraum wie die Symptome, die Sie das letzte Mal schon gemeldet haben?"],
            ["en", "When you filled in the previous questionnaire, you indicated that you were still sick. Are the symptoms you are  reporting now from the same timeframe as the symptoms you reported the last time?"],
            ["it", "When you filled in the previous questionnaire, you indicated that you were still sick. Are the symptoms you are  reporting now from the same timeframe as the symptoms you reported the last time?"],
        ]))
    );

    // CONDITION
    const hadOngoingSymptomsLastWeek = expWithArgs('eq', expWithArgs('getAttribute', expWithArgs('getAttribute', expWithArgs('getContext'), 'participantFlags'), 'prev'), "1");
    editor.setCondition(hadOngoingSymptomsLastWeek);

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit? "],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "To make filling out the rest of the survey quicker for you."], */
                    /* ["fr", "Afin que vous puissiez remplir le reste de l'enquête plus rapidement."], */
                    ["nl", "Om te bepalen of je klachten worden veroorzaakt door (mogelijk) een nieuwe of dezelfde infectie als de vorige keer."],
                    ["nl-be", "Om het invullen van de rest van de vragenlijst te versnellen."],
                    ["fr-be", "Pour accélérer le remplissage du reste du questionnaire."],
                    ["de-be", "Um das Ausfüllen der restlichen Fragen zu beschleunigen."],
                    ["en", "To speed up the completion of the rest of the questionnaire."],
                    ["it", "To speed up the completion of the rest of the questionnaire."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    /* ["en", "How should I answer it?"], */
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre ?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "If you believe that the symptoms you have reported today are caused by the same bout of illness as your previous symptoms, please tick “yes”."], */
                    /* ["fr", "Si vous pensez que les symptômes que vous avez déclarés aujourd'hui sont causés par le même épisode de maladie que vos symptômes précédents, s'il vous plaît cochez «oui» . Pour gagner du temps, nous avons rempli les informations que vous nous avez déjà fournies sur votre maladie.  S'il vous plaît, vérifiez qu'elles sont toujours correctes ou faites les modifications nécessaires si, par exemple, vous avez consulté un médecin ou pris plus de temps hors travail depuis la dernière fois que vous avez répondu au questionnaire."], */
                    ["nl", "Als je denkt dat de klachten die je vandaag raporteert nog worden veroorzaakt door dezelfde infectie/probleem (dezelfde klachtenperiode), beantwoord dan de vraag met 'Ja'"],
                    ["nl-be", "Als u denkt dat de klachten die u vandaag raporteert nog worden veroorzaakt door dezelfde infectie/probleem (dezelfde klachtenperiode), beantwoord dan de vraag met 'Ja'."],
                    ["fr-be", "Si vous pensez que les plaintes que vous signalez aujourd'hui sont toujours causées par la même infection ou le même problème (même période durant laquelle les plaintes ont été observées), répondez alors oui à la question."],
                    ["de-be", "Wenn Sie der Meinung sind, dass die Beschwerden, über die Sie heute berichten, durch dieselbe Infektion / dasselbe Problem (in derselben Beschwerdezeit) verursacht werden, dann beantworten Sie die Frage mit Ja."],
                    ["en", "If you think that the complaints you are indicating today are caused by the same infection or the same problem (the same period during which you experienced the complaints), answer 'yes'."],
                    ["it", "If you think that the complaints you are indicating today are caused by the same infection or the same problem (the same period during which you experienced the complaints), answer 'yes'."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                /* ["en", "Yes"], */
                ["nl", "Ja"],
                ["fr", "Oui"],
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                /* ["en", "No"], */
                ["nl", "Nee"],
                ["fr", "Non"],
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                /* ["en", "I don't know/can't remember"], */
                ["nl", "Ik weet het niet (meer)."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                /* ["en", "I don't know/can't remember"], */
                ["nl", "Dit geldt niet voor mij"],
                ["fr", "Cela ne s'applique pas à moi"],
                ["nl-be", "Dit geldt niet voor mij"],
                ["fr-be", "Cela ne s'applique pas à moi"],
                ["de-be", "Das trifft auf mich nicht zu"],
                ["en", "This does not apply to me"],
                ["it", "This does not apply to me"],
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
 * PCR TESTED CONTACTS COVID-19: single choice question about contact with PCR tested Covid19 patients
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pcrTestedContact = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "In de 14 dagen voor de start van uw symptomen, bent u in nauw contact geweest met één of meerdere personen die een positieve PCR-test hadden voor COVID-19 (deze persoon kan al dan niet symptomen vertonen)?"],
            ["fr-be", "Au cours des 14 jours précédant l'apparition de vos symptômes, avez-vous été en contact étroit avec une ou plusieurs personne(s) ayant obtenu un résultat positif au PCR-test de dépistage du coronavirus (cette personne peut présenter ou non des symptômes) ?"],
            ["de-be", "Waren Sie in den 14 Tagen vor dem Beginn Ihrer Symptome in engem Kontakt mit einer oder mehreren Personen, die einen positiven PCR-Test auf COVID-19 hatten (Diese Person kann Symptome aufweisen oder auch nicht!)?"],
            ["en", "In the 14 days before your symptoms started, have you been in close contact with someone for whom a PCR test (nasal swab) has confirmed that they have Covid-19?"],
            ["it", "In the 14 days before your symptoms started, have you been in close contact with someone for whom a PCR test (nasal swab) has confirmed that they have Covid-19?"],
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
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te onderzoeken hoe COVID-19 zich verspreidt in de algemene bevolking."],
                    ["fr-be", "Afin d'étudier la façon dont le coronavirus se propage au sein de la population générale."],
                    ["de-be", "Um zu untersuchen, wie sich COVID-19 in der allgemeinen Bevölkerung verbreitet."],
                    ["en", "In  order to study how the coronavirus spreads within the general population."],
                    ["it", "In  order to study how the coronavirus spreads within the general population."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],
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
 * HOUSEHOLD PCR TESTED CONTACT COVID-19: single choice question about household contacts who are PCR tested Covid19 patients
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pcrHouseholdContact = (parentKey: string, covid19ContactKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov3b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Behoort deze persoon of één van deze personen tot uw huishouden?"],
            ["fr-be", "Cette personne ou l'une de ces personnes fait-elle partie de votre ménage ou de votre foyer ?"],
            ["de-be", "Gehört diese Person oder eine dieser Personen zu Ihrem Haushalt?"],
            ["en", "Was this person or one of these persons a member of your household?"],
            ["it", "Was this person or one of these persons a member of your household?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', covid19ContactKey, [responseGroupKey, singleChoiceKey].join('.'), '1'),
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "COVID-19 en griep verspreiden zich zeer binnenshuis."],
                    ["fr-be", "Le coronavirus et la grippe se propagent beaucoup à l'intérieur."],
                    ["de-be", "COVID-19 und Grippe verbreiten sich sehr stark im Hause."],
                    ["en", "The coronavirus and influenza spread quickly indoors."],
                    ["it", "The coronavirus and influenza spread quickly indoors."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Een lid van het huishouden wordt gedefinieerd als iemand (niet noodzakelijk verwant) die op hetzelfde adres woont als u en die de kookgelegenheid, woonkamer, zitkamer of eethoek deelt."],
                    ["fr-be", "Un membre du ménage ou du foyer est défini comme une personne (pas nécessairement apparentée) qui vit à la même adresse que vous, et qui partage la cuisine, le salon, la salle de séjour ou la salle à manger."],
                    ["de-be", "Ein Mitglied des Haushalts wird als jemand (nicht notwendigerweise verwandt) definiert, der an derselben Anschrift wie Sie wohnt und mit dem Sie die Kochgelegenheit, Wohnzimmer oder Essecke teilen."],
                    ["en", "A member of the household is defined as a person (not necessary a family member) who lives at the same address as you, and who shares the kitchen, living room, family room or dining room."],
                    ["it", "A member of the household is defined as a person (not necessary a family member) who lives at the same address as you, and who shares the kitchen, living room, family room or dining room."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet"],
                ["fr-be", "Je ne sais pas"],
                ["de-be", "Ich weiß es nicht"],
                ["en", "I don’t know"],
                ["it", "I don’t know"],
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
 * CONTACT WITH SYMPTOMATIC PERSONS: single choice question about contact with people showing covid symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsQuestion reference to the symptom survey
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covidSymptomsContact = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov8'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "In de 14 dagen voor de start van uw symptomen, bent u in nauw contact geweest met iemand die symptomen van COVID-19 vertoonde?"],
            ["fr-be", "Au cours des 14 jours précédant l'apparition de vos symptômes, avez-vous été en contact étroit avec une personne présentant des symptômes du coronavirus ?"],
            ["de-be", "Waren Sie in den 14 Tagen vor dem Beginn Ihrer Symptome in engem Kontakt mit jemandem, der die Symptome von COVID-19 aufwies?"],
            ["en", "During the 14 days before your symptoms appeared, were you in close contact with a person presenting COVID-19 symptoms?"],
            ["it", "During the 14 days before your symptoms appeared, were you in close contact with a person presenting COVID-19 symptoms?"],
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
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te onderzoeken hoe COVID-19 zich verspreidt in de algemene bevolking."],
                    ["fr-be", "Afin d'étudier la façon dont le coronavirus se propage au sein de la population générale."],
                    ["de-be", "Um zu untersuchen, wie sich COVID-19 in der allgemeinen Bevölkerung verbreitet."],
                    ["en", "In  order to study how the coronavirus spreads within the general population."],
                    ["it", "In  order to study how the coronavirus spreads within the general population."],
                ]),
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Symptomen van COVID-19 zijn onder meer: ​​koorts of koude rillingen, hoesten, keelpijn, kortademigheid, pijnlijke spieren en hoofdpijn."],
                    ["fr-be", "Les symptômes du COVID-19 incluent : fièvre ou frissons, toux, mal de gorge, essoufflement, douleurs musculaires et maux de tête."],
                    ["de-be", "Zu den Symptomen von COVID-19 gehören: Fieber oder Schüttelfrost, Husten, Halsschmerzen, Kurzatmigkeit, Muskelkater und Kopfschmerzen."],
                    ["en", "Symptoms of COVID-19 include: fever or chills, cough, sore throat, shortness of breath, sore muscles and headache."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet (meer)"],
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
 * HOUSEHOLD CONTACTS WITH PEOPLE SHOWING COVID-19 SYMPTOMS: single choice question about household contacts who are showing covid19 symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covidHouseholdContact = (parentKey: string, covid19ContactKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov8b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Behoort deze persoon of één van deze personen tot uw huishouden?"],
            ["fr-be", "Cette personne ou l'une de ces personnes fait-elle partie de votre ménage ou de votre foyer ?"],
            ["de-be", "Gehört diese Person oder eine dieser Personen zu Ihrem Haushalt?"],
            ["en", "Was this person or one of these persons a member of your household?"],
            ["it", "Was this person or one of these persons a member of your household?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', covid19ContactKey, [responseGroupKey, singleChoiceKey].join('.'), '1'),
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "COVID-19 en griep verspreiden zich snel binnenshuis."],
                    ["fr-be", "Le coronavirus et la grippe se propagent beaucoup à l'intérieur."],
                    ["de-be", "COVID-19 und Grippe verbreiten sich sehr stark im Hause."],
                    ["en", "The coronavirus and influenza spread quickly indoors."],
                    ["it", "The coronavirus and influenza spread quickly indoors."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Een lid van het huishouden wordt gedefinieerd als iemand (niet noodzakelijk verwant) die op hetzelfde adres woont als u en die de kookgelegenheid, woonkamer, zitkamer of eethoek deelt."],
                    ["fr-be", "Un membre du ménage ou du foyer est défini comme une personne (pas nécessairement apparentée) qui vit à la même adresse que vous, et qui partage la cuisine, le salon, la salle de séjour ou la salle à manger."],
                    ["de-be", "Ein Mitglied des Haushalts wird als jemand (nicht notwendigerweise verwandt) definiert, der an derselben Anschrift wie Sie wohnt und mit dem Sie die Kochgelegenheit, Wohnzimmer oder Essecke teilen."],
                    ["en", "A member of the household is defined as a person (not necessary a family member) who lives at the same address as you, and who shares the kitchen, living room, family room or dining room."],
                    ["it", "A member of the household is defined as a person (not necessary a family member) who lives at the same address as you, and who shares the kitchen, living room, family room or dining room."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],

            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik weet het niet"],
                ["fr-be", "Je ne sais pas"],
                ["de-be", "Ich weiß es nicht"],
                ["en", "I don’t know"],
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
 * SYMPTOMS START
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySameIllnes reference to same illnes question
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const symptomsStart = (parentKey: string, keySameIllnes: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "When did the first symptoms appear?"], */
            ["nl", "Op welke dag kwamen de eerste klachten opzetten? Als je de datum niet precies meer weet, kies dan een geschatte datum"],
            ["fr", "Quand les premiers symptômes sont-ils apparus ?"],
            ["nl-be", "Op welke dag verschenen de eerste symptomen? Als u de exacte datum niet meer weet, selecteer dan een geschatte datum."],
            ["fr-be", "Quel jour les premiers symptômes sont-ils apparus ? Si vous ne vous souvenez plus de la date exacte, sélectionnez une date approximative."],
            ["de-be", "An welchem Tag erschienen die ersten Symptome? Wenn Sie das genaue Datum nicht mehr wissen, dann wählen Sie einfach ein geschätztes Datum."],
            ["en", "On what day did you begin feeling the first symptoms? If you do not recall the exact date, please give an approximate date."],
            ["it", "On what day did you begin feeling the first symptoms? If you do not recall the exact date, please give an approximate date."],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('not', expWithArgs('responseHasKeysAny', keySameIllnes, [responseGroupKey, singleChoiceKey].join('.'), '0', '9'))
    );


    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "To help us work out the number of cases that arise each day."], */
                    ["nl", "Dit helpt ons vast te stellen hoeveel mensen er klachten krijgen per dag."],
                    ["fr", "Pour nous aider à travailler sur le nombre de cas de grippe qui se déclarent chaque jour."],
                    ["nl-be", "Dit helpt ons vast te stellen hoeveel mensen er klachten krijgen per dag/week."],
                    ["fr-be", "Cette question nous aide à déterminer combien de personnes ressentent des symptômes par jour/semaine."],
                    ["de-be", "Dit helpt ons vast te stellen hoeveel mensen er klachten krijgen per dag/week. "],
                    ["en", "This question will help us to determine how many people are experiencing symptoms per day/week."],
                    ["it", "This question will help us to determine how many people are experiencing symptoms per day/week."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    /* ["en", "How should I answer it?"], */
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Please give as accurate an estimate as possible."], */
                    ["nl", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                    ["fr", "Donnez, s'il vous plaît, une estimation aussi précise que possible."],
                    ["nl-be", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                    ["fr-be", "Veuillez répondre de la manière la plus précise possible."],
                    ["de-be", "Bitte so genau wie möglich."],
                    ["en", "Answer as precisely as possible."],
                    ["it", "Answer as precisely as possible."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -5184000) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
            content: new Map([
                ["nl", "Kies de dag"],
                ["fr", "Sélectionner la date"],
                ["nl-be", "Kies een datum"],
                ["fr-be", "Choisissez une date."],
                ["de-be", "Wählen Sie das Datum"],
                ["en", "Choose date"],
                ["it", "Choose date"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["it", "I don't know/can't remember"],
                ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
                ["nl", "Dit weet ik niet (meer)?"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    /* editor.addExistingResponseComponent({
        key: '0', role: 'dateInput',
        properties: {
            min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -5184000) },
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
        },
        description: generateLocStrings(new Map([
            ["nl", "Kies de dag"],
            ["fr", "Sélectionner la date"],
            ["nl-be", "Kies een datum"],
            ["fr-be", "Choisissez une date."],
            ["de-be", "Wählen Sie das Datum"],
            ["en", "Choose date"],
            ["it", "Choose date"],
        ]))
    }, rg?.key); */

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
 * SYMPTOMS END
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keySymptomsStart reference to symptoms start question
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const symptomsEnd = (parentKey: string, keySymptomsStart: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "When did your symptoms end?"], */
            ["nl", "Op welke dag waren je klachten weer verdwenen?"],
            ["fr", "Quand vos symptômes ont-ils disparu ?"],
            ["nl-be", "Op welke dag waren je symptomen/klachten weer verdwenen?"],
            ["fr-be", "Quel jour vos symptômes / vos troubles médicaux avaient-ils à nouveau disparu ?"],
            ["de-be", "An welchem Tag waren Ihre Symptome/Beschwerden wieder verschwunden?"],
            ["en", "When did your symptoms end?"],
            ["it", "When did your symptoms end?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Using the beginning and end dates of symptoms we can work out how long respiratory infections last."], */
                    ["nl", "Op basis van de eerste en laatste dag van klachten kunnen we uitrekenen hoelang je last hebt gehad van (deze) klachten."],
                    ["fr", "En utilisant les dates de début et de fin des symptômes, nous pouvons travailler sur la durée des infections respiratoires."],
                    ["nl-be", "Op basis van de eerste en laatste dag van klachten kunnen we uitrekenen hoelang u last heeft gehad van (deze) klachten."],
                    ["fr-be", "Sur la base du premier et du dernier jour des plaintes, nous pouvons calculer depuis combien de temps vous souffrez de (ces) plaintes."],
                    ["de-be", "Auf der Grundlage des ersten und letzten Tages der Beschwerden können wir ausrechnen, wie lange Sie an (diesen) Beschwerden litten."],
                    ["en", "We can use the first and last dates of the complaints to calculate how long your complaints lasted. "],
                    ["it", "We can use the first and last dates of the complaints to calculate how long your complaints lasted. "],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    /* ["en", "How should I answer it?"], */
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Please give as accurate an estimate as possible."], */
                    ["nl", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                    ["fr", "Donnez, s'il vous plaît, une estimation aussi précise que possible."],
                    ["nl-be", "Wees alstublieft zo nauwkeurig mogelijk."],
                    ["fr-be", "Veuillez fournir la réponse la plus précise possible."],
                    ["de-be", "Mehrere Antworten sind möglich."],
                    ["en", "Answer as precisely as possible."],
                    ["it", "Answer as precisely as possible."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            optionProps: {
                min: {
                    dtype: 'exp', exp: {
                        name: 'getAttribute',
                        data: [
                            { dtype: 'exp', exp: expWithArgs('getResponseItem', keySymptomsStart, [responseGroupKey, singleChoiceKey, '0'].join('.')) },
                            { str: 'value', dtype: 'str' }
                        ],
                        returnType: 'int',
                    }
                },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
            content: new Map([
                /* ["en", "Choose date"], */
                ["nl", "Kies de dag"],
                ["fr", "Sélectionner la date"],
                ["nl-be", "Kies een datum"],
                ["fr-be", "Choisissez une date."],
                ["de-be", "Wählen Sie das Datum"],
                ["en", "Choose date"],
                ["it", "Choose date"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["it", "I don't know/can't remember"],
                ["de", "Ich weiss es nicht bzw. kann mich nicht erinnern"],
                ["nl", "Dit weet ik niet (meer)?"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                /* ["en", "I am still ill"], */
                ["nl", "Ik heb nog steeds klachten."],
                ["fr", "Je suis encore malade"],
                ["nl-be", "Ik heb nog steeds klachten."],
                ["fr-be", "Je suis encore malade"],
                ["de-be", "Ich habe immer noch Beschwerden"],
                ["en", "I am still ill"],
                ["it", "I am still ill"],
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
 * SYMPTOMS DEVELOPED SUDDENLY
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const symptomsSuddenlyDeveloped = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q5';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "Did your symptoms develop suddenly over a few hours?"], */
            ["nl", "Kwamen je klachten plotseling opzetten? (binnen een paar uur)"],
            ["fr", "Est-ce que vos symptômes se sont déclarés soudainement, en l'espace de quelques heures ?"],
            ["nl-be", "Kwamen uw symptomen/klachten plotseling opzetten? (binnen enkele uren)"],
            ["fr-be", "Avez-vous ressenti ces symptômes / troubles médicaux de manière soudaine (en quelques heures) ?"],
            ["de-be", "Kamen Ihre Symptome/Beschwerden plötzlich? (innerhalb einiger Stunden)"],
            ["en", "Did your symptoms develop suddenly over a few hours?"],
            ["it", "Did your symptoms develop suddenly over a few hours?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Sudden onset of symptoms is believed to be common for flu."], */
                    ["nl", "Dat klachten plotseling (binnen een paar uur) opzetten is gelinkt aan griep"],
                    ["fr", "L'apparition soudaine des symptômes est considéré comme commune pour la grippe."],
                    ["nl-be", "Dat klachten plotseling (binnen een paar uur) opzetten is gelinkt aan COVID-19 en griep."],
                    ["fr-be", "L'apparition soudaine des symptômes (en quelques heures) est liée au coronavirus et à la grippe."],
                    ["de-be", "Dass Beschwerden plötzlich (in ein paar Stunden) anfangen, hängt mit COVID-19 und Grippe zusammen."],
                    ["en", "The sudden onset of symptoms (within a few hours) is linked to the coronavirus and influenza."],
                    ["it", "The sudden onset of symptoms (within a few hours) is linked to the coronavirus and influenza."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    /* ["en", "How should I answer it?"], */
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Tick yes if your symptoms appeared over a few hours rather than gradually developing over a few days."], */
                    ["nl", "Beantwoord de vraag met Ja wanneer de klachten binnen enkele uren kwamen opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
                    ["fr", "Cochez «oui» si vos symptômes sont apparus en quelques heures plutôt que progressivement sur quelques jours."],
                    ["nl-be", "Beantwoord de vraag met Ja wanneer de klachten binnen enkele uren kwamen opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
                    ["fr-be", "Répondez Oui lorsque les symptômes sont apparus en quelques heures, plutôt qu'une apparition progressive étalée sur plusieurs jours."],
                    ["de-be", "Beantworten Sie die Frage mit Ja, wenn die Beschwerden innerhalb von einigen Stunden begannen, statt mit einer allmählichen Entwicklung über eine Anzahl von Tagen hinweg."],
                    ["en", "Answer “yes” if your symptoms appeared within a few hours, and not gradually over a period of several days."],
                    ["it", "Answer “yes” if your symptoms appeared within a few hours, and not gradually over a period of several days."],
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
                /* ["en", "Yes"], */
                ["nl", "Ja"],
                ["fr", "Oui"],
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                /* ["en", "I don't know/can't remember"], */
                ["nl", "Ik weet dit niet (meer)."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],

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
 * FEVER START
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const feverStart = (parentKey: string, keySymptomStart: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'a';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "When did your fever begin?"], */
            ["nl", "Op welke dag kwam de koorts opzetten? Als je de dag niet precies weet, kies dan een geschatte datum"],
            ["fr", "Quand est-ce que votre fièvre a commencé ?"],
            ["nl-be", "Op welke dag kwam de koorts opzetten? Als u de dag niet precies weet, selecteer dan een geschatte datum"],
            ["fr-be", "Quel jour avez-vous ressenti de la fièvre ? Si vous ne vous souvenez plus de la date exacte, sélectionnez une date approximative."],
            ["de-be", "An welchem Tag kam das Fieber? Wenn Sie den Tag nicht genau wissen, dann wählen Sie einfach ein geschätztes Datum"],
            ["en", "On what day did your fever start? If you do not recall the exact date, please give an approximate date."],
            ["it", "On what day did your fever start? If you do not recall the exact date, please give an approximate date."],

        ]))
    )

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Fever is very important for diagnosing, so we want to know when this started."], */
                    ["nl", "Koorts is belangrijk in de diagnose, daarom willen we graag weten wanneer deze klachten begonnen."],
                    ["fr", "La fièvre est très importante pour le diagnostic de la grippe. Nous voulons donc savoir quand cela a commencé."],
                    ["nl-be", "Koorts is belangrijk voor een diagnose, daarom willen we graag weten wanneer de koorts is begonnen."],
                    ["fr-be", "La fièvre est importante pour le diagnostic, c'est pourquoi nous aimerions savoir quand la fièvre a commencé."],
                    ["de-be", "Fieber ist für eine Diagnose nötig, darum möchten wir gerne wissen, wann das Fieber anfing."],
                    ["en", "Fever is an important diagnostic symptom, so we would like to know when the fever appeared."],
                    ["it", "Fever is an important diagnostic symptom, so we would like to know when the fever appeared."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    /* ["en", "How should I answer it?"], */
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Please give as accurate an estimate as possible."], */
                    ["nl", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                    ["fr", "Donnez, s'il vous plaît, une estimation aussi précise que possible."],
                    ["nl-be", "Wees alstublieft zo nauwkeurig mogelijk."],
                    ["fr-be", "Veuillez fournir la réponse la plus précise possible."],
                    ["de-be", "Bitte antworten Sie so genau wie möglich."],
                    ["en", "Answer as precisely as possible."],
                    ["it", "Answer as precisely as possible."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'dateInput',
            optionProps: {
                min: {
                    dtype: 'exp', exp: {
                        name: 'getAttribute',
                        data: [
                            { dtype: 'exp', exp: expWithArgs('getResponseItem', keySymptomStart, [responseGroupKey,  singleChoiceKey, '0'].join('.')) },
                            { str: 'value', dtype: 'str' }
                        ],
                        returnType: 'int',
                    }
                },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
            content: new Map([
                /* ["en", "Choose date"], */
                ["nl", "Kies de dag"],
                ["fr", "Sélectionner la date"],
                ["nl-be", "Kies een datum"],
                ["fr-be", "Choisissez une date."],
                ["de-be", "Wählen Sie das Datum"],
                ["en", "Choose date"],
                ["it", "Choose date"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                /* ["en", "I don't know/can't rember"], */
                ["nl", "Ik weet het niet (meer)."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],

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
 * FEVER DEVELOPED SUDDENLY
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const feverDevelopedSuddenly = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "Did your fever develop suddenly over a few hours?"], */
            ["nl", "Kwam de koorts plotseling opzetten? (binnen een paar uur)"],
            ["fr", "Est-ce que votre fièvre s'est déclarée soudainement, en l'espace de quelques heures ?"],
            ["nl-be", "Kwam de koorts plotseling (binnen een paar uur) opzetten?"],
            ["fr-be", "La fièvre est-elle apparue de manière soudaine (en quelques heures) ?"],
            ["de-be", "Kam das Fieber plötzlich? (innerhalb von ein paar Stunden)"],
            ["en", "Did your fever develop suddenly over a few hours?"],
            ["it", "Did your fever develop suddenly over a few hours?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Certain illnesses are associated with a sudden onset of fever"], */
                    ["nl", "Sommige ziekten veroorzaken een plotselinge koorts."],
                    ["fr", "La grippe est souvent associée à une apparition soudaine de fièvre."],
                    ["nl-be", "Dat klachten plotseling (binnen een paar uur) opzetten is gelinkt aan COVID-19 en griep."],
                    ["fr-be", "L'apparition soudaine des symptômes (en quelques heures) est liée au coronavirus et à la grippe."],
                    ["de-be", "Dass Beschwerden plötzlich (in ein paar Stunden) auftreten, hängt mit COVID-19 und Grippe zusammen."],
                    ["en", "The sudden onset of symptoms (within a few hours) is linked to the coronavirus and influenza."],
                    ["it", "The sudden onset of symptoms (within a few hours) is linked to the coronavirus and influenza."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    /* ["en", "How should I answer it?"], */
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Tick yes if your fever appeared over a few hours rather than gradually developing over a few days."], */
                    ["nl", "Beantwoord de vraag met Ja wanneer de koorts binnen enkele uren kwam opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
                    ["fr", "Cochez «oui» si votre fièvre est apparue en quelques heures plutôt que progressivement sur quelques jours."],
                    ["nl-be", "Beantwoord de vraag met Ja wanneer de klachten binnen enkele uren kwamen opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
                    ["fr-be", "Répondez Oui lorsque les symptômes sont apparus en quelques heures, plutôt qu'une apparition progressive étalée sur plusieurs jours."],
                    ["de-be", "Beantwoord de vraag met Ja wanneer de klachten binnen enkele uren kwamen opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
                    ["en", "Answer “yes” if your symptoms appeared within a few hours, and not gradually over a period of several days."],
                    ["it", "Answer “yes” if your symptoms appeared within a few hours, and not gradually over a period of several days."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                /* ["en", "Yes"], */
                ["nl", "Ja"],
                ["fr", "Oui"],
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                /* ["en", "No"], */
                ["nl", "Nee"],
                ["fr", "Non"],
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                /* ["en", "I don't know"], */
                ["nl", "Dat weet ik niet (meer)"],
                ["fr", "Je ne sais pas"],
                ["nl-be", "Dat weet ik niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],
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
 * DID YOU MEASURE TEMPERATURE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const didUMeasureTemperature = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'c';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "Did you take your temperature?"], */
            ["nl", "Heb je de temperatuur gemeten?"],
            ["fr", "Avez-vous pris votre température ?"],
            ["nl-be", "Heeft u uw temperatuur gemeten na het verschijnen van de symptomen?"],
            ["fr-be", "Avez-vous pris votre température après l'apparition des symptômes ?"],
            ["de-be", "Haben Sie Ihre Temperatur nach dem Erscheinen der Symptome gemessen?"],
            ["en", "Did you take your temperature?"],
            ["it", "Did you take your temperature?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Infections often cause a high temperature. However, not everyone takes their temperature when they are ill."], */
                    ["nl", "Infecties veroorzaken vaak een hoge temperatuur. Echter, niet iedereen meet hun temperatuur wanneer ze ziek zijn."],
                    ["fr", "La grippe est souvent associée à une température élevée. Cependant tout le monde ne prend pas sa température lorsqu'il est malade."],
                    ["nl-be", "Indien u de koorts heeft gemeten, willen we graag de hoogst gemeten temperatuur weten."],
                    ["fr-be", "Si vous avez mesuré votre température, nous aimerions connaître la température corporelle la plus élevée mesurée."],
                    ["de-be", "Wenn Sie das Fieber gemessen haben, möchten wir gerne die höchste gemessene Temperatur wissen."],
                    ["en", "If you have taken your temperature, we would like to know the highest body temperature you have measured."],
                    ["it", "If you have taken your temperature, we would like to know the highest body temperature you have measured."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "How should I answer it?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Answer yes, if you took your temperature using a thermometer."],
                    ["it", "Answer yes, if you took your temperature using a thermometer."],
                    ["nl", "Beantwoord deze vraag met Ja wanneer je de temperatuur hebt gemeten met een thermometer."],
                    ["fr", "Cochez «oui» si vous avez pris votre température à l'aide d'un thermomètre."],
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
                /*  ["en", "Yes"], */
                ["nl", "Ja"],
                ["fr", "Oui"],
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                /* ["en", "No"], */
                ["nl", "Nee"],
                ["fr", "Non"],
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                /* ["en", "I don't know"], */
                ["nl", "Dat weet ik niet (meer)"],
                ["fr", "Je ne sais pas"],
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],
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
 * HIGHEST TEMPERATURE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyDidYouMeasureTemperature reference to the question if temperature was taken
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const highestTemprerature = (parentKey: string, keyDidYouMeasureTemperature: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'd';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /* ["en", "What was your highest temperature measured?"], */
            ["nl", "Wat is je hoogst gemeten temperatuur?"],
            ["fr", "Quel a été votre température mesurée la plus élevée ?"],
            ["nl-be", "Wat is uw hoogst gemeten lichaamstemperatuur?"],
            ["fr-be", "Après avoir pris votre température corporelle, quelle était la valeur maximale mesurée ?"],
            ["de-be", "Was ist Ihre höchste gemessene Körpertemperatur?"],
            ["en", "What was your highest temperature measured?"],
            ["it", "What was your highest temperature measured?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyDidYouMeasureTemperature, [responseGroupKey, singleChoiceKey].join('.'), '1')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    /* ["en", "Why are we asking this?"], */
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /* ["en", "Certain infections often causes a high temperature."], */
                    ["nl", "Bepaalde infectieziekten veroorzaken een hoge temperatuur."],
                    ["fr", "La grippe provoque souvent une température élevée."],
                    ["nl-be", "Bepaalde infectieziekten veroorzaken een hoge temperatuur."],
                    ["fr-be", "Certaines maladies infectieuses provoquent une température élevée."],
                    ["de-be", "Bestimmte Infektionskrankheiten verursachen eine hohe Temperatur."],
                    ["en", "Certain infectious diseases cause a raised temperature."],
                    ["it", "Certain infectious diseases cause a raised temperature."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    /* ["en", "How should I answer it?"], */
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*  ["en", "Give the highest temperature you recorded during this episode of illness."], */
                    ["nl", "Geef de hoogste temperatuur die je gemeten hebt tijdens je klachtenperiode."],
                    ["fr", "Indiquez la plus haute température que vous avez enregistrée au cours de cette épisode de maladie."],
                    ["nl-be", "Geef de hoogste temperatuur die u gemeten heeft tijdens uw klachtenperiode."],
                    ["fr-be", "Veuillez indiquer la température la plus élevée que vous avez mesurée pendant la période liée à vos symptômes."],
                    ["de-be", "Geben Sie die höchste Temperatur an, die Sie während der Zeit Ihre Beschwerden gemessen haben."],
                    ["en", "Please indicate the highest temperature you measured during the period in which you experienced your symptoms."],
                    ["it", "Please indicate the highest temperature you measured during the period in which you experienced your symptoms."],
                ]),
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                /* ["en", "Below 37.0°C"], */
                ["nl", "Onder de 37,0°C"],
                ["fr", "Moins de 37°C"],
                ["nl-be", "Onder de 37,0°C"],
                ["fr-be", "En dessous de 37,0°C"],
                ["de-be", "Unter 37,0°C"],
                ["en", "Below 37.0°C"],
                ["it", "Below 37.0°C"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                /* ["en", "37.0° - 37.4°C"], */
                ["nl", "37,0°C - 37,4°C"],
                ["fr", "37° – 37.4°C"],
                ["nl-be", "37,0°C - 37,4°C"],
                ["fr-be", "37,0°C - 37,4°C"],
                ["de-be", "37,0°C - 37,4°C"],
                ["en", "37.0°C - 37.4°C"],
                ["it", "37.0°C - 37.4°C"],

            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                /* ["en", "37.5° - 37.9°C"], */
                ["nl", "37,5°C - 37,9°C"],
                ["fr", "37.5°C – 37.9°C"],
                ["nl-be", "37,5°C - 37,9°C"],
                ["fr-be", "37,5°C - 37,9°C"],
                ["de-be", "37,5°C - 37,9°C"],
                ["en", "37.5°C - 37.9°C"],
                ["it", "37.5°C - 37.9°C"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                /* ["en", "38.0° - 38.9°C"], */
                ["nl", "38,0°C - 38,9°C"],
                ["fr", "38°C – 38.9°C"],
                ["nl-be", "38,0°C - 38,9°C"],
                ["fr-be", "38,0°C - 38,9°C"],
                ["de-be", "38,0°C - 38,9°C"],
                ["en", "38.0°C - 38.9°C"],
                ["it", "38.0°C - 38.9°C"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                /* ["en", "39.0° - 39.9°C"], */
                ["nl", "39,0°C - 39,9°C"],
                ["fr", "39°C – 39.9°C"],
                ["nl-be", "39,0°C - 39,9°C"],
                ["fr-be", "39,0°C - 39,9°C"],
                ["de-be", "39,0°C - 39,9°C"],
                ["en", "39.0°C - 39.9°C"],
                ["it", "39.0°C - 39.9°C"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                /* ["en", "40.0°C or more"], */
                ["nl", "40,0°C of meer"],
                ["fr", "40°C ou plus"],
                ["nl-be", "40,0°C of meer"],
                ["fr-be", "40,0°C ou plus"],
                ["de-be", "40,0°C oder mehr"],
                ["en", "40.0°C or more"],
                ["it", "40.0°C or more"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                /* ["en", "I don't know/can't remember"], */
                ["nl", "Dat weet ik niet (meer)."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Das weiß ich nicht (mehr)"],
                ["en", "I don't know/can't remember"],
                ["it", "I don't know/can't remember"],
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


const getFullFeverGroup = (parentKey: string, keySymptomsQuestion: string, keySymptomStart: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q6';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: true });
    editor.setVersion(1);

    editor.setSelectionMethod({ name: 'sequential' });
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keySymptomsQuestion, [responseGroupKey, multipleChoiceKey].join('.'), '1')
    );

    // Fever Start
    editor.addSurveyItem(feverStart(itemKey, keySymptomStart, isRequired));

    // Developed Suddenly
    editor.addSurveyItem(feverDevelopedSuddenly(itemKey, isRequired));

    // Did you take temperature
    const Q_tempTaken = didUMeasureTemperature(itemKey, isRequired);
    editor.addSurveyItem(Q_tempTaken);

    // What was the highest
    editor.addSurveyItem(highestTemprerature(itemKey, Q_tempTaken.key, isRequired));

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
    const defaultKey = 'Q7';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you VISIT (see face to face) any medical services?"],
            ["it", "Because of your symptoms, did you VISIT (see face to face) any medical services?"],
            ["nl", "Heb je een arts gezien of gesproken vanwege je klachten? En zo ja, waar? (meerdere antwoorden mogelijk)"],
            ["fr", "En raison de vos symptômes, avez-vous rendu visite (en personne) à des services médicaux ?"],
            ["nl-be", "Heeft u medische hulp gezocht vanwege uw symptomen/klachten? En zo ja, waar? (meerdere antwoorden mogelijk)"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["it", "To find out whether people contact the health services because of their symptoms."],
                    ["nl", "Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
                    ["fr", "Pour savoir si la population entre en contact avec les services de santé en raison de ses symptômes."],
                    ["nl-be", "Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick all of those that apply. If you are due to see attend, then tick the final option."],
                    ["it", "Tick all of those that apply. If you are due to see attend, then tick the final option."],
                    ["nl", "Selecteer alle relevante vormen van medische hulp die je hebt bezocht. Wanneer je nog niet bent geweest maar wel een afspraak heeft gemaakt, selecteer dan de laatste optie."],
                    ["fr", "Merci de cocher toutes les réponses qui s'appliquent . Si vous avez rendez-vous prochainement, merci de cocher l'option finale."],
                ]),
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
                ['nl-be', "Meerdere antwoorden mogelijk"],
                ['nl', "Meerdere antwoorden mogelijk"],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
                ["it", "Multiple answers possible"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "No"],
                ["it", "No"],
                ["nl", "Nee, ik heb geen medische hulp gezocht"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "GP or GP's practice nurse"],
                ["it", "GP or GP's practice nurse"],
                ["nl", "Ja, bij de huisarts of huisartsassistent"],
                ["fr", "Médecin généraliste"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital admission"],
                ["it", "Hospital admission"],
                ["nl", "Ja, ik ben opgenomen in het ziekenhuis"],
                ["fr", "Consultation ambulatoire à l'hôpital"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Hospital accident & emergency department / out of hours service"],
                ["it", "Hospital accident & emergency department / out of hours service"],
                ["nl", "Ja, bij de eerste hulp van het ziekenhuis of de huisartsenpost"],
                ["fr", "Service des urgences d'un hôpital/clinique ou médecin de garde"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '5'),
            content: new Map([
                ["en", "Other medical services"],
                ["it", "Other medical services"],
                ["nl", "Ja, ik heb andere medische hulp gezocht"],
                ["fr", "Autre service médical"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "No, but I have an appointment scheduled"],
                ["it", "No, but I have an appointment scheduled"],
                ["nl", "Nog niet, maar ik heb een afspraak gemaakt"],
                ["fr", "Non, mais j'ai rendez-vous prochainement"],
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
 * VISITED GP
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ: reference to quesiton if visited any medical service
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedGP = (parentKey: string, keyVisitedMedicalServ: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q7a';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you visit the GP practice for your consult with the GP?"],
            ["it", "Did you visit the GP practice for your consult with the GP?"],
            ["nl", "Heb je de huisartspraktijk bezocht voor het gesprek met de huisarts/huisartsassistent?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '1')
    )

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Select the most relevant option"],
                    ["it", "Select the most relevant option"],
                    ["nl", "Geef aan of je ook de huisartspraktijk hebt bezocht."],
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
                ["en", "No, the consult happend by phone or video-connection (video consult)"],
                ["it", "No, the consult happend by phone or video-connection (video consult)"],
                ["nl", "Nee, ik heb de huisarts/huisartsassistent alleen gesproken per telefoon/video verbinding (video-consult)"],
            ])
        },

        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, I went to the GP practice to consult the GP"],
                ["it", "Yes, I went to the GP practice to consult the GP"],
                ["nl", "Ja, ik ben naar de huisartspraktijk gegaan, en heb daar met de huisarts/huisartsassistent gesproken"],
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
            ["en", "How soon after your symptoms appeared did you first VISIT this medical service?"],
            ["it", "How soon after your symptoms appeared did you first VISIT this medical service?"],
            ["nl", "Waar en hoe snel na de start van je klachten heb je voor de EERSTE keer medische hulp gezocht?"],
            ["fr", "Combien de temps après que vos symptômes soient apparus avez-vous visité un service médical ?"],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out how quickly people with symptoms are seen by the health services."],
                    ["it", "To find out how quickly people with symptoms are seen by the health services."],
                    ["nl", "Om uit te zoeken hoe snel mensen met klachten worden gezien door een medische hulpdienst/specialist."],
                    ["fr", "Pour savoir à quelle vitesse les personnes présentant des symptômes sont vus par les services de santé."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Only record the time until your FIRST contact with the health services."],
                    ["it", "Only record the time until your FIRST contact with the health services."],
                    ["nl", "Geef alleen het aantal dagen van het begin van de klachten tot je EERSTE bezoek aan de desbetreffende medische hulpverlener/specialist."],
                    ["fr", "En saisissant le temps séparant l'apparition de vos symptômes et votre PREMIER contact avec les services de santé."],
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
                ['en', 'Select the correct number of days'],
                ['it', 'Select the correct number of days'],
                ['nl', 'Selecteer het juiste aantal dagen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const ddOptions: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup', items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["en", "Same day"],
                    ["it", "Same day"],
                    ["nl", "Op dezelfde dag als de eerste klachten"],
                    ["fr", "Jour même"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["en", "1 day"],
                    ["it", "1 day"],
                    ["nl", "1 dag"],
                    ["fr", "1 jour"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["en", "2 days"],
                    ["it", "2 days"],
                    ["nl", "2 dagen"],
                    ["fr", "2 jours"],

                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["en", "3 days"],
                    ["it", "3 days"],
                    ["nl", "3 dagen"],
                    ["fr", "3 jours"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["en", "4 days"],
                    ["it", "4 days"],
                    ["nl", "4 dagen"],
                    ["fr", "4 jours"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["en", "5 - 7 days"],
                    ["it", "5 - 7 days"],
                    ["nl", "5 - 7 dagen"],
                    ["fr", "5 - 7 jours"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["en", "More than 7 days"],
                    ["it", "Più di 7 giorni"],
                    ["nl", "Meer dan 7 dagen"],
                    ["fr", "Plus de 7 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "I don't know/can't remember"],
                    ["it", "I don't know/can't remember"],
                    ["nl", "Dat weet ik niet (meer)"],
                    ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["en", "Medical Service"],
                        ["it", "Medical Service"],
                        ["nl", "Medische hulpverlener"],
                        ["fr", "Service médical"],
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
                        ["en", "GP or GP'r practice nurse"],
                        ["it", "GP or GP'r practice nurse"],
                        ["nl", "Huisarts of huisartsassistent"],
                        ["fr", "Médecin généraliste"],
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
                        ["en", "Hospital accident & department/out of hours service"],
                        ["it", "Hospital accident & department/out of hours service"],
                        ["nl", "Eerste hulp van het ziekenhuis of huisartsenpost"],
                        ["fr", "Service des urgences d'un hôpital/clinique ou médecin de garde"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '3')
        },
        {
            key: 'r3', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Hospital admission"],
                        ["it", "Hospital admission"],
                        ["nl", "Ziekenhuisopname"],
                        ["fr", "Consultation ambulatoire à l'hôpital"],
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
                        ["en", "Other medical services"],
                        ["it", "Other medical services"],
                        ["nl", "Andere medische hulp."],
                        ["fr", "Autre service médical"],
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
 * CONTACTED MEDICAL SERVICE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const contactedMedicalService = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q8';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Because of your symptoms, did you contact via TELEPHONE or INTERNET any of medical services?"],
            ["it", "A causa dei suoi sintomi, ha contattato via TELEFONO o INTERNET qualche servizio medico?"],
            ["nl", "Heeft u vanwege uw symptomen via TELEFOON of INTERNET contact opgenomen met een van de medische diensten?"],
            ["fr", "En raison de vos symptômes, avez-vous contacté par TÉLÉPHONE ou INTERNET l'un des services médicaux ?"],
            ["nl-be", "Heeft u vanwege uw symptomen via TELEFOON of INTERNET contact opgenomen met een van de medische diensten?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["nl-be", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["it", "To find out whether people contact the health services because of their symptoms."],
                    ["nl", "Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
                    ["fr", "Pour savoir si la population entre en contact avec les services de santé en raison de ses symptômes."],
                    ["nl-be", "Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick all of those that apply."],
                    ["it", "Tick all of those that apply."],
                    ["nl", "Selecteer alle relevante vormen van medische hulp die je hebt bezocht."],
                    ["fr", "Merci de cocher toutes les réponses qui s'appliquent ."],
                ]),
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
                ['nl-be', "Meerdere antwoorden mogelijk"],
                ['nl', "Meerdere antwoorden mogelijk"],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
                ["it", "Multiple answers possible"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "No"],
                ["it", "No"],
                ["nl", "Nee, ik heb geen medische hulp gezocht"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GP - spoke to receptionist only"],
                ["it", "GP - ha parlato solo con l'addetto alla reception"],
                ["nl", "Huisarts - sprak alleen met receptioniste"],
                ["fr", "GP - n'a parlé qu'à la réceptionniste"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GP - spoke to the doctor or nurse."],
                ["it", "GP - ha parlato con il medico o l'infermiere"],
                ["nl", "Huisarts - sprak met de arts of verpleegkundige"],
                ["fr", "GP - parlé au médecin ou à l'infirmière"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "NHS Direct or similar"],
                ["it", "Linea informazioni 1500 o simile"],
                ["nl", "Informatielijn volksgezondheid of vergelijkbaar"],
                ["fr", "Ligne d'information sur la santé publique ou similaire"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "NPFS"],
                ["it", "NPFS"],
                ["nl", "NPFS"],
                ["fr", "NPFS"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Other"],
                ["it", "Other"],
                ["nl", "Andere"],
                ["fr", "Autre"],
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
 * WHEN CONTACTED MEDICAL SERVICE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyContactedMedicalService: reference to quesiton if contacted any medical service
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const contactedMedicalServiceWhen = (parentKey: string, keyContactedMedicalService: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q8b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How soon after your symptoms appeared did you first contact via telephone or internet this medical service?"],
            ["it", "How soon after your symptoms appeared did you first contact via telephone or internet this medical service?"],
            ["nl", "Hoe snel nadat uw klachten optraden, heeft u voor het eerst telefonisch of via internet contact opgenomen met deze medische dienst?"],
            ["fr", "Combien de temps après l'apparition de vos symptômes avez-vous contacté pour la première fois par téléphone ou Internet ce service médical ?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasOnlyKeysOtherThan', keyContactedMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '0')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out how soon people contact the health services because of their symptoms."],
                    ["it", "To find out how soon people contact the health services because of their symptoms."],
                    ["nl", "Om erachter te komen hoe snel mensen contact opnemen met de gezondheidsdiensten vanwege hun symptomen."],
                    ["fr", "Pour savoir combien de temps les gens contactent les services de santé en raison de leurs symptômes."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Only record the time until your FIRST contact with the health services."],
                    ["it", "Only record the time until your FIRST contact with the health services."],
                    ["nl", "Geef alleen het aantal dagen van het begin van de klachten tot je EERSTE bezoek aan de desbetreffende medische hulpverlener/specialist."],
                    ["fr", "En saisissant le temps séparant l'apparition de vos symptômes et votre PREMIER contact avec les services de santé."],
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
                ['en', 'Select the correct number of days'],
                ['it', 'Select the correct number of days'],
                ['nl', 'Selecteer het juiste aantal dagen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const ddOptions: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup', items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["en", "Same day"],
                    ["it", "Same day"],
                    ["nl", "Op dezelfde dag als de eerste klachten"],
                    ["fr", "Jour même"],
                ]),
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["en", "1 day"],
                    ["it", "1 day"],
                    ["nl", "1 dag"],
                    ["fr", "1 jour"],
                ]),
            },
            {
                key: '2', role: 'option', content: new Map([
                    ["en", "2 days"],
                    ["it", "2 days"],
                    ["nl", "2 dagen"],
                    ["fr", "2 jours"],

                ]),
            },
            {
                key: '3', role: 'option', content: new Map([
                    ["en", "3 days"],
                    ["it", "3 days"],
                    ["nl", "3 dagen"],
                    ["fr", "3 jours"],
                ]),
            },
            {
                key: '4', role: 'option', content: new Map([
                    ["en", "4 days"],
                    ["it", "4 days"],
                    ["nl", "4 dagen"],
                    ["fr", "4 jours"],
                ]),
            },
            {
                key: '5', role: 'option', content: new Map([
                    ["en", "5 - 7 days"],
                    ["it", "5 - 7 days"],
                    ["nl", "5 - 7 dagen"],
                    ["fr", "5 - 7 jours"],
                ]),
            },
            {
                key: '6', role: 'option', content: new Map([
                    ["en", "More than 7 days"],
                    ["it", "Più di 7 giorni"],
                    ["nl", "Meer dan 7 dagen"],
                    ["fr", "Plus de 7 jours"],
                ]),
            },
            {
                key: '7', role: 'option', content: new Map([
                    ["en", "I don't know/can't remember"],
                    ["it", "I don't know/can't remember"],
                    ["nl", "Dat weet ik niet (meer)"],
                    ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'header', role: 'headerRow', cells: [
                {
                    key: 'col0', role: 'text', content: new Map([
                        ["en", "Medical Service"],
                        ["it", "Medical Service"],
                        ["nl", "Medische hulpverlener"],
                        ["fr", "Service médical"],
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
                        ["en", "GP - spoke to receptionist only"],
						["it", "GP - ha parlato solo con l'addetto alla reception"],
						["nl", "Huisarts - sprak alleen met receptioniste"],
						["fr", "GP - n'a parlé qu'à la réceptionniste"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyContactedMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '1')
        },
        {
            key: 'r2', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "GP - spoke to the doctor or nurse."],
						["it", "GP - ha parlato con il medico o l'infermiere"],
						["nl", "Huisarts - sprak met de arts of verpleegkundige"],
						["fr", "GP - parlé au médecin ou à l'infirmière"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyContactedMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '2')
        },
        {
            key: 'r3', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "NHS Direct or similar"],
						["it", "Linea informazioni 1500 o simile"],
						["nl", "Informatielijn volksgezondheid of vergelijkbaar"],
						["fr", "Ligne d'information sur la santé publique ou similaire"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyContactedMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '3')
        },
        {
            key: 'r4', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
						["en", "NPFS"],
						["it", "NPFS"],
						["nl", "NPFS"],
						["fr", "NPFS"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyContactedMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '4')
        },
		{
            key: 'r5', role: 'responseRow', cells: [
                {
                    key: 'col0', role: 'label', content: new Map([
                        ["en", "Other medical services"],
                        ["it", "Other medical services"],
                        ["nl", "Andere medische hulp."],
                        ["fr", "Autre service médical"],
                    ]),
                },
                { ...ddOptions }
            ],
            displayCondition: expWithArgs('responseHasKeysAny', keyContactedMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '5')
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
 * WHY VISITED AND CONTACTED NO MEDICAL SERVICE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ key to check if medical services have been visited.
 * @param keyContactedMedicalServ key to check if medical services have been contacted.
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const visitedNoMedicalService = (parentKey: string, keyVisitedMedicalServ?: string, keyContactedMedicalServ?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov18';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat is de belangrijkste reden dat u geen contact heeft opgenomen met een beroepsbeoefenaar in de gezondheidszorg voor de symptomen die u vandaag heeft gemeld?"],
            ["fr-be", "Quelle est la principale raison pour laquelle vous n'avez contacté aucun professionnel de la santé pour les symptômes que vous avez signalés aujourd'hui ?"],
            ["de-be", "Was ist der Hauptgrund, warum Sie wegen der Symptome, die Sie heute gemeldet haben, keinen Arzt kontaktiert haben?"],
            ["en", "What is the main reason for which you did not contact any health professional for the symptoms you declared today?"],
            ["it", "What is the main reason for which you did not contact any health professional for the symptoms you declared today?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0'),
            expWithArgs('responseHasKeysAny', keyContactedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0')
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
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om uit te zoeken waarom sommige mensen geen medische hulp zoeken."],
                    ["fr-be", "Pour savoir pourquoi certaines personnes ne consultent pas un médecin."],
                    ["de-be", "Um festzustellen, warum manche Menschen keine ärztliche Hilfe aufsuchen."],
                    ["en", "To understand why some people do not consult a doctor."],
                    ["it", "To understand why some people do not consult a doctor."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden mogelijk."],
                    ["fr-be", "Plusieurs réponses sont possibles."],
                    ["de-be", "Mehrere Antworten möglich."],
                    ["en", "Multiple answers are possible."],
                    ["it", "Multiple answers are possible."],
                ]),
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
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
                ["it", "Multiple answers possible"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Mijn symptomen kwamen recent op."],
                ["fr-be", "Mes symptômes sont apparus récemment."],
                ["de-be", "Meine Symptome traten erst kürzlich auf."],
                ["en", "My symptoms appeared very recently"],
                ["it", "My symptoms appeared very recently"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Mijn symptomen zijn mild."],
                ["fr-be", "Mes symptômes sont légers."],
                ["de-be", "Meine Symptome sind mild."],
                ["en", "My symptoms are mild"],
                ["it", "My symptoms are mild"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik heb deze symptomen vaker."],
                ["fr-be", "Je présente régulièrement ces symptômes."],
                ["de-be", "Ich habe diese Symptome öfter."],
                ["en", "I have these symptoms often"],
                ["it", "I have these symptoms often"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik denk te weten wat ik heb en gebruik eigen medicatie."],
                ["fr-be", "Je pense que je sais ce dont je souffre, et j'ai recours à ma propre médication."],
                ["de-be", "Ich meine zu wissen, was ich habe, und verwende meine eigene Medikation."],
                ["en", "I think I know what I have and I self-medicate"],
                ["it", "I think I know what I have and I self-medicate"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik denk dat er geen goede behandeling is voor mijn ziekte."],
                ["fr-be", "Je pense qu'il n'existe pas de bon traitement pour ma maladie."],
                ["de-be", "Ich denke, dass es keine gute Behandlung für meine Krankheit gibt."],
                ["en", "I think there is no effective treatment for the disease I have"],
                ["it", "I think there is no effective treatment for the disease I have"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Het is te moeilijk om snel een afspraak te verkrijgen."],
                ["fr-be", "Il est trop difficile d'obtenir rapidement un rendez-vous."],
                ["de-be", "Es ist zu schwierig, schnell einen Termin zu bekommen."],
                ["en", "It is too hard to get an appointment quickly"],
                ["it", "It is too hard to get an appointment quickly"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Ik heb onvoldoende tijd."],
                ["fr-be", "Je n'ai pas assez de temps."],
                ["de-be", "Ich habe nicht genug Zeit."],
                ["en", "I do not have time"],
                ["it", "I do not have time"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Omwille van financiële redenen."],
                ["fr-be", "Pour des raisons financières."],
                ["de-be", "Aus finanziellen Gründen."],
                ["en", "For financial reasons"],
                ["it", "For financial reasons"],
            ])
        },
        {
            key: '9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            content: new Map([
                ["nl-be", "Omwille van angst voor de gevolgen als de dokter vermoedt dat ik COVID-19 heb."],
                ["fr-be", "Par crainte des conséquences si le médecin me suspecte d'avoir contracté le coronavirus."],
                ["de-be", "Aufgrund von Angst vor den Folgen, wenn der Arzt vermutet, dass ich COVID-19 habe."],
                ["en", "For fear of consequences if the doctor thinks I have COVID-19"],
                ["it", "For fear of consequences if the doctor thinks I have COVID-19"],
            ])
        },
        {
            key: '10', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '11'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Mijn symptomen verschenen zeer recent"],
                ["fr-be", "Mes symptômes sont apparus très récemment"],
                ["de-be", "Meine Symptome sind vor kurzem aufgetreten"],
                ["en", "My symptoms appeared very recently"],
                ["it", "My symptoms appeared very recently"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
                ["it", "Describe here (optional)"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet / ik wil niet antwoorden"],
                ["fr-be", "Je ne sais pas / Je ne veux pas répondre"],
                ["de-be", "Ich weiß nicht / ich möchte nicht antworten"],
                ["en", "I don't know / I don't want to answer"],
                ["it", "I don't know / I don't want to answer"],
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
 * FEAR CONSEQUENCES
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVisitedMedicalServ key to Q7.
 * @param keyContactedMedicalServ key to Q8.
 * @param keyvisitedNoMedicalService key to Qcov18.
 *
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const consFear = (parentKey: string, keyVisitedMedicalServ?: string, keyContactedMedicalServ?: string, keyvisitedNoMedicalService?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Qcov18b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Kan u aangeven welke gevolgen u vreest?"],
            ["fr-be", "Pouvez-vous indiquer les conséquences que vous craignez ?"],
            ["de-be", "Können Sie angeben, welche Folgen Sie fürchten?"],
            ["en", "Can you specify which consequences you mainly fear? "],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyVisitedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0'),
            expWithArgs('responseHasKeysAny', keyContactedMedicalServ, [responseGroupKey, multipleChoiceKey].join('.'), '0'),
            expWithArgs('responseHasKeysAny', keyvisitedNoMedicalService, [responseGroupKey, multipleChoiceKey].join('.'), '9')
        )
    );

    // INFO POPUP
    // None

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
                ["it", "Multiple answers possible"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik moet een test laten uitvoeren."],
                ["fr-be", "Je dois me faire tester."],
                ["de-be", "Ich muss einen Test durchführen lassen."],
                ["en", "Have to do a diagnostic test."],
                ["it", "Have to do a diagnostic test."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik moet in quarantaine."],
                ["fr-be", "Je dois me mettre en quarantaine."],
                ["de-be", "Ich muss in Quarantäne gehen."],
                ["en", "Have to be isolated."],
                ["it", "Have to be isolated."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik moet stoppen met werken."],
                ["fr-be", "Je dois arrêter de travailler."],
                ["de-be", "Ich muss mit dem Arbeiten aufhören."],
                ["en", "Have to stop working."],
                ["it", "Have to stop working."],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Veroordeeld worden door anderen."],
                ["fr-be", "Le jugement des autres."],
                ["de-be", "Durch andere verurteilt werden."],
                ["en", "To be judged by others."],
                ["it", "To be judged by others."],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Door anderen buitengesloten te worden."],
                ["fr-be", "Être exclu par les autres."],
                ["de-be", "Von anderen ausgeschlossen werden."],
                ["en", "To be excluded by others."],
                ["it", "Essere esclusi da altri."],
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
                ["it", "Other"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["it", "Describe here (optional)"],
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
 * TOOK ANY MEDICATION
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const tookMedication = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q9';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you take medication for these symptoms?"],
            ["it", "Did you take medication for these symptoms?"],
            ["nl", "Heb je vanwege je klachten medicijnen gebruikt? En zo ja, welke?"],
            ["fr", "Avez-vous pris des médicaments pour ces symptômes?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out who gets treated, and how effective treatment is."],
                    ["it", "To find out who gets treated, and how effective treatment is."],
                    ["nl", "Om uit te zoeken wie er medicatie neemt, en hoe effectief deze behandeling is."],
                    ["fr", "Pour savoir qui se fait soigner, et si le traitement est efficace."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "How should I answer it?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Only record those medications that you used because of this illness. If you are on other medications because of a pre-existing illness then do not record these."],
                    ["it", "Only record those medications that you used because of this illness. If you are on other medications because of a pre-existing illness then do not record these."],
                    ["nl", "Geef alleen de medicatie aan die je gebruikt in verband met je gemelde klachten. Medicatie die je gebruikt voor een al bestaande aandoening hoef je niet te noemen."],
                    ["fr", "Ne saisissez que les médicaments que vous pris en raison de cette épisode de maladie. Si vous avez pris d'autres médicaments pour une maladie préexistante, alors ne les enregistrez pas."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['it', 'Select all options that apply'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
        style: [{ key: 'className', value: 'mb-1' }]
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '6'),
            content: new Map([
                ["en", "No medication"],
                ["it", "No medication"],
                ["nl", "Nee, ik heb geen medicijnen gebruikt"],
                ["fr", "Aucun médicament"],
            ])
        },
        {
            key: '1',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Pain killers (e.g. paracetamol, lemsip, ibuprofen, aspirin, calpol, etc)"],
                ["it", "Pain killers (e.g. paracetamol, lemsip, ibuprofen, aspirin, calpol, etc)"],
                ["nl", "Ja, pijnstillers zoals paracetamol, aspirine of ibuprofen"],
                ["fr", "Médicaments contre la douleur ou la fièvre (p. ex. Paracetamol, Dafalgan, Ibuprofen, Aspirin, Pretuval, etc)"],
            ])
        },
        {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Cough medication (e.g. expectorants)"],
                ["it", "Cough medication (e.g. expectorants)"],
                ["nl", "Ja, medicijnen om het hoesten te onderdrukken"],
                ["fr", "Médicaments contre la toux (p. ex. expectorants)"],
            ])
        },
        {
            key: '9',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Hayfever medication"],
                ["it", "Hayfever medication"],
                ["nl", "Ja, medicatie tegen hooikoorts"],

            ])
        },
        {
            key: '3',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Antivirals (Tamiflu, Relenza)"],
                ["it", "Antivirals (Tamiflu, Relenza)"],
                ["nl", "Ja, antivirale middelen zoals Tamiflu of Relenza"],
                ["fr", "Antiviraux (par ex. Tamiflu)"],
            ])
        },
        {
            key: '4',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Antibiotics"],
                ["it", "Antibiotics"],
                ["nl", "Ja, antibiotica"],
                ["fr", "Antibiotiques"],
            ])
        },
        {
            key: '7',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Homeopathy"],
                ["it", "Homeopathy"],
                ["nl", "Ja, homeopathische middelen"],
                ["fr", "Homéopathie"],
            ])
        },
        {
            key: '8',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Alternative medicine (essential oil, phytotherapy, etc.)"],
                ["it", "Alternative medicine (essential oil, phytotherapy, etc.)"],
                ["nl", "Ja, alternatieve medicatie (essentiële olie, fytotherapie enz.)"],
                ["fr", "Médecines douces (huiles essentielles, phytothérapie, etc.)"],
            ])
        },
        {
            key: '5',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0', '6'),
            content: new Map([
                ["en", "Other"],
                ["it", "Other"],
                ["nl", "Ja, andere medicatie"],
                ["fr", "Autre"],
            ])
        },
        {
            key: '6',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["it", "I don't know/can't remember"],
                ["nl", "Dit wil ik niet aangeven"],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
 * WHEN DID YOU TAKE ANTIVIRALS
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyMedicineToken: reference to quesiton if medicine token
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const whenAntivirals = (parentKey: string, keyMedicineToken: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q9b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How long after the onset of symptoms / medical problems did you start taking antiviral medication?"],
            ["it", "How long after the onset of symptoms / medical problems did you start taking antiviral medication?"],
            ["nl-be", "Hoe snel nadat uw symptomen/klachten opkwamen bent u begonnen met het gebruiken van antivirale middelen?"],
            ["fr-be", "Combien de temps après la survenue des symptômes / des troubles médicaux avez-vous commencé à prendre des médicaments antiviraux ?"],
            ["de-be", "Wie schnell nach dem Auftreten Ihrer Symptome/Beschwerden haben Sie mit der Einnahme antiviraler Mittel begonnen?"],
            ["nl", "Hoe snel nadat je klachten opkwamen ben je begonnen met het gebruiken van antivirale middelen?"],
            ["fr", "Combien de temps après le début de vos symptômes avez-vous commencé à prendre des médicaments antiviraux ?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyMedicineToken, [responseGroupKey, multipleChoiceKey].join('.'), '3')
    )

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To study how long a person waits before taking antivirals."],
                    ["it", "To study how long a person waits before taking antivirals."],
                    ["nl-be", "Om te onderzoeken hoe lang men wacht om antivirale middelen in te nemen."],
                    ["fr-be", "Pour étudier combien de temps les personnes attendent avant de prendre des antiviraux."],
                    ["de-be", "Um festzustellen, wie lange man wartet, um antivirale Mittel einzunehmen."],
                    ["nl", "Antivirale middelen werken beter wanneer ze snel worden genomen na het begin van de klachten."],
                    ["fr", "Les antiviraux sont supposés être plus efficace si pris rapidement après l'apparition de la maladie ."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please indicate the number of days that passed between the onset of symptoms and the day you began taking antivirals."],
                    ["it", "Please indicate the number of days that passed between the onset of symptoms and the day you began taking antivirals."],
                    ["nl-be", "Geef het aantal dagen tussen het begin van de klachten en de dag waarop u met de antivirale middelen begon."],
                    ["fr-be", "Veuillez indiquer le nombre de jours écoulés entre l'apparition des symptômes et le jour où vous avez commencé à prendre les antiviraux."],
                    ["de-be", "Geben Sie die Anzahl der Tage zwischen dem Beginn der Beschwerden und dem Tag ein, an dem Sie mit den antiviralen Mitteln begannen."],
                    ["nl", "Geef het aantal dagen tussen het begin van de klachten en de dag dat je met de antivirale middelen begon."],
                    ["fr", "Signaler le temps écoulé jusqu'à ce que vous ayez commencé à prendre des antiviraux (qui peut ne pas être le même jour que celui ou vous avez obtenu votre prescription)."],
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
                ["en", "Same day (within 24 hours)"],
                ["it", "Same day (within 24 hours)"],
                ["nl-be", "Dezelfde dag (binnen 24 uur)"],
                ["fr-be", "Le jour même (dans les 24 heures)"],
                ["de-be", "Am selben Tag (innerhalb von 24 Stunden)"],
                ["nl", "Dezelfde dag (binnen 24 uur)"],
                ["fr", "Le jour même (dans les 24 heures)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "1 day"],
                ["it", "1 day"],
                ["nl-be", "1 dag"],
                ["fr-be", "1 jour"],
                ["de-be", "1 Tag"],
                ["nl", "1 dag"],
                ["fr", "1 jour"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "2 days"],
                ["it", "2 days"],
                ["nl-be", "2 dagen"],
                ["fr-be", "2 jours"],
                ["de-be", "2 Tage"],
                ["nl", "2 dagen"],
                ["fr", "2 jours"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "3 days"],
                ["it", "3 days"],
                ["nl-be", "3 dagen"],
                ["fr-be", "3 jours"],
                ["de-be", "3 Tage"],
                ["nl", "3 dagen"],
                ["fr", "3 jours"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "4 days"],
                ["it", "4 days"],
                ["nl-be", "4 dagen"],
                ["fr-be", "4 jours"],
                ["de-be", "4 Tage"],
                ["nl", "4 dagen"],
                ["fr", "4 jours"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "5-7 days"],
                ["it", "5-7 days"],
                ["nl-be", "5-7 dagen"],
                ["fr-be", "5–7 jours"],
                ["de-be", "5-7 Tage"],
                ["nl", "5-7 dagen"],
                ["fr", "5 – 7 jours"],
            ])
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["en", "More than 7 days"],
                ["it", "More than 7 days"],
                ["nl-be", "Meer dan 7 dagen"],
                ["fr-be", "Plus de 7 jours"],
                ["de-be", "mehr als 7 Tage"],
                ["nl", "Meer dan 7 dagen"],
                ["fr", "Plus de 7 jours"],
            ])
        }, {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["it", "I don't know/can't remember"],
                ["nl-be", "Dat weet ik niet (meer)"],
                ["fr-be", "Je ne sais pas / je ne m'en souviens plus"],
                ["de-be", "Das weiß ich nicht (mehr)"],
                ["nl", "Dat weet ik niet (meer)."],
                ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
 * DAILY ROUTINE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dailyRoutine = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u vanwege uw klachten uw dagelijkse bezigheden moeten aanpassen?"],
            ["fr-be", "Avez-vous dû adapter vos activités quotidiennes à cause de vos symptômes ?"],
            ["de-be", "Haben Sie aufgrund Ihrer Beschwerden Ihre täglichen Beschäftigungen anpassen müssen?"],
            ["en", "Did you change your daily routine because of your illness?"],
            ["it", "Did you change your daily routine because of your illness?"],
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
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om het effect te bepalen van de klachten op uw dagelijks leven."],
                    ["fr-be", "Pour déterminer l'effet des symptômes sur votre vie quotidienne."],
                    ["de-be", "Um die Wirkung der Beschwerden auf Ihr tägliches Leben zu bestimmen."],
                    ["en", "To determine how the symptoms are impacting your daily life."],
                    ["it", "To determine how the symptoms are impacting your daily life."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten of u afwezig was op uw werk of school als gevolg van uw symptomen, of dat u uw routine (vb: niet kunnen sporten) op een andere manier hebt veranderd. Indien u een student bent en online-lessen niet hebt kunnen volgen als gevolg van uw symptomen, kiest u ook best de tweede optie. We vragen naar veranderingen als gevolg van uw symptomen/klachten, niet omwille van een mogelijke quarantaine."],
                    ["fr-be", "Nous voulons savoir si vous avez dû vous absenter de votre travail ou si vous n'avez pas su fréquenter l'école en raison de vos symptômes, ou si vous avez modifié votre routine de quelque manière que ce soit (par exemple, ne pas avoir pu pratiquer de sport). Si vous êtes étudiant(e) et que vous n'avez pas pu assister aux cours en ligne en raison de vos symptômes, choisissez également la deuxième option. Nous nous intéressons aux changements en raison de vos symptômes/plaintes, et non en raison d'une éventuelle quarantaine."],
                    ["de-be", "Wir möchten wissen, ob Sie bei der Arbeit oder in der Schule als Folge Ihrer Symptome anwesend waren, oder ob Sie Ihre Routine (zum Beispiel: keine Sportausübung möglich) auf eine andere Art verändert haben. Wenn Sie ein Student sind und als Folge Ihrer Symptome Online-Lektionen nicht folgen konnten, wählen Sie am besten die zweite Alternative. Wir fragen nach Veränderungen als Folge Ihrer Symptome/Beschwerden, nicht aufgrund einer möglichen Quarantäne."],
                    ["en", "We want to know if you have missed work or school due to your symptoms, or if you have modified your daily routine in any way (for example, if you were unable to engage in sport activities). If you are a student, and were unable to attend online classes due to your symptoms, you should also select option 2. We are interested in changes due to your symptoms/complaints and not due to any quarantine."],
                    ["it", "We want to know if you have missed work or school due to your symptoms, or if you have modified your daily routine in any way (for example, if you were unable to engage in sport activities). If you are a student, and were unable to attend online classes due to your symptoms, you should also select option 2. We are interested in changes due to your symptoms/complaints and not due to any quarantine."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        content: generateLocStrings(
            new Map([
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
                ["en", "Multiple answers possible"],
                ["it", "Multiple answers possible"],
            ])),
        style: [{ key: 'className', value: 'mb-1' }]
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0',
            role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik heb mijn dagelijkse bezigheden zoals normaal kunnen doen"],
                ["fr-be", "Non, j'ai pu vaquer à mes occupations quotidiennes comme d'habitude"],
                ["de-be", "Nein, ich habe meine täglichen Beschäftigungen wie normal durchführen können"],
                ["en", "No, I was able to go about my daily activities as usual"],
                ["it", "No, I was able to go about my daily activities as usual"],
            ])
        },
        {
            key: '1',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, maar ik heb geen vrij genomen van school of werk"],
                ["fr-be", "Oui, mais je n'ai pas pris de congé à l'école ou au travail"],
                ["de-be", "Ja, aber ich habe weder Schule noch Arbeit genommen"],
                ["en", "Yes, but I did not take time off school or work"],
            ])
        },
        {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, ik heb mijn beroep niet kunnen uitoefenen of ben niet naar school kunnen gaan"],
                ["fr-be", "Oui, je n'ai pas pu travailler ou me rendre à l'école"],
                ["de-be", "Ja, ich konnte meinen Beruf nicht ausüben oder konnte nicht zur Schule gehen"],
                ["en", "Yes, I took time off school or work"],
                ["it", "Yes, I took time off school or work"],
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
 * DAILY ROUTINE TODAY
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyDailyRoutine: reference to question if participant missed work/school
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dailyRoutineToday = (parentKey: string, keyDailyRoutine: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10b';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Kan u op dit moment nog steeds niet werken of school volgen vanwege de symptomen/klachten?"],
            ["fr-be", "Êtes-vous actuellement toujours dans l'incapacité de travailler ou de fréquenter l'école en raison des symptômes/plaintes ?"],
            ["de-be", "Können Sie in diesem Augenblick aufgrund der Symptome/Beschwerden noch immer nicht arbeiten oder die Schule besuchen?"],
            ["en", "Are you currently still unable to work or attend school due to your symptoms/complaints?"],
            ["it", "Are you currently still unable to work or attend school due to your symptoms/complaints?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyDailyRoutine, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om het effect te bepalen van de klachten op uw dagelijks leven."],
                    ["fr-be", "Pour déterminer l'effet des symptômes sur votre vie quotidienne."],
                    ["de-be", "Um die Wirkung der Beschwerden auf Ihr tägliches Leben zu bestimmen."],
                    ["en", "To determine how the symptoms are impacting your daily life."],
                    ["it", "To determine how the symptoms are impacting your daily life."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord 'Ja' als u vanwege klachten vandaag nog niet kan werken of naar school gaan."],
                    ["fr-be", "Répondez « Oui » si vous ne pouvez pas vous rendre au travail ou à l'école aujourd'hui en raison de certains symptômes."],
                    ["de-be", "Antworten Sie 'Ja', wenn Sie aufgrund von Beschwerden heute noch nicht arbeiten oder zur Schule gehen können."],
                    ["en", "Answer 'yes' if you missed work or school today due to certain symptoms."],
                    ["it", "Answer 'yes' if you missed work or school today due to certain symptoms."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0',
            role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
                ["it", "Yes"],
            ])
        },
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
                ["en", "No"],
                ["it", "No"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["nl-be", "Andere (ik hoefde vandaag sowieso niet te werken of niet naar school te gaan)"],
                ["fr-be", "Autre (je ne devais pas travailler ou à aller à l'école aujourd'hui de toute façon)"],
                ["de-be", "Andere (ich brauchte heute sowieso nicht zu arbeiten oder nicht zur Schule zu gehen)"],
                ["en", "Other (I did not have to work or go to school today in any case)"],
                ["it", "Other (I did not have to work or go to school today in any case)"],
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
 * DAILY ROUTINE DAYS MISSED WORK/SCHOOL
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyDailyRoutine: reference to question if participant missed work/school
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const dailyRoutineDaysMissed = (parentKey: string, keyDailyRoutine: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10c'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoeveel dagen hebt u niet normaal kunnen werken of bent u niet naar school geweest (terwijl dat wel had gemoeten)?"],
            ["fr-be", "Durant combien de jours n’avez-vous pas pu travailler normalement, ou n’êtes-vous pas allé(e) à l'école (alors que vous auriez dû le faire) ?"],
            ["de-be", "Wie viele Tage konnten Sie nicht normal arbeiten oder waren Sie nicht in der Schule (während Sie das jedoch eigentlich gemusst hätten)?"],
            ["en", "For how many days have you been unable to work normally/go to school (when you otherwise would have)?"],
            ["it", "For how many days have you been unable to work normally/go to school (when you otherwise would have)?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('responseHasKeysAny', keyDailyRoutine, [responseGroupKey, multipleChoiceKey].join('.'), '2')
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om uit te rekenen hoeveel dagen mensen niet kunnen werken/niet naar school gaan vanwege klachten."],
                    ["fr-be", "Pour calculer le nombre de jours pendant lesquels les citoyens ne peuvent pas se rendre au travail ou à l'école en raison de certains symptômes."],
                    ["de-be", "Um auszurechnen, wie viele Tagen Menschen aufgrund von Beschwerden nicht arbeiten können/nicht zur Schule gehen können."],
                    ["en", "To calculate the number of days a person misses work or school due to certain symptoms."],
                    ["it", "To calculate the number of days a person misses work or school due to certain symptoms."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Tel alleen de dagen waar u normaal had moeten werken/school had moeten volgen. Maak een zo goed als mogelijke inschatting."],
                    ["fr-be", "Ne comptez que les jours au cours desquels vous auriez dû normalement vous rendre au travail/à l'école. Fournissez l'estimation la plus précise possible."],
                    ["de-be", "Zählen Sie nur die Tage, an denen Sie normalerweise hätten arbeiten / dem Schulunterricht folgen müssen. Machen Sie eine möglichst gute Einschätzung."],
                    ["en", "Only count the days that you would otherwise have gone to work or school. Provide as precise an estimate as possible."],
                    ["it", "Only count the days that you would otherwise have gone to work or school. Provide as precise an estimate as possible."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    const ddOptions = initDropdownGroup('ddg', [
        {
            key: '0', role: 'option', content: new Map([
                ["nl-be", "1 dag"],
                ["fr-be", "1 jour"],
                ["de-be", "1 Tage"],
                ["en", "1 day"],
                ["it", "1 day"],
            ]),
        },
        {
            key: '1', role: 'option', content: new Map([
                ["nl-be", "2 dagen"],
                ["fr-be", "2 jours"],
                ["de-be", "2 Tagen"],
                ["en", "2 days"],
                ["it", "2 days"],
            ]),
        },
        {
            key: '2', role: 'option', content: new Map([
                ["nl-be", "3 dagen"],
                ["fr-be", "3 jours"],
                ["de-be", "3 Tagen"],
                ["en", "3 days"],
                ["it", "3 days"],
            ]),
        },
        {
            key: '3', role: 'option', content: new Map([
                ["nl-be", "4 dagen"],
                ["fr-be", "4 jours"],
                ["de-be", "4 Tagen"],
                ["en", "4 days"],
                ["it", "4 days"],
            ]),
        },
        {
            key: '4', role: 'option', content: new Map([
                ["nl-be", "5 dagen"],
                ["fr-be", "5 jours"],
                ["de-be", "5 Tagen"],
                ["en", "5 days"],
                ["it", "5 days"],
            ]),
        },
        {
            key: '5', role: 'option', content: new Map([
                ["nl-be", "6 to 10 dagen"],
                ["fr-be", "6 to 10jours"],
                ["de-be", "6 zur 10 Tagen"],
                ["en", "6 to 10 days"],
                ["it", "6 to 10 days"],
            ]),
        },
        {
            key: '6', role: 'option', content: new Map([
                ["nl-be", "11 to 15 dagen"],
                ["fr-be", "11 to 15 jours"],
                ["de-be", "11 zur 15 Tagen"],
                ["en", "11 to 15 days"],
                ["it", "11 to 15 days"],
            ]),
        },
        {
            key: '7', role: 'option', content: new Map([
                ["nl-be", "More than 15 days"],
                ["fr-be", "More than 15 days"],
                ["de-be", "Mehr als 15 Tage"],
                ["en", "More than 15 days"],
                ["it", "More than 15 days"],
            ]),
        },
    ]);

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent(ddOptions, rg?.key);

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
 * PERCIEVED CAUSE OF SYMPTOMS
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const causeOfSymptoms = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q11';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What do you think is causing your symptoms?"],
            ["it", "What do you think is causing your symptoms?"],
            ["nl-be", "Heeft u zelf enig idee waar uw symptomen/klachten vandaan komen?"],
            ["fr-be", "Avez-vous une idée de l'origine de vos symptômes / troubles médicaux ?"],
            ["de-be", "Haben Sie selbst irgendeine Ahnung, woher Ihre Symptome/Beschwerden kommen?"],
            ["nl", "Heb je zelf enig idee waar je klachten vandaan komen?"],
            ["fr", "Quelle est selon vous l'origine de vos symptômes ?"],
        ]))
    );

    // CONDITION
    // None

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this question?"],
                    ["it", "Why are we asking this question?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To see if our assessment of your illness, based on your symptoms, matches what you believe to be the cause. You may have a better idea of the cause of your illness than our computer algorithms."],
                    ["it", "To see if our assessment of your illness, based on your symptoms, matches what you believe to be the cause. You may have a better idea of the cause of your illness than our computer algorithms."],
                    ["nl-be", "Om te achterhalen of onze beoordeling van uw ziekte op basis van uw symptomen overeenkomt met wat u denkt dat de oorzaak is. U heeft misschien een beter idee van de oorzaak van uw ziekte dan onze computeralgoritmen."],
                    ["fr-be", "Pour savoir si notre évaluation de votre maladie, basée sur vos symptômes, correspond à ce que vous pensez en être la cause. Vous avez peut-être une meilleure idée de la cause de votre maladie que nos algorithmes informatiques."],
                    ["de-be", "Um zu ermitteln, ob unsere Beurteilung Ihrer Krankheit auf der Grundlage Ihrer Symptome mit dem übereinstimmt, was Ihrer Meinung nach die Ursache ist. Sie haben vielleicht eine bessere Vorstellung von der Ursache Ihrer Krankheit als unsere Computeralgorithmen."],
                    ["nl", "Om uit te zoeken of je eigen idee wat de oorzaak kan zijn past bij je eigen klachten, en klachten van anderen. Ook heb je waarschijnlijk een beter idee wat het zou kunnen zijn dan computer algoritmes."],
                    ["fr", "Pour nous aider à trouver si notre évaluation de votre maladie en fonction de vos symptômes correspond à ce que vous croyez en être la cause. Vous pourriez avoir une meilleure idée de ce qui est la cause de votre maladie que nos algorithmes informatiques."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "How should I answer this question?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "If you are reasonably sure of the cause of your symptoms, select the appropriate box. Otherwise, select 'No, I Don’t know'."],
                    ["it", "If you are reasonably sure of the cause of your symptoms, select the appropriate box. Otherwise, select 'No, I Don’t know'."],
                    ["nl-be", "Als u redelijk zeker weet wat uw symptomen veroorzaakt, vink dan het juiste vakje aan. Vink anders 'Nee, ik heb geen idee' aan."],
                    ["fr-be", "Si vous êtes raisonnablement certain(e) de la cause de vos symptômes, cochez la case appropriée. Sinon, cochez « Non, je n'en ai aucune idée »."],
                    ["de-be", "Wenn Sie ziemlich genau wissen, was Ihre Symptome verursacht, dann kreuzen Sie das richtige Kästchen an (oder haken es ab). Andernfalls kreuzen Sie 'Nein, ich habe keine Ahnung' an."],
                    ["nl", "Ben je vrij zeker van de oorzaak van je klachten geef deze oorzaak dan aan."],
                    ["fr", "Si vous êtes raisonnablement sûr de ce qui est la cause de vos symptômes, s'il vous plaît cochez la case appropriée. Sinon, cochez la case « Je ne sais pas »."],
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
                ["en", "Yes, I have flu or flu-like illness"],
                ["it", "Yes, I have flu or flu-like illness"],
                ["nl-be", "Ja, ik heb griep, of griepachtige verschijnselen"],
                ["fr-be", "Oui, j'ai la grippe, ou des symptômes de type grippal"],
                ["de-be", "Ja, ich habe Grippe oder grippeartige Symptome"],
                ["nl", "Ja, ik heb griep, of griepachtige verschijnselen"],
                ["fr", " Grippe ou syndrome pseudo-grippal"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, I have a common cold"],
                ["it", "Yes, I have a common cold"],
                ["nl-be", "Ja, ik ben verkouden"],
                ["fr-be", "Oui, j'ai un rhume"],
                ["de-be", "Ja, ich bin erkältet"],
                ["nl", "Ja, ik ben verkouden"],
                ["fr", "Rhume / refroidissement"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, I am suffering from an allergy/hay fever"],
                ["it", "Yes, I am suffering from an allergy/hay fever"],
                ["nl-be", "Ja, ik heb last van een allergie/ hooikoorts"],
                ["fr-be", "Oui, je souffre d'une allergie/du rhume des foins"],
                ["de-be", "Ja, ich habe Beschwerden aufgrund einer Allergie/ eines Heuschnupfens"],
                ["nl", "Ja ik heb last van een allergie/ hooikoorts"],
                ["fr", " Allergie / rhume des foins"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Yes, I am suffering from ashtma"],
                ["it", "Yes, I am suffering from ashtma"],
                ["nl-be", "Ja, ik heb last van astma"],
                ["fr-be", "Oui, je souffre d'asthme"],
                ["de-be", "Ja, ich habe Asthma-Beschwerden"],
                ["nl", "Ja, ik heb last van astma"],
                ["fr", "Asthme"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, I have gastroenteritis complaints or gastric flu"],
                ["it", "Yes, I have gastroenteritis complaints or gastric flu"],
                ["nl-be", "Ja, ik heb maag-darmklachten of buikgriep"],
                ["fr-be", "Oui, j'ai des problèmes gastro-intestinaux ou une grippe intestinale"],
                ["de-be", "Ja, ich habe Magen-Darm-Beschwerden oder eine Magen-Darm-Infektion (Gastroenteritis)"],
                ["nl", "Ja, ik heb maag-darmklachten of buikgriep"],
                ["fr", "Gastro-entérite / grippe intestinale"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "Yes, by the coronavirus (COVID-19)"],
                ["it", "Yes, by the coronavirus (COVID-19)"],
                ["nl-be", "Ja, het coronavirus (COVID-19)"],
                ["fr-be", "Oui, il s’agit du coronavirus (COVID-19)"],
                ["de-be", "Ja, COVID-19"],
                ["nl", "Ja, het nieuwe coronavirus (COVID-19)"],
                ["fr", "Nouveau coronavirus (COVID-19)"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Yes, I have another illness or cause which are causing these symptoms"],
                ["it", "Yes, I have another illness or cause which are causing these symptoms"],
                ["nl-be", "Ja, ik heb een andere ziekte of reden die de klachten hebben veroorzaakt"],
                ["fr-be", "Oui, ces symptômes ont été causés par une autre maladie ou par une autre origine"],
                ["de-be", "Ja, ich habe eine andere Krankheit oder Gründe, welche die Beschwerden verursacht haben"],
                ["nl", "Ja, ik heb een andere ziekte of reden die de klachten hebben veroorzaakt"],
                ["fr", "Autre"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "No, I don't know"],
                ["it", "No, I don't know"],
                ["nl-be", "Nee, ik heb geen idee"],
                ["fr-be", "Non, je n'en ai aucune idée"],
                ["de-be", "Nein, ich habe keine Ahnung"],
                ["nl", "Nee, ik heb geen idee"],
                ["fr", "Je ne sais pas"],
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


export const WeeklyQuestions = {
    causeOfSymptoms,
    consentForSymptoms,
    consFear,
    contactedMedicalService,
    contactedMedicalServiceWhen,
    covidHouseholdContact,
    covidSymptomsContact,
    dailyRoutine,
    dailyRoutineToday,
    dailyRoutineDaysMissed,
    feverGroup: {
        all: getFullFeverGroup,
        feverStart,
        feverDevelopedSuddenly,
        didUMeasureTemperature,
        highestTemprerature,
    },
    hasSymptomsGroup,
    pcrHouseholdContact,
    pcrTestedContact,
    sameIllnes,
    symptomps,
    symptomsStart,
    symptomsEnd,
    symptomsSuddenlyDeveloped,
    tookMedication,
    userConsentedSymptomsGroup,
    visitedMedicalService,
    visitedGP,
    visitedMedicalServiceWhen,
    visitedNoMedicalService,
    whenAntivirals,
}
