import { SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../../editor-engine/survey-editor/item-editor";
import { generateLocStrings } from "../../../editor-engine/utils/simple-generators";


const getEQ5DGroup = (parentKey: string, itemKey: string): SurveyGroupItem => {
    const key = [parentKey, itemKey].join('.');
    const groupEditor = new ItemEditor(undefined, {
        itemKey: key,
        isGroup: true
    });
    groupEditor.setSelectionMethod({ name: 'sequential' })


    groupEditor.addSurveyItem(
        q_mobility_def(key, 'MOB')
    );

    groupEditor.addSurveyItem(
        q_selfcare_def(key, 'SC')
    );

    groupEditor.addSurveyItem(
        q_activities_def(key, 'ACT')
    );

    groupEditor.addSurveyItem(
        q_pain_def(key, 'PAIN')
    );

    groupEditor.addSurveyItem(
        q_anxiety_def(key, 'ANX')
    );

    groupEditor.addSurveyItem(
        q_healthstatus_def(key, 'HEALTH')
    );
    return groupEditor.getItem() as SurveyGroupItem;
}

export default getEQ5DGroup;


const q_mobility_def = (parentKey: string, key: string): SurveyItem => {
    const editor = new ItemEditor(undefined, { itemKey: parentKey + '.' + key, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "TODO: mobility"],
            ]))
        }
    )
    return editor.getItem();
}

const q_selfcare_def = (parentKey: string, key: string): SurveyItem => {
    const editor = new ItemEditor(undefined, { itemKey: parentKey + '.' + key, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "TODO: self-care"],
            ]))
        }
    )
    return editor.getItem();
}

const q_activities_def = (parentKey: string, key: string): SurveyItem => {
    const editor = new ItemEditor(undefined, { itemKey: parentKey + '.' + key, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "TODO: usual activities"],
            ]))
        }
    )
    return editor.getItem();
}

const q_pain_def = (parentKey: string, key: string): SurveyItem => {
    const editor = new ItemEditor(undefined, { itemKey: parentKey + '.' + key, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "TODO: pain/discomfort"],
            ]))
        }
    )
    return editor.getItem();
}

const q_anxiety_def = (parentKey: string, key: string): SurveyItem => {
    const editor = new ItemEditor(undefined, { itemKey: parentKey + '.' + key, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "TODO: anxiety"],
            ]))
        }
    )
    return editor.getItem();
}

const q_healthstatus_def = (parentKey: string, key: string): SurveyItem => {
    const editor = new ItemEditor(undefined, { itemKey: parentKey + '.' + key, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "TODO: health indicator"],
            ]))
        }
    )
    return editor.getItem();
}
