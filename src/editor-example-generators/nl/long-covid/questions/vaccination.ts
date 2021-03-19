import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class VaccinationGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'VAC';
        super(parentKey, groupKey);
    }
}
