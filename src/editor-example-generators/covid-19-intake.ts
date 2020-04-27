import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings, generateTitleComponent, generateHelpGroupComponent } from "../editor-engine/utils/simple-generators";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { initSingleChoiceGroup } from "../editor-engine/utils/question-type-generator";


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