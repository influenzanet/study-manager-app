import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor"
import { generateLocStrings } from "../editor-engine/utils/simple-generators";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";

export const generateCovid19Intake = () => {
    const survey = new SurveyEditor();
    survey.changeItemKey('survey', 'weekly');

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
    if (!group1) { return }

    const q0 = survey.addNewSurveyItem({ itemKey: 'Q0' }, group1.key);

    const g1Edit = new ItemEditor(group1);
    g1Edit.addToFollows('weekly');
    survey.updateSurveyItem(g1Edit.getItem());

    const q0Edit = new ItemEditor(q0);
    q0Edit.addToFollows(group1.key);
    survey.updateSurveyItem(q0Edit.getItem());





    const found = survey.findSurveyItem('weekly');
    console.log(found);
    const test = generateLocStrings(
        new Map([
            ["en", "hello"],
            ["de", "hallo"],
        ])
    );
    // console.log(test);

    //console.log(survey.getSurveyJSON(true));
    //console.log(survey.getSurveyJSON());
    console.log(survey.getSurvey().current.surveyDefinition);

    console.log(survey.getSurveyJSON());
}