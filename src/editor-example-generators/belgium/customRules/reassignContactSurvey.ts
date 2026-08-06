import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { generateExpression } from "case-editor-tools/expression-utils/expressionGen";
import { Expression } from "survey-engine/data_types/expression";

import { surveyKeys } from "../../external/contacts-survey/src/influenzanet-verdi-contact-extension/constants";
import {
    ParticipantFlags as ContactsFlags,
    assignContactsSurvey,
} from "../../external/contacts-survey/src/influenzanet-verdi-contact-extension/studyRules";

const Q3_2026_ANCHOR = 1782770399; // Mon 2026-06-29 21:59:59 UTC ISO week 27
const Q4_2026_ANCHOR = 1790632799; // Mon 2026-09-28 21:59:59 UTC ISO week 40

// to be changed to 7 if we run it after Monday 10
const LAST_GROUP_ALREADY_OPEN = 6;

const hasStudyStatus = (status: string) =>
    generateExpression("hasStudyStatus", undefined, status);

const anchor = (timestamp: number) =>
    StudyEngine.timestampWithOffset({ seconds: 0 }, timestamp);

export const reassignContactSurvey: {
    name: string;
    rules: Expression[];
} = {
    name: "reassignContactSurvey",
    rules: [
        StudyEngine.ifThen(
            StudyEngine.and(
                hasStudyStatus("active"),
                StudyEngine.not(
                    StudyEngine.participantState.hasSurveyKeyAssigned(
                        surveyKeys.Contacts,
                    ),
                ),
                StudyEngine.participantState.hasParticipantFlagKey(
                    ContactsFlags.intervalGroup.key,
                ),
            ),
            StudyEngine.if(
                StudyEngine.lte(
                    StudyEngine.participantState.getParticipantFlagValueAsNum(
                        ContactsFlags.intervalGroup.key,
                    ),
                    LAST_GROUP_ALREADY_OPEN,
                ),
                // if the window for this quarter already open then skip to Q4
                assignContactsSurvey(anchor(Q4_2026_ANCHOR)),
                // if the window still ahead then keep them in Q3
                assignContactsSurvey(anchor(Q3_2026_ANCHOR)),
            ),
        ),
    ],
};