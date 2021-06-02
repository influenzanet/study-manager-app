import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";


export class HealthGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'HEALTH';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;


        //
        this.addItem(this.groupIntro());


        this.addPageBreak();
    }

    groupIntro() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
TODO: health intro for children
                        `]
                    ])
                })]
        })
    }
}

