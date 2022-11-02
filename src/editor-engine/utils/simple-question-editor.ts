import { Expression, ItemComponent } from "survey-engine/data_types";
import { responseGroupKey } from "../../editor-example-generators/common_question_pool/key-definitions";
import { ItemEditor } from "../survey-editor/item-editor";
import { StyledTextComponentProp } from "./question-type-generator";
import { expWithArgs, generateTitleComponent } from "./simple-generators";

export class SimpleQuestionEditor {
    editor: ItemEditor;
    key: string;

    constructor(
        parentKey: string,
        key: string,
    ) {
        const itemKey = [parentKey, key].join('.');
        this.key = itemKey;
        this.editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    }

    getItem() {
        return this.editor.getItem();
    }

    setTitle(title: Map<string, string> | Array<StyledTextComponentProp>, description?: Map<string, string>, className?: string) {
        this.editor.setTitleComponent(
            generateTitleComponent(title, description, className)
        );
    }

    setCondition(exp: Expression) {
        this.editor.setCondition(exp);
    }

    addDisplayComponent(comp: ItemComponent, atPosition?: number) {
        this.editor.addDisplayComponent(comp, atPosition)
    }

    addHasResponseValidation() {
        this.editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', this.key, responseGroupKey)
        });
    }

    setResponseGroupWithContent(content: ItemComponent) {
        const rg = this.editor.addNewResponseComponent({ role: 'responseGroup' });
        this.editor.addExistingResponseComponent(content, rg?.key);
    }
}
