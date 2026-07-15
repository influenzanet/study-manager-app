import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Expression } from "survey-engine/data_types/expression";

/**
 * One off custom rule to bootstrap the heatwave workflow for participants who
 * are already in the study  
 */
export const assignHeatConsent: {
    name: string;
    rules: Expression[];
} = {
    name: "assignHeatConsent",
    rules: [
        StudyEngine.ifThen(
            StudyEngine.not(
                StudyEngine.participantState.hasSurveyKeyAssigned("heatconsent"),
            ),
            StudyEngine.participantActions.assignedSurveys.add("heatconsent", "normal"),
        ),
    ],
};