import { SurveyGroupItem, SurveyItem } from "survey-engine/data_types";
import { ItemEditor } from "../survey-editor/item-editor";
import { SurveyEditor } from "../survey-editor/survey-editor";
import { generateLocStrings } from "./simple-generators";

export class SimpleSurveyEditor {
    editor: SurveyEditor;

    constructor(props: {
        surveyKey: string;
        name: Map<string, string>;
        description: Map<string, string>;
        durationText: Map<string, string>;
        // max item per page
        // set prefill rules
        // set context rules
    }) {
        this.editor = new SurveyEditor();
        this.editor.changeItemKey('survey', props.surveyKey);

        // define name and description of the survey
        this.editor.setSurveyName(generateLocStrings(
            props.name
        ));
        this.editor.setSurveyDescription(generateLocStrings(
            props.description
        ));

        this.editor.setSurveyDuration(generateLocStrings(
            props.durationText
        ));

        const rootItemEditor = new ItemEditor(this.editor.findSurveyItem(props.surveyKey) as SurveyGroupItem);
        rootItemEditor.setSelectionMethod({ name: 'sequential' });
        this.editor.updateSurveyItem(rootItemEditor.getItem());
    }

    getSurvey() {
        return this.editor.getSurvey();
    }

    getSurveyJSON() {
        return this.editor.getSurveyJSON();
    }

    addSurveyItemToRoot(item: SurveyItem) {
        this.editor.addExistingSurveyItem(item, this.editor.getSurvey().surveyDefinition.key);
    }

    addSurveyItemToPath(item: SurveyItem, parentKey: string) {
        this.editor.addExistingSurveyItem(item, parentKey);
    }
}
