import { Survey, LocalizedString, SurveyItem } from "survey-engine/lib/data_types";

interface SurveyEditorInt {
    setSurveyName: (name: Array<LocalizedString>) => void;
    setSurveyDescription: (description: Array<LocalizedString>) => void;

    addSurveyItem: (parentKey: string, itemKey: string) => SurveyItem | undefined;
    updateSurveyItem: (item: SurveyItem) => void;
    removeItem: (key: string) => void;

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

    addSurveyItem(parentKey: string, itemKey: string): SurveyItem | undefined {
        //<- error if parent not exists / not a group - error if itemKey is already used in the group
        console.warn('unimplemented');
        return undefined;
    }

    updateSurveyItem(item: SurveyItem) {
        // <- error if item is not found
        console.warn('unimplemented');
        return;
    };

    removeItem(key: string) {
        // <- error if item is not found
        console.warn('unimplemented');
        return;
    };

    getSurvey(): Survey {
        return { ...this.survey };
    };

    getSurveyJSON(pretty?: boolean): string {
        return JSON.stringify(this.survey, undefined, pretty ? '  ' : undefined);
    };

}