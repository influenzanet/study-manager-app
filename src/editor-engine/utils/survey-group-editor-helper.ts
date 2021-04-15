import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../survey-editor/item-editor";
import { generatePageBreak } from "./simple-generators";

export class GroupItemEditor {
    groupEditor: ItemEditor;
    key: string;

    constructor(parentKey: string, groupKey: string, selectionMethod?: Expression) {
        this.key = [parentKey, groupKey].join('.');
        this.groupEditor = new ItemEditor(undefined, {
            itemKey: this.key,
            isGroup: true
        });
        if (!selectionMethod) {
            this.groupEditor.setSelectionMethod({ name: 'sequential' });
        } else {
            this.groupEditor.setSelectionMethod(selectionMethod);
        }
    }

    isPartOfSurvey(surveyKey: string): boolean {
        return this.key.includes(surveyKey)
    }

    getItem() {
        return this.groupEditor.getItem();
    }

    addPageBreak() {
        this.groupEditor.addSurveyItem(generatePageBreak(this.key));
    }

    addItem(item: SurveyItem, pageBreakAfter?: boolean) {
        this.groupEditor.addSurveyItem(item);
        if (pageBreakAfter) {
            this.addPageBreak();
        }
    }
}
