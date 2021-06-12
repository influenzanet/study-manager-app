import { Expression } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";


export class EQ5DProxyGroup extends GroupItemEditor {
    constructor(parentKey: string,
        conditions: {
            olderThan7: Expression,
        },
        keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'EQ5D';
        super(parentKey, groupKey);

        this.addItem(
            new EQ5Dy(this.key, {
                groupCondition: conditions.olderThan7,
            }).getItem()
        );

        this.addItem(
            new EQ5DyProxy(this.key, {
                groupCondition: CommonExpressions.not(conditions.olderThan7),
            }).getItem()
        )
        this.addPageBreak();
    }


}

class EQ5Dy extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'Y';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;


    }

}

class EQ5DyProxy extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        groupCondition: Expression,
    }) {
        const groupKey = 'YProxy';
        super(parentKey, groupKey);

        this.groupEditor.setCondition(conditions.groupCondition);

        const isRequired = true;


    }

}
