import { Survey, SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { initLikertScaleItem } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { likertScaleKey } from "../common_question_pool/key-definitions";


export const generateSurvey = (): Survey | undefined => {
    const surveyKey = 'example';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "Example Likert Scales"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Showcase how to use Likert Scales."],
        ])
    ));

    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "This will take 2 minutes."],
        ])
    ));
    // max item per page
    // set prefill rules
    // set context rules


    const rootItemEditor = new ItemEditor(survey.findSurveyItem(surveyKey) as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;

    // *******************************
    // Questions
    // *******************************
    survey.addExistingSurveyItem(simpleExample1(rootKey), rootKey);

    survey.addExistingSurveyItem(labelExample1(rootKey), rootKey);

    survey.addExistingSurveyItem(labelExample2(rootKey), rootKey);

    survey.addExistingSurveyItem(simpleExample2(rootKey), rootKey);

    return survey.getSurvey();
}

export default generateSurvey;

const simpleExample1 = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'EX1'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Three point likert scale"],
        ]))
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initLikertScaleItem(likertScaleKey, [
        {
            key: "1", content: new Map([
                ["en", "Disagree"]
            ]),
        },
        {
            key: "2", content: new Map([
                ["en", "Neutral"]
            ]),
        },
        {
            key: "3", content: new Map([
                ["en", "Agree"]
            ]),
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    // None

    return editor.getItem();
}


const labelExample1 = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'LE1'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Five point Likert Scale"],
        ]))
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const rg_inner = initLikertScaleItem(likertScaleKey, [
        {
            key: "1", content: new Map([
                ["en", "Strongly Disagree"]
            ]),
        },
        {
            key: "2", content: new Map([
                ["en", "Disagree"]
            ]),
        },
        {
            key: "3", content: new Map([
                ["en", "Neutral"]
            ]),
        },
        {
            key: "4", content: new Map([
                ["en", "Agree"]
            ]),
        },
        {
            key: "5", content: new Map([
                ["en", "Strongly Agree"]
            ]),
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    // None

    return editor.getItem();
}

const labelExample2 = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'LE2'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "10 options"],
        ]))
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 fst-italic' }],
        content: generateLocStrings(
            new Map([
                ['en', '1 = least likely, 10 = most likely'],
            ])),
    }, rg?.key);
    const rg_inner = initLikertScaleItem(likertScaleKey, [
        {
            key: "1", content: new Map([
                ["en", "1"]
            ]),
        },
        {
            key: "2", content: new Map([
                ["en", "2"]
            ]),
        },
        {
            key: "3", content: new Map([
                ["en", "3"]
            ]),
        },
        {
            key: "4", content: new Map([
                ["en", "4"]
            ]),
        },
        {
            key: "5", content: new Map([
                ["en", "5"]
            ]),
        },
        {
            key: "6", content: new Map([
                ["en", "6"]
            ]),
        },
        {
            key: "7", content: new Map([
                ["en", "7"]
            ]),
        },
        {
            key: "8", content: new Map([
                ["en", "8"]
            ]),
        },
        {
            key: "9", content: new Map([
                ["en", "9"]
            ]),
        },
        {
            key: "10", content: new Map([
                ["en", "10"]
            ]),
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    // VALIDATIONs
    // None

    return editor.getItem();
}


const simpleExample2 = (parentKey: string, keyOverride?: string): SurveyItem => {
    const defaultKey = 'EX2'
    const itemKey = [parentKey, keyOverride ? keyOverride : defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    // QUESTION TEXT
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Multiple Likert Scales"],
        ]))
    );

    // RESPONSE PART
    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Without labels'],
            ])),
    }, rg?.key);

    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_1', [
        { key: "1" },
        { key: "2" },
        { key: "3" },
        { key: "4" },
        { key: "5" },
    ]), rg?.key);
    // editor.addExistingResponseComponent(rg_inner, rg?.key);


    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2 mt-3 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['en', 'With disabled options'],
            ])),
    }, rg?.key);


    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_2', [
        {
            key: "1", content: new Map([
                ["en", "inactive"]
            ]), disabled: expWithArgs('gt', 1, 0)
        },
        { key: "2" },
        { key: "3" },
        { key: "4" },
        {
            key: "5", content: new Map([
                ["en", "disabled"]
            ]), disabled: expWithArgs('gt', 1, 0)
        },
    ]), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2 mt-3 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['en', 'With label disappearing on small screens'],
            ])),
    }, rg?.key);

    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_3', [
        {
            key: "1", content: new Map([
                ["en", "Very negative"]
            ]),
        },
        {
            key: "2",
        },
        {
            key: "3", content: new Map([
                ["en", "Neutral towards the thing"]
            ]),
            className: "d-none d-sm-inline text-center"
        },
        {
            key: "4",
        },
        {
            key: "5", content: new Map([
                ["en", "Most positive about it"]
            ]),
        },
    ],
        false
    ), rg?.key);

    editor.addExistingResponseComponent({
        role: 'text',
        style: [{ key: 'className', value: 'mb-2 mt-3 fw-bold' }, { key: 'variant', value: 'h5' }],
        content: generateLocStrings(
            new Map([
                ['en', 'Stacked on small screens'],
            ])),
    }, rg?.key);

    editor.addExistingResponseComponent(initLikertScaleItem(likertScaleKey + '_4', [
        {
            key: "1", content: new Map([
                ["en", "Very negative"]
            ]),
        },
        {
            key: "2",
        },
        {
            key: "3", content: new Map([
                ["en", "Neutral towards the thing"]
            ]),
        },
        {
            key: "4",
        },
        {
            key: "5", content: new Map([
                ["en", "Most positive about it"]
            ]),
        },
    ],
        true
    ), rg?.key);

    // VALIDATIONs
    // None

    return editor.getItem();
}
