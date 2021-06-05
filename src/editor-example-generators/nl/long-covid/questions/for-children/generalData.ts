import { Expression } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";


export class GeneralDataGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        q11Ja: Expression;
    }, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'GEN';
        super(parentKey, groupKey);

        const isRequired = true;


        this.addItem(this.groupIntro());
        // this.addItem(Q1);
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
                         De vragen hieronder zijn gericht aan een minderjarige. Bent u een ouder/verzorger dan kunt u
                          de antwoorden invullen voor/over uw kind.

                          In dit onderdeel stellen wij je enkele algemene vragen over jezelf en je achtergrond.
                        `]
                    ])
                })]
        })
    }
}
