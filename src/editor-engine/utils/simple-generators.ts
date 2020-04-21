import { LocalizedString } from "survey-engine/lib/data_types";

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