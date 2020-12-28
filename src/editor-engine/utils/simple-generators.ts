import { LocalizedString, ItemComponent, ExpressionName, Expression, ItemGroupComponent, SurveySingleItem } from "survey-engine/lib/data_types";
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

export const generateTitleComponent = (content: Map<string, string>, description?: Map<string, string>): ItemComponent => {
    return {
        role: 'title',
        content: generateLocStrings(content),
        description: description ? generateLocStrings(description) : undefined,
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
                    dtype: 'str',
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

export const generatePageBreak = (parentKey: string, key?: string): SurveySingleItem => {

    return {
        key: parentKey + '.' + (key ? key : Math.round(Math.random() * 10000).toFixed()),
        version: 0,
        type: 'pageBreak'
    };
}