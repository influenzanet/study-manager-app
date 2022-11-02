import { Survey } from "survey-engine/data_types";
import { ComponentGenerators } from "../../editor-engine/utils/componentGenerators";
import { SurveyItemGenerators } from "../../editor-engine/utils/question-type-generator";
import { SimpleSurveyEditor } from "../../editor-engine/utils/simple-survey-editor";


export const generateExampleSurvey = (): Survey | undefined => {
    const surveyKey = "ITEMEX";

    const surveyEditor = new SimpleSurveyEditor({
        surveyKey: surveyKey,
        name: new Map([
            ["en", "Example Survey Items"],
        ]),
        description: new Map([
            ["en", "This survey contains some examples, to showcase some of the features already supported."],
        ]),
        durationText: new Map([
            ["en", "5-8 min."],
        ])
    })


    // *******************************
    // Questions
    // *******************************
    surveyEditor.addSurveyItemToRoot(getQ1(surveyKey));

    surveyEditor.addSurveyItemToRoot(getQ2(surveyKey));

    surveyEditor.addSurveyItemToRoot(getQ3(surveyKey));


    surveyEditor.addSurveyItemToRoot(SurveyItemGenerators.surveyEnd(surveyKey, new Map([
        ['en', 'This is the end of the survey. Please submit your responses.']
    ])));


    return surveyEditor.getSurvey();
}

const getQ1 = (parentKey: string) => {
    return SurveyItemGenerators.singleChoice({
        parentKey: parentKey,
        itemKey: 'Q1',
        questionText: [
            {
                content: new Map([
                    ['en', 'Question title can contain ']
                ]),
            },
            {
                content: new Map([
                    ['en', 'formatted segments']
                ]),
                className: 'text-primary'
            },
            {
                content: new Map([
                    ['en', ' to highligh specific infos.']
                ]),
            }
        ],
        questionSubText: new Map([
            ['en', 'Here you can provide some extra infos.']
        ]),
        topDisplayCompoments: [ComponentGenerators.markdown({
            content: new Map([
                ['en', 'Additional text might be added as *markdown* to the question body']
            ]),
        })],
        responseOptions: [
            ComponentGenerators.option({
                key: 'yes',
                content: new Map([
                    ['en', 'A simple option text']
                ]),
            }),
            ComponentGenerators.option({
                key: 'no',
                className: 'border-top pt-2',
                content: [
                    {
                        content: new Map([
                            ['en', 'Options with ']
                        ]),
                    },
                    {
                        content: new Map([
                            ['en', 'formatted text']
                        ]),
                        className: 'fw-bold'
                    }
                ]
            })
        ],
        titleClassName: 'sticky-top',
        isRequired: true,
    });
}


const getQ2 = (parentKey: string) => {
    return SurveyItemGenerators.responsiveSingleChoiceArray({
        parentKey: parentKey,
        itemKey: 'Q2',
        questionText: [
            {
                content: new Map([
                    ['en', 'Question type: ']
                ]),
            },
            {
                content: new Map([
                    ['en', 'responsive single choice array']
                ]),
                className: 'text-primary'
            }
        ],
        scaleOptions: [
            {
                key: '1', content: new Map([
                    ['en', 'Very Low']
                ]),
            },
            {
                key: '2', content: new Map([
                    ['en', 'Low']
                ]),
            }, {
                key: '3', content: new Map([
                    ['en', 'Medium']
                ]),
            }, {
                key: '4', content: new Map([
                    ['en', 'High']
                ]),
            }, {
                key: '5', content: new Map([
                    ['en', 'Very High']
                ]),
            },
        ],
        rows: [
            {
                key: 'row1', content: [
                    {
                        content: new Map([
                            ['en', 'First row ']
                        ]),
                    },
                    {
                        content: new Map([
                            ['en', 'with formatting']
                        ]),
                        className: 'text-primary'
                    }
                ]
            },
            {
                key: 'row2', content: new Map([
                    ['en', 'Second row without']
                ]),
            }
        ],
        defaultMode: 'vertical',
        responsiveModes: {
            sm: 'horizontal',
            lg: 'table',
        },
        horizontalModeProps: {},
        verticalModeProps: {
            useReverseOptionOrder: false
        },
        tableModeProps: {
        },
        titleClassName: 'sticky-top',
        isRequired: true,
    });
}


const getQ3 = (parentKey: string) => {
    return SurveyItemGenerators.responsiveBipolarLikertArray({
        parentKey: parentKey,
        itemKey: 'Q3',
        questionText: [
            {
                content: new Map([
                    ['en', 'Question type: ']
                ]),
            },
            {
                content: new Map([
                    ['en', 'responsive single choice array']
                ]),
                className: 'text-primary'
            }
        ],
        scaleOptions: [
            {
                key: '-2',
            }, {
                key: '-1',
            }, {
                key: '0',
            }, {
                key: '1',
            }, {
                key: '2',
            },
        ],
        rows: [
            {
                key: 'row1',
                startLabel: [
                    {
                        content: new Map([
                            ['en', 'Negative First row ']
                        ]),
                    },
                    {
                        content: new Map([
                            ['en', 'with formatting']
                        ]),
                        className: 'text-primary'
                    }
                ],
                endLabel: [
                    {
                        content: new Map([
                            ['en', 'Positive First row ']
                        ]),
                    },
                    {
                        content: new Map([
                            ['en', 'with formatting']
                        ]),
                        className: 'text-primary'
                    }
                ]
            },
            {
                key: 'row2',
                startLabel: new Map([
                    ['en', 'Negative Second row without']
                ]),
                endLabel: new Map([
                    ['en', 'Positive Second row without']
                ]),
            }
        ],
        defaultMode: 'vertical',
        responsiveModes: {
            sm: 'withLabelRow',
            lg: 'table',
        },
        withLabelRowModeProps: {
            maxLabelWidth: '120px',

        },
        verticalModeProps: {},
        tableModeProps: {},
        titleClassName: 'sticky-top',
        isRequired: true,
    });
}
