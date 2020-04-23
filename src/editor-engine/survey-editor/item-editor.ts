import { SurveyItem, SurveyGroupItem, SurveyItemTypes, Expression, Validation, ItemComponent, SurveySingleItem, ItemGroupComponent, ExpressionName, ResponseComponent } from "survey-engine/lib/data_types";
import { NewItemProps, NewComponentProps } from "./data-types";


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

    // fixed components:
    setTitleComponent: (title: ItemComponent) => void;
    setHelpGroupComponent: (helpGroup: ItemGroupComponent) => void;
    // for warning, error, texts:
    addDisplayComponent: (comp: ItemComponent, atPosition?: number) => void;
    updateDisplayComponent: (at: number, comp: ItemComponent) => void;
    removeDisplayComponent: (at: number) => void;
    // response components:
    addNewResponseComponent: (props: NewComponentProps, parentKey?: string, atPosition?: number) => ResponseComponent | undefined;
    addExistingResponseComponent: (comp: ResponseComponent, parentKey?: string, atPosition?: number) => ResponseComponent | undefined;
    updateResponseComponent: (path: string, item: ResponseComponent) => void;
    removeResponseComponent: (key: string) => void;
    findResponseComponent: (key: string) => ResponseComponent | undefined;

    addValidation: (v: Validation) => void;
    removeValidation: (vKey: string) => void;
}

const initialRootComp = {
    role: 'root',
    order: { name: 'sequential' as ExpressionName },
    items: []
};

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
                    components: { ...initialRootComp },
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

    setTitleComponent(title: ItemComponent) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components) {
            currentItem.components = { ...initialRootComp }
        }
        title.role = 'title';
        const ind = currentItem.components.items.findIndex(comp => comp.role === 'title');
        if (ind < 0) {
            currentItem.components.items.push({ ...title });
            return;
        }
        currentItem.components.items[ind] = { ...title };
    }

    setHelpGroupComponent(helpGroup: ItemGroupComponent) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components) {
            currentItem.components = { ...initialRootComp }
        }
        helpGroup.role = 'helpGroup';
        const ind = currentItem.components.items.findIndex(comp => comp.role === 'helpGroup');
        if (ind < 0) {
            currentItem.components.items.push({ ...helpGroup });
            return;
        }
        currentItem.components.items[ind] = { ...helpGroup };
    };

    // for warning, error, texts:
    addDisplayComponent(comp: ItemComponent, atPosition?: number) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components) {
            currentItem.components = { ...initialRootComp }
        }
        if (atPosition !== undefined) {
            currentItem.components.items.splice(atPosition, 0, { ...comp });
        } else {
            currentItem.components.items.push({ ...comp });
        }
    };

    updateDisplayComponent(at: number, comp: ItemComponent) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components || !currentItem.components.items || currentItem.components.items.length <= at + 1 || at < 0) {
            console.warn('component not found at ', at);
            return;
        }
        currentItem.components.items[at] = { ...comp };
    };

    removeDisplayComponent(at: number) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components || !currentItem.components.items || currentItem.components.items.length <= at + 1 || at < 0) {
            console.warn('component not found at ', at);
            return;
        }
        currentItem.components.items.splice(at, 1);
    };

    addNewResponseComponent: (props: NewComponentProps, parentKey?: string, atPosition?: number) => ResponseComponent | undefined;
    addExistingResponseComponent: (comp: ResponseComponent, parentKey?: string, atPosition?: number) => ResponseComponent | undefined;
    updateResponseComponent: (path: string, item: ResponseComponent) => void;
    removeResponseComponent: (key: string) => void;
    findResponseComponent: (key: string) => ResponseComponent | undefined;

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