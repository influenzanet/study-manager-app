import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { initSingleChoiceGroup, initMultipleChoiceGroup } from "../editor-engine/utils/question-type-generator";



const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';
const multipleChoiceKey = 'mcg';

export const generateCovid19Weekly = () => {
    const survey = new SurveyEditor();
    survey.changeItemKey('survey', 'weekly');

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["de", "Wie fühlen Sie sich?"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Weekly survey about health status."],
            ["de", "Wöchentliche Fragebogen über den Gesundheitszustand."],
        ])
    ));

    let rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());

    const rootKey = rootItemEditor.getItem().key;

    // 32 --------------------------------------
    const q32 = survey.addNewSurveyItem({ itemKey: '32' }, rootKey);
    if (!q32) { return; }
    survey.updateSurveyItem(q32_def(q32));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pb1', type: 'pageBreak' }, rootKey);

    // 33 --------------------------------------
    const q33 = survey.addNewSurveyItem({ itemKey: '33' }, rootKey);
    if (!q33) { return; }
    survey.updateSurveyItem(q33_def(q33));
    // -----------------------------------------



    // console.log(q32Editor.findResponseComponent('rg'));
    // q32Editor.removeResponseComponent('rg.scg');




    console.log(survey.getSurvey());
    console.log(survey.getSurveyJSON());

    // tests
    const exp1 = expWithArgs('responseHasKeysAny', 'weekly.32', '1.1.144', '1.1.145');
    const exp2 = expWithArgs('responseHasKeysAny', 'weekly.32', '1.1.146', '1.1.147');
    const expOr = expWithArgs('or', exp1, exp2);
    //console.log(expOr);
    // console.log(JSON.stringify(expOr, undefined, '  '));

}

const q32_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Have you had any of the following symptoms since your last visit (or in the past weeks, if this is your first visit)?"],
            ["de", "Hatten Sie irgendwelche der folgenden Symptome seit Ihrem letzten Besuch (oder in der letzten Woche, falls dies Ihr erster Besuch ist)?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '1'),
            content: new Map([
                ["en", "Fever"],
                ["de", "Fieber"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q33_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "33 Have you had any of the following symptoms since your last visit (or in the past weeks, if this is your first visit)?"],
            ["de", "33 Hatten Sie irgendwelche der folgenden Symptome seit Ihrem letzten Besuch (oder in der letzten Woche, falls dies Ihr erster Besuch ist)?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '1', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
        {
            key: '2', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + singleChoiceKey, '1'),
            content: new Map([
                ["en", "Fever"],
                ["de", "Fieber"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}