import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class CovidTestGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'CT';
        super(parentKey, groupKey);
    }
}
