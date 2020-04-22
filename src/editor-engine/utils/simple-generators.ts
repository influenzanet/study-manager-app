import { LocalizedString, ItemComponent } from "survey-engine/lib/data_types";

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