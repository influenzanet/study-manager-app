import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Expression } from "new-survey-engine/data_types/expression";

import vaccination from "../inf-vaccination"
import { ParticipantFlags } from "../participantFlags";

export const cleanupVaccination: {
  name: string;
  rules: Expression[];
} = {
  name: "cleanupVaccination",
  rules: [
    StudyEngine.participantActions.assignedSurveys.remove(vaccination.key, "all"),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.vaccinationCompleted.key),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.isChild.key)
  ]
}