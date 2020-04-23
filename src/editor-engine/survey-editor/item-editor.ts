import { SurveyItem, SurveyGroupItem, SurveyItemTypes, Expression, Validation, ItemComponent, SurveySingleItem, ItemGroupComponent, ExpressionName, ResponseComponent, isItemGroupComponent } from "survey-engine/lib/data_types";
import { NewItemProps, NewComponentProps } from "./data-types";
import { ComponentEditor } from "./component-editor";


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
    addNewResponseComponent: (props: NewComponentProps, parentKey?: string, atPosition?: number) => ItemComponent | undefined;
    addExistingResponseComponent: (comp: ResponseComponent, parentKey?: string, atPosition?: number) => ItemComponent | undefined;
    updateResponseComponent: (path: string, item: ResponseComponent) => void;
    removeResponseComponent: (key: string) => void;
    findResponseComponent: (key: string) => ItemComponent | undefined;

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

    addNewResponseComponent(props: NewComponentProps, parentKey?: string, atPosition?: number): ItemComponent | undefined {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components) {
            currentItem.components = { ...initialRootComp }
        }

        if (!parentKey) {
            props.role = 'responseGroup';
            if (!props.key) {
                props.key = 'root';
            }
            props.isGroup = true;
            const newComponent = (new ComponentEditor(undefined, props)).getComponent() as ItemGroupComponent;
            const ind = currentItem.components.items.findIndex(comp => comp.role === 'responseGroup');
            if (ind < 0) {
                currentItem.components.items.push(newComponent);
                return { ...newComponent };
            }
            currentItem.components.items[ind] = newComponent;
            return { ...newComponent };
        }

        const ids = parentKey.split('.');

        let obj: ItemComponent | undefined = undefined;
        for (const currentKey of ids) {
            if (!obj) {
                const ind = currentItem.components.items.findIndex(c => c.key === currentKey);
                if (ind < 0) {
                    console.warn('response component not found: ', currentKey);
                    return;
                }
                obj = currentItem.components.items[ind] as ResponseComponent;
                continue;
            }
            if (!isItemGroupComponent(obj)) {
                (obj as ItemGroupComponent).items = [];
                // leaf found
                break;
            }
            const index = obj.items.findIndex(it => it.key === currentKey);
            if (index < 0) {
                console.warn('item component cannot be found: ', currentKey);
                return;
            }
            obj = (obj.items[index] as ItemGroupComponent);
        }
        if (!obj) {
            console.warn('survey item cannot be found: ', parentKey);
            return
        }

        if ((obj as ItemGroupComponent).items.find(it => props.key === it.key)) {
            console.warn('item already exists with key: ', props.key);
            return undefined;
        }

        const newComponent = (new ComponentEditor(undefined, props)).getComponent() as ResponseComponent;
        if (atPosition !== undefined) {
            (obj as ItemGroupComponent).items.splice(atPosition, 0, newComponent);
        } else {
            (obj as ItemGroupComponent).items.push(newComponent);
        }
        return newComponent;
    };

    addExistingResponseComponent(comp: ResponseComponent, parentKey?: string, atPosition?: number): ItemComponent | undefined {
        // TODO
        console.warn('todo');
        return
    };

    updateResponseComponent(path: string, item: ResponseComponent) {
        console.warn('todo');
    };

    removeResponseComponent(keyPath: string) {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components) { return; }

        const responseGroup = currentItem.components.items.find(comp => comp.role === 'responseGroup');
        if (!responseGroup) {
            console.warn('no responseGroup found');
            return;
        }

        if (responseGroup.key === keyPath) {
            currentItem.components.items = currentItem.components.items.filter(it => it.role !== 'responseGroup');
            return;
        }

        const ids = keyPath.split('.');
        const parentIds = ids.slice(1, ids.length - 1);

        let obj: ItemComponent | undefined = responseGroup;
        for (const currentKey of parentIds) {
            if (!isItemGroupComponent(obj)) {
                // leaf found
                break;
            }
            const index = obj.items.findIndex(it => it.key === currentKey);
            if (index < 0) {
                console.warn('item component cannot be found: ', currentKey);
                return;
            }
            obj = (obj.items[index] as ItemGroupComponent);
        }
        if (!obj) {
            console.warn('survey item cannot be found: ', keyPath);
            return
        }

        (obj as ItemGroupComponent).items = (obj as ItemGroupComponent).items.filter(comp => comp.key !== ids[ids.length - 1]);
    };

    findResponseComponent(key: string): ItemComponent | undefined {
        const currentItem = (this.surveyItem as SurveySingleItem);
        if (!currentItem.components) { return; }

        const ids = key.split('.');

        let obj: ItemComponent | undefined = undefined;
        for (const currentKey of ids) {
            if (!obj) {
                const ind = currentItem.components.items.findIndex(c => c.key === currentKey);
                if (ind < 0) {
                    console.warn('item component not found: ', currentKey);
                    return;
                }
                obj = currentItem.components.items[ind] as ResponseComponent;
                continue;
            }
            if (!isItemGroupComponent(obj)) {
                (obj as ItemGroupComponent).items = [];
                // leaf found
                break;
            }
            const index = obj.items.findIndex(it => it.key === currentKey);
            if (index < 0) {
                console.warn('item component cannot be found: ', currentKey);
                return;
            }
            obj = (obj.items[index] as ItemGroupComponent);
        }
        if (!obj) {
            console.warn('item component cannot be found: ', key);
            return
        }
        return obj;
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