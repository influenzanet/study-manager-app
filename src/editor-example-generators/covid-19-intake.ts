import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings, generateTitleComponent, generateHelpGroupComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { initSingleChoiceGroup, initMultipleChoiceGroup } from "../editor-engine/utils/question-type-generator";
import { ComponentEditor } from "../editor-engine/survey-editor/component-editor";


const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';
const multipleChoiceKey = 'mcg';
const dropDownKey = 'ddg'
const sliderCategoricalKey = "scc"
const inputKey = "ic"
const matrixKey = "mat"

export const generateCovid19Intake = (): Survey | undefined => {
    const surveyKey = 'intake';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "Intake Survey"],
            ["de", "Aufnahmefragebogen"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "The intake survey is focues on some background and demographic information."],
            ["de", "Fragebogen über den Hintergrund des Teilnehmers."],
        ])
    ));
    // max item per page
    // set prefill rules
    // set context rules


    const rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;



    // --------------------------------------
    const q_gender = survey.addNewSurveyItem({ itemKey: 'todo_1' }, rootKey);
    if (!q_gender) { return; }
    survey.updateSurveyItem(q_gender_def(q_gender));
    // -----------------------------------------

    // --------------------------------------
    const q_birthday = survey.addNewSurveyItem({ itemKey: 'todo_2' }, rootKey);
    if (!q_birthday) { return; }
    survey.updateSurveyItem(q_birthday_def(q_birthday));
    // -----------------------------------------

    // country --------------------------------------
    const q_3 = survey.addNewSurveyItem({ itemKey: 'todo_3' }, rootKey);
    if (!q_3) { return; }
    survey.updateSurveyItem(q_3_def(q_3));
    // -----------------------------------------

    // home postal-code --------------------------------------
    const q_4 = survey.addNewSurveyItem({ itemKey: 'todo_4' }, rootKey);
    if (!q_4) { return; }
    survey.updateSurveyItem(q_4_def(q_4));
    // -----------------------------------------

    // main activity --------------------------------------
    const q_main_activity = survey.addNewSurveyItem({ itemKey: 'todo_5' }, rootKey);
    if (!q_main_activity) { return; }
    survey.updateSurveyItem(q_main_activity_def(q_main_activity));
    // -----------------------------------------


    // school/work postal code  --------------------------------------
    const q_6 = survey.addNewSurveyItem({ itemKey: 'todo_6' }, rootKey);
    if (!q_6) { return; }
    survey.updateSurveyItem(q_6_def(q_6));
    // -----------------------------------------

    // job category  --------------------------------------
    const q_7 = survey.addNewSurveyItem({ itemKey: 'todo_7' }, rootKey);
    if (!q_7) { return; }
    survey.updateSurveyItem(q_7_def(q_7));
    // -----------------------------------------

    // eductaion_level  --------------------------------------
    const q_8 = survey.addNewSurveyItem({ itemKey: 'todo_8' }, rootKey);
    if (!q_8) { return; }
    survey.updateSurveyItem(q_8_def(q_8));
    // -----------------------------------------

    // people you meet  --------------------------------------
    const q_9 = survey.addNewSurveyItem({ itemKey: 'todo_9' }, rootKey);
    if (!q_9) { return; }
    survey.updateSurveyItem(q_9_def(q_9));
    // -----------------------------------------

    // age groups  --------------------------------------
    const q_10 = survey.addNewSurveyItem({ itemKey: 'todo_10' }, rootKey);
    if (!q_10) { return; }
    survey.updateSurveyItem(q_10_def(q_10));
    // -----------------------------------------

    // children/school/daycare  --------------------------------------
    const q_11 = survey.addNewSurveyItem({ itemKey: 'todo_11' }, rootKey);
    if (!q_11) { return; }
    survey.updateSurveyItem(q_11_def(q_11));
    // -----------------------------------------

    // means of transport  --------------------------------------
    const q_12 = survey.addNewSurveyItem({ itemKey: 'todo_12' }, rootKey);
    if (!q_12) { return; }
    survey.updateSurveyItem(q_12_def(q_12));
    // -----------------------------------------

    // public transport duration  --------------------------------------
    const q_13 = survey.addNewSurveyItem({ itemKey: 'todo_13' }, rootKey);
    if (!q_13) { return; }
    survey.updateSurveyItem(q_13_def(q_13));
    // -----------------------------------------

    // common cold how often  --------------------------------------
    const q_14 = survey.addNewSurveyItem({ itemKey: 'todo_14' }, rootKey);
    if (!q_14) { return; }
    survey.updateSurveyItem(q_14_def(q_14));
    // -----------------------------------------

    // flu vaccine last --------------------------------------
    const q_15 = survey.addNewSurveyItem({ itemKey: 'todo_15' }, rootKey);
    if (!q_15) { return; }
    survey.updateSurveyItem(q_15_def(q_15));
    // -----------------------------------------

    // flue vaccine this --------------------------------------
    const q_16 = survey.addNewSurveyItem({ itemKey: 'todo_16' }, rootKey);
    if (!q_16) { return; }
    survey.updateSurveyItem(q_16_def(q_16));
    // -----------------------------------------

    // flue vaccine when --------------------------------------
    const q_17 = survey.addNewSurveyItem({ itemKey: 'todo_17' }, rootKey);
    if (!q_17) { return; }
    survey.updateSurveyItem(q_17_def(q_17));
    // -----------------------------------------

    // flue vaccine reason for --------------------------------------
    const q_18 = survey.addNewSurveyItem({ itemKey: 'todo_18' }, rootKey);
    if (!q_18) { return; }
    survey.updateSurveyItem(q_18_def(q_18));
    // -----------------------------------------

    // flue vaccine reason against --------------------------------------
    const q_19 = survey.addNewSurveyItem({ itemKey: 'todo_19' }, rootKey);
    if (!q_19) { return; }
    survey.updateSurveyItem(q_19_def(q_19));
    // -----------------------------------------

    // regular medication --------------------------------------
    const q_20 = survey.addNewSurveyItem({ itemKey: 'todo_20' }, rootKey);
    if (!q_20) { return; }
    survey.updateSurveyItem(q_20_def(q_20));
    // -----------------------------------------

    // pregnant --------------------------------------
    const q_21 = survey.addNewSurveyItem({ itemKey: 'todo_21' }, rootKey);
    if (!q_21) { return; }
    survey.updateSurveyItem(q_21_def(q_21));
    // -----------------------------------------

    // trimester --------------------------------------
    const q_22 = survey.addNewSurveyItem({ itemKey: 'todo_22' }, rootKey);
    if (!q_22) { return; }
    survey.updateSurveyItem(q_22_def(q_22));
    // -----------------------------------------

    // do you smoke --------------------------------------
    const q_23 = survey.addNewSurveyItem({ itemKey: 'todo_23' }, rootKey);
    if (!q_23) { return; }
    survey.updateSurveyItem(q_23_def(q_23));
    // -----------------------------------------

    // allergies --------------------------------------
    const q_24 = survey.addNewSurveyItem({ itemKey: 'todo_24' }, rootKey);
    if (!q_24) { return; }
    survey.updateSurveyItem(q_24_def(q_24));
    // -----------------------------------------

    // special diet --------------------------------------
    const q_25 = survey.addNewSurveyItem({ itemKey: 'todo_25' }, rootKey);
    if (!q_25) { return; }
    survey.updateSurveyItem(q_25_def(q_25));
    // -----------------------------------------

    // pets --------------------------------------
    const q_26 = survey.addNewSurveyItem({ itemKey: 'todo_26' }, rootKey);
    if (!q_26) { return; }
    survey.updateSurveyItem(q_26_def(q_26));
    // -----------------------------------------

    // how did you find us --------------------------------------
    const q_27 = survey.addNewSurveyItem({ itemKey: 'todo_27' }, rootKey);
    if (!q_27) { return; }
    survey.updateSurveyItem(q_27_def(q_27));
    // -----------------------------------------

    return survey.getSurvey();
}



const q_gender_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your gender?"],
            ["de", "Welches Geschlecht haben Sie?"],
            ["fr", " Quel est votre sexe?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether the chance of getting flu is different between men and women."],
                    ["de", "Um herauszufinden, ob das Risiko, an der Grippe zu erkranken, unterschiedlich für Männer und Frauen ist."],
                    ["fr", "Pour savoir si le risque de contracter la grippe est différent entre hommes et femmes."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '767', role: 'option',
            content: new Map([
                ["en", "Male"],
                ["de", "Männlich"],
                ["fr", "Homme"],
            ])
        },
        {
            key: '768', role: 'option',
            content: new Map([
                ["en", "Female"],
                ["de", "Weiblich"],
                ["fr", "Femme"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const q_birthday_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your date of birth (month and year)?"],
            ["de", "Was ist Ihr Geburtsdatum (Monat und Jahr)?"],
            ["fr", "Quelle est votre date de naissance (mois et année)"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "The chance of getting flu and the risk of more serious complications vary by age."],
                    ["de", "Das Risiko an der Grippe zu erkranken und das Risiko ernster Komplikationen variiert mit dem Alter."],
                    ["fr", "Les chances de contracter la grippe et les risques de complications varient selon l'âge."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const dateInputEditor = new ComponentEditor(undefined, {
        key: '769',
        role: 'dateInput'
    });
    dateInputEditor.setProperties({
        dateInputMode: { str: 'YM' },
        min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -3311280000) },
        max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
    })
    editor.addExistingResponseComponent(dateInputEditor.getComponent(), rg?.key);
    return editor.getItem();
}


const q_3_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What country are you from?"],
            ["de", "Aus welchem Land stammen Sie?"],
            ["fr", "Quel est votre pays d'origine?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '771', role: 'option',
            content: new Map([
                ["en", "Netherlands"],
                ["de", "Niederlande"],
                ["fr", "Pays-Bas"],
            ])
        },
        {
            key: '772', role: 'option',
            content: new Map([
                ["en", "Belgium"],
                ["de", "Belgien"],
                ["fr", "Belgique"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q_4_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is the first part of your home postcode (the part before the space)?"],
            ["de", "Wie lautet der Anfang Ihrer Postleitzahl (der Teil vor dem Leerzeichen)?"],
            ["fr", "Quelle est le code postal de votre domicile?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is, and to see whether the chance of getting flu varies across the country."],
                    ["de", "Um zu prüfen, wie repräsentativ unsere Stichprobe ist und ob das Risiko, an der Grippe zu erkranken, innerhalb eines Landes variiert."],
                    ["fr", "Pour vérifier la représentativité de notre échantillon et pour voir si le risque de contracter la grippe varie à travers le pays."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please choose the first part of the post-code (the part before the space)."],
                    ["de", "Bitte wählen Sie den Anfang Ihrer Postleitzahl (der Teil vor dem Leerzeichen)."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })

    // TODO
    return editor.getItem();
}

const q_main_activity_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your main activity?"],
            ["de", "Was ist Ihre Hauptbeschäftigung?"],
            ["fr", "Quelle est votre activité principale?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is compared to the population as a whole, and to find out whether the chance of getting flu is different for people in different types of occupation."],
                    ["de", "Um zu prüfen, wie repräsentativ unserer Stichprobe - im Vergleich zur Gesamtbevölkerung - ist. Sowie um herauszufinden, ob das Risiko, an der Grippe zu erkranken, für Menschen mit verschiedenen Berufen variiert."],
                    ["fr", "Afin de vérifier la représentativité de notre échantillon comparée à la population dans son ensemble, et savoir si le risque de contracter la grippe est différent pour les personnes ayant différents types d'occupation."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", 'Please, tick the box that most closely resembles your main occupation. For pre-school children who don\'t go to daycare tick the "other" box.'],
                    ["de", 'Für Vorschulkinder, die nicht in die Tagespflege gehen, wählen Sie bitte „andere“ aus.'],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '773', role: 'option',
            content: new Map([
                ["en", "Paid employment, full time"],
                ["de", "Bezahlte Beschäftigung (Vollzeit)"],
                ["fr", "Employé à plein temps"],
            ])
        },
        {
            key: '774', role: 'option',
            content: new Map([
                ["en", "Paid employment, part time"],
                ["de", "Bezahlte Beschäftigung (Teilzeit)"],
                ["fr", "Employé à temps partiel"],
            ])
        },
        {
            key: '775', role: 'option',
            content: new Map([
                ["en", "Self-employed (businessman, farmer, tradesman, etc.)"],
                ["de", "Selbstständig (UnternehmerIn, LandwirtIn, HändlerIn, usw.)"],
                ["fr", " Indépendant (homme d'affaires , agriculteur , commerçant, etc.)"],
            ])
        },
        {
            key: '776', role: 'option',
            content: new Map([
                ["en", "Attending daycare/school/college/university"],
                ["de", "Tagespflege/ Schule/ Hochschule/ Universität"],
                ["fr", "Ecolier, étudiant (garderie / école / université)"],
            ])
        },
        {
            key: '777', role: 'option',
            content: new Map([
                ["en", "Home-maker (e.g. housewife)"],
                ["de", "Im Haushalt tätig (z.B. Hausfrau/ Hausmann)"],
                ["fr", "Femme/homme au foyer"],
            ])
        },
        {
            key: '778', role: 'option',
            content: new Map([
                ["en", "Unemployed"],
                ["de", "Arbeitslos"],
                ["fr", "Sans-emploi"],
            ])
        },
        {
            key: '779', role: 'option',
            content: new Map([
                ["en", "Long-term sick-leave or parental leave"],
                ["de", "Langfristiger Krankenurlaub oder Elternzeit"],
                ["fr", "En congé maladie à long terme, en congé maternité"],
            ])
        },
        {
            key: '780', role: 'option',
            content: new Map([
                ["en", "Retired"],
                ["de", "Im Ruhestand"],
                ["fr", "Retraité"],
            ])
        },
        {
            key: '781', role: 'input',
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
                ["fr", "Autre"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}


const q_6_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is the first part of your school/college/workplace postcode? (Where you spend the majority of your work/study time)"],
            ["de", "Was ist der erste Teil der Postleitzahl Ihrer Schule/Hochschule/Arbeitsstelle? (Wo Sie den Großteil Ihrer Arbeitszeit/ Ihres Studiums ableisten)"],
            ["fr", "Quelle est le code postal de l'endroit où vous passez la majorité de votre temps de travail ou d'étude?"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })

    // TODO
    return editor.getItem();
}

const q_7_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Which of the following descriptions most closely matches with your main occupation?"],
            ["de", "Welche der folgenden Beschreibungen passt am ehesten zu Ihrer Hauptbeschäftigung?"],
            ["fr", "Laquelle des descriptions suivantes correspond le mieux à votre activité principale?"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_8_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is the highest level of formal education/qualification that you have?"],
            ["de", "Was ist die höchste Stufe formaler Ausbildung/ Qualifikation, die Sie aufweisen?"],
            ["fr", " Quel est votre plus haut niveau d'éducation/qualification formelle?"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_9_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Except people you meet on public transports, do you have contact with any of the following during the course of a typical day? (Select all options that apply, if any)"],
            ["de", "Ausgenommen die Menschen, denen Sie in öffentlichen Verkehrsmitteln begegnen, haben Sie  Kontakt zu irgendwelchen der folgenden Personen im Laufe eines typischen Tages?"],
            ["fr", " A part les gens que vous croisez dans les transports publics, avez-vous des contacts avec un ou plusieurs des groupes suivants au cours d'une journée typique? (Sélectionnez toutes les options applicables)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "INCLUDING YOU, how many people in each of the following age groups live in your household?"],
            ["de", "Wie viele Menschen in den folgenden Altersgruppen leben in Ihrem Haushalt? (SIE EINGESCHLOSSEN)"],
            ["fr", " VOUS Y COMPRIS, combien de personnes de chaque groupe d'âge suivants vivent dans votre maison?"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_11_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How many of the children in your household go to school or day-care?"],
            ["de", "Wie viele Kinder Ihres Haushalts gehen zur Schule oder in die Tagespflege?"],
            ["fr", "Combien d'enfants de votre ménage vont à l'école ou à la garderie?"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_12_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your main means of transport?"],
            ["de", "Was ist ihr hauptsächliches Transportmittel?"],
            ["fr", " Quel est votre principal moyen de transport ?"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_13_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "On a normal day, how much time do you spend on public transport? (Bus, train, tube etc.)"],
            ["de", "Wie viel Zeit verbringen Sie an einem gewöhnlichen Tag in öffentlichen Verkehrsmitteln? (Bus, Zug, U-Bahn, usw.)"],
            ["fr", "Dans une journée normale, combien de temps passez-vous dans les transports publics? (bus, train, métro, etc.)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_14_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How often do you have common colds or flu-like diseases?"],
            ["de", "Wie oft haben Sie eine gewöhnliche Erkältung oder grippeähnliche Erkrankungen?"],
            ["fr", "Avez vous souvent le rhume ou des maladies de type grippal?"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_15_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you receive a flu vaccine during the last autumn/winter season? (2016-2017)"],
            ["de", "Haben Sie in der letzten Herbst/Wintersaison eine Grippeimpfung erhalten? (2018-2019)"],
            ["fr", " Avez-vous été vacciné(e) contre la grippe lors de la dernière saison automne/hiver? (2018-2019)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_16_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Have you received a flu vaccine this autumn/winter season? (2017-2018)"],
            ["de", "Haben Sie eine Grippeimpfung in dieser Herbst-/ Wintersaison erhalten? (2019-2020)"],
            ["fr", " Avez-vous été vacciné(e) contre la grippe cette année? (automne/hiver 2019-2020)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_17_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When were you vaccinated against this flu season? (2017-2018)"],
            ["de", "Wann wurden Sie in dieser Saison gegen Grippe geimpft?"],
            ["fr", "Quand avez-vous été vacciné contre la grippe cette saison? (2019-2020)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_18_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for getting a seasonal influenza vaccination this year? (Select all options that apply)"],
            ["de", "Was waren Ihre Gründe, sich in diesem Jahr impfen zu lassen? (Wählen sie alle Optionen, die zutreffen sind)"],
            ["fr", "Quelles étaient vos motivations pour vous faire vacciner contre la grippe saisonnière cette année? (sélectionnez toutes les options applicables)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_19_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for NOT getting a seasonal influenza vaccination this year? (Select all options that apply)"],
            ["de", "Was waren Ihre Gründe, sich in dieser Saison nicht impfen zu lassen? (Wählen Sie alle Optionen, die zutreffen)"],
            ["fr", " Quelles étaient vos raisons pour ne pas vous faire vacciner contre la grippe saisonnière cette année ? (sélectionnez toutes les options applicables)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_20_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you take regular medication for any of the following medical conditions? (Select all options that apply)"],
            ["de", "Nehmen Sie regelmässig Medikamente gegen eine der folgenden Erkrankungen? (Wählen Sie alle Optionen, die zutreffen)"],
            ["fr", " Souffrez-vous de l'une des maladies suivantes? (sélectionnez toutes les options applicables)"],
        ]))
    );

    editor.addDisplayComponent({
        role: 'text', content: generateLocStrings(new Map([['en', 'todo']]))
    })
    // TODO
    return editor.getItem();
}

const q_21_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Are you currently pregnant?"],
            ["de", "Sind sie im Augenblick schwanger?"],
            ["fr", " Êtes-vous actuellement enceinte?"],
        ]))
    );
    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Pregnancy can result in more severe illness if you are infected with flu."],
                    ["de", "Schwangerschaft kann zu ernsteren Erkrankungen führen, wenn Sie mit der Grippe infiziert sind."],
                    ["fr", "La grossesse peut entraîner des complications si vous êtes infecté par la grippe."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '871', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        }, {
            key: '872', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        }, {
            key: '873', role: 'option',
            content: new Map([
                ["en", "Don't know/would rather not answer"],
                ["de", "Ich weiß nicht bzw. ich möchte das lieber nicht beantworten."],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q_22_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Which trimester of the pregnancy are you in?"],
            ["de", "In welchem Trimester (3 Monatsperiode) Ihrer Schwangerschaft befinden Sie sich?"],
            ["fr", "A quel stade de grossesse êtes-vous?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "The stage of pregnancy might alter your risk of severe flu if you are infected, although this is not very clear."],
                    ["de", "Die Phase Ihrer Schwangerschaft könnte Ihr Risiko eines schweren Verlaufs der Grippe beeinflussen, auch wenn dies nicht sicher ist."],
                    ["fr", "Le stade de grossesse pourrait influencer les risques de grippe grave, bien que ce soit pas démontré."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '874', role: 'option',
            content: new Map([
                ["en", "First trimester (week 1-12)"],
                ["de", "Erstes Trimester (Woche 1-12)"],
                ["fr", "Premier trimestre (semaine 1-12)"],
            ])
        }, {
            key: '875', role: 'option',
            content: new Map([
                ["en", "Second trimester (week 13-28)"],
                ["de", "Zweites Trimester (Woche 13-28)"],
                ["fr", "Deuxième trimestre (semaine 13-28)"],
            ])
        }, {
            key: '876', role: 'option',
            content: new Map([
                ["en", "Third trimester (week 29-delivery)"],
                ["de", "Drittes Trimester (Woche 29 bis Entbindung)"],
                ["fr", "Troisième trimestre (semaine 29 ou plus)"],
            ])
        }, {
            key: '877', role: 'option',
            content: new Map([
                ["en", "Don't know/would rather not answer"],
                ["de", "Ich weiß nicht bzw. ich möchte das lieber nicht beantworten"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q_23_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you smoke tobacco?"],
            ["de", "Rauchen Sie Tabak?"],
            ["fr", "Etes-vous fumeur?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Smoking might make you more likely to get a more severe dose of flu. We would like to test this."],
                    ["de", "Rauchen könnte die Wahrscheinlichkeit erhöhen, dass Sie Ihre Grippe schwere verläuft. Wir möchten dies gerne testen."],
                    ["fr", "Fumer pourrait vous rendre plus susceptible de contracter une grippe sévère."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Please, answer as accurately as possible. If you smoke other products (e.g. pipe or cigars), then indicate roughly how many times a day."],
                    ["de", "Bitte seien Sie so genau wie möglich. Falls sie andere Produkte rauchen (z.B. Pfeife oder Zigarre), dann geben Sie bitte ungefähr an, wie oft am Tag sie diese konsumieren."],
                    ["fr", "Répondez aussi précisément que possible. Si vous fumez autres produits (p. ex. pipe ou cigares), indiquez à peu près combien de fois par jour."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '878', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        }, {
            key: '879', role: 'option',
            content: new Map([
                ["en", "Yes, occasionally"],
                ["de", "Ja, manchmal"],
                ["fr", "Oui, de temps en temps"],
            ])
        }, {
            key: '880', role: 'option',
            content: new Map([
                ["en", "Yes, daily, fewer than 10 times a day"],
                ["de", "Ja, täglich, weniger als 10 mal am Tag"],
                ["fr", " Oui, quotidiennement, moins de 10 fois par jour"],
            ])
        }, {
            key: '881', role: 'option',
            content: new Map([
                ["en", "Yes, daily, 10 or more times a day"],
                ["de", "Ja, täglich, 10 mal oder öfter am Tag"],
                ["fr", " Oui, quotidiennement, 10 fois ou plus par jour"],
            ])
        }, {
            key: '882', role: 'option',
            content: new Map([
                ["en", "Dont know/would rather not answer"],
                ["de", "Ich weiß nicht bzw. ich möchte das nicht beantworten"],
                ["fr", "Je ne sais pas, je ne désire pas répondre"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q_24_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you have one of the following allergies that can cause respiratory symptoms?"],
            ["de", "Haben Sie eine der folgenden Allergien, die Atemwegssymptome auslösen kann?"],
            ["fr", "Avez-vous l'une des allergies suivantes qui peuvent causer des symptômes respiratoires?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Some allergic reactions can have similar symptoms to respiratory infections."],
                    ["de", "Manche allergische Reaktionen können ähnlich Symptome wie Atemwegsinfektionen auslösen."],
                    ["fr", "Certaines réactions allergiques peuvent avoir des symptômes similaires ceux d'une infection respiratoire."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["de", "Wie soll ich das beantworten?"],
                    ["fr", "Comment dois-je répondre?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "Tick all the options that apply. We are only interested in those allergies that cause respiratory symptoms (i.e. sneezing, sunny nose, runny eyes)."],
                    ["de", "Wählen Sie alle Optionen, die zutreffen. Wir interessieren uns nur für jene Allergien, die Atemwegssymptome (z.B. Niesen, laufenden Nase, tränende Augen) verursachen."],
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
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '883', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Hay fever"],
                ["de", "Heuschnupfen"],
                ["fr", "Rhume des foins"],
            ])
        }, {
            key: '884', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Allergy against house dust mite"],
                ["de", "Allergie gegen Hausstaubmilbe"],
                ["fr", "Allergie aux acariens"],
            ])
        }, {
            key: '885', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Allergy against domestic animals or pets"],
                ["de", "Allergien gegen domestizierte Tiere und Haustiere"],
                ["fr", "Allergie à des animaux domestiques"],
            ])
        }, {
            key: '886', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Other allergies that cause respiratory symptoms (e.g. sneezing, runny eyes)"],
                ["de", "Andere Allergien, die Atemwegssymptome verursachen (z.B. Niesen, tränende Augen)"],
                ["fr", " Autres allergies provoquant des symptômes respiratoires (p. ex. éternuements, yeux larmoyants, etc)"],
            ])
        }, {
            key: '887', role: 'option',
            content: new Map([
                ["en", "I do not have an allergy that causes respiratory symptoms"],
                ["de", "Ich habe keine Allergie, die Atemwegssymptome verursacht"],
                ["fr", "Je n'ai pas d'allergie causant des symptômes respiratoires"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q_25_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you follow a special diet?"],
            ["de", "Haben Sie eine spezielle Ernährung?"],
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
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '889', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
            content: new Map([
                ["en", "Vegetarian"],
                ["de", "Vegetarisch"],
                ["fr", "Végétarien"],
            ])
        }, {
            key: '890', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
            content: new Map([
                ["en", "Veganism"],
                ["de", "Vegan"],
                ["fr", "Végétalien"],
            ])
        }, {
            key: '891', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
            content: new Map([
                ["en", "Low-calorie"],
                ["de", "Kalorienarm"],
                ["fr", "Basse-calorie"],
            ])
        }, {
            key: '892', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
                ["fr", "Autre"],
            ])
        }, {
            key: '888', role: 'option',
            content: new Map([
                ["en", "No special diet"],
                ["de", "Keine spezielle Ernährung"],
                ["fr", "Non, pas de régime particulier"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q_26_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you have pets at home?"],
            ["de", "Haben Sie Haustiere?"],
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
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '894', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one or more dogs"],
                ["de", "Ja, einen oder mehrere Hunde"],
                ["fr", "Oui, un ou plusieurs chien(s)"],
            ])
        },
        {
            key: '895', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one or more cats"],
                ["de", "Ja, eine oder mehrere Katzen"],
                ["fr", "Oui, un ou plusieurs chat(s)"],
            ])
        },
        {
            key: '896', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one or more birds"],
                ["de", "Ja, einen oder mehrere Vögel"],
                ["fr", "Oui, un ou plusieurs oiseau(x)"],
            ])
        },
        {
            key: '897', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one ore more other animals"],
                ["de", "Ja, ein oder mehrere andere Tiere"],
                ["fr", "Oui, un ou plusieurs animaux d'autres espèces"],
            ])
        },
        {
            key: '893', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q_27_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Where did you first hear about the flusurvey?"],
            ["de", "Wo haben Sie zum ersten mal von GrippeNet gehört?"],
            ["fr", "Où avez-vous entendu parler de Grippenet?"],
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
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '898', role: 'option',
            content: new Map([
                ["en", "On radio or television"],
                ["de", "Im Radio oder Fernsehen"],
                ["fr", "A la radio ou à la télévision"],
            ])
        }, {
            key: '899', role: 'option',
            content: new Map([
                ["en", "In the newspaper or in a magazine"],
                ["de", "In der Zeitung oder in einem Magazin"],
                ["fr", "Dans un journal ou un magazine"],
            ])
        }, {
            key: '900', role: 'option',
            content: new Map([
                ["en", "Via an internet site (search engine or link)"],
                ["de", "Über eine Internetseite (Suchmaschine oder Link)"],
                ["fr", "Sur internet"],
            ])
        }, {
            key: '901', role: 'option',
            content: new Map([
                ["en", "By poster"],
                ["de", "Über ein Poster"],
                ["fr", "Sur une affiche"],
            ])
        }, {
            key: '902', role: 'option',
            content: new Map([
                ["en", "Via family or friends"],
                ["de", "Über Freunde oder Familie"],
                ["fr", "Par ma famille ou des amis"],
            ])
        }, {
            key: '903', role: 'option',
            content: new Map([
                ["en", "Via school or work"],
                ["de", "Über Schule oder Arbeit"],
                ["fr", "A l'école ou au travail"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}