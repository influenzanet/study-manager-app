import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { initMultipleChoiceGroup, initSingleChoiceGroup } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../common_question_pool/key-definitions";

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

    const Q_vaccineBrand = vaccineBrand(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineBrand, hasVaccineGroupKey);

    const Q_vaccineShots = vaccineShots(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineShots, hasVaccineGroupKey);

    const Q_dateFirstVaccine = dateFirstVaccine(hasVaccineGroupKey, Q_vac.key, Q_vaccineShots.key, true);
    survey.addExistingSurveyItem(Q_dateFirstVaccine, hasVaccineGroupKey);

    const Q_dateSecondVaccine = dateSecondVaccine(hasVaccineGroupKey, Q_vac.key, Q_vaccineShots.key, Q_dateFirstVaccine.key, true);
    survey.addExistingSurveyItem(Q_dateSecondVaccine, hasVaccineGroupKey);

    const Q_vaccinePro = vaccinePro(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccinePro, hasVaccineGroupKey);

    const Q_vaccineContra = vaccineContra(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineContra, hasVaccineGroupKey);

    const Q_sideEffects = sideEffects(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_sideEffects, hasVaccineGroupKey);

    return survey.getSurvey();
}

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
            ["nl-be", "Vier weken geleden vulde u een vragenlijst in over uw COVID-19 vaccinatie. Met deze nieuwe vragenlijst willen we veranderingen hierin verder opvolgen. Duid de optie aan die voor u van toepassing is.   "],
            ["fr-be", "Il y a quatre semaines, vous avez reçu un questionnaire relatif à la vaccination contre le coronavirus. Ce nouveau questionnaire a pour but de contrôler tout changement ultérieur de votre statut vaccinal. Sélectionnez l'option qui vous concerne."],
            ["de-be", "Vor vier Wochen erhielten Sie einen Fragebogen zur COVID-19-Impfung.  Dieser neue Fragebogen dient zur Überwachung eventueller weiterer Änderungen an Ihrem Impfstatus. Bitte wählen Sie die Option, die auf Sie zutrifft."],
            ["en", "Four weeks ago you received a questionnaire about COVID-19 vaccination.  This new questionnaire is to monitor any further changes to your vaccination status. Select the option that applies to you."],
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
const vac = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const defaultKey = 'Q35'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["nl-be", "Bent u reeds gevaccineerd voor COVID-19?"],
            ["fr-be", "Avez-vous reçu un vaccin contre le coronavirus ? "],
            ["de-be", "Erhielten Sie einen COVID-19-Impfstoff? "],
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
                    ["nl-be", "Antwoord ja indien u een COVID-19 vaccin heeft ontvangen (sinds december 2020). "],
                    ["fr-be", "Geben Sie 'Ja' an, wenn Sie eine Impfung mit COVID-19-Impfstoff erhielten (seit Dezember 2020)."],
                    ["de-be", "Répondez oui si vous avez reçu un vaccin contre le coronavirus (depuis décembre 2020)."],
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
                ["fr-be", "Oui, j'ai reçu au moins un vaccin contre le coronavirus. "],
                ["de-be", "Ja, ich erhielt mindestens einen COVID-19-Impfstoff"],
                ["en", "Yes, I received at least one COVID-19 vaccine"],
            ])
        },
        {
            key: '01', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik ben uitgenodigd en zal binnekort een eerste dosis ontvangen."],
                ["fr-be", "Non, j'ai reçu une invitation, et je recevrai prochainement un vaccin."],
                ["de-be", "Nein, ich habe einen Impftermin und werde bald einen Impfstoff erhalten."],
                ["en", "No, I was invited and will receive a vaccine soon."],
            ])
        },
        {
            key: '02', role: 'option',
            content: new Map([
                ["nl-be", "Nee, ik ben uitgenodigd, maar heb de vaccinatie geweigerd."],
                ["fr-be", "Non, j'ai reçu une invitation, mais j'ai refusé le vaccin."],
                ["de-be", "Nein, ich wurde eingeladen, lehnte aber den Impfstoff ab."],
                ["en", "No, I was invited but declined the vaccine."],
            ])
        },
        {
            key: '03', role: 'option',
            content: new Map([
                ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin halen."],
                ["fr-be", "Non, lorsque je serai invité(e), je prévois de me faire vacciner."],
                ["de-be", "Nein, wenn ich eingeladen werde, werde ich mich impfen zu lassen."],
                ["en", "When invited, I plan to receive a vaccine."],
            ])
        },
        {
            key: '04', role: 'option',
            content: new Map([
                ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin weigeren."],
                ["fr-be", "Non, lorsque je serai invité(e), je refuserai le vaccin."],
                ["de-be", "Nein, wenn ich eingeladen werde, werde ich den Impfstoff und damit die Impfung ablehnen."],
                ["en", "When invited, I will decline the vaccine."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl-be", "Ik wens niet te antwoorden."],
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
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '1', '01', '03')
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
            expWithArgs('responseHasKeysAny', keyvac, [responseGroupKey, singleChoiceKey].join('.'), '02', '04')
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
