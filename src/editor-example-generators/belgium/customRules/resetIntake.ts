import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Expression } from "new-survey-engine/data_types/expression";


export const resetIntake: {
        name: string;
        rules: Expression[];
    } = {
    name: "resetIntake",
    rules: [
        StudyEngine.participantActions.assignedSurveys.remove('intake', 'all'),
        StudyEngine.participantActions.assignedSurveys.add('intake', 'prio'),
    ]
}