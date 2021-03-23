import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class CovidTestGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'CT';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        const L1q1 = q_L1q1_def(this.key, true);
        const condition_L1q1_yes = CommonExpressions.singleChoiceOptionsSelected(L1q1.key, '0');

        this.addItem(L1q1);
        this.addItem(q_C1q2_def(this.key, true, condition_L1q1_yes));
        this.addItem(q_I1q3_def(this.key, true, condition_L1q1_yes));
        this.addItem(q_C1q4_def(this.key, true, condition_L1q1_yes));
        this.addItem(q_L1q5_def(this.key, true, condition_L1q1_yes));
        //TODO: Add following questions.
    }
}

const q_L1q1_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'L1q1';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je afgelopen 10 dagen een test gedaan om het coronavirus aan te tonen?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_C1q2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C1q2';

    return QuestionGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wanneer is deze test afgenomen?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: { days: -10 },
        maxRelativeDate: { seconds: 1 },
        isRequired: isRequired,
    });
}

const q_I1q3_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'I1q3';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Waar heb je jezelf laten testen op corona?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Ziekenhuis of huisarts"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "GGD Teststraat"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "GGD is langs geweest"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Met een zelftest"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Bij een bedrijf (op mijn eigen initiatief)"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "Bij een bedrijf (via mijn werkgever)"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "In het buitenland"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Dat weet ik niet (meer)"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_C1q4_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'C1q4';

    return QuestionGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wat is de reden dat je jezelf hebt laten testen op het coronavirus?"],
        ]),
        topDisplayCompoments: [{
            role: 'text',
            style: [{ key: 'className', value: 'mb-2' }],
            content: generateLocStrings(new Map([
                ["nl", "Meerdere antwoorden mogelijk."],
            ]))
        }],
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Ik heb klachten"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik heb contact gehad met iemand die positief getest is op corona"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik ben benaderd door de GGD om mij te laten testen, omdat ik (mogelijk) contact heb gehad met iemand die positief getest is op corona"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik heb een melding gekregen via de Coronamelder app dat ik in de buurt ben geweest van iemand die corona had"],
                ])
            },
            {
                key: '4', role: 'input',
                content: new Map([
                    ["nl", "Vanwege een andere reden, namelijk"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_L1q5_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'L1q5';

    return QuestionGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wat was de uitslag van de test?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Positief, dus WEL besmet (geweest) met het coronavirus"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Negatief, dus GEEN bewijs voor besmetting met het coronavirus"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik heb de uitslag nog niet"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Dit wil ik niet aangeven"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}
