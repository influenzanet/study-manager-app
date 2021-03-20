import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class AcuteHealthGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'AH';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_acuteSymptoms(this.key, true))
    }
}



const q_acuteSymptoms = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "Acute symptoms"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["en", "Please select the ONE option that best describes your health TODAY."],
            ]))
        }],
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["en", "Not at all"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["en", "A little"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["en", "A lot"],
                ])
            },
        ],
        rows: [
            {
                key: 'cough',
                content: new Map([
                    ["en", "Cough"],
                ]),
            },
            {
                key: 'fever',
                content: new Map([
                    ["en", "Fever"],
                ])
            },
            {
                key: 'headache',
                hideTopBorder: true,
                content: new Map([
                    ["en", "Headache"],
                ])
            }
        ],
        isRequired: isRequired,
    })
}