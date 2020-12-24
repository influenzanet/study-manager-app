import { SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../../editor-engine/survey-editor/item-editor";
import { initEQ5DHealthIndicatorQuestion } from "../../../editor-engine/utils/question-type-generator";
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
        q_healthstatus_instructions_def(key, 'HEALTH_INST')
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

const q_healthstatus_instructions_def = (parentKey: string, key: string): SurveyItem => {
    const editor = new ItemEditor(undefined, { itemKey: parentKey + '.' + key, isGroup: false });
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "TODO: health status bullets"],
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

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    // role: 'eq5d-health-indicator'
    const rg_inner = initEQ5DHealthIndicatorQuestion({
        key: '0',
        role: 'eq5d-health-indicator',
        instructionText: new Map([
            ["en", "TODO: instruction"],
        ]),
        valueBoxText: new Map([
            ["en", "TODO: value text"],
        ]),
        minHealthText: new Map([
            ["en", "TODO: min text"],
        ]),
        maxHealthText: new Map([
            ["en", "TODO: max text"],
        ]),
    });
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    /*editor.addValidation({
        key: 'r1',
        type: 'hard',
        rule: expWithArgs('hasResponse', itemSkeleton.key, responseGroupKey)
    });*/
    return editor.getItem();
}
