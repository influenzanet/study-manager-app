import { SurveyItem, SurveyGroupItem, SurveyItemTypes, Expression, Validation, ItemComponent, SurveySingleItem } from "survey-engine/lib/data_types";
import { NewItemProps } from "./data-types";

interface ItemEditorInt {
    getItem: () => SurveyItem;
    getItemJSON: (pretty?: boolean) => string;

    setKey: (newKey: string) => void;

    addToFollows: (key: string) => void;
    removeFromFollows: (key: string) => void;
    clearFollows: () => void;

    setCondition: (exp: Expression | undefined) => void;
    setPriority: (prio: number | undefined) => void;

    setVersion: (version: number) => void;
    setVersionTags: (tags: string[]) => void;

    // methods for survey group items:
    addSurveyItem: (item: SurveyItem, atPosition?: number) => void;
    updateSurveyItem: (item: SurveyItem) => void;
    removeItem: (key: string) => void;
    changeItemPosition: (key: string, newPosition: number) => void;

    setSelectionMethod: (exp: Expression | undefined) => void;


    // methods for survey single items:
    setItemType: (type: SurveyItemTypes) => void;

    addComponent: (parentComp: string, comp: ItemComponent, atPosition?: number) => void;
    removeComponent: (compKey: string) => void;
    changeComponentPosition: (compKey: string, newPosition: number) => void;

    addValidation: (v: Validation) => void;
    removeValidation: (vKey: string) => void;
}



export class ItemEditor implements ItemEditorInt {
    private surveyItem: SurveyItem;

    constructor(existingItem?: SurveyItem, newItem?: NewItemProps) {
        if (existingItem) {
            this.surveyItem = { ...existingItem };
        } else {
            const key = newItem?.itemKey ? newItem.itemKey : 'no key';
            if (newItem?.isGroup) {
                const currentItem: SurveyGroupItem = {
                    key,
                    version: 1,
                    items: [],
                }
                this.surveyItem = currentItem;
            } else {
                const currentItem: SurveyItem = {
                    key,
                    version: 1,
                    components: {
                        role: 'root',
                        items: []
                    }
                }
                if (newItem?.type) {
                    currentItem.type = newItem.type;
                }
                this.surveyItem = currentItem;
            }
        }
    }

    getItem(): SurveyItem {
        return { ...this.surveyItem };
    }

    getItemJSON(pretty?: boolean): string {
        return JSON.stringify(this.surveyItem, undefined, pretty ? '  ' : undefined);
    }

    setKey(newKey: string) {
        this.surveyItem.key = newKey;
    }

    addToFollows(key: string) {
        if (!this.surveyItem.follows) {
            this.surveyItem.follows = [];
        }
        if (this.surveyItem.follows.includes(key)) {
            console.warn('follows array already includes key: ', key);
            return;
        }
        this.surveyItem.follows.push(key);
    }

    removeFromFollows(key: string) {
        if (!this.surveyItem.follows) {
            console.warn('follows array already empty');
            return
        }
        if (!this.surveyItem.follows.includes(key)) {
            console.warn('follows array does not include key: ', key);
            return
        }
        this.surveyItem.follows = this.surveyItem.follows.filter(k => k !== key);
    };

    clearFollows() {
        if (!this.surveyItem.follows) {
            console.warn('follows array already empty');
            return
        }
        this.surveyItem.follows = undefined;
    };

    setCondition(exp: Expression | undefined) {
        this.surveyItem.condition = exp;
    };

    setPriority(prio: number | undefined) {
        this.surveyItem.priority = prio;
    };

    setVersion(version: number) {
        this.surveyItem.version = version;
    };

    setVersionTags(tags: string[]) {
        this.surveyItem.versionTags = [...tags];
    };

    // methods for survey group items:
    addSurveyItem(item: SurveyItem, atPosition?: number) {
        if (atPosition !== undefined) {
            (this.surveyItem as SurveyGroupItem).items.splice(atPosition, 0, { ...item });
        } else {
            (this.surveyItem as SurveyGroupItem).items.push({ ...item });
        }
    };

    updateSurveyItem(item: SurveyItem) {
        const ind = (this.surveyItem as SurveyGroupItem).items.findIndex(it => item.key === it.key);
        if (ind < 0) {
            console.warn('item not found in the items array');
            return;
        }
        (this.surveyItem as SurveyGroupItem).items[ind] = { ...item };
    };

    removeItem(key: string) {
        if (!(this.surveyItem as SurveyGroupItem).items.find(it => it.key === key)) {
            console.warn('group items does not contain item with key: ', key);
            return;
        }
        (this.surveyItem as SurveyGroupItem).items = (this.surveyItem as SurveyGroupItem).items.filter(it => it.key !== key);
    };

    changeItemPosition(key: string, newPosition: number) {
        console.warn('unimplemented');
    };

    setSelectionMethod(exp: Expression | undefined) {
        (this.surveyItem as SurveyGroupItem).selectionMethod = exp;
    };


    // methods for survey single items:
    setItemType(type: SurveyItemTypes) {
        (this.surveyItem as SurveySingleItem).type = type;
    };

    addComponent(parentKey: string, comp: ItemComponent, atPosition?: number) {
        const paths = parentKey.split('.');

        // handle root item components:
        if (paths.length === 1) {
            if (atPosition !== undefined) {
                (this.surveyItem as SurveySingleItem).components?.items.splice(atPosition, 0, comp);;
            } else {
                (this.surveyItem as SurveySingleItem).components?.items.push({ ...comp });
            }
            return;
        }


        console.log(paths)
        console.warn('unimplemented');
    };
    removeComponent(compKey: string) {
        console.warn('unimplemented');
    };

    changeComponentPosition(compKey: string, newPosition: number) {
        console.warn('unimplemented');
    };

    addValidation(v: Validation) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.validations) {
            currentItem.validations = []
        }
        if (currentItem.validations.find(valid => v.key === valid.key)) {
            console.warn('validation key already used: ', v.key);
            return
        }
        currentItem.validations.push({ ...v });
        this.surveyItem = { ...currentItem };
    };

    removeValidation(vKey: string) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.validations) {
            console.warn('validation key not found used: ', vKey);
            return
        }
        if (currentItem.validations.find(valid => vKey === valid.key)) {
            console.warn('validation key not found used: ', vKey);
            return
        }
        currentItem.validations = currentItem.validations.filter(v => v.key !== vKey);
        this.surveyItem = { ...currentItem };
    };
}