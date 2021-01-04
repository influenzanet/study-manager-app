import { SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { initSingleChoiceGroup } from "../../editor-engine/utils/question-type-generator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "../../editor-engine/utils/simple-generators";
import { responseGroupKey, singleChoiceKey } from "./key-definitions";


export const get_intake_q1_def = (parentKey: string, key: string, isRequired?: boolean): SurveyItem => {
    const itemKey = [parentKey, key].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });

    editor.setTitleComponent(
        generateTitleComponent(new Map([
            ["en", "What is your gender?"],
            ["nl", "Wat is je geslacht?"],
            ["fr", "Quel est votre sexe?"],
        ]))
    );

    editor.setHelpGroupComponent(
        generateHelpGroupComponent([
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether the chance of getting flu is different between genders."],
                    ["nl", "Om te kijken naar verschillen tussen mannen en vrouwen."],
                    ["fr", "Pour savoir si le risque de contracter la grippe est différent entre hommes et femmes."],
                ]),
                style: [{ key: 'variant', value: 'p' }, { key: 'className', value: 'm-0' }],
            },
        ])
    );

    const rg = editor.addNewResponseComponent({ role: 'responseGroup' });

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, [
        {
            key: '0', role: 'option',
            content: new Map([
                ["en", "male"],
                ["nl", "Man"],
                ["fr", "Homme"],
            ])
        },
        {
            key: '1', role: 'option',
            content: new Map([
                ["en", "female"],
                ["nl", "Vrouw"],
                ["fr", "Femme"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["en", "other"],
                ["nl", "Anders"],
            ])
        },
    ]);
    editor.addExistingResponseComponent(rg_inner, rg?.key);

    if (isRequired) {
        editor.addValidation({
            key: 'r1',
            type: 'hard',
            rule: expWithArgs('hasResponse', itemKey, responseGroupKey)
        });
    }

    return editor.getItem();
}
