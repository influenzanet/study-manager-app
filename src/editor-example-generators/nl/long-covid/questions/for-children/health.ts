import { Expression } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";

export class HealthGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
        olderThan10: Expression,
    }) {
        const groupKey = 'HEALTH';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        this.addItem(SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            condition: conditions.olderThan10,
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `TODO: modify text for children`]
                    ])
                })]
        }));
        this.addPageBreak();
    }
}
