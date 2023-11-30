import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Expression } from "new-survey-engine/data_types/expression";
import { rulesOptions } from "../studyRules";

import intake from "../inf-intake"
import vaccination from "../inf-vaccination"
import { ParticipantFlags } from "../participantFlags";

// NOTE: the safest check is to flag as adult if every answer given to Q2 in the
// past passes the test but you could opt for at least one passing the test
// using 'any'. Those are the only two options unfortunately.
const isAdult = StudyEngine.checkConditionForOldResponses(
  StudyEngine.lt(
    StudyEngine.getResponseValueAsNum("intake.Q2", "rg.1"),
    StudyEngine.timestampWithOffset({ years: -rulesOptions.childAge })
  ),
  "all",
  intake.key)

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
    StudyEngine.if(isAdult,
      StudyEngine.do(
        addVaccination,
        StudyEngine.participantActions.updateFlag(ParticipantFlags.isChild.key, ParticipantFlags.isChild.values.no)),
      StudyEngine.do(
        StudyEngine.participantActions.assignedSurveys.remove(vaccination.key, "all"),
        StudyEngine.participantActions.updateFlag(ParticipantFlags.isChild.key, ParticipantFlags.isChild.values.yes))),
  ]
}