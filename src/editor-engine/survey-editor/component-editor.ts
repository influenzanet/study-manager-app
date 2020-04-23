import { ItemComponent, ItemGroupComponent, Expression, LocalizedObject, ComponentProperties, ResponseComponent } from "survey-engine/lib/data_types";
import { NewComponentProps } from "./data-types";


interface ComponentEditorInt {
    getComponent: () => ItemComponent;
    getComponentJSON: (pretty?: boolean) => string;

    setKey: (key: string | undefined) => void;
    setRole: (role: string) => void;
    setDisplayCondition: (expression: Expression | undefined) => void;
    setDisabled: (expression: Expression | undefined) => void;

    setContent: (translations: LocalizedObject[] | undefined) => void;
    setDescription: (translations: LocalizedObject[] | undefined) => void;
    setStyles: (styles: Array<{ key: string, value: string }> | undefined) => void;

    // response components:
    setDType: (dtype: 'string' | 'number' | 'date') => void;
    setProperties: (props: ComponentProperties | undefined) => void;

    // item group component:
    setOrder: (orderExp: Expression | undefined) => void;
    addItemComponent: (item: ItemComponent, atPosition?: number) => void;
    updateItemComponent: (selector: string | number, updatedItem: ItemComponent) => void;
    removeItem: (index: number) => void;
}

export class ComponentEditor implements ComponentEditorInt {
    component: ItemComponent;

    constructor(existingComponent?: ItemComponent, newComponent?: NewComponentProps) {
        if (existingComponent) {
            this.component = { ...existingComponent };
        } else if (newComponent) {
            this.component = {
                key: newComponent.key ? newComponent.key : undefined,
                role: newComponent.role ? newComponent?.role : 'none',
            }
            if (newComponent.isGroup) {
                (this.component as ItemGroupComponent).items = [];
            }
        }
        else {
            this.component = { role: 'undefined' };
        }
    }

    getComponent() {
        return { ...this.component };
    };

    getComponentJSON(pretty?: boolean) {
        return JSON.stringify(this.component, undefined, pretty ? '  ' : undefined);
    };

    setKey(key: string | undefined) {
        this.component.key = key;
    };

    setRole(role: string) {
        this.component.role = role;
    };

    setDisplayCondition(expression: Expression | undefined) {
        this.component.displayCondition = expression;
    };

    setDisabled(expression: Expression | undefined) {
        this.component.disabled = expression;
    };

    setContent(translations: LocalizedObject[] | undefined) {
        this.component.content = translations ? [...translations] : undefined;
    };

    setDescription(translations: LocalizedObject[] | undefined) {
        this.component.description = translations ? [...translations] : undefined;
    };

    setStyles(styles: Array<{ key: string, value: string }> | undefined) {
        this.component.style = styles ? [...styles] : undefined;
    };

    // response components:
    setDType(dtype: 'string' | 'number' | 'date') {
        (this.component as ResponseComponent).dtype = dtype;
    };

    setProperties(props: ComponentProperties | undefined) {
        (this.component as ResponseComponent).properties = { ...props };
    };

    // item group component:
    setOrder(orderExp: Expression | undefined) {
        (this.component as ItemGroupComponent).order = orderExp;
    };

    addItemComponent(item: ItemComponent, atPosition?: number) {
        if (!(this.component as ItemGroupComponent).items) {
            (this.component as ItemGroupComponent).items = [];
        }
        if (atPosition !== undefined) {
            (this.component as ItemGroupComponent).items.splice(atPosition, 0, { ...item });
        } else {
            (this.component as ItemGroupComponent).items.push({ ...item });
        }
    };

    updateItemComponent(selector: string | number, updatedItem: ItemComponent) {
        if (!(this.component as ItemGroupComponent).items) {
            console.warn('items array missing on the component');
            return;
        }
        if (typeof (selector) === 'string') {
            // find by key:
            const ind = (this.component as ItemGroupComponent).items.findIndex(c => c.key === selector);
            if (ind < 0) {
                console.warn('could not find component with given key: ', selector);
                return;
            }
            (this.component as ItemGroupComponent).items[ind] = { ...updatedItem };
        } else if (typeof (selector) === 'number') {
            // find by index:
            (this.component as ItemGroupComponent).items[selector] = { ...updatedItem };
        }
    };

    removeItem(index: number) {
        (this.component as ItemGroupComponent).items.splice(index, 1);
    };

}