import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings } from "../editor-engine/utils/simple-generators";

export const generateCovid19Intake = () => {
    const survey = new SurveyEditor();

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "Welcome"],
            ["de", "Willkommen"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "The intake survey is focues on some background and demographic information."],
            ["de", "Fragebogen über den Hintergrund des Teilnehmers."],
        ])
    ));

    // max item per page
    // set prefill rules
    // set context rules
    const test = generateLocStrings(
        new Map([
            ["en", "hello"],
            ["de", "hallo"],
        ])
    );
    console.log(test);


    console.log(survey.getSurveyJSON(true));
    console.log(survey.getSurveyJSON());
    console.log(survey.getSurvey());
}