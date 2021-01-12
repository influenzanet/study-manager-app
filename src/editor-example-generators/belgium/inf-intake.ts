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
            ["nl-be", "Dit zal ongeveer 5-10 minuten tijd in beslag nemen."],
            ["en", "This will take 5-10 minutes."],
            ["fr-be", "Comptez environ 5-10 minutes pour compléter le questionnaire préliminaire."],
            ["de-be", "Es dauert etwa 5-10 Minuten, um diesen Fragebogen auszufüllen."],
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

    const Q_highest_education = DefaultIntake.highestEducation(rootKey, true);
    survey.addExistingSurveyItem(Q_highest_education, rootKey);

    const Q_people_met = DefaultIntake.peopleMet(rootKey, true);
    survey.addExistingSurveyItem(Q_people_met, rootKey);

    const Q_age_groups = DefaultIntake.ageGroups(rootKey, true);
    survey.addExistingSurveyItem(Q_age_groups, rootKey);

    const Q_children_in_school = DefaultIntake.childrenInSchool(rootKey, Q_age_groups.key, true);
    survey.addExistingSurveyItem(Q_children_in_school, rootKey);

    const Q_means_of_transport = DefaultIntake.meansOfTransport(rootKey, true);
    survey.addExistingSurveyItem(Q_means_of_transport, rootKey);

    const Q_pub_transport_duration = DefaultIntake.pubTransportDuration(rootKey, true);
    survey.addExistingSurveyItem(Q_pub_transport_duration, rootKey);

    const Q_common_cold_frequ = DefaultIntake.commonColdFrequency(rootKey, true);
    survey.addExistingSurveyItem(Q_common_cold_frequ, rootKey);

    const Q_flu_vaccine_last_season = DefaultIntake.fluVaccineLastSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_last_season, rootKey);

    const Q_flu_vaccine_this_season = DefaultIntake.fluVaccineThisSeason(rootKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, rootKey);

    const Q_flu_vaccine_this_season_when = DefaultIntake.fluVaccineThisSeasonWhen(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_when, rootKey);

    const Q_flu_vaccine_this_season_reasons_for = DefaultIntake.fluVaccineThisSeasonReasonFor(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_for, rootKey);

    const Q_flu_vaccine_this_season_reasons_against = DefaultIntake.fluVaccineThisSeasonReasonAgainst(rootKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_against, rootKey);

    const Q_regular_medication = DefaultIntake.regularMedication(rootKey, true);
    survey.addExistingSurveyItem(Q_regular_medication, rootKey);

    const Q_pregnancy = DefaultIntake.pregnancy(rootKey, Q_gender.key, Q_birthdate.key, true);
    survey.addExistingSurveyItem(Q_pregnancy, rootKey);

    const Q_pregnancy_trimester = DefaultIntake.pregnancyTrimester(rootKey, Q_pregnancy.key, true);
    survey.addExistingSurveyItem(Q_pregnancy_trimester, rootKey);

    const Q_smoking = DefaultIntake.smoking(rootKey, true);
    survey.addExistingSurveyItem(Q_smoking, rootKey);

    const Q_allergies = DefaultIntake.allergies(rootKey, true);
    survey.addExistingSurveyItem(Q_allergies, rootKey);

    const Q_special_diet = DefaultIntake.specialDiet(rootKey, true);
    survey.addExistingSurveyItem(Q_special_diet, rootKey);

    const Q_pets = DefaultIntake.pets(rootKey, true);
    survey.addExistingSurveyItem(Q_pets, rootKey);

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
            expWithArgs('responseHasKeysAny', keyMainActivity, [responseGroupKey, multipleChoiceKey].join('.'), '0', '1', '2')
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