import { LocalizedString, ItemComponent, ExpressionName, Expression, ItemGroupComponent } from "survey-engine/lib/data_types";
import { ComponentEditor } from "../survey-editor/component-editor";

export const generateLocStrings = (translations: Map<string, string>): LocalizedString[] => {
    // console.log(translations);
    const locString = new Array<LocalizedString>();
    translations.forEach((value, key) => {
        const item: LocalizedString = {
            code: key,
            parts: [{ str: value }]
        };
        locString.push(item);
    });
    return locString;
}

export const generateTitleComponent = (translations: Map<string, string>): ItemComponent => {
    return {
        role: 'title',
        content: generateLocStrings(translations)
    };
}

export const generateHelpGroupComponent = (
    items: Array<{
        content: Map<string, string>,
        style?: Array<{ key: string, value: string }>,
    }>): ItemGroupComponent => {

    // init group
    const groupEdit = new ComponentEditor(undefined, {
        isGroup: true,
        role: 'helpGroup',
    });

    groupEdit.setOrder({
        name: 'sequential'
    });

    items.forEach(item => {
        const itemEditor = new ComponentEditor(undefined, {
            role: 'text',
        });
        itemEditor.setContent(generateLocStrings(item.content));
        if (item.style) {
            itemEditor.setStyles(item.style);
        }

        groupEdit.addItemComponent(itemEditor.getComponent());
    });
    return groupEdit.getComponent() as ItemGroupComponent;
}

export const expWithArgs = (name: ExpressionName, ...args: any[]): Expression => {
    return {
        name: name,
        data: args.map(arg => {
            if (typeof (arg) === 'string') {
                return {
                    str: arg
                }
            } else if (typeof (arg) === 'number') {
                return {
                    dtype: 'num',
                    num: arg
                }
            }
            return {
                dtype: 'exp',
                exp: arg as Expression
            }
        })
    }
}
