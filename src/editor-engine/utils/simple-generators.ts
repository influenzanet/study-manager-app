import { LocalizedString, ItemComponent, ExpressionName, Expression } from "survey-engine/lib/data_types";

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
