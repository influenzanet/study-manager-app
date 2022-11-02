import { Expression } from 'survey-engine/data_types';

export type ExpressionCodeEditorProps = {
    expression?: Expression;
    save: (expression: Expression) => void;
    cancel: () => void;
}
