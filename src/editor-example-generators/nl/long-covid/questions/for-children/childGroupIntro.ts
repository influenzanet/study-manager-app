import { Expression } from "survey-engine/data_types";
import { CommonExpressions } from "../../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../../editor-engine/utils/survey-group-editor-helper";

export class IntroGroup extends GroupItemEditor {

    constructor(parentKey: string, conditions: {
        belowMinAge: Expression,
    }) {
        const groupKey = 'INTRO';
        super(parentKey, groupKey);

        this.addItem(this.Group_header(CommonExpressions.not(conditions.belowMinAge)));
        this.addItem(this.Text_for_below_min_age(conditions.belowMinAge));
        // this.addPageBreak();
    }

    Group_header(condition: Expression) {
        return SurveyItemGenerators.display({
            parentKey: this.key,
            itemKey: 'info',
            condition: condition,
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ['nl', `
## Testen op het coronavirus

**De vragen hieronder zijn gericht aan een minderjarige.**

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
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
                        ['nl', `
Kinderen van 0 t/m 4 jaar kunnen **niet** meedoen aan dit LongCOVID-onderzoek, maar wel aan een ander onderzoek naar longcovid klachten bij kinderen.

Klik [hier](https://limesurvey.amc.nl/cru/index.php/717116?lang=nl) voor meer informatie.
                        `]
                    ])
                })]
        })
    }


}
