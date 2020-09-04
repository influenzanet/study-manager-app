import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings, generateTitleComponent, generateHelpGroupComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { initSingleChoiceGroup, initMultipleChoiceGroup, initSliderCategoricalGroup, initMatrixQuestion, ResponseRowCell } from "../editor-engine/utils/question-type-generator";
import { ComponentEditor } from "../editor-engine/survey-editor/component-editor";


const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';
const multipleChoiceKey = 'mcg';
const dropDownKey = 'ddg'
const sliderCategoricalKey = "scc"
const inputKey = "ic"
const matrixKey = "mat"

export const generateNLIntake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "About You"],
            ["de", "Über Dich"],
            ["nl", "Achtergrond informatie"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "The intake survey focues on some background and demographic information."],
            ["de", "In diesem ersten Fragebogen geht es darum, ein paar grundlegende Informationen über Dich zu erfahren."],
            ["nl", "In dit aanmeldingsformulier vragen we om achtergrond informatie."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "This will take 5 minutes."],
            ["de", "5 min."],
            ["nl", "Invullen duurt 5 minuten."],
        ])
    ));
    // max item per page
    // set prefill rules
    // set context rules


    const rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;

    // gender --------------------------------------
    const q1 = survey.addNewSurveyItem({ itemKey: 'Q1' }, rootKey);
    if (!q1) { return; }
    survey.updateSurveyItem(q1_def(q1));
    // -----------------------------------------

    // birthday --------------------------------------
    const q2 = survey.addNewSurveyItem({ itemKey: 'Q2' }, rootKey);
    if (!q2) { return; }
    survey.updateSurveyItem(q2_def(q2));
    // -----------------------------------------

    // postcode --------------------------------------
    const q3 = survey.addNewSurveyItem({ itemKey: 'Q3' }, rootKey);
    if (!q3) { return; }
    survey.updateSurveyItem(q3_def(q3));
    // -----------------------------------------

    //survey.addNewSurveyItem({ itemKey: 'pbQ5', type: 'pageBreak' }, rootKey);

    // main activity --------------------------------------
    const q4 = survey.addNewSurveyItem({ itemKey: 'Q4' }, rootKey);
    if (!q4) { return; }
    survey.updateSurveyItem(q4_def(q4));
    // -----------------------------------------

    // school/work postal code  --------------------------------------
    //const q4b = survey.addNewSurveyItem({ itemKey: 'Q4b' }, rootKey);
    //if (!q4b) { return; }
    //survey.updateSurveyItem(q4b_def(q4b, q4.key));
    // -----------------------------------------

    // job category NL --------------------------------------
    const q4cNL = survey.addNewSurveyItem({ itemKey: 'Q4cNL' }, rootKey);
    if (!q4cNL) { return; }
    survey.updateSurveyItem(q4cNL_def(q4cNL, q4.key));
    // -------------------------------------------------------

    // job sub-category education NL --------------------------------------
    const q4cNLb = survey.addNewSurveyItem({ itemKey: 'Q4cNLb' }, rootKey);
    if (!q4cNLb) { return; }
    survey.updateSurveyItem(q4cNLb_def(q4cNLb, q4cNL.key));
    // -------------------------------------------------------

    // job sub-category health care NL --------------------------------------
    const q4cNLc = survey.addNewSurveyItem({ itemKey: 'Q4cNLc' }, rootKey);
    if (!q4cNLc) { return; }
    survey.updateSurveyItem(q4cNLc_def(q4cNLc, q4cNL.key));
    // -------------------------------------------------------

    // highest education --------------------------------------
    const q4d = survey.addNewSurveyItem({ itemKey: 'Q4d' }, rootKey);
    if (!q4d) { return; }
    survey.updateSurveyItem(q4d_def(q4d));
    // -------------------------------------------------------

    // people you meet  --------------------------------------
    const q5 = survey.addNewSurveyItem({ itemKey: 'Q5' }, rootKey);
    if (!q5) { return; }
    survey.updateSurveyItem(q5_def(q5));
    // -----------------------------------------

    // age groups  --------------------------------------
    const q6 = survey.addNewSurveyItem({ itemKey: 'Q6' }, rootKey);
    if (!q6) { return; }
    survey.updateSurveyItem(q6_def(q6));
    // -----------------------------------------

    // children/school/daycare  --------------------------------------
    const q6b = survey.addNewSurveyItem({ itemKey: 'Q6b' }, rootKey);
    if (!q6b) { return; }
    survey.updateSurveyItem(q6b_def(q6b, q6.key));
    // -----------------------------------------

    //survey.addNewSurveyItem({ itemKey: 'pbOutside', type: 'pageBreak' }, rootKey);

    // means of transport  --------------------------------------
    const q7 = survey.addNewSurveyItem({ itemKey: 'Q7' }, rootKey);
    if (!q7) { return; }
    survey.updateSurveyItem(q7_def(q7));
    // -----------------------------------------

    // public transport duration  --------------------------------------
    const q7b = survey.addNewSurveyItem({ itemKey: 'Q7b' }, rootKey);
    if (!q7b) { return; }
    survey.updateSurveyItem(q7b_def(q7b));
    // -----------------------------------------

    // Previous exposure with COVID --------------------------------------
    const q20NL = survey.addNewSurveyItem({ itemKey: 'Q20NL' }, rootKey);
    if (!q20NL) { return; }
    survey.updateSurveyItem(q20NL_def(q20NL));
    // -----------------------------------------

    // Previous exposure with COVID test -------------------------------------
    const q20NLb = survey.addNewSurveyItem({ itemKey: 'Q20NLb' }, rootKey);
    if (!q20NLb) { return; }
    survey.updateSurveyItem(q20NLb_def(q20NLb, q20NL.key));
    // -----------------------------------------

    // Previous exposure with COVID test -------------------------------------
    const q20NLc = survey.addNewSurveyItem({ itemKey: 'Q20NLc' }, rootKey);
    if (!q20NLc) { return; }
    survey.updateSurveyItem(q20NLc_def(q20NLc, q20NL.key));
    // -----------------------------------------

    //survey.addNewSurveyItem({ itemKey: 'pbMedBackground', type: 'pageBreak' }, rootKey);
    
    // common cold how often  --------------------------------------
    const q8 = survey.addNewSurveyItem({ itemKey: 'Q8' }, rootKey);
    if (!q8) { return; }
    survey.updateSurveyItem(q8_def(q8));
    // -----------------------------------------

    // flu vaccine last season --------------------------------------
    const q9 = survey.addNewSurveyItem({ itemKey: 'Q9' }, rootKey);
    if (!q9) { return; }
    survey.updateSurveyItem(q9_def(q9));
    // -----------------------------------------

    // flue vaccine this season --------------------------------------
    const q10 = survey.addNewSurveyItem({ itemKey: 'Q10' }, rootKey);
    if (!q10) { return; }
    survey.updateSurveyItem(q10_def(q10));
    // -----------------------------------------

    // flue vaccine this season when --------------------------------------
    const q10b = survey.addNewSurveyItem({ itemKey: 'Q10b' }, rootKey);
    if (!q10b) { return; }
    survey.updateSurveyItem(q10b_def(q10b, q10.key));
    // -----------------------------------------

    // flue vaccine reason for --------------------------------------
    const q10c = survey.addNewSurveyItem({ itemKey: 'Q10c' }, rootKey);
    if (!q10c) { return; }
    survey.updateSurveyItem(q10c_def(q10c, q10.key));
    // -----------------------------------------

    // flue vaccine reason against --------------------------------------
    const q10d = survey.addNewSurveyItem({ itemKey: 'Q10d' }, rootKey);
    if (!q10d) { return; }
    survey.updateSurveyItem(q10d_def(q10d, q10.key));
    // -----------------------------------------

    //survey.addNewSurveyItem({ itemKey: 'pbMedications', type: 'pageBreak' }, rootKey);

    // regular medication --------------------------------------
    const q11 = survey.addNewSurveyItem({ itemKey: 'Q11' }, rootKey);
    if (!q11) { return; }
    survey.updateSurveyItem(q11_def(q11));
    // -----------------------------------------

    // pregnant --------------------------------------
    const q12 = survey.addNewSurveyItem({ itemKey: 'Q12' }, rootKey);
    if (!q12) { return; }
    survey.updateSurveyItem(q12_def(q12, q1.key));
    // -----------------------------------------

    // trimester --------------------------------------
    const q12b = survey.addNewSurveyItem({ itemKey: 'Q12b' }, rootKey);
    if (!q12b) { return; }
    survey.updateSurveyItem(q12b_def(q12b, q12.key));
    // -----------------------------------------

    // do you smoke --------------------------------------
    const q13 = survey.addNewSurveyItem({ itemKey: 'Q13' }, rootKey);
    if (!q13) { return; }
    survey.updateSurveyItem(q13_def(q13));
    // -----------------------------------------

    //survey.addNewSurveyItem({ itemKey: 'pbQ14', type: 'pageBreak' }, rootKey);

    // allergies --------------------------------------
    const q14 = survey.addNewSurveyItem({ itemKey: 'Q14' }, rootKey);
    if (!q14) { return; }
    survey.updateSurveyItem(q14_def(q14));
    // -----------------------------------------

    // special diet --------------------------------------
    const q15 = survey.addNewSurveyItem({ itemKey: 'Q15' }, rootKey);
    if (!q15) { return; }
    survey.updateSurveyItem(q15_def(q15));
    // -----------------------------------------

    // pets --------------------------------------
    const q16 = survey.addNewSurveyItem({ itemKey: 'Q16' }, rootKey);
    if (!q16) { return; }
    survey.updateSurveyItem(q16_def(q16));
    // -----------------------------------------


    // how did you find us --------------------------------------
    //const q17 = survey.addNewSurveyItem({ itemKey: 'Q17' }, rootKey);
    //if (!q17) { return; }
    //survey.updateSurveyItem(q17_def(q17));
    // -----------------------------------------


    //survey.addNewSurveyItem({ itemKey: 'pblast', type: 'pageBreak' }, rootKey);

    const final_text = survey.addNewSurveyItem({ itemKey: 'finalText' }, rootKey);
    if (!final_text) { return; }
    survey.updateSurveyItem(qfinaltext_def(final_text));

    return survey.getSurvey();
}

const qfinaltext_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "This was all for now, please submit your responses. Please come back and find a different survey about how you feel and your health status."],
                ["de", "Danke, das war die letzte Frage. Du kannst Deine Antworten nun absenden. Bitte schaue wieder vorbei. Das nächste mal gibt es einen Fragebogen über wie Du Dich fühlst und Deinen Gesundheitszustand."],
                ["nl", "Dank u wel. Dit was de laatste vraag. Na het opslaan kunt u verder met het melden of uw wel of geen klachten had in de afgelopen week"],
            ]))
        }
    )
    return editor.getItem();
}

const q1_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your gender?"],
            ["de", "Welches Geschlecht hast Du?"],
            ["nl", "Wat is uw geslacht?"],
            ["fr", " Quel est votre sexe?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether the chance of getting flu is different between genders."],
                    ["de", "Um herauszufinden, ob das Risiko, an der Grippe zu erkranken vom Geschlecht abhängt."],
                    ["nl", "Om te kijken naar verschillen tussen mannen en vrouwen"],
                    ["fr", "Pour savoir si le risque de contracter la grippe est différent entre hommes et femmes."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "male"],
                ["de", "männlich"],
                ["nl", "Man"],
                ["fr", "Homme"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "female"],
                ["de", "weiblich"],
                ["nl", "Vrouw"],
                ["fr", "Femme"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "other"],
                ["de", "divers"],
                ["nl", "Anders"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });
    
    return editor.getItem();
}

const q2_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your date of birth (month and year)?"],
            ["de", "Wann bist Du geboren (Monat und Jahr)?"],
            ["nl", "Wanneer bent u geboren (maand en jaar)?"],
            ["fr", "Quelle est votre date de naissance (mois et année)"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "The chance of getting COVID-19 and the risk of more serious complications vary by age."],
                    ["de", "Das Risiko an COVID-19 zu erkranken und das Risiko ernster Komplikationen variiert mit dem Alter."],
                    ["nl", "Om te kijken naar verschillen tussen leeftijdsgroepen."],
                    ["fr", "Les chances de contracter la grippe et les risques de complications varient selon l'âge."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

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
        style: [{ key: 'variant', value: 'caption' }],
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
                code: 'de', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' Jahre alt' }
                ]
            },
            {
                code: 'nl', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' jaren oud' }
                ]
            },
            {
                code: 'fr', parts: [
                    { dtype: 'exp', exp: expWithArgs('dateResponseDiffFromNow', editor.getItem().key, [responseGroupKey, '1'].join('.'), 'years', 1) },
                    { str: ' ??' }
                ]
            }
        ]
    }, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q3_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is the first part of your home postcode (the part before the space)?"],
            ["de", "Wie lautet der Anfang Ihrer Postleitzahl (der Teil vor dem Leerzeichen)?"],
            ["nl", "Wat zijn de eerste vier cijfers van je postcode?"],
            ["fr", "Quelle est le code postal de votre domicile?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is, and to see whether the chance of getting flu varies across the country."],
                    ["de", "Um zu prüfen, wie repräsentativ unsere Stichprobe ist und ob das Risiko, an der Grippe zu erkranken, innerhalb eines Landes variiert."],
                    ["nl", "We doen onderzoek naar de regionale verspreiding van infecties"],
                    ["fr", "Pour vérifier la représentativité de notre échantillon et pour voir si le risque de contracter la grippe varie à travers le pays."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please choose the first part of the post-code (the part before the space)."],
                    ["de", "Bitte wählen Sie den Anfang Ihrer Postleitzahl (der Teil vor dem Leerzeichen)."],
                    ["nl", "Het gaat alleen om de eerste 4 cijfers van uw postcode (dus niet de letters)"],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'input',
            content: new Map([
                ["en", "Postcode:"],
                ["de", "Postleitzahl"],
                ["nl", "Postcode"],
                ["fr", "Code postal"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiß nicht bzw. ich erinnere mich nicht"],
                ["nl", "Dit wil ik niet aangeven"],
                ["fr", "Je ne sais pas / Je ne m'en souviens plus"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q4_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your main activity?"],
            ["de", "Was ist Ihre Hauptbeschäftigung?"],
            ["nl", "Wat is je voornaamste bezigheid overdag? Ga uit van de normale situatie (dus zonder eventuele corona maatregelen)"],
            ["fr", "Quelle est votre activité principale?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is compared to the population as a whole, and to find out whether the chance of getting flu is different for people in different types of occupation."],
                    ["de", "Um zu prüfen, wie repräsentativ unserer Stichprobe - im Vergleich zur Gesamtbevölkerung - ist. Sowie um herauszufinden, ob das Risiko, an der Grippe zu erkranken, für Menschen mit verschiedenen Berufen variiert."],
                    ["nl", "Met deze informatie kunnen we zien of de mensen die meedoen representatief zijn voor de bevolking"],
                    ["fr", "Afin de vérifier la représentativité de notre échantillon comparée à la population dans son ensemble, et savoir si le risque de contracter la grippe est différent pour les personnes ayant différents types d'occupation."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", 'Please, tick the box that most closely resembles your main occupation. For pre-school children who don\'t go to daycare tick the "other" box.'],
                    ["de", 'Für Vorschulkinder, die nicht in die Tagespflege gehen, wählen Sie bitte „andere“ aus.'],
                    ["nl", 'Selecteer wat van toepassing is. Voor kinderen die te jong zijn - selecteer "anders".'],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Paid employment, full time"],
                ["de", "Bezahlte Beschäftigung (Vollzeit)"],
                ["nl", "Ik werk fulltime in loondienst"],
                ["fr", "Employé à plein temps"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Paid employment, part time"],
                ["de", "Bezahlte Beschäftigung (Teilzeit)"],
                ["nl", "Ik werk parttime in loondienst"],
                ["fr", "Employé à temps partiel"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Self-employed (businessman, farmer, tradesman, etc.)"],
                ["de", "Selbstständig (UnternehmerIn, LandwirtIn, HändlerIn, usw.)"],
                ["nl", "Ik werk als zelfstandige/ondernemer"],
                ["fr", "Indépendant (homme d'affaires , agriculteur , commerçant, etc.)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Attending daycare/school/college/university"],
                ["de", "Tagespflege/ Schule/ Hochschule/ Universität"],
                ["nl", "Ik ben een scholier of student"],
                ["fr", "Ecolier, étudiant (garderie / école / université)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Home-maker (e.g. housewife)"],
                ["de", "Im Haushalt tätig (z.B. Hausfrau/ Hausmann)"],
                ["nl", "Ik ben huisman/huisvrouw"],
                ["fr", "Femme/homme au foyer"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Unemployed"],
                ["de", "Arbeitslos"],
                ["nl", "Ik ben werkloos"],
                ["fr", "Sans-emploi"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Long-term sick-leave or parental leave"],
                ["de", "Langfristiger Krankenurlaub oder Elternzeit"],
                ["nl", "Ik ben thuis vanwege langdurige ziekte of zwangerschapsverlof"],
                ["fr", "En congé maladie à long terme, en congé maternité"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "Retired"],
                ["de", "Im Ruhestand"],
                ["nl", "Ik ben met pensioen"],
                ["fr", "Retraité"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
                ["nl", "Anders"],
                ["fr", "Autre"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q4b_def = (itemSkeleton: SurveyItem, q4Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is the first part of your school/college/workplace postcode? (Where you spend the majority of your work/study time)"],
            ["de", "Was ist der erste Teil der Postleitzahl Ihrer Schule/Hochschule/Arbeitsstelle? (Wo Sie den Großteil Ihrer Arbeitszeit/ Ihres Studiums ableisten)"],
            ["nl", "Wat zijn de eerste vier cijfers van de postcode van je werkplek/school/universiteit?"],
            ["fr", "Quelle est le code postal de l'endroit où vous passez la majorité de votre temps de travail ou d'étude?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q4Key, [responseGroupKey, singleChoiceKey].join('.'), '0', '1', '2')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out roughly how far you travel on a regular basis."],
                    ["de", "Um abzuschätzen, wie weit Sie regelmässig reisen."],
                    ["nl", "Om uw dagelijkse reisafstand te schatten"],
                    ["fr", "Pour avoir une estimation grossière de vos déplacements réguliers."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please, choose the first part of the post-code (the part before the space)."],
                    ["de", "Wählen Sie bitte den ersten Teil der Postleitzahl (der Teil von dem Leerzeichen)."],
                    ["nl", "Het gaat alleen om de eerste 4 cijfers van uw postcode (dus niet de letters)"],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'input',
            content: new Map([
                ["en", "Postcode:"],
                ["de", "Postleitzahl"],
                ["nl", "Postcode"],
                ["fr", "Code postal"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiß nicht bzw. ich erinnere mich nicht"],
                ["nl", "Dat weet ik niet"],
                ["fr", "Je ne sais pas / Je ne m'en souviens plus"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Not applicable (e.g. don't have a fixed workplace)"],
                ["de", "Keine Angabe möglich (z.B. falls Sie keinen festen Arbeitsort besitzen)"],
                ["nl", "Niet van toepassing/ik heb geen vaste werkplek"],
                ["fr", "Non applicable (p. ex. je n'ai pas de lieu de travail fixe)"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q4d_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is the highest level of formal education/qualification that you have?"],
            ["de", "Was ist die höchste Stufe formaler Ausbildung/ Qualifikation, die Sie aufweisen?"],
            ["nl", "Wat is je hoogst voltooide opleiding?"],
            ["fr", " Quel est votre plus haut niveau d'éducation/qualification formelle?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is compared to the population of the UK (Italy, Belgium..) as a whole."],
                    ["de", "Um zu prüfen, wie repräsentativ unsere Stichprobe - im Vergleich zur gesamten Bevölkerung der Schweiz - ist."],
                    ["nl", "Met deze informatie kunnen we zien of ons cohort (iederdeen die deelneemt) wel representatief is voor de bevolking"],
                    ["fr", "Afin de vérifier la représentativité de notre échantillon comparée à la population suisse dans son ensemble."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet u deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please choose the box that represents your HIGHEST level of educational achievements. The different option rougly equate to: 1 - no qualifications, 2 - school-leaving exams at around 16 years of age, 3 - school-leaving exams at around 18 years of age, 4 - University degree or equivalent professional qualification, 5 - Higher degree or advanced professional qualification. If you are an adult who is currently undergoing part - time training(e.g.night school) then tick the box that represents your current highest level of education."],
                    ["de", "Bitte wählen Sie die Option, die Ihrer HÖCHSTEN Ausbildung entspricht. Die verschiedenen Optionen entsprechen in etwa: 1 - keine Qualifikation, 2 – Schulabschlussprüfung im Alter von ca. 16 Jahren, 3 – Schulabschlussprüfung im Alter von ca. 18 Jahren, 4 – Universitätsabschluss oder vergleichbare fachliche Qualifikation, 5 – Höherer Abschluss oder fortgeschrittene fachliche Qualifikation. Falls Sie ein Erwachsener sind, der im Augenblick eine Teilzeitausbildung absolviert (z.B. Abendschule), wählen Sie bitte die Option die Ihrer derzeitigen höchsten Qualifikation entspricht."],
                    ["de", "Geef aan wat uw hoogste diploma is"],
                    ["fr", "Cochez la case qui correspond à votre plus haut niveau d'éducation scolaire. Les différentes options équivalent à 1 - pas de qualifications, 2 - examens de fin de scolarité à environ 16 ans, 3 - examens de fin de scolarité à environ 18 ans, 4 - diplôme universitaire ou qualification professionnelle équivalente, 5 - diplôme ou qualification professionnelle avancé.Si vous êtes un adulte actuellement en cours de formation à temps partiel(p.ex.cours du soir) cochez la case qui représente votre plus haut niveau actuel de l'éducation."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I have no formal qualification"],
                ["de", "Ich habe keine formale Qualifikation"],
                ["nl", "Ik heb geen officiële diploma's of alleen lager onderwijs"],
                ["fr", "Aucune qualification"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "GCSE's, levels, CSEs or equivalent"],
                ["de", "Realschulabschluss, Qualifizierender Hauptschulabschluss oder gleichwertig"],
                ["nl", "Mavo of VMBO"],
                ["fr", "Scolarité obligatoire"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "A-levels or equivalent (e.g. Higher, NVQ Level3, BTEC)"],
                ["de", "Abitur, Fachabitur oder gleichwertig"],
                ["nl", "Havo, VWO, of MBO"],
                ["fr", "Maturité fédérale, maturité professionnelle"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Batchelors Degree (BA, BSc) or equivalent"],
                ["de", "Bachelor oder gleichwertig"],
                ["nl", "HBO of WO Bachelor"],
                ["fr", "Diplôme de Bachelor ou équivalent"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Higher Degree or equivalent (e.g. Masters Degree, PGCE, PhD, Medical Doctorate, Advanced Professional Award)"],
                ["de", "Höherer Abschluss oder gleichwertig (z.B. Master, Diplom, PhD, MBA)"],
                ["nl", "WO master of PhD (doctor)"],
                ["fr", "Diplôme de Master ou équivalent, PhD, doctorat en médecine (MD)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I am still in education"],
                ["de", "Ich befinde mich noch in Ausbildung"],
                ["nl", "Dat wil ik niet aangeven"],
                ["fr", "Je suis encore étudiant"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q5_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Except people you meet on public transports, do you have contact with any of the following during the course of a typical day?"],
            ["de", "Hast Du irgendwelche der folgenden Kontakte im Laufe eines typischen Tages? (ausgenommen Menschen, denen Du in öffentlichen Verkehrsmitteln begegnest)"],
            ["nl", "Heb je tijdens een normale dag (dus zonder corona maatregelen) contact met:"],
            ["fr", " A part les gens que vous croisez dans les transports publics, avez-vous des contacts avec un ou plusieurs des groupes suivants au cours d'une journée typique?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether you are likely to be exposed to more infection risk than the average person (e.g. work with children, or patients)."],
                    ["de", "Wir wollen herausfinden, ob Du einem höhren Ansteckungsrisiko ausgesetzt bist als eine Durchschnittsperson (z.B. durch Arbeit mit Kindern oder Patienten)."],
                    ["nl", "Om uit te zoeken of contact met deze groepen het risico op klachten beïnvloedt"],
                    ["fr", "Pour savoir si vous êtes susceptible d'être exposés à la grippe plus que la moyenne (p. ex. via une votre travail avec des enfants ou des patients)."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "Hint:"],
                    ["de", "Hinweis:"],
                    ["nl", "Uitleg:"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Groups of people could include any setting where you come into contact with large numbers of people at once, e.g. a teacher who may contact many children in a day."],
                    ["de", "Als Gruppen von Menschen zählt jede Gelegenheit, bei der Du in Kontakt mit einer großen Anzahl von Menschen kommst (z.B. ein Lehrer, der jeden Tag Kontakt zu Schülern hat)."],
                    ["nl", "Voor groepen mensen kan het gaan om elke situatie waar er contact is met meer dan 10 personen tegelijk"],
                    ["fr", "Sélectionnez les groupes de personnes avec lesquelles vous êtes en contact au cours d'une journée (p. ex. un enseignant peut interagir avec de nombreux enfants dans une journée)."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ['nl', 'Selecteer alle opties die relevant zijn (laat contacten in het openbaar vervoer buiten beschouwing)'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "More than 10 children or teenagers"],
                ["de", "mehr als 10 Kinder oder Jugendliche"],
                ["nl", "Meer dan 10 kinderen of jongeren"],
                ["fr", " Plus de 10 enfants ou adolescents au cours de la journée"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "More than 10 people aged over 65"],
                ["de", "mehr als 10 Menschen im Alter von über 65 Jahren"],
                ["nl", "Meer dan 10 mensen van 65 jaar en ouder"],
                ["fr", " Plus de 10 personnes âgées de plus de 65 ans au cours de la journée"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "Patients"],
                ["de", "Patienten"],
                ["nl", "Patiënten"],
                ["fr", "Patients"],
            ])
        }, {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "Groups of people (more than 10 individuals at any one time)"],
                ["de", "Gruppen von Menschen (mehr als 10 Individuen auf einmal)"],
                ["nl", "Groepen mensen groter dan 10 personen"],
                ["fr", "Groupe de personnes (plus de 10 personnes à un moment donné )"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "None of the above"],
                ["de", "keines der oben aufgeführten"],
                ["nl", "Geen van de bovenstaande antwoorden is van toepassing"],
                ["fr", " Aucune des réponses ci-dessus"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q6_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "INCLUDING YOU, how many people in each of the following age groups live in your household?"],
            ["de", "Wie viele Menschen der folgenden Altersgruppen leben in Deinem Haushalt? (DICH EINGESCHLOSSEN)"],
            ["nl", "INCLUSIEF JEZELF: hoeveel personen van de verschillende leeftijdsgroepen wonen er in je huishouden?"],
            ["fr", " VOUS Y COMPRIS, combien de personnes de chaque groupe d'âge suivants vivent dans votre maison?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Members of larger households, or those with children, may more likely get infected than the others."],
                    ["de", "Mitglieder von größeren Haushalten oder Haushalten mit Kindern könnten ein höheres Risiko als andere haben, sich zu infizieren."],
                    ["nl", "De samenstelling van het huishouden kan invloed hebben op het risico van infectie, dit willen we graag onderzoeken"],
                    ["fr", "Les membres des ménages les plus grands, ou ceux possédant des enfants, peuvent être plus susceptibles d'attraper la grippe que les autres."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const ddg: ResponseRowCell = {
        key: 'col2', role: 'dropDownGroup',
        items: [
            {
                key: '0', role: 'option', content: new Map([
                    ["en", "0"],
                    ["de", "0"],
                    ["nl", "0"],
                    ["fr", "0"],
                ])
            },
            {
                key: '1', role: 'option', content: new Map([
                    ["en", "1"],
                    ["de", "1"],
                    ["de", "1"],
                    ["fr", "1"],
                ]),
            }, {
                key: '2', role: 'option', content: new Map([
                    ["en", "2"],
                    ["de", "2"],
                    ["nl", "2"],
                    ["fr", "2"],
                ]),
            }, {
                key: '3', role: 'option', content: new Map([
                    ["en", "3"],
                    ["de", "3"],
                    ["nl", "3"],
                    ["fr", "3"],
                ]),
            }, {
                key: '4', role: 'option', content: new Map([
                    ["en", "4"],
                    ["de", "4"],
                    ["nl", "4"],
                    ["fr", "4"],
                ]),
            }, {
                key: '5', role: 'option', content: new Map([
                    ["en", "5"],
                    ["de", "5"],
                    ["nl", "5"],
                    ["fr", "5"],
                ]),
            }, {
                key: '6', role: 'option', content: new Map([
                    ["en", "6"],
                    ["de", "6"],
                    ["nl", "6"],
                    ["fr", "6"],
                ]),
            }, {
                key: '7', role: 'option', content: new Map([
                    ["en", "7"],
                    ["de", "7"],
                    ["nl", "7"],
                    ["fr", "7"],
                ]),
            }, {
                key: '8', role: 'option', content: new Map([
                    ["en", "8"],
                    ["de", "8"],
                    ["nl", "8"],
                    ["fr", "8"],
                ]),
            }, {
                key: '9', role: 'option', content: new Map([
                    ["en", "9"],
                    ["de", "9"],
                    ["nl", "9"],
                    ["fr", "9"],
                ]),
            },

        ]
    };

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: '1', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "0 - 4 years"],
                        ["de", "0 - 4 Jahre"],
                        ["nl", "0 - 4 jaar"],
                        ["fr", "0 - 4 ans"],
                    ])
                },
                { ...ddg }
            ],
        },
        {
            key: '2', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "5 - 18 years"],
                        ["de", "5 - 18 Jahre"],
                        ["nl", "5 - 18 jaar"],
                        ["fr", "5 - 18 ans"],
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
                        ["en", "19 - 44 years"],
                        ["de", "19 - 44 Jahre"],
                        ["nl", "19 - 44 jaar"],
                        ["fr", "19 - 44 ans"],
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
                        ["en", "45 - 64 years"],
                        ["de", "45 - 64 Jahre"],
                        ["nl", "45 - 64 jaar"],
                        ["fr", "45 - 64 ans"],
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
                        ["en", "65+"],
                        ["de", "65+"],
                        ["nl", "65 of ouder"],
                        ["fr", "plus de 65 ans"],
                    ])
                },
                { ...ddg }
            ]
        }
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q6b_def = (itemSkeleton: SurveyItem, q6Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How many of the children in your household go to school or day-care?"],
            ["de", "Wie viele Kinder aus Deinem Haushalts gehen zur Schule oder in eine Kindertagesstätte?"],
            ["nl", "Hoeveel van de kinderen in je huishouden zitten op school of een kinderdagverblijf (of peuterspeelzaal)? Ga uit van de normale situatie (dus zonder eventuele corona maatregelen)"],
            ["fr", "Combien d'enfants de votre ménage vont à l'école ou à la garderie?"],
        ]))
    );


    editor.setCondition(
        expWithArgs('or',
            expWithArgs('responseHasOnlyKeysOtherThan', [q6Key].join('.'), [responseGroupKey, matrixKey, '1', 'col2'].join('.'), '0'),
            expWithArgs('responseHasOnlyKeysOtherThan', [q6Key].join('.'), [responseGroupKey, matrixKey, '2', 'col2'].join('.'), '0')
        )
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Attending school or day-care may be a risk for acquiring certain virus based illnesses. We would like to check this."],
                    ["de", "Der Besuch einer Schule oder KiTa könnte ein Risiko für bestimmte Viruserkrankungen darstellen. Wir würden dies gerne überprüfen."],
                    ["nl", "Het bezoeken van een school of kinderdagverblijf kan het risico voor infecties verhogen. Of dit het geval is en in welke mate willen we graag onderzoeken"],
                    ["fr", "Fréquenter l'école ou à la garderie pourrait augmenter les risques de contracter la grippe et des maladies similaires. Nous tenons à le vérifier."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik antwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "If the child is attending regular school or day-care (even this is just one day a week) then please count it. Attendance of clubs and activities does not count - even if regular."],
                    ["de", "Es zählt, falls das Kind regelmässig die Schule oder eine KiTa besucht (auch wenn es nur ein Tag pro Woche ist). Anwesenheit in Vereinen oder andere Aktivitäten zählen nicht, auch dann nicht, wenn Sie regelmässig sind."],
                    ["nl", "Zelfs als het kind slechts 1 maal per week naar een kinderdagverblijf gaat, geef dit dan aan (clubs en verenigingen tellen niet mee)"],
                    ["fr", "Cochez oui si votre enfant fréquente régulièrement l'école ou à la garderie (même seulement un jour par semaine ). La fréquentation d'autres clubs ou activités, même régulière, ne compte pas."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "None"],
                ["de", "Keine"],
                ["nl", "Geen"],
                ["fr", "Aucun"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "1"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "2"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "3"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "4"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "5"],
            ])
        },
        {
            key: '99', role: 'option',
            content: new Map([
                ["en", "More than 5"],
                ["de", "mehr als 5"],
                ["nl", "Meer dan 5"],
                ["fr", "Plus de 5"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q7_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your main means of transport?"],
            ["de", "Was ist Dein Haupttransportmittel?"],
            ["nl", "Hoe verplaatst je zich meestal? Ga uit van de normale situatie (dus zonder eventuele corona maatregelen)"],
            ["fr", " Quel est votre principal moyen de transport ?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "It has been suggested that using public transport may be a risk for infection. We would like to check this."],
                    ["de", "Es kann sein, dass die Benutzung von öffentlichen Verkehrsmitteln ein höheres Risiko für eine Infektion darstellt. Wir wollen das überprüfen."],
                    ["nl", "Veel mensen denken dat het openbaar vervoer een risico op infecties met zich mee brengt, wij hopen dit te onderzoeken"],
                    ["fr", "Il a été suggéré que l'utilisation des transports publics augmente les risques de contracter la grippe. Nous tenons à le vérifier."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik antwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick the option that best represents your most normal mode of transport."],
                    ["de", "Wähle die Option, die am besten Deinem normalerweise verwendeten Transportmittel entspricht."],
                    ["nl", "Ga uit van de normale situatie en uw meest gangbare - dagelijkse - manier van verplaatsen"],
                    ["fr", "Cochez l'option qui représente le mieux votre mode de transport habituel."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Walking"],
                ["de", "zu Fuß"],
                ["nl", "Lopend"],
                ["fr", "La marche"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Bike"],
                ["de", "Fahrrad"],
                ["nl", "Op de fiets"],
                ["fr", "Le vélo"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Motorbike/scooter"],
                ["de", "Motorrad/Roller"],
                ["nl", "Met de scooter of motor"],
                ["fr", "Le scooter, la moto"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Car"],
                ["de", "Auto"],
                ["nl", "Met de auto"],
                ["fr", "La voiture"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Public transportation (bus, train, tube, etc)"],
                ["de", "öffentliche Verkehrsmittel (Bus, Zug, U-Bahn, usw.)"],
                ["nl", "Met het openbaar vervoer (bus, trein, metro, tram, enz.)"],
                ["fr", "Transports publics (bus, train, métro, etc)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Other"],
                ["de", "andere"],
                ["nl", "Anders"],
                ["fr", "Autre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q7b_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "On a normal day, how much time do you spend on public transport? (Bus, train, tube etc.)"],
            ["de", "Wie viel Zeit verbringst Du an einem gewöhnlichen Tag in öffentlichen Verkehrsmitteln? (Bus, Zug, U-Bahn, usw.)"],
            ["nl", "Hoeveel tijd breng je op een normale dag door in het openbaar vervoer? Ga uit van de normale situatie (dus zonder eventuele corona maatregelen)"],
            ["fr", "Dans une journée normale, combien de temps passez-vous dans les transports publics? (bus, train, métro, etc.)"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "It has been suggested that using public transport may be a risk for getting flu. We would like to check this."],
                    ["de", "Es kann sein, dass die Benutzung von öffentlichen Verkehrsmitteln ein höheres Risiko für eine Infektion darstellt. Wir wollen das überprüfen."],
                    ["nl", "Veel mensen denken dat het openbaar vervoer een risico op infecties met zich mee brengt, wij hopen dit te onderzoeken"],
                    ["fr", "Il a été suggéré que l'utilisation des transports publics augmente les risques de contracter la grippe. Nous tenons à le vérifier."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik dit beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Think of a typical day. If you use several different forms of public transport each day, remember to include all journeys. Don't include taxis or other forms of private transport."],
                    ["de", "Denke an einen gewöhnlichen Tag. Falls Du mehrere verschiedene Transportmittel benutzt, beziehe alle Reiseabschnitte mit ein. Taxis und andere private Transportmittel zählen allerdings nicht dazu."],
                    ["nl", "Denk aan een typische dag. Als u verschillende vormen van openbaar vervoer gebuikt tel dan de duur bij elkaar op."],
                    ["fr", "Pensez à une journée typique: si vous utilisez plusieurs formes de transports en commun chaque jour, rappelez-vous d'inclure tous les voyages. N'incluez pas les taxis ou les autres formes de transport privé."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No time at all"],
                ["de", "gar nicht"],
                ["nl", "Ik ga normaal niet met het openbaar vervoer"],
                ["fr", "Pas de temps du tout"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "0-30 minutes"],
                ["de", "unter 30 Minuten"],
                ["nl", "0 tot 30 minuten"],
                ["fr", "0-30 minutes"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "30 minutes - 1.5 hours"],
                ["de", "30 - 90 Minuten"],
                ["nl", "30 minuten tot 1,5 uur"],
                ["fr", "30 minutes - 1.5 heures"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "1.5 hours - 4 hours"],
                ["de", "90 Minuten – 4 Stunden"],
                ["nl", "1,5 uur tot 4 uur"],
                ["fr", "1.5 - 4 heures"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Over 4 hours"],
                ["de", "mehr als 4 Stunden"],
                ["nl", "Meer dan 4 uur"],
                ["fr", "Plus de 4 heures"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q8_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How often do you have common colds or flu-like diseases?"],
            ["de", "Wie oft hast Du eine gewöhnliche Erkältung oder grippeähnliche Erkrankungen?"],
            ["nl", "Hoe vaak heb je last van verkoudheid of griepachtige verschijnselen?"],
            ["fr", "Avez vous souvent le rhume ou des maladies de type grippal?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Never"],
                ["de", "nie"],
                ["nl", "Nooit"],
                ["fr", "Jamais"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Once or twice a year"],
                ["de", "ein- oder zweimal im Jahr"],
                ["nl", "1 of 2 keer per jaar"],
                ["fr", "1 ou 2 fois par an"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Between 3 and 5 times a year"],
                ["de", "zwischen 3 und 5 mal im Jahr"],
                ["nl", "Tussen 3 en 5 keer per jaar"],
                ["fr", "De 3 à 5 fois par an"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Between 6 and 10 times a year"],
                ["de", "zwischen 6 und 10 mal im Jahr"],
                ["nl", "Tussen 6 en 10 keer per jaar"],
                ["fr", "De 6 à 10 fois par an"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "More that 10 times a year"],
                ["de", "mehr als 10 mal"],
                ["nl", "Meer dan 10 keer per jaar"],
                ["fr", "Plus de 10 fois par an"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "keine Ahnung"],
                ["nl", "Dat weet ik niet"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q9_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you receive a flu vaccine during the last autumn/winter season? (2019-2020)"],
            ["de", "Hast du in der Herbst/Wintersaison 2019/2020 eine Grippeimpfung erhalten?"],
            ["nl", "Heb je in het afgelopen griepseizoen (2019/2020) een griepprik gehaald?"],
            ["fr", " Avez-vous été vacciné(e) contre la grippe lors de la dernière saison automne/hiver? (2018-2019)"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "We would like to be able to work out how much protection the vaccine gives. We would also like to find out if there is some protection from vaccines received in previous years."],
                    ["de", "Wir möchten in der Lage sein herauszufinden, wie viel Schutz die Impfung bietet. Wir möchten außerdem feststellen, ob ein gewisser Schutz durch Impfungen des vorausgehenden Jahres besteht."],
                    ["nl", "We willen de beschermende werking van het vaccin onderzoeken"],
                    ["fr", "Nous aimerions savoir à quel point la protection par le vaccin fonctionne. Nous aimerions aussi savoir si il y a une certaine protection par les vaccins reçus au cours des années précédentes."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet ik dit beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Report yes, if you received the vaccine this season, usually in the autumn."],
                    ["de", "Antworte mit ja, falls Du eine Impfung in der angegebenen Saison, normalerweise im Herbst 2018, erhalten hast."],
                    ["nl", "Zeg ja wanneer je de griepprik heeft gehad. Normaal ontvang je een griepprik in het najaar."],
                    ["fr", "Répondez oui si vous avez été vacciné cette saison, habituellement à l'automne. Si vous vous faites vacciner après avoir rempli ce questionnaire, merci de revenir et corriger votre réponse."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "weiß ich nicht"],
                ["nl", "Dat weet ik niet (meer)"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Are you planning to recieve a flu vaccine this autumn/winter season? (2020-2021)"],
            ["de", "Hast du eine Grippeimpfung in der Herbst-/ Wintersaison 2020/2021 erhalten?"],
            ["nl", "Ben je van plan om voor het komende griepseizoen (2020/2021) een griepprik te halen?"],
            ["fr", " Avez-vous été vacciné(e) contre la grippe cette année? (automne/hiver 2019-2020)"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Report yes, if you received the vaccine this season, usually in the autumn."],
                    ["de", "Antworte mit ja, falls Du eine Impfung in der angegebenen Saison, normalerweise im Herbst 2019, erhalten hast."],
                    ["nl", "We willen de beschermende werking van het vaccin onderzoeken"],
                    ["fr", "Nous aimerions savoir à quel point la protection par le vaccin fonctionne."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik dit beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Report yes, if you received the vaccine this season, usually in the autumn. If you get vaccinated after filling in this questionnaire, please return to this and update your answer."],
                    ["de", "Antworten Sie mit ja, falls Sie eine Impfung in dieser Saison, normalerweise im Herbst, erhalten haben. Falls Sie nach Beantwortung dieses Fragebogens geimpft werden, kehren Sie bitte hierher zurück und aktualisieren Sie Ihre Antwort."],
                    ["nl", "Zeg ja wanneer u van plan bent om de griepprik te nemen. Normaal ontvang je een griepprik in het najaar"],
                    ["fr", "Répondez oui si vous avez été vacciné cette saison, habituellement à l'automne. Si vous vous faites vacciner après avoir rempli ce questionnaire, merci de revenir et corriger votre réponse."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "weiß ich nicht"],
                ["nl", "Dat weet ik (nog) niet"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q10b_def = (itemSkeleton: SurveyItem, q10Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When were you vaccinated against flu in the season 2029/2020?"],
            ["de", "Wann wurdest du in der Saison 2019/2020 gegen Grippe geimpft?"],
            ["nl", "Wanneer ben je in het afgelopen griepseizoen (2019/2020) gevaccineerd tegen de griep?"],
            ["fr", "Quand avez-vous été vacciné contre la grippe cette saison? (2019-2020)"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q10Key, [responseGroupKey, singleChoiceKey].join('.'), '0')
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Knowing when people are vaccinated tells us how well the vaccination programme is being carried out."],
                    ["de", "Der Zeitpunkt der Impfung zeigt uns, wie gut die Impfprogramme ausgeführt werden."],
                    ["nl", "Het weten van de timing van vaccinatie is belangrijk om de effectiviteit te schatten"],
                    ["fr", "Savoir quand les gens sont vaccinés nous permet d'évaluer le succès des campagnes de vaccination."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe zal ik dit beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please, try and answer as accurately as possible. If you don't know the precise date, please give your best estimate. For instance, you might remember the month, then try and remember if it was at the beginning or the end of the month. Were there any significant events (e.g. a holiday or a birthday) that might help jog your memory?"],
                    ["de", "Bitte versuche so genau wie möglich zu antworten. Falls Du das genaue Datum nicht kennst, gib bitte eine bestmögliche Abschätzung. Falls Du z.B. den Monat weisst, versuche Dich zu erinnern, ob es am Anfang oder Ende des Monats war. Waren an diesem Tag vielleicht irgendwelche bedeutenden Ereignisse (z.B. ein Feiertag oder ein Geburtstag), die Deinem Gedächtnis weiterhelfen könnten?"],
                    ["nl", "Probeer zo goed mogelijk te antwoorden, de exacte datum is niet belangrijk, maar wel of het aan het begin of het eind van de maand was"],
                    ["fr", "Essayez de répondre le plus précisément possible. Si vous ne connaissez pas la date précise, donnez votre meilleure estimation. Par exemple, vous pouvez vous rappeler du mois, puis essayez de vous souvenir si c'était au début ou à la fin du mois. Essayez de vous servir d'événements importants (p. ex. vacances ou anniversaire) pour vous aider à vous rafraîchir la mémoire."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            content: new Map([
                ["en", "Choose date:"],
                ["de", "Wähle ein Datum:"],
                ["nl", "Kies datum:"],
                ["fr", "Sélectionner une date"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiß es nicht bzw. kann mich nicht erinnern"],
                ["nl", "Dat weet ik niet (meer)"],
                ["fr", "Je ne sais pas, je ne m'en souviens plus"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q10c_def = (itemSkeleton: SurveyItem, q10Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for getting a seasonal influenza vaccination this year?"],
            ["de", "Welche Gründe hattest Du, Dich impfen zu lassen?"],
            ["nl", "Wat zijn voor jouw de belangrijkste redenen om dit jaar een griepprik te halen?"],
            ["fr", "Quelles étaient vos motivations pour vous faire vacciner contre la grippe saisonnière cette année?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q10Key, [responseGroupKey, singleChoiceKey].join('.'), '0')
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen aus, die zutreffen'],
                ["nl", "Meerdere antwoorden mogelijk"],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I belong to a risk group (e.g, pregnant, over 65, underlying health condition, etc)"],
                ["de", "Ich gehöre zu einer Risikogruppe (z.B. Schwangere, über 65, Vorerkrankungen)"],
                ["nl", "Ik behoor tot een risicogroep (zwanger, 60 jaar of ouder, chronische ziekte)"],
                ["fr", "Je fais partie d'un groupe à risque (p. ex. femmes enceintes, plus de 65 ans, état de santé créant un prédisposition, etc.)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases my risk of getting influenza"],
                ["de", "Eine Impfung verringert mein Risiko, die Grippe zu bekommen"],
                ["nl", "Vaccinatie voorkomt dat ikzelf griep krijg"],
                ["fr", " La vaccination diminue mon risque de contracter la grippe"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases the risk of spreading influenza to others"],
                ["de", "Eine Impfung verringert das Risiko, andere mit der Grippe zu infizieren"],
                ["nl", "Vaccinatie voorkomt dat ik het griepvirus verspreid naar andere mensen"],
                ["fr", " La vaccination diminue le risque de propager la grippe à d'autres"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "My doctor recommended it"],
                ["de", "Mein Arzt hat es mir empfohlen"],
                ["nl", "Mijn huisarts heeft me de griepprik aangeraden"],
                ["fr", "Mon médecin me l'a recommandé"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "It was recommended in my workplace/school"],
                ["de", "Es wurde mir von der Arbeit/Schule empfohlen"],
                ["nl", "De griepprik werd aangeboden op mijn werk/op school"],
                ["fr", " Il a été recommandé sur mon lieu de travail / à l'école"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "The vaccine was readily available and vaccine administration was convenient"],
                ["de", "Der Impfstoff war leicht verfügbar und die Impfung war für mich bequem durchführbar."],
                ["nl", "De griepprik is voor mij makkelijk beschikbaar"],
                ["fr", " Le vaccin était disponible et l'administration du vaccin était pratique"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "The vaccine was free (no cost)"],
                ["de", "Der Impfstoff war kostenlos."],
                ["nl", "De griepprik was gratis"],
                ["fr", "Le vaccin était gratuit"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't want to miss work/school"],
                ["de", "Ich möchte in der Arbeit/Schule nicht fehlen"],
                ["nl", "Ik wil deze winter geen werk/school missen"],
                ["fr", " Je ne veux pas manquer le travail / l'école"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "I always get the vaccine"],
                ["de", "Ich lasse mich immer impfen."],
                ["nl", "Ik haal de griepprik altijd"],
                ["fr", "Je me fais systématiquement vacciner"],
            ])
        }, {
            key: '10', role: 'option',
            content: new Map([
                ["en", "I try to protect myself against infections, because of the circulation of the pandemic coronavirus"],
                ["de", "Ich lasse mich immer impfen."],
                ["nl", "Ik ben probeer mezelf te beschermen tegen infecties vanwege het pandemische coronavirus"],
                ["fr", "Je me fais systématiquement vacciner"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "Other reason(s)"],
                ["de", "andere Gründe"],
                ["nl", "Andere reden"],
                ["fr", "Autres raisons"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    
    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });
    
    return editor.getItem();
}

const q10d_def = (itemSkeleton: SurveyItem, q10Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for NOT getting a seasonal influenza vaccination last season?"],
            ["de", "Was waren deine Gründe, sich in der Saison 2019/2020 nicht impfen zu lassen?"],
            ["nl", "Wat is de reden waarom je je niet laat vaccineren in het komende griepseizoen (2020/2021)?"],
            ["fr", " Quelles étaient vos raisons pour ne pas vous faire vacciner contre la grippe saisonnière cette année?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q10Key, [responseGroupKey, singleChoiceKey].join('.'), '1')
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "We would like to know why some people get vaccinated and others do not."],
                    ["de", "Wir möchten wissen, warum manche Menschen geimpft werden und andere nicht."],
                    ["de", "We willen graag onderzoeken waarom sommige mensen zich wel laten vaccineren en anderen niet"],
                    ["fr", "Nous aimerions savoir pourquoi certaines personnes se font vacciner et d'autres pas."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all those reasons that were important in your decision."],
                    ["de", "Wähle alle Gründe, die für Deine Entscheidung wichtig waren."],
                    ["nl", "Geef alle redenen aan die een rol speelden in de beslissing."],
                    ["fr", "Cochez toutes les raisons qui ont influencé votre décision."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        //{
        //    key: '0', role: 'option',
        //    content: new Map([
        //        ["en", "I am planning to be vaccinated, but haven't been yet"],
        //        ["de", "Ich habe vor, mich impfen zu lassen, es aber noch nicht getan."],
        //        ["nl", "Ik ben van plan om me te laten vaccineren, maar heb het nog niet gedaan"],
        //        ["fr", "Je prévois de me faire vacciner mais ne l'ai pas encore fait"],
        //    ])
        //},
        //{
        //    key: '1', role: 'option',
        //    content: new Map([
        //        ["en", "I haven't been offered the vaccine"],
        //        ["de", "Mir wurde die Impfung nicht angeboten"],
        //        ["nl", "Het griepvaccin is me niet aangeboden"],
        //        ["fr", "La vaccination ne m'a pas été proposée"],
        //    ])
        //},
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't belong to a risk group"],
                ["de", "Ich gehöre zu keiner Risikogruppe"],
                ["nl", "Ik behoor niet tot een risicogroep"],
                ["fr", "Je ne fais pas partie d'un groupe à risque"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "It is better to build your own natural immunity against influenza"],
                ["de", "Es ist besser, seine eigenen, natürlichen Abwehrkräfte gegen die Grippe zu entwickeln."],
                ["nl", "Het is beter om je eigen immuniteit op te bouwen tegen griep."],
                ["fr", "Il est préférable de développer sa propre immunité naturelle contre la grippe"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I doubt that the influenza vaccine is effective"],
                ["de", "Ich bezweifle, dass der Grippeimpfstoff wirkungsvoll ist"],
                ["nl", "Ik twijfel aan de effectiviteit van het griepvaccin"],
                ["fr", "Je doute que le vaccin contre la grippe soit efficace"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Influenza is a minor illness"],
                ["de", "Die Grippe ist eine harmlose Krankheit"],
                ["nl", "Griep is slechts een milde ziekte"],
                ["fr", " La grippe est une maladie bénigne"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "I don't think I am likely to get influenza"],
                ["de", "Ich denke es ist unwahrscheinlich, dass ich die Grippe bekomme"],
                ["nl", "Ik acht de kans klein dat ik griep krijg"],
                ["fr", "Je ne pense pas être susceptible de contracter la grippe"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I believe that influenza vaccine can cause influenza"],
                ["de", "Ich glaube, dass der Grippeimpfstoff die Grippe auslösen kann"],
                ["nl", "Ik geloof dat het vaccin ook griep kan veroorzaken"],
                ["fr", " Je crois que le vaccin antigrippal peut causer la grippe"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "I am worried that the vaccine is not safe or will cause illness or other adverse events"],
                ["de", "Ich bin besorgt, dass der Impfstoff nicht sicher ist oder, dass dieser andere Krankheiten oder unerwünschte Ereignisse fördert"],
                ["nl", "Ik ben bang dat het vaccin niet veilig is, en me juist ziek maakt of andre neveneffecten heeft"],
                ["fr", "Je pense que le vaccin n'est pas sûr ou qu'il peut causer d'autres maladies ou effets indésirables"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "I don't like having vaccinations"],
                ["de", "Ich mag keine Impfungen"],
                ["nl", "Ik hou niet van het krijgen van vaccinaties"],
                ["fr", "Je n'aime pas me faire vacciner"],
            ])
        }, {
            key: '10', role: 'option',
            content: new Map([
                ["en", "The vaccine is not readily available to me"],
                ["de", "Der Impfstoff ist für mich nicht leicht verfügbar"],
                ["nl", "Het is niet makkelijk om gevaccineerd te worden"],
                ["fr", " Le vaccin n'est pas facilement disponible pour moi"],
            ])
        }, {
            key: '11', role: 'option',
            content: new Map([
                ["en", "The vaccine is not free of charge"],
                ["de", "Der Impfstoff ist nicht kostenlos"],
                ["nl", "Ik moet betalen voor een griepvaccinate, het is niet gratis"],
                ["fr", " Le vaccin n'est pas gratuit"],
            ])
        }, {
            key: '12', role: 'option',
            content: new Map([
                ["en", "No particular reason"],
                ["de", "Kein bestimmter Grund"],
                ["nl", "Geen speciale reden"],
                ["fr", " Aucune raison particulière"],
            ])
        }, {
            key: '13', role: 'option',
            content: new Map([
                ["en", "Although my doctor recommend a vaccine, I do not get one"],
                ["de", "Obwohl mein Arzt mir eine Impfung empfohlen hat, habe ich keine erhalten"],
                ["nl", "Ondanks dat mijn huisarts het griepvaccin adviseerd, neem ik het niet"],
                ["fr", " Bien que mon médecin me l'ait recommandé, je ne me suis pas fait vacciner"],
            ])
        }, {
            key: '14', role: 'option',
            content: new Map([
                ["en", "Other reason(s)"],
                ["de", "andere Gründe"],
                ["nl", "Andere reden"],
                ["fr", "Autre(s) raison(s)"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q11_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you take regular medication for any of the following medical conditions?"],
            ["de", "Nimmst du regelmässig Medikamente gegen eine der folgenden Erkrankungen?"],
            ["nl", "Gebruik je medicatie (regelmatig) voor een of meer van de volgende aandoeningen?"],
            ["fr", " Souffrez-vous de l'une des maladies suivantes?"],
        ]))
    );


    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "This question allows us to find out whether you have other medical conditions that may increase your risk of having more severe illness if you are infected."],
                    ["de", "Diese Frage erlaubt es uns, herauszufinden, ob Du andere Krankheiten hast, die das Risiko für ernstere Verläufe im Falle einer Infektion erhöht."],
                    ["nl", "De vraag maakt het voor ons mogelijk om te onderzoeken welke aandoeningen gelinkt zijn aan een hoger risico voor infectie"],
                    ["fr", "Cette question nous permet de savoir si vous avez des prédispositions qui pourraient augmenter votre risque d'avoir des complications si vous contractez la grippe."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet ik dit beantwoorden"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", 'Only answer "yes" if you take regular medication for your medical problem. If, for instance, you only occasionally take an asthma inhaler, then do not answer "yes" for asthma.'],
                    ["de", "Antworten nur mit ja, falls Du regelmässig Medikamente gegen die Krankheit nimmst. Falls Du z.B. nur gelegentlich einen Asthmainhalator verwendest, dann wähle nicht Asthma aus."],
                    ["nl", "Het gaat ons alleen om regelmatig gebruik van medicatie, niet om af en toe. Het af en toe gebruiken van een inhaler bij astma valt hier bijvoorbeeld buiten."],
                    ["fr", "Répondez «oui» seulement si vous prenez <b>régulièrement</b> des médicaments pour votre problème médical. Si, par exemple, vous n'utilisez qu'occasionnellement un inhalateur pour l'asthme, alors ne répondez pas «oui» pour l'asthme ."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee, voor geen van de onderstaande aandoeningen"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Asthma"],
                ["de", "Asthma"],
                ["nl", "Ja, voor astma"],
                ["fr", "Asthme"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diabetes"],
                ["de", "Diabetes"],
                ["nl", "Ja, voor diabetes"],
                ["fr", "Diabètes"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chronic lung disorder besides asthma e.g. COPD, emphysema, or other disorders that affect your breathing"],
                ["de", "Chronische Lungenerkrankungen außer Asthma, z.B. COPD, Emphysem oder andere Beschwerden, die die Atmung betreffen"],
                ["nl", "Ja, voor chronische longziekten (COPD, emfyseem enz. geen astma)"],
                ["fr", "Troubles pulmonaires chroniques à part l'asthme (p. ex. MPOC, emphysème, ou autres troubles affectant votre respiration)"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Heart disorder"],
                ["de", "Herzerkrankungen"],
                ["nl", "Ja, voor hartaandoeningen"],
                ["fr", "Troubles cardiaques"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Kidney disorder"],
                ["de", "Nierenerkrankungen"],
                ["nl", "Ja, voor nieraandoeningen"],
                ["fr", "Troubles rénaux"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "An immunocompromising condition (e.g. splenectomy, organ transplant, acquired immune deficiency, cancer treatment)"],
                ["de", "Eine immunschwächende Behandlung oder Erkrankung (z.B. Splenektomie, Organtransplantation, erworbenen Immunschwäche, Krebsbehandlung)"],
                ["nl", "Ja, voor een verzwakte afweer, of de medicatie draagt bij aan een verzwakte afweer (bijvoorbeeld door een auto-immuunziekte, kankerbehandeling of na een orgaantransplantatie)"],
                ["fr", "Immunodéficience (p.ex splénectomie, greffe d'organe, immunodéficience acquise, traitement anti-cancéreux)"],
            ])
        },
        {
            key: '7', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "I would rather not answer"],
                ["de", "Ich möchte das nicht beantworten"],
                ["nl", "Dat wil ik niet aangeven"],
                ["fr", "Je ne désire pas répondre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q12_def = (itemSkeleton: SurveyItem, q1Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Are you currently pregnant?"],
            ["de", "Sind sie im Augenblick schwanger?"],
            ["nl", "Ben je op dit moment zwanger?"],
            ["fr", " Êtes-vous actuellement enceinte?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Infections during pregnancy can be different."],
                    ["de", "Schwangerschaft kann zu ernsteren Erkrankungen führen, wenn Sie mit der Grippe infiziert sind."],
                    ["nl", "Infecties kunnen soms anders verlopen bij zwangeren."],
                    ["fr", "La grossesse peut entraîner des complications si vous êtes infecté par la grippe."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q1Key, [responseGroupKey, singleChoiceKey].join('.'), '1')
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["nl", "Ja"],
                ["fr", "Oui"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Don't know/would rather not answer"],
                ["de", "Ich weiß nicht bzw. ich möchte das lieber nicht beantworten."],
                ["nl", "Dit weet ik niet/wil ik liever niet aangeven"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q12b_def = (itemSkeleton: SurveyItem, q12Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Which trimester of the pregnancy are you in?"],
            ["de", "In welchem Trimester (3 Monatsperiode) Ihrer Schwangerschaft befinden Sie sich?"],
            ["nl", "In welk trimester ben je van je zwangerschap?"],
            ["fr", "A quel stade de grossesse êtes-vous?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q12Key, [responseGroupKey, singleChoiceKey].join('.'), '0')
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "The stage of pregnancy might alter your infection, although this is not very clear."],
                    ["de", "Die Phase Ihrer Schwangerschaft könnte Ihr Risiko eines schweren Verlaufs der Grippe beeinflussen, auch wenn dies nicht sicher ist."],
                    ["nl", "Infecties kunnen soms anders verlopen per trimester van een zwangerschap, maar heel duidelijk is dit nog niet"],
                    ["fr", "Le stade de grossesse pourrait influencer les risques de grippe grave, bien que ce soit pas démontré."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "First trimester (week 1-12)"],
                ["de", "Erstes Trimester (Woche 1-12)"],
                ["nl", "Eerste trimester (week 1-12)"],
                ["fr", "Premier trimestre (semaine 1-12)"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Second trimester (week 13-28)"],
                ["de", "Zweites Trimester (Woche 13-28)"],
                ["nl", "Tweede trimester (week 13-28)"],
                ["fr", "Deuxième trimestre (semaine 13-28)"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Third trimester (week 29-delivery)"],
                ["de", "Drittes Trimester (Woche 29 bis Entbindung)"],
                ["nl", "Derde trimester (week 29 tot bevalling)"],
                ["fr", "Troisième trimestre (semaine 29 ou plus)"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Don't know/would rather not answer"],
                ["de", "Ich weiß nicht bzw. ich möchte das lieber nicht beantworten"],
                ["nl", "Dit weet ik niet / wil ik niet aangeven"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q13_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you smoke tobacco?"],
            ["de", "Rauchst Du (Tabak)?"],
            ["nl", "Rook je?"],
            ["fr", "Etes-vous fumeur?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Smoking might make you more likely to get a more severe dose of virus disease. We would like to test this."],
                    ["de", "Rauchen könnte die Wahrscheinlichkeit erhöhen, dass Sie eine mögliche Erkrankung schwerer verläuft. Wir möchten dies gerne prüfen."],
                    ["nl", "Roken is een risico-factor voor ernstige luchtwegklachten, dit willen we graag onderzoeken"],
                    ["fr", "Fumer pourrait vous rendre plus susceptible de contracter une grippe sévère."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please, answer as accurately as possible."],
                    ["de", "Bitte sein so genau wie möglich."],
                    ["nl", "Antwoord zo precies mogelijk."],
                    ["fr", "Répondez aussi précisément que possible. Si vous fumez autres produits (p. ex. pipe ou cigares), indiquez à peu près combien de fois par jour."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, occasionally"],
                ["de", "Ja, manchmal"],
                ["nl", "Ja, af en toe"],
                ["fr", "Oui, de temps en temps"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, daily, fewer than 10 times a day"],
                ["de", "Ja, täglich, weniger als 10 mal am Tag"],
                ["nl", "Dagelijks, minder dan 10 keer per dag"],
                ["fr", " Oui, quotidiennement, moins de 10 fois par jour"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, daily, 10 or more times a day"],
                ["de", "Ja, täglich, 10 mal oder öfter am Tag"],
                ["nl", "Dagelijks, 10 keer of vaker per dag"],
                ["fr", " Oui, quotidiennement, 10 fois ou plus par jour"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Yes, only e-sigarets"],
                ["de", "Alein e-sigarets"],
                ["nl", "Ja, alleen e-sigaretten"],
                ["fr", "e-sigarettes"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Dont know/would rather not answer"],
                ["de", "Ich weiß es icht bzw. möchte das nicht beantworten"],
                ["nl", "Dit wil ik niet aangeven"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q14_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you have one of the following allergies that can cause respiratory symptoms?"],
            ["de", "Hast du eine der folgenden Allergien, die Atemwegssymptome auslösen kann?"],
            ["nl", "Heb je één of meer van de volgende allergieën?"],
            ["fr", "Avez-vous l'une des allergies suivantes qui peuvent causer des symptômes respiratoires?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Some allergic reactions can have similar symptoms to respiratory infections."],
                    ["de", "Manche allergische Reaktionen können ähnlich Symptome wie Atemwegsinfektionen auslösen."],
                    ["nl", "Sommige allergieën geven dezelfde klachten als luchtweginfecties"],
                    ["fr", "Certaines réactions allergiques peuvent avoir des symptômes similaires ceux d'une infection respiratoire."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all the options that apply. We are only interested in those allergies that cause respiratory symptoms (i.e. sneezing, sunny nose, runny eyes)."],
                    ["de", "Wähle alle Optionen, die zutreffen. Wir interessieren uns nur für jene Allergien, die Atemwegssymptome (z.B. Niesen, laufenden Nase, tränende Augen) verursachen."],
                    ["nl", "Meerdere antwoorden mogelijk, klik alle opties die relevant zijn"],
                    ["fr", "Cochez toutes les options applicables. Nous sommes seulement intéressés par les allergies qui provoquent des symptômes respiratoires (éternuement, nez coulant, yeux larmoyants)."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Hay fever"],
                ["de", "Heuschnupfen"],
                ["nl", "Hooikoorts"],
                ["fr", "Rhume des foins"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Allergy against house dust mite"],
                ["de", "Allergie gegen Hausstaubmilben"],
                ["nl", "Allergie voor huisstofmijt"],
                ["fr", "Allergie aux acariens"],
            ])
        }, {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Allergy against domestic animals or pets"],
                ["de", "Allergien gegen domestizierte Tiere und Haustiere"],
                ["nl", "Allergie voor (huis)dieren"],
                ["fr", "Allergie à des animaux domestiques"],
            ])
        }, {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "Other allergies that cause respiratory symptoms (e.g. sneezing, runny eyes)"],
                ["de", "Andere Allergien, die Atemwegssymptome verursachen (z.B. Niesen, tränende Augen)"],
                ["nl", "Een andere allergie waarvan ik verkoudheidsklachten (loopneus, tranende ogen) krijg"],
                ["fr", " Autres allergies provoquant des symptômes respiratoires (p. ex. éternuements, yeux larmoyants, etc)"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I do not have an allergy that causes respiratory symptoms"],
                ["de", "Ich habe keine Allergie, die Atemwegssymptome verursacht"],
                ["nl", "Nee, ik heb geen allergie waarvan ik verkoudheidsklachten krijg"],
                ["fr", "Je n'ai pas d'allergie causant des symptômes respiratoires"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q15_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you follow a special diet?"],
            ["de", "Hast du eine spezielle Ernährung?"],
            ["nl", "Volg je een specifiek dieet?"],
            ["fr", " Suivez-vous un régime alimentaire particulier?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No special diet"],
                ["de", "Keine spezielle Ernährung"],
                ["nl", "Nee, ik volg geen specifiek dieet"],
                ["fr", "Non, pas de régime particulier"],
            ])
        }, {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Vegetarian"],
                ["de", "Vegetarisch"],
                ["nl", "Ik eet vegetarisch"],
                ["fr", "Végétarien"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Veganism"],
                ["de", "Vegan"],
                ["nl", "Ik eet veganistisch"],
                ["fr", "Végétalien"],
            ])
        }, {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Low-calorie"],
                ["de", "Kalorienarm"],
                ["nl", "Ik eet caloriearm"],
                ["fr", "Basse-calorie"],
            ])
        }, {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
                ["nl", "Ik volg een ander dieet"],
                ["fr", "Autre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q16_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you have pets at home?"],
            ["de", "Hast du Haustiere?"],
            ["nl", "Heb je huisdieren?"],
            ["fr", "Avez-vous un animal domestique?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["nl", "Nee"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one or more dogs"],
                ["de", "Ja, einen oder mehrere Hunde"],
                ["nl", "Ja, één of meerdere honden"],
                ["fr", "Oui, un ou plusieurs chien(s)"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one or more cats"],
                ["de", "Ja, eine oder mehrere Katzen"],
                ["nl", "Ja, één of meerdere katten"],
                ["fr", "Oui, un ou plusieurs chat(s)"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one or more birds"],
                ["de", "Ja, einen oder mehrere Vögel"],
                ["nl", "Ja, één of meerdere vogels"],
                ["fr", "Oui, un ou plusieurs oiseau(x)"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Yes, one ore more other animals"],
                ["de", "Ja, mindestens ein anderes Tier"],
                ["nl", "Ja, één of meer andere dieren"],
                ["fr", "Oui, un ou plusieurs animaux d'autres espèces"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q17_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Where did you first hear about Infectieradar?"],
            ["de", "Wo haben Sie zum ersten mal von Infectieradar gehört?"],
            ["nl", "Waar heeft u van Infectieradar gehoord?"],
            ["fr", "Où avez-vous entendu parler de Infectieradar?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ['nl', 'Meerdere antwoorden mogelijk'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "On radio or television"],
                ["de", "Im Radio oder Fernsehen"],
                ["nl", "Op radio of televisie"],
                ["fr", "A la radio ou à la télévision"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "In the newspaper or in a magazine"],
                ["de", "In der Zeitung oder in einem Magazin"],
                ["nl", "In de krant of magazine"],
                ["fr", "Dans un journal ou un magazine"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Via an internet site (search engine or link)"],
                ["de", "Über eine Internetseite (Suchmaschine oder Link)"],
                ["nl", "Via internet (website, nieuwswebsite, zoekmachine)"],
                ["fr", "Sur internet"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "By poster"],
                ["de", "Über ein Poster"],
                ["nl", "Via sociale media (facebook, twitter, instagram, etc.)"],
                ["fr", "Sur une affiche"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Via family or friends"],
                ["de", "Über Freunde oder Familie"],
                ["nl", "Via vrienden en familie"],
                ["fr", "Par ma famille ou des amis"],
            ])
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Via school or work"],
                ["de", "Über Schule oder Arbeit"],
                ["nl", "Via school of werk"],
                ["fr", "A l'école ou au travail"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

////////COVID INFLUENZANET
const qcov10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Since the beginning of COVID-19 lockdown measures, do you carry out a professional activity?"],
            ["de", "Gehst Du seit Beginn der COVID-19-Sperrmaßnahmen einer berufliche Tätigkeit nach?"],
            ["fr", "Depuis le début des mesures de confinement liées au COVID-19, exercez-vous une activité professionnelle ? "],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'variant', value: 'annotation' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Select all options that apply'],
                ['de', 'Wähle alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);


    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3', '4', '5'),
            content: new Map([
                ["en", "Yes, I work from home"],
                ["de", "Ja, ich arbeite von zu Hause aus"],
            ])
        },
        {
            key: '2',
            role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3', '4', '5'),
            content: new Map([
                ["en", "Yes, I work outside from home"],
                ["de", "Ja, ich arbeite ausser Haus"],
            ])
        },
        {
            key: '3',
            role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '3'),
            content: new Map([
                ["en", "No, I have a leave of absence to take care of my kid(s)"],
                ["de", "Nein, ich habe eine Beurlaubung, um mich um mein(e) Kind(er) zu kümmern "],
            ])
        },
        {
            key: '4',
            role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '4'),
            content: new Map([
                ["en", "No, I have a sick leave (because of Covid-19)"],
                ["de", "Nein, ich bin krankgeschrieben (wegen Covid-19) "],
            ])
        },
        {
            key: '5',
            role: 'option',
            disabled: expWithArgs('responseHasOnlyKeysOtherThan', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '5'),
            content: new Map([
                ["en", "No, I have another situation (retired, job-seeker, student, house-wife/husband, other sick-leave, partial unemployment, forced leave…)"],
                ["de", "Nein, ich befinde mich in einer anderen Situation (Rentner, Arbeitssuchender, Student, Hausfrau/Ehemann, anderen Krankheitsurlaub...) "],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const qcov10b_def = (itemSkeleton: SurveyItem, qcov10: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How many days a week do you work outside from home?"],
            ["de", "Wie viele Tage in der Woche arbeitest du ausserhalb von zu Hause?"],
            ["fr", "Combien de jours par semaine travaillez-vous hors de votre domicile ?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', qcov10, [responseGroupKey, multipleChoiceKey].join('.'), '2'),
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSliderCategoricalGroup(sliderCategoricalKey, [
        {
            key: '0',
            role: 'option',
            content: new Map([
                ["en", "0"],
                ["de", "0"],
                ["fr", "0"],
            ])
        },
        {
            key: '1',
            role: 'option',
            content: new Map([
                ["en", "1"],
                ["de", "1"],
                ["fr", "1"],
            ])
        },
        {
            key: '2',
            role: 'option',
            content: new Map([
                ["en", "2"],
                ["de", "2"],
                ["fr", "2"],
            ])
        },
        {
            key: '3',
            role: 'option',
            content: new Map([
                ["en", "3"],
                ["de", "3"],
                ["fr", "3"],
            ])
        },
        {
            key: '4',
            role: 'option',
            content: new Map([
                ["en", "4"],
                ["de", "4"],
                ["fr", "4"],
            ])
        },
        {
            key: '5',
            role: 'option',
            content: new Map([
                ["en", "5"],
                ["de", "5"],
                ["fr", "5"],
            ])
        },
        {
            key: '6',
            role: 'option',
            content: new Map([
                ["en", "6"],
                ["de", "6"],
                ["fr", "6"],
            ])
        },
        {
            key: '7',
            role: 'option',
            content: new Map([
                ["en", "7"],
                ["de", "7"],
                ["fr", "7"],
            ])
        }
    ])
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

/////// DUTCH QUESTIONS
const q4cNL_def = (itemSkeleton: SurveyItem, q4Key: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Which of the following descriptions most closely matches with your main occupation?"],
            ["de", "Welche der folgenden Beschreibungen passt am ehesten zu Ihrer Hauptbeschäftigung?"],
            ["nl", "Welke omschrijving past het beste bij je dagelijkse werkzaamheden? Ga uit van de normale situatie (dus zonder eventuele corona maatregelen)"],
            ["fr", "Laquelle des descriptions suivantes correspond le mieux à votre activité principale?"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q4Key].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '0', '1', '2')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is compared to the population as a whole and to find out whether the chance of getting flu is different for people in different types of occupation."],
                    ["de", "Um festzustellen, wie repräsentativ unsere Stichprobe ist - im Vergleich mit der Gesamtbevölkerung - ist. Sowie, ob das Risiko, an der Grippe zu erkranken, zwischen Berufen unterscheidet."],
                    ["nl", "Om in te schatten of we representatief zijn, en om infectierisico per beroepsgroep uit te splitsen"],
                    ["fr", "Afin de vérifier la représentativité de notre échantillon comparée à la population dans son ensemble et pour savoir si le risque de contracter la grippe est différent pour les personnes ayant différents types d'occupation."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please tick the box that most closely resembles your main occupation."],
                    ["de", "Bitte wählen Sie die Option die am ehesten Ihrer Hauptbeschäftigung entspricht."],
                    ["nl", "Selecteer het antwoord dat het best uw situatie beschrijft."],
                    ["fr", "Cochez la case qui correspond le plus à votre profession principale."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I work in health care"],
                ["nl", "Ik werk in de gezondheidzorg"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I have a job in wich I am in close contact with others ('contactberoep') (for example hairdresser)"],
                ["nl", "Ik heb een contactberoep (bijvoorbeeld kapper, schoonheidsspecialist)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I work in child care / education (primary, secondary, MBO, HBO, University)"],
                ["nl", "Ik werk in de kinderopvang/onderwijs (basis, voortgezet, MBO, HBO, WO-onderwijs)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I work in a hotel, restaurant or cafe ('horeca')"],
                ["nl", "Ik werk in de horeca"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I work in a shop (supermarket, or other kind of shop)"],
                ["nl", "Ik werk in de detailhandel (supermarkt, en andere verkoop in winkels)"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I work in public transport (for example train, bus, metro, taxi)"],
                ["nl", "Ik werk in het openbaar vervoer (bijv. trein, bus, metro, taxi)"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "I am a knowledgeworker (manager, researcher, accountant)"],
                ["nl", "Ik doe overig kenniswerk (manager, onderzoeker, accountant)"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I have an administrative role (administration, financial assistent, receptionist)"],
                ["nl", "Ik doe administratiefwerk (administratie, financieel assistent, receptionist)"],
            ])
        },
        {
            key: '8', role: 'option',
            content: new Map([
                ["en", "I work with my hands (builder, technic, production)"],
                ["nl", "Ik doe technisch werk (uitvoerend in techniek, bouw, productie)"],
            ])
        },
        //{
        //    key: '9', role: 'option',
        //    content: new Map([
        //        ["en", "Job is not listed"],
        //        ["nl", "Ik doe anders uitvoerend werk"],
        //    ])
        //},
        {
            key: '10', role: 'option',
            content: new Map([
                ["en", "Different, not mentioned above"],
                ["nl", "Anders, valt niet in bovengenoemde opties"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q4cNLb_def = (itemSkeleton: SurveyItem, q4cNLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Where are you employed in education or childcare? Assume the normal situation (thus without measures against corona)"],
            ["nl", "Waar werkt je in het onderwijs of kinderopvang? Ga uit van de normale situatie (dus zonder corona maatregelen)"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q4cNLKey].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '2')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why do we ask this question?"],
                    ["nl", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To differentiate between the different tiers in education"],
                    ["nl", "Om de verschillende lagen van het onderwijs verder uit te splitsen"],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },

        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I work in a nursery/childcare"],
                ["nl", "Ik werk in een kinderdagverblijf/peuterspeelzaal"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I work in primary education, or 'BSO'"],
                ["nl", "Ik werk op een basisonderwijs of op de BSO"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I work in secundary education (VMBO/Havo/VWO"],
                ["nl", "Ik werk in het voortgezet onderwijs (VMBO/Havo/VWO)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I work at the 'MBO'"],
                ["nl", "Ik werk op het MBO"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Ik work at the HBO or WO"],
                ["nl", "Ik werk op het HBO of WO"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Other"],
                ["nl", "Anders"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q4cNLc_def = (itemSkeleton: SurveyItem, q4cNLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Where are you employed within health care? Assume the normal situation (thus without measures against the coronavirus)"],
            ["nl", "Waar werkt je in de gezondheidszorg? Ga uit van de normale situatie (dus zonder corona maatregelen)"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', [q4cNLKey].join('.'), [responseGroupKey, singleChoiceKey].join('.'), '0')
    )

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why do we ask this question?"],
                    ["nl", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To differentiate between the ways of providing care"],
                    ["nl", "Om de verschillende lagen van de zorg verder uit te splitsen"],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },

        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I work in a hospital"],
                ["nl", "Ik werk in een ziekenhuis"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Ik work in a nursinghome"],
                ["nl", "Ik werk in een verpleeghuis"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Ik work in a care home"],
                ["nl", "Ik werk in een verzorgingstehuis"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "I work in mental health"],
                ["nl", "Ik werk in de geestelijke gezondheidszorg/zorgverlening"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I work in a GP practice"],
                ["nl", "Ik werk in een huisartsenpraktijk"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I provide other kind of care (for example physiotherapy)"],
                ["nl", "Ik werk in een andere zorg (bijv. fysiotherapie)"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Other, not mentioned above"],
                ["nl", "Overig, nog niet genoemd"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q20NL_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Have you already been (or are you) infected with the new coronavirus?"],
            ["nl", "Denk je dat je al besmet bent (geweest) met het nieuwe coronavirus?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No, I don't think I have been infected with the new coronavirus"],
                ["nl", "Nee, ik denk niet dat ik het nieuwe coronavirus al heb gehad"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["nl", "Ik weet het niet"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, perhaps, I had/have symptoms that look like it"],
                ["nl", "Ja, misschien wel, ik had/heb klachten die erop lijken"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, I do think so. I had symptoms, just as people around me"],
                ["nl", "Ja, ik denk het wel, ik had/heb klachten die erop lijken, en mensen om me heen ook"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Yes, I am prety sure, I and people around my had symptoms, and one or more of those people tested positive"],
                ["nl", "Ja, ik weet het vrij zeker, want ikzelf en mensen om me heen hadden/hebben klachten, en een of meer van die mensen zijn positief getest op het coronavirus"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Yes, I know for sure, as I tested positive and I had/have symptoms"],
                ["nl", "Ja, ik weet het zeker, want ik ben positief getest op het coronavirus, en ik had/heb klachten die erop lijken"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Yes, I know for sure, I tested positive, however I did not have any symptoms"],
                ["nl", "Ja, ik weet het zeker, want ik ben positief getest op het coronavirus, maar ik heb geen klachten gehad"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q20NLb_def = (itemSkeleton: SurveyItem, q20NLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Which test has been performed (if different tests are applicable, focus on the test that was positive first"],
            ["nl", "Welke test voor het nieuwe coronavirus is bij je gedaan? (als meerdere testen zijn gedaan vermeld dan de eerste positieve test)"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q20NLKey, [responseGroupKey, singleChoiceKey].join('.'), '5', '6')
    );


    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Bloodtest (antibody test)"],
                ["nl", "Bloedtest (antistoftest)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Throat/Nose test (PCR)"],
                ["nl", "Keel-/neuslijmvliestest (PCR)"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I can't remember (anymore)"],
                ["nl", "Dat weet ik niet (meer)"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });

    return editor.getItem();
}

const q20NLc_def = (itemSkeleton: SurveyItem, q20NLKey: string): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When was the test performed? If you can't remember the date, please guess. It should be the day the sample was taken"],
            ["nl", "Wanneer is de coronatest bij je gedaan? Als je de datum niet meer precies weet mag je deze schatten. Het gaat om de datum dat je bloed is afgenomen, of dat een monster is genomen van uw keel/neus slijmvlies"],
        ]))
    );

    editor.setCondition(
        expWithArgs('responseHasKeysAny', q20NLKey, [responseGroupKey, singleChoiceKey].join('.'), '5', '6')
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why do we ask this question?"],
                    ["nl", "Waarom vragen we dit?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "The timing of the test is important to interpret the data"],
                    ["nl", "Het weten van de timing van testen is belangrijk om uw gegevens te interpreteren"],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How shall you answer this question?"],
                    ["nl", "Hoe zal ik dit beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please, try and answer as accurately as possible. If you don't know the precise date, please give your best estimate. For instance, you might remember the month, then try and remember if it was at the beginning or the end of the month. Were there any significant events (e.g. a holiday or a birthday) that might help jog your memory?"],
                    ["de", "Bitte versuche so genau wie möglich zu antworten. Falls Du das genaue Datum nicht kennst, gib bitte eine bestmögliche Abschätzung. Falls Du z.B. den Monat weisst, versuche Dich zu erinnern, ob es am Anfang oder Ende des Monats war. Waren an diesem Tag vielleicht irgendwelche bedeutenden Ereignisse (z.B. ein Feiertag oder ein Geburtstag), die Deinem Gedächtnis weiterhelfen könnten?"],
                    ["nl", "Probeer zo goed mogelijk te antwoorden, de exacte datum is niet belangrijk, maar wel of het aan het begin of het eind van de maand was"],
                    ["fr", "Essayez de répondre le plus précisément possible. Si vous ne connaissez pas la date précise, donnez votre meilleure estimation. Par exemple, vous pouvez vous rappeler du mois, puis essayez de vous souvenir si c'était au début ou à la fin du mois. Essayez de vous servir d'événements importants (p. ex. vacances ou anniversaire) pour vous aider à vous rafraîchir la mémoire."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'dateInput',
            optionProps: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            content: new Map([
                ["en", "Choose date:"],
                ["de", "Wähle ein Datum:"],
                ["nl", "Kies datum:"],
                ["fr", "Sélectionner une date"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);

    editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });
    
    return editor.getItem();
}
