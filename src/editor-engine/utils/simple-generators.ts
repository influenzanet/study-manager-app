import { LocalizedString, ItemComponent, ExpressionName, Expression, ItemGroupComponent, SurveySingleItem } from "survey-engine/data_types";
import { ComponentEditor } from "../survey-editor/component-editor";
import { StyledTextComponentProp } from "./question-type-generator";
import { generateRandomKey } from "./randomKeyGenerator";

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

export const generateTitleComponent = (content: Map<string, string> | Array<StyledTextComponentProp>, description?: Map<string, string>, className?: string): ItemComponent => {
    let items = undefined;
    let currentContent = undefined;

    if (Array.isArray(content)) {
        items = content.map((item, index) => {
            return {
                key: index.toFixed(),
                role: 'text',
                content: generateLocStrings(item.content),
                style: item.className ? [{ key: 'className', value: item.className }] : undefined
            }
        })
    } else {
        currentContent = generateLocStrings(content);
    }

    const style = className ? [{ key: 'className', value: className }] : undefined;
    return {
        role: 'title',
        content: currentContent,
        items: items,
        style: style,
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
        data: args.filter(a => a !== undefined).map(arg => {
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
        key: parentKey + '.' + (key ? key : "PB_" + generateRandomKey(4)),
        type: 'pageBreak'
    };
}
