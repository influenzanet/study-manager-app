import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { generateLocStrings } from "../../../../editor-engine/utils/simple-generators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class CovidTestGroup extends GroupItemEditor {

    constructor(parentKey: string, keyOverride?: string) {
        const groupKey = keyOverride ? keyOverride : 'TEST';
        super(parentKey, groupKey);
        this.initQuestions();
    }

    initQuestions() {
        const test = q_test_def(this.key, true);
        const condition_test_yes = CommonExpressions.singleChoiceOptionsSelected(test.key, 'yes');
        const test_result = q_test_result_def(this.key, true, condition_test_yes);
        const condition_test_result_pos = CommonExpressions.singleChoiceOptionsSelected(test_result.key, 'pos');
        const infect_earlier = q_infect_earlier_def(this.key, true);
        const condition_pos_earl_test = CommonExpressions.singleChoiceOptionsSelected(infect_earlier.key, 'pos_earl_test');
        const condition_pos_earl_notest = CommonExpressions.singleChoiceOptionsSelected(infect_earlier.key, 'pos_earl_notest');

        this.addItem(test);
        this.addItem(q_test_date_def(this.key, true, condition_test_yes));
        this.addItem(q_test_location_def(this.key, true, condition_test_yes));
        this.addItem(q_test_reason_def(this.key, true, condition_test_yes));
        this.addItem(test_result);
        this.addItem(q_test_type_def(this.key, true, condition_test_result_pos));
        this.addItem(infect_earlier);
        this.addItem(q_inf_earlier_type_def(this.key, true, condition_pos_earl_test));
        this.addItem(q_inf_earlier_testdate_def(this.key, true, condition_pos_earl_test));
        this.addItem(q_inf_earlier_date_def(this.key, true, condition_pos_earl_notest));
    }
}

const q_test_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q1';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Heb je afgelopen 7 dagen een test gedaan om te weten of je corona hebt?"],
        ]),
        responseOptions: [
            {
                key: 'yes', role: 'option',
                content: new Map([
                    ["nl", "Ja"],
                ])
            },
            {
                key: 'no', role: 'option',
                content: new Map([
                    ["nl", "Nee"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_test_date_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q2';

    return SurveyItemGenerators.dateInput({
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
        minRelativeDate: { delta: { days: -10 } },
        maxRelativeDate: { delta: { seconds: 1 } },
        isRequired: isRequired,
    });
}

const q_test_location_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q3';

    return SurveyItemGenerators.singleChoice({
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
                    ["nl", "Bij een bedrijf (op eigen initiatief)"],
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

const q_test_reason_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q4';

    return SurveyItemGenerators.multipleChoice({
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
                    ["nl", "Ik had klachten"],
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
                    ["nl", "Ik ben benaderd door de GGD om mij te laten testen, omdat ik mogelijk in contact ben geweest met iemand die positief getest is op corona"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Ik heb een melding gekregen van de Coronamelder app dat ik in de buurt ben geweest van iemand die corona had"],
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

const q_test_result_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q5';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wat was de uitslag van de test?"],
        ]),
        responseOptions: [
            {
                key: 'pos', role: 'option',
                content: new Map([
                    ["nl", "Positief, dus WEL besmet (geweest) met het coronavirus"],
                ])
            },
            {
                key: 'neg', role: 'option',
                content: new Map([
                    ["nl", "Negatief, dus GEEN bewijs voor besmetting met het coronavirus"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Ik heb de uitslag nog niet"],
                ])
            },
            {
                key: 'no-rep', role: 'option',
                content: new Map([
                    ["nl", "Dat wil ik niet aangeven"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_test_type_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q6';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Met welke test is dit bevestigd?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Bevestigd door neus/keel test (PCR of antigeen sneltest) "],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Bevestigd door bloedtest (serologie) "],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Met een zelftest"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_infect_earlier_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q7';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Denk en/of weet je dat je al eerder besmet bent geweest met het coronavirus sinds de start van de pandemie in Nederland (februari 2020)? (meer dan 10 dagen geleden)?"],
        ]),
        responseOptions: [
            {
                key: 'pos_earl_test', role: 'option',
                content: new Map([
                    ["nl", "Ja, bevestigd met een positieve test"],
                ])
            },
            {
                key: 'pos_earl_zelftest', role: 'option',
                content: new Map([
                    ["nl", "Ja, bevestigd met een zelftest"],
                ])
            },
            {
                key: 'pos_earl_notest', role: 'option',
                content: new Map([
                    ["nl", "Ja, maar er is geen test gedaan"],
                ])
            },
            {
                key: 'no', role: 'option',
                content: new Map([
                    ["nl", "Nee, ik denk het niet"],
                ])
            },
            {
                key: 'unknown', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_inf_earlier_type_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q8';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Met welke test is dit bevestigd?"],
        ]),
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Bevestigd door neus/keel test (PCR of antigeen sneltest)"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Bevestigd door bloedtest (serologie)"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Met een zelftest"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Weet ik niet"],
                ])
            },
        ],
        isRequired: isRequired,
    });
}

const q_inf_earlier_testdate_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q9';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wanneer is deze test (ongeveer) afgenomen?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: undefined,
        maxRelativeDate: undefined,
        isRequired: isRequired,
    });
}

const q_inf_earlier_date_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'Q10';

    return SurveyItemGenerators.dateInput({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        questionText: new Map([
            ["nl", "Wanneer denk je dat je besmet bent met het coronavirus (ongeveer)?"],
        ]),
        dateInputMode: 'YMD',
        placeholderText: new Map([
            ["nl", "dd-mm-jjjj"],
        ]),
        minRelativeDate: undefined,
        maxRelativeDate: undefined,
        isRequired: isRequired,
    });
}
