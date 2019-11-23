import { Expression } from 'survey-engine/lib/data_types';

export type ExpressionCodeEditorProps = {
    expression?: Expression;
    save: (expression: Expression) => void;
    cancel: () => void;
}