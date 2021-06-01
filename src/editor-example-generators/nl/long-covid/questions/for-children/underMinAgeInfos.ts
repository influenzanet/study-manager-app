import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";

export class UnderMinAgeGroup extends GroupItemEditor {

    constructor(parentKey: string) {
        const groupKey = 'UNDER_MIN_AGE';
        super(parentKey, groupKey);

        this.addItem(SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `TODO: modify text for children under 5`]
                    ])
                })]
        }));
        this.addPageBreak();
    }
}
