import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Expression } from "survey-engine/data_types/expression";
import { rulesOptions } from "../studyRules";

import intake from "../inf-intake"
import vaccination from "../inf-vaccination"
import { ParticipantFlags } from "../participantFlags";


// NOTE: if no survey is found the default result of
// checkConditionForOldResponses is false, if that's the case do not touch the
// flag, otherwise we check if every answer given to Q2 in the past is greater
// than the childAge, we have to take every since latest response is not an option
const isAdult = StudyEngine.and(
  StudyEngine.checkConditionForOldResponses(
    StudyEngine.hasResponseKey("intake.Q2", "rg.1"),
    "all",
    intake.key
  ),
  StudyEngine.checkConditionForOldResponses(
    StudyEngine.lt(
      StudyEngine.getResponseValueAsNum("intake.Q2", "rg.1"),
      StudyEngine.timestampWithOffset({ years: -rulesOptions.childAge })
    ),
    "all",
    intake.key
  ),
);


// NOTE: add vaccination if not already there, we do not want to alter the
// vaccination resubmission flow
const addVaccination = StudyEngine.do(
  StudyEngine.ifThen(
    StudyEngine.not(StudyEngine.participantState.hasSurveyKeyAssigned(vaccination.key)),
    StudyEngine.participantActions.assignedSurveys.add(vaccination.key, "prio")));

export const resetVaccination: {
  name: string;
  rules: Expression[];
} = {
  name: "resetVaccination",
  rules: [
    StudyEngine.do(
      StudyEngine.participantActions.assignedSurveys.remove(vaccination.key, "all"),
      StudyEngine.participantActions.removeFlag(ParticipantFlags.vaccinationCompleted.key),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.isChild.key, ParticipantFlags.isChild.values.yes)),
    StudyEngine.ifThen(
      isAdult,
      StudyEngine.do(
        addVaccination,
        StudyEngine.participantActions.updateFlag(ParticipantFlags.isChild.key, ParticipantFlags.isChild.values.no))),
  ]
}