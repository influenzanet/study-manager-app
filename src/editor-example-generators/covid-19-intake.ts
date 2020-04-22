import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings } from "../editor-engine/utils/simple-generators";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";

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

    const group1 = survey.addNewSurveyItem({ itemKey: 'Q1', isGroup: true });
    const q0 = survey.addNewSurveyItem({ itemKey: 'Q0' }, group1?.key);


    console.log(q0);
    console.log(survey.getSurvey().current.surveyDefinition.items);
    /*
    survey.addNewSurveyItem({ itemKey: 'Q0' }, 'survey.Q1', 0);
    const q0Edit = new ItemEditor(q0);
    q0Edit.addToFollows('survey');
    // survey.updateSurveyItem(q0Edit.getItem());
        */

    const test = generateLocStrings(
        new Map([
            ["en", "hello"],
            ["de", "hallo"],
        ])
    );
    // console.log(test);

    survey.changeItemKey('survey', 'weekly');
    survey.changeItemKey('weekly.Q1', 'weekly.QG1');
    survey.changeItemKey('weekly.QG1.Q0', 'weekly.QG1.Q1');


    //console.log(survey.getSurveyJSON(true));
    //console.log(survey.getSurveyJSON());
    console.log(survey.getSurvey().current.surveyDefinition);
}