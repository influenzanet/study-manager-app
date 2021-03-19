import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class AcuteHealthGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'AH';
        super(parentKey, groupKey);
    }
}
