import { Survey, SurveyItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { IntakeQuestions as DefaultIntake } from "../common_question_pool/influenzanet-intake";
import { initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";


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

    const Q_work_medical = work_medical(rootKey, Q_work_type.key, true);
    survey.addExistingSurveyItem(Q_work_medical, rootKey);

    const Q_highest_education = highest_education(rootKey, true);
    survey.addExistingSurveyItem(Q_highest_education, rootKey);

    const Q_people_met = people_met(rootKey, true);
    survey.addExistingSurveyItem(Q_people_met, rootKey);

    const Q_age_groups = age_groups(rootKey, true);
    survey.addExistingSurveyItem(Q_age_groups, rootKey);

    const Q_children_in_school = DefaultIntake.childrenInSchool(rootKey, Q_age_groups.key, true);
    survey.addExistingSurveyItem(Q_children_in_school, rootKey);
    // TO DO: check if the condition can be applied on the answer keys 2a-2d in Belgium ?

    const Q_means_of_transport = DefaultIntake.meansOfTransport(rootKey, true);
    survey.addExistingSurveyItem(Q_means_of_transport, rootKey);

    const Q_pub_transport_duration = DefaultIntake.pubTransportDuration(rootKey, true);
    survey.addExistingSurveyItem(Q_pub_transport_duration, rootKey);

    const Q_common_cold_frequ = DefaultIntake.commonColdFrequency(rootKey, true);
    survey.addExistingSurveyItem(Q_common_cold_frequ, rootKey);

    const Q_flu_vaccine_this_season = DefaultIntake.fluVaccineThisSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, rootKey);
    // TO DO: answer key 1 not present for Belgium. Should a new question be created in this file?

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

    const Q_previous_covid19_episode_symptoms = previous_covid19_episode_symptoms(rootKey, true);
    survey.addExistingSurveyItem(Q_previous_covid19_episode_symptoms, rootKey);

    const Q_additional_covid19_questions = additional_covid19_questions(rootKey, true);
    survey.addExistingSurveyItem(Q_additional_covid19_questions, rootKey);

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
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om erachter te komen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen in verschillende beroepen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep. Voor baby's, peuters en kleuters die nog niet naar school gaan, vinkt u het vakje 'anders' aan."],
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
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk parttime in loondienst"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk als zelfstandige/ondernemer"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben een scholier of student"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben huisman/huisvrouw"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben werkzoekend"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben (technisch) werkloos omwille van de coronasituatie"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben thuis vanwege langdurige ziekte of zwangerschapsverlof"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben met pensioen"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Anders"],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om te bepalen hoe ver u zich op regelematige basis verplaatst."],
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
            ]),
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Dit wil ik niet aangeven"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Niet van toepassing/ik heb geen vaste werkplek"],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om te bepalen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen met verschillende beroepen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep."],
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
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe administratiefwerk (administratie, financieel assistent, receptionist, etc.)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe technisch werk (uitvoerend in techniek/bouw/productie)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik doe ander uitvoerend werk"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben arts of verpleegkundige"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Anders, valt niet in bovengenoemde opties"],
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
 * TO DO: please check condition: should be asked when Q4 in (0,1,2)
 * TO DO: please check validation
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking, en om te bepalen of de kans op het krijgen van COVID-19 of griep verschillend is voor mensen met verschillende beroepen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Kruis het vakje aan dat het meest overeenkomt met uw hoofdberoep."],
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
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Diensten aan bedrijven "],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Extraterritoriale organisaties en lichamen"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Financiële instellingen"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Gemeenschapsvoorzieningen"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Gezondheidszorg en maatschappelijke dienstverlening"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Groothandel, kleinhandel"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Hotels en restaurants"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Industrie"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Landbouw, jacht en bosbouw"],
            ])
        },
        {
            key: '10', role: 'option',
            content: new Map([
                ["nl-be", "Onderwijs of kinderdagverblijf"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Onroerende goederen, verhuur "],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Openbaar bestuur"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Productie en distributie elektriciteit, water en gas"],
            ])
        },
        {
            key: '14', role: 'option',
            content: new Map([
                ["nl-be", "Reparatie van auto’s en huishoudelijke artikelen"],
            ])
        },
        {
            key: '15', role: 'option',
            content: new Map([
                ["nl-be", "Sociaal-culturele en persoonlijke diensten"],
            ])
        },
        {
            key: '16', role: 'option',
            content: new Map([
                ["nl-be", "Vervoer en opslag "],
            ])
        },
        {
            key: '17', role: 'option',
            content: new Map([
                ["nl-be", "Visserij "],
            ])
        },
        {
            key: '18', role: 'option',
            content: new Map([
                ["nl-be", "Winning van delfstoffen"],
            ])
        },
        {
            key: '19', role: 'option',
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
 * WORK SCHOOL: multiple choice question for people working in schools
 * TO DO: please check condition: should be asked when Q4c2=10
 * TO DO: please check validation
 * TO DO: Turn to multiplechoice question
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
            ["nl-be", "Waar werkt u in het onderwijs of kinderopvang? (Meerdere antwoorden mogelijk)"],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Om een beter zicht te krijgen op de deelnemers die regelmatig contact hebben met kinderen/jongeren."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
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
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een kinderdagverblijf / kleuter onderwijs"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het basisonderwijs"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het secundair onderwijs"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in het post-secundair onderwijs (voorbeeld: hogeschool, universiteit)"],
            ])
        },
        {
            key: '4', role: 'option',
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
 * WORK MEDICAL: multiple choice question for people working in medical sector
 * TO DO: please check condition: should be asked when Q4c=5
 * TO DO: please check validation
 * TO DO: Turn to multiplechoice question
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const work_medical = (parentKey: string, keyMainActivity?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q4c4'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Waar werkt u in de gezondheidszorg? (Meerdere antwoorden mogelijk)"],
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
                    ["nl-be", "Om een beter zicht te krijgen op de deelnemers die werken in de gezondheidszorg."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
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
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een ziekenhuis"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een revalidatiecentrum"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een woonzorgcentrum"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in de geestelijke gezondheidszorg/zorgverlening"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een huisartsenpraktijk"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een andere eerstelijnszorg (bijvoorbeeld: fysiotherapie of revalidatie)"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik werk in een arts-specialistenpraktijk"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Overig"],
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
                    ["nl-be", "Om na te gaan hoe representatief onze cohort (groep deelnemers aan deze studie) is in vergelijking met de bevolking."],
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
                    ["nl-be", "Kies het vakje dat uw hoogst voltooide opleidingsniveau vertegenwoordigt."],
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
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Diploma lager onderwijs"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Getuigschrift tweede graad secundair onderwijs"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Diploma secundair onderwijs"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Professionele of Academische Bachelor opleiding"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Master opleiding of PhD (doctor)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Dat wil ik niet aangeven"],
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
 * TO DO: Check if multiple choice has been correctly implemented.
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
                    ["nl-be", "Om te achterhalen of u mogelijks meer wordt blootgesteld aan virussen dan de gemiddelde persoon (bijv. werken met kinderen of patiënten)."],
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
                    ["nl-be", "Groepen mensen kunnen elke situatie omvatten waar u in contact komt met grote aantallen mensen (bijv. een leraar die op een dag veel kinderen kan bereiken)."],
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
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen onder de 3 jaar"],
            ])
        },
        {
            key: '11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen tussen de 3 en 12 jaar"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Meer dan 10 kinderen tussen de 12 en 18 jaar"],
            ])
        },
        {
            key: '13', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Meer dan 10 jongvolwassenen tussen de 18 en 30 jaar"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Meer dan 10 mensen van 65 jaar en ouder"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Patiënten"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Groepen mensen (behalve kinderen en personen ouder dan 65) groter dan 10 personen"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["nl-be", "Geen van de bovenstaande antwoorden is van toepassing"],
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
 * TO DO: check if answer options 2a, 2b, 2c, 2d can be used as a answer key ?
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
 *  REASONS FOR FLU VACCINE THIS SEASON: multiple choice
 * TO DO: Check if condition is correct.
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
            ["nl-be", "Wat waren voor u de belangrijkste redenen om dit griepseizoen (2020/2021) een griepvaccin te halen? (meerdere antwoorden zijn mogelijk)"],
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
 * TO DO: check condition
 * TO DO: add optional free text field if 23 is chosen (to be discussed?)
 * TO DO: check validation
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
            ["nl-be", "Wat waren de redenen waarom u zich niet liet vaccineren dit griepseizoen(2020/2021)? (Meerdere antwoorden zijn mogelijk)"],
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
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "Antwoord alleen met 'ja' als u reguliere medicatie gebruikt voor uw medische probleem. Als u bijvoorbeeld slechts af en toe een astma-inhalator gebruikt, antwoord dan niet met 'ja' bij astma."],
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
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
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
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Other"],
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
            ["nl-be", "Denkt u dat u al besmet bent (geweest) met het nieuwe coronavirus (COVID-19)?"],
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
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
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
                ["nl-be", "Ja, ik weet het vrij zeker, want ikzelf en mensen om me heen hadden/hebben klachten, en één of meer van die mensen zijn positief getest op het coronavirus"],
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
 * TO DO: Add condition: should be asked when Q21BE=2, 3, 4, 5
 * TO DO: Check if multiple choice was correctly implemented ?
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const previous_covid19_episode_symptoms = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q21aBE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Met welke symptomen ging uw COVID-19 infectie gepaard?"],
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
                    ["nl-be", "We willen weten welke de meeste voorkomende klachten zijn bij COVID-19."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["nl-be", "Hoe zal ik deze vraag beantwoorden?"],
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
 * ADDITIONAL COVID-19 QUESTIONS: single choice question about whether additional questions can be asked
 * TO DO: Add condition: should be asked when Q21BE=2, 3, 4, 5
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const additional_covid19_questions = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q22BE'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "U gaf aan klachten te hebben van een mogelijke of bevestigde COVID-19 infectie. We willen u enkele bijkomende vragen stellen over deze COVID-19 infectie. Wil u deze extra vragen invullen (dit zal ongeveer 2-5 minuten in beslag nemen)"],
        ]))
    );

    // INFO POPUP
    // none

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