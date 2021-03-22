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
        this.addItem(
            QuestionGenerators.dateInput({
                parentKey: this.key,
                itemKey: 'testDateInput',
                questionText: new Map([
                    ["en", "Example Date Input"],
                ]),
                dateInputMode: 'YMD',
                inputLabelText: new Map([
                    ["en", "Input: "],
                ]),
                placeholderText: new Map([
                    ["en", "Enter a date"],
                ]),
                minRelativeDate: -864000, // optional
                maxRelativeDate: 10, // optional
                isRequired: true
            })
        )
    }
}



const q_acuteSymptoms = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["en", "Acute symptoms"],
        ]),
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