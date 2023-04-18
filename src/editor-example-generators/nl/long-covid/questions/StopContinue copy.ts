import { Expression, SurveyItem } from "survey-engine/data_types";
import {generateHelpGroupComponent ,generateLocStrings, generateTitleComponent } from "../../../../editor-engine/utils/simple-generators";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { ComponentGenerators } from "../../../../editor-engine/utils/componentGenerators";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";
import { initEQ5DHealthIndicatorQuestion, SurveyItemGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { ItemEditor} from "../../../../editor-engine/survey-editor/item-editor";
import { SimpleQuestionEditor } from "../../../../editor-engine/utils/simple-question-editor";;


export class SCGroup extends GroupItemEditor {
    useCopyRight: boolean;


    constructor(parentKey: string, keyOverride?: string, hideCopyRight?: boolean) {
        const groupKey = keyOverride ? keyOverride : 'SC';
        super(parentKey, groupKey);
        this.useCopyRight = hideCopyRight !== true;
        this.initQuestions();
    }

    initQuestions() {
        this.addItem(S_instructions(this.key));
        const stopcontinue = S1(this.key, true);
        this.addItem(stopcontinue);
        
        const participant_stop = CommonExpressions.or(
          CommonExpressions.singleChoiceOptionsSelected(stopcontinue.key, 'no'));
        const participant_cont = CommonExpressions.or(
          CommonExpressions.singleChoiceOptionsSelected(stopcontinue.key, 'yes'));
      
        const Q_stopReason = S2(this.key, true, participant_stop);
        this.addItem(Q_stopReason)
      
        const wantstoStop = new GroupItemEditor(this.key, 'STOP');
        wantstoStop.groupEditor.setCondition(participant_stop);

        this.addItem(S2_website(
            wantstoStop.key,
            CommonExpressions.multipleChoiceOptionsSelected(Q_stopReason.key, '4', '5'),
            true)
        );

        this.addItem(S2_namelijk(
            wantstoStop.key,
            CommonExpressions.multipleChoiceOptionsSelected(Q_stopReason.key, '9'),
            true)
        );
        
        this.addItem(q_healthstatus_instructions_def(this.key));
        this.addItem(q_healthstatus_def(this.key, this.useCopyRight));
        this.addItem(instructions_cont(this.key))
      }
    }
      
    const copyRightText = new Map([
        ["en", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation. NL (English) v2.1"],
        ["nl", "© EuroQol Research Foundation. EQ-5D™ is a trade mark of the EuroQol Research Foundation."],
    ]);
    
    const eq5dCopyright = {
        role: 'footnote', content: generateLocStrings(copyRightText), style: [
            { key: 'className', value: 'fs-small fst-italic text-center' }
        ]
    };

    
const S_instructions =  (parentKey: string): SurveyItem => {
    const markdownContent = `
## Deze vragenlijst is binnen enkele minuten in te vullen.

Dankjewel dat je de vragenlijsten voor het LongCOVID-onderzoek invult. Voor het onderzoek is het heel nuttig als je nog een jaar lang elke drie maanden een vragenlijst invult. Het maakt niet uit of je wel of geen klachten hebt. Deze nieuwe vragenlijsten zijn veel korter dan de vragenlijsten die je in het afgelopen jaar hebt ingevuld.
`

    return SurveyItemGenerators.display({
        parentKey: parentKey,
        itemKey: 'intro',
        content: [
            ComponentGenerators.markdown({
                content: new Map([
                    ["nl", markdownContent],
                ]),
                className: ''
            })
        ]
    });
}

const S1 = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'S1';

    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        questionText: new Map([
            ["nl", "Wil je nog een jaar elke 3 maanden vragenlijsten voor het LongCOVID-onderzoek invullen? Ook als je geen klachten meer hebt, help je daarmee het onderzoek naar Long Covid."],
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
        ]
        });
    }


const S2 = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'S2';

     return SurveyItemGenerators.multipleChoice({
        parentKey: parentKey,
        itemKey: itemKey,
        condition: condition,
        isRequired: isRequired,
        questionText: new Map([
            ["nl", "Wat is de reden dat je wilt stoppen met het invullen van de vragenlijsten?"],
        ]),
         questionSubText:    new Map([
                ["nl", " Er zijn meerdere antwoorden mogelijk. Waarom vragen we dit? We willen kijken waarom deelnemers stoppen omdat dit onze bevindingen kan beïnvloeden. Hiermee kunnen we uitzoeken waarom sommige mensen wél klachten blijven houden en sommige mensen niet."],
            ]),
        
        responseOptions: [
            {
                key: '0', role: 'option',
                content: new Map([
                    ["nl", "Ik heb geen klachten of ik heb geen klachten meer"],
                ])
            },
            {
                key: '1', role: 'option',
                content: new Map([
                    ["nl", "Ik wil stoppen vanwege (Long Covid) klachten"],
                ])
            },
            {
                key: '2', role: 'option',
                content: new Map([
                    ["nl", "Ik denk dat mijn klachten niet door Long Covid komen"],
                ])
            },
            {
                key: '3', role: 'option',
                content: new Map([
                    ["nl", "Het invullen van de vragenlijsten kost me teveel tijd"],
                ])
            },
            {
                key: '4', role: 'option',
                content: new Map([
                    ["nl", "Het invullen van de vragenlijst is te lastig via een website"],
                ])
            },
            {
                key: '5', role: 'option',
                content: new Map([
                    ["nl", "De website werkt niet goed"],
                ])
            },
            {
                key: '6', role: 'option',
                content: new Map([
                    ["nl", "De vragen van het onderzoek zijn niet duidelijk"],
                ])
            },
            {
                key: '7', role: 'option',
                content: new Map([
                    ["nl", "Ik zie het nut van het onderzoek niet in"],
                ])
            },
            {
                key: '8', role: 'option',
                content: new Map([
                    ["nl", "Dat wil ik niet zeggen"],
                ])
            },
            {
                key: '9', role: 'option',
                content: new Map([
                    ["nl", "Een andere reden, namelijk..."],
                ])
                },
            ],
         });
    }

const S2_website = (parentKey: string,  condition?: Expression, isRequired?: boolean,  keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'S2_website';

    return SurveyItemGenerators.multilineTextInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["nl", "Je geeft aan dat de website niet goed werkt of niet duidelijk is."],
        ]),
        questionSubText: new Map([
            ["nl", "Kan je aangeven wat er niet goed werkt? "],
        ]),
        placeholderText: new Map([
            ["nl", "Opmerkingen"]
        ])
    });
}

const S2_namelijk = (parentKey: string,  condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'S2_namelijk';

    return SurveyItemGenerators.multilineTextInput({
        parentKey: parentKey,
        itemKey: itemKey,
        isRequired: isRequired,
        condition: condition,
        questionText: new Map([
            ["nl", "Om welke andere reden stop je met het onderzoek?"],
        ]),
        placeholderText: new Map([
            ["nl", "Opmerkingen"]
        ])
    });
}

const q_healthstatus_instructions_def = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'HEALTH_INS'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Could you fill in one single last question?"],
            ["nl", "Zouden we je nog één korte laatste vraag mogen stellen?"],
        ]))
    );
    editor.addDisplayComponent(
        {
            role: 'bullets', items: [
                {
                    role: 'text', content: generateLocStrings(new Map([
                        ["en", "We would like to know how good or bad your health is TODAY."],
                        ["nl", "We willen weten hoe goed of slecht je gezondheid VANDAAG is."],
                    ])),
                    style: [{ key: 'variant', value: 'li' }]
                },
                {
                    role: 'text', content: generateLocStrings(new Map([
                        ["en", "This scale is numbered from 0 to 100."],
                        ["nl", "Deze meetschaal loopt van 0 tot 100."],
                    ])),
                    style: [{ key: 'variant', value: 'li' }]
                },
                {
                    role: 'text',
                    style: [{ key: 'variant', value: 'li' }],
                    items: [
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "100 means the "],
                                ["nl", "100 staat voor de "],
                            ]))
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "best"],
                                ["nl", "beste"],
                            ])),
                            style: [{ key: 'className', value: 'text-decoration-underline' }]
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", " health you can imagine."],
                                ["nl", " gezondheid die je je kunt voorstellen."],
                            ]))
                        },
                    ],
                },
                {
                    role: 'text',
                    items: [
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "0 means the "],
                                ["nl", "0 staat voor de "],
                            ]))
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", "worst"],
                                ["nl", "slechtste"],
                            ])),
                            style: [{ key: 'className', value: 'text-decoration-underline' }]
                        },
                        {
                            role: 'part', content: generateLocStrings(new Map([
                                ["en", " health you can imagine."],
                                ["en", " gezondheid die je je kunt voorstellen."],
                            ]))
                        },
                    ],
                },
            ]
        }
    )
    return editor.getItem();
}

const q_healthstatus_def = (parentKey: string, isRequired?: boolean, useCopyRight?: boolean, keyOverride?: string): SurveyItem => {
    const itemKey = keyOverride ? keyOverride : 'STOP';
    const simpleEditor = new SimpleQuestionEditor(parentKey, itemKey);

    // role: 'eq5d-health-indicator'
    const rg_inner = initEQ5DHealthIndicatorQuestion({
        key: '0',
        role: 'eq5d-health-indicator',
        instructionText: new Map([
            ["en", "Please indicate on the scale how your health is TODAY."],
            ["nl", "Klik op de meetschaal om aan te geven hoe je gezondheid VANDAAG is."],
        ]),
        valueBoxText: new Map([
            ["en", "YOUR HEALTH TODAY ="],
            ["nl", "JE GEZONDHEID VANDAAG ="],
        ]),
        minHealthText: new Map([
            ["en", "The worst health you can imagine"],
            ["nl", "De slechtste gezondheid die je je kunt voorstellen"],
        ]),
        maxHealthText: new Map([
            ["en", "The best health you can imagine"],
            ["nl", "De beste gezondheid die je je kunt voorstellen"],
        ]),
    });
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (useCopyRight) { simpleEditor.addDisplayComponent(eq5dCopyright); }
    return simpleEditor.getItem();
}

const instructions_cont = (parentKey: string): SurveyItem => {
    const markdownContent = `
## Bedankt dat je nog een jaar door wil gaan met het LongCOVID-onderzoek. Dit helpt enorm etc.
`
return SurveyItemGenerators.display({
            parentKey: parentKey,
            itemKey: 'outro_Tstopcontinue',
            content: [
                ComponentGenerators.markdown({
                    content: new Map([
                        ["nl", markdownContent],
                    ]),
                    className: ''
             })
        ]
    });
}

