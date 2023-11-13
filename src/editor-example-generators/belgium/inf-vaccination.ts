import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { initMatrixQuestion, initMultipleChoiceGroup, initSingleChoiceGroup, ResponseRowCell } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { matrixKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";

export type VaccinationDef = {
    (): Survey;
    key: string;
}

const vaccination = <VaccinationDef>((): Survey | undefined => {
    const surveyKey = 'vaccination';

    vaccination.key = surveyKey;

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
            ["nl-be", "Het doel van deze vaccinatievragenlijst is om onderzoek te voeren naar de bescherming die het vaccin geeft en de vaccinatiestatus van België in kaart te brengen. "],
            ["en", "The purpose of the vaccination questionnaire is to find out more about protection given by the vaccine and monitor vaccination uptake in Belgium."],
            ["fr-be", "Le but de ce questionnaire relatif à la vaccination est d'examiner la protection conférée par le vaccin, et de cartographier la couverture vaccinale en Belgique. "],
            ["de-be", "Der Zweck des Fragebogens zur Impfung ist die Untersuchung des Schutzes, der von dem Impfstoff geboten wird, sowie die Überwachung des Impfgrades in Belgien. "],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["nl-be", "Dit zal ongeveer 2 minuten tijd in beslag nemen."],
            ["en", "It takes approximately 2 minutes to complete this questionnaire."],
            ["fr-be", "Comptez environ 2 minutes pour compléter le questionnaire préliminaire."],
            ["de-be", "Es dauert etwa 2 Minuten, um diesen Fragebogen auszufüllen."],
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

    const Q_vacStart = vacStart(rootKey, true);
    survey.addExistingSurveyItem(Q_vacStart, rootKey);

    // // -------> VACCINATION GROUP
    const hasVaccineGroup = hasVacGroup(rootKey, Q_vacStart.key);
    survey.addExistingSurveyItem(hasVaccineGroup, rootKey);
    const hasVaccineGroupKey = hasVaccineGroup.key;

    const Q_vac = vac(hasVaccineGroupKey, true);
    survey.addExistingSurveyItem(Q_vac, hasVaccineGroupKey);

    //const Q_vaccineBrandAll = vaccineBrandAll(hasVaccineGroupKey, Q_vac.key, true);
    //survey.addExistingSurveyItem(Q_vaccineBrandAll, hasVaccineGroupKey);

    //const Q_vaccineBrand = vaccineBrand(hasVaccineGroupKey, Q_vac.key, true);
    //survey.addExistingSurveyItem(Q_vaccineBrand, hasVaccineGroupKey);

    //const Q_vaccineShots = vaccineShots(hasVaccineGroupKey, Q_vac.key, true);
    //survey.addExistingSurveyItem(Q_vaccineShots, hasVaccineGroupKey);

    //const Q_dateFirstVaccine = dateFirstVaccine(hasVaccineGroupKey, Q_vac.key, Q_vaccineShots.key, true);
    //survey.addExistingSurveyItem(Q_dateFirstVaccine, hasVaccineGroupKey);

    //const Q_dateSecondVaccine = dateSecondVaccine(hasVaccineGroupKey, Q_vac.key, Q_vaccineShots.key, Q_dateFirstVaccine.key, true);
    //survey.addExistingSurveyItem(Q_dateSecondVaccine, hasVaccineGroupKey);

    const Q_dateLastVaccine = dateLastVaccine(hasVaccineGroupKey, Q_vac.key);
    survey.addExistingSurveyItem(Q_dateLastVaccine, hasVaccineGroupKey);

    const Q_vaccinePro = vaccinePro(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccinePro, hasVaccineGroupKey);

    const Q_vaccineContra = vaccineContra(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineContra, hasVaccineGroupKey);

    const Q_sideEffects = sideEffects(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_sideEffects, hasVaccineGroupKey);

    const Q_vacLastSeason = covid_vac_last_season(hasVaccineGroupKey, true);
    survey.addExistingSurveyItem(Q_vacLastSeason, hasVaccineGroupKey);

    const Q_flu_vaccine_this_season = flu_vaccine_this_season(hasVaccineGroupKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season, hasVaccineGroupKey);

    const Q_flu_vaccine_this_season_when = flu_vaccine_this_season_when(hasVaccineGroupKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_when, hasVaccineGroupKey);

    const Q_flu_vaccine_this_season_reasons_for = flu_vaccine_this_season_reason_for(hasVaccineGroupKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_for, hasVaccineGroupKey);

    const Q_flu_vaccine_this_season_reasons_against = flu_vaccine_this_season_reason_against(hasVaccineGroupKey, Q_flu_vaccine_this_season.key, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_this_season_reasons_against, hasVaccineGroupKey);

    const Q_flu_vaccine_last_season = flu_vaccine_last_season(hasVaccineGroupKey, true);
    survey.addExistingSurveyItem(Q_flu_vaccine_last_season, hasVaccineGroupKey);

    return survey.getSurvey();
})

export default vaccination;

/**
 * VAC Start: Question about previous vaccination questionnaire.
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const vacStart = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q0'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Vier weken geleden vulde u een vragenlijst in over uw Griep- en COVID-19 vaccinatie. Met deze nieuwe vragenlijst willen we veranderingen hierin verder opvolgen. Duid de optie aan die voor u van toepassing is.   "],
            ["fr-be", "Il y a quatre semaines, vous avez reçu un questionnaire relatif à la vaccination contre la grippe et le coronavirus. Ce nouveau questionnaire a pour but de contrôler tout changement ultérieur de votre statut vaccinal. Sélectionnez l'option qui vous concerne."],
            ["de-be", "Vor vier Wochen erhielten Sie einen Fragebogen zu Ihrer Grippe- und COVID-19-Impfung.  Dieser neue Fragebogen dient zur Überwachung eventueller weiterer Änderungen an Ihrem Impfstatus. Bitte wählen Sie die Option, die auf Sie zutrifft."],
            ["en", "Four weeks ago you received a questionnaire about your Flu and COVID-19 vaccination.  This new questionnaire is to monitor any further changes to your vaccination status. Select the option that applies to you."],
        ]))
    );

    // CONDITION
    const hadCompletedVaccSurvey = expWithArgs('eq', expWithArgs('getAttribute', expWithArgs('getAttribute', expWithArgs('getContext'), 'participantFlags'), 'completedVaccSurvey'), "1");
    editor.setCondition(hadCompletedVaccSurvey);

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "In de tussentijd kreeg ik een nieuwe dosis van het vaccin of kreeg ik een nieuwe uitnodiging voor een vaccin. "],
                ["fr-be", "Sur ces entrefaites, j'ai reçu une nouvelle dose du vaccin ou une nouvelle invitation à me faire vacciner."],
                ["de-be", "In der Zwischenzeit erhielt ich eine neue Impfdosis oder eine neue Einladung zur Impfung."],
                ["en", "In the meantime I received a new vaccine dose, or a new invitation to be vaccinated."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "In de tussentijd is er er niets veranderd voor mijn vaccinaties. "],
                ["fr-be", "Sur ces entrefaites, rien n'a changé pour moi en matière de vaccination."],
                ["de-be", "In der Zwischenzeit hat sich in Bezug auf die Impfung für mich nichts geändert."],
                ["en", "In the meantime nothing has changed in terms of vaccination for me."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet meer. Ik zou graag deze vragen beantwoorden zodat mijn informatie volledig is. "],
                ["fr-be", "Je ne suis pas certain(e), et je voudrais répondre à ces questions pour m'assurer que mes informations sur la vaccination sont à jour."],
                ["de-be", "Ich bin mir nicht sicher und ich würde gerne diese Fragen aufgreifen, um sicher zu gehen, dass meine Informationen zur Impfung auf dem neuesten Stand sind."],
                ["en", "I'm not sure, and would like to take these questions to make sure my information on vaccination is up to date."],
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
 * GROUP DEPENDING VACCINATION SURVEY ROUND
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param keyVacStart reference to the vac survey
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const hasVacGroup = (parentKey: string, keyVacStart: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'HV'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: true });

    editor.setCondition(
        expWithArgs('or',
            expWithArgs('responseHasOnlyKeysOtherThan', keyVacStart, [responseGroupKey, singleChoiceKey].join('.'), '2'),
            expWithArgs('not',expWithArgs('eq', expWithArgs('getAttribute', expWithArgs('getAttribute', expWithArgs('getContext'), 'participantFlags'), 'completedVaccSurvey'), "1")),
        )
    );
    editor.setSelectionMethod({ name: 'sequential' });
    return editor.getItem();
}
/**
 * VAC: single choice question about vaccination status
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
// const vac = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
//     const defaultKey = 'Q35'
//     const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
//     const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

//     // QUESTION TEXT
//     editor.setTitleComponent(
//         generateTitleComponent(new Map([
//             ["nl-be", "Bent u reeds gevaccineerd tegen COVID-19 (sinds december 2020)?"],
//             ["fr-be", "Avez-vous reçu un vaccin contre le coronavirus (depuis décembre 2020) ? "],
//             ["de-be", "Sind Sie bereits gegen COVID-19 geimpft (seit Dezember 2020)? "],
//             ["en", "Have you been vaccinated against COVID-19 (since December 2020)?"],
//         ]))
//     );

//     // INFO POPUP
//     editor.setHelpGroupComponent(
//         generateHelpGroupComponent([
//             {
//                 content: new Map([
//                     ["nl-be", "Waarom vragen we dit?"],
//                     ["fr-be", "Pourquoi posons-nous cette question ?"],
//                     ["de-be", "Warum fragen wir das?"],
//                     ["en", "Why are we asking this?"],
//                 ]),
//                 style: [{ key: 'variant', value: 'h5' }],
//             },
//             {
//                 content: new Map([
//                     ["nl-be", "We willen onderzoeken hoeveel bescherming vaccinatie geeft."],
//                     ["fr-be", "Nous aimerions pouvoir déterminer le degré de protection offert par le vaccin."],
//                     ["de-be", "Wir würden gerne untersuchen, wieviel Schutz der Impfstoff verleiht."],
//                     ["en", "We would like to be able to work out how much protection the vaccine gives."],
//                 ]),
//                 style: [{ key: 'variant', value: 'p' }],
//             },
//             {
//                 content: new Map([
//                     ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
//                     ["fr-be", "Comment dois-je répondre à cette question ?"],
//                     ["de-be", "Wie soll ich diese Frage beantworten?"],
//                     ["en", "How should I answer this question?"],
//                 ]),
//                 style: [{ key: 'variant', value: 'h5' }],
//             },
//             {
//                 content: new Map([
//                     ["nl-be", "Antwoord ja indien u een COVID-19 vaccin heeft ontvangen (sinds december 2020). "],
//                     ["fr-be", "Geben Sie 'Ja' an, wenn Sie eine Impfung mit COVID-19-Impfstoff erhielten (seit Dezember 2020)."],
//                     ["de-be", "Répondez oui si vous avez reçu un vaccin contre le coronavirus (depuis décembre 2020)."],
//                     ["en", "Report yes, if you received a COVID-19 vaccine (since December 2020)."],
//                 ]),
//                 // style: [{ key: 'variant', value: 'p' }],
//             },
//         ])
//     );

//     // RESPONSE PART
//     const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
//     const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
//         {
//             key: '1', role: 'option',
//             content: new Map([
//                 ["nl-be", "Ja, ik heb al minstens 1 dosis gekregen."],
//                 ["fr-be", "Oui, j'ai reçu au moins un vaccin contre le coronavirus. "],
//                 ["de-be", "Ja, ich erhielt mindestens einen COVID-19-Impfstoff"],
//                 ["en", "Yes, I received at least one COVID-19 vaccine"],
//             ])
//         },
//         {
//             key: '01', role: 'option',
//             content: new Map([
//                 ["nl-be", "Nee, ik ben uitgenodigd en zal binnenkort een eerste dosis ontvangen."],
//                 ["fr-be", "Non, j'ai reçu une invitation, et je recevrai prochainement un vaccin."],
//                 ["de-be", "Nein, ich habe einen Impftermin und werde bald einen Impfstoff erhalten."],
//                 ["en", "No, I was invited and will receive a vaccine soon."],
//             ])
//         },
//         {
//             key: '02', role: 'option',
//             content: new Map([
//                 ["nl-be", "Nee, ik ben uitgenodigd, maar heb de vaccinatie geweigerd."],
//                 ["fr-be", "Non, j'ai reçu une invitation, mais j'ai refusé le vaccin."],
//                 ["de-be", "Nein, ich wurde eingeladen, lehnte aber den Impfstoff ab."],
//                 ["en", "No, I was invited but declined the vaccine."],
//             ])
//         },
//         {
//             key: '03', role: 'option',
//             content: new Map([
//                 ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin halen."],
//                 ["fr-be", "Non, lorsque je serai invité(e), je prévois de me faire vacciner."],
//                 ["de-be", "Nein, wenn ich eingeladen werde, werde ich mich impfen zu lassen."],
//                 ["en", "When invited, I plan to receive a vaccine."],
//             ])
//         },
//         {
//             key: '04', role: 'option',
//             content: new Map([
//                 ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin weigeren."],
//                 ["fr-be", "Non, lorsque je serai invité(e), je refuserai le vaccin."],
//                 ["de-be", "Nein, wenn ich eingeladen werde, werde ich den Impfstoff und damit die Impfung ablehnen."],
//                 ["en", "When invited, I will decline the vaccine."],
//             ])
//         },
//         {
//             key: '2', role: 'option',
//             content: new Map([
//                 ["nl-be", "Ik wens niet te antwoorden."],
//                 ["fr-be", "Je ne sais pas/je ne me souviens pas."],
//                 ["de-be", "Ich weiß nicht/kann mich nicht erinnern."],
//                 ["en", "I don't know/can't remember."],
//             ])
//         },
//     ]);
//     editor.addExistingResponseComponent(rg_inner, rg?.key);

//     // VALIDATIONs
//     if (isRequired) {
//         editor.addValidation({
//             key: 'r1',
//             type: 'hard',
//             rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
//         });
//     }

//     return editor.getItem();
// }


/**
 * VAC: single choice question about vaccination status for this season
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const vac = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35_new'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u in het huidige winterseizoen (2023-2024) een COVID-19 vaccin laten toedienen?"],
            ["fr-be", "Avez-vous reçu un vaccin contre le coronavirus  lors de la saison correspondant à l’hiver 2023/2024?"],
            ["de-be", "Haben Sie sich in der heutigen Wintersaison (2023/2024) eine COVID-19-Impfstoff verabreichen lassen?"],
            ["en", "Did you receive a COVID-19 vaccine during this autumn/winter season (2023-2024)?"],
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
                    ["fr-be", "Nous aimerions pouvoir déterminer le degré de protection offert par le vaccin."],
                    ["de-be", "Wir würden gerne untersuchen, wieviel Schutz der Impfstoff verleiht."],
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
                    ["nl-be", "Antwoord ja indien u dit seizoen (2023-2024) een COVID-19 vaccin heeft ontvangen."],
                    ["fr-be", "Répondez oui si vous avez reçu un vaccin cette saison (2023-2024).."],
                    ["de-be", "Melden Sie ja, wenn Sie in dieser Saison (2023-2024) einen COVID-19-Impfstoff erhalten haben."],
                    ["en", "Report yes, if you received a COVID-19 vaccine this season (2023-2024)."],
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
                ["nl-be", "Ja, ik heb een COVID-19 vaccin gekregen"],
                ["fr-be", "Oui, j'ai reçu un vaccin contre le coronavirus. "],
                ["de-be", "Ja, ich erhielt einen COVID-19-Impfstoff"],
                ["en", "Yes, I received a COVID-19 vaccine"],
            ])
        },
        {
            key: '05', role: 'option',
            content: new Map([
                ["nl-be", "Nee, maar zal binnenkort één ontvangen"],
                ["fr-be", "Non, je recevrai prochainement un vaccin."],
                ["de-be", "Nein, ich werde bald einen Impfstoff erhalten"],
                ["en", "No, but I plan to receive a vaccine"],
            ])
        },
        {
            key: '06', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik zal geen vaccin halen"],
                ["fr-be", "Non, je prévois de ne me pas faire vacciner."],
                ["de-be", "Nein, ich werde mich nicht impfen zu lassen"],
                ["en", "No, I will not receive a vaccine"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik wens niet te antwoorden."],
                ["fr-be", "Je ne sais pas/je ne me souviens pas."],
                ["de-be", "Ich weiß nicht/kann mich nicht erinnern"],
                ["en", "I don't know/can't remember."],
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
            ["fr-be", "Quel vaccin contre le coronavirus avez-vous reçu ? "],
            ["de-be", "Welchen COVID-19-Impfstoff erhielten Sie? "],
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
                ["fr-be", "Je ne sais pas/je ne me souviens pas."],
                ["de-be", "Ich weiß nicht/kann mich nicht erinnern"],
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
 * VACCINE BRAND ALL: Which vaccine was provided
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
//  const vaccineBrandAll = (parentKey: string, keyvac?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
//     const defaultKey = 'Q35bnew'
//     const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
//     const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

//     // QUESTION TEXT
//     editor.setTitleComponent(
//         generateTitleComponent(new Map([
//             ["nl-be", "Hoeveel dosissen van deze COVID-19 vaccins heeft u reeds ontvangen?  "],
//             ["fr-be", "Combien de doses du vaccin (et quel) avez-vous reçu ?  "],
//             ["de-be", "Welchen (und wie viel Dosen) COVID-19-Impfstoff haben Sie erhalten? "],
//             ["en", "How many doses of these COVID-19 vaccines did you receive? "],
//         ]))
//     );

//     // CONDITION
//     if (keyvac) {
//         editor.setCondition(
//             expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '1')
//         );
//     }

//      // INFO POPUP
//      editor.setHelpGroupComponent(
//         generateHelpGroupComponent([
//             {
//                 content: new Map([
//                     ["nl-be", "Waarom vragen we dit?"],
//                     ["fr-be", "Pourquoi posons-nous cette question ?"],
//                     ["de-be", "Warum fragen wir das?"],
//                     ["en", "Why are we asking this?"],
//                 ]),
//                 style: [{ key: 'variant', value: 'h5' }],
//             },
//             {
//                 content: new Map([
//                     ["nl-be", "We willen onderzoeken hoeveel bescherming een volledige vaccinatie geeft."],
//                     ["fr-be", "Nous aimerions pouvoir déterminer le degré de protection qu'offre un programme de vaccination complet."],
//                     ["de-be", "Wir möchten gerne untersuchen, wieviel Infektionsschutz ein vollständigen Impfplan Ihnen gibt."],
//                     ["en", "We would like to be able to work out how much protection a complete vaccination scheme gives."],
//                 ]),
//                 style: [{ key: 'variant', value: 'p' }],
//             },
//             {
//                 content: new Map([
//                     ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
//                     ["fr-be", "Comment dois-je répondre à cette question ?"],
//                     ["de-be", "Wie soll ich diese Frage beantworten?"],
//                     ["en", "How should I answer this question?"],
//                 ]),
//                 style: [{ key: 'variant', value: 'h5' }],
//             },
//             {
//                 content: new Map([
//                     ["nl-be", "Rapporteer het aantal dosissen die u reeds ontvangen heeft (dit komt overeen met het aantal keer dat u werd gevaccineerd voor COVID-19). "],
//                     ["fr-be", "Indiquez le nombre de doses reçues (qui correspond au nombre de fois où vous avez été vacciné(e) contre le coronavirus). "],
//                     ["de-be", "Geben Sie die Anzahl der Dosen an, die Sie erhielten (die der Anzahl der Termine entspricht, an denen Sie gegen COVID-19 geimpft wurden)."],
//                     ["en", "Report the number of doses you received (which corresponds to the number of time you were vaccinated against COVID-19 )."],
//                 ]),
//                 // style: [{ key: 'variant', value: 'p' }],
//             },
//         ])
//     );

// // RESPONSE PART
// const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
 
// editor.addExistingResponseComponent({
//     role: 'text',
//     style: [{ key: 'className', value: 'mb-2' }],
//     content: generateLocStrings(
//         new Map([
//             ['nl-be', "Gelieve voor ieder vaccin aan te duiden hoeveel dosissen u reeds heeft ontvangen."],
//             ['fr-be', "Pour chaque vaccin, veuillez indiquer combien de doses vous avez reçues."],
//             ['de-be', "Bitte geben Sie für jede Impfstoff an, wie viele Dosen Sie bereits erhalten haben."],
//             ['en', "Please indicate for each vaccine how many doses you have received."],
//         ])),
// }, rg?.key);

// const ddg: ResponseRowCell = {
//     key: 'col2', role: 'dropDownGroup',
//     items: [
//         {
//             key: '0', role: 'option', content: new Map([
//                 ["nl-be", "0 dosissen"],
//                 ["fr-be", "0 doses"],
//                 ["de-be", "0 Dosen"],
//                 ["en", "0 doses"],
//             ])
//         },
//         {
//             key: '1', role: 'option', content: new Map([
//                 ["nl-be", "1 dosis"],
//                 ["fr-be", "1 dose"],
//                 ["de-be", "1 Dosis"],
//                 ["en", "1 dose"],
//             ]),
//         }, {
//             key: '2', role: 'option', content: new Map([
//                 ["nl-be", "2 dosissen"],
//                 ["fr-be", "2 doses"],
//                 ["de-be", "2 Dosen"],
//                 ["en", "2 doses"],
//             ]),
//         }, {
//             key: '3', role: 'option', content: new Map([
//                 ["nl-be", "3 dosissen"],
//                 ["fr-be", "3 doses"],
//                 ["de-be", "3 Dosen"],
//                 ["en", "3 doses"],
//             ]),
//         }, {
//             key: '4', role: 'option', content: new Map([
//                 ["nl-be", "4 dosissen"],
//                 ["fr-be", "4 doses"],
//                 ["de-be", "4 Dosen"],
//                 ["en", "4 doses"],
//             ]),
//         }, {
//             key: '5', role: 'option', content: new Map([
//                 ["nl-be", "5 dosissen of meer"],
//                 ["fr-be", "5 doses ou plus"],
//                 ["de-be", "5 Dosen oder mehr"],
//                 ["en", "5 doses or more"],
//             ]),
//         }, {
//             key: '99', role: 'option', content: new Map([
//                 ["nl-be", "Ik weet het gedeeltelijk niet meer."],
//                 ["fr-be", "Je ne le sais plus très bien."],
//                 ["de-be", "Ich weiß es teilweise nicht mehr ."],
//                 ["en", "I have partly forgotten."],
//             ]),
//         }, {
//             key: '999', role: 'option', content: new Map([
//                 ["nl-be", "Ik weet het helemaal niet meer."],
//                 ["fr-be", "Je ne le sais plus du tout ."],
//                 ["de-be", "Ich weiß es überhaupt nicht mehr."],
//                 ["en", "I have completely forgotten."],
//             ]),
//         },
//     ]
// };

// const rg_inner = initMatrixQuestion(matrixKey, [
//     {
//         key: '1', role: 'responseRow',
//         cells: [
//             {
//                 key: 'l', role: 'label',
//                 content: new Map([
//                     ["nl-be", "AstraZeneca"],
//                     ["fr-be", "AstraZeneca"],
//                     ["de-be", "AstraZeneca"],
//                     ["en", "AstraZeneca"],
//                 ])
//             },
//             { ...ddg }
//         ],
//     },
//     {
//         key: '2', role: 'responseRow',
//         cells: [
//             {
//                 key: 'l', role: 'label',
//                 content: new Map([
//                     ["nl-be", "Pfizer/BioNTech"],
//                     ["fr-be", "Pfizer/BioNTech"],
//                     ["de-be", "Pfizer/BioNTech"],
//                     ["en", "Pfizer/BioNTech"],
//                 ])
//             },
//             { ...ddg }
//         ],
//     },
//     {
//         key: '3', role: 'responseRow',
//         cells: [
//             {
//                 key: 'l', role: 'label',
//                 content: new Map([
//                     ["nl-be", "Moderna"],
//                     ["fr-be", "Moderna"],
//                     ["de-be", "Moderna"],
//                     ["en", "Moderna"],
//                 ])
//             },
//             { ...ddg }
//         ],
//     },
//     {
//         key: '4', role: 'responseRow',
//         cells: [
//             {
//                 key: 'l', role: 'label',
//                 content: new Map([
//                     ["nl-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
//                     ["fr-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
//                     ["de-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
//                     ["en", "Janssen Pharmaceutica (Johnson & Johnson)"],
//                 ])
//             },
//             { ...ddg }
//         ],
//     },
//     {
//         key: '5', role: 'responseRow',
//         cells: [
//             {
//                 key: 'l', role: 'label',
//                 content: new Map([
//                     ["nl-be", "CureVac"],
//                     ["fr-be", "CureVac"],
//                     ["de-be", "CureVac"],
//                     ["en", "CureVac"],
//                 ])
//             },
//             { ...ddg }
//         ],
//     },
//     {
//         key: '7', role: 'responseRow',
//         cells: [
//             {
//                 key: 'l', role: 'label',
//                 content: new Map([
//                     ["nl-be", "Novavax"],
//                     ["fr-be", "Novavax"],
//                     ["de-be", "Novavax"],
//                     ["en", "Novavax"],
//                 ])
//             },
//             { ...ddg }
//         ]
//     },
//     {
//         key: '6', role: 'responseRow',
//         cells: [
//             {
//                 key: 'l', role: 'label',
//                 content: new Map([
//                     ["nl-be", "Andere"],
//                     ["fr-be", "Autre"],
//                     ["de-be", "Andere"],
//                     ["en", "Other"],
//                 ])
//             },
//             { ...ddg }
//         ]
//     }
// ]);

// editor.addExistingResponseComponent(rg_inner, rg?.key);

 

//     // VALIDATIONs
//     if (isRequired) {
//         editor.addValidation({
//             key: 'r1',
//             type: 'hard',
//             rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
//         });
//     }

//     return editor.getItem();
// }

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
            ["fr-be", "Combien de doses du vaccin avez-vous reçu ? "],
            ["de-be", "Wie viele Dosen des Impfstoffs erhielten Sie? "],
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
                    ["fr-be", "Nous aimerions pouvoir déterminer le degré de protection qu'offre un programme de vaccination complet."],
                    ["de-be", "Wir möchten gerne untersuchen, wieviel Infektionsschutz ein vollständigen Impfplan Ihnen gibt."],
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
                    ["fr-be", "Indiquez le nombre de doses reçues (qui correspond au nombre de fois où vous avez été vacciné(e) contre le coronavirus). "],
                    ["de-be", "Geben Sie die Anzahl der Dosen an, die Sie erhielten (die der Anzahl der Termine entspricht, an denen Sie gegen COVID-19 geimpft wurden)."],
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
                ["fr-be", "Un"],
                ["de-be", "Eine"],
                ["en", "One"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Twee"],
                ["fr-be", "Deux"],
                ["de-be", "Zwei"],
                ["en", "Two"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Meer dan twee"],
                ["fr-be", "Plus de deux"],
                ["de-be", "Mehr als zwei"],
                ["en", "More than two"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["nl-be", "Ik weet het niet meer"],
                ["fr-be", "Je ne sais pas/je ne me souviens pas."],
                ["de-be", "Ich weiß nicht/kann mich nicht erinnern"],
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
            ["nl-be", "Wanneer heeft u de eerste dosis van het vaccin ontvangen? Indien u de exacte datum niet kent, gelieve een schatting te geven. "],
            ["fr-be", "Quand avez-vous reçu votre première injection du vaccin contre le coronavirus ? Si vous ne connaissez pas la date exacte, veuillez donner une estimation. "],
            ["de-be", "Wann erhielten Sie Ihre erste Injektion von Impfstoff gegen COVID-19? Wenn Sie das genaue Datum nicht mehr wissen, schätzen Sie es. "],
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
                    ["fr-be", "Le fait de savoir quand les gens sont vaccinés nous permet de savoir si le programme de vaccination est bien exécuté."],
                    ["de-be", "Wenn wir wissen, wann die Menschen geimpft wurden, sagt das uns, wie gut das Impfprogramm durchgeführt wird"],
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
                    ["fr-be", "Essayez de répondre de la manière la plus précise possible. Si vous ne connaissez pas la date précise, veuillez donner votre meilleure estimation du mois et de l'année de vaccination. "],
                    ["de-be", "Bitte versuchen Sie es und beantworten Sie es so genau wie möglich. Wenn Sie das genaue Datum nicht wissen, geben Sie bitte Ihre beste Schätzung des Monats und des Jahres der Impfung an. "],
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
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -86400 * 365) },
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
            ["nl-be", "Wanneer heeft u de tweede dosis van het vaccin ontvangen? Indien u de exacte datum niet meer weet, geef een zo goed mogelijke schatting van maand en jaar van de vaccinatie."],
            ["fr-be", "Quand avez-vous reçu votre deuxième injection du vaccin contre le coronavirus ? Si vous ne connaissez pas la date exacte, veuillez donner une estimation. "],
            ["de-be", "Wann erhielten Sie Ihre zweite Injektion von Impfstoff gegen COVID-19? Wenn Sie das genaue Datum nicht wissen, schätzen Sie es bitte. "],
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
                    ["fr-be", "Le fait de savoir quand les gens sont vaccinés nous permet de savoir si le programme de vaccination est bien exécuté."],
                    ["de-be", "Wenn wir wissen, wann die Menschen geimpft wurden, sagt das uns, wie gut das Impfprogramm durchgeführt wird"],
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
                    ["fr-be", "Essayez de répondre de la manière la plus précise possible. Si vous ne connaissez pas la date précise, veuillez donner votre meilleure estimation du mois et de l'année de vaccination. "],
                    ["de-be", "Bitte versuchen Sie es und antworten Sie es so genau wie möglich. Wenn Sie das genaue Datum nicht wissen, geben Sie bitte Ihre beste Schätzung des Monats und des Jahres der Impfung an. "],
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
                            { dtype: 'exp', exp: expWithArgs('getResponseItem', keyDateFirstVaccine, [responseGroupKey, singleChoiceKey, '1'].join('.')) },
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
 * DATE VACCINE LAST: What is the date of the last vaccination
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
 const dateLastVaccine = (parentKey: string, keyvac?: string, keyvaccineShots?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35i'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wanneer heeft u het laatste vaccin tegen COVID-19 ontvangen?  Indien u de exacte datum niet kent, gelieve een schatting te geven.   "],
            ["fr-be", "Quand avez-vous reçu le dernier vaccin contre le coronavirus ? Si vous ne connaissez pas la date exacte, veuillez fournir une estimation.   "],
            ["de-be", "Wann wurden Sie letztes Mal gegen COVID-19 geimpft? Wenn Sie das genaue Datum nicht kennen, schätzen Sie es bitte! "],
            ["en", "When did you receive your last vaccination against COVID-19? If you do not know the exact date, please give an estimate."],
        ]))
    );

    // CONDITION
    editor.setCondition(
        //expWithArgs('and',
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '1'),
            //expWithArgs('responseHasKeysAny', keyvaccineShots, [responseGroupKey, singleChoiceKey].join('.'), '1', '2', '3')
       //)
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
                    ["fr-be", "Le fait de savoir quand les gens sont vaccinés nous permet de savoir si le programme de vaccination est bien exécuté."],
                    ["de-be", "Wenn wir wissen, wann die Menschen geimpft wurden, sagt das uns, wie gut das Impfprogramm durchgeführt wird"],
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
                    ["fr-be", "Essayez de répondre de la manière la plus précise possible. Si vous ne connaissez pas la date précise, veuillez donner votre meilleure estimation du mois et de l'année de vaccination. "],
                    ["de-be", "Bitte versuchen Sie es und beantworten Sie es so genau wie möglich. Wenn Sie das genaue Datum nicht wissen, geben Sie bitte Ihre beste Schätzung des Monats und des Jahres der Impfung an. "],
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
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -172800 * 365) },
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
 * VACCINE PRO: reasons why pro vaccination
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const vaccinePro = (parentKey: string, keyvac?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35f'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat waren voor u de hoofdredenen om u te laten vaccineren? Selecteer maximaal 3 opties die het meest van toepassing zijn."],
            ["fr-be", "Pour quelle(s) raison(s) souhaitez-vous vous faire vacciner contre le coronavirus ? Sélectionnez jusqu'à 3 options les plus pertinentes."],
            ["de-be", "Welche sind Ihre Gründe zum Erhalt einer Impfung gegen COVID-19? Wählen Sie bis zu 3 Optionen, die am stärksten gelten."],
            ["en", "What are your reason(s) for getting a COVID-19 vaccination? Select up to 3 options that are most applicable."],
        ]))
    );

    // CONDITION
    if (keyvac) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '1', '05')
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
                    ["nl-be", "We kennen graag de redenen waarom mensen zich laten vaccineren. "],
                    ["fr-be", "Nous aimerions connaître les principales raisons pour lesquelles les gens se font vacciner."],
                    ["de-be", "Wir wüssten gerne die Hauptgründe der Menschen für die Impfung."],
                    ["en", "We would like to know the main reasons why people get the vaccine."],
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
                    ["nl-be", "Gelieve de opties aan te duiden die het meest van toepassing zijn voor u. "],
                    ["fr-be", "Veuillez sélectionner toutes les réponses qui entrent en ligne de compte pour prendre votre décision."],
                    ["de-be", "Bitte wählen Sie alle Antworten, die für Ihre Entscheidung wichtig waren."],
                    ["en", "Please select up the 3 options that mattered to take your decision."],
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
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '21', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie is aangeraden door volksgezondheidsinstellingen."],
                ["fr-be", "La vaccination est recommandée par les autorités de santé publique."],
                ["de-be", "Die Impfung wird von Gesundheitsämtern empfohlen."],
                ["en", "The vaccination is recommended by public health authorities."],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik behoor tot een risicogroep voor ernstige COVID-19 (ouder dan 65 jaar, onderliggende gezondheidsrisico's, obesitas, etc.)."],
                ["fr-be", "J'appartiens à un groupe à risque de complications si je contracte le coronavirus (plus de 65 ans, maladie sous-jacente, obésité, etc.)."],
                ["de-be", "Ich gehöre zu einer Risikogruppe für Komplikationen bei COVID-19 (über 65 Jahre alt, allgemeiner Gesundheitszustand, Übergewicht usw.)."],
                ["en", "I belong to a group who is at risk of complications in case of COVID-19 (over 65 of age, underlying health condition, obesity, etc.)."],
            ])
        },
        {
            key: '20', role: 'option',
            content: new Map([
                ["nl-be", "Voor mijn werk heb ik nauw contact met personen die behoren tot de risicogroep voor ernstige COVID-19 (werken in woonzorgcentrum, ziekenhuis, etc.)."],
                ["fr-be", "Je travaille en contact étroit avec des personnes à risque de développer des complications si ces personnes contractent le coronavirus (travail dans une maison de retraite, personnel médical, etc.)."],
                ["de-be", "Ich arbeite in engem Kontakt mit Menschen mit Komplikationsrisiko bei COVID-19 (ich arbeite in einem Pflegeheim, gehöre zum Pflegepersonal usw.)."],
                ["en", "I work in close contact with people at risk of complications in case of COVID-19 (working in a nursing home, health staff…)."],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Door vaccinatie verlaag ik het risico dat ikzelf COVID-19 krijg."],
                ["fr-be", "La vaccination diminue mon risque de contracter le coronavirus."],
                ["de-be", "Impfung senkt mein Risiko, COVID-19 zu bekommen."],
                ["en", "Vaccination decreases my risk of getting COVID-19."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Door vaccinatie verlaag ik het risico dat andere personen COVID-19 krijgen."],
                ["fr-be", "La vaccination diminue le risque de transmettre le coronavirus à d'autres personnes."],
                ["de-be", "Impfung senkt das Risiko der Verbreitung von COVID-19 auf andere Menschen."],
                ["en", "Vaccination decreases the risk of spreading COVID-19 to others."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Mijn (huis)arts heeft de vaccinatie aangeraden."],
                ["fr-be", "Mon médecin me l'a recommandé."],
                ["de-be", "Mein Arzt empfahl es."],
                ["en", "My doctor recommended it."],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie werd aangeraden/aangeboden door mijn werk/school."],
                ["fr-be", "Le vaccin a été recommandé sur mon lieu de travail/dans mon établissement scolaire."],
                ["de-be", "Es wurde an meinem Arbeitsplatz/in meiner Schule empfohlen."],
                ["en", "It was recommended in my workplace/school."],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Het vaccin was gemakkelijk te verkrijgen en het toedienen gaat vlot."],
                ["fr-be", "Le vaccin était facilement disponible et l'administration du vaccin était pratique."],
                ["de-be", "Der Impfstoff war leicht verfügbar und das Verabreichen war einfach."],
                ["en", "The vaccine was readily available and vaccine administration was convenient."],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Het vaccin was gratis."],
                ["fr-be", "Le vaccin était gratuit (aucun coût)."],
                ["de-be", "Der Impfstoff war kostenlos (gratis)."],
                ["en", "The vaccine was free (no cost)."],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik wil geen werk/school missen."],
                ["fr-be", "Je ne veux pas manquer le travail/l'école."],
                ["de-be", "Ich möchte nicht die Arbeit / den Unterricht verpassen."],
                ["en", "I don’t want to miss work/school."],
            ])
        },
        {
            key: 'G8', role: 'option',
            content: new Map([
                ["nl-be", "Ik haal altijd een vaccin wanneer het me wordt aangeboden"],
                ["fr-be", "J'accepte toujours la vaccination lorsqu'elle m'est proposée."],
                ["de-be", "Ich akzeptiere Impfung immer, wenn sie mir angeboten wird."],
                ["en", "I always accept vaccination when it is offered to me."],
            ])
        },
        {
            key: 'GCS3', role: 'option',
            content: new Map([
                ["nl-be", "Om mijn rol te spelen in de maatschappij en versoepelingen mogelijk te maken voor de economie en het algemeen welzijn."],
                ["fr-be", "Pour jouer mon rôle dans la société et permettre l'assouplissement des mesures pour l'économie et le bien-être général de la population."],
                ["de-be", "Meine Verantwortung für die Gesellschaft zu übernehmen und Lockerungen für die Wirtschaft und das Allgemeinwohl zu ermöglichen."],
                ["en", "To play my role in society and enable the measures to be relaxed for the economy and people's general wellbeing."],
            ])
        },
        {
            key: 'GCS4', role: 'option',
            content: new Map([
                ["nl-be", "Om zelf terug meer vrijheid te krijgen."],
                ["fr-be", "Pour récupérer ma liberté."],
                ["de-be", "Wieder mehr persönliche Freiheit zu haben."],
                ["en", "To have more personal freedom again."],
            ])
        },
        {
            key: 'GCS14', role: 'option',
            content: new Map([
                ["nl-be", "Om het medisch personeel te ontlasten."],
                ["fr-be", "Pour soulager les professionnels de la santé."],
                ["de-be", "Den Druck von dem medizinischen Personal zu nehmen."],
                ["en", "To take the pressure off medical staff."],
            ])
        },
        {
            key: 'GCS12', role: 'option',
            content: new Map([
                ["nl-be", "Om zelf een operatie/ingreep te kunnen ondergaan."],
                ["fr-be", "Pour pouvoir subir une opération/intervention médicale."],
                ["de-be", "Um sich einer Operation/einer medizinischen Eingriff zu unterziehen."],
                ["en", "To be able to have an operation/procedure."],
            ])
        },
        {
            key: '22', role: 'option',
            content: new Map([
                ["nl-be", "Ik moet gevaccineerd zijn om mijn job te kunnen uitvoeren."],
                ["fr-be", "Je dois être vacciné(e) pour pouvoir effectuer mon travail."],
                ["de-be", "Ich muss geimpft sein, um meine Arbeit machen zu können."],
                ["en", "I have to be vaccinated in order to work."],
            ])
        },
        {
            key: '23', role: 'option',
            content: new Map([
                ["nl-be", "Om een geldig vaccinatiepaspoort te verkrijgen."],
                ["fr-be", "Dans le but d’obtenir un passeport de vaccination valide."],
                ["de-be", "Um eine gültige Impfbescheinigung zu erhalten."],
                ["en", "To obtain a valid vaccination passport."],
            ])
        },
        {
            key: '9', role: 'input',
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

    const hasLessThanFourSelections = expWithArgs(
        'lt', expWithArgs('countResponseItems', itemKey, [responseGroupKey, multipleChoiceKey].join('.')), 4
    );
    const hasMoreThanThree = expWithArgs(
        'gt', expWithArgs('countResponseItems', itemKey, [responseGroupKey, multipleChoiceKey].join('.')), 3
    );
    editor.addValidation({
        key: 'countRule',
        type: 'hard',
        rule: hasLessThanFourSelections
    });
    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'countRule'))
        }
    );

    return editor.getItem();
}

/**
 * VACCINE CONTRA: reasons why no vaccination
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const vaccineContra = (parentKey: string, keyvac?: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35g'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat zijn voor u de hoofdredenen om u niet te laten vaccineren? Selecteer maximaal 3 opties die het meest van toepassing zijn."],
            ["fr-be", "Pour quelle(s) raison(s) êtes-vous contre la vaccination contre le coronavirus ? Sélectionnez jusqu'à 3 options les plus pertinentes."],
            ["de-be", "Aus welchen Gründen sind Sie gegen COVID-19-Impfung? Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
            ["en", "For what reason(s) are you against COVID-19 vaccination? Select up to 3 options that are most applicable."],
        ]))
    );

    // CONDITION
    if (keyvac) {
        editor.setCondition(
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '06')
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
                    ["nl-be", "We kennen graan de hoofdredenen waarom mensen geen vaccinatie willen. "],
                    ["fr-be", "Nous aimerions connaître les principales raisons pour lesquelles les gens refusent la vaccination contre le coronavirus."],
                    ["de-be", "Wir würden gerne die Hauptgründe dafür wissen, warum Menschen die Impfung gegen COVID-19 ablehnen."],
                    ["en", "We would like to know the main reasons why people are declining COVID-19 vaccination."],
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
                    ["nl-be", "Gelieve de opties aan te duiden die het meest van toepassing zijn voor u. "],
                    ["fr-be", "Veuillez sélectionner toutes les réponses qui entrent en ligne de compte pour prendre votre décision."],
                    ["de-be", "Bitte wählen Sie alle Antworten, die bei Ihrer Entscheidung wichtig waren."],
                    ["en", "Please select up the 3 options that mattered to take your decision."],
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
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: 'GCS1', role: 'option',
            content: new Map([
                ["nl-be", "Ik denk dat de veiligheid niet voldoende gegarandeerd is voor COVID-19 vaccins."],
                ["fr-be", "Je pense que la sécurité des vaccins COVID-19 n'est pas sufissamment garantie."],
                ["de-be", "Ich denke, dass die Sicherheit der COVID-19-Impfstoffe nicht vollständig gewährleistet ist."],
                ["en", "I don’t think the safety of COVID-19 vaccines can be guaranteed sufficiently."],
            ])
        },
        {
            key: 'GCS4', role: 'option',
            content: new Map([
                ["nl-be", "Ik denk dat COVID-19 niet ernstig genoeg is."],
                ["fr-be", "Je pense que le COVID-19 n'est pas suffisamment grave."],
                ["de-be", "Ich denke, dass eine COVID-19-Erkrankung nicht schwer genug ist."],
                ["en", "I don't think COVID-19 infection is serious enough."],
            ])
        },
        {
            key: 'GCS13', role: 'option',
            content: new Map([
                ["nl-be", "Dat hangt af van welk COVID-19 vaccin ik precies krijg aangeboden."],
                ["fr-be", "Cela dépend du vaccin COVID-19 qu'on me présentera."],
                ["de-be", "Das hängt davon ab, welchen COVID-19-Impfstoff ich tatsächlich angeboten bekomme."],
                ["en", "It depends exactly which COVID-19 vaccine I am offered."],
            ])
        },
        {
            key: 'GCS5', role: 'option',
            content: new Map([
                ["nl-be", "Ik denk dat ik allergisch ben voor een COVID-19 vaccin."],
                ["fr-be", "Je pense que je suis allergique à un vaccin COVID-19."],
                ["de-be", "Ich denke, dass ich gegen eine COVID-19-Impfung allergisch bin."],
                ["en", "I think I'm allergic to a COVID-19 vaccine."],
            ])
        },
        {
            key: 'GCS6', role: 'option',
            content: new Map([
                ["nl-be", "Ik wacht liever af totdat er voldoende andere mensen gevaccineerd zijn om mezelf te laten vaccineren."],
                ["fr-be", "Je préfère attendre que suffisamment de personnes autour de moi ont été vaccinées avant de me faire vacciner."],
                ["de-be", "Ich würde gerne warten, bis genügend andere Menschen geimpft werden, bevor ich den Impfstoff selbst erhalte."],
                ["en", "I'd like to wait until enough other people have been vaccinated before I get the vaccine myself."],
            ])
        },
        {
            key: 'GCS7', role: 'option',
            content: new Map([
                ["nl-be", "Ik wacht liever af totdat er voldoende andere mensen gevaccineerd zijn zodat ik mezelf niet meer hoef te laten vaccineren."],
                ["fr-be", "Je préfère attendre que suffisamment de personnes autour de moi ont été vaccinées de sorte qu'il n'est plus nécessaire de me faire vacciner."],
                ["de-be", "Ich warte lieber ab, bis genügend andere Menschen geimpft wurden, sodass ich mich selbst nicht mehr impfen lassen muss."],
                ["en", "I'd like to wait until enough other people have been vaccinated so that I don't have to be vaccinated myself."],
            ])
        },
        {
            key: 'GCS8', role: 'option',
            content: new Map([
                ["nl-be", "Ik denk niet dat ik een COVID-19 vaccin nodig heb, omdat ik al COVID-19 heb gehad."],
                ["fr-be", "Je pense que je n'ai pas besoin du vaccin COVID-19 parce que j'ai déjà été contaminé(e)."],
                ["de-be", "Ich denke, dass ich keine COVID-19-Impfung benötige, weil ich selbst COVID-19 gehabt habe."],
                ["en", "I don't think I need a COVID-19 vaccine because I've already had a COVID-19 infection."],
            ])
        },
        {
            key: 'GCS9', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben tegen elke vorm van vaccinatie."],
                ["fr-be", "Je suis contre toute forme de vaccination."],
                ["de-be", "Ich bin gegen Impfungen aller Art."],
                ["en", "I'm against all forms of vaccination."],
            ])
        },
        {
            key: 'GCS10', role: 'option',
            content: new Map([
                ["nl-be", "Ik vind dat het vaccin te snel ontwikkeld is om goed te zijn."],
                ["fr-be", "Je trouve que le vaccin a été développé trop vite pour être efficace."],
                ["de-be", "Ich glaube nicht, dass der Impfstoff gut ist, weil er zu schnell entwickelt wurde."],
                ["en", "I don't think the vaccine is good because it has been developed too quickly."],
            ])
        },
        {
            key: 'GCS12', role: 'option',
            content: new Map([
                ["nl-be", "Ik vind geen betrouwbare informatie over vaccins."],
                ["fr-be", "Je ne trouve pas d'information fiable sur les vaccins."],
                ["de-be", "Ich finde keine zuverlässigen Informationen über Impfstoffe."],
                ["en", "I can't find any reliable information about vaccines."],
            ])
        },
        {
            key: 'GCS14', role: 'option',
            content: new Map([
                ["nl-be", "Ik denk dat ik een verwaarloosbaar risico loop om besmet te worden met het coronavirus."],
                ["fr-be", "Je pense que je cours peu de risque d'être contaminé(e)."],
                ["de-be", "Ich denke, ich habe ein sehr geringes Risiko, eine Infektion mit COVID-19 zu bekommen."],
                ["en", "I think I'm at very low risk of catching COVID-19 infection."],
            ])
        },
        {
            key: 'GCS11', role: 'input',
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

    const hasLessThanFourSelections = expWithArgs(
        'lt', expWithArgs('countResponseItems', itemKey, [responseGroupKey, multipleChoiceKey].join('.')), 4
    );
    const hasMoreThanThree = expWithArgs(
        'gt', expWithArgs('countResponseItems', itemKey, [responseGroupKey, multipleChoiceKey].join('.')), 3
    );
    editor.addValidation({
        key: 'countRule',
        type: 'hard',
        rule: hasLessThanFourSelections
    });
    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'countRule'))
        }
    );

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
            ["fr-be", "Avez-vous ressenti des effets secondaires de cette vaccination ? Si oui, sélectionnez jusqu'à 3 options les plus pertinentes."],
            ["de-be", "Gab es Nebenwirkungen bei dieser Impfung? Wenn ja, wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
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
                    ["fr-be", "Nous souhaitons connaître les effets secondaires éventuels de la vaccination contre le coronavirus."],
                    ["de-be", "Wir möchten die Nebenwirkungen untersuchen, die Menschen bei der COVID-19-Impfung erfahren."],
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
                    ["fr-be", "Veuillez sélectionner tous les effets secondaires que vous avez ressentis après avoir reçu un vaccin contre le coronavirus."],
                    ["de-be", "Bitte wählen Sie alle Nebenwirkungen, die Sie nach der COVID-19-Impfung erfuhren."],
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
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Geen"],
                ["fr-be", "Aucun effet secondaire"],
                ["de-be", "Keine"],
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

    const hasLessThanFourSelections = expWithArgs(
        'lt', expWithArgs('countResponseItems', itemKey, [responseGroupKey, multipleChoiceKey].join('.')), 4
    );
    const hasMoreThanThree = expWithArgs(
        'gt', expWithArgs('countResponseItems', itemKey, [responseGroupKey, multipleChoiceKey].join('.')), 3
    );
    editor.addValidation({
        key: 'countRule',
        type: 'hard',
        rule: hasLessThanFourSelections
    });
    editor.addDisplayComponent(
        {
            role: 'error',
            content: generateLocStrings(new Map([
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
                ["en", "Select up to 3 options that are most applicable"],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'countRule'))
        }
    );

    return editor.getItem();
}

/**
 * COVID VACCINE LAST SEASON: Question about last season's covid vaccination status
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param isRequired if true adds a default "hard" validation to the question to check if it has a response.
 * @param keyOverride use this to override the default key for this item (only last part of the key, parent's key is not influenced).
 */
const covid_vac_last_season = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35j'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Heeft u in het vorige winterseizoen (2022-2023) een COVID-19 vaccin laten toedienen?"],
            ["fr-be", "Lors de la précédente saison de l’hiver (2022/2023), vous êtes-vous fait vacciner contre le corona ?"],
            ["de-be", "Haben Sie sich in der vorigen Wintersaison (2022/2023) eine COVID-19-Impfung verabreichen lassen?"],
            ["en", "Did you receive a COVID-19 vaccine during the previous fall/winter season (2022-2023)?"],
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
                    ["fr-be", "Nous aimerions pouvoir déterminer le degré de protection offert par le vaccin."],
                    ["de-be", "Wir würden gerne untersuchen, wieviel Schutz der Impfstoff verleiht."],
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
                    ["nl-be", "Antwoord ja indien u vorig seizoen (2022-2023) een COVID-19 vaccin heeft ontvangen."],
                    ["fr-be", "Répondez oui si vous avez reçu un vaccin COVID-19 la saison dernière (2022-2023)."],
                    ["de-be", "Melden Sie ja, wenn Sie in der letzten Saison (2022-2023) einen COVID-19-Impfstoff erhalten haben"],
                    ["en", "Report yes, if you received a COVID-19 vaccine last season (2022-2023)."],
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
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
            ])
        },
        {
            key: '1', role: 'option',
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
                ["nl-be", "Dat weet ik niet (meer)"],
                ["fr-be", "Je ne sais pas/je ne me souviens pas."],
                ["de-be", "Ich weiß nicht/kann mich nicht erinnern."],
                ["en", "I don't know/can't remember."],
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
            ["nl-be", "Heeft u in het huidige griepseizoen (2023/2024) een griepvaccin laten toedienen?"],
            ["fr-be", "Lors de la saison de la grippe de l’hiver 2023/2024, vous êtes-vous fait vacciner contre la grippe ?"],
            ["de-be", "Haben Sie in der (jetzigen) Grippesaison (2023/2024) einen Grippeimpfstoff bekommen?"],
            ["en", "Did you receive a flu vaccine during this autumn/winter flu season (2023-2024)?"],
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
                    ["nl-be", "We willen de beschermende werking van het vaccin onderzoeken."],
                    ["fr-be", "Nous voulons étudier l'effet protecteur du vaccin."],
                    ["de-be", "Wir möchten die Schutzwirkung des Impfstoffes (Vakzins) untersuchen."],
                    ["en", "We want to study the protective effect of the vaccine."],
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
                    ["nl-be", "Rapporteer 'ja', als u het vaccin dit seizoen heeft gekregen, meestal in de herfst. Als u zich na het invullen van deze vragenlijst laat vaccineren, rapporteer 'nee' en kies in een volgende vraag voor de optie 'Ik ben van plan om mezelf nog te laten vaccineren'."],
                    ["fr-be", "Indiquez « oui » si vous vous êtes fait vacciner cette saison, généralement au cours de l'automne. Si vous vous faites vacciner après avoir complété ce questionnaire, indiquez « non » et choisissez l'option « Je suis d’avis de me faire vacciner » au niveau d'une question ultérieure."],
                    ["de-be", "Schreiben Sie 'ja', wenn Sie den Impfstoff in dieser Impfsaison erhalten haben, meistens im Herbst. Wenn Sie sich nach dem Ausfüllen dieser Fragen impfen lassen, schreiben Sie bitte 'nein' und wählen Sie in einer folgenden Frage die Alternative 'Ich plane, mich noch impfen zu lassen'."],
                    ["en", "Mark 'yes' if you have been vaccinated this season; generally this takes place in autumn. If you will be vaccinated after completing this questionnaire, mark 'no' and choose the option 'I am planning to be vaccinated, but haven’t been yet'."],
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
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
                ["en", "Yes"],
            ])
        },
        {
            key: '1', role: 'option',
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
                ["nl-be", "Dat weet ik niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Das weiß ich nicht (mehr)"],
                ["en", "I don't know (anymore)"],
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
            ["en", "When were you vaccinated against flu this season (2023-2024)?"],
            ["nl-be", "Wanneer bent u in het huidige griepseizoen (2023/2024) gevaccineerd tegen de griep?"],
            ["fr-be", "Quand vous êtes-vous fait vacciner contre la grippe lors de la saison de la grippe correspondant à l’hiver 2023/2024 ?"],
            ["de-be", "Wann wurden Sie in der (jetzigen) Grippesaison (2023/2024) gegen Grippe geimpft?"],
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
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Knowing when people are vaccinated tells us how well the vaccination programme is being carried out."],*/
                    ["en", "Knowing when people get vaccinated tells us how the vaccination program is being followed, as well as the effectiveness of the vaccine."],
                    ["nl-be", "Weten wanneer mensen worden gevaccineerd, vertelt ons hoe goed het vaccinatieprogramma wordt gevolgd en hoe effectief het vaccin is."],
                    ["fr-be", "Le fait de savoir quand les gens se font vacciner nous indique la mesure dans laquelle le programme de vaccination est suivi, ainsi que le degré d'efficacité du vaccin."],
                    ["de-be", "Wissen, wann Menschen geimpft werden, sagt uns, wie gut das Impfprogramm befolgt wird und wie wirksam der Impfstoff ist."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Please, try and answer as accurately as possible. If you don't know the precise date, please give your best estimate. For instance, you might remember the month, then try and remember if it was at the beginning or the end of the month. Were there any significant events (e.g. a holiday or a birthday) that might help jog your memory?"],*/
                    ["en", "Try to answer as precisely as possible. If you do not know the exact date, provide as close an estimate as possible. For example, if you remember the month, try to recall if it was in the beginning or end of the month. Did any important events take place (such as holidays or birthdays) that may help you to refresh your memory?"],
                    ["nl-be", "Probeer zo nauwkeurig mogelijk te antwoorden. Als u de precieze datum niet weet, geef dan uw beste schatting. U kunt zich bijvoorbeeld de maand herinneren en vervolgens proberen te herinneren of het aan het begin of het einde van de maand was. Waren er belangrijke gebeurtenissen (bijv. een vakantie of een verjaardag) die u zouden kunnen helpen om uw geheugen op te frissen?"],
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
                ["nl-be", "Kies datum"],
                ["fr-be", "Sélectionner une date"],
                ["de-be", "Wählen Sie das Datum"],
            ]),
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don't know (anymore)"],
                ["nl-be", "Dat weet ik niet (meer)"],
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

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Wat waren voor u de belangrijkste redenen om dit griepseizoen (2023/2024) een griepvaccin te halen?"],
            ["fr-be", "Quelles étaient les principales raisons qui vous ont poussé à vous faire vacciner contre la grippe au cours de cette saison (hiver 2023/2024) ?"],
            ["de-be", "Was waren für Sie die wichtigsten Gründe, um in dieser Grippesaison 2023/2024) einen Grippeimpfstoff zu verwenden?"],
            ["en", "What were your reasons for getting a seasonal influenza vaccination this year (2023/2024)?"],
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
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen graag weten waarom mensen zich laten vaccineren."],
                    ["fr-be", "Nous aimerions connaître les raisons pour lesquelles la population se fait vacciner."],
                    ["de-be", "Wir möchten gerne wissen, warum Menschen sich impfen lassen."],
                    ["en", "We would like to know the reasons for which people get vaccinated."],
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
                    ["nl-be", "Vink alle redenen aan die belangrijk waren bij uw beslissing."],
                    ["fr-be", "Veuillez cocher toutes les raisons qui ont été importantes dans le cadre de votre décision."],
                    ["de-be", "Kreuzen Sie alle Gründe an, die bei Ihrer Entscheidung wichtig waren."],
                    ["en", "Mark all of the reasons that were important for your decision."],
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
                ['de-be', 'Mehrere Antworten sind möglich'],
                ['en', 'Select all options that apply'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik behoor tot een risicogroep (zwanger, 60 jaar of ouder, chronische ziekte)"],
                ["fr-be", "Je fais partie d’un groupe à risque (grossesse, personne âgée de 60 ans ou plus, maladie chronique)"],
                ["de-be", "Ich gehöre zu einer Risikogruppe (schwanger, 60 Jahre oder älter, chronisch krank)"],
                ["en", "I belong to a risk group (e.g. pregnant, over 65, underlying health condition, etc)"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Andere personen in mijn huishouden behoren tot een risicogroep"],
                ["fr-be", "Les autres personnes de mon ménage font partie d’un groupe à risque"],
                ["de-be", "Andere Personen in meinem Haushalt gehören zu einer Risikogruppe"],
                ["en", "Other people in my household belong to a risk group"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "De COVID-19 pandemie moedigde me aan om mezelf te laten vaccineren dit jaar"],
                ["fr-be", "La pandémie relative au coronavirus m'a encouragé à me faire vacciner cette année"],
                ["de-be", "Die COVID-19-Pandemie ermutigte mich, mich selbst dieses Jahr impfen zu lassen"],
                ["en", "The coronavirus pandemic motivated me to get vaccinated this year"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie voorkomt dat ikzelf griep krijg"],
                ["fr-be", "La vaccination m'évite de contracter personnellement la grippe"],
                ["de-be", "Impfung verhindert, dass ich selbst Grippe bekomme"],
                ["en", "Vaccination decreases my risk of getting influenza"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Vaccinatie voorkomt dat ik het griepvirus verspreid naar andere mensen"],
                ["fr-be", "La vaccination m'évite de transmettre le virus de la grippe à d'autres personnes"],
                ["de-be", "Impfung verhindert, dass ich das Grippevirus auf andere Menschen übertrage"],
                ["en", "Vaccination decreases the risk of spreading influenza to others"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Mijn huisarts heeft me de griepvaccin aangeraden"],
                ["fr-be", "Mon médecin m'a recommandé le vaccin contre la grippe"],
                ["de-be", "Mein Hausarzt hat mir die Grippeimpfung empfohlen"],
                ["en", "My doctor recommended it"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin werd aangeboden op mijn werk/op school"],
                ["fr-be", "Le vaccin contre la grippe a été proposé au travail/à l'école"],
                ["de-be", "Der Grippeimpfstoff wurde an meinem Arbeitsplatz/in der Schule angeboten"],
                ["en", "It was recommended in my workplace/school"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin is voor mij gemakkelijk beschikbaar"],
                ["fr-be", "Le vaccin contre la grippe est facilement accessible pour moi"],
                ["de-be", "Der Grippeimpfstoff ist für mich einfach verfügbar"],
                ["en", "The vaccine was readily available and vaccine administration was convenient"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin was gratis"],
                ["fr-be", "Le vaccin contre la grippe était gratuit"],
                ["de-be", "Der Grippeimpfstoff war gratis"],
                ["en", "The vaccine was free (no cost)"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik wil deze winter geen werk/school missen"],
                ["fr-be", "Je ne veux pas m’absenter du travail / des cours durant cet hiver"],
                ["de-be", "Ich möchte in diesem Winter keine Arbeitstunde/keinen Schulunterricht verpassen"],
                ["en", "I don’t want to miss work/school"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Ik haal het griepvaccin altijd"],
                ["fr-be", "Je me fais toujours vacciner contre la grippe"],
                ["de-be", "Ich nehme den Grippeimpfstoff immer"],
                ["en", "I always get the vaccine"],
            ])
        },
        {
            key: '9', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere reden"],
                ["fr-be", "Une autre raison"],
                ["de-be", "Andere Gründe"],
                ["en", "Other reason(s)"],
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
            ["nl-be", "Wat waren de redenen waarom u zich niet liet vaccineren dit griepseizoen(2023/2024)?"],
            ["fr-be", "Pour quelle(s) raison(s) ne vous êtes-vous pas fait vacciner au cours de cette saison (hiver 2023/2024) ?"],
            ["de-be", "Was waren die Gründe dafür, dass Sie sich in dieser Grippesaison (2023/2024) nicht mehr impfen ließen?"],
            ["en", "What were your reasons for not getting a seasonal influenza vaccination this year (2023/2024)?"],
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
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                    ["en", "Why are we asking this?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl-be", "We willen graag weten waarom sommige mensen niet worden gevaccineerd."],
                    ["fr-be", "Nous aimerions connaître les raisons pour lesquelles la population ne se fait pas vacciner."],
                    ["de-be", "Wir möchten gerne wissen, warum manche Menschen nicht geimpft werden."],
                    ["en", "We would like to know the reasons for which people do not get vaccinated."],
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
                    ["nl-be", "Vink alle redenen aan die belangrijk waren bij uw beslissing."],
                    ["fr-be", "Veuillez cocher toutes les raisons qui ont été importantes dans le cadre de votre décision."],
                    ["de-be", "Kreuzen Sie alle Gründe an, die bei Ihrer Entscheidung wichtig waren."],
                    ["en", "Mark all of the reasons that were important for your decision."],
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
                ['de-be', 'Mehrere Antworten sind möglich'],
                ['en', 'Select all options that apply'],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben van plan om mezelf nog te laten vaccineren"],
                ["fr-be", "J'ai l'intention de me faire vacciner"],
                ["de-be", "Ich plane, mich selbst noch impfen zu lassen"],
                ["en", "I am planning to be vaccinated, but haven’t been yet"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["nl-be", "Het griepvaccin werd me niet aangeboden"],
                ["fr-be", "Le vaccin contre la grippe ne m'a pas été proposé"],
                ["de-be", "Der Grippeimpfstoff wurde mir nicht angeboten"],
                ["en", "I haven’t been offered the vaccine"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik behoorde niet tot een risicogroep"],
                ["fr-be", "Je ne faisais pas partie d’un groupe à risque"],
                ["de-be", "Ich gehörte nicht zu einer Risikogruppe"],
                ["en", "I don't belong to a risk group"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["nl-be", "Het is beter om je eigen immuniteit op te bouwen tegen griep"],
                ["fr-be", "Il est préférable de se constituer une immunité contre la grippe"],
                ["de-be", "Es ist besser, seine eigene Immunität gegen Grippe aufzubauen"],
                ["en", "It is better to build your own natural immunity against influenza"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["nl-be", "Ik twijfelde aan de effectiviteit van het griepvaccin"],
                ["fr-be", "Je doutais de l'efficacité du vaccin contre la grippe"],
                ["de-be", "Ich zweifelte an der Wirksamkeit des Grippeimpfstoffs"],
                ["en", "I doubt that the influenza vaccine is effective"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["nl-be", "Griep is slechts een milde ziekte"],
                ["fr-be", "La grippe n'est qu'une maladie bénigne"],
                ["de-be", "Grippe ist nur eine milde Krankheit"],
                ["en", "Influenza is a minor illness"],
            ])
        },
        {
            key: '21', role: 'option',
            content: new Map([
                ["nl-be", "Door de COVID-19 pandemie vermijd ik naar de dokter of apotheek te gaan"],
                ["fr-be", "En raison de la pandémie liée au coronavirus, j'évite de me rendre chez le médecin ou à la pharmacie"],
                ["de-be", "Durch die COVID-19-Pandemie vermeide ich, zum Arzt oder zur Apotheke zu gehen"],
                ["en", "Due to the coronavirus pandemic, I avoid going to the doctor or pharmacy"],
            ])
        },
        {
            key: '22', role: 'option',
            content: new Map([
                ["nl-be", "Ik ben bang dat het griepvaccin mijn risico op COVID-19 verhoogt"],
                ["fr-be", "J'ai peur que le vaccin contre la grippe n'augmente mon risque d’attraper le coronavirus"],
                ["de-be", "Ich habe Angst davor, dass der Grippeimpfstoff mein Risiko auf COVID-19 erhöht"],
                ["en", "I am concerned that the influenza vaccine will increase my risk of catching the coronavirus"],
            ])
        },
        {
            key: '23', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Een andere reden gerelateerd aan COVID-19"],
                ["fr-be", "Une autre raison liée au coronavirus"],
                ["de-be", "Ein anderer Grund hängt mit COVID-19 zusammen"],
                ["en", "Another reason linked to the coronavirus"],
            ]),
            description: new Map([
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
                ["en", "Describe here (optional)"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["nl-be", "Ik achtte de kans klein dat ik griep krijg"],
                ["fr-be", "Selon moi, il était peu probable que je contracte la grippe"],
                ["de-be", "Ich halte die Möglichkeit für klein, dass ich die Grippe bekomme"],
                ["en", "I don’t think that I am likely to get influenza"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["nl-be", "Ik was van mening dat het vaccin ook griep kan veroorzaken"],
                ["fr-be", "J’estimais que le vaccin pouvait aussi causer la grippe"],
                ["de-be", "Ich war der Meinung, dass der Impfstoff auch Grippe verursachen kann"],
                ["en", "I believe that influenza vaccine can cause influenza"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["nl-be", "Ik was bang dat het vaccin niet veilig is, en me juist ziek maakt of andere neveneffecten heeft"],
                ["fr-be", "J'avais peur que le vaccin ne soit pas sûr, qu'il me rende malade ou qu'il entraîne d'autres effets secondaires"],
                ["de-be", "Ich hatte Angst davor, dass der Impfstoff nicht sicher sei und mich erst recht krank machen könnte oder andere Nebenwirkungen hätte."],
                ["en", "I am worried that the vaccine is not safe or will cause illness or other side effects"],
            ])
        },
        {
            key: '9', role: 'option',
            content: new Map([
                ["nl-be", "Ik hou niet van het krijgen van vaccinaties"],
                ["fr-be", "Je n'aime pas me faire vacciner"],
                ["de-be", "Ich halte nichts von Impfungen"],
                ["en", "I don’t like having vaccinations"],
            ])
        },
        {
            key: '26', role: 'option',
            content: new Map([
                ["nl-be", "Het is niet gemakkelijk om gevaccineerd te worden"],
                ["fr-be", "Il n’est pas facile de se faire vacciner"],
                ["de-be", "Es ist nicht einfach, geimpft zu werden"],
                ["en", "The vaccine is not readily available to me"],
            ])
        },
        {
            key: '25', role: 'option',
            content: new Map([
                ["nl-be", "Het vaccin was niet beschikbaar voor mij"],
                ["fr-be", "Le vaccin n'était pas disponible pour moi"],
                ["de-be", "Der Impfstoff war für mich nicht verfügbar"],
                ["en", "The vaccine was unavailable for me"],
            ])
        },
        {
            key: '11', role: 'option',
            content: new Map([
                ["nl-be", "Ik moest betalen voor een griepvaccinatie, het is niet gratis"],
                ["fr-be", "J'ai dû payer pour obtenir un vaccin contre la grippe, ce dernier n'est pas gratuit"],
                ["de-be", "Ich musste für eine Grippeimpfung bezahlen, sie ist nicht gratis"],
                ["en", "The vaccine is not free of charge "],
            ])
        },
        {
            key: '24', role: 'option',
            content: new Map([
                ["nl-be", "Het verkrijgen van een griepvaccin vergt te veel tijd en moeite ten opzichte van de mogelijke voordelen ervan"],
                ["fr-be", "L'obtention d'un vaccin contre la grippe exige trop de temps et d'efforts par rapport à ses avantages potentiels"],
                ["de-be", "Die Grippeimpfung erfordert viel Zeit und Mühe in Bezug auf ihre möglichen Vorteile"],
                ["en", "Getting vaccinated is too much of an effort when compared to the possible advantages"],
            ])
        },
        {
            key: '12', role: 'option',
            content: new Map([
                ["nl-be", "Geen speciale reden"],
                ["fr-be", "Aucune raison particulière"],
                ["de-be", "Kein besonderer Grund"],
                ["en", "No particular reason"],
            ])
        },
        {
            key: '13', role: 'option',
            content: new Map([
                ["nl-be", "Ondanks dat mijn huisarts het griepvaccin adviseerde, heb ik het niet genomen"],
                ["fr-be", "Bien que mon médecin m'ait recommandé le vaccin contre la grippe, je ne me suis pas fait vacciner"],
                ["de-be", "Obwohl mein Hausarzt den Grippeimpfstoff empfahl, habe ich ihn nicht genommen"],
                ["en", "Although my doctor recommended a vaccine, I did not get one"],
            ])
        },
        {
            key: '14', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["nl-be", "Andere reden"],
                ["fr-be", "Une autre raison"],
                ["de-be", "Anderer Grund"],
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
            /*["en", "Did you receive a flu vaccine during the last autumn/winter season? (2022-2023)"],*/
            ["en", "Did you receive a flu vaccine during the previous flu season (2022-2023)?"],
            ["nl-be", "Heeft u in het vorige griepseizoen (2022/2023) een griepvaccin laten toedienen?"],
            ["fr-be", "Lors de la précédente saison de la grippe (hiver 2022/2023), vous êtes-vous fait vacciner contre la grippe ?"],
            ["de-be", "Haben Sie sich in der letzten Grippesaison (2022/2023) eine Grippeimpfung bekommen?"],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },

            {
                content: new Map([
                    /*["en", "We would like to be able to work out how much protection the vaccine gives. We would also like to find out if there is some protection from vaccines received in previous years."],*/
                    ["en", "We would like to study what level of protection the vaccine provides. We would also like to know if there is any protection from vaccines received in previous years."],
                    ["nl-be", "We willen graag onderzoeken hoeveel bescherming het vaccin geeft. We willen ook graag weten of er enige bescherming is dankzij vaccins die in voorgaande jaren zijn ontvangen."],
                    ["fr-be", "Nous aimerions étudier le degré de protection offert par le vaccin. Nous aimerions également savoir s'il existe un certain degré de protection grâce aux vaccins reçus au cours des années précédentes."],
                    ["de-be", "Wir möchten gerne untersuchen, wieviel Schutz der Impfstoff verleiht. Wir möchten auch gerne wissen, ob es dank der Impfstoffe einen Schutz gibt, der früheren Jahren erhalten wurden."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    /*["en", "Report yes, if you received the vaccine this season, usually in the autumn."],*/
                    ["en", "Answer 'yes' if you were vaccinated in autumn/winter 2022-2023."],
                    ["nl-be", "Antwoord 'ja' als u het vaccin vorig jaar (herfst / winter van 2022-2023) heeft gekregen."],
                    ["fr-be", "Veuillez répondre « oui » si vous avez reçu le vaccin au cours de l'année dernière (durant l'automne/hiver 2022-2023)."],
                    ["de-be", "Antworten Sie bitte mit 'ja', wenn Sie den Impfstoff im letzten Jahre erhalten haben (im Herbst/Winter von 2022-2023)"],
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
                ["nl-be", "Ja"],
                ["fr-be", "Oui"],
                ["de-be", "Ja"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["nl-be", "Nee"],
                ["fr-be", "Non"],
                ["de-be", "Nein"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know (anymore)"],
                ["nl-be", "Dat weet ik niet (meer)"],
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