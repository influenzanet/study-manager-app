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
        this.addItem(q_acuteSymptoms_1(this.key, true));
        this.addItem(q_acuteSymptoms_2(this.key, true));
        this.addItem(q_acuteSymptoms_3(this.key, true));
        this.addItem(q_acuteSymptoms_4(this.key, true));
        this.addItem(q_acuteSymptoms_5(this.key, true));
        this.addItem(q_acuteSymptoms_6(this.key, true));
    }
}



const q_acuteSymptoms_1 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_1';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'koor',
                content: new Map([
                    ["nl", "Koorts"],
                ]),
            },
            {
                key: 'koud',
                content: new Map([
                    ["nl", "Koude rillingen"],
                ])
            },
            {
                key: 'loop',
                content: new Map([
                    ["nl", "Loopneus of verstopte neus"],
                ])
            },
            {
                key: 'niez',
                content: new Map([
                    ["nl", "Niezen"],
                ])
            },
            {
                key: 'keel',
                content: new Map([
                    ["nl", "Keelpijn"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}


const q_acuteSymptoms_2 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_2';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'hoes',
                content: new Map([
                    ["nl", "Hoesten"],
                ])
            },
            {
                key: 'kort',
                content: new Map([
                    ["nl", "Kortademig (snel buiten adem) of benauwd"],
                ]),
            },
            {
                key: 'spie',
                content: new Map([
                    ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                ])
            },
            {
                key: 'bekl',
                content: new Map([
                    ["nl", "Beklemming of pijn op de borst"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_3 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_3';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'verm',
                content: new Map([
                    ["nl", "Vermoeidheid"],
                ])
            },
            {
                key: 'alge',
                content: new Map([
                    ["nl", "Algehele malaise"],
                ])
            },
            {
                key: 'eetl',
                content: new Map([
                    ["nl", "Verminderde eetlust"],
                ])
            },
            {
                key: 'slij',
                content: new Map([
                    ["nl", "Verkleurd slijm"],
                ])
            },
            {
                key: 'ogen',
                content: new Map([
                    ["nl", "Waterige of bloeddoorlopen ogen"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_4 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_4';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'duiz',
                content: new Map([
                    ["nl", "Duizeligheid"],
                ])
            },
            {
                key: 'miss',
                content: new Map([
                    ["nl", "Misselijkheid"],
                ])
            },
            {
                key: 'over',
                content: new Map([
                    ["nl", "Overgeven"],
                ])
            },
            {
                key: 'diar',
                content: new Map([
                    ["nl", "Diarree (minstens 3 keer per dag)"],
                ])
            },
            {
                key: 'buik',
                content: new Map([
                    ["nl", "Buikpijn"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_5 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_5';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'reuk',
                content: new Map([
                    ["nl", "Geen reuk of reuk sterk verminderd"],
                ])
            },
            {
                key: 'smaa',
                content: new Map([
                    ["nl", "Geen smaak of smaak sterk verminderd"],
                ])
            },
            {
                key: 'bloe',
                content: new Map([
                    ["nl", "Bloedneus"],
                ])
            },
            {
                key: 'huid',
                content: new Map([
                    ["nl", "Huiduitslag"],
                ])
            },
            {
                key: 'hart',
                content: new Map([
                    ["nl", "Hartkloppingen"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}

const q_acuteSymptoms_6 = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'SYM_6';

    return QuestionGenerators.simpleLikertGroup({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Kruis bij elke klacht hieronder aan, of je hier geen, een beetje of veel last van gehad hebt in de afgelopen week."],
        ]),
        questionSubText: new Map([
            ["nl", "Klachten die u al voor een langere periode heeft of die worden veroorzaakt door een langdurige ziekte (chronische klachten), hoeven hier niet gemeld te worden."]
        ]),
        scaleOptions: [
            {
                key: '0',
                content: new Map([
                    ["nl", "Geen last"],
                ])
            }, {
                key: '1',
                content: new Map([
                    ["nl", "Een beetje last"],
                ])
            }, {
                key: '2',
                content: new Map([
                    ["nl", "Veel last"],
                ])
            },
        ],
        rows: [
            {
                key: 'conc',
                content: new Map([
                    ["nl", "Concentratieproblemen"],
                ])
            },
            {
                key: 'slaa',
                content: new Map([
                    ["nl", "Slaapproblemen"],
                ])
            },
            {
                key: 'tint',
                content: new Map([
                    ["nl", "Tintelingen of gevoelloosheid"],
                ])
            },
            {
                key: 'verw',
                content: new Map([
                    ["nl", "Verwardheid"],
                ])
            },
            {
                key: 'oorp',
                content: new Map([
                    ["nl", "Oorpijn"],
                ])
            },
            {
                key: 'oors',
                content: new Map([
                    ["nl", "Oorsuizen"],
                ])
            },
        ],
        isRequired: isRequired,
    })
}
