import { SurveyItem } from "survey-engine/lib/data_types";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class GeneralHealthGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'TICP';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(q_L4q1(this.key, true));
    }
}

const q_L4q1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';

    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Algemene gezondheid"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["nl", "Welke lichamelijke en psychische problemen heb je? Kruis aan welke problemen je nu hebt of in de afgelopen 12 maanden hebt gehad (meerdere antwoorden mogelijk)."],
            ]))
        }],
        responseOptions: [
            {
                key: 'todo', role: 'option',
                content: new Map([
                    ["nl", "TODO"],
                ])
            },
            {
                key: 'subtitle1', role: 'text',
                style: [{ key: 'className', value: 'fw-bold mb-2' }],
                content: new Map([
                    ["nl", "Subtitle 1"],
                ])
            },
            {
                key: 'todo2', role: 'option',
                content: new Map([
                    ["nl", "TODO"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}
