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



    // gender --------------------------------------
    const q_gender = survey.addNewSurveyItem({ itemKey: 'todo_1' }, rootKey);
    if (!q_gender) { return; }
    survey.updateSurveyItem(q_gender_def(q_gender));
    // -----------------------------------------

    // birthday --------------------------------------
    const q_birthday = survey.addNewSurveyItem({ itemKey: 'todo_2' }, rootKey);
    if (!q_birthday) { return; }
    survey.updateSurveyItem(q_birthday_def(q_birthday));
    // -----------------------------------------

    // country ??
    // postal-code ??

    // birthday --------------------------------------
    const q_main_activity = survey.addNewSurveyItem({ itemKey: 'todo_3' }, rootKey);
    if (!q_main_activity) { return; }
    survey.updateSurveyItem(q_main_activity_def(q_main_activity));
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