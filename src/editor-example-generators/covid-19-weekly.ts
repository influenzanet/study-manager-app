import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent, expWithArgs } from "../editor-engine/utils/simple-generators";
import { SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";
import { initSingleChoiceGroup, initMultipleChoiceGroup } from "../editor-engine/utils/question-type-generator";
import { ComponentEditor } from "../editor-engine/survey-editor/component-editor";



const responseGroupKey = 'rg';
const singleChoiceKey = 'scg';
const multipleChoiceKey = 'mcg';

export const generateCovid19Weekly = () => {
    const survey = new SurveyEditor();
    survey.changeItemKey('survey', 'weekly');

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["de", "Wie fühlen Sie sich?"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Weekly survey about health status."],
            ["de", "Wöchentliche Fragebogen über den Gesundheitszustand."],
        ])
    ));

    let rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());

    const rootKey = rootItemEditor.getItem().key;

    // 32 title
    const q32_title = survey.addNewSurveyItem({ itemKey: '32title' }, rootKey);
    if (!q32_title) { return; }
    survey.updateSurveyItem(q32title_def(q32_title));


    // 32a --------------------------------------
    const q32a = survey.addNewSurveyItem({ itemKey: '32a' }, rootKey);
    if (!q32a) { return; }
    survey.updateSurveyItem(q32a_def(q32a));
    // -----------------------------------------

    // 32b --------------------------------------
    const q32b = survey.addNewSurveyItem({ itemKey: '32b' }, rootKey);
    if (!q32b) { return; }
    survey.updateSurveyItem(q32b_def(q32b));
    // -----------------------------------------

    // 32c --------------------------------------
    const q32c = survey.addNewSurveyItem({ itemKey: '32c' }, rootKey);
    if (!q32c) { return; }
    survey.updateSurveyItem(q32c_def(q32c));
    // -----------------------------------------

    // 32d --------------------------------------
    const q32d = survey.addNewSurveyItem({ itemKey: '32d' }, rootKey);
    if (!q32d) { return; }
    survey.updateSurveyItem(q32d_def(q32d));
    // -----------------------------------------

    // 32e --------------------------------------
    const q32e = survey.addNewSurveyItem({ itemKey: '32e' }, rootKey);
    if (!q32e) { return; }
    survey.updateSurveyItem(q32e_def(q32e));
    // -----------------------------------------

    survey.addNewSurveyItem({ itemKey: 'pb1', type: 'pageBreak' }, rootKey);




    // console.log(q32Editor.findResponseComponent('rg'));
    // q32Editor.removeResponseComponent('rg.scg');




    console.log(survey.getSurvey());
    console.log(survey.getSurveyJSON());

    // tests
    const exp1 = expWithArgs('responseHasKeysAny', 'weekly.32', '1.1.144', '1.1.145');
    const exp2 = expWithArgs('responseHasKeysAny', 'weekly.32', '1.1.146', '1.1.147');
    const expOr = expWithArgs('or', exp1, exp2);
    //console.log(expOr);
    // console.log(JSON.stringify(expOr, undefined, '  '));

}

const q32title_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Hint"],
            ["de", "Hinweis"],
        ]))
    );
    editor.addDisplayComponent(
        {
            role: 'text', content: generateLocStrings(new Map([
                ["en", "Please choose if you had any of the following symptoms since your last visit. If this is your first visit, please consider last week."],
                ["de", "Bitte beantworten Sie, ob Sie irgendwelche der folgenden Symptome seit Ihrem letzten Besuch hatten.  Falls dies Ihr erster Besuch ist, betrachten Sie bitte die vergangene Woche."],
            ]))
        }
    )
    return editor.getItem();
}


const q32a_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any general symptoms such as"],
            ["de", "Hatten Sie allgemeine Symptome wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '142', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Fever"],
                ["de", "Fieber"],
            ])
        },
        {
            key: '143', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chills"],
                ["de", "Schüttelfrost"],
            ])
        },
        {
            key: '149', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Headache"],
                ["de", "Kopfschmerzen"],
            ])
        },
        {
            key: '152', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Feeling tired or exhausted (malaise)"],
                ["de", "Müdigkeit oder Erschöpfung"],
            ])
        },
        {
            key: '153', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of appetite"],
                ["de", "Appetitlosigkeit"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32b_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any respiratorial symptoms such as"],
            ["de", "Hatten Sie Atemwegsbeschwerden wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '145', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sneezing"],
                ["de", "Niesen"],
            ])
        },
        {
            key: '146', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Sore throat"],
                ["de", "Halsweh"],
            ])
        },
        {
            key: '147', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Cough"],
                ["de", "Husten"],
            ])
        },
        {
            key: '144', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Runny or blocked nose"],
                ["de", "Laufende oder verstopfte Nase"],
            ])
        },
        {
            key: '148', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Shortness of breath"],
                ["de", "Atemnot"],
            ])
        },
        {
            key: '154', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Coloured sputum/phlegm"],
                ["de", "Farbiger Auswurf/Schleim"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32c_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any gastroenterological symptoms such as"],
            ["de", "Hatten Sie Beschwerden im Magen-Darm Trakt wie z.B."],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '156', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nausea"],
                ["de", "Brechreiz"],
            ])
        },
        {
            key: '157', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Vomiting"],
                ["de", "Erbrechen"],
            ])
        },
        {
            key: '158', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Diarrhoea"],
                ["de", "Durchfall"],
            ])
        },
        {
            key: '159', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Stomach ache"],
                ["de", "Bauchweh"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32d_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have of the following symptoms?"],
            ["de", "Hatten Sie eins der folgenden Beschwerden?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, [
        {
            key: '150', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Muscle/joint pain"],
                ["de", "Muskel-/ Gelenkschmerzen"],
            ])
        },
        {
            key: '151', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Chest pain"],
                ["de", "Schmerzen in der Brust"],
            ])
        },
        {
            key: '155', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Watery, bloodshot eyes"],
                ["de", "Wässrige, rote Augen"],
            ])
        },
        {
            key: '22', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Nose bleed"],
                ["de", "Nasenbluten"],
            ])
        },
        {
            key: '20', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of smell"],
                ["de", "Geruchsverlust"],
            ])
        },
        {
            key: '21', role: 'option',
            disabled: expWithArgs('responseHasKeysAny', editor.getItem().key, responseGroupKey + '.' + multipleChoiceKey, '0'),
            content: new Map([
                ["en", "Loss of taste"],
                ["de", "Geschmacksverlust"],
            ])
        },
        {
            key: '0', role: 'option', content: new Map([
                ["en", "No symptoms"],
                ["de", "Keine Symptome"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);
    return editor.getItem();
}

const q32e_def = (itemSkeleton: SurveyItem): SurveyItem => {
    const editor = new ItemEditor(itemSkeleton);
    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "Did you have any other symptoms?"],
            ["de", "Hatten Sie andere Beschwerden?"],
        ]))
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
    const descEdit = new ComponentEditor(undefined, {
        role: 'text'
    });
    descEdit.setContent(generateLocStrings(new Map([
        ["en", "If applies enter your response into the box:"],
        ["de", "Falls zutrifft, geben Sie bitte Ihre Antwort hier ein:"],
    ])));
    descEdit.setStyles([{ key: 'variant', value: 'annotation' }])
    editor.addExistingResponseComponent(descEdit.getComponent(), rg?.key);

    const input = new ComponentEditor(undefined, {
        key: '160',
        role: 'multilineTextInput'
    }).getComponent();
    editor.addExistingResponseComponent(input, rg?.key);
    return editor.getItem();
}

