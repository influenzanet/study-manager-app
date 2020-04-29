import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings, generateTitleComponent, generateHelpGroupComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { initSingleChoiceGroup, initMultipleChoiceGroup, initSliderCategoricalGroup, initMatrixQuestion } from "../editor-engine/utils/question-type-generator";
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

    // country --------------------------------------
    const qcountry = survey.addNewSurveyItem({ itemKey: 'Qcountry' }, rootKey);
    if (!qcountry) { return; }
    survey.updateSurveyItem(Qcountry_def(qcountry));
    // -----------------------------------------

    // home postal-code --------------------------------------
    const q3 = survey.addNewSurveyItem({ itemKey: 'Q3' }, rootKey);
    if (!q3) { return; }
    survey.updateSurveyItem(q3_def(q3));
    // -----------------------------------------

    // main activity --------------------------------------
    const q4 = survey.addNewSurveyItem({ itemKey: 'Q4' }, rootKey);
    if (!q4) { return; }
    survey.updateSurveyItem(q4_def(q4));
    // -----------------------------------------


    // school/work postal code  --------------------------------------
    const q4b = survey.addNewSurveyItem({ itemKey: 'Q4b' }, rootKey);
    if (!q4b) { return; }
    survey.updateSurveyItem(q4b_def(q4b));
    // -----------------------------------------

    // job category  --------------------------------------
    const q4c = survey.addNewSurveyItem({ itemKey: 'Q4c' }, rootKey);
    if (!q4c) { return; }
    survey.updateSurveyItem(q4c_def(q4c));
    // -----------------------------------------

    // eductaion_level  --------------------------------------
    const q4d = survey.addNewSurveyItem({ itemKey: 'Q4d' }, rootKey);
    if (!q4d) { return; }
    survey.updateSurveyItem(q4d_def(q4d));
    // -----------------------------------------

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
    survey.updateSurveyItem(q6b_def(q6b));
    // -----------------------------------------

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
    survey.updateSurveyItem(q10b_def(q10b));
    // -----------------------------------------

    // flue vaccine reason for --------------------------------------
    const q10c = survey.addNewSurveyItem({ itemKey: 'Q10c' }, rootKey);
    if (!q10c) { return; }
    survey.updateSurveyItem(q10c_def(q10c));
    // -----------------------------------------

    // flue vaccine reason against --------------------------------------
    const q10d = survey.addNewSurveyItem({ itemKey: 'Q10d' }, rootKey);
    if (!q10d) { return; }
    survey.updateSurveyItem(q10d_def(q10d));
    // -----------------------------------------

    // regular medication --------------------------------------
    const q11 = survey.addNewSurveyItem({ itemKey: 'Q11' }, rootKey);
    if (!q11) { return; }
    survey.updateSurveyItem(q11_def(q11));
    // -----------------------------------------

    // pregnant --------------------------------------
    const q12 = survey.addNewSurveyItem({ itemKey: 'Q12' }, rootKey);
    if (!q12) { return; }
    survey.updateSurveyItem(q12_def(q12));
    // -----------------------------------------

    // trimester --------------------------------------
    const q12b = survey.addNewSurveyItem({ itemKey: 'Q12b' }, rootKey);
    if (!q12b) { return; }
    survey.updateSurveyItem(q12b_def(q12b));
    // -----------------------------------------

    // do you smoke --------------------------------------
    const q13 = survey.addNewSurveyItem({ itemKey: 'Q13' }, rootKey);
    if (!q13) { return; }
    survey.updateSurveyItem(q13_def(q13));
    // -----------------------------------------

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
    const q17 = survey.addNewSurveyItem({ itemKey: 'Q17' }, rootKey);
    if (!q17) { return; }
    survey.updateSurveyItem(q17_def(q17));
    // -----------------------------------------

    return survey.getSurvey();
}



const q1_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "Male"],
                ["de", "Männlich"],
                ["fr", "Homme"],
            ])
        },
        {
            key: '1', role: 'option',
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


const q2_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
        key: 'TODO',
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


const Qcountry_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: 'NL', role: 'option',
            content: new Map([
                ["en", "Netherlands"],
                ["de", "Niederlande"],
                ["fr", "Pays-Bas"],
            ])
        },
        {
            key: 'BE', role: 'option',
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

const q3_def = (itemSkeleton: SurveyItem): SurveyItem => {
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

const q4_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "Paid employment, full time"],
                ["de", "Bezahlte Beschäftigung (Vollzeit)"],
                ["fr", "Employé à plein temps"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Paid employment, part time"],
                ["de", "Bezahlte Beschäftigung (Teilzeit)"],
                ["fr", "Employé à temps partiel"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Self-employed (businessman, farmer, tradesman, etc.)"],
                ["de", "Selbstständig (UnternehmerIn, LandwirtIn, HändlerIn, usw.)"],
                ["fr", " Indépendant (homme d'affaires , agriculteur , commerçant, etc.)"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Attending daycare/school/college/university"],
                ["de", "Tagespflege/ Schule/ Hochschule/ Universität"],
                ["fr", "Ecolier, étudiant (garderie / école / université)"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Home-maker (e.g. housewife)"],
                ["de", "Im Haushalt tätig (z.B. Hausfrau/ Hausmann)"],
                ["fr", "Femme/homme au foyer"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Unemployed"],
                ["de", "Arbeitslos"],
                ["fr", "Sans-emploi"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "Long-term sick-leave or parental leave"],
                ["de", "Langfristiger Krankenurlaub oder Elternzeit"],
                ["fr", "En congé maladie à long terme, en congé maternité"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "Retired"],
                ["de", "Im Ruhestand"],
                ["fr", "Retraité"],
            ])
        },
        {
            key: '8', role: 'input',
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


const q4b_def = (itemSkeleton: SurveyItem): SurveyItem => {
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

const q4c_def = (itemSkeleton: SurveyItem): SurveyItem => {
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

const q4d_def = (itemSkeleton: SurveyItem): SurveyItem => {
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

const q5_def = (itemSkeleton: SurveyItem): SurveyItem => {
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

const q6_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "INCLUDING YOU, how many people in each of the following age groups live in your household?"],
            ["de", "Wie viele Menschen in den folgenden Altersgruppen leben in Ihrem Haushalt? (SIE EINGESCHLOSSEN)"],
            ["fr", " VOUS Y COMPRIS, combien de personnes de chaque groupe d'âge suivants vivent dans votre maison?"],
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
                    ["en", "Members of larger households, or those with children, may be more likely to catch flu than the others."],
                    ["de", "Mitglieder von großen Haushalten oder Haushalten mit Kindern könnten einen höheres Risiko als andere haben, sich mit der Grippe zu infizieren."],
                    ["fr", "Les membres des ménages les plus grands, ou ceux possédant des enfants, peuvent être plus susceptibles d'attraper la grippe que les autres."],
                ]),
                style: [{ key: 'variant', value: 'body2' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initMatrixQuestion(matrixKey, [
        {
            key: '1', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "0-4 years"],
                        ["de", "0-4 Jahre"],
                        ["fr", "0-4 ans"],
                    ])
                },
                {
                    key: 'v', role: 'numberInput',
                    properties: {
                        min: { dtype: 'num', num: -5 },
                        max: { dtype: 'num', num: 10 },
                    }
                }
            ],
        },
        {
            key: '2', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "5-18 years"],
                        ["de", "5-18 Jahre"],
                        ["fr", "5-18 ans"],
                    ])
                },
                {
                    key: 'v', role: 'dropDownGroup',
                    items: [
                        {
                            key: '0', role: 'option', content: new Map([
                                ["en", "0"],
                                ["de", "0"],
                                ["fr", "0"],
                            ])
                        },
                        {
                            key: '1', role: 'option', content: new Map([
                                ["en", "1"],
                                ["de", "1"],
                                ["fr", "1"],
                            ]),
                        }, {
                            key: '2', role: 'option', content: new Map([
                                ["en", "2"],
                                ["de", "2"],
                                ["fr", "2"],
                            ]),
                        }, {
                            key: '3', role: 'option', content: new Map([
                                ["en", "3"],
                                ["de", "3"],
                                ["fr", "3"],
                            ]),
                        }, {
                            key: '4', role: 'option', content: new Map([
                                ["en", "4"],
                                ["de", "4"],
                                ["fr", "4"],
                            ]),
                        }, {
                            key: '5', role: 'option', content: new Map([
                                ["en", "5"],
                                ["de", "5"],
                                ["fr", "5"],
                            ]),
                        }, {
                            key: '5+', role: 'option', content: new Map([
                                ["en", "5+"],
                                ["de", "5+"],
                                ["fr", "5+"],
                            ]),
                        },
                    ]
                }
            ],
        },
        {
            key: '3', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "19-44 years"],
                        ["de", "19-44 Jahre"],
                        ["fr", "19-44 ans"],
                    ])
                },
                {
                    key: 'v', role: 'label',
                    content: new Map([
                        ["en", "todo"],
                    ])
                },
            ]
        },
        {
            key: '4', role: 'responseRow',
            cells: [
                {
                    key: 'l', role: 'label',
                    content: new Map([
                        ["en", "45-64 years"],
                        ["de", "45-65 Jahre"],
                        ["fr", "45-64 ans"],
                    ])
                },
                {
                    key: 'v', role: 'label',
                    content: new Map([
                        ["en", "todo"],
                    ])
                },
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
                        ["fr", "plus de 65 ans"],
                    ])
                },
                {
                    key: 'v', role: 'label',
                    content: new Map([
                        ["en", "todo"],
                    ])
                },
            ]
        }
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q6b_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How many of the children in your household go to school or day-care?"],
            ["de", "Wie viele Kinder Ihres Haushalts gehen zur Schule oder in die Tagespflege?"],
            ["fr", "Combien d'enfants de votre ménage vont à l'école ou à la garderie?"],
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
                    ["en", "Attending school or day-care may be a risk for acquiring flu and similar illnesses. We would like to check this."],
                    ["de", "Der Besuch einer Schule oder Tagespflege könnte ein Risiko darstellen, an der Grippe und ähnlichen Krankheiten zu erkranken. Wir würden dies gerne überprüfen."],
                    ["fr", "Fréquenter l'école ou à la garderie pourrait augmenter les risques de contracter la grippe et des maladies similaires. Nous tenons à le vérifier."],
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
                    ["en", "If your child attends regular school or day-care (even this is just one day a week) then please answer yes to this. Attendance of clubs and activities does not count - even if regular."],
                    ["de", "Falls Ihr Kind regelmässig die Schule oder Tagespflege besucht (auch wenn es nur ein Tag pro Woche ist), antworten Sie bitte mit ja. Anwesenheit in Vereinen oder andere Aktivitäten zählen nicht, auch dann nicht, wenn Sie regelmässig sind."],
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
                ["de", "Mehr als 5"],
                ["fr", "Plus de 5"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q7_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your main means of transport?"],
            ["de", "Was ist ihr hauptsächliches Transportmittel?"],
            ["fr", " Quel est votre principal moyen de transport ?"],
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
                    ["en", "It has been suggested that using public transport may be a risk for flu. We would like to check this."],
                    ["de", "Es wurde vorgeschlagen, dass die Benutzung von öffentlichen Verkehrsmitteln ein Risiko für eine Grippeinfektion darstellt."],
                    ["fr", "Il a été suggéré que l'utilisation des transports publics augmente les risques de contracter la grippe. Nous tenons à le vérifier."],
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
                    ["en", "Tick the option that best represents your most normal mode of transport."],
                    ["de", "Wählen Sie die Option, die am besten Ihrem normalerweise verwendeten Transportmittel entspricht."],
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
                ["fr", "La marche"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Bike"],
                ["de", "Fahrrad"],
                ["fr", "Le vélo"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Motorbike/scooter"],
                ["de", "Motorrad/Roller"],
                ["fr", "Le scooter, la moto"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Car"],
                ["de", "Auto"],
                ["fr", "La voiture"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Public transportation (bus, train, tube, etc)"],
                ["de", "Öffentliche Verkehrsmittel (Bus, Zug, U-Bahn, usw.)"],
                ["fr", "Transports publics (bus, train, métro, etc)"],
            ])
        },
        {
            key: '5', role: 'input',
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

const q7b_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "On a normal day, how much time do you spend on public transport? (Bus, train, tube etc.)"],
            ["de", "Wie viel Zeit verbringen Sie an einem gewöhnlichen Tag in öffentlichen Verkehrsmitteln? (Bus, Zug, U-Bahn, usw.)"],
            ["fr", "Dans une journée normale, combien de temps passez-vous dans les transports publics? (bus, train, métro, etc.)"],
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
                    ["en", "It has been suggested that using public transport may be a risk for getting flu. We would like to check this."],
                    ["de", "Es wurde vorgeschlagen, dass die Benutzung von öffentlichen Verkehrsmitteln ein Risiko für eine Grippeinfektion darstellt. Wir möchten dies überprüfen."],
                    ["fr", "Il a été suggéré que l'utilisation des transports publics augmente les risques de contracter la grippe. Nous tenons à le vérifier."],
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
                    ["en", "Think of a typical day. If you use several different forms of public transport each day, remember to include all journeys. Don't include taxis or other forms of private transport."],
                    ["de", "Denken Sie an einen gewöhnlichen Tag. Falls Sie mehrere verschiedene Transportmittel benutzen, vergessen Sie nicht, alle Reisen mit einzubeziehen. Taxis und andere private Transportmittel zählen allerdings nicht dazu."],
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
                ["de", "Gar nicht"],
                ["fr", "Pas de temps du tout"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "0-30 minutes"],
                ["de", "0 - 30 Minuten"],
                ["fr", "0-30 minutes"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "30 minutes - 1.5 hours"],
                ["de", "30 Minuten – 1.5 Stunden"],
                ["fr", "30 minutes - 1.5 heures"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "1.5 hours - 4 hours"],
                ["de", "1.5 Stunden – 4 Stunden"],
                ["fr", "1.5 - 4 heures"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Over 4 hours"],
                ["de", "Mehr als 4 Stunden"],
                ["fr", "Plus de 4 heures"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q8_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "How often do you have common colds or flu-like diseases?"],
            ["de", "Wie oft haben Sie eine gewöhnliche Erkältung oder grippeähnliche Erkrankungen?"],
            ["fr", "Avez vous souvent le rhume ou des maladies de type grippal?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "Never"],
                ["de", "Nie"],
                ["fr", "Jamais"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Once or twice a year"],
                ["de", "Einmal oder zweimal im Jahr"],
                ["fr", "1 ou 2 fois par an"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Between 3 and 5 times a year"],
                ["de", "Zwischen 3 und 5 mal im Jahr"],
                ["fr", "De 3 à 5 fois par an"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Between 6 and 10 times a year"],
                ["de", "Zwischen 6 und 10 mal im Jahr"],
                ["fr", "De 6 à 10 fois par an"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "More that 10 times a year"],
                ["de", "Mehr als 10 mal"],
                ["fr", "Plus de 10 fois par an"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiß nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q9_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you receive a flu vaccine during the last autumn/winter season? (2016-2017)"],
            ["de", "Haben Sie in der letzten Herbst/Wintersaison eine Grippeimpfung erhalten? (2018-2019)"],
            ["fr", " Avez-vous été vacciné(e) contre la grippe lors de la dernière saison automne/hiver? (2018-2019)"],
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
                    ["en", "We would like to be able to work out how much protection the vaccine gives. We would also like to find out if there is some protection from vaccines received in previous years."],
                    ["de", "Wir möchten in der Lage sein herauszufinden, wie viel Schutz die Impfung bietet. Wir möchten außerdem feststellen, ob ein gewisser Schutz durch Impfungen des vorausgehenden Jahres besteht."],
                    ["fr", "Nous aimerions savoir à quel point la protection par le vaccin fonctionne. Nous aimerions aussi savoir si il y a une certaine protection par les vaccins reçus au cours des années précédentes."],
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
                    ["en", "Report yes, if you received the vaccine this season, usually in the autumn. If you get vaccinated after filling in this questionnaire, please return to this and update your answer."],
                    ["de", "Antworten Sie mit ja, falls Sie eine Impfung in dieser Saison, normalerweise im Herbst, erhalten haben. Falls Sie nach Beantwortung dieses Fragebogens geimpft werden, kehren Sie bitte hierher zurück und aktualisieren Sie Ihre Antwort."],
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
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiß nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Have you received a flu vaccine this autumn/winter season? (2017-2018)"],
            ["de", "Haben Sie eine Grippeimpfung in dieser Herbst-/ Wintersaison erhalten? (2019-2020)"],
            ["fr", " Avez-vous été vacciné(e) contre la grippe cette année? (automne/hiver 2019-2020)"],
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
                    ["en", "We would like to be able to work out how much protection the vaccine gives."],
                    ["de", "Wir möchten in der Lage sein herauszufinden, wie viel Schutz die Impfung bietet."],
                    ["fr", "Nous aimerions savoir à quel point la protection par le vaccin fonctionne."],
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
                    ["en", "Report yes, if you received the vaccine this season, usually in the autumn. If you get vaccinated after filling in this questionnaire, please return to this and update your answer."],
                    ["de", "Antworten Sie mit ja, falls Sie eine Impfung in dieser Saison, normalerweise im Herbst, erhalten haben. Falls Sie nach Beantwortung dieses Fragebogens geimpft werden, kehren Sie bitte hierher zurück und aktualisieren Sie Ihre Antwort."],
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
                ["fr", "Oui"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't know"],
                ["de", "Ich weiß nicht"],
                ["fr", "Je ne sais pas"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q10b_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "When were you vaccinated against this flu season? (2017-2018)"],
            ["de", "Wann wurden Sie in dieser Saison gegen Grippe geimpft?"],
            ["fr", "Quand avez-vous été vacciné contre la grippe cette saison? (2019-2020)"],
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
                    ["en", "Knowing when people are vaccinated tells us how well the vaccination programme is being carried out."],
                    ["de", "Der Zeitpunkt der Impfung zeigt uns, wie gut die Impfprogramme ausgeführt werden."],
                    ["fr", "Savoir quand les gens sont vaccinés nous permet d'évaluer le succès des campagnes de vaccination."],
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
                    ["en", "Please, try and answer as accurately as possible. If you don't know the precise date, please give your best estimate. For instance, you might remember the month, then try and remember if it was at the beginning or the end of the month. Were there any significant events (e.g. a holiday or a birthday) that might help jog your memory?"],
                    ["de", "Bitte versuchen Sie so genau wie möglich zu antworten. Falls Sie das genaue Datum nicht kennen, dann geben Sie bitte Ihre bestmögliche Abschätzung. Falls Sie sich z.B. den Monat wissen, versuchen Sie sich zu erinnern, ob es am Anfang oder Ende des Monats war. Waren an diesem Tag vielleicht irgendwelche bedeutenden Ereignisse (z.B. ein Feiertag oder ein Geburtstag), die Ihrem Gedächtnis weiterhelfen könnten?"],
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
                ["de", "Wählen Sie das Datum:"],
                ["fr", "Sélectionner une date"],
            ])
        },
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I don't know/can't remember"],
                ["de", "Ich weiß nicht bzw. ich kann mich nicht erinnern"],
                ["fr", "Je ne sais pas, je ne m'en souviens plus"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q10c_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for getting a seasonal influenza vaccination this year?"],
            ["de", "Was waren Ihre Gründe, sich in diesem Jahr impfen zu lassen?"],
            ["fr", "Quelles étaient vos motivations pour vous faire vacciner contre la grippe saisonnière cette année?"],
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "I belong to a risk group (e.g, pregnant, over 65, underlying health condition, etc)"],
                ["de", "Ich gehöre zu einer Risikogruppe (z.B. Schwangere, über 65, allgemeiner Gesundheitszustand)"],
                ["fr", "Je fais partie d'un groupe à risque (p. ex. femmes enceintes, plus de 65 ans, état de santé créant un prédisposition, etc.)"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases my risk of getting influenza"],
                ["de", "Eine Impfung verringert mein Risiko, die Grippe zu bekommen"],
                ["fr", " La vaccination diminue mon risque de contracter la grippe"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Vaccination decreases the risk of spreading influenza to others"],
                ["de", "Eine Impfung verringert das Risiko, andere mit der Grippe zu infizieren"],
                ["fr", " La vaccination diminue le risque de propager la grippe à d'autres"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "My doctor recommended it"],
                ["de", "Mein Arzt hat es mir empfohlen"],
                ["fr", "Mon médecin me l'a recommandé"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "It was recommended in my workplace/school"],
                ["de", "Es wurde mir von der Arbeit/ Schule empfohlen"],
                ["fr", " Il a été recommandé sur mon lieu de travail / à l'école"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "The vaccine was readily available and vaccine administration was convenient"],
                ["de", "Der Impfstoff war leicht verfügbar und die Organisation der Impfung war einfach."],
                ["fr", " Le vaccin était disponible et l'administration du vaccin était pratique"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "The vaccine was free (no cost)"],
                ["de", "Der Impfstoff war kostenlos."],
                ["fr", "Le vaccin était gratuit"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I don't want to miss work/school"],
                ["de", "Ich möchte in der Arbeit/ Schule nicht fehlen"],
                ["fr", " Je ne veux pas manquer le travail / l'école"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "I always get the vaccine"],
                ["de", "Ich lasse mich immer impfen."],
                ["fr", "Je me fais systématiquement vacciner"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "Other reason(s)"],
                ["de", "Andere Gründe"],
                ["fr", "Autres raisons"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q10d_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What were your reasons for NOT getting a seasonal influenza vaccination this year?"],
            ["de", "Was waren Ihre Gründe, sich in dieser Saison nicht impfen zu lassen?"],
            ["fr", " Quelles étaient vos raisons pour ne pas vous faire vacciner contre la grippe saisonnière cette année?"],
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
                    ["en", "We would like to know why some people get vaccinated and others do not."],
                    ["de", "Wir möchten wissen, warum manche Menschen geimpft werden und andere nicht."],
                    ["fr", "Nous aimerions savoir pourquoi certaines personnes se font vacciner et d'autres pas."],
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
                    ["en", "Tick all those reasons that were important in your decision."],
                    ["de", "Wählen Sie alle Gründe, die für Ihre Entscheidung wichtig waren."],
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
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "I am planning to be vaccinated, but haven't been yet"],
                ["de", "Ich habe vor, mich impfen zu lassen, es aber noch nicht getan."],
                ["fr", "Je prévois de me faire vacciner mais ne l'ai pas encore fait"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "I haven't been offered the vaccine"],
                ["de", "Mir wurde die Impfung nicht angeboten"],
                ["fr", "La vaccination ne m'a pas été proposée"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "I don't belong to a risk group"],
                ["de", "Ich gehöre zu keiner Risikogruppe"],
                ["fr", "Je ne fais pas partie d'un groupe à risque"],
            ])
        },
        {
            key: '3', role: 'option',
            content: new Map([
                ["en", "It is better to build your own natural immunity against influenza"],
                ["de", "Es ist besser, seine eigenen, natürlichen Abwehrkräfte gegen die Grippe zu entwickeln."],
                ["fr", "Il est préférable de développer sa propre immunité naturelle contre la grippe"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "I doubt that the influenza vaccine is effective"],
                ["de", "Ich bezweifle, dass der Grippeimpfstoff wirkungsvoll ist"],
                ["fr", "Je doute que le vaccin contre la grippe soit efficace"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Influenza is a minor illness"],
                ["de", "Die Grippe ist eine harmlose Krankheit"],
                ["fr", " La grippe est une maladie bénigne"],
            ])
        },
        {
            key: '6', role: 'option',
            content: new Map([
                ["en", "I don't think I am likely to get influenza"],
                ["de", "Ich denke es ist unwahrscheinlich, dass ich die Grippe bekomme"],
                ["fr", "Je ne pense pas être susceptible de contracter la grippe"],
            ])
        },
        {
            key: '7', role: 'option',
            content: new Map([
                ["en", "I believe that influenza vaccine can cause influenza"],
                ["de", "Ich glaube, dass der Grippeimpfstoff die Grippe auslösen kann"],
                ["fr", " Je crois que le vaccin antigrippal peut causer la grippe"],
            ])
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["en", "I am worried that the vaccine is not safe or will cause illness or other adverse events"],
                ["de", "Ich bin besorgt, dass der Impfstoff nicht sicher ist oder, dass dieser andere Krankheiten oder unerwünschte Ereignisse fördern wird"],
                ["fr", "Je pense que le vaccin n'est pas sûr ou qu'il peut causer d'autres maladies ou effets indésirables"],
            ])
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["en", "I don't like having vaccinations"],
                ["de", "Ich mag keine Impfungen"],
                ["fr", "Je n'aime pas me faire vacciner"],
            ])
        }, {
            key: '10', role: 'option',
            content: new Map([
                ["en", "The vaccine is not readily available to me"],
                ["de", "Der Impfstoff ist für mich nicht leicht verfügbar"],
                ["fr", " Le vaccin n'est pas facilement disponible pour moi"],
            ])
        }, {
            key: '11', role: 'option',
            content: new Map([
                ["en", "The vaccine is not free of charge"],
                ["de", "Der Impfstoff ist nicht kostenlos"],
                ["fr", " Le vaccin n'est pas gratuit"],
            ])
        }, {
            key: '12', role: 'option',
            content: new Map([
                ["en", "No particular reason"],
                ["de", "Kein bestimmter Grund"],
                ["fr", " Aucune raison particulière"],
            ])
        }, {
            key: '13', role: 'option',
            content: new Map([
                ["en", "Although my doctor recommended a vaccine, I did not get one"],
                ["de", "Obwohl mein Arzt mir eine Impfung empfohlen hat, habe ich keine erhalten"],
                ["fr", " Bien que mon médecin me l'ait recommandé, je ne me suis pas fait vacciner"],
            ])
        }, {
            key: '14', role: 'option',
            content: new Map([
                ["en", "Other reason(s)"],
                ["de", "Andere Gründe"],
                ["fr", "Autre(s) raison(s)"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q11_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Do you take regular medication for any of the following medical conditions?"],
            ["de", "Nehmen Sie regelmässig Medikamente gegen eine der folgenden Erkrankungen?"],
            ["fr", " Souffrez-vous de l'une des maladies suivantes?"],
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
                    ["en", "This question allows us to find out whether you have other medical conditions that may increase your risk of having more severe illness if you are infected with flu."],
                    ["de", "Diese Frage erlaubt es uns, herauszufinden, ob Sie andere Krankheiten haben, die Ihr Risiko für ernstere Krankheiten erhöhen könnten, falls Sie sich mit der Grippe infizieren."],
                    ["fr", "Cette question nous permet de savoir si vous avez des prédispositions qui pourraient augmenter votre risque d'avoir des complications si vous contractez la grippe."],
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
                    ["en", 'Only answer "yes" if you take regular medication for your medical problem. If, for instance, you only occasionally take an asthma inhaler, then do not answer "yes" for asthma.'],
                    ["de", "Antworten Sie nur mit ja, falls Sie regelmässig Medikamente gegen Ihre Krankheit nehmen. Falls Sie z.B. gelegentlich eine Asthmainhalator verwenden, dann antworten sie nicht mit ja für Asthma."],
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
                ['de', 'Wählen Sie alle Optionen, die zutreffen'],
                ["fr", "sélectionnez toutes les options applicables"],
            ])),
    }, rg?.key);

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '864'),
            content: new Map([
                ["en", "Asthma"],
                ["de", "Asthma"],
                ["fr", "Asthme"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '864'),
            content: new Map([
                ["en", "Diabetes"],
                ["de", " Diabetes "],
                ["fr", "Diabètes"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '864'),
            content: new Map([
                ["en", "Chronic lung disorder besides asthma e.g. COPD, emphysema, or other disorders that affect your breathing"],
                ["de", "Chronische Lungenerkrankungen außer Asthma, z.B. COPD, Emphysem oder andere Beschwerden, die Ihre Atmung betreffen"],
                ["fr", "Troubles pulmonaires chroniques à part l'asthme (p. ex. MPOC, emphysème, ou autres troubles affectant votre respiration)"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '864'),
            content: new Map([
                ["en", "Heart disorder"],
                ["de", "Herzbeschwerden"],
                ["fr", "Troubles cardiaques"],
            ])
        },
        {
            key: '5', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '864'),
            content: new Map([
                ["en", "Kidney disorder"],
                ["de", "Nierenbeschwerden"],
                ["fr", "Troubles rénaux"],
            ])
        },
        {
            key: '6', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '864'),
            content: new Map([
                ["en", "An immunocompromising condition (e.g. splenectomy, organ transplant, acquired immune deficiency, cancer treatment)"],
                ["de", "Eine immunschwächende Behandlung oder Erkrankung (z.B. Splenektomie, Organtransplantation, erworbenen Immunschwäche, Krebsbehandlung)"],
                ["fr", "Immunodéficience (p.ex splénectomie, greffe d'organe, immunodéficience acquise, traitement anti-cancéreux)"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q12_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "Yes"],
                ["de", "Ja"],
                ["fr", "Oui"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        }, {
            key: '2', role: 'option',
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

const q12b_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "First trimester (week 1-12)"],
                ["de", "Erstes Trimester (Woche 1-12)"],
                ["fr", "Premier trimestre (semaine 1-12)"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Second trimester (week 13-28)"],
                ["de", "Zweites Trimester (Woche 13-28)"],
                ["fr", "Deuxième trimestre (semaine 13-28)"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Third trimester (week 29-delivery)"],
                ["de", "Drittes Trimester (Woche 29 bis Entbindung)"],
                ["fr", "Troisième trimestre (semaine 29 ou plus)"],
            ])
        }, {
            key: '3', role: 'option',
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

const q13_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "Yes, occasionally"],
                ["de", "Ja, manchmal"],
                ["fr", "Oui, de temps en temps"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Yes, daily, fewer than 10 times a day"],
                ["de", "Ja, täglich, weniger als 10 mal am Tag"],
                ["fr", " Oui, quotidiennement, moins de 10 fois par jour"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, daily, 10 or more times a day"],
                ["de", "Ja, täglich, 10 mal oder öfter am Tag"],
                ["fr", " Oui, quotidiennement, 10 fois ou plus par jour"],
            ])
        }, {
            key: '4', role: 'option',
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

const q14_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Hay fever"],
                ["de", "Heuschnupfen"],
                ["fr", "Rhume des foins"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Allergy against house dust mite"],
                ["de", "Allergie gegen Hausstaubmilbe"],
                ["fr", "Allergie aux acariens"],
            ])
        }, {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Allergy against domestic animals or pets"],
                ["de", "Allergien gegen domestizierte Tiere und Haustiere"],
                ["fr", "Allergie à des animaux domestiques"],
            ])
        }, {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '887'),
            content: new Map([
                ["en", "Other allergies that cause respiratory symptoms (e.g. sneezing, runny eyes)"],
                ["de", "Andere Allergien, die Atemwegssymptome verursachen (z.B. Niesen, tränende Augen)"],
                ["fr", " Autres allergies provoquant des symptômes respiratoires (p. ex. éternuements, yeux larmoyants, etc)"],
            ])
        }, {
            key: '5', role: 'option',
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

const q15_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "No special diet"],
                ["de", "Keine spezielle Ernährung"],
                ["fr", "Non, pas de régime particulier"],
            ])
        }, {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
            content: new Map([
                ["en", "Vegetarian"],
                ["de", "Vegetarisch"],
                ["fr", "Végétarien"],
            ])
        }, {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
            content: new Map([
                ["en", "Veganism"],
                ["de", "Vegan"],
                ["fr", "Végétalien"],
            ])
        }, {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
            content: new Map([
                ["en", "Low-calorie"],
                ["de", "Kalorienarm"],
                ["fr", "Basse-calorie"],
            ])
        }, {
            key: '4', role: 'input',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '888'),
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

const q16_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "No"],
                ["de", "Nein"],
                ["fr", "Non"],
            ])
        },
        {
            key: '1', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one or more dogs"],
                ["de", "Ja, einen oder mehrere Hunde"],
                ["fr", "Oui, un ou plusieurs chien(s)"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one or more cats"],
                ["de", "Ja, eine oder mehrere Katzen"],
                ["fr", "Oui, un ou plusieurs chat(s)"],
            ])
        },
        {
            key: '3', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one or more birds"],
                ["de", "Ja, einen oder mehrere Vögel"],
                ["fr", "Oui, un ou plusieurs oiseau(x)"],
            ])
        },
        {
            key: '4', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '893'),
            content: new Map([
                ["en", "Yes, one ore more other animals"],
                ["de", "Ja, ein oder mehrere andere Tiere"],
                ["fr", "Oui, un ou plusieurs animaux d'autres espèces"],
            ])
        },
    ]);

    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q17_def = (itemSkeleton: SurveyItem): SurveyItem => {
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
            key: '0', role: 'option',
            content: new Map([
                ["en", "On radio or television"],
                ["de", "Im Radio oder Fernsehen"],
                ["fr", "A la radio ou à la télévision"],
            ])
        }, {
            key: '1', role: 'option',
            content: new Map([
                ["en", "In the newspaper or in a magazine"],
                ["de", "In der Zeitung oder in einem Magazin"],
                ["fr", "Dans un journal ou un magazine"],
            ])
        }, {
            key: '2', role: 'option',
            content: new Map([
                ["en", "Via an internet site (search engine or link)"],
                ["de", "Über eine Internetseite (Suchmaschine oder Link)"],
                ["fr", "Sur internet"],
            ])
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["en", "By poster"],
                ["de", "Über ein Poster"],
                ["fr", "Sur une affiche"],
            ])
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Via family or friends"],
                ["de", "Über Freunde oder Familie"],
                ["fr", "Par ma famille ou des amis"],
            ])
        }, {
            key: '5', role: 'option',
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