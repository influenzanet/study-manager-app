import { Survey, LocalizedString, SurveyItem, isSurveyGroupItem, SurveyGroupItem } from "survey-engine/lib/data_types";
import { NewItemProps } from "./data-types";
import { ItemEditor } from "./item-editor";

interface SurveyEditorInt {
    setSurveyName: (name: Array<LocalizedString>) => void;
    setSurveyDescription: (description: Array<LocalizedString>) => void;

    changeItemKey: (oldKey: string, newKey: string) => void;
    addNewSurveyItem: (itemProps: NewItemProps, parentKey?: string, atPosition?: number) => SurveyItem | undefined;
    updateSurveyItem: (item: SurveyItem) => void;
    removeItem: (key: string) => void;
    findSurveyItem: (itemKey: string) => SurveyItem | undefined;
    moveSurveyItem: (item: SurveyItem, destination: string) => void;

    getSurvey: () => Survey;
    getSurveyJSON: (pretty?: boolean) => string;
}

export class SurveyEditor implements SurveyEditorInt {
    private survey: Survey;
    private surveyKey: string;

    constructor(survey?: Survey) {
        if (survey) {
            this.survey = { ...survey };
            this.surveyKey = this.survey.current.surveyDefinition.key;
        } else {
            this.surveyKey = 'survey';
            this.survey = {
                current: {
                    surveyDefinition: {
                        key: this.surveyKey,
                        version: 1,
                        items: []
                    }
                }
            }
        }
    }

    setSurveyName(name: Array<LocalizedString>) {
        this.survey.name = name;
    };

    setSurveyDescription(description: Array<LocalizedString>) {
        this.survey.description = description;
    };

    addNewSurveyItem(newItem: NewItemProps, parentKey?: string, atPosition?: number): SurveyItem | undefined {
        if (!parentKey) {
            newItem.itemKey = this.surveyKey + '.' + newItem.itemKey;

            if (this.survey.current.surveyDefinition.items.find(it => newItem.itemKey === it.key)) {
                console.warn('item already exists with key: ', newItem.itemKey);
                return undefined;
            }
            const item = (new ItemEditor(undefined, newItem)).getItem();

            if (atPosition !== undefined) {
                this.survey.current.surveyDefinition.items.splice(atPosition, 0, item);
            } else {
                this.survey.current.surveyDefinition.items.push(item);
            }
            return item;
        }
        const ids = parentKey.split('.');
        const paths = this.getKeyListForPath(ids);

        let obj: SurveyItem | undefined = undefined;
        for (const currentKey of paths) {
            if (!obj) {
                obj = this.survey.current.surveyDefinition;
                continue;
            }
            if (!isSurveyGroupItem(obj)) {
                console.warn('survey item is not a group: ', obj.key);
                return;
            }
            const index = obj.items.findIndex(it => it.key === currentKey);
            if (index < 0) {
                console.warn('survey item cannot be found: ', currentKey);
                return;
            }
            obj = (obj.items[index] as SurveyGroupItem);
        }
        if (!obj) {
            console.warn('survey item cannot be found: ', parentKey);
            return
        }

        newItem.itemKey = parentKey + '.' + newItem.itemKey;
        if ((obj as SurveyGroupItem).items.find(it => newItem.itemKey === it.key)) {
            console.warn('item already exists with key: ', newItem.itemKey);
            return undefined;
        }
        const item = (new ItemEditor(undefined, newItem)).getItem();
        if (atPosition !== undefined) {
            (obj as SurveyGroupItem).items.splice(atPosition, 0, item);
        } else {
            (obj as SurveyGroupItem).items.push(item);
        }
        return item;
    }

    changeItemKey(oldKey: string, newKey: string, ignoreReferences?: boolean) {
        if (oldKey === this.surveyKey) {
            this.surveyKey = newKey;
            this.survey.current.surveyDefinition = this.changeItemKeyForSubtree(this.survey.current.surveyDefinition, newKey) as SurveyGroupItem;
            return;
        }
        const ids = oldKey.split('.');
        const paths = this.getKeyListForPath(ids);

        let obj: SurveyItem | undefined = undefined;
        for (const currentKey of paths) {
            if (!obj) {
                obj = this.survey.current.surveyDefinition;
                continue;
            }
            if (!isSurveyGroupItem(obj)) {
                console.warn('survey item is not a group: ', obj.key);
                return;
            }
            const index = obj.items.findIndex(it => it.key === currentKey);
            if (index < 0) {
                console.warn('survey item cannot be found: ', currentKey);
                return;
            }
            obj = (obj.items[index] as SurveyGroupItem);
        }
        if (!obj) {
            console.warn('survey item cannot be found: ', oldKey);
            return
        }

        obj = Object.assign(obj, this.changeItemKeyForSubtree(obj, newKey));

        if (!ignoreReferences) {
            // replace key in every expression of the survey
            // replace key in every follows
            console.warn('unimplemented UPDATING KEY REFERENCES');
        }
    };

    updateSurveyItem(item: SurveyItem) {
        const ids = item.key.split('.');
        const parentIds = ids.slice(0, ids.length - 1);
        const paths = this.getKeyListForPath(parentIds);

        let obj: SurveyItem | undefined = undefined;
        for (const currentKey of paths) {
            if (!obj) {
                obj = this.survey.current.surveyDefinition;
                continue;
            }
            if (!isSurveyGroupItem(obj)) {
                console.warn('survey item is not a group: ', obj.key);
                return;
            }
            const index = obj.items.findIndex(it => it.key === currentKey);
            if (index < 0) {
                console.warn('survey item cannot be found: ', currentKey);
                return;
            }
            obj = (obj.items[index] as SurveyGroupItem);
        }
        if (!obj) {
            console.warn('survey item cannot be found: ', item.key);
            return
        }

        const index = (obj as SurveyGroupItem).items.findIndex(it => it.key === item.key);
        if (index < 0) {
            console.warn('survey item cannot be found: ', item.key);
            return;
        }
        (obj as SurveyGroupItem).items[index] = item;
        return;
    };

    removeItem(key: string) {
        // <- error if item is not found
        console.warn('removeItem unimplemented');
        return;
    };

    moveSurveyItem(item: SurveyItem, destination: string) {
        console.warn('moveSurveyItem unimplemented');
        // error if destination not exists
        // change item key
        // change key for all children recursivly
    };

    findSurveyItem(itemKey: string): SurveyItem | undefined {
        const ids = itemKey.split('.');
        const paths = this.getKeyListForPath(ids);

        let obj: SurveyItem | undefined = undefined;
        for (const currentKey of paths) {
            if (!obj) {
                obj = this.survey.current.surveyDefinition;
                continue;
            }
            if (!isSurveyGroupItem(obj)) {
                console.warn('survey item is not a group: ', obj.key);
                return;
            }
            const index = obj.items.findIndex(it => it.key === currentKey);
            if (index < 0) {
                console.warn('survey item cannot be found: ', currentKey);
                return;
            }
            obj = (obj.items[index] as SurveyGroupItem);
        }
        if (!obj) {
            console.warn('survey item cannot be found: ', itemKey);
            return;
        }

        return { ...obj };
    };

    getSurvey(): Survey {
        return { ...this.survey };
    };

    getSurveyJSON(pretty?: boolean): string {
        return JSON.stringify(this.survey, undefined, pretty ? '  ' : undefined);
    };

    // Private methods:
    private getKeyListForPath(ids: string[]): string[] {
        const paths: string[] = [];
        let compID = '';
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            if (compID.length < 1) {
                compID = id;
            } else {
                compID += '.' + id;
            }
            paths.push(compID);
        }
        return paths;
    }

    private changeItemKeyForSubtree(currentItem: SurveyItem, newKey: string): SurveyItem {
        currentItem = { ...currentItem };
        if (isSurveyGroupItem(currentItem)) {
            currentItem.items = currentItem.items.map(item => {
                const newSubkey = newKey + '.' + item.key.slice(item.key.lastIndexOf('.') + 1);
                return this.changeItemKeyForSubtree(item, newSubkey);
            });
        }
        currentItem.key = newKey;
        return currentItem;
    }

}