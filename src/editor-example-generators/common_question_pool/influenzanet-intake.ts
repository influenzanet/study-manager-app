import { SurveyItem } from "survey-engine/lib/data_types";
import { ComponentEditor } from "../../editor-engine/survey-editor/component-editor";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions";


/**
 * GENDER: Single choice question about gender
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const gender = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q1';
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your gender?"],
            ["nl", "Wat is je geslacht?"],
            ["nl-be", "Wat is uw geslacht?"],
            ["fr", "Quel est votre sexe ?"],
            ["fr-be", "Quel est votre sexe ?"],
            ["de-be", "Was ist Ihr Geschlecht?"],
            ["it", "Qual è il tuo genere?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "To find out whether the chance of getting flu is different between genders."],*/
                    ["en", "In order to examine the differences between men and women."],
                    ["nl", "Om te kijken naar verschillen tussen mannen en vrouwen."],
                    ["nl-be", "Om te kijken naar verschillen tussen mannen en vrouwen."],
                    ["fr", "Pour savoir si le risque de contracter la grippe est différent entre hommes et femmes."],
                    ["fr-be", "Afin d’examiner les différences entre les hommes et les femmes."],
                    ["de-be", "Um nach Unterschieden zwischen Männern und Frauen zu suchen."],
                    ["it", "Siamo interessati a studiare le differenze tra uomini e donne nella probabilità di ammalarsi di influenza o covid-19"],

                ]),
                style: [{ key: 'variant', value: 'p' }, { key: 'className', value: 'm-0' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Male"],
                ["nl", "Man"],
                ["nl-be", "Man"],
                ["fr", "Homme"],
                ["fr-be", "Un homme"],
                ["de-be", "Mann"],
                ["it", "Maschio"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Female"],
                ["nl", "Vrouw"],
                ["nl-be", "Vrouw"],
                ["fr", "Femme"],
                ["fr-be", "Une femme"],
                ["de-be", "Frau"],
                ["it", "Femmina"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Other"],
                ["nl", "Anders"],
                ["nl-be", "Anders"],
                ["fr-be", "Autre"],
                ["de-be", "Anderes"],
                ["it", "Altro"]
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
 * AGE: Date of birth (year and month)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const date_of_birth = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q2'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your date of birth (year and month)?"],
            ["nl", "Wanneer ben je geboren (maand en jaar)?"],
            ["nl-be", "Wanneer bent u geboren (jaar en maand)?"],
            ["fr", "Quelle est votre date de naissance (mois et année) ?"],
            ["fr-be", "Quelle est votre date de naissance (l’année et le mois) ?"],
            ["de-be", "Wann sind Sie geboren (Jahr und Monat)?"],
            ["it", "Qual è la tua data di nascita? (anno e mese)"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "The chance of getting COVID-19 and the risk of more serious complications vary by age."],*/
                    ["en", "In order to examine the differences between age groups."],
                    ["nl", "Om te kijken naar verschillen tussen leeftijdsgroepen."],
                    ["nl-be", "Om te kijken naar verschillen tussen leeftijdsgroepen."],
                    ["fr", "Les chances de contracter la grippe et les risques de complications varient selon l'âge."],
                    ["fr-be", "Afin d’examiner les différences entre les tranches d’âge."],
                    ["de-be", "Um nach Unterschieden zwischen Altersgruppen zu suchen."],
                    ["it", "Siamo interessati a studiare le differenze tra i vari gruppi di età nella probabilità di ammalarsi di influenza o covid-19"],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const dateInputEditor = new ComponentEditor(undefined, {
        key: '1',
        role: 'dateInput'
    });
    dateInputEditor.setProperties({
        dateInputMode: { str: 'YM' },
        min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -3311280000) },
        max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
    })
    editor.addExistingResponseComponent(dateInputEditor.getComponent(), rg?.key);
    editor.addExistingResponseComponent({
        key: 'feedback',
        role: 'text',
        style: [{ key: 'className', value: 'fst-italic mt-1' }],
        displayCondition: expWithArgs('isDefined',
            expWithArgs('getResponseItem', editor.getItem().key, [responseGroupKey, '1'].join('.'))
        ),
        content: [
            {
                code: 'en', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' years old' }
                ]
            },
            {
                code: 'it', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' years old' }
                ]
            },
            {
                code: 'nl', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' jaren oud' }
                ]
            },
            {
                code: 'nl-be', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' jaren oud' }
                ]
            },
            {
                code: 'fr', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' ??' }
                ]
            },
            {
                code: 'fr-be', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' ans' }
                ]
            },
            {
                code: 'de-be', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' Jahr/e' }
                ]
            }
        ]
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
 * LOCATION (postal code): Simple input field to enter 4 numeric digits, embedded into a single choice for opt-out
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const postal_code = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /*["en", "What are the first four digits of your home postcode (the part before the space)?"],*/
            ["en", "What is your home postal code?"],
            ["nl", "Wat zijn de eerste vier cijfers van je postcode?"],
            ["nl-be", "Wat is de postcode van uw woonplaats?"],
            ["fr", "Quelle est le code postal de votre domicile ?"],
            ["fr-be", "Quel est le code postal de votre localité ?"],
            ["de-be", "Welche Postleitzahl hat Ihr Wohnsitz?"],
            ["it", "Qual è il codice postale della zona in cui vivi?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "To check how representative our sample is, and to see whether the chance of getting flu varies across the country."],*/
                    ["en", "In order to verify the representativeness of our cohort (the group of participants in this study), and to examine the geographical differences in the spread of the coronavirus and influenza."],
                    ["nl", "We doen onderzoek naar de regionale verspreiding van infecties."],
                    ["nl-be", "Om te controleren hoe representatief onze cohort (groep deelnemers aan deze studie) is, en om te kijken naar geografische verschillen in de verspreiding van COVID-19 en griep."],
                    ["fr", "Pour vérifier la représentativité de notre échantillon et pour voir si le risque de contracter la grippe varie à travers le pays."],
                    ["fr-be", "Afin de vérifier la représentativité de notre cohorte (le groupe de participants à cette étude), et d'examiner les différences géographiques au niveau de la propagation du coronavirus et de la grippe."],
                    ["de-be", "Um zu kontrollieren, wie repräsentativ unsere Kohorte (Teilnehmer-Gruppe an dieser Studie) ist, und um nach geografischen Unterschieden in der Verteilung von COVID-19 und Grippe zu suchen."],
                    ["it", "Siamo interessati a verificare la rappresentatività del nostro campione (il gruppo di partecipanti al nostro studio) e di esaminare le differenze geografiche nella diffusione dell'influenza o del coronavirus"],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", ""],
                    ["it", ""],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["nl-be", ""],
                    ["fr-be", ""],
                    ["de-be", ""],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", ""],
                    ["it", ""],
                    ["nl", "Het gaat alleen om de eerste 4 cijfers van je postcode (dus niet de letters)."],
                    ["nl-be", ""],
                    ["fr-be", ""],
                    ["de-be", ""],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'input',
            // style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["en", "Postal code:"],
                ["nl", "Postcode"],
                ["nl-be", "Postcode"],
                ["fr", "Code postal"],
                ["fr-be", "Code postal"],
                ["de-be", "Postleitzahl"],
                ["it", "Codice Postale"],
            ]),
            description: new Map([
                ["en", ""],
                ["it", ""],
                ["nl", "de eerste vier cijfers"],
                ["nl-be", ""],
                ["fr-be", ""],
                ["de-be", ""],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                /*["en", "I don't know/can't remember"],*/
                ["en", "I prefer not to answer this question"],
                ["nl", "Dit wil ik niet aangeven"],
                ["nl-be", "Dit wil ik niet aangeven"],
                ["fr", "Je ne sais pas / Je ne m'en souviens plus"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
                ["de-be", "Das möchte ich nicht angeben"],
                ["it", "Preferisco non rispondere a questa domanda"],
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
    editor.addValidation({
        key: 'r2',
        type: 'hard',
        rule: expWithArgs('or',
            expWithArgs('not', expWithArgs('hasResponse', itemKey, responseGroupKey)),
                          expWithArgs('checkResponseValueWithRegex', itemKey, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9]+$'),
            expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), '1')
        )
    });

    editor.addValidation({
        key: 'r2max',
        type: 'hard',
        rule: expWithArgs('not', expWithArgs('checkResponseValueWithRegex', itemKey, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9]{6,}$'))
    });

    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ["en", "Please enter the digits of your postal code"],
                ["it", "Per favore, inserisci il tuo codice postale"],
                ["nl", "Voer de eerste vier cijfers van je postcode in"],
                ["nl-be", "Voer de vier cijfers van je postcode in"],
                ["fr-be", "Entrez les quatre chiffres de votre code postal."],
                ["de-be", "Bitte geben Sie die vier Stellen Ihrer Postleitzahl ein"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
        }
    );

    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ["en", "Please enter at most 5 digits"],
                ["it", "Per favore, inserisci un massimo di 5 cifre"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2max'))
        }
    );

    return editor.getItem();
}


/**
 * MAIN ACTIVITY: single choice question about main activity
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const main_activity = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your main activity? Assume a normal situation, without any covid measures."],
            ["it", "Qual è la tua attività principale? (in una situazione normale, senza nessuna misura anticovid)."],
            ["nl", "Welke situatie is het meest van toepassing? Ga uit van de normale situatie (dus zonder eventuele coronamaatregelen)."],
            ["fr", "Quelle est votre activité principale?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is compared to the population as a whole, and to find out whether the chance of getting flu is different for people in different types of occupation."],
                    ["it", "Ci interessa studiare la rappresentatività del nostro campione rispetto alla popolazione totale e capire se la probabilità di ammalarsi di influenza o covid-19 può essere diversa a seconda dell'occupazione quotidiana."],
                    ["nl", "Met deze informatie kunnen we zien of de mensen die meedoen representatief zijn voor de bevolking."],
                    ["fr", "Afin de vérifier la représentativité de notre échantillon comparée à la population dans son ensemble, et savoir si le risque de contracter la grippe est différent pour les personnes ayant différents types d'occupation."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", 'Please, tick the box that most closely resembles your main occupation. For pre-school children who don\'t go to daycare tick the "other" box.'],
                    ["it", "Per favore, seleziona l'opzione che più da vicino rappresenta la tua attività lavorativa. Per bambini in età prescolare che non frequentano la materna o il nido, seleziona l'opzione 'altro'."],
                    ["nl", 'Selecteer wat van toepassing is. Voor kinderen die te jong zijn - selecteer "anders".'],
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
                ["en", "Paid employment, full time"],
                ["it", "Impiego retribuito, tempo pieno"],
                ["nl", "Ik werk fulltime in loondienst"],
                ["fr", "Employé à plein temps"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Paid employment, part time"],
                ["it", "Impiego retribuito, part time"],
                ["nl", "Ik werk parttime in loondienst"],
                ["fr", "Employé à temps partiel"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Self-employed (businessman, farmer, tradesman, etc.)"],
                ["it", "Lavoratore autonomo (libero professionista, commerciante, contadino, etc.)"],
                ["nl", "Ik werk als zelfstandige/ondernemer"],
                ["fr", "Indépendant (homme d'affaires , agriculteur , commerçant, etc.)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Attending daycare/school/college/university"],
                ["it", "Studente (scuola materna/asilo nido, scuola dell'obbligo, scuola superiore, università, etc.)"],
                ["nl", "Ik ben een scholier of student"],
                ["fr", "Ecolier, étudiant (garderie / école / université)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Home-maker (e.g. housewife)"],
                ["it", "Casalingo/a"],
                ["nl", "Ik ben huisman/huisvrouw"],
                ["fr", "Femme/homme au foyer"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Unemployed"],
                ["it", "Senza impiego"],
                ["nl", "Ik ben werkloos"],
                ["fr", "Sans-emploi"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Long-term sick-leave or parental leave"],
                ["it", "Congedo a lungo termine dall'attività lavorativa (per maternità/paternità, malattia, etc."],
                ["nl", "Ik ben thuis vanwege langdurige ziekte of zwangerschapsverlof"],
                ["fr", "En congé maladie à long terme, en congé maternité"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "Retired"],
                ["it", "In pensione"],
                ["nl", "Ik ben met pensioen"],
                ["fr", "Retraité"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["en", "Other"],
                ["it", "Altro"],
                ["nl", "Anders"],
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
 * LOCATION WORK (postal code): Simple input field to enter 4 numeric digits, embedded into a single choice for opt-out
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyMainActivity full key of the question about main activity, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const postal_code_work = (parentKey: string, keyMainActivity?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat is de postcode van de plek waar u het meeste van uw (werk)tijd doorbrengt (voorbeeld: werkplek/school/universiteit)?"],
            ["fr-be", "Quel est le code postal du lieu où vous passez la plupart de votre temps (de travail) (exemple : le lieu de travail/l’école/l’université) ?"],
            ["de-be", "Was ist die Postleitzahl, wo Sie den Großteil Ihrer (Arbeits-)Zeit verbringen (zum Beispiel: Arbeitsplatz/Schule/Universität)?"],
            ["en", "What is the postal code of your school/college/workplace (where you spend the majority of your working/studying time)?"],
            ["it", "Qual è il codice postale del tuo posto di lavoro/scuola/università? (il posto dove trascorri la maggior parte del tuo tempo lavorativo/di studio)"],
        ]))
    );

    // CONDITION
    if (keyMainActivity) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyMainActivity, [responseGroupKey, singleChoiceKey].join('.'), '0', '1', '2', '3')
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
                    ["it", "Perché ti facciamo questa domanda?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te bepalen hoe ver u zich op regelmatige basis verplaatst."],
                    ["fr-be", "En vue de pouvoir déterminer la distance que vous parcourez régulièrement lors de vos déplacements."],
                    ["de-be", "Um zu bestimmen, wie weit Sie sich auf regelmäßiger Basis (fort-)bewegen."],
                    ["en", "To be able to determine the distance you regularly travel during your movements."],
                    ["it", "Ci interessa stimare l'entità dei tuoi spostamenti su base quotidiana."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'input',
            // style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Postcode"],
                ["fr-be", "Code postal"],
                ["de-be", "Postleitzahl"],
                ["en", "Postal code"],
                ["it", "Codice Postale"],
            ]),
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Dit wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
                ["de-be", "Das weiß ich nicht"],
                ["en", "I don’t know/can’t remember"],
                ["it", "Non so/non ricordo"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Niet van toepassing/ik heb geen vaste werkplek"],
                ["fr-be", "Non applicable/je n'ai pas de lieu de travail fixe"],
                ["de-be", "Entfällt/ich habe keinen festen Arbeitsplatz"],
                ["en", "Not applicable (e.g. don’t have a fixed workplace)"],
                ["it", "Non applicabile (ad es. se non hai una locazione di lavoro fissa"],
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
    editor.addValidation({
        key: 'r2',
        type: 'hard',
        rule: expWithArgs('or',
            expWithArgs('not', expWithArgs('hasResponse', itemKey, responseGroupKey)),
            expWithArgs('checkResponseValueWithRegex', itemKey, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9]+$'),
            expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), '1', '2')
        )
    });

    editor.addValidation({
        key: 'r2max',
        type: 'hard',
        rule: expWithArgs('not', expWithArgs('checkResponseValueWithRegex', itemKey, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9]{6,}$'))
    });

    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ["nl-be", "Voer de vier cijfers van de postcode in"],
                ["fr-be", "4 chiffres"],
                ["de-be", "4 Ziffern"],
                ["en", "Please enter the digits of your postal code"],
                ["it", "Per favore, inserisci il tuo codice postale"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
        }
    );

    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ["en", "Please enter at most 5 digits"],
                ["it", "Per favore, inserisci un massimo di 5 cifre"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2max'))
        }
    );

    return editor.getItem();
}

/**
 * WORK TYPE: single choice question about main type of work
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_type = (parentKey: string, keyMainActivity?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Welk soort werk doet u?"],
            ["fr-be", "Quel type de travail effectuez-vous ?"],
            ["de-be", "Welche Art von Arbeit leisten Sie?"],
            ["en", "Which of the following descriptions most closely matches with your main occupation?"],
            ["it", "Quale tra le seguenti definizioni descrive meglio la tua attività lavorativa?"],
        ]))
    );

    // CONDITION
    if (keyMainActivity) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyMainActivity, [responseGroupKey, singleChoiceKey].join('.'), '0', '1', '2')
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
                    ["it", "Perché ti facciamo questa domanda?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om te bepalen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen met verschillende beroepen."],
                    ["fr-be", "Afin d’examiner dans quelle mesure notre cohorte (le groupe de participants à cette étude) est représentative de la population, et afin de déterminer si le risque de contracter le coronavirus ou la grippe est différent pour les personnes exerçant des professions différentes."],
                    ["de-be", "Um zu überprüfen, wie repräsentativ unsere Kohorte (Gruppe der Teilnehmer an dieser Studie) im Vergleich mit der Bevölkerung ist, und um zu bestimmen, ob sich die Möglichkeiten der Ansteckung mit COVID-19 oder Grippe bei Menschen mit verschiedenen Berufen unterscheiden."],
                    ["en", "In order to examine to what degree our cohort (the group of participants in this study) is representative of the population, and to examine whether the risk of contracting the coronavirus or influenza varies based on a person's profession."],
                    ["it", "Ci interessa studiare la rappresentatività del nostro campione rispetto alla popolazione generale e capire se il rischio di contrarre l'influenza o il coronavirus varia a seconda della professione."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep."],
                    ["fr-be", "Cochez la case qui correspond le mieux à votre activité ou à votre profession principale."],
                    ["de-be", "Kreuzen Sie das Kästchen an, das am meisten mit Ihrem Hauptberuf übereinstimmt."],
                    ["en", "Check the box that best matches your main activity or profession."],
                    ["it", "Seleziona l'opzione che meglio rappresenta la tua attività principale o professione."],
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
                ["nl-be", "Professioneel (bijv. manager, arts, leraar, verpleegkundige, ingenieur)"],
                ["fr-be", "Professionnel (par exemple gestionnaire, médecin, enseignant, infirmière, ingénieur)"],
                ["de-be", "Fachkraft (z. B. Manager, Arzt, Lehrer, Krankenschwester, Ingenieur)"],
                ["en", "Professional (e.g. manager, doctor, teacher, nurse, engineer)"],
                ["it", "Professionista (es. manager, medico, insegnante, infermiere/a, ingegnere, etc."],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe administratief werk (administratie, financieel assistent, receptionist, etc.)"],
                ["fr-be", "J’effectue un travail administratif (administration, assistant financier, réceptionniste, etc.)"],
                ["de-be", "Ich leiste Verwaltungsarbeiten (Verwaltung, finanzieller Assistent, Empfang usw.)"],
                ["en", "Office work (e.g. admin, finance assistant, receptionist, etc)"],
                ["it", "Lavoro d'ufficio (es. amministrazione, assistente finanziario/a, segretario/a, etc.)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Detailhandel, verkoop, catering en horeca en vrije tijd (bijv. winkelbediende, ober, barpersoneel, gymleraar etc)"],
                ["fr-be", "Commerce de détail, vente, restauration et hôtellerie et loisirs (par exemple, vendeur, serveur, personnel de bar, instructeur de gym, etc.)"],
                ["de-be", "Einzelhandel, Verkauf, Gastronomie und Gastgewerbe und Freizeit (z. B. Verkäufer, Kellner, Barpersonal, Fitnesstrainer usw.)"],
                ["en", "Retail, sales, catering and hospitality and leisure (e.g. shop assistant, waiter, bar-staff, gym instructor etc)"],
                ["it", "Vendita al dettaglio, ristorazione ospitalità e tempo libero (es. commesso/a di negozio, cameriere/a, barista, istrutture/istruttrice di palestra etc.)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe technisch werk (uitvoerend in techniek/bouw/productie)"],
                ["fr-be", "J’effectue un travail technique (dans le domaine de l'ingénierie, de la construction et de la production)"],
                ["de-be", "Ich leiste technische Arbeit (ausführend in Technik/Bau/Produktion)"],
                ["en", "Skilled manual worker (e.g. mechanic, electrician, technician)"],
                ["it", "Lavoratore/lavoratrice manuale specializzato (es. meccanico, elettricista, tecnico, etc.)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe ander uitvoerend werk"],
                ["fr-be", "Je fais d'autres travaux d’exécution"],
                ["de-be", "Ich leiste andere ausführende Arbeiten"],
                ["en", "Other manual work (e.g. cleaning, security, driver)"],
                ["it", "Lavoratore/lavoratrice manuale di altro tipo (ed. addetto/a alle pulizie, addetto/a alla sicurezza, autista etc.)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Andere, valt niet in bovengenoemde opties"],
                ["fr-be", "Un autre type de travail, mon travail ne fait pas partie des options susmentionnées"],
                ["de-be", "Andere, fällt nicht unter die oben genannten Alternativen"],
                ["en", "Other"],
                ["it", "Altro"],
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
 * HIGHEST EDUCATION: single choice about what is the highest level of formal education
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const highest_education = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4d'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is the highest level of formal education/qualification that you have?"],
            ["it", "Qual è il livello più alto di educazione/qualificazione che possiedi? Se sei ancora in formazione, ti preghiamo di selezionare l'opzione corrispondente al livello di educazione che hai già raggiunto."],
            ["nl", "Wat is je hoogst voltooide opleiding?"],
            ["fr", "Quel est votre plus haut niveau d'éducation/qualification formelle?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is compared to the population of the UK (Italy, Belgium..) as a whole."],
                    ["it", "Ci interessa studiare la rappresentatività del nostro campione rispoetto alla popolazione generale."],
                    ["nl", "Met deze informatie kunnen we zien of de mensen die meedoen representatief zijn voor de bevolking."],
                    ["fr", "Afin de vérifier la représentativité de notre échantillon comparée à la population suisse dans son ensemble."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please choose the box that represents your HIGHEST level of educational achievements. The different option rougly equate to: 1 - no qualifications, 2 - school-leaving exams at around 16 years of age, 3 - school-leaving exams at around 18 years of age, 4 - University degree or equivalent professional qualification, 5 - Higher degree or advanced professional qualification. If you are an adult who is currently undergoing part - time training(e.g.night school) then tick the box that represents your current highest level of education."],
                    ["it", "Per favore, seleziona l'opzione che rappresenta il livello di educazione più alto che hai già raggiunto."],
                    ["nl", "Geef aan wat je hoogste diploma is."],
                    ["fr", "Cochez la case qui correspond à votre plus haut niveau d'éducation scolaire. Les différentes options équivalent à 1 - pas de qualifications, 2 - examens de fin de scolarité à environ 16 ans, 3 - examens de fin de scolarité à environ 18 ans, 4 - diplôme universitaire ou qualification professionnelle équivalente, 5 - diplôme ou qualification professionnelle avancé.Si vous êtes un adulte actuellement en cours de formation à temps partiel(p.ex.cours du soir) cochez la case qui représente votre plus haut niveau actuel de l'éducation."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '1', '2', '3', '4', '5'),
            content: new Map([
                ["en", "I have no formal qualification"],
                ["it", "Non possiedo alcuna qualifica formale"],
                ["nl", "Ik heb geen officiële diploma's of alleen lager onderwijs"],
                ["fr", "Aucune qualification"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "GCSE's, levels, CSEs or equivalent"],
                ["it", "Diploma di scuola media"],
                ["nl", "MAVO of VMBO"],
                ["fr", "Scolarité obligatoire"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "A-levels or equivalent (e.g. Higher, NVQ Level3, BTEC)"],
                ["it", "Diploma di scuola superiore"],
                ["nl", "HAVO, VWO, of MBO"],
                ["fr", "Maturité fédérale, maturité professionnelle"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Bachelors Degree (BA, BSc) or equivalent"],
                ["it", "Diploma di laurea triennale"],
                ["nl", "HBO of WO Bachelor"],
                ["fr", "Diplôme de Bachelor ou équivalent"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Higher Degree or equivalent (e.g. Masters Degree, PGCE, PhD, Medical Doctorate, Advanced Professional Award)"],
                ["it", "Diploma di laurea magistrale o titolo di studio superiore (Ph.D.)"],
                ["nl", "WO master of PhD (doctor)"],
                ["fr", "Diplôme de Master ou équivalent, PhD, doctorat en médecine (MD)"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "I am still in education"],
                ["it", "Sono ancora in formazione scolastica"],
                ["nl", "Dat wil ik niet aangeven"],
                ["fr", "Je suis encore étudiant"],
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
 * PEOPLE MET: multiple choice for person groups you met
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const people_met = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q5'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Except people you meet on public transports, do you have contact with any of the following during the course of a typical day (so without covid measures)?"],
            ["it", "Nella tua vita quotidiana (in assenza di covid e quindi di misure restrittive), ti capita di entrare in contatto con uno dei seguenti gruppi di persone (escludendo quelle che incontri sui mezzi pubblici)?  (Indica tutte le voci appropriate, salta la domanda se nessuna opzione si applica al tuo caso) ?"],
            ["nl", "Heb je tijdens een gemiddelde dag (dus zonder coronamaatregelen) contact met:"],
            ["fr", "A part les gens que vous croisez dans les transports publics, avez-vous des contacts avec un ou plusieurs des groupes suivants au cours d'une journée typique?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Perché ti facciamo questa domanda?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether you are likely to be exposed to more infection risk than the average person (e.g. work with children, or patients)."],
                    ["it", "Siamo interessati a studiare se hai una probabilità più alta rispetto alla media di essere esposto all’influenza o al covid (ad esempio nel caso in cui lavori con bambini o pazienti).."],
                    ["nl", "Om uit te zoeken of contact met deze groepen het risico op klachten beïnvloedt."],
                    ["fr", "Pour savoir si vous êtes susceptible d'être exposés à la grippe plus que la moyenne (p. ex. via une votre travail avec des enfants ou des patients)."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "Hint:"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Uitleg:"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Groups of people could include any setting where you come into contact with large numbers of people at once, e.g. a teacher who may contact many children in a day."],
                    ["it", "L’opzione gruppi di persone include qualunque situazione in cui tu venga in contatto con un elevato numero di persone contemporaneamente, come ad esempio un insegnante che in un singolo giorno entra in contatto con molti bambini.."],
                    ["nl", "Voor groepen mensen kan het gaan om elke situatie waar er contact is met meer dan 10 personen tegelijk."],
                    ["fr", "Sélectionnez les groupes de personnes avec lesquelles vous êtes en contact au cours d'une journée (p. ex. un enseignant peut interagir avec de nombreux enfants dans une journée)."],
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
                ['it', 'Seleziona tutte le opzioni per te rilevanti'],
                ['nl', 'Selecteer alle opties die relevant zijn (laat contacten in het openbaar vervoer buiten beschouwing).'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "More than 10 children or teenagers"],
                ["it", "Più di 10 bambini o adolescenti nel corso della giornata"],
                ["nl", "Meer dan 10 kinderen of jongeren"],
                ["fr", "Plus de 10 enfants ou adolescents au cours de la journée"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "More than 10 people aged over 65"],
                ["it", "Più di 10 persone di età superiore a 65 anni nel corso della giornata"],
                ["nl", "Meer dan 10 mensen van 65 jaar en ouder"],
                ["fr", "Plus de 10 personnes âgées de plus de 65 ans au cours de la journée"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "Patients"],
                ["it", "Pazienti"],
                ["nl", "Patiënten"],
                ["fr", "Patients"],
            ])
        }, {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "Groups of people (more than 10 individuals at any one time)"],
                ["it", "Gruppi di persone (più di 10 individui per volta)"],
                ["nl", "Groepen mensen groter dan 10 personen"],
                ["fr", "Groupe de personnes (plus de 10 personnes à un moment donné )"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "None of the above"],
                ["it", "Nessuno di questi"],
                ["nl", "Geen van de bovenstaande antwoorden is van toepassing"],
                ["fr", "Aucune des réponses ci-dessus"],
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
 * AGE GROUPS: dropdown table about number of people in different age groups
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const age_groups = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q6'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "INCLUDING YOU, how many people in each of the following age groups live in your household?"],
            ["it", "Includendo te stesso/a, quante persone, per ciascuno dei gruppi di età indicati, vivono nel tuo nucleo familiare??"],
            ["nl", "INCLUSIEF JEZELF: hoeveel personen van de verschillende leeftijdsgroepen wonen er in je huishouden?"],
            ["fr", "VOUS Y COMPRIS, combien de personnes de chaque groupe d'âge suivants vivent dans votre maison?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Members of larger households, or those with children, may more likely get infected than the others."],
                    ["it", "I membri di gruppi familiari grandi o nei quali vivono bambini, possono più facilmente ammalarsi."],
                    ["nl", "De samenstelling van het huishouden kan invloed hebben op het risico van infectie, dit willen we graag onderzoeken."],
                    ["fr", "Les membres des ménages les plus grands, ou ceux possédant des enfants, peuvent être plus susceptibles d'attraper la grippe que les autres."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    // Dropdown options - used in each cell
    const ddg: ResponseRowCell = {
        key: 'col1', role: 'dropDownGroup',
        items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["any", "0"],
                ])
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["any", "1"],
                ]),
            }, {
                key: '2', role: 'option', content: new Map([
                    ["any", "2"],
                ]),
            }, {
                key: '3', role: 'option', content: new Map([
                    ["any", "3"],
                ]),
            }, {
                key: '4', role: 'option', content: new Map([
                    ["any", "4"],
                ]),
            }, {
                key: '5', role: 'option', content: new Map([
                    ["any", "5+"],
                ]),
            },
        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: 'row0', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "0 - 4 years"],
                        ["it", "0 - 4 anni"],
                        ["nl", "0 - 4 jaar"],
                        ["fr", "0 - 4 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: 'row1', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "5 - 18 years"],
                        ["it", "5 - 18 anni"],
                        ["nl", "5 - 18 jaar"],
                        ["fr", "5 - 18 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: 'row2', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "19 - 44 years"],
                        ["it", "19 - 44 anni"],
                        ["nl", "19 - 44 jaar"],
                        ["fr", "19 - 44 ans"],
                    ])
                },
                { ...ddg }
            ]
        },
        {
            key: 'row3', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "45 - 64 years"],
                        ["it", "45 - 64 anni"],
                        ["nl", "45 - 64 jaar"],
                        ["fr", "45 - 64 ans"],
                    ])
                },
                { ...ddg }
            ]
        },
        {
            key: 'row4', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "65+"],
                        ["it", "65+"],
                        ["nl", "65 of ouder"],
                        ["fr", "plus de 65 ans"],
                    ])
                },
                { ...ddg }
            ]
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
 * CHILDREN IN SCHOOL: single choice with how many children going to school or daycare
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyOfAgeGroups full key of the question about age groups, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const children_in_school = (parentKey: string, keyOfAgeGroups?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q6b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /*["en", "How many of the children in your household go to school or day-care? Assume a normal situation, without any covid measures"],*/
            ["en", "How many of the children in your household go to school or day-care?"],
            ["it", "Quanti dei bambini/ragazzi nel tuo gruppo familiare vanno a scuola (dell’obbligo o materna) o al nido?"],
            ["nl", "Hoeveel van de kinderen in je huishouden zitten op school of een in kinderdagverblijf (of peuterspeelzaal)? Ga uit van de normale situatie (dus zonder eventuele coronamaatregelen)"],
            ["nl-be", "Hoeveel van de kinderen in uw huishouden zitten op school of een in kinderdagverblijf?"],
            ["fr", "Combien d'enfants de votre ménage vont à l'école ou à la garderie ?"],
            ["fr-be", "Combien d'enfants de votre ménage sont scolarisés ou vont à la crèche ?"],
            ["de-be", "Wie viele Kinder in Ihrem Haushalt sitzen in der Schule oder einer Kita?"],
        ]))
    );

    // CONDITION
    if (keyOfAgeGroups) {
        editor.setCondition(
            expWithArgs('or',
                expWithArgs('responseHasOnlyKeysOtherThan', [keyOfAgeGroups].join('.'), [responseGroupKey, matrixKey, '0', 'col2'].join('.'), '0'),
                expWithArgs('responseHasOnlyKeysOtherThan', [keyOfAgeGroups].join('.'), [responseGroupKey, matrixKey, '1', 'col2'].join('.'), '0'),
                expWithArgs('responseHasOnlyKeysOtherThan', [keyOfAgeGroups].join('.'), [responseGroupKey, matrixKey, '11', 'col2'].join('.'), '0'), // needed for BE
                expWithArgs('responseHasOnlyKeysOtherThan', [keyOfAgeGroups].join('.'), [responseGroupKey, matrixKey, '12', 'col2'].join('.'), '0'), // needed for BE
                expWithArgs('responseHasOnlyKeysOtherThan', [keyOfAgeGroups].join('.'), [responseGroupKey, matrixKey, '13', 'col2'].join('.'), '0'), // needed for BE
                expWithArgs('responseHasOnlyKeysOtherThan', [keyOfAgeGroups].join('.'), [responseGroupKey, matrixKey, '14', 'col2'].join('.'), '0')  // needed for BE
            )
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Attending school or day-care may be a risk for acquiring certain virus based illnesses. We would like to check this."],*/
                    ["en", "Attending school, daycare or childcare can increase the risk of contracting the coronavirus or influenza, as well as other similar illnesses. We wish to study this issue."],
                    ["it", "Vogliamo studiare se frequentare la scuola (dell’obbligo o maternal) o il nido possa aumentare il rischio di ammalarsi di influenza o di covid."],
                    ["nl", "Het bezoeken van een school of kinderdagverblijf kan het risico voor infecties verhogen. Of dit het geval is en in welke mate willen we graag onderzoeken."],
                    ["nl-be", "Naar school of kinderopvang gaan, kan een verhoogd risico zijn voor het krijgen van COVID-19 of griep en soortgelijke ziekten. We willen dit graag onderzoeken."],
                    ["fr", "Fréquenter l'école ou à la garderie pourrait augmenter les risques de contracter la grippe et des maladies similaires. Nous tenons à le vérifier."],
                    ["fr-be", "Le fait de fréquenter l'école, la garderie ou la crèche peut augmenter le risque de contracter le coronavirus ou la grippe, ainsi que d'autres maladies similaires. Nous souhaiterions étudier ce point."],
                    ["de-be", "Zur Schule oder Kita zu gehen kann ein erhöhtes Risiko für die Ansteckung mit COVID-19 oder Grippe bzw. anderen artähnlichen Krankheiten mit sich bringen. Wir möchten das gerne untersuchen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "If the child is attending regular school or day-care (even this is just one day a week) then please count it. Attendance of clubs and activities does not count - even if regular."],*/
                    ["en", "If your child attends school, daycare or childcare (even if only one day a week), please count it. Participation in (sport) associations or other extracurricular activities does not count."],
                    ["it", "Se tuo figlio frequenta regolarmente la scuola o l’asilo nido (anche se solo per un giorno alla settimana), per favore rispondi si a questa domanda. Non considerare se frequenta palestre o fa altre attività extra scolastiche."],
                    ["nl", "Zelfs als het kind slechts 1 maal per week naar een kinderdagverblijf gaat, geef dit dan aan (clubs en verenigingen tellen niet mee)"],
                    ["nl-be", "Als uw kind naar school of kinderopvang gaat (ook al is dit maar één dag in de week) antwoord dan met ja. Lidmaatschap bij (sport)verenigingen of andere buitenschoolse activiteiten tellen niet mee."],
                    ["fr", "Cochez oui si votre enfant fréquente régulièrement l'école ou à la garderie (même seulement un jour par semaine ). La fréquentation d'autres clubs ou activités, même régulière, ne compte pas."],
                    ["fr-be", "Si votre enfant fréquente l'école, la garderie ou la crèche (même si ce n'est qu'un jour par semaine), veuillez répondre « oui ». Une affiliation auprès d’associations (sportives) ou une inscription à d’autres activités extrascolaires ne compte pas."],
                    ["de-be", "Wenn Ihr Kind zur Schule oder zur Kita (Kindertagesstätte, Kindergarten) geht (auch wenn es nur an einem Tag in der Woche ist), so antworten Sie bitte mit ja. Mitgliedschaft in (Sport-)Vereinen oder andere außerschulische Aktivitäten zählen nicht."],
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
                ["en", "None"],
                ["it", "Nessuno"],
                ["nl", "Geen"],
                ["nl-be", "Geen"],
                ["fr", "Aucun"],
                ["fr-be", "Aucun"],
                ["de-be", "Keines"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["any", "1"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["any", "2"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["any", "3"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["any", "4"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["any", "5"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["en", "More than 5"],
                ["it", "Più di 5"],
                ["nl", "Meer dan 5"],
                ["nl-be", "Meer dan 5"],
                ["fr", "Plus de 5"],
                ["fr-be", "Plus de 5"],
                ["de-be", "mehr als 5"],
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
 * MEANS OF TRANSPORT: single choice about main means of transport
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const means_of_transport = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q7'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /*["en", "What is your main means of transport? Assume a normal situation, without any covid measures"],*/
            ["en", "What means of transportation do you typically use for your daily activities? Please select the transportation means you use the most."],
            ["it", "Qual è il tuo principale mezzo di trasporto? Per favore, seleziona il mezzo di trasporto che usi di più per le tue attività quotidiane."],
            ["nl", "Hoe verplaats je je meestal? Ga uit van de normale situatie (dus zonder eventuele coronamaatregelen)."],
            ["nl-be", "Hoe verplaatst u zich doorgaans voor uw dagelijkse activiteiten? Gelieve de vervoerswijze te selecteren waar u het meest gebruik van maakt."],
            ["fr", "Quel est votre principal moyen de transport ?"],
            ["fr-be", "Comment vous déplacez-vous habituellement dans le cadre de vos activités quotidiennes ? Veuillez sélectionner le mode de transport que vous utilisez le plus."],
            ["de-be", "Wie bewegen Sie sich in der Regel für Ihre täglichen Aktivitäten? Bitte wählen Sie die Transportweise, von der Sie meistens Gebrauch machen."],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "It has been suggested that using public transport may be a risk for infection. We would like to check this."],*/
                    ["en", "We want to know if people who regularly use public transportation have a higher risk of infection."],
                    ["it", "Vogliamo studiare se le persone che usano I mezzi di trasporto pubblici siano più a rischio di ammalarsi di influenza o di covid-19."],
                    ["nl", "Veel mensen denken dat het openbaar vervoer een risico op infecties met zich mee brengt, wij hopen dit te onderzoeken."],
                    ["nl-be", "We onderzoeken indien mensen die vaak reizen met het openbaar vervoer een verhoogd risico op infecties hebben."],
                    ["fr", "Il a été suggéré que l'utilisation des transports publics augmente les risques de contracter la grippe. Nous tenons à le vérifier."],
                    ["fr-be", "Nous souhaitons savoir si les personnes qui empruntent régulièrement les transports en commun présentent un risque d'infection plus élevé."],
                    ["de-be", "Wir untersuchen, ob Menschen, die oft mit dem öffentlichen Verkehr (ÖPNV) fahren/reisen, ein erhöhtes Infektionsrisiko aufweisen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Tick the option that best represents your most normal mode of transport."],*/
                    ["en", "Mark the box that best matches the means of transportation you most frequently use."],
                    ["it", "Seleziona l’opzione che corrisponde al mezzo di trasporto che usi più spesso quotidianamente."],
                    ["nl", "Ga uit van de normale situatie en je meest gangbare - dagelijkse - manier van verplaatsen."],
                    ["nl-be", "Vink de optie aan die het beste overeenkomt met uw meest gebruikte vervoermiddel."],
                    ["fr", "Cochez l'option qui représente le mieux votre mode de transport habituel."],
                    ["fr-be", "Cochez l'option qui correspond le mieux à votre moyen de transport le plus fréquemment utilisé."],
                    ["de-be", "Bitte kreuzen Sie diejenige Alternative an, die am besten mit Ihrem am meisten gewählten Verkehrsmittel übereinstimmt."],
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
                ["en", "Walking"],
                ["it", "A piedi"],
                ["nl", "Lopend"],
                ["nl-be", "Te voet"],
                ["fr", "La marche"],
                ["fr-be", "À pied"],
                ["de-be", "Zu Fuß"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Bike"],
                ["it", "Bicicletta"],
                ["nl", "Op de fiets"],
                ["nl-be", "Op de fiets"],
                ["fr", "Le vélo"],
                ["fr-be", "À vélo"],
                ["de-be", "Mit dem Rad"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Motorbike/scooter"],
                ["it", "Moto/scooter"],
                ["nl", "Met de scooter of motor"],
                ["nl-be", "Met de scooter of motor"],
                ["fr", "Le scooter, la moto"],
                ["fr-be", "À mobylette ou à moto"],
                ["de-be", "Mit dem Motorroller oder Motorrad"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Car"],
                ["it", "Auto"],
                ["nl", "Met de auto"],
                ["nl-be", "Met de auto"],
                ["fr", "La voiture"],
                ["fr-be", "En voiture"],
                ["de-be", "Mit dem Auto"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Public transportation (bus, train, tube, etc)"],
                ["it", "Mezzi pubblici (bus, treno, metropolitana, etc.)"],
                ["nl", "Met het openbaar vervoer (bus, trein, metro, tram, enz.)"],
                ["nl-be", "Met het openbaar vervoer (bus, trein, metro, tram, enz.)"],
                ["fr", "Transports publics (bus, train, métro, etc)"],
                ["fr-be", "Par les transports en commun (bus, train, métro, tram, etc.)"],
                ["de-be", "Mit dem öffentlichen Verkehr (ÖPNV: Bus, Zug, U-Bahn, Straßenbahn usw.)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Other"],
                ["it", "Altro"],
                ["nl", "Anders"],
                ["nl-be", "Andere"],
                ["fr", "Autre"],
                ["fr-be", "Autre"],
                ["de-be", "Anders"],
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
 * DURATION IN PUBLIC TRANSPORT: single choice about duration spent on public transport
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pub_transport_duration = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q7b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /*["en", "On a normal day, how much time do you spend on public transport? (Bus, train, tube etc.) Assume a normal situation, without any covid measures"],*/
            ["en", "On a normal day, how much time do you spend on public transport (bus, train, tube, etc)?"],
            ["it", "In un giorno normale, quanto tempo passi sui mezzi pubblici? (bus, treno, metro, etc.)?"],
            ["nl", "Hoeveel tijd breng je op een gemiddelde dag door in het openbaar vervoer? Ga uit van de normale situatie (dus zonder eventuele coronamaatregelen)."],
            ["nl-be", "Hoeveel tijd brengt u op een doordeweekse dag door in het openbaar vervoer?"],
            ["fr", "Dans une journée normale, combien de temps passez-vous dans les transports publics (bus, train, métro, etc.)?"],
            ["fr-be", "Combien de temps passez-vous dans les transports en commun lors d'un jour de semaine ?"],
            ["de-be", "Wieviel Zeit verbringen Sie an einem Wochentag im öffentlichen Verkehr?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "It has been suggested that using public transport may be a risk for getting flu. We would like to check this."],*/
                    ["en", "We want to know if people who regularly use public transportation have a higher risk of infection."],
                    ["it", "Vogliamo studiare se le persone che usano I mezzi di trasporto pubblici siano più a rischio di ammalarsi di influenza o di covid-19."],
                    ["nl", "Veel mensen denken dat het openbaar vervoer een risico op infecties met zich mee brengt, wij hopen dit te onderzoeken."],
                    ["nl-be", "We onderzoeken indien mensen die vaak reizen met het openbaar vervoer een verhoogd risico op infecties hebben."],
                    ["fr", "Il a été suggéré que l'utilisation des transports publics augmente les risques de contracter la grippe. Nous tenons à le vérifier."],
                    ["fr-be", "Nous souhaitons savoir si les personnes qui empruntent régulièrement les transports en commun présentent un risque d'infection plus élevé."],
                    ["de-be", "Wir untersuchen, ob Menschen, die oft mit dem öffentlichen Verkehr (ÖPNV) fahren/reisen, ein erhöhtes Infektionsrisiko aufweisen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Think of a typical day. If you use several different forms of public transport each day, remember to include all journeys. Don't include taxis or other forms of private transport."],*/
                    ["en", "Think of a typical day. If you use different types of public transportation during the same day, don’t forget to include all the journeys. Do not include taxis or other forms of private transportation."],
                    ["it", "Nel pensare ad una tua giornata normale, se usi diversi mezzi di trasporto ogni giorno, includi nella risposta il tempo trascorso in totale solo sui mezzi pubblici. Non includere taxi o altri mezzi di trasporto privato."],
                    ["nl", "Denk aan een typische dag. Als je verschillende vormen van openbaar vervoer gebuikt tel dan de duur bij elkaar op."],
                    ["nl-be", "Denk aan een typische dag. Als u elke dag verschillende vormen van openbaar vervoer gebruikt op één dag, vergeet dan niet om alle ritten mee te nemen. Exclusief taxi's of andere vormen van privévervoer."],
                    ["fr", "Pensez à une journée typique: si vous utilisez plusieurs formes de transports en commun chaque jour, rappelez-vous d'inclure tous les voyages. N'incluez pas les taxis ou les autres formes de transport privé."],
                    ["fr-be", "Pensez à une journée typique. Si vous utilisez chaque jour différents modes de transport en commun au cours d'une même journée, n'oubliez pas d'inclure tous les trajets. À l’exclusion des taxis ou d’autres formes de transport privé."],
                    ["de-be", "Bitte kreuzen Sie diejenige Alternative an, die am besten mit Ihrem am meisten gewählten Verkehrsmittel übereinstimmt."],
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
                ["en", "No time at all"],
                ["it", "Non uso i mezzi pubblici"],
                ["nl", "Ik ga normaal niet met het openbaar vervoer"],
                ["nl-be", "Ik ga normaal niet met het openbaar vervoer"],
                ["fr", "Pas de temps du tout"],
                ["fr-be", "Je ne prends pas les transports en commun en temps normal"],
                ["de-be", "Ich fahre normalerweise nicht mit dem ÖPNV"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "0-30 minutes"],
                ["it", "0-30 minuti"],
                ["nl", "0 tot 30 minuten"],
                ["nl-be", "0 tot 30 minuten"],
                ["fr", "0-30 minutes"],
                ["fr-be", "De 0 à 30 minutes"],
                ["de-be", "0 bis 30 Minuten"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "30 minutes - 1.5 hours"],
                ["it", "30 minuti - 1.5 ore"],
                ["nl", "30 minuten tot 1,5 uur"],
                ["nl-be", "30 minuten tot 1,5 uur"],
                ["fr", "30 minutes - 1.5 heures"],
                ["fr-be", "De 30 minutes à 1,5 heure"],
                ["de-be", "30 Minuten bis 1,5 Stunden"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "1.5 hours - 4 hours"],
                ["it", "1.5 ore - 4 ore"],
                ["nl", "1,5 uur tot 4 uur"],
                ["nl-be", "1,5 uur tot 4 uur"],
                ["fr", "1.5 - 4 heures"],
                ["fr-be", "De 1,5 à 4 heures"],
                ["de-be", "1,5 Stunden bis 4 Stunden"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Over 4 hours"],
                ["it", "Oltre 4 ore"],
                ["nl", "Meer dan 4 uur"],
                ["nl-be", "Meer dan 4 uur"],
                ["fr", "Plus de 4 heures"],
                ["fr-be", "Plus de 4 heures"],
                ["de-be", "Mehr als 4 Stunden"],
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
 * COMMON COLD: how often do you have common cold or flu (single choice)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const common_cold_frequency = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q8'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How often do you have common colds or flu-like diseases?"],
            ["it", "Quanto spesso ti ammali di raffreddore o di influenza?"],
            ["nl", "Hoe vaak heb je last van verkoudheid of griepachtige verschijnselen?"],
            ["nl-be", "Hoe vaak heeft u last van verkoudheid of griepachtige verschijnselen (voorbeeld: loopneus, hoest)?"],
            ["fr", "Avez vous souvent le rhume ou des maladies de type grippal ?"],
            ["fr-be", "À quelle fréquence souffrez-vous d'un rhume ou de symptômes ressemblant à ceux de la grippe (par exemple, un nez qui coule, une toux) ?"],
            ["de-be", "Wie oft haben Sie Beschwerden durch Erkältung oder grippeartige Symptome (Beispiel: laufende Nase, Husten)?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", ""],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", ""],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We want to know if some people have an increased risk of infection."],
                    ["it", "Ci interessa sapere se alcune persone hanno un maggiore rischio di ammalarsi."],
                    ["nl", ""],
                    ["nl-be", "We onderzoeken of sommige mensen een verhoogd risico op infecties hebben."],
                    ["fr", ""],
                    ["fr-be", "Nous voulons savoir si certaines personnes présentent un risque accru d'infection."],
                    ["de-be", "Wir untersuchen, ob manche Menschen ein erhöhtes Infektionsrisiko haben."],
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
                ["en", "Never"],
                ["it", "Mai"],
                ["nl", "Minder dan 1 keer per jaar"],
                ["nl-be", "Nooit"],
                ["fr", "Jamais"],
                ["fr-be", "Jamais"],
                ["de-be", "Niemals"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Once or twice a year"],
                ["it", "Una o due volte l'anno"],
                ["nl", "1 of 2 keer per jaar"],
                ["nl-be", "1 of 2 keer per jaar"],
                ["fr", "1 ou 2 fois par an"],
                ["fr-be", "1 à 2 fois par an"],
                ["de-be", "1 oder 2 Mal pro Jahr"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Between 3 and 5 times a year"],
                ["it", "Tra tre e cinque volte l'anno"],
                ["nl", "Tussen 3 en 5 keer per jaar"],
                ["nl-be", "Tussen 3 en 5 keer per jaar"],
                ["fr", "De 3 à 5 fois par an"],
                ["fr-be", "Entre 3 et 5 fois par an"],
                ["de-be", "Zwischen 3 und 5 Mal pro Jahr"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Between 6 and 10 times a year"],
                ["it", "Tra le sei e le dieci volte all'anno"],
                ["nl", "Tussen 6 en 10 keer per jaar"],
                ["nl-be", "Tussen 6 en 10 keer per jaar"],
                ["fr", "De 6 à 10 fois par an"],
                ["fr-be", "Entre 6 et 10 fois par an"],
                ["de-be", "Zwischen 6 und 10 Mal pro Jahr"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "More that 10 times a year"],
                ["it", "Più di dieci volte l'anno"],
                ["nl", "Meer dan 10 keer per jaar"],
                ["nl-be", "Meer dan 10 keer per jaar"],
                ["fr", "Plus de 10 fois par an"],
                ["fr-be", "Plus de 10 fois par an"],
                ["de-be", "Mehr als 10 Mal pro Jahr"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["it", "Non so"],
                ["nl", "Dat weet ik niet"],
                ["nl-be", "Dat weet ik niet"],
                ["fr", "Je ne sais pas"],
                ["fr-be", "Aucune idée"],
                ["de-be", "Das weiß ich nicht"],
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
 * FLU VACCINE LAST SEASON: single choice about last season's vaccine
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_last_season = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q9'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you receive a flu vaccine during the previous flu season (2020-2021)?"],
            ["it", "Sei stato vaccinato contro l'influenza durante la passata stagione influenzale (2020-2021)?"],
            ["nl", "Heb je in het afgelopen griepseizoen (2019/2020) een griepprik gehaald?"],
            ["nl-be", "Heeft u in het vorige griepseizoen (2019/2020) een griepvaccin laten toedienen?"],
            ["fr", "Avez-vous été vacciné(e) contre la grippe lors de la dernière saison automne/hiver (2018-2019) ?"],
            ["fr-be", "Lors de la précédente saison de la grippe (hiver 2019/2020), vous êtes-vous fait vacciner contre la grippe ?"],
            ["de-be", "Haben Sie sich in der letzten Grippesaison (2019/2020) eine Grippeimpfung bekommen?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },

            {
                content: new Map([
                    /*["en", "We would like to be able to work out how much protection the vaccine gives. We would also like to find out if there is some protection from vaccines received in previous years."],*/
                    ["en", "We would like to study what level of protection the vaccine provides. We would also like to know if there is any protection from vaccines received in previous years."],
                    ["it", "Vogliamo studiare l’efficacia della protezione del vaccino influenzale. Vogliamo anche capire se c’e’ una parziale protezione derivante dai vaccini ricevuti negli anni precedenti."],
                    ["nl", "We willen de beschermende werking van het vaccin onderzoeken."],
                    ["nl-be", "We willen graag onderzoeken hoeveel bescherming het vaccin geeft. We willen ook graag weten of er enige bescherming is dankzij vaccins die in voorgaande jaren zijn ontvangen."],
                    ["fr", "Nous aimerions savoir à quel point la protection par le vaccin fonctionne. Nous aimerions aussi savoir si il y a une certaine protection par les vaccins reçus au cours des années précédentes."],
                    ["fr-be", "Nous aimerions étudier le degré de protection offert par le vaccin. Nous aimerions également savoir s'il existe un certain degré de protection grâce aux vaccins reçus au cours des années précédentes."],
                    ["de-be", "Wir möchten gerne untersuchen, wieviel Schutz der Impfstoff verleiht. Wir möchten auch gerne wissen, ob es dank der Impfstoffe einen Schutz gibt, der früheren Jahren erhalten wurden."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Report yes, if you received the vaccine this season, usually in the autumn."],*/
                    ["en", "Answer 'yes' if you were vaccinated in autumn/winter 2020-2021."],
                    ["it", "Rispondi 'si' se sei stato vaccinato contro l’influenza l’anno scorso durante la stagione autunno inverno 2020-2021."],
                    ["nl", "Zeg 'ja' wanneer je de griepprik hebt gehad. Normaal ontvang je een griepprik in het najaar."],
                    ["nl-be", "Antwoord 'ja' als u het vaccin vorig jaar (herfst / winter van 2020-2021) heeft gekregen."],
                    ["fr", "Répondez « oui » si vous avez été vacciné cette saison, habituellement à l'automne. Si vous vous faites vacciner après avoir rempli ce questionnaire, merci de revenir et corriger votre réponse."],
                    ["fr-be", "Veuillez répondre « oui » si vous avez reçu le vaccin au cours de l'année dernière (durant l'automne/hiver 2020-2021)."],
                    ["de-be", "Antworten Sie bitte mit 'ja', wenn Sie den Impfstoff im letzten Jahre erhalten haben (im Herbst/Winter von 2020-2021)"],
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
                ["en", "Yes"],
                ["it", "Si"],
                ["nl", "Ja"],
                ["nl-be", "Ja"],
                ["fr", "Oui"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["it", "No"],
                ["nl", "Nee"],
                ["nl-be", "Nee"],
                ["fr", "Non"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know (anymore)"],
                ["it", "Non so"],
                ["nl", "Dat weet ik niet (meer)"],
                ["nl-be", "Dat weet ik niet (meer)"],
                ["fr", "Je ne sais pas"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Das weiß ich nicht (mehr)"],
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
 * FLU VACCINE THIS SEASON: single choice about this season's vaccine
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_this_season = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Have you received a flu vaccine this autumn/winter season? (2021-2022)"],
            ["it", "Hai ricevuto il vaccino contro l'influenza per la prossima stagione autunno/inverno? (2021-2022)"],
            ["nl", "Ben je van plan om voor dit griepseizoen (2020/2021) een griepprik te halen?"],
            ["nl-be", "Heeft u in het huidige griepseizoen (2020/2021) een griepvaccin laten toedienen?"],
            ["fr", "Avez-vous été vacciné(e) contre la grippe cette année? (automne/hiver 2021-2022)"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to be able to work out how much protection the vaccine gives."],
                    ["it", "Vogliamo studiare l’efficacia della protezione del vaccino influenzale."],
                    ["nl", "We willen de beschermende werking van het vaccin onderzoeken."],
                    ["nl-be", "We willen de beschermende werking van het vaccin onderzoeken."],
                    ["fr", "Nous aimerions savoir à quel point la protection par le vaccin fonctionne."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "Come devo rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Report yes, if you received the vaccine this season, usually in the autumn. If you get vaccinated after filling in this questionnaire, please return to this and update your answer."],
                    ["it", "Rispondi si se sei già stato vaccinato per questa stagione influenzale. Se riceverai la vaccinazione dopo aver risposto a questo questionario, ti preghiamo di tornare ad aggiornare la tua risposta."],
                    ["nl", "Zeg ja wanneer je van plan bent om de griepprik te nemen. Normaal ontvang je een griepprik in het najaar"],
                    ["nl-be", "Rapporteer 'ja', als u het vaccin dit seizoen heeft gekregen, meestal in de herfst. Als u zich na het invullen van deze vragenlijst laat vaccineren, rapporteer 'nee' en kies in een volgende vraag voor de optie 'Ik ben van plan om mezelf nog te laten vaccineren'."],
                    ["fr", "Répondez oui si vous avez été vacciné cette saison, habituellement à l'automne. Si vous vous faites vacciner après avoir rempli ce questionnaire, merci de revenir et corriger votre réponse."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [/*
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, I'm planning to"],
                ["it", "Si, ho intenzione di farlo"],
                ["nl", "Ja, dit ben ik van plan"],
                ["nl-be", "Ja"],
                ["fr", "Oui"],
            ])
        }, */
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes, I have got one"],
                ["it", "Si, l'ho fatto"],
                ["nl", "Ja, deze heb ik al gehaald"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["it", "No"],
                ["nl", "Nee"],
                ["nl-be", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know (yet)"],
                ["it", "Non so"],
                ["nl", "Dat weet ik (nog) niet"],
                ["nl-be", "Dat weet ik niet (meer)"],
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

/**
 * WHEN RECEIVED FLU VACCINE THIS SEASON: single choice about this season's vaccine
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyFluVaccineThisSeason full key of the question about if you received flu vaccine this year, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_this_season_when = (parentKey: string, keyFluVaccineThisSeason?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When were you vaccinated against flu this season (2021-2022)?"],
            ["it", "Quando hai ricevuto la vaccinazione per questa stagione? (2021-2022)?"],
            ["nl", "Wanneer ben je dit griepseizoen (2020/2021) gevaccineerd tegen de griep?"],
            ["nl-be", "Wanneer bent u in het huidige griepseizoen (2020/2021) gevaccineerd tegen de griep?"],
            ["fr", "Quand avez-vous été vacciné contre la grippe cette saison (2021-2022) ?"],
            ["fr-be", "Quand vous êtes-vous fait vacciner contre la grippe lors de la saison de la grippe correspondant à l’hiver 2020/2021 ?"],
            ["de-be", "Wann wurden Sie in der (jetzigen) Grippesaison (2020/2021) gegen Grippe geimpft?"],
        ]))
    );

    // CONDITION
    if (keyFluVaccineThisSeason) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyFluVaccineThisSeason, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Knowing when people are vaccinated tells us how well the vaccination programme is being carried out."],*/
                    ["en", "Knowing when people get vaccinated tells us how the vaccination program is being followed, as well as the effectiveness of the vaccine."],
                    ["it", "Conoscere la data di vaccinazione ci permette di capire se il programma di vaccinazione viene seguito e anche di stimare l'efficacia del vaccino."],
                    ["nl", "Het weten van de timing van vaccinatie is belangrijk om de effectiviteit te schatten."],
                    ["nl-be", "Weten wanneer mensen worden gevaccineerd, vertelt ons hoe goed het vaccinatieprogramma wordt gevolgd en hoe effectief het vaccin is."],
                    ["fr", "Savoir quand les gens sont vaccinés nous permet d'évaluer le succès des campagnes de vaccination."],
                    ["fr-be", "Le fait de savoir quand les gens se font vacciner nous indique la mesure dans laquelle le programme de vaccination est suivi, ainsi que le degré d'efficacité du vaccin."],
                    ["de-be", "Wissen, wann Menschen geimpft werden, sagt uns, wie gut das Impfprogramm befolgt wird und wie wirksam der Impfstoff ist."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Please, try and answer as accurately as possible. If you don't know the precise date, please give your best estimate. For instance, you might remember the month, then try and remember if it was at the beginning or the end of the month. Were there any significant events (e.g. a holiday or a birthday) that might help jog your memory?"],*/
                    ["en", "Try to answer as precisely as possible. If you do not know the exact date, provide as close an estimate as possible. For example, if you remember the month, try to recall if it was in the beginning or end of the month. Did any important events take place (such as holidays or birthdays) that may help you to refresh your memory?"],
                    ["it", "Per favore, rispondi nel modo più accurato possibile. Se non ricordi la data esatta, puoi comunque inserire una data che sia una buona stima del momento in cui hai ricevuto la vaccinazione. Ad esempio, se ti ricordi il mese, puoi provare a ricordare se la data era all’inizio o alla fine del mese o se coincideva o era vicina ad eventi per te significativi (una festività o un compleanno)."],
                    ["nl", "Probeer zo goed mogelijk te antwoorden, de exacte datum is niet belangrijk, maar wel of het aan het begin of het eind van de maand was."],
                    ["nl-be", "Probeer zo nauwkeurig mogelijk te antwoorden. Als u de precieze datum niet weet, geef dan uw beste schatting. U kunt zich bijvoorbeeld de maand herinneren en vervolgens proberen te herinneren of het aan het begin of het einde van de maand was. Waren er belangrijke gebeurtenissen (bijv. een vakantie of een verjaardag) die u zouden kunnen helpen om uw geheugen op te frissen?"],
                    ["fr", "Essayez de répondre le plus précisément possible. Si vous ne connaissez pas la date précise, donnez votre meilleure estimation. Par exemple, vous pouvez vous rappeler du mois, puis essayez de vous souvenir si c'était au début ou à la fin du mois. Essayez de vous servir d'événements importants (p. ex. vacances ou anniversaire) pour vous aider à vous rafraîchir la mémoire."],
                    ["fr-be", "Essayez de répondre de la manière la plus précise possible. Si vous ne connaissez pas la date exacte, veuillez fournir une estimation la plus précise possible. Par exemple, vous pouvez vous souvenir du mois, et ensuite essayer de vous souvenir si c’était plutôt au début ou à la fin du mois. Des événements importants (par exemple, des vacances ou un anniversaire) ont-ils eu lieu, lesquels pourraient vous aider à vous rafraîchir la mémoire."],
                    ["de-be", "Versuchen Sie so genau wie möglich zu antworten. Wenn Sie das genaue Datum nicht wissen, geben Sie bitte Ihre beste Schätzung an. Sie können zum Beispiel versuchen, sich zu erinnern ob es am Angang oder am Ende des Monats war. Gab es wichtige Ereignisse (zum Beispiel ein Urlaub oder ein Jahrestag), die Ihnen helfen könnten Ihr Gedächtnis aufzufrischen?"],
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
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            description: new Map([
                ["en", "Choose date"],
                ["it", "Scegli la data:"],
                ["nl", "Kies datum"],
                ["nl-be", "Kies datum"],
                ["fr", "Sélectionner une date"],
                ["fr-be", "Sélectionner une date"],
                ["de-be", "Wählen Sie das Datum"],
            ]),
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don't know (anymore)"],
                ["it", "Non so"],
                ["nl", "Dat weet ik niet (meer)"],
                ["nl-be", "Dat weet ik niet (meer)"],
                ["fr", "Je ne sais pas, je ne m'en souviens plus"],
                ["fr-be", "Je ne m'en souviens plus"],
                ["de-be", "Das weiß ich nicht mehr"],
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
 *  REASONS FOR FLU VACCINE THIS SEASON: multiple choice
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyFluVaccineThisSeason full key of the question about if you received flu vaccine this year, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_this_season_reason_for = (parentKey: string, keyFluVaccineThisSeason?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10c'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for getting a seasonal influenza vaccination this year?"],
            ["it", "Per quale motivo hai ricevuto la vaccinazione? (Seleziona tutte le opzioni che si applicano al tuo caso)?"],
            ["nl", "Wat zijn voor jou de belangrijkste redenen om dit jaar een griepprik te halen?"],
            ["fr", "Quelles étaient vos motivations pour vous faire vacciner contre la grippe saisonnière cette année?"],
        ]))
    );

    // CONDITION
    if (keyFluVaccineThisSeason) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyFluVaccineThisSeason, [responseGroupKey, singleChoiceKey].join('.'), '0')
        );
    }

    // INFO POPUP
    // none

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I belong to a risk group (e.g, pregnant, over 65, underlying health condition, etc)"],
                ["it", "Appartengo ad una categoria a rischio (es. in gravidanza, over 65, problemi di salute cronici etc)"],
                ["nl", "Ik behoor tot een risicogroep (zwanger, 60 jaar of ouder, chronische ziekte)"],
                ["fr", "Je fais partie d'un groupe à risque (p. ex. femmes enceintes, plus de 65 ans, état de santé créant un prédisposition, etc.)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases my risk of getting influenza"],
                ["it", "Il vaccino diminuisce il mio rischio di prendere l'influenza"],
                ["nl", "Vaccinatie voorkomt dat ikzelf griep krijg"],
                ["fr", "La vaccination diminue mon risque de contracter la grippe"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases the risk of spreading influenza to others"],
                ["it", "Il vaccino diminuisce il rischio di contagiare gli altri"],
                ["nl", "Vaccinatie voorkomt dat ik het griepvirus verspreid naar andere mensen"],
                ["fr", " La vaccination diminue le risque de propager la grippe à d'autres"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "My doctor recommended it"],
                ["it", "Me l'ha raccomandato il medico"],
                ["nl", "Mijn huisarts heeft me de griepprik aangeraden"],
                ["fr", "Mon médecin me l'a recommandé"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "It was recommended in my workplace/school"],
                ["it", "Mi e' stato raccomandato sul lavoro/a scuola"],
                ["nl", "De griepprik werd aangeboden op mijn werk/op school"],
                ["fr", "Il a été recommandé sur mon lieu de travail / à l'école"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "The vaccine was readily available and vaccine administration was convenient"],
                ["it", "Il vaccino era facilmente reperibile e facile da somministrare"],
                ["nl", "De griepprik is voor mij makkelijk beschikbaar"],
                ["fr", "Le vaccin était disponible et l'administration du vaccin était pratique"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "The vaccine was free (no cost)"],
                ["it", "Il vaccino era gratis"],
                ["nl", "De griepprik was gratis"],
                ["fr", "Le vaccin était gratuit"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't want to miss work/school"],
                ["it", "Non voglio perdere giorni di lavoro/scuola"],
                ["nl", "Ik wil deze winter geen werk/school missen"],
                ["fr", "Je ne veux pas manquer le travail / l'école"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "I always get the vaccine"],
                ["it", "Mi vaccino tutti gli anni"],
                ["nl", "Ik haal de griepprik altijd"],
                ["fr", "Je me fais systématiquement vacciner"],
            ])
        }, {
            key: '12', role: 'option',
            content: new Map([
                ["en", "I try to protect myself against infections, because of the circulation of the pandemic coronavirus"],
                ["it", "Cerco di proteggermi dalle infezioni a causa della circolazione del coronavirus pandemico"],
                ["nl", "Ik ben probeer mezelf te beschermen tegen infecties vanwege het pandemische coronavirus"],
                ["fr", "Je me fais systématiquement vacciner"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "Other reason(s)"],
                ["it", "Altro"],
                ["nl", "Andere reden"],
                ["fr", "Autres raisons"],
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
 *  REASONS AGAINST FLU VACCINE THIS SEASON: multiple choice
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyFluVaccineThisSeason full key of the question about if you received flu vaccine this year, if set, dependency is applied
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const flu_vaccine_this_season_reason_against = (parentKey: string, keyFluVaccineThisSeason?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q10d'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for NOT getting a seasonal influenza vaccination in seaseon 2020/2021?"],
            ["it", "Per quale motivo non hai ricevuto la vaccinazione quest'anno? (Seleziona tutte le opzioni che si applicano al tuo caso"],
            ["nl", "Wat is de reden waarom je jezelf niet laat vaccineren in het komende griepseizoen (2020/2021)?"],
            ["fr", "Quelles étaient vos raisons pour ne pas vous faire vacciner contre la grippe saisonnière cette année?"],
        ]))
    );

    // CONDITION
    if (keyFluVaccineThisSeason) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyFluVaccineThisSeason, [responseGroupKey, singleChoiceKey].join('.'), '1')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to know why some people get vaccinated and others do not."],
                    ["it", "Vogliamo capire le ragioni per cui alcune persone decidono di vaccinarsi e altre no."],
                    ["nl", "We willen graag onderzoeken waarom sommige mensen zich wel laten vaccineren en anderen niet."],
                    ["fr", "Nous aimerions savoir pourquoi certaines personnes se font vacciner et d'autres pas."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick all those reasons that were important in your decision."],
                    ["it", "Seleziona tutte le ragioni che ritieni abbiano motivato la tua decisione."],
                    ["nl", "Geef alle redenen aan die een rol speelden in de beslissing."],
                    ["fr", "Cochez toutes les raisons qui ont influencé votre décision."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I am planning to be vaccinated, but haven't been yet"],
                ["it", "Ho intenzione di vaccinarmi ma non l'ho ancora fatto"],
                ["de", "Ich habe vor, mich impfen zu lassen, es aber noch nicht getan."],
                ["nl", "Ik ben van plan om me te laten vaccineren, maar heb het nog niet gedaan"],
                ["fr", "Je prévois de me faire vacciner mais ne l'ai pas encore fait"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I haven't been offered the vaccine"],
                ["it", "Non mi e' stato offerto di vaccinarmi"],
                ["de", "Mir wurde die Impfung nicht angeboten"],
                ["nl", "Het griepvaccin is me niet aangeboden"],
                ["fr", "La vaccination ne m'a pas été proposée"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't belong to a risk group"],
                ["it", "Non appartengo ad alcuna categoria a rischio"],
                ["nl", "Ik behoor niet tot een risicogroep"],
                ["fr", "Je ne fais pas partie d'un groupe à risque"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "It is better to build your own natural immunity against influenza"],
                ["it", "E' meglio costruire le proprie difese immunitarie in modo naturale"],
                ["nl", "Het is beter om je eigen immuniteit op te bouwen tegen griep."],
                ["fr", "Il est préférable de développer sa propre immunité naturelle contre la grippe"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I doubt that the influenza vaccine is effective"],
                ["it", "Ho dei dubbi sull'efficacia del vaccino"],
                ["nl", "Ik twijfel aan de effectiviteit van het griepvaccin"],
                ["fr", "Je doute que le vaccin contre la grippe soit efficace"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Influenza is a minor illness"],
                ["it", "L'influenza e' una malattia di minore importanza"],
                ["nl", "Griep is slechts een milde ziekte"],
                ["fr", "La grippe est une maladie bénigne"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "I don't think I am likely to get influenza"],
                ["it", "Non credo che mi ammalero' di influenza"],
                ["nl", "Ik acht de kans klein dat ik griep krijg"],
                ["fr", "Je ne pense pas être susceptible de contracter la grippe"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I believe that influenza vaccine can cause influenza"],
                ["it", "Ritengo che il vaccino possa causare l'influenza"],
                ["nl", "Ik geloof dat het vaccin ook griep kan veroorzaken"],
                ["fr", "Je crois que le vaccin antigrippal peut causer la grippe"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "I am worried that the vaccine is not safe or will cause illness or other adverse events"],
                ["it", "Ho timore che il vaccino non sia sicuro o possa causare malattie o effetti collaterali"],
                ["nl", "Ik ben bang dat het vaccin niet veilig is en me juist ziek maakt of andere neveneffecten heeft"],
                ["fr", "Je pense que le vaccin n'est pas sûr ou qu'il peut causer d'autres maladies ou effets indésirables"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "I don't like having vaccinations"],
                ["it", "Non mi piace ricevere vaccinazioni"],
                ["nl", "Ik hou niet van het krijgen van vaccinaties"],
                ["fr", "Je n'aime pas me faire vacciner"],
            ])
        }, {
            key: '10', role: 'option',
            content: new Map([
                ["en", "The vaccine is not readily available to me"],
                ["it", "Il vaccino non era facilmente reperibile"],
                ["nl", "Het is niet makkelijk om gevaccineerd te worden"],
                ["fr", "Le vaccin n'est pas facilement disponible pour moi"],
            ])
        }, {
            key: '11', role: 'option',
            content: new Map([
                ["en", "The vaccine is not free of charge"],
                ["it", "Il vaccino non era gratis"],
                ["nl", "Ik moet betalen voor een griepvaccinatie, het is niet gratis"],
                ["fr", "Le vaccin n'est pas gratuit"],
            ])
        }, {
            key: '12', role: 'option',
            content: new Map([
                ["en", "No particular reason"],
                ["it", "Nessun motivo in particolare"],
                ["nl", "Geen speciale reden"],
                ["fr", "Aucune raison particulière"],
            ])
        }, {
            key: '13', role: 'option',
            content: new Map([
                ["en", "Although my doctor recommend a vaccine, I do not get one"],
                ["it", "Nonostante le raccomandazioni del mio dottore, non ho ricevuto la vaccinazione"],
                ["nl", "Hoewel mijn huisarts het griepvaccin adviseert, neem ik het niet"],
                ["fr", " Bien que mon médecin me l'ait recommandé, je ne me suis pas fait vacciner"],
            ])
        }, {
            key: '14', role: 'option',
            content: new Map([
                ["en", "Other reason(s)"],
                ["it", "Altro"],
                ["nl", "Andere reden"],
                ["fr", "Autre(s) raison(s)"],
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
 * REGULAR MEDICATION: multiple choice about medication
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const regular_medication = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q11'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you take regular medication for any of the following medical conditions?"],
            ["it", "Assumi regolarmente farmaci per una delle seguenti condizioni mediche? (Seleziona tutte le opzioni che si applicano al tuo caso)"],
            ["nl", "Gebruik je (regelmatig) medicatie voor een of meer van de volgende aandoeningen?"],
            ["fr", "Souffrez-vous de l'une des maladies suivantes?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "This question allows us to find out whether you have other medical conditions that may increase your risk of having more severe illness if you are infected."],
                    ["it", "La tua risposta a questa domanda ci permette di sapere se hai qualche condizione medica che possa aumentare il rischio complicazioni in caso di infezione da influenza o covid-19."],
                    ["nl", "De vraag maakt het voor ons mogelijk om te onderzoeken welke aandoeningen gelinkt zijn aan een hoger risico voor infectie"],
                    ["fr", "Cette question nous permet de savoir si vous avez des prédispositions qui pourraient augmenter votre risque d'avoir des complications si vous contractez la grippe."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", 'Only answer "yes" if you take regular medication for your medical problem. If, for instance, you only occasionally take an asthma inhaler, then do not answer "yes" for asthma.'],
                    ["it", 'Rispondi si nel caso in cui tu assuma farmaci per la tua condizione. Se invece, ad esempio, usi un inalatore anti asma soltanto occasionalmente, allora non selezionare l’opzione “asma”.'],
                    ["nl", "Het gaat ons alleen om regelmatig gebruik van medicatie, niet om af en toe. Het af en toe gebruiken van een inhaler bij astma valt hier bijvoorbeeld buiten."],
                    ["fr", "Répondez «oui» seulement si vous prenez <b>régulièrement</b> des médicaments pour votre problème médical. Si, par exemple, vous n'utilisez qu'occasionnellement un inhalateur pour l'asthme, alors ne répondez pas «oui» pour l'asthme ."],
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
                ['it', 'Seleziona tutte le opzioni che si applicano al tuo caso'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["it", "No"],
                ["nl", "Nee, voor geen van de onderstaande aandoeningen"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Asthma"],
                ["it", "Asma"],
                ["nl", "Ja, voor astma"],
                ["fr", "Asthme"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diabetes"],
                ["it", "Diabete"],
                ["nl", "Ja, voor diabetes"],
                ["fr", "Diabètes"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chronic lung disorder besides asthma e.g. COPD, emphysema, or other disorders that affect your breathing"],
                ["it", "Patologia polmonare cronica diversa dall’asma (es. enfisema o altre patologie che influiscono sulla capacità respiratoria)"],
                ["nl", "Ja, voor chronische longziekten (COPD, emfyseem enz. geen astma)"],
                ["fr", "Troubles pulmonaires chroniques à part l'asthme (p. ex. MPOC, emphysème, ou autres troubles affectant votre respiration)"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Heart disorder"],
                ["it", "Patologia cardiovascolare"],
                ["nl", "Ja, voor hartaandoeningen"],
                ["fr", "Troubles cardiaques"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Kidney disorder"],
                ["it", "Patologia renale"],
                ["nl", "Ja, voor nieraandoeningen"],
                ["fr", "Troubles rénaux"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "An immunocompromising condition (e.g. splenectomy, organ transplant, acquired immune deficiency, cancer treatment)"],
                ["it", "Immunosoppressione dovuta a patologie o terapie come splenectomia, trapianto d'organo, immunodeficienza acquisita, trattamento anti cancro, etc.  "],
                ["nl", "Ja, voor een verzwakte afweer, of de medicatie draagt bij aan een verzwakte afweer (bijvoorbeeld door een auto-immuunziekte, kankerbehandeling of na een orgaantransplantatie)"],
                ["fr", "Immunodéficience (p.ex splénectomie, greffe d'organe, immunodéficience acquise, traitement anti-cancéreux)"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "I would rather not answer"],
                ["it", "Preferisco non rispondere"],
                ["nl", "Dat wil ik niet aangeven"],
                ["fr", "Je ne désire pas répondre"],
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
 * PREGNANCY: single choice question about pregrancy
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyQGender reference to the survey item about gender
 * @param keyQBirthday reference to the survey item about birthday
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pregnancy = (parentKey: string, keyQGender: string, keyQBirthday: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q12'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Are you currently pregnant?"],
            ["it", "Sei attualmente in gravidanza?"],
            ["nl", "Ben je op dit moment zwanger?"],
            ["nl-be", "Bent u op dit moment zwanger?"],
            ["fr", "Êtes-vous actuellement enceinte ?"],
            ["fr-be", "Êtes-vous actuellement enceinte ?"],
            ["de-be", "Sind Sie in diesem Moment schwanger?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyQGender, [responseGroupKey, singleChoiceKey].join('.'), '1'), // female
            expWithArgs('gte',
                expWithArgs('dateResponseDiffFromNow', keyQBirthday, [responseGroupKey, '1'].join('.'), 'years', 1),
                14
            ),
            expWithArgs('lte',
                expWithArgs('dateResponseDiffFromNow', keyQBirthday, [responseGroupKey, '1'].join('.'), 'years', 1),
                50
            ),
        )
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Infections during pregnancy can be different."],*/
                    ["en", "Pregnancy is a potential risk factor for severe symptoms in the event of infection."],
                    ["it", "La gravidanza è un potenziale fattore di rischio per sintomi gravi in caso di infezione."],
                    ["nl", "Infecties kunnen soms anders verlopen bij zwangeren."],
                    ["nl-be", "Zwangerschap is een mogelijke risico-factor voor ernstige klachten bij infecties."],
                    ["fr", "La grossesse peut entraîner des complications si vous êtes infecté par la grippe."],
                    ["fr-be", "La grossesse est un potentiel facteur de risque pour les symptômes sévères en cas d'infections."],
                    ["de-be", "Schwangerschaft ist ein möglicher Risikofaktor für ernste Beschwerden bei Infektionen."],
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
                ["en", "Yes"],
                ["it", "Si"],
                ["nl", "Ja"],
                ["nl-be", "Ja"],
                ["fr", "Oui"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["it", "No"],
                ["nl", "Nee"],
                ["nl-be", "Nee"],
                ["fr", "Non"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Don't know/would rather not answer"],
                ["it", "Non so/Preferisco non rispondere"],
                ["nl", "Dit weet ik niet/wil ik liever niet aangeven"],
                ["nl-be", "Dit weet ik niet/wil ik liever niet aangeven"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
                ["fr-be", "Je ne veux pas / je préfère ne pas répondre à cette question"],
                ["de-be", "Das weiß ich nicht/möchte ich lieber nicht angeben"],
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
 * TRIMESTER: single choice question about pregrancy
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyQPregnancy reference to the survey item about pregnancy
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pregnancy_trimester = (parentKey: string, keyQGender: string, keyQBirthday: string, keyQPregnancy: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q12b'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Which trimester of the pregnancy are you in?"],
            ["it", "In quale trimestre della gravidanza ti trovi?"],
            ["nl", "In welk trimester ben je van je zwangerschap?"],
            ["nl-be", "In welk trimester bent u van uw zwangerschap?"],
            ["fr", "A quel stade de grossesse êtes-vous ?"],
            ["fr-be", "Dans quel trimestre de votre grossesse vous situez-vous ?"],
            ["de-be", "In welchem Quartal Ihrer Schwangerschaft sind Sie?"],
        ]))
    );

    // CONDITION
    editor.setCondition(
        expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyQGender, [responseGroupKey, singleChoiceKey].join('.'), '1'), // female
            expWithArgs('gte',
                expWithArgs('dateResponseDiffFromNow', keyQBirthday, [responseGroupKey, '1'].join('.'), 'years', 1),
                14
            ),
            expWithArgs('lte',
                expWithArgs('dateResponseDiffFromNow', keyQBirthday, [responseGroupKey, '1'].join('.'), 'years', 1),
                50
            ),
            expWithArgs('responseHasKeysAny', keyQPregnancy, [responseGroupKey, singleChoiceKey].join('.'), '0')
        )
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "The stage of pregnancy might alter your infection, although this is not very clear."],*/
                    ["en", "The risk of severe symptoms can vary depending on the pregnancy trimester, but this link has not yet been clearly established."],
                    ["it", "Lo stadio di avanzamento della gravidanza può influenzare la probabilità di sviluppare complicazioni nel caso in cui ti ammali di influenza, anche se la correlazione non è ancora molto chiara."],
                    ["nl", "Infecties kunnen soms anders verlopen per trimester van een zwangerschap, maar heel duidelijk is dit nog niet."],
                    ["nl-be", "Het risico op ernstige klachten van een infectie kan verschillen per trimester van een zwangerschap, maar heel duidelijk is dit nog niet."],
                    ["fr", "Le stade de grossesse pourrait influencer les risques de grippe grave, bien que ce soit pas démontré."],
                    ["fr-be", "Le risque de symptômes sévères d'une infection peut varier selon le trimestre de la grossesse, mais ce lien n'est pas encore clairement établi."],
                    ["de-be", "Das Risiko ernster Beschwerden durch eine Infektion kann sich je nach Quartal einer Schwangerschaft unterscheiden, aber ganz klar ist das noch nicht."],
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
                ["en", "First trimester (week 1-12)"],
                ["it", "Primo trimestre (settimane 1-12)"],
                ["nl", "Eerste trimester (week 1-12)"],
                ["nl-be", "Eerste trimester (week 1-12)"],
                ["fr", "Premier trimestre (semaine 1-12)"],
                ["fr-be", "Premier trimestre (semaines 1-12)"],
                ["de-be", "Erstes Quartal (Woche 1-12)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Second trimester (week 13-28)"],
                ["it", "Secondo trimestre (settimane 13-28)"],
                ["nl", "Tweede trimester (week 13-28)"],
                ["nl-be", "Tweede trimester (week 13-28)"],
                ["fr", "Deuxième trimestre (semaine 13-28)"],
                ["fr-be", "Deuxième trimestre (semaines 13-28)"],
                ["de-be", "Zweites Quartal (Woche 13-28)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Third trimester (week 29-delivery)"],
                ["it", "Terzo trimestre (settimana 29 - parto)"],
                ["nl", "Derde trimester (week 29 tot bevalling)"],
                ["nl-be", "Derde trimester (week 29 tot bevalling)"],
                ["fr", "Troisième trimestre (semaine 29 ou plus)"],
                ["fr-be", "Troisième trimestre (semaine 29 jusqu'à l'accouchement)"],
                ["de-be", "Drittes Quartal (Woche 29 bis zur Entbindung/Geburt)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Don't know/would rather not answer"],
                ["it", "Non so/Preferisco non rispondere"],
                ["nl", "Dit weet ik niet / wil ik niet aangeven"],
                ["nl-be", "Dit weet ik niet / wil ik niet aangeven"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
                ["fr-be", "Je ne veux pas / je préfère ne pas répondre à cette question"],
                ["de-be", "Das weiß ich nicht / möchte ich nicht angeben"],
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
 * SMOKING: single choice question about smoking
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const smoking = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q13'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you smoke tobacco?"],
            ["it", "Fumi tabacco?"],
            ["nl", "Rook je?"],
            ["fr", "Etes-vous fumeur?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Smoking might make you more likely to get a more severe dose of virus disease. We would like to test this."],
                    ["it", "Vogliamo studiare se la condizione di fumatore può aumentare la probabilità di ammalarsi di influenza o covid-19."],
                    ["nl", "Roken is een risicofactor voor ernstige luchtwegklachten, dit willen we graag onderzoeken."],
                    ["fr", "Fumer pourrait vous rendre plus susceptible de contracter une grippe sévère."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please, answer as accurately as possible."],
                    ["it", "Ti preghiamo di selezionare l’opzione che corrisponde più da vicino alle tue abitudini. Se fumi altri prodotti (pipa o sicago), indica più o meno quante volte al giorno ti capita di fumare."],
                    ["nl", "Antwoord zo precies mogelijk."],
                    ["fr", "Répondez aussi précisément que possible. Si vous fumez autres produits (p. ex. pipe ou cigares), indiquez à peu près combien de fois par jour."],
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
                ["it", "No"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, occasionally"],
                ["it", "Sì, occasionalmente"],
                ["nl", "Ja, af en toe"],
                ["fr", "Oui, de temps en temps"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, daily, fewer than 10 times a day"],
                ["it", "Si, quotidianamente, meno di dieci volte al giorno"],
                ["nl", "Dagelijks, minder dan 10 keer per dag"],
                ["fr", " Oui, quotidiennement, moins de 10 fois par jour"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, daily, 10 or more times a day"],
                ["it", "Si, quotidianamente, piu' di dieci volte al giorno"],
                ["nl", "Dagelijks, 10 keer of vaker per dag"],
                ["fr", " Oui, quotidiennement, 10 fois ou plus par jour"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Yes, only e-cigarettes"],
                ["it", "Si ma solo sigarette elettroniche"],
                ["nl", "Ja, alleen e-sigaretten"],
                ["fr", "e-sigarettes"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Dont know/would rather not answer"],
                ["it", "Non so/Preferisco non rispondere"],
                ["nl", "Dit wil ik niet aangeven"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
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
 * Allergies: multiple choice question about allergies
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const allergies = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q14'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you have one of the following allergies that can cause respiratory symptoms?"],
            ["it", "Sei affetto da una delle seguenti allergie che possono causare sintomi respiratori? (Seleziona tutte le opzioni che si applicano al tuo caso)"],
            ["nl", "Heb je één of meer van de volgende allergieën?"],
            ["nl-be", "Heeft u één of meer van de volgende allergieën?"],
            ["fr", "Avez-vous l'une des allergies suivantes qui peuvent causer des symptômes respiratoires ?"],
            ["fr-be", "Souffrez-vous d’une ou de plusieurs des allergies suivantes ?"],
            ["de-be", "Haben Sie eine oder mehrere der folgenden Allergien?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Certain allergies provoke the same symptoms as respiratory infections."],
                    ["it", "Alcune allergie possono presentare sintomi simili alle infezioni respiratorie."],
                    ["nl", "Sommige allergieën geven dezelfde klachten als luchtweginfecties"],
                    ["nl-be", "Sommige allergieën geven dezelfde klachten als luchtweginfecties."],
                    ["fr", "Certaines réactions allergiques peuvent avoir des symptômes similaires ceux d'une infection respiratoire."],
                    ["fr-be", "Certaines allergies provoquent les mêmes symptômes que les infections des voies respiratoires."],
                    ["de-be", "Manche Allergien ergeben dieselben Beschwerden wie Atemwegsinfektionen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre ?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Tick all the options that apply. We are only interested in those allergies that cause respiratory symptoms (i.e. sneezing, sunny nose, runny eyes)."],*/
                    ["en", "Multiple answers are possible, mark all that apply."],
                    ["it", "Seleziona tutte le opzioni che si applicano al tuo caso. Siamo interessati solo a quelle allergie che causano sintomi respiratori (ad esempio starnuti, naso che cola, occhi arrossati etc)."],
                    ["nl", "Meerdere antwoorden mogelijk, klik alle opties die relevant zijn."],
                    ["nl-be", "Meerdere antwoorden mogelijk, vink alle opties aan die relevant zijn."],
                    ["fr", "Cochez toutes les options applicables. Nous sommes seulement intéressés par les allergies qui provoquent des symptômes respiratoires (éternuement, nez coulant, yeux larmoyants)."],
                    ["fr-be", "Plusieurs réponses sont possibles, cochez toutes les options pertinentes."],
                    ["de-be", "Mehrere Antworten sind möglich; kreuzen Sie daher alle Alternativen an, die relevant sind."],
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
                ['en', 'Select all options that apply'],
                ['it', 'Seleziona tutte le opzioni che si applicano al tuo caso'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
                ['fr-be', 'Plusieurs réponses sont possibles'],
                ['de-be', 'Mehrere Antworten möglich'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Hay fever"],
                ["it", "Febbre da fieno"],
                ["nl", "Hooikoorts"],
                ["nl-be", "Hooikoorts"],
                ["fr", "Rhume des foins"],
                ["fr-be", "Le rhume des foins"],
                ["de-be", "Heuschnupfen"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Allergy against house dust mite"],
                ["it", "Allergia ad acari della polvere"],
                ["nl", "Allergie voor huisstofmijt"],
                ["nl-be", "Allergie voor huisstofmijt"],
                ["fr", "Allergie aux acariens"],
                ["fr-be", "Une allergie aux acariens"],
                ["de-be", "Allergie gegen Hausstaubmilben"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Allergy against domestic animals or pets"],
                ["it", "Allergia al pelo di animali domestici"],
                ["nl", "Allergie voor (huis)dieren"],
                ["nl-be", "Allergie voor (huis)dieren"],
                ["fr", "Allergie à des animaux domestiques"], ["fr-be", ""],
                ["fr-be", "Une allergie aux animaux (domestiques)"],
                ["de-be", "Allergie gegen (Haus-)Tiere"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Other allergies that cause respiratory symptoms (e.g. sneezing, runny eyes)"],
                ["it", "Altre allergie che causano sintomi respiratori (es. occhi arrossati e lacrimosi)"],
                ["nl", "Een andere allergie waarvan ik verkoudheidsklachten (loopneus, tranende ogen) krijg"],
                ["nl-be", "Een andere allergie waarvan ik verkoudheidsklachten (loopneus, tranende ogen) krijg"],
                ["fr", "Autres allergies provoquant des symptômes respiratoires (p. ex. éternuements, yeux larmoyants, etc)"],
                ["fr-be", "Une autre allergie qui provoque chez moi les symptômes du rhume (un nez qui coule, des yeux larmoyants)"],
                ["de-be", "Eine andere Allergie, von der ich Erkältungsbeschwerden (laufende Nase, tränende Augen) bekomme"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I do not have an allergy that causes respiratory symptoms"],
                ["it", "Non ho allergie che causano sintomi respiratori"],
                ["nl", "Nee, ik heb geen allergie waarvan ik verkoudheidsklachten krijg"],
                ["nl-be", "Nee, ik heb geen allergie waarvan ik verkoudheidsklachten krijg"],
                ["fr", "Je n'ai pas d'allergie causant des symptômes respiratoires"],
                ["fr-be", "Non, je n'ai pas d'allergie qui provoque chez moi les symptômes du rhume"],
                ["de-be", "Nein, ich habe keine Allergie, von der ich Erkältungsbeschwerden bekomme"],
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
 * SPACIAL DIET: multiple choice question about special diet
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const special_diet = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q15'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you follow a special diet?"],
            ["it", "Segui un regime alimentare particolare?"],
            ["nl", "Volg je een specifiek dieet?"],
            ["fr", "Suivez-vous un régime alimentaire particulier?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    // none

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['it', 'Seleziona tutte le opzioni che si applicano al tuo caso'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No special diet"],
                ["it", "Nessun regime alimentare speciale"],
                ["nl", "Nee, ik volg geen specifiek dieet"],
                ["fr", "Non, pas de régime particulier"],
            ])
        }, {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Vegetarian"],
                ["it", "Sono vegetariano/a"],
                ["nl", "Ik eet vegetarisch"],
                ["fr", "Végétarien"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Veganism"],
                ["it", "Sono vegano/a"],
                ["nl", "Ik eet veganistisch"],
                ["fr", "Végétalien"],
            ])
        }, {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Low-calorie"],
                ["it", "Seguo una dieta ipocalorica"],
                ["nl", "Ik eet caloriearm"],
                ["fr", "Basse-calorie"],
            ])
        }, {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Other"],
                ["it", "Altro"],
                ["nl", "Ik volg een ander dieet"],
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
 * PETS: multiple choice question about pets
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const pets = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q16'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you have pets at home?"],
            ["it", "Possiedi animali domestici?"],
            ["nl", "Heb je huisdieren?"],
            ["nl-be", "Heeft u huisdieren?"],
            ["fr", "Avez-vous un animal domestique ?"],
            ["fr-be", "Avez-vous des animaux de compagnie ?"],
            ["de-be", "Haben Sie Haustiere?"],
        ]))
    );

    // CONDITION
    // none

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this question?"],
                    ["it", "Possiedi animali domestici?"],
                    ["nl", ""],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr", ""],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to know if having a pet could be linked to the risk of infection."],
                    ["it", "Vogliamo studiare se avere animali domestici aumenta il rischio di ammalarsi."],
                    ["nl", ""],
                    ["nl-be", "We onderzoeken of het hebben van huisdieren een link kan hebben met het risico op infecties."],
                    ["fr", ""],
                    ["fr-be", "Nous cherchons à savoir si le fait d’avoir un animal de compagnie peut avoir un lien avec le risque d'infections."],
                    ["de-be", "Wir untersuchen, ob die Haltung von Haustieren eine Verbindung zum Infektionsrisiko haben kann."],
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
                ['it', 'Seleziona tutte le opzioni che si applicano al tuo caso'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ['nl-be', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
                ["fr-be", "Plusieurs réponses sont possibles"],
                ["de-be", "Mehrere Antworten möglich"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["it", "No"],
                ["nl", "Nee"],
                ["nl-be", "Nee"],
                ["fr", "Non"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one or more dogs"],
                ["it", "Si, uno o più cani"],
                ["nl", "Ja, één of meerdere honden"],
                ["nl-be", "Ja, één of meerdere honden"],
                ["fr", "Oui, un ou plusieurs chien(s)"],
                ["fr-be", "Oui, un ou plusieurs chien(s)"],
                ["de-be", "Ja, einen oder mehrere Hunde"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one or more cats"],
                ["it", "Si, uno o più gatti"],
                ["nl", "Ja, één of meerdere katten"],
                ["nl-be", "Ja, één of meerdere katten"],
                ["fr", "Oui, un ou plusieurs chat(s)"],
                ["fr-be", "Oui, un ou plusieurs chat(s)"],
                ["de-be", "Ja, eine oder mehrere Katzen"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one or more birds"],
                ["it", "Si, uno o più uccelli"],
                ["nl", "Ja, één of meerdere vogels"],
                ["nl-be", "Ja, één of meerdere vogels"],
                ["fr", "Oui, un ou plusieurs oiseau(x)"],
                ["fr-be", "Oui, un ou plusieurs oiseau(x)"],
                ["de-be", "Ja, einen Vogel oder mehrere Vögel"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one ore more other animals"],
                ["it", "Si, uno o più animali di altro tipo"],
                ["nl", "Ja, één of meer andere dieren"],
                ["nl-be", "Ja, één of meer andere dieren"],
                ["fr", "Oui, un ou plusieurs animaux d'autres espèces"],
                ["fr-be", "Oui, un ou plusieurs autre(s) animal (animaux)"],
                ["de-be", "Ja, eines oder mehrere andere Tiere"],
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
 * Find out about Platform: multiple choice question about where the participant found out about the platform
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const find_out_about_platform = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q17'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar heeft u over het platform gehoord?"],
            ["fr-be", "Où avez-vous entendu parler de la plateforme ?"],
            ["de-be", "Wo haben Sie von der Plattform gehört?"],
            ["en", "Where did you first hear about the platform?"],
            ["it", "Dove hai sentito parlare di Influweb per la prima volta?"],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen weten hoe u infectieradar.be gevonden heeft."],
                    ["fr-be", "Nous voulons savoir comment vous avez connu notre site Internet infectieradar.be."],
                    ["de-be", "Wir möchten wissen, wie Sie infectieradar.be gefunden haben."],
                    ["en", "We would like to know how you found out about our website infectieradar.be."],
                    ["it", "Vogliamo sapere come sei venuto a conoscenza dell'esistenza del sito di Influweb."],
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
                ['fr-be', 'Plusieurs réponses sont possibles'],
                ['de-be', 'Mehrere Antworten möglich'],
                ['en', 'Select all options that apply'],
                ['it', 'Seleziona tutte le opzioni che si applicano al tuo caso'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Op radio of televisie"],
                ["fr-be", "À la radio ou à la télévision"],
                ["de-be", "Im Rundfunk oder Fernsehen"],
                ["en", "Radio or television"],
                ["it", "Da radio o televisione"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "In de krant of magazine"],
                ["fr-be", "Dans un journal ou un magazine"],
                ["de-be", "In der Zeitung oder Zeitschrift"],
                ["en", "In the newspaper or in a magazine"],
                ["it", "Da quotidiani e/o giornali"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Via internet (website, nieuwswebsite, zoekmachine)"],
                ["fr-be", "Par le biais d’Internet (un site Internet, un site Internet d'information, un moteur de recherche)"],
                ["de-be", "Über das Internet (Website, News-Website, Suchmaschine)"],
                ["en", "The internet (a website, link, a search engine)"],
                ["it", "Su internet (da un sito web, un link o un motore di ricerca)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Via een poster"],
                ["fr-be", "Par une affiche"],
                ["de-be", "Von einem Plakat"],
                ["en", "By poster"],
                ["it", "Da poster"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Via vrienden en/of familie"],
                ["fr-be", "Par l'intermédiaire des amis et/ou de la famille"],
                ["de-be", "Über Freunde und/oder Familie"],
                ["en", "Via family or friends"],
                ["it", "Da famiglia o amici"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Via school of werk"],
                ["fr-be", "Par le biais de l'école ou du travail"],
                ["de-be", "Über die Schule oder die Arbeit"],
                ["en", "Via school or work"],
                ["it", "A scuola o in ufficio"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
                ["en", "Other"],
                ["it", "Altro"],
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

const surveyEnd = (parentKey: string): SurveyItem => {
    const defaultKey = 'surveyEnd'
    const itemKey = [parentKey, defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, type: 'surveyEnd', isGroup: false });

    editor.setTitleComponent(
        generateTitleComponent(new Map([
            /*["en", "This was all for now, please submit your responses. Please come back and find a different survey about how you feel and your health status."],*/
            ["en", "Thank you! This was all for now, please submit (push « send ») your responses. Please come back or continue reporting symptoms you experience during the last week."],
            ["it", "Grazie! Per il momento è tutto! Per favore, clicca sul pulsante 'Invia' per finalizzare le tue risposte. Ora puoi proseguire a compilare il questionario sul tuo stato di salute!"],
            ["nl", "Dank je wel. Dit was de laatste vraag. Na het opslaan (druk « verzenden ») kun je verder met het melden of je wel of geen klachten had in de afgelopen week."],
            ["nl-be", "Dank je wel. Dit was de laatste vraag. Na het opslaan (druk « verzenden ») kun je verder met het melden of je wel of geen klachten had in de afgelopen week."],
            ["fr-be", "Merci. C'était la dernière question. Après avoir sauvegardé vos réponses (cliquez sur « envoyer »), vous pouvez aller à la page qui vous permettra d'indiquer si vous avez eu des plaintes / ressenti des symptômes au cours de la semaine écoulée."],
            ["de-be", "Vielen Dank! Das war die letzte Frage. Falls Sie neue Beschwerden haben, können Sie nach dem Abspeichern die Fragen erneut beantworten."],
        ]))
    );

    // CONDITION
    // None

    return editor.getItem();
}

export const IntakeQuestions = {
    gender: gender,
    dateOfBirth: date_of_birth,
    postalCode: postal_code,
    mainActivity: main_activity,
    postalCodeWork: postal_code_work,
    workType: work_type,
    highestEducation: highest_education,
    peopleMet: people_met,
    ageGroups: age_groups,
    childrenInSchool: children_in_school,
    meansOfTransport: means_of_transport,
    pubTransportDuration: pub_transport_duration,
    commonColdFrequency: common_cold_frequency,
    fluVaccineLastSeason: flu_vaccine_last_season,
    fluVaccineThisSeason: flu_vaccine_this_season,
    fluVaccineThisSeasonWhen: flu_vaccine_this_season_when,
    fluVaccineThisSeasonReasonFor: flu_vaccine_this_season_reason_for,
    fluVaccineThisSeasonReasonAgainst: flu_vaccine_this_season_reason_against,
    regularMedication: regular_medication,
    pregnancy: pregnancy,
    pregnancyTrimester: pregnancy_trimester,
    smoking: smoking,
    allergies: allergies,
    specialDiet: special_diet,
    pets: pets,
    findPlatform: find_out_about_platform,
    surveyEnd,
};
