import { Survey, LocalizedString } from "survey-engine/lib/data_types";

interface SurveyEditorInt {
    setSurveyName: (name: Array<LocalizedString>) => void;
    setSurveyDescription: (description: Array<LocalizedString>) => void;

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



    getSurvey(): Survey {
        return { ...this.survey };
    };

    getSurveyJSON(pretty?: boolean): string {
        return JSON.stringify(this.survey, undefined, pretty ? '  ' : undefined);
    };

}