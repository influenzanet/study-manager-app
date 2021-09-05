import { SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { initMultipleChoiceGroup, initSingleChoiceGroup } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions";

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
            ["en", "Four weeks ago you received a questionnaire about COVID-19 vaccination.  This new questionnaire is to monitor any further changes to your vaccination status. Select the option that applies to you."],
            ["it", "Quattro settimane fa ti abbiamo invitato a compilare un questionario sulla vaccinazione per il COVID-19. Questo nuovo questionario ti viene proposto per monitorare se ci sono stati cambiamenti nella tua situazione vaccinale. Seleziona le opzioni che si applicano al tuo caso."],
            ["nl-be", "Vier weken geleden vulde u een vragenlijst in over uw COVID-19 vaccinatie. Met deze nieuwe vragenlijst willen we veranderingen hierin verder opvolgen. Duid de optie aan die voor u van toepassing is.   "],
            ["fr-be", "Il y a quatre semaines, vous avez reçu un questionnaire relatif à la vaccination contre le coronavirus. Ce nouveau questionnaire a pour but de contrôler tout changement ultérieur de votre statut vaccinal. Sélectionnez l'option qui vous concerne."],
            ["de-be", "Vor vier Wochen erhielten Sie einen Fragebogen zur COVID-19-Impfung.  Dieser neue Fragebogen dient zur Überwachung eventueller weiterer Änderungen an Ihrem Impfstatus. Bitte wählen Sie die Option, die auf Sie zutrifft."],
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
                ["en", "In the meantime I received a new vaccine dose, or a new invitation to be vaccinated."],
                ["it", "Nel frattempo ho ricevuto una nuova dose di vaccino o un nuovo invito a essere vaccinato."],
                ["nl-be", "In de tussentijd kreeg ik een nieuwe dosis van het vaccin of kreeg ik een nieuwe uitnodiging voor een vaccin. "],
                ["fr-be", "Sur ces entrefaites, j'ai reçu une nouvelle dose du vaccin ou une nouvelle invitation à me faire vacciner."],
                ["de-be", "In der Zwischenzeit erhielt ich eine neue Impfdosis oder eine neue Einladung zur Impfung."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "In the meantime nothing has changed in terms of vaccination for me."],
                ["it", "Nel frattempo, nulla è cambiato nella mia situazione vaccinale."],
                ["nl-be", "In de tussentijd is er er niets veranderd voor mijn vaccinaties. "],
                ["fr-be", "Sur ces entrefaites, rien n'a changé pour moi en matière de vaccination."],
                ["de-be", "In der Zwischenzeit hat sich in Bezug auf die Impfung für mich nichts geändert."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I'm not sure, and would like to take these questions to make sure my information on vaccination is up to date."],
                ["it", "Non sono sicuro/a e vorrei rispondere di nuovo alle domande del questionario per essere certi che la mia informazione sul mio stato vaccinale sia aggiornata."],
                ["nl-be", "Ik weet het niet meer. Ik zou graag deze vragen beantwoorden zodat mijn informatie volledig is. "],
                ["fr-be", "Je ne suis pas certain(e), et je voudrais répondre à ces questions pour m'assurer que mes informations sur la vaccination sont à jour."],
                ["de-be", "Ich bin mir nicht sicher und ich würde gerne diese Fragen aufgreifen, um sicher zu gehen, dass meine Informationen zur Impfung auf dem neuesten Stand sind."],
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
            ["en", "Have you received a COVID-19 vaccine?"],
            ["it", "Sei stato vaccinato per il COVID-19?"],
            ["nl-be", "Bent u reeds gevaccineerd voor COVID-19?"],
            ["fr-be", "Avez-vous reçu un vaccin contre le coronavirus ? "],
            ["de-be", "Erhielten Sie einen COVID-19-Impfstoff? "],
        ]))
    );

    // INFO POPUP
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to be able to work out how much protection the vaccine gives."],
                    ["it", "Vogliamo studiare l'efficacia e la protezione fornita dal vaccino."],
                    ["nl-be", "We willen onderzoeken hoeveel bescherming vaccinatie geeft."],
                    ["fr-be", "Nous aimerions pouvoir déterminer le degré de protection offert par le vaccin."],
                    ["de-be", "Wir würden gerne untersuchen, wieviel Schutz der Impfstoff verleiht."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere a questa domanda?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Report yes, if you received a COVID-19 vaccine (since December 2020)."],
                    ["it", "Rispondi sì se sei stato vaccinato per il COVID-19 (a partire da Dicembre 2020)."],
                    ["nl-be", "Antwoord ja indien u een COVID-19 vaccin heeft ontvangen (sinds december 2020). "],
                    ["fr-be", "Geben Sie 'Ja' an, wenn Sie eine Impfung mit COVID-19-Impfstoff erhielten (seit Dezember 2020)."],
                    ["de-be", "Répondez oui si vous avez reçu un vaccin contre le coronavirus (depuis décembre 2020)."],
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
                ["en", "Yes, I received at least one COVID-19 vaccine"],
                ["it", "Si, sono stato vaccinato per il COVID-19"],
                ["nl-be", "Ja, ik heb al minstens 1 dosis gekregen."],
                ["fr-be", "Oui, j'ai reçu au moins un vaccin contre le coronavirus. "],
                ["de-be", "Ja, ich erhielt mindestens einen COVID-19-Impfstoff"],
            ])
        },
        {
            key: '01', role: 'option',
            content: new Map([
                ["en", "No, I was invited and will receive a vaccine soon."],
                ["it", "Non ancora, mi è stato proposto e lo farò presto."],
                ["nl-be", "Nee, ik ben uitgenodigd en zal binnekort een eerste dosis ontvangen."],
                ["fr-be", "Non, j'ai reçu une invitation, et je recevrai prochainement un vaccin."],
                ["de-be", "Nein, ich habe einen Impftermin und werde bald einen Impfstoff erhalten."],
            ])
        },
        {
            key: '02', role: 'option',
            content: new Map([
                ["en", "No, I was invited but declined the vaccine."],
                ["it", "No, mi è stato proposto ma ho declinato."],
                ["nl-be", "Nee, ik ben uitgenodigd, maar heb de vaccinatie geweigerd."],
                ["fr-be", "Non, j'ai reçu une invitation, mais j'ai refusé le vaccin."],
                ["de-be", "Nein, ich wurde eingeladen, lehnte aber den Impfstoff ab."],
            ])
        },
        {
            key: '03', role: 'option',
            content: new Map([
                ["en", "When invited, I plan to receive a vaccine."],
                ["it", "No, non mi è stato ancora proposto. Non appena mi sarà proposto, lo farò."],
                ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin halen."],
                ["fr-be", "Non, lorsque je serai invité(e), je prévois de me faire vacciner."],
                ["de-be", "Nein, wenn ich eingeladen werde, werde ich mich impfen zu lassen."],
            ])
        },
        {
            key: '04', role: 'option',
            content: new Map([
                ["en", "When invited, I will decline the vaccine."],
                ["it", "No, non mi è stato ancora proposto. Se mi sarà proposto, non accetterò di farlo."],
                ["nl-be", "Nee, wanneer ik een uitnodiging krijg, zal ik mijn vaccin weigeren."],
                ["fr-be", "Non, lorsque je serai invité(e), je refuserai le vaccin."],
                ["de-be", "Nein, wenn ich eingeladen werde, werde ich den Impfstoff und damit die Impfung ablehnen."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember."],
                ["it", "Non so/non ricordo."],
                ["nl-be", "Ik wens niet te antwoorden."],
                ["fr-be", "Je ne sais pas/je ne me souviens pas."],
                ["de-be", "Ich weiß nicht/kann mich nicht erinnern."],
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
            ["en", "Which COVID-19 vaccine did you receive?"],
            ["it", "Quale vaccino per il COVID-19 ti è stato somministrato?"],
            ["nl-be", "Welk COVID-19 vaccin heeft u ontvangen? "],
            ["fr-be", "Quel vaccin contre le coronavirus avez-vous reçu ? "],
            ["de-be", "Welchen COVID-19-Impfstoff erhielten Sie? "],
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
                ["en", "AstraZeneca"],
                ["it", "AstraZeneca"],
                ["nl-be", "AstraZeneca"],
                ["fr-be", "AstraZeneca"],
                ["de-be", "AstraZeneca"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Pfizer/BioNTech"],
                ["it", "Pfizer/BioNTech"],
                ["nl-be", "Pfizer/BioNTech"],
                ["fr-be", "Pfizer/BioNTech"],
                ["de-be", "Pfizer/BioNTech"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Moderna"],
                ["it", "Moderna"],
                ["nl-be", "Moderna"],
                ["fr-be", "Moderna"],
                ["de-be", "Moderna"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Janssen Pharmaceutica (Johnson & Johnson)"],
                ["it", "Janssen Pharmaceutica (Johnson & Johnson)"],
                ["nl-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
                ["fr-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
                ["de-be", "Janssen Pharmaceutica (Johnson & Johnson)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "CureVac"],
                ["it", "CureVac"],
                ["nl-be", "CureVac"],
                ["fr-be", "CureVac"],
                ["de-be", "CureVac"],
            ])
        },
        {
            key: '6', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["en", "Other"],
                ["it", "Altro"],
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
            ]),
            description: new Map([
                ["en", "Describe here (optional)"],
                ["it", "Descrizione (opzionale)"],
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["en", "I Don't know/Can't remember"],
                ["it", "Non so/non ricordo"],
                ["nl-be", "Ik weet het niet meer"],
                ["fr-be", "Je ne sais pas/je ne me souviens pas."],
                ["de-be", "Ich weiß nicht/kann mich nicht erinnern"],
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
            ["en", "How many doses of the vaccine did you receive?"],
            ["it", "Quante dosi di vaccino hai ricevuto?"],
            ["nl-be", "Hoeveel dosissen van het vaccin heeft u reeds ontvangen? "],
            ["fr-be", "Combien de doses du vaccin avez-vous reçu ? "],
            ["de-be", "Wie viele Dosen des Impfstoffs erhielten Sie? "],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Perché ti facciamo questa domanda?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to be able to work out how much protection a complete vaccination scheme gives."],
                    ["it", "Vogliamo studiare l'efficacia di un programma di vaccione completo."],
                    ["nl-be", "We willen onderzoeken hoeveel bescherming een volledige vaccinatie geeft."],
                    ["fr-be", "Nous aimerions pouvoir déterminer le degré de protection qu'offre un programme de vaccination complet."],
                    ["de-be", "Wir möchten gerne untersuchen, wieviel Infektionsschutz ein vollständigen Impfplan Ihnen gibt."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer this question?"],
                    ["it", "Come devi rispondere a questa domanda?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr-be", "Comment dois-je répondre à cette question ?"],
                    ["de-be", "Wie soll ich diese Frage beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Report the number of doses you received (which corresponds to the number of time you were vaccinated against COVID-19 )."],
                    ["it", "Seleziona il numero di dosi che hai ricevuto (che corrisponde a quante volte sei stato vaccinato per il COVID-19)."],
                    ["nl-be", "Rapporteer het aantal dosissen die u reeds ontvangen heeft (dit komt overeen met het aantal keer dat u werd gevaccineerd voor COVID-19). "],
                    ["fr-be", "Indiquez le nombre de doses reçues (qui correspond au nombre de fois où vous avez été vacciné(e) contre le coronavirus). "],
                    ["de-be", "Geben Sie die Anzahl der Dosen an, die Sie erhielten (die der Anzahl der Termine entspricht, an denen Sie gegen COVID-19 geimpft wurden)."],
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
                ["en", "One"],
                ["it", "Una"],
                ["nl-be", "Eén"],
                ["fr-be", "Un"],
                ["de-be", "Eine"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Two"],
                ["it", "Due"],
                ["nl-be", "Twee"],
                ["fr-be", "Deux"],
                ["de-be", "Zwei"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "More than two"],
                ["it", "Più di due"],
                ["nl-be", "Meer dan twee"],
                ["fr-be", "Plus de deux"],
                ["de-be", "Mehr als zwei"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["en", "I Don't know/Can't remember"],
                ["it", "Non so/non ricordo"],
                ["nl-be", "Ik weet het niet meer"],
                ["fr-be", "Je ne sais pas/je ne me souviens pas."],
                ["de-be", "Ich weiß nicht/kann mich nicht erinnern"],
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
            ["en", "When did you receive your first injection of vaccine against COVID-19? If you do not know the exact date, provide an estimate."],
            ["it", "When did you receive your first injection of vaccine against COVID-19? If you do not know the exact date, provide an estimate."],
            ["nl-be", "Wanneer heeft u de eerste dosis van het vaccin ontvangen? Indien u de exacte datum niet kent, gelieve een schatting te geven. "],
            ["fr-be", "Quand avez-vous reçu votre première injection du vaccin contre le coronavirus ? Si vous ne connaissez pas la date exacte, veuillez donner une estimation. "],
            ["de-be", "Wann erhielten Sie Ihre erste Injektion von Impfstoff gegen COVID-19? Wenn Sie das genaue Datum nicht mehr wissen, schätzen Sie es. "],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Knowing when people are vaccinated tells us how well the vaccination program is being carried out."],
                    ["it", "Knowing when people are vaccinated tells us how well the vaccination program is being carried out."],
                    ["nl-be", "Dit vertelt ons hoe de vaccinatie campgane wordt uitgevoerd. "],
                    ["fr-be", "Le fait de savoir quand les gens sont vaccinés nous permet de savoir si le programme de vaccination est bien exécuté."],
                    ["de-be", "Wenn wir wissen, wann die Menschen geimpft wurden, sagt das uns, wie gut das Impfprogramm durchgeführt wird"],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please try and answer as accurately as possible. If you do not know the precise date, please give your best estimate of the month and year of vaccination."],
                    ["it", "Please try and answer as accurately as possible. If you do not know the precise date, please give your best estimate of the month and year of vaccination."],
                    ["nl-be", "Gelieve zo correct mogelijk te antwoorden. Indien u de exacte datum niet meer weet, geef een zo goed mogelijke schatting van maand en jaar van de vaccinatie. "],
                    ["fr-be", "Essayez de répondre de la manière la plus précise possible. Si vous ne connaissez pas la date précise, veuillez donner votre meilleure estimation du mois et de l'année de vaccination. "],
                    ["de-be", "Bitte versuchen Sie es und beantworten Sie es so genau wie möglich. Wenn Sie das genaue Datum nicht wissen, geben Sie bitte Ihre beste Schätzung des Monats und des Jahres der Impfung an. "],
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
                ["en", "Choose date"],
                ["it", "Choose date"],
                ["nl-be", "Kies een datum"],
                ["fr-be", "Choisissez la date"],
                ["de-be", "Datum auswählen"],
            ]),
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],

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
            ["en", "When did you receive your second injection of vaccine against COVID-19? If you do not know the exact date, provide an estimate."],
            ["it", "When did you receive your second injection of vaccine against COVID-19? If you do not know the exact date, provide an estimate."],
            ["nl-be", "Wanneer heeft u de tweede dosis van het vaccin ontvangen? Indien u de exacte datum niet meer weet, geef een zo goed mogelijke schatting van maand en jaar van de vaccinatie."],
            ["fr-be", "Quand avez-vous reçu votre deuxième injection du vaccin contre le coronavirus ? Si vous ne connaissez pas la date exacte, veuillez donner une estimation. "],
            ["de-be", "Wann erhielten Sie Ihre zweite Injektion von Impfstoff gegen COVID-19? Wenn Sie das genaue Datum nicht wissen, schätzen Sie es bitte. "],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Knowing when people are vaccinated tells us how well the vaccination program is being carried out."],
                    ["it", "Knowing when people are vaccinated tells us how well the vaccination program is being carried out."],
                    ["nl-be", "Dit vertelt ons hoe de vaccinatie campgane wordt uitgevoerd. "],
                    ["fr-be", "Le fait de savoir quand les gens sont vaccinés nous permet de savoir si le programme de vaccination est bien exécuté."],
                    ["de-be", "Wenn wir wissen, wann die Menschen geimpft wurden, sagt das uns, wie gut das Impfprogramm durchgeführt wird"],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please try and answer as accurately as possible. If you do not know the precise date, please give your best estimate of the month and year of vaccination."],
                    ["it", "Please try and answer as accurately as possible. If you do not know the precise date, please give your best estimate of the month and year of vaccination."],
                    ["nl-be", "Gelieve zo correct mogelijk te antwoorden. Indien u de exacte datum niet meer weet, geef een zo goed mogelijke schatting van maand en jaar van de vaccinatie. "],
                    ["fr-be", "Essayez de répondre de la manière la plus précise possible. Si vous ne connaissez pas la date précise, veuillez donner votre meilleure estimation du mois et de l'année de vaccination. "],
                    ["de-be", "Bitte versuchen Sie es und antworten Sie es so genau wie möglich. Wenn Sie das genaue Datum nicht wissen, geben Sie bitte Ihre beste Schätzung des Monats und des Jahres der Impfung an. "],
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
                ["en", "Choose date"],
                ["it", "Choose date"],
                ["nl-be", "Kies een datum"],
                ["fr-be", "Choisissez une date."],
                ["de-be", "Wählen Sie das Datum"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don’t know/can’t remember"],
                ["it", "I don’t know/can’t remember"],
                ["nl-be", "Ik weet het niet (meer)"],
                ["fr-be", "Je ne sais pas (plus)"],
                ["de-be", "Ich weiß es nicht (mehr)"],
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
            ["en", "What are your reason(s) for getting a COVID-19 vaccination? Select up to 3 options that are most applicable."],
            ["it", "What are your reason(s) for getting a COVID-19 vaccination? Select up to 3 options that are most applicable."],
            ["nl-be", "Wat waren voor u de hoofdredenen om u te laten vaccineren? Selecteer maximaal 3 opties die het meest van toepassing zijn."],
            ["fr-be", "Pour quelle(s) raison(s) souhaitez-vous vous faire vacciner contre le coronavirus ? Sélectionnez jusqu'à 3 options les plus pertinentes."],
            ["de-be", "Welche sind Ihre Gründe zum Erhalt einer Impfung gegen COVID-19? Wählen Sie bis zu 3 Optionen, die am stärksten gelten."],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to know the main reasons why people get the vaccine."],
                    ["it", "We would like to know the main reasons why people get the vaccine."],
                    ["nl-be", "We kennen graag de redenen waarom mensen zich laten vaccineren. "],
                    ["fr-be", "Nous aimerions connaître les principales raisons pour lesquelles les gens se font vacciner."],
                    ["de-be", "Wir wüssten gerne die Hauptgründe der Menschen für die Impfung."],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please select up the 3 options that mattered to take your decision."],
                    ["it", "Please select up the 3 options that mattered to take your decision."],
                    ["nl-be", "Gelieve de opties aan te duiden die het meest van toepassing zijn voor u. "],
                    ["fr-be", "Veuillez sélectionner toutes les réponses qui entrent en ligne de compte pour prendre votre décision."],
                    ["de-be", "Bitte wählen Sie alle Antworten, die für Ihre Entscheidung wichtig waren."],
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
                ["en", "Select up to 3 options that are most applicable"],
                ["it", "Select up to 3 options that are most applicable"],
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '21', role: 'option',
            content: new Map([
                ["en", "The vaccination is recommended by public health authorities."],
                ["it", "The vaccination is recommended by public health authorities."],
                ["nl-be", "Vaccinatie is aangeraden door volksgezondheidsinstellingen."],
                ["fr-be", "La vaccination est recommandée par les autorités de santé publique."],
                ["de-be", "Die Impfung wird von Gesundheitsämtern empfohlen."],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I belong to a group who is at risk of complications in case of COVID-19 (over 65 of age, underlying health condition, obesity, etc.)."],
                ["it", "I belong to a group who is at risk of complications in case of COVID-19 (over 65 of age, underlying health condition, obesity, etc.)."],
                ["nl-be", "Ik behoor tot een risicogroep voor ernstige COVID-19 (ouder dan 65 jaar, onderliggende gezondheidsrisico's, obesitas, etc.)."],
                ["fr-be", "J'appartiens à un groupe à risque de complications si je contracte le coronavirus (plus de 65 ans, maladie sous-jacente, obésité, etc.)."],
                ["de-be", "Ich gehöre zu einer Risikogruppe für Komplikationen bei COVID-19 (über 65 Jahre alt, allgemeiner Gesundheitszustand, Übergewicht usw.)."],
            ])
        },
        {
            key: '20', role: 'option',
            content: new Map([
                ["en", "I work in close contact with people at risk of complications in case of COVID-19 (working in a nursing home, health staff…)."],
                ["it", "I work in close contact with people at risk of complications in case of COVID-19 (working in a nursing home, health staff…)."],
                ["nl-be", "Voor mijn werk heb ik nauw contact met personen die behoren tot de risicogroep voor ernstige COVID-19 (werken in woonzorgcentrum, ziekenhuis, etc.)."],
                ["fr-be", "Je travaille en contact étroit avec des personnes à risque de développer des complications si ces personnes contractent le coronavirus (travail dans une maison de retraite, personnel médical, etc.)."],
                ["de-be", "Ich arbeite in engem Kontakt mit Menschen mit Komplikationsrisiko bei COVID-19 (ich arbeite in einem Pflegeheim, gehöre zum Pflegepersonal usw.)."],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases my risk of getting COVID-19."],
                ["it", "Vaccination decreases my risk of getting COVID-19."],
                ["nl-be", "Door vaccinatie verlaag ik het risico dat ikzelf COVID-19 krijg."],
                ["fr-be", "La vaccination diminue mon risque de contracter le coronavirus."],
                ["de-be", "Impfung senkt mein Risiko, COVID-19 zu bekommen."],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases the risk of spreading COVID-19 to others."],
                ["it", "Vaccination decreases the risk of spreading COVID-19 to others."],
                ["nl-be", "Door vaccinatie verlaag ik het risico dat andere personen COVID-19 krijgen."],
                ["fr-be", "La vaccination diminue le risque de transmettre le coronavirus à d'autres personnes."],
                ["de-be", "Impfung senkt das Risiko der Verbreitung von COVID-19 auf andere Menschen."],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "My doctor recommended it."],
                ["it", "My doctor recommended it."],
                ["nl-be", "Mijn (huis)arts heeft de vaccinatie aangeraden."],
                ["fr-be", "Mon médecin me l'a recommandé."],
                ["de-be", "Mein Arzt empfahl es."],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "It was recommended in my workplace/school."],
                ["it", "It was recommended in my workplace/school."],
                ["nl-be", "Vaccinatie werd aangeraden/aangeboden door mijn werk/school."],
                ["fr-be", "Le vaccin a été recommandé sur mon lieu de travail/dans mon établissement scolaire."],
                ["de-be", "Es wurde an meinem Arbeitsplatz/in meiner Schule empfohlen."],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "The vaccine was readily available and vaccine administration was convenient."],
                ["it", "The vaccine was readily available and vaccine administration was convenient."],
                ["nl-be", "Het vaccin was gemakkelijk te verkrijgen en het toedienen gaat vlot."],
                ["fr-be", "Le vaccin était facilement disponible et l'administration du vaccin était pratique."],
                ["de-be", "Der Impfstoff war leicht verfügbar und das Verabreichen war einfach."],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "The vaccine was free (no cost)."],
                ["it", "The vaccine was free (no cost)."],
                ["nl-be", "Het vaccin was gratis."],
                ["fr-be", "Le vaccin était gratuit (aucun coût)."],
                ["de-be", "Der Impfstoff war kostenlos (gratis)."],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don’t want to miss work/school."],
                ["it", "I don’t want to miss work/school."],
                ["nl-be", "Ik wil geen werk/school missen."],
                ["fr-be", "Je ne veux pas manquer le travail/l'école."],
                ["de-be", "Ich möchte nicht die Arbeit / den Unterricht verpassen."],
            ])
        },
        {
            key: 'G8', role: 'option',
            content: new Map([
                ["en", "I always accept vaccination when it is offered to me."],
                ["it", "I always accept vaccination when it is offered to me."],
                ["nl-be", "Ik haal altijd een vaccin wanneer het me wordt aangeboden"],
                ["fr-be", "J'accepte toujours la vaccination lorsqu'elle m'est proposée."],
                ["de-be", "Ich akzeptiere Impfung immer, wenn sie mir angeboten wird."],
            ])
        },
        {
            key: 'GCS3', role: 'option',
            content: new Map([
                ["en", "To play my role in society and enable the measures to be relaxed for the economy and people's general wellbeing."],
                ["it", "To play my role in society and enable the measures to be relaxed for the economy and people's general wellbeing."],
                ["nl-be", "Om mijn rol te spelen in de maatschappij en versoepelingen mogelijk te maken voor de economie en het algemeen welzijn."],
                ["fr-be", "Pour jouer mon rôle dans la société et permettre l'assouplissement des mesures pour l'économie et le bien-être général de la population."],
                ["de-be", "Meine Verantwortung für die Gesellschaft zu übernehmen und Lockerungen für die Wirtschaft und das Allgemeinwohl zu ermöglichen."],
            ])
        },
        {
            key: 'GCS4', role: 'option',
            content: new Map([
                ["en", "To have more personal freedom again."],
                ["it", "To have more personal freedom again."],
                ["nl-be", "Om zelf terug meer vrijheid te krijgen."],
                ["fr-be", "Pour récupérer ma liberté."],
                ["de-be", "Wieder mehr persönliche Freiheit zu haben."],
            ])
        },
        {
            key: 'GCS14', role: 'option',
            content: new Map([
                ["en", "To take the pressure off medical staff."],
                ["it", "To take the pressure off medical staff."],
                ["nl-be", "Om het medisch personeel te ontlasten."],
                ["fr-be", "Pour soulager les professionnels de la santé."],
                ["de-be", "Den Druck von dem medizinischen Personal zu nehmen."],
            ])
        },
        {
            key: 'GCS12', role: 'option',
            content: new Map([
                ["en", "To be able to have an operation/procedure."],
                ["it", "To be able to have an operation/procedure."],
                ["nl-be", "Om zelf een operatie/ingreep te kunnen ondergaan."],
                ["fr-be", "Pour pouvoir subir une opération/intervention médicale."],
                ["de-be", "Um sich einer Operation/einer medizinischen Eingriff zu unterziehen."],
            ])
        },
        {
            key: '9', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["en", "Other"],
                ["it", "Other"],
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
            ]),
            description: new Map([
                ["en", "Describe here (optional)"],
                ["it", "Describe here (optional)"],
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
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
                ["en", "Select up to 3 options that are most applicable"],
                ["it", "Select up to 3 options that are most applicable"],
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
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
            ["en", "For what reason(s) are you against COVID-19 vaccination? Select up to 3 options that are most applicable."],
            ["it", "For what reason(s) are you against COVID-19 vaccination? Select up to 3 options that are most applicable."],
            ["nl-be", "Wat zijn voor u de hoofdredenen om u niet te laten vaccineren? Selecteer maximaal 3 opties die het meest van toepassing zijn."],
            ["fr-be", "Pour quelle(s) raison(s) êtes-vous contre la vaccination contre le coronavirus ? Sélectionnez jusqu'à 3 options les plus pertinentes."],
            ["de-be", "Aus welchen Gründen sind Sie gegen COVID-19-Impfung? Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We would like to know the main reasons why people are declining COVID-19 vaccination."],
                    ["it", "We would like to know the main reasons why people are declining COVID-19 vaccination."],
                    ["nl-be", "We kennen graan de hoofdredenen waarom mensen geen vaccinatie willen. "],
                    ["fr-be", "Nous aimerions connaître les principales raisons pour lesquelles les gens refusent la vaccination contre le coronavirus."],
                    ["de-be", "Wir würden gerne die Hauptgründe dafür wissen, warum Menschen die Impfung gegen COVID-19 ablehnen."],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please select up the 3 options that mattered to take your decision."],
                    ["it", "Please select up the 3 options that mattered to take your decision."],
                    ["nl-be", "Gelieve de opties aan te duiden die het meest van toepassing zijn voor u. "],
                    ["fr-be", "Veuillez sélectionner toutes les réponses qui entrent en ligne de compte pour prendre votre décision."],
                    ["de-be", "Bitte wählen Sie alle Antworten, die bei Ihrer Entscheidung wichtig waren."],
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
                ["en", "Select up to 3 options that are most applicable"],
                ["it", "Select up to 3 options that are most applicable"],
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: 'GCS1', role: 'option',
            content: new Map([
                ["en", "I don’t think the safety of COVID-19 vaccines can be guaranteed sufficiently."],
                ["it", "I don’t think the safety of COVID-19 vaccines can be guaranteed sufficiently."],
                ["nl-be", "Ik denk dat de veiligheid niet voldoende gegarandeerd is voor COVID-19 vaccins."],
                ["fr-be", "Je pense que la sécurité des vaccins COVID-19 n'est pas sufissamment garantie."],
                ["de-be", "Ich denke, dass die Sicherheit der COVID-19-Impfstoffe nicht vollständig gewährleistet ist."],
            ])
        },
        {
            key: 'GCS4', role: 'option',
            content: new Map([
                ["en", "I don't think COVID-19 infection is serious enough."],
                ["it", "I don't think COVID-19 infection is serious enough."],
                ["nl-be", "Ik denk dat COVID-19 niet ernstig genoeg is."],
                ["fr-be", "Je pense que le COVID-19 n'est pas suffisamment grave."],
                ["de-be", "Ich denke, dass eine COVID-19-Erkrankung nicht schwer genug ist."],
            ])
        },
        {
            key: 'GCS13', role: 'option',
            content: new Map([
                ["en", "It depends exactly which COVID-19 vaccine I am offered."],
                ["it", "It depends exactly which COVID-19 vaccine I am offered."],
                ["nl-be", "Dat hangt af van welk COVID-19 vaccin ik precies krijg aangeboden."],
                ["fr-be", "Cela dépend du vaccin COVID-19 qu'on me présentera."],
                ["de-be", "Das hängt davon ab, welchen COVID-19-Impfstoff ich tatsächlich angeboten bekomme."],
            ])
        },
        {
            key: 'GCS5', role: 'option',
            content: new Map([
                ["en", "I think I'm allergic to a COVID-19 vaccine."],
                ["it", "I think I'm allergic to a COVID-19 vaccine."],
                ["nl-be", "Ik denk dat ik allergisch ben voor een COVID-19 vaccin."],
                ["fr-be", "Je pense que je suis allergique à un vaccin COVID-19."],
                ["de-be", "Ich denke, dass ich gegen eine COVID-19-Impfung allergisch bin."],
            ])
        },
        {
            key: 'GCS6', role: 'option',
            content: new Map([
                ["en", "I'd like to wait until enough other people have been vaccinated before I get the vaccine myself."],
                ["it", "I'd like to wait until enough other people have been vaccinated before I get the vaccine myself."],
                ["nl-be", "Ik wacht liever af totdat er voldoende andere mensen gevaccineerd zijn om mezelf te laten vaccineren."],
                ["fr-be", "Je préfère attendre que suffisamment de personnes autour de moi ont été vaccinées avant de me faire vacciner."],
                ["de-be", "Ich würde gerne warten, bis genügend andere Menschen geimpft werden, bevor ich den Impfstoff selbst erhalte."],
            ])
        },
        {
            key: 'GCS7', role: 'option',
            content: new Map([
                ["en", "I'd like to wait until enough other people have been vaccinated so that I don't have to be vaccinated myself."],
                ["it", "I'd like to wait until enough other people have been vaccinated so that I don't have to be vaccinated myself."],
                ["nl-be", "Ik wacht liever af totdat er voldoende andere mensen gevaccineerd zijn zodat ik mezelf niet meer hoef te laten vaccineren."],
                ["fr-be", "Je préfère attendre que suffisamment de personnes autour de moi ont été vaccinées de sorte qu'il n'est plus nécessaire de me faire vacciner."],
                ["de-be", "Ich warte lieber ab, bis genügend andere Menschen geimpft wurden, sodass ich mich selbst nicht mehr impfen lassen muss."],
            ])
        },
        {
            key: 'GCS8', role: 'option',
            content: new Map([
                ["en", "I don't think I need a COVID-19 vaccine because I've already had a COVID-19 infection."],
                ["it", "I don't think I need a COVID-19 vaccine because I've already had a COVID-19 infection."],
                ["nl-be", "Ik denk niet dat ik een COVID-19 vaccin nodig heb, omdat ik al COVID-19 heb gehad."],
                ["fr-be", "Je pense que je n'ai pas besoin du vaccin COVID-19 parce que j'ai déjà été contaminé(e)."],
                ["de-be", "Ich denke, dass ich keine COVID-19-Impfung benötige, weil ich selbst COVID-19 gehabt habe."],
            ])
        },
        {
            key: 'GCS9', role: 'option',
            content: new Map([
                ["en", "I'm against all forms of vaccination."],
                ["it", "I'm against all forms of vaccination."],
                ["nl-be", "Ik ben tegen elke vorm van vaccinatie."],
                ["fr-be", "Je suis contre toute forme de vaccination."],
                ["de-be", "Ich bin gegen Impfungen aller Art."],
            ])
        },
        {
            key: 'GCS10', role: 'option',
            content: new Map([
                ["en", "I don't think the vaccine is good because it has been developed too quickly."],
                ["it", "I don't think the vaccine is good because it has been developed too quickly."],
                ["nl-be", "Ik vind dat het vaccin te snel ontwikkeld is om goed te zijn."],
                ["fr-be", "Je trouve que le vaccin a été développé trop vite pour être efficace."],
                ["de-be", "Ich glaube nicht, dass der Impfstoff gut ist, weil er zu schnell entwickelt wurde."],
            ])
        },
        {
            key: 'GCS12', role: 'option',
            content: new Map([
                ["en", "I can't find any reliable information about vaccines."],
                ["it", "I can't find any reliable information about vaccines."],
                ["nl-be", "Ik vind geen betrouwbare informatie over vaccins."],
                ["fr-be", "Je ne trouve pas d'information fiable sur les vaccins."],
                ["de-be", "Ich finde keine zuverlässigen Informationen über Impfstoffe."],
            ])
        },
        {
            key: 'GCS14', role: 'option',
            content: new Map([
                ["en", "I think I'm at very low risk of catching COVID-19 infection."],
                ["it", "I think I'm at very low risk of catching COVID-19 infection."],
                ["nl-be", "Ik denk dat ik een verwaarloosbaar risico loop om besmet te worden met het coronavirus."],
                ["fr-be", "Je pense que je cours peu de risque d'être contaminé(e)."],
                ["de-be", "Ich denke, ich habe ein sehr geringes Risiko, eine Infektion mit COVID-19 zu bekommen."],
            ])
        },
        {
            key: 'GCS11', role: 'input',
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["en", "Other"],
                ["it", "Other"],
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
            ]),
            description: new Map([
                ["en", "Describe here (optional)"],
                ["it", "Describe here (optional)"],
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
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
                ["en", "Select up to 3 options that are most applicable"],
                ["it", "Select up to 3 options that are most applicable"],
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
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
            ["en", "Did you experience any side effects of this vaccination? If yes, select up to 3 options that are most applicable."],
            ["it", "Did you experience any side effects of this vaccination? If yes, select up to 3 options that are most applicable."],
            ["nl-be", "Heeft u ernstige nevenwerkingen ondervonden van deze vaccinatie? Indien ja, selecteer maximaal 3 opties die het meest van toepassing zijn."],
            ["fr-be", "Avez-vous ressenti des effets secondaires de cette vaccination ? Si oui, sélectionnez jusqu'à 3 options les plus pertinentes."],
            ["de-be", "Gab es Nebenwirkungen bei dieser Impfung? Wenn ja, wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
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
                    ["en", "Why are we asking this?"],
                    ["it", "Why are we asking this?"],
                    ["nl-be", "Waarom vragen we dit?"],
                    ["fr-be", "Pourquoi posons-nous cette question ?"],
                    ["de-be", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "We want to investigate what are the side effects that people experience from COVID-19 vaccination."],
                    ["it", "We want to investigate what are the side effects that people experience from COVID-19 vaccination."],
                    ["nl-be", "We willen onderzoeken welke neveneffecten mensen ervaren na een COVID-19 vaccinatie. "],
                    ["fr-be", "Nous souhaitons connaître les effets secondaires éventuels de la vaccination contre le coronavirus."],
                    ["de-be", "Wir möchten die Nebenwirkungen untersuchen, die Menschen bei der COVID-19-Impfung erfahren."],
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
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please select up to 3 side effects that you experienced after COVID-19 vaccination."],
                    ["it", "Please select up to 3 side effects that you experienced after COVID-19 vaccination."],
                    ["nl-be", "Gelieve de neveneffecten aan te duiden die het meest van toepassing zijn voor u. "],
                    ["fr-be", "Veuillez sélectionner tous les effets secondaires que vous avez ressentis après avoir reçu un vaccin contre le coronavirus."],
                    ["de-be", "Bitte wählen Sie alle Nebenwirkungen, die Sie nach der COVID-19-Impfung erfuhren."],
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
                ["en", "Select up to 3 options that are most applicable"],
                ["it", "Select up to 3 options that are most applicable"],
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
            ])),
    }, rg?.key);
    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "None"],
                ["it", "None"],
                ["nl-be", "Geen"],
                ["fr-be", "Aucun effet secondaire"],
                ["de-be", "Keine"],
            ])
        },
        {
            key: 'GCS1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Allergic reaction"],
                ["it", "Allergic reaction"],
                ["nl-be", "Allergische reactie"],
                ["fr-be", "Réaction allergique"],
                ["de-be", "Allergische Reaktion"],
            ])
        },
        {
            key: 'GCS4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Severe allergic reaction (with medical intervention)"],
                ["it", "Severe allergic reaction (with medical intervention)"],
                ["nl-be", "Hevige allergische reactie (met medische interventie)"],
                ["fr-be", "Réaction allergique grave (avec intervention médicale)"],
                ["de-be", "Schwere allergische Reaktion (mit medizinischer Intervention)"],
            ])
        },
        {
            key: 'GCS2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diarrhea"],
                ["it", "Diarrhea"],
                ["nl-be", "Diarree"],
                ["fr-be", "Diarrhée"],
                ["de-be", "Durchfall"],
            ])
        },
        {
            key: 'GCS3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Feeling of being feverish (not measured)"],
                ["it", "Feeling of being feverish (not measured)"],
                ["nl-be", "Gevoel van koorts (niet gemeten)"],
                ["fr-be", "Sensation de fièvre (non mesurée)"],
                ["de-be", "Gefühl von Fieber (nicht gemessen)"],
            ])
        },
        {
            key: 'GCS6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Fever (measured and above 38°C)"],
                ["it", "Fever (measured and above 38°C)"],
                ["nl-be", "Koorts boven de 38°c (gemeten)"],
                ["fr-be", "Fièvre (mesurée et supérieure à 38°C)"],
                ["de-be", "Fieber (gemessen und über 38°C)"],
            ])
        },
        {
            key: 'GCS5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Headache"],
                ["it", "Headache"],
                ["nl-be", "Hoofdpijn"],
                ["fr-be", "Maux de tête"],
                ["de-be", "Kopfschmerzen"],
            ])
        },
        {
            key: 'GCS7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Shortness of breath"],
                ["it", "Shortness of breath"],
                ["nl-be", "Kortademigheid"],
                ["fr-be", "L'essouflement"],
                ["de-be", "Kurzatmigkeit"],
            ])
        },
        {
            key: 'GCS8', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nausea or vomiting"],
                ["it", "Nausea or vomiting"],
                ["nl-be", "Misselijkheid of braken"],
                ["fr-be", "Des nausées ou des vommissements"],
                ["de-be", "Übelkeit oder Erbrechen"],
            ])
        },
        {
            key: 'GCS9', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Tiredness"],
                ["it", "Tiredness"],
                ["nl-be", "Moeheid"],
                ["fr-be", "La fatigue"],
                ["de-be", "Müdigkeit"],
            ])
        },
        {
            key: 'GCS10', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chest or stomach pain"],
                ["it", "Chest or stomach pain"],
                ["nl-be", "Pijn ter hoogte van borst of maag"],
                ["fr-be", "Des douleurs à la hauteur de la poitrine ou de l'estomac"],
                ["de-be", "Schmerzen in Höhe der Brust oder des Magens"],
            ])
        },
        {
            key: 'GCS11', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Painful and/or swollen arm at the vaccination site"],
                ["it", "Painful and/or swollen arm at the vaccination site"],
                ["nl-be", "Pijnlijke en/of gezwollen plek op de arm die geprikt is"],
                ["fr-be", "Un endroit douloureur et/ou enflé sur le bras qui a été piqué"],
                ["de-be", "Schmerzhafte und/ oder geschwollene Stelle an dem Arm, an dem geimpft wurde"],
            ])
        },
        {
            key: '12', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Muscle or joint pain"],
                ["it", "Muscle or joint pain"],
                ["nl-be", "Gewrichtspijn"],
                ["fr-be", "Des douleurs musculaires, articulaires"],
                ["de-be", "Muskelschmerzen, Gelenkschmerzen"],
            ])
        },
        {
            key: 'GCS14', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Swelling or cold feeling in arm or leg"],
                ["it", "Swelling or cold feeling in arm or leg"],
                ["nl-be", "Zwelling of koud aanvoelen van een arm of been"],
                ["fr-be", "Un gonflement ou une sensation de froid dans un bras ou une jambe"],
                ["de-be", "Schwellung oder kaltes Gefühl in einem Arm oder Bein"],
            ])
        },
        {
            key: 'GCS15', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            style: [{ key: 'className', value: 'w-100' }],
            content: new Map([
                ["en", "Other"],
                ["it", "Other"],
                ["nl-be", "Andere"],
                ["fr-be", "Autre"],
                ["de-be", "Andere"],
            ]),
            description: new Map([
                ["en", "Describe here (optional)"],
                ["it", "Describe here (optional)"],
                ["nl-be", "Beschrijf hier (optioneel in te vullen)"],
                ["fr-be", "Veuillez fournir une description ici (facultatif)"],
                ["de-be", "Beschreiben Sie es hier (optional einzutragen)"],
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
                ["en", "Select up to 3 options that are most applicable"],
                ["it", "Select up to 3 options that are most applicable"],
                ['nl-be', "Selecteer maximaal 3 opties die het meest van toepassing zijn"],
                ["fr-be", "Sélectionnez jusqu'à 3 options les plus pertinentes."],
                ["de-be", "Wählen Sie bis zu 3 Optionen, die am ehesten zutreffen."],
            ])),
            displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'countRule'))
        }
    );

    return editor.getItem();
}

export const VaccinationQuestions = {
    vacStart,
    hasVacGroup,
    vac,
    vaccineBrand,
    vaccineShots,
    dateFirstVaccine,
    dateSecondVaccine,
    vaccinePro,
    vaccineContra,
    sideEffects
};
