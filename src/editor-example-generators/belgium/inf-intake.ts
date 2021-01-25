import { Survey, SurveyItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { IntakeQuestions as DefaultIntake } from "../common_question_pool/influenzanet-intake";
import { initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, initDropdownGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";
import { initLikertScaleItem } from "../../editor-engine/utils/question-type-generator";
import { likertScaleKey } from "../common_question_pool/key-definitions";

const intake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["nl-be", "Achtergrondvragenlijst"],
            ["en", "Intake questionnaire"],
            ["fr-be", "Questionnaire préliminaire"],
            ["de-be", "Hintergrundfrageboge"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["nl-be", "Het doel van de eerste vragenlijst is om elke gebruiker wat beter te leren kennen."],
            ["en", "The intake survey focues on some background and demographic information."],
            ["fr-be", "Le questionnaire préliminaire a pour but de connaître un peu mieux chaque utilisateur."],
            ["de-be", "Der Zweck des Hintergrundfragebogens ist es, jeden Benutzer ein wenig besser kennen zu lernen."],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["nl-be", "Dit zal ongeveer 5-15 minuten tijd in beslag nemen."],
            ["en", "This will take 5-15 minutes."],
            ["fr-be", "Comptez environ 5-15 minutes pour compléter le questionnaire préliminaire."],
            ["de-be", "Es dauert etwa 5-15 Minuten, um diesen Fragebogen auszufüllen."],
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

    const Q_gender = DefaultIntake.gender(rootKey, true);
    survey.addExistingSurveyItem(Q_gender, rootKey);

    const Q_birthdate = DefaultIntake.dateOfBirth(rootKey, true);
    survey.addExistingSurveyItem(Q_birthdate, rootKey);

    const Q_postal = DefaultIntake.postalCode(rootKey, true);
    survey.addExistingSurveyItem(Q_postal, rootKey);

    const Q_main_activity = main_activity(rootKey, true);
    survey.addExistingSurveyItem(Q_main_activity, rootKey);

    const Q_postal_work = postal_code_work(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_postal_work, rootKey);

    const Q_work_type = work_type(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_work_type, rootKey);

    const Q_work_sector = work_sector(rootKey, Q_main_activity.key, true);
    survey.addExistingSurveyItem(Q_work_sector, rootKey);

    const Q_work_school = work_school(rootKey, Q_work_sector.key, true);
    survey.addExistingSurveyItem(Q_work_school, rootKey);

    const Q_work_medical = work_medical(rootKey, Q_work_sector.key, true);
    survey.addExistingSurveyItem(Q_work_medical, rootKey);

    const Q_highest_education = highest_education(rootKey, true);
    survey.addExistingSurveyItem(Q_highest_education, rootKey);

    const Q_people_met = people_met(rootKey, true);
    survey.addExistingSurveyItem(Q_people_met, rootKey);

    //const Q_age_groups = age_groups(rootKey, true);
    //survey.addExistingSurveyItem(Q_age_groups, rootKey);

    const Q_age_groups_likert = ageGroupExample(rootKey);
    survey.addExistingSurveyItem(Q_age_groups_likert, rootKey);

    const Q_children_in_school = DefaultIntake.childrenInSchool(rootKey, Q_age_groups_likert.key, true);
    survey.addExistingSurveyItem(Q_children_in_school, rootKey);

    const Q_means_of_transport = DefaultIntake.meansOfTransport(rootKey, true);
    survey.addExistingSurveyItem(Q_means_of_transport, rootKey);

    const Q_pub_transport_duration = DefaultIntake.pubTransportDuration(rootKey, true);
    survey.addExistingSurveyItem(Q_pub_transport_duration, rootKey);

    const Q_common_cold_frequ = DefaultIntake.commonColdFrequency(rootKey, true);
    survey.addExistingSurveyItem(Q_common_cold_frequ, rootKey);

    const Q_flu_vaccine_this_season = flu_vaccine_this_season(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, rootKey);

    const Q_flu_vaccine_this_season_when = DefaultIntake.fluVaccineThisSeasonWhen(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_when, rootKey);

    const Q_flu_vaccine_this_season_reasons_for = flu_vaccine_this_season_reason_for(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_for, rootKey);

    const Q_flu_vaccine_this_season_reasons_against = flu_vaccine_this_season_reason_against(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_against, rootKey);

    const Q_flu_vaccine_last_season = DefaultIntake.fluVaccineLastSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_last_season, rootKey);

    const Q_regular_medication = regular_medication(rootKey, true);
    survey.addExistingSurveyItem(Q_regular_medication, rootKey);

    const Q_pregnancy = DefaultIntake.pregnancy(rootKey, Q_gender.key, Q_birthdate.key, true);
    survey.addExistingSurveyItem(Q_pregnancy, rootKey);

    const Q_pregnancy_trimester = DefaultIntake.pregnancyTrimester(rootKey, Q_pregnancy.key, true);
    survey.addExistingSurveyItem(Q_pregnancy_trimester, rootKey);

    const Q_smoking = smoking(rootKey, true);
    survey.addExistingSurveyItem(Q_smoking, rootKey);

    const Q_allergies = DefaultIntake.allergies(rootKey, true);
    survey.addExistingSurveyItem(Q_allergies, rootKey);

    const Q_special_diet = special_diet(rootKey, true);
    survey.addExistingSurveyItem(Q_special_diet, rootKey);

    const Q_pets = DefaultIntake.pets(rootKey, true);
    survey.addExistingSurveyItem(Q_pets, rootKey);

    const Q_find_infectieradar = find_infectieradar(rootKey, true);
    survey.addExistingSurveyItem(Q_find_infectieradar, rootKey);

    const Q_previous_covid19_episode = previous_covid19_episode(rootKey, true);
    survey.addExistingSurveyItem(Q_previous_covid19_episode, rootKey);

    const Q_previous_covid19_episode_symptoms = previous_covid19_episode_symptoms(rootKey, Q_previous_covid19_episode.key, true);
    survey.addExistingSurveyItem(Q_previous_covid19_episode_symptoms, rootKey);

    const Q_additional_covid19_questions = additional_covid19_questions(rootKey, Q_previous_covid19_episode.key, true);
    survey.addExistingSurveyItem(Q_additional_covid19_questions, rootKey);

    const Q_additional_covid19_questions_medical_aid = additional_covid19_questions_medical_aid(rootKey, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_medical_aid, rootKey);

    const Q_additional_covid19_questions_hospital = additional_covid19_questions_hospital(rootKey, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_hospital, rootKey);

    const Q_additional_covid19_questions_hospital_length = additional_covid19_questions_hospital_length(rootKey, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_hospital_length, rootKey);

    const Q_additional_covid19_questions_ICU = additional_covid19_questions_ICU(rootKey, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_ICU, rootKey);

    const Q_additional_covid19_questions_coma = additional_covid19_questions_coma(rootKey, Q_additional_covid19_questions_hospital.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_coma, rootKey);

    const Q_additional_covid19_questions_returned_health = additional_covid19_questions_returned_health(rootKey, Q_additional_covid19_questions.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_returned_health, rootKey);

    const Q_additional_covid19_questions_ongoing_symptoms = additional_covid19_questions_ongoing_symptoms(rootKey, Q_additional_covid19_questions_returned_health.key, false);
    survey.addExistingSurveyItem(Q_additional_covid19_questions_ongoing_symptoms, rootKey);

    return survey.getSurvey();
}

export default intake;

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

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat is uw voornaamste bezigheid overdag?"],
            ["fr-be", "Quelle est votre activité principale pendant la journée?"], 
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om erachter te komen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen in verschillende beroepen."],
                    ["fr-be", "Afin d’examiner dans quelle mesure notre cohorte (le groupe de participants à cette étude) est représentative de la population, et afin d’examiner si le risque de contracter le coronavirus ou la grippe varie selon les personnes exerçant des professions différentes."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep. Voor baby's, peuters en kleuters die nog niet naar school gaan, vinkt u het vakje 'anders' aan."],
                    ["fr-be", "Cochez la case qui correspond le mieux à votre activité ou à votre profession principale. Pour les bébés et les jeunes enfants qui ne vont pas encore à l'école, cochez la case 'autre'."],
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
                ["nl-be", "Ik werk fulltime in loondienst"],
                ["fr-be", "Je travaille à plein temps en tant qu’employé(e)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk parttime in loondienst"],
                ["fr-be", "Je travaille à temps partiel en tant qu'employé(e)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk als zelfstandige/ondernemer"],
                ["fr-be", "Je travaille en tant que travailleur indépendant/entrepreneur"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben een scholier of student"],
                ["fr-be", "Je suis écolier (écolière) ou étudiant(e)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben huisman/huisvrouw"],
                ["fr-be", "Je suis un homme / une femme au foyer"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben werkzoekend"],
                ["fr-be", "Je suis à la recherche d'un emploi"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben (technisch) werkloos omwille van de coronasituatie"],
                ["fr-be", "Je suis au chômage (technique) à cause de la situation liée au coronavirus"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben thuis vanwege langdurige ziekte of zwangerschapsverlof"],
                ["fr-be", "Je suis à la maison en raison d'une longue maladie ou d'un congé de maternité"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben met pensioen"],
                ["fr-be", "Je suis à la retraite"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Anders"],
                ["fr-be", "Autre"],
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
            ["fr-be", "Quel est le code postal du lieu où vous passez la plupart de votre temps (de travail) (exemple : le lieu de travail/l’école/l’université)"],
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
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te bepalen hoe ver u zich op regelematige basis verplaatst."],
                    ["fr-be", "En vue de pouvoir déterminer la distance que vous parcourez régulièrement lors de vos déplacements."],
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
            ]),
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Dit wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Niet van toepassing/ik heb geen vaste werkplek"],
                ["fr-be", "Non applicable/je n'ai pas de lieu de travail fixe"],
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
            expWithArgs('checkResponseValueWithRegex', itemKey, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9][0-9][0-9][0-9]$'),
            expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), '1', '2')
        )
    });

    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ["nl-be", "Voer de vier cijfers van de postcode in"],
                ["fr-be", "xxx"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
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
            ["fr-be", "Quel type de travail effectuez-vous?"],
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
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om te bepalen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen met verschillende beroepen."],
                    ["fr-be", "Afin d’examiner dans quelle mesure notre cohorte (le groupe de participants à cette étude) est représentative de la population, et afin de déterminer si le risque de contracter le coronavirus ou la grippe est différent pour les personnes exerçant des professions différentes."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep."],
                    ["fr-be", "Cochez la case qui correspond le mieux à votre activité ou à votre profession principale."],
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
                ["nl-be", "Ik doe overig kenniswerk (manager, onderzoeker, accountant)"],
                ["fr-be", "J’effectue un autre type de travail intellectuel (responsable, chercheur, comptable)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe administratiefwerk (administratie, financieel assistent, receptionist, etc.)"],
                ["fr-be", "J’effectue un travail administratif (administration, assistant financier, réceptionniste, etc.)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe technisch werk (uitvoerend in techniek/bouw/productie)"],
                ["fr-be", "J’effectue un travail technique (dans le domaine de l'ingénierie, de la construction et de la production)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe ander uitvoerend werk"],
                ["fr-be", "Je fais d'autres travaux d’exécution"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben arts of verpleegkundige"],
                ["fr-be", "Je travaille en tant que médecin ou infirmier"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Anders, valt niet in bovengenoemde opties"],
                ["fr-be", "Un autre type de travail, mon travail ne fait pas partie des options susmentionnées"],
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
 * WORK SECTOR: single choice question about main sector of work
 * TO DO: possible to add free text field if option 19 is chosen (to be discussed if really want this?)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_sector = (parentKey: string, keyMainActivity?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c2'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Tot welke sector behoort het bedrijf of organisatie waarin u werkt?"],
            ["fr-be", "À quel secteur appartient l'entreprise ou l'organisation au sein de laquelle vous travaillez?"],
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
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om te bepalen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen met verschillende beroepen."],
                    ["fr-be", "Afin d’examiner dans quelle mesure notre cohorte (le groupe de participants à cette étude) est représentative de la population, et afin de déterminer si le risque de contracter le coronavirus ou la grippe est différent pour les personnes exerçant des professions différentes."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep."],
                    ["fr-be", "Cochez la case qui correspond le mieux à votre activité ou à votre profession principale."],
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
                ["nl-be", "Bouwnijverheid "],
                ["fr-be", "La construction / l’industrie du bâtiment"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Diensten aan bedrijven "],
                ["fr-be", "Les services aux entreprises"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Extraterritoriale organisaties en lichamen"],
                ["fr-be", "Les organisations et les organismes extraterritoriaux"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Financiële instellingen"],
                ["fr-be", "Les institutions financières"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Gemeenschapsvoorzieningen"],
                ["fr-be", "Les équipements collectifs"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Gezondheidszorg en maatschappelijke dienstverlening"],
                ["fr-be", "Les soins de santé et les services sociaux"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Groothandel, kleinhandel"],
                ["fr-be", "Le commerce de gros, le commerce de détail"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Hotels en restaurants"],
                ["fr-be", "Le secteur des hôtels et des restaurants"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Industrie"],
                ["fr-be", "L’industrie"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Landbouw, jacht en bosbouw"],
                ["fr-be", "L’agriculture, la chasse et la sylviculture"],
            ])
        },
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Onderwijs of kinderdagverblijf"],
                ["fr-be", "L’éducation ou le secteur de la garde d’enfants"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Onroerende goederen, verhuur "],
                ["fr-be", "L’immobilier, la location"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Openbaar bestuur"],
                ["fr-be", "L’administration publique"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Productie en distributie elektriciteit, water en gas"],
                ["fr-be", "La production et la distribution d'électricité, d'eau et de gaz"],
            ])
        },
        {
            key: '14', role: 'option',
            content: new Map([
                ["nl-be", "Reparatie van auto’s en huishoudelijke artikelen"],
                ["fr-be", "La réparation de véhicules automobiles et d’articles ménagers"],
            ])
        },
        {
            key: '15', role: 'option',
            content: new Map([
                ["nl-be", "Sociaal-culturele en persoonlijke diensten"],
                ["fr-be", "Les services socioculturels et personnels"],
            ])
        },
        {
            key: '16', role: 'option',
            content: new Map([
                ["nl-be", "Vervoer en opslag "],
                ["fr-be", "Le transport et l’entreposage "],
            ])
        },
        {
            key: '17', role: 'option',
            content: new Map([
                ["nl-be", "Visserij "],
                ["fr-be", "La pêche"],
            ])
        },
        {
            key: '18', role: 'option',
            content: new Map([
                ["nl-be", "Winning van delfstoffen"],
                ["fr-be", "L’industrie extractive"],
            ])
        },
        {
            key: '19', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
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
 * WORK SCHOOL: multiple choice question for people working in schools
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_school = (parentKey: string, keywork_sector?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c3'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar werkt u in het onderwijs of kinderopvang?"],
            ["fr-be", "Où travaillez-vous dans le domaine de l'éducation ou de la garde d'enfants?"],
        ]))
    );

    // CONDITION
    if (keywork_sector) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keywork_sector, [responseGroupKey, singleChoiceKey].join('.'), '10')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om een beter zicht te krijgen op de deelnemers die regelmatig contact hebben met kinderen/jongeren."],
                    ["fr-be", "Afin de mieux pouvoir cerner les participants qui ont des contacts réguliers avec des enfants/adolescents."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden zijn mogelijk."],
                    ["fr-be", "Plusieurs réponses sont possibles"],
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
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een kinderdagverblijf / kleuter onderwijs"],
                ["fr-be", "Je travaille dans une crèche / dans une école maternelle"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het basisonderwijs"],
                ["fr-be", "Je travaille dans l'enseignement primaire"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het secundair onderwijs"],
                ["fr-be", "Je travaille dans l'enseignement secondaire"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het post-secundair onderwijs (voorbeeld: hogeschool, universiteit)"],
                ["fr-be", "Je travaille dans l'enseignement supérieur (exemple : une haute école, une université)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
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
 * WORK MEDICAL: multiple choice question for people working in medical sector
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_medical = (parentKey: string, keywork_sector?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar werkt u in de gezondheidszorg?"],
            ["fr-be", "Où travaillez-vous dans le secteur de la santé?"],
        ]))
    );

    // CONDITION
    if (keywork_sector) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keywork_sector, [responseGroupKey, singleChoiceKey].join('.'), '5')
        );
    }

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om een beter zicht te krijgen op de deelnemers die werken in de gezondheidszorg."],
                    ["fr-be", "Afin de mieux pouvoir cerner les participants qui travaillent dans le secteur des soins de santé."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Meerdere antwoorden zijn mogelijk."],
                    ["fr-be", "Plusieurs réponses sont possibles"],
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
                ['fr-be', "Plusieurs réponses sont possibles"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een ziekenhuis"],
                ["fr-be", "Je travaille dans un hôpital"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een revalidatiecentrum"],
                ["fr-be", "Je travaille dans un centre de revalidation"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een woonzorgcentrum"],
                ["fr-be", "Je travaille dans une maison de repos et de soins"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in de geestelijke gezondheidszorg/zorgverlening"],
                ["fr-be", "Je travaille dans le domaine de la santé mentale et des soins de santé mentale"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een huisartsenpraktijk"],
                ["fr-be", "Je travaille dans un cabinet médical"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een andere eerstelijnszorg (bijvoorbeeld: fysiotherapie of revalidatie)"],
                ["fr-be", "Je travaille dans un autre service de soins de première ligne (par exemple : physiothérapie ou réadaptation)"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een arts-specialistenpraktijk"],
                ["fr-be", "Je travaille dans un cabinet de médecins-spécialistes"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Overig"],
                ["fr-be", "Autre"],
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

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat is uw hoogst voltooide opleiding?"],
            ["fr-be", "Quel est votre diplôme le plus élevé?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking."],
                    ["fr-be", "Dans le but de pouvoir examiner la représentativité de notre cohorte (le groupe de participants à cette étude) par rapport à la population."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kies het vakje dat uw hoogst voltooide opleidingsniveau vertegenwoordigt."],
                    ["fr-be", "Sélectionnez la case qui correspond à votre niveau d'éducation le plus élevé, achevé avec succès."],
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
                ["nl-be", "Ik heb geen officiële diploma's"],
                ["fr-be", "Je ne possède pas de diplôme(s) officiel(s)"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Diploma lager onderwijs"],
                ["fr-be", "Le diplôme de l’enseignement primaire"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Getuigschrift tweede graad secundair onderwijs"],
                ["fr-be", "Le certificat d'enseignement secondaire du deuxième degré"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Diploma secundair onderwijs"],
                ["fr-be", "Le diplôme de l’enseignement secondaire"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Professionele of Academische Bachelor opleiding"],
                ["fr-be", "Un bachelier professionnel ou académique"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Master opleiding of PhD (doctor)"],
                ["fr-be", "Une maîtrise ou un doctorat (docteur)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Dat wil ik niet aangeven"],
                ["fr-be", "Je préfère ne pas répondre à cette question"],
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

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u tijdens een normale dag contact met:"],
            ["fr-be", "Lors d'une journée normale, avez-vous des contacts avec :"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te achterhalen of u mogelijks meer wordt blootgesteld aan virussen dan de gemiddelde persoon (bijv. werken met kinderen of patiënten)."],
                    ["fr-be", "Afin de déterminer si vous pouvez être davantage exposé(e) aux virus que la moyenne des personnes (par exemple, en travaillant avec des enfants ou des patients)."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Groepen mensen kunnen elke situatie omvatten waar u in contact komt met grote aantallen mensen (bijv. een leraar die op een dag veel kinderen kan bereiken)."],
                    ["fr-be", "Des groupes de personnes peuvent inclure toute situation au niveau de laquelle vous êtes en contact avec un grand nombre de personnes (par exemple, un enseignant qui peut être en contact avec de nombreux enfants au cours d'une journée)."],
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
                ['nl-be', 'Selecteer alle opties die relevant zijn (laat contacten in het openbaar vervoer buiten beschouwing).'],
                ['fr-be', 'Plusieurs réponses sont possibles (et veuillez exclure les transports en commun)'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen onder de 3 jaar"],
                ["fr-be", "Plus de 10 enfants de moins de 3 ans"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen tussen de 3 en 11 jaar"],
                ["fr-be", "Plus de 10 enfants âgés entre 3 et 11 ans"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen tussen de 12 en 17 jaar"],
                ["fr-be", "Plus de 10 enfants âgés entre 12 et 17 ans"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 jongvolwassenen tussen de 18 en 30 jaar"],
                ["fr-be", "Plus de 10 jeunes adultes âgés entre 18 et 30 ans"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Meer dan 10 mensen van 65 jaar en ouder"],
                ["fr-be", "Plus de 10 personnes âgées de 65 ans et plus"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Patiënten"],
                ["fr-be", "Des patients"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["nl-be", "Groepen mensen (behalve kinderen en personen ouder dan 65) groter dan 10 personen"],
                ["fr-be", "Des groupes de personnes (à l'exception des enfants et des personnes de plus de 65 ans) de plus de 10 personnes"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Geen van de bovenstaande antwoorden is van toepassing"],
                ["fr-be", "Aucune des réponses susmentionnées ne s'applique"],
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
 * TO DO: change to Likert-type of question
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const age_groups = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q6'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "INCLUSIEF UZELF: hoeveel personen van de verschillende leeftijdsgroepen wonen er in uw huishouden?"],
        ]))
    );

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
                    ["nl-be", "De samenstelling van het huishouden kan invloed hebben op het risico van infectie, dit willen we graag onderzoeken."],
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
                    ["nl-be", "Een huishouden wordt gedefinieerd als een groep mensen (niet noodzakelijkerwijs verwant) die op hetzelfde adres wonen die een kookgelegenheid, woonkamer, zitkamer of eetkamer delen."],
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
                ['nl-be', 'Gelieve voor iedere leeftijdscategorie aan te duiden hoeveel personen er wonen in uw huishouden'],
            ])),
    }, rg?.key);

    // Dropdown options - used in each cell
    const ddg: ResponseRowCell = {
        key: 'col2', role: 'dropDownGroup',
        items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["nl-be", "0 personen"],
                ])
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["nl-be", "1 persoon"],
                ]),
            }, {
                key: '2', role: 'option', content: new Map([
                    ["nl-be", "2 personen"],
                ]),
            }, {
                key: '3', role: 'option', content: new Map([
                    ["nl-be", "3 personen"],
                ]),
            }, {
                key: '4', role: 'option', content: new Map([
                    ["nl-be", "4 personen"],
                ]),
            }, {
                key: '5', role: 'option', content: new Map([
                    ["nl-be", "5 personen"],
                ]),
            }, {
                key: '6', role: 'option', content: new Map([
                    ["nl-be", "6 personen"],
                ]),
            }, {
                key: '7', role: 'option', content: new Map([
                    ["nl-be", "7 personen"],
                ]),
            }, {
                key: '8', role: 'option', content: new Map([
                    ["nl-be", "8 personen"],
                ]),
            }, {
                key: '9', role: 'option', content: new Map([
                    ["nl-be", "9 of meer personen"],
                ]),
            },

        ]
    };

    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: '1', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "0 - 4 jaar"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2a', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "5 - 6 jaar"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2b', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "7 - 12 jaar"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2c', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "13 - 14 jaar"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2d', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "15 - 18 jaar"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '3', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "19 - 44 jaar"],
                    ])
                },
                { ...ddg }
            ]
        },
        {
            key: '4', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "45 - 64 jaar"],
                    ])
                },
                { ...ddg }
            ]
        },
        {
            key: '5', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["nl-be", "65 of ouder"],
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
            ["nl-be", "Heeft u in het huidige griepseizoen (2020/2021) een griepvaccin laten toedienen?"],
        ]))
    );

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
                    ["nl-be", "We willen de beschermende werking van het vaccin onderzoeken."],
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
                    ["nl-be", "Rapporteer 'ja', als u het vaccin dit seizoen heeft gekregen, meestal in de herfst. Als u zich na het invullen van deze vragenlijst laat vaccineren, rapporteer 'nee' en kies in een volgende vraag voor de optie 'Ik ben van plan om mezelf nog te laten vaccineren'."],
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
                ["nl-be", "Ja"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Dat weet ik niet (meer)"],
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

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat waren voor u de belangrijkste redenen om dit griepseizoen (2020/2021) een griepvaccin te halen?"],
        ]))
    );

    // CONDITION
    if (keyFluVaccineThisSeason) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyFluVaccineThisSeason, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
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
                    ["nl-be", "We willen graag weten waarom mensen zich laten vaccineren."],
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
                    ["nl-be", "Vink alle redenen aan die belangrijk waren bij uw beslissing."],
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
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik behoor tot een risicogroep (zwanger, 60 jaar of ouder, chronische ziek)"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Andere personen in mijn huishouden behoren tot een risicogroep"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "De COVID-19 pandemie moedigde me aan om mezelf te laten vaccineren dit jaar."],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie voorkomt dat ikzelf griep krijg"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie voorkomt dat ik het griepvirus verspreid naar andere mensen"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Mijn huisarts heeft me de griepvaccin aangeraden"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin werd aangeboden op mijn werk/op school"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin is voor mij gemakkelijk beschikbaar"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin was gratis"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik wil deze winter geen werk/school missen"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Ik haal het griepvaccin altijd"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Andere reden"],
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
 * TO DO: add optional free text field if 23 is chosen (to be discussed?)
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
            ["nl-be", "Wat waren de redenen waarom u zich niet liet vaccineren dit griepseizoen(2020/2021)?"],
        ]))
    );

    // CONDITION
    if (keyFluVaccineThisSeason) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyFluVaccineThisSeason, [responseGroupKey, singleChoiceKey].join('.'), '2')
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
                    ["nl-be", "We willen graag weten waarom sommige mensen niet worden gevaccineerd."],
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
                    ["nl-be", "Vink alle redenen aan die belangrijk waren bij uw beslissing."],
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
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben van plan om mezelf nog te laten vaccineren"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin werd me niet aangeboden"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik behoorde niet tot een risicogroep"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Het is beter om je eigen immuniteit op te bouwen tegen griep"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik twijfelde aan de effectiviteit van het griepvaccin"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Griep is slechts een milde ziekte"],
            ])
        },
        {
            key: '21', role: 'option',
            content: new Map([
                ["nl-be", "Door de COVID-19 pandemie vermijd ik naar de dokter of apotheek te gaan"],
            ])
        },
        {
            key: '22', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben bang dat het griepvaccin mijn risico op COVID-19 verhoogt"],
            ])
        },
        {
            key: '23', role: 'option',
            content: new Map([
                ["nl-be", "Een andere reden gerelateerd aan COVID-19"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ik achtte de kans klein dat ik griep krijg"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik was van mening dat het vaccin ook griep kan veroorzaken"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Ik was bang dat het vaccin niet veilig is, en me juist ziek maakt of andere neveneffecten heeft"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Ik hou niet van het krijgen van vaccinaties"],
            ])
        },
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Het is niet gemakkelijk om gevaccineerd te worden"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Ik moest betalen voor een griepvaccinatie, het is niet gratis"],
            ])
        },
        {
            key: '24', role: 'option',
            content: new Map([
                ["nl-be", "Het verkrijgen van een griepvaccin vergt te veel tijd en moeite ten opzichte van de mogelijke voordelen ervan"],
            ])
        },
        {
            key: '25', role: 'option',
            content: new Map([
                ["nl-be", "Het vaccin was niet beschikbaar voor mij"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Geen speciale reden"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Ondanks dat mijn huisarts het griepvaccin adviseerde, heb ik het niet genomen"],
            ])
        },
        {
            key: '14', role: 'option',
            content: new Map([
                ["nl-be", "Andere reden"],
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
 * TO DO: add optional free text field if 8 is chosen (to be discussed?)
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
            ["nl-be", "Gebruikt u regelmatig medicatie voor één of meer van de volgende aandoeningen?"],
        ]))
    );

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
                    ["nl-be", "De vraag maakt het voor ons mogelijk om te onderzoeken welke aandoeningen gelinkt zijn aan een hoger risico voor infectie."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord alleen met 'ja' als u reguliere medicatie gebruikt voor uw medisch probleem. Als u bijvoorbeeld slechts af en toe een astma-inhalator gebruikt, antwoord dan niet met 'ja' bij astma."],
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
                ["nl-be", "Meerdere antwoorden mogelijk"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor astma"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor diabetes"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor chronische longziekten (COPD, emfyseem, enz.)"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor hartaandoeningen"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor nieraandoeningen"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor een verzwakte afweer (bijvoorbeeld door een auto-immuunziekte, kankerbehandeling of na een orgaantransplantatie)"],
            ])
        },
        {
            key: '8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ja, voor andere redenen"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Dat wil ik niet aangeven"],
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
            ["nl-be", "Rookt u of heeft u gerookt?"],
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
                    ["nl-be", "Roken is een risico-factor voor ernstige klachten in de luchtwegen, dit willen we graag onderzoeken."],
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
                    ["nl-be", "Antwoord zo precies mogelijk."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Ik heb nooit gerookt"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Af en toe"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Dagelijks, minder dan 10 keer per dag"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Dagelijks, 10 keer of vaker per dag"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ja, alleen e-sigaretten"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben een ex-roker (5 jaar of minder gerookt)"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben een ex-roker (meer dan 5 jaar gerookt)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Dit wil ik niet aangeven"],
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
            ["nl-be", "Volgt u een specifiek dieet?"],
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
                    ["nl-be", "We onderzoeken of een dieet een link kan hebben met het risico op infecties hebben."],
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
                    ["nl-be", "Meerdere antwoorden mogelijk, vink alle opties aan die relevant zijn."],
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
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik volg geen specifiek dieet"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik eet vegetarisch"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik eet veganistisch"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik eet caloriearm"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Ik volg een dieet als gevolg van een allergie en/of voedselintolerantie"],
            ])
        },
        {
            key: '4', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Ik volg een ander dieet"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
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
 * FIND INFECTIERADAR: multiple choice question about where the participant found infectieradar
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const find_infectieradar = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q17BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setVersion(1);

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar heeft u van Infectieradar.be gehoord?"],
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
                    ["nl-be", "We willen weten hoe u infectieradar.be gevonden heeft."],
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
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Op radio of televisie"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "In de krant of magazine"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Via internet (website, nieuwswebsite, zoekmachine) behalve sociale media"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Via sociale media (facebook, twitter, instagram, etc.)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Via vrienden en familie"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Via school of werk"],
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
 * PREVIOUS COVID-19 EPISODE: single choice question about previous covid-19 episode
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const previous_covid19_episode = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q21BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Denkt u dat u al besmet bent (geweest) met het nieuwe coronavirus (COVID-19)?"],
        ]))
    );

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
                    ["nl-be", "We willen achtergrond informatie hebben in verband met vorige COVID-19 infecties."],
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
                    ["nl-be", "Antwoord zo precies mogelijk."],
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
                ["nl-be", "Nee, ik denk niet dat ik het nieuwe coronavirus al heb gehad"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ja, misschien wel, ik had/heb klachten die erop lijken"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik denk het wel, ik had/heb klachten die erop lijken, en mensen om me heen ook"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik weet het vrij zeker, want ikzelf en mensen om me heen hadden/hebben klachten, en één of meer van die mensen zijn positief getest op het coronavirus"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik weet het zeker, want ik ben positief getest op het coronavirus, en ik had/heb klachten die erop lijken"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ja, ik weet het zeker, want ik ben positief getest op het coronavirus, maar ik heb geen klachten gehad"],
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
 * PREVIOUS COVID-19 EPISODE SYMPTOMS: multiple choice question about previous covid-19 episode symptoms
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const previous_covid19_episode_symptoms = (parentKey: string, keyprevious_covid19_episode?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q21aBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Met welke symptomen ging uw COVID-19 infectie gepaard?"],
        ]))
    );

    // CONDITION
    if (keyprevious_covid19_episode) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyprevious_covid19_episode, [responseGroupKey, singleChoiceKey].join('.'), '2', '3', '4', '5')
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
                    ["nl-be", "We willen weten welke de meeste voorkomende klachten zijn bij COVID-19."],
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
                    ["nl-be", "Meerdere antwoorden zijn mogelijk."],
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
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Koorts"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Koude rillingen"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Loopneus of verstopte neus"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Niezen"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Keelpijn"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Hoesten"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Kortademig (snel buiten adem)"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Hoofdpijn"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Spierpijn/Gewrichtspijn (niet sport gerelateerd)"],
            ])
        },
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Pijn op de borst"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Vermoeid en lamlendig (algehele malaise)"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Verminderde eetlust"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Verkleurd slijm ophoesten"],
            ])
        },
        {
            key: '14', role: 'option',
            content: new Map([
                ["nl-be", "Waterige, of bloeddoorlopen ogen"],
            ])
        },
        {
            key: '15', role: 'option',
            content: new Map([
                ["nl-be", "Misselijkheid"],
            ])
        },
        {
            key: '16', role: 'option',
            content: new Map([
                ["nl-be", "Overgeven / braken"],
            ])
        },
        {
            key: '17', role: 'option',
            content: new Map([
                ["nl-be", "Diarree"],
            ])
        },
        {
            key: '18', role: 'option',
            content: new Map([
                ["nl-be", "Buikpijn"],
            ])
        },
        {
            key: '19', role: 'option',
            content: new Map([
                ["nl-be", "Verlies van smaak"],
            ])
        },
        {
            key: '20', role: 'option',
            content: new Map([
                ["nl-be", "Bloedneus"],
            ])
        },
        {
            key: '21', role: 'option',
            content: new Map([
                ["nl-be", "Verlies van geur"],
            ])
        },
        {
            key: '22', role: 'option',
            content: new Map([
                ["nl-be", "Verwardheid"],
            ])
        },
        {
            key: '23', role: 'option',
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
 * ADDITIONAL COVID-19 QUESTION: single choice question about whether additional questions can be asked
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions = (parentKey: string, keyprevious_covid19_episode?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(
            new Map([
                ["nl-be", "U gaf aan klachten te hebben van een mogelijke of bevestigde COVID-19 infectie. We willen u enkele bijkomende vragen stellen over deze COVID-19 infectie. Wil u deze extra vragen invullen"],
            ]),
            new Map([
                ["nl-be", "(dit zal ongeveer 2-5 minuten in beslag nemen)"],
            ]),
        )
    );

    // INFO POPUP
    // none

    // CONDITION
    if (keyprevious_covid19_episode) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyprevious_covid19_episode, [responseGroupKey, singleChoiceKey].join('.'), '2', '3', '4', '5')
        );
    }

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ja"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
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
 * ADDITIONAL COVID-19 QUESTIONS MEDICAL AID: single choice question about whether medical aid was searched (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_medical_aid = (parentKey: string, keyadditional_covid19_questions?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22aBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft een arts uw COVID-19 klachten behandeld?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions, [responseGroupKey, singleChoiceKey].join('.'), '0')
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
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
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
                ["nl-be", "Ja, en de arts heeft me gezegd dat ik zeker COVID-19 had"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, en de arts heeft me gezegd dat ik misschien COVID-19 had"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ja, maar de arts heeft mij gezegd dat ik zeker geen COVID-19 had"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
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
 * ADDITIONAL COVID-19 QUESTIONS HOSPITALIZED: single choice question about whether patient was hospitalized (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_hospital = (parentKey: string, keyadditional_covid19_questions?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22bBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u gehospitaliseerd geweest voor deze COVID-19 klachten?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions, [responseGroupKey, singleChoiceKey].join('.'), '0')
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
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
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
                ["nl-be", "Ja, één keer"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, meerdere keren"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
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
 * ADDITIONAL COVID-19 QUESTION HOSPITAL LENGTH: dropdown menu on hospital length (optional)
 * TO DO: Add a drop down menu with 0, 1, 2, ..., 30, 31-40, 41-50, 51-60, meer dan 60 dagen
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_hospital_length = (parentKey: string, keyadditional_covid19_questions_hospital?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22cBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Hoe lang bent u gehospitaliseerd geweest? Indien u meerdere keren bent gehospitaliseerd, mag u de duur van elke hospitalisatie samentellen."],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_hospital) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_hospital, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
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
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    const ddOptions = initDropdownGroup('ddg', [
        {
            key: '0', role: 'option', content: new Map([
                ["be-nl", "1 dag"],
            ]),
        },
        {
            key: '1', role: 'option', content: new Map([
                ["be-nl", "2 dagen"],
            ]),
        },
        {
            key: '2', role: 'option', content: new Map([
                ["be-nl", "3 dagen"],
            ]),
        },
        {
            key: '3', role: 'option', content: new Map([
                ["be-nl", "4 dagen"],
            ]),
        },
        {
            key: '4', role: 'option', content: new Map([
                ["be-nl", "5 dagen"],
            ]),
        },
        {
            key: '5', role: 'option', content: new Map([
                ["be-nl", "6 dagen"],
            ]),
        },
        {
            key: '6', role: 'option', content: new Map([
                ["be-nl", "7 dagen"],
            ]),
        },
        {
            key: '7', role: 'option', content: new Map([
                ["be-nl", "8 dagen"],
            ]),
        },
        {
            key: '8', role: 'option', content: new Map([
                ["be-nl", "9 dagen"],
            ]),
        },
        {
            key: '9', role: 'option', content: new Map([
                ["be-nl", "10 dagen"],
            ]),
        },
        {
            key: '10', role: 'option', content: new Map([
                ["be-nl", "11 dagen"],
            ]),
        },
        {
            key: '11', role: 'option', content: new Map([
                ["be-nl", "12 dagen"],
            ]),
        },
        {
            key: '12', role: 'option', content: new Map([
               ["be-nl", "13 dagen" ],
            ]),
        },
        {
            key: '13', role: 'option', content: new Map([
                ["be-nl", "14 dagen"],
            ]),
        },
        {
            key: '14', role: 'option', content: new Map([
                ["be-nl", "15 dagen"],
            ]),
        },
        {
            key: '15', role: 'option', content: new Map([
                ["be-nl", "16 dagen"],
            ]),
        },
        {
            key: '16', role: 'option', content: new Map([
                ["be-nl", "17 dagen"],
            ]),
        },
        {
            key: '17', role: 'option', content: new Map([
                ["be-nl", "18 dagen"],
            ]),
        },
        {
            key: '18', role: 'option', content: new Map([
                ["be-nl", "19 dagen"],
            ]),
        },
        {
            key: '19', role: 'option', content: new Map([
                ["be-nl", "20 dagen"],
            ]),
        },
        {
            key: '20', role: 'option', content: new Map([
                ["be-nl", "21 dagen"],
            ]),
        },
        {
            key: '21', role: 'option', content: new Map([
                ["be-nl", "22 dagen"],
            ]),
        },
        {
            key: '22', role: 'option', content: new Map([
                ["be-nl", "23 dagen"],
            ]),
        },
        {
            key: '23', role: 'option', content: new Map([
                ["be-nl", "24 dagen"],
            ]),
        },
        {
            key: '24', role: 'option', content: new Map([
                ["be-nl", "25 dagen"],
            ]),
        },
        {
            key: '25', role: 'option', content: new Map([
                ["be-nl", "26 dagen"],
            ]),
        },
        {
            key: '26', role: 'option', content: new Map([
                ["be-nl", "27 dagen"],
            ]),
        },
        {
            key: '27', role: 'option', content: new Map([
                ["be-nl", "28 dagen"],
            ]),
        },
        {
            key: '28', role: 'option', content: new Map([
                ["be-nl", "29 dagen"],
            ]),
        },
        {
            key: '29', role: 'option', content: new Map([
                ["be-nl", "30 dagen"],
            ]),
        },
        {
            key: '30', role: 'option', content: new Map([
                ["be-nl", "31-40 dagen"],
            ]),
        },
        {
            key: '31', role: 'option', content: new Map([
                ["be-nl", "41-50 dagen"],
            ]),
        },
        {
            key: '32', role: 'option', content: new Map([
                ["be-nl", "51-60 dagen"],
            ]),
        },
        {
            key: '33', role: 'option', content: new Map([
                ["be-nl", "meer dan 60 dagen"],
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
 * ADDITIONAL COVID-19 QUESTION ICU: single choice question about hospital ICU (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_ICU = (parentKey: string, keyadditional_covid19_questions_hospital?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22dBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u in ICU (afdeling intensieve zorgen) opgenomen?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_hospital) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_hospital, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
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
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
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
                ["nl-be", "Ja, één keer"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ja, meerdere keren"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
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
 * ADDITIONAL COVID-19 QUESTION Coma: single choice question about hospital coma (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_coma = (parentKey: string, keyadditional_covid19_questions_hospital?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22eBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u in coma geweest?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_hospital) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_hospital, [responseGroupKey, singleChoiceKey].join('.'), '0', '1')
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
                    ["nl-be", "Om meer informatie te verkrijgen over de medische hulp die u nodig had voor uw COVID-19 infectie."],
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
                ["nl-be", "ja, één keer"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
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
 * ADDITIONAL COVID-19 QUESTIONS RETURNED TO HEALTH: single choice question about whether patient returned to usual health (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_returned_health = (parentKey: string, keyadditional_covid19_questions?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22fBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Is uw gezondheid terug helemaal dezelfde als voor uw COVID-19 infectie?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions, [responseGroupKey, singleChoiceKey].join('.'), '0')
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
                    ["nl-be", "Om meer informatie te verkrijgen over de medische impact van uw COVID-19 infectie."],
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
                ["nl-be", "Ja"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Nee"],
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
 * ADDITIONAL COVID-19 QUESTION ONGOING SYMPTOMS: multiple choice question about still ongoing symptoms (optional)
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions_ongoing_symptoms = (parentKey: string, keyadditional_covid19_questions_returned_health?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22gBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Welke klachten heeft u nu nog?"],
        ]))
    );

    // CONDITION
    if (keyadditional_covid19_questions_returned_health) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyadditional_covid19_questions_returned_health, [responseGroupKey, singleChoiceKey].join('.'), '1')
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
                    ["nl-be", "Om meer informatie te verkrijgen over de medische impact van uw COVID-19 infectie."],
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
                ["nl-be", "Koude rillingen"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Loopneus of verstopte neus"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Niezen"],
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
                ["nl-be", "Kortademig (snel buiten adem)"],
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
                ["nl-be", "Spierpijn/Gewrichtspijn (niet sport gerelateerd)"],
            ])
        },
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Pijn op de borst"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Vermoeid en lamlendig (algehele malaise)"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verminderde eetlust"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verkleurd slijm ophoesten"],
            ])
        },
        {
            key: '14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Waterige, of bloeddoorlopen ogen"],
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
                ["nl-be", "Overgeven / braken"],
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
            key: '19', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van smaak"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Bloedneus"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verlies van geur"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Verwardheid"],
            ])
        },
        {
            key: '23', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["nl-be", "Andere"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Geen van deze symptomen/klachten"],
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


const ageGroupExample = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q6'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "INCLUSIEF UZELF: hoeveel personen van de verschillende leeftijdsgroepen wonen er in uw huishouden?"],
            ["fr-be", "Y COMPRIS VOUS-MÊME : combien de personnes des différentes tranches d'âge vivent-elles au sein de votre ménage?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "De samenstelling van het huishouden kan invloed hebben op het risico van infectie, dit willen we graag onderzoeken."],
                    ["fr-be", "La composition du ménage peut influencer le risque d'infection, ce que nous souhaitons étudier."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Een huishouden wordt gedefinieerd als een groep mensen (niet noodzakelijkerwijs verwant) die op hetzelfde adres wonen die een kookgelegenheid, woonkamer, zitkamer of eetkamer delen."],
                    ["fr-be", "Un ménage est défini comme un groupe de personnes (pas nécessairement apparentées) vivant à la même adresse, et partageant une cuisine, un salon, une salle de séjour ou une salle à manger."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ])
    );

    // RESPONSE PART
    const likertOptions = [
        {
            key: "0", content: new Map([
                ["nl-be", "0"],
                ["fr-be", "0"]
            ])
        },
        {
            key: "1", content: new Map([
                ["nl-be", "1"],
                ["fr-be", "1"]
            ])
        },
        {
            key: "2", content: new Map([
                ["nl-be", "2"],
                ["fr-be", "2"]
            ])
        },
        {
            key: "3", content: new Map([
                ["nl-be", "3"],
                ["fr-be", "3"]
            ])
        },
        {
            key: "4", content: new Map([
                ["nl-be", "4"],
                ["fr-be", "4"]
            ])
        },
        {
            key: "5", content: new Map([
                ["nl-be", "5+"],
                ["fr-be", "5+"]
            ])
        }
    ];

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', '0 - 4 jaar'],
                ['fr-be', '0 - 4 ans'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_1', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', '5 - 10 jaar'],
                ['fr-be', '5 - 10 ans'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_2', likertOptions), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-top border-1 border-grey-7 pt-1 mt-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['nl-be', '11 - 16 jaar'],
                ['fr-be', '11 - 16 ans'],
            ])),
    }, rg?.key);
    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_3', likertOptions), rg?.key);


    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
    });

    // VALIDATIONs
    // None

    return editor.getItem();
}
