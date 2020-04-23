import { ItemComponent, ItemGroupComponent, Expression, LocalizedObject, ComponentProperties } from "survey-engine/lib/data_types";
import { NewComponentProps } from "./data-types";


interface ComponentEditorInt {
    getComponent: () => ItemComponent;
    getComponentJSON: (pretty?: boolean) => string;

    setKey: (key: string | undefined) => void;
    setRole: (role: string) => void;
    setDisplayCondition: (expression: Expression | undefined) => void;
    setDisabled: (expression: Expression | undefined) => void;

    setContent: (translations: LocalizedObject[]) => void;
    setDescription: (translations: LocalizedObject[]) => void;
    setStyles: (styles: Array<{ key: string, value: string }>) => void;

    // response components:
    setDType: (dtype: 'string' | 'number' | 'date') => void;
    setProperties: (props: ComponentProperties) => void;

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

    setContent: (translations: LocalizedObject[]) => void;
    setDescription: (translations: LocalizedObject[]) => void;
    setStyles: (styles: Array<{ key: string, value: string }>) => void;

    // response components:
    setDType: (dtype: 'string' | 'number' | 'date') => void;
    setProperties: (props: ComponentProperties) => void;

    // item group component:
    setOrder: (orderExp: Expression | undefined) => void;
    addItemComponent: (item: ItemComponent, atPosition?: number) => void;
    updateItemComponent: (selector: string | number, updatedItem: ItemComponent) => void;
    removeItem: (index: number) => void;

}