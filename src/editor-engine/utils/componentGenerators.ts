import { Expression, ItemComponent } from "survey-engine/lib/data_types"
import { OptionDef } from "./question-type-generator"
import { generateRandomKey } from "./randomKeyGenerator"
import { generateLocStrings } from "./simple-generators"

interface CommonProps {
    key?: string,
    content?: Map<string, string>;
    displayCondition?: Expression;
}

interface OptionProps extends CommonProps {
    key: string;
    disabled?: Expression;
}

interface OptionTextProps extends CommonProps {
    key: string;
    className?: string;
}

const option = (props: OptionProps): OptionDef => {
    return {
        key: props.key,
        role: 'option',
        content: props.content,
        displayCondition: props.displayCondition,
        disabled: props.disabled,
    }
}

const multipleChoiceOptionSubtitle = (props: OptionTextProps): OptionDef => {
    const styles = [];
    if (props.className !== undefined) {
        styles.push({
            key: 'className', value: props.className
        })
    }
    return {
        key: props.key,
        role: 'text',
        content: props.content,
        displayCondition: props.displayCondition,
        style: styles,
    }
}

interface TextProps extends CommonProps {
    content: Map<string, string>;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'li';
    className?: string;
}

const text = (props: TextProps): ItemComponent => {
    const styles = [];
    if (props.className !== undefined) {
        styles.push({
            key: 'className', value: props.className
        })
    }
    if (props.variant !== undefined) {
        styles.push({
            key: 'variant', value: props.variant
        })
    }
    return {
        key: generateRandomKey(3),
        role: 'text',
        style: styles.length > 0 ? styles : undefined,
        content: generateLocStrings(props.content),
        displayCondition: props.displayCondition,
    }
}

interface MarkdownProps extends CommonProps {
    content: Map<string, string>;
    className?: string;
}

const markdown = (props: MarkdownProps): ItemComponent => {
    const styles = [];
    if (props.className !== undefined) {
        styles.push({
            key: 'className', value: props.className
        })
    }
    return {
        key: generateRandomKey(3),
        role: 'markdown',
        style: styles.length > 0 ? styles : undefined,
        content: generateLocStrings(props.content),
        displayCondition: props.displayCondition,
    }
}

const footnote = (props: {
    content: Map<string, string>;
}): ItemComponent => {
    return {
        role: 'footnote', content: generateLocStrings(props.content), style: [
            { key: 'className', value: 'fs-small fst-italic text-center' }
        ]
    }
}

export const ComponentGenerators = {
    option,
    multipleChoiceOptionSubtitle,
    footnote,
    text,
    markdown,
}
