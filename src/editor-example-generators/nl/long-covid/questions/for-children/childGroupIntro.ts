import { Expression } from "survey-engine/lib/data_types";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";

export class IntroGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        belowMinAge: Expression,
    }) {
        const groupKey = 'INTRO';
        super(parentKey, groupKey);

        this.addItem(this.Group_header());
        this.addItem(this.Text_for_below_min_age(conditions.belowMinAge));
        // this.addPageBreak();
    }

    Group_header() {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
# De vragen hieronder zijn gericht aan een minderjarige.

Bent u een ouder / verzorger dan kunt u de antwoorden invullen voor / over uw kind.
                        `]
                    ])
                })]
        })
    }

    Text_for_below_min_age(condition: Expression) {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'belowMinAge',
            condition: condition,
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `Kinderen van 0 t/m 4 jaar kunnen niet meedoen aan dit LongCOVID-onderzoek. Kinderen van 0 t/m 4 jaar die recent positief of negatief getest zijn kunnen wel meedoen aan een ander onderzoek naar long covid klachten bij kinderen. 
Zie voor meer informatie: [https://limesurvey.amc.nl/cru/index.php/717116?lang=nl]
                        `]
                    ])
                })]
        })
    }


}
