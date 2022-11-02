import { SurveyItem } from "survey-engine/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { expWithArgs } from "../../editor-engine/utils/simple-generators";
import { responseGroupKey, singleChoiceKey } from "./key-definitions";

/**
 * GROUP DEPENDING ON A SINGLE CHOICE QUESTION's RESPONSE
 *
 * @param parentKey full key path of the parent item, required to genrate this item's unique key (e.g. `<surveyKey>.<groupKey>`).
 * @param newGroupKey key of the newly created group
 * @param itemReference reference to a single choice question
 * @param expectedResponseKey key value to be checked for
 */
export const conditionalGroup = (parentKey: string, newGroupKey: string, itemReference: string, expectedResponseKey: string, randomOrder?: boolean): SurveyItem => {
    const itemKey = [parentKey, newGroupKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: true });

    editor.setCondition(
        expWithArgs('responseHasKeysAny', itemReference, [responseGroupKey, singleChoiceKey].join('.'), expectedResponseKey)
    );
    if (!randomOrder) {
        editor.setSelectionMethod({ name: 'sequential' });
    }
    return editor.getItem();
}

