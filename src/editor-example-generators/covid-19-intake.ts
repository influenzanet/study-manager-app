import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings, generateTitleComponent, generateHelpGroupComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { initSingleChoiceGroup } from "../editor-engine/utils/question-type-generator";
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

    // country ??

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

    // flu vaccine  --------------------------------------
    const q_15 = survey.addNewSurveyItem({ itemKey: 'todo_15' }, rootKey);
    if (!q_15) { return; }
    survey.updateSurveyItem(q_15_def(q_15));
    // -----------------------------------------

    // flue vaccine last --------------------------------------
    const q_16 = survey.addNewSurveyItem({ itemKey: 'todo_16' }, rootKey);
    if (!q_16) { return; }
    survey.updateSurveyItem(q_16_def(q_16));
    // -----------------------------------------

    // flue vaccine this --------------------------------------
    const q_17 = survey.addNewSurveyItem({ itemKey: 'todo_17' }, rootKey);
    if (!q_17) { return; }
    survey.updateSurveyItem(q_17_def(q_17));
    // -----------------------------------------

    // flue vaccine when --------------------------------------
    const q_18 = survey.addNewSurveyItem({ itemKey: 'todo_18' }, rootKey);
    if (!q_18) { return; }
    survey.updateSurveyItem(q_18_def(q_18));
    // -----------------------------------------

    // flue vaccine reason for --------------------------------------
    const q_19 = survey.addNewSurveyItem({ itemKey: 'todo_19' }, rootKey);
    if (!q_19) { return; }
    survey.updateSurveyItem(q_19_def(q_19));
    // -----------------------------------------

    // flue vaccine reason against --------------------------------------
    const q_20 = survey.addNewSurveyItem({ itemKey: 'todo_20' }, rootKey);
    if (!q_20) { return; }
    survey.updateSurveyItem(q_20_def(q_20));
    // -----------------------------------------

    // regular medication --------------------------------------
    const q_21 = survey.addNewSurveyItem({ itemKey: 'todo_21' }, rootKey);
    if (!q_21) { return; }
    survey.updateSurveyItem(q_21_def(q_21));
    // -----------------------------------------

    // pregnant --------------------------------------
    const q_22 = survey.addNewSurveyItem({ itemKey: 'todo_22' }, rootKey);
    if (!q_22) { return; }
    survey.updateSurveyItem(q_22_def(q_22));
    // -----------------------------------------

    // trimester --------------------------------------
    const q_23 = survey.addNewSurveyItem({ itemKey: 'todo_23' }, rootKey);
    if (!q_23) { return; }
    survey.updateSurveyItem(q_23_def(q_23));
    // -----------------------------------------

    // do you smoke --------------------------------------
    const q_24 = survey.addNewSurveyItem({ itemKey: 'todo_24' }, rootKey);
    if (!q_24) { return; }
    survey.updateSurveyItem(q_24_def(q_24));
    // -----------------------------------------

    // allergies --------------------------------------
    const q_25 = survey.addNewSurveyItem({ itemKey: 'todo_25' }, rootKey);
    if (!q_25) { return; }
    survey.updateSurveyItem(q_25_def(q_25));
    // -----------------------------------------

    // special diet --------------------------------------
    const q_26 = survey.addNewSurveyItem({ itemKey: 'todo_26' }, rootKey);
    if (!q_26) { return; }
    survey.updateSurveyItem(q_26_def(q_26));
    // -----------------------------------------

    // pets --------------------------------------
    const q_27 = survey.addNewSurveyItem({ itemKey: 'todo_27' }, rootKey);
    if (!q_27) { return; }
    survey.updateSurveyItem(q_27_def(q_27));
    // -----------------------------------------

    // how did you find us --------------------------------------
    const q_28 = survey.addNewSurveyItem({ itemKey: 'todo_28' }, rootKey);
    if (!q_28) { return; }
    survey.updateSurveyItem(q_28_def(q_28));
    // -----------------------------------------

    return survey.getSurvey();
}



const q_gender_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your gender?"],
            ["de", "Welches Geschlecht haben Sie?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether the chance of getting flu is different between men and women."],
                    ["de", "Um herauszufinden, ob das Risiko, an der Grippe zu erkranken, unterschiedlich für Männer und Frauen ist."],
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
            ])
        },
        {
            key: '768', role: 'option',
            content: new Map([
                ["en", "Female"],
                ["de", "Weiblich"],
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
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "The chance of getting flu and the risk of more serious complications vary by age."],
                    ["de", "Das Risiko an der Grippe zu erkranken und das Risiko ernster Komplikationen variiert mit dem Alter."],
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


const q_4_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_main_activity_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your main activity?"],
            ["de", "Was ist Ihre Hauptbeschäftigung?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["de", "Warum fragen wir das?"],
                ]),
                style: [{ key: 'variant', value: 'subtitle2' }],
            },
            {
                content: new Map([
                    ["en", "To check how representative our sample is compared to the population as a whole, and to find out whether the chance of getting flu is different for people in different types of occupation."],
                    ["de", "Um zu prüfen, wie repräsentativ unserer Stichprobe - im Vergleich zur Gesamtbevölkerung - ist. Sowie um herauszufinden, ob das Risiko, an der Grippe zu erkranken, für Menschen mit verschiedenen Berufen variiert."],
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
            ])
        },
        {
            key: '774', role: 'option',
            content: new Map([
                ["en", "Paid employment, part time"],
                ["de", "Bezahlte Beschäftigung (Teilzeit)"],
            ])
        },
        {
            key: '775', role: 'option',
            content: new Map([
                ["en", "Self-employed (businessman, farmer, tradesman, etc.)"],
                ["de", "Selbstständig (UnternehmerIn, LandwirtIn, HändlerIn, usw.)"],
            ])
        },
        {
            key: '776', role: 'option',
            content: new Map([
                ["en", "Attending daycare/school/college/university"],
                ["de", "Tagespflege/ Schule/ Hochschule/ Universität"],
            ])
        },
        {
            key: '777', role: 'option',
            content: new Map([
                ["en", "Home-maker (e.g. housewife)"],
                ["de", "Im Haushalt tätig (z.B. Hausfrau/ Hausmann)"],
            ])
        },
        {
            key: '778', role: 'option',
            content: new Map([
                ["en", "Unemployed"],
                ["de", "Arbeitslos"],
            ])
        },
        {
            key: '779', role: 'option',
            content: new Map([
                ["en", "Long-term sick-leave or parental leave"],
                ["de", "Langfristiger Krankenurlaub oder Elternzeit"],
            ])
        },
        {
            key: '780', role: 'option',
            content: new Map([
                ["en", "Retired"],
                ["de", "Im Ruhestand"],
            ])
        },
        {
            key: '781', role: 'input',
            content: new Map([
                ["en", "Other"],
                ["de", "Andere"],
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
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_7_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_8_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_9_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_10_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_11_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_12_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_13_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_14_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_15_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_16_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_17_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_18_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_19_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_20_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_21_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_22_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_23_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_24_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_25_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_26_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}

const q_27_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}


const q_28_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "TODO"],
            ["de", "TODO"],
        ]))
    );

    // TODO
    return editor.getItem();
}