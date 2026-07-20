import { Expression } from "survey-engine/data_types";
import { ParticipantFlags } from "./participantFlags";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { StudyRules } from "case-editor-tools/types/studyRules";

import {
  entryRules as entryRulesContacts,
  handleContactsQuestionnaireExpired,
  handleContactsQuestionnaireSubmission,
} from "../external/contacts-survey/src/influenzanet-verdi-contact-extension/studyRules";

import { HeatwaveStudyRulesBuilder } from "../external/common-study-definition/build/studies/heatwave/rules";
import { HeatwaveConsentSurvey } from "../external/common-study-definition/build/studies/heatwave/surveys";
import { HeatwaveKeys } from "../external/common-study-definition/build/studies/heatwave/surveys/keys";

import intake from "./inf-intake";
import weekly from "./inf-weekly";
import vaccination from "./inf-vaccination";
import { symptomsFeedbackReport } from "./reports/symptomsFeedback";

// NOTE: just to be sure these are called before generating rules, might not be
// necessary, should have already been called
intake();
weekly();
vaccination();

export interface RulesOptions {
    childAge: number;
    weeklyResubmitHours: number;
    vaccinationResubmitDays: number;
    vaccinationSurveyActive: number;
}

export const rulesOptions = {
    childAge: 18,
    vaccinationResubmitDays: 28,
    weeklyResubmitHours: 1,
    vaccinationSurveyActive: 0, // 1 = active, 0 = inactive
};

/**
 * Define what should happen, when persons enter the study first time:
 */

const entryRules: Expression[] = [
    StudyEngine.participantActions.assignedSurveys.add(
        intake.key,
        "normal",
    ),
    ...entryRulesContacts(),
];

/**
 * Define what should happen, when persons submit an intake survey:
 */
const handleIntake = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(intake.key),
    // remove assigned intake
    StudyEngine.participantActions.assignedSurveys.remove(intake.key, "all"),
    // add weekly survey if not already there
    StudyEngine.ifThen(
        StudyEngine.not(
            StudyEngine.participantState.hasSurveyKeyAssigned(weekly.key),
        ),
        StudyEngine.participantActions.assignedSurveys.add(weekly.key, "prio"),
    ),
    // add optional intake
    StudyEngine.participantActions.assignedSurveys.add(
        intake.key,
        "optional",
    ),
    // add priority intake again after 1 year
    StudyEngine.participantActions.assignedSurveys.add(
        intake.key,
        "prio",
        StudyEngine.timestampWithOffset({
            years: 1,
        }),
    ),
);

const handleWeekly = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(weekly.key),
    // remove weekly and re-add it with new a new timeout
    StudyEngine.participantActions.assignedSurveys.remove(
        weekly.key,
        "all",
    ),
    StudyEngine.participantActions.assignedSurveys.add(
        weekly.key,
        "prio",
        StudyEngine.timestampWithOffset({
            hours: rulesOptions.weeklyResubmitHours,
        }),
    ),
    // Manage flags:
    StudyEngine.ifThen(
        // if has ongoing symptoms:
        StudyEngine.singleChoice.any(weekly.Q_symptomsEndKey, "2"),
        // then:
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.hasOnGoingSymptoms.key,
            ParticipantFlags.hasOnGoingSymptoms.values.yes,
        ),
    ),
    StudyEngine.ifThen(
        // if has not ongoing symptoms:
        StudyEngine.not(
            StudyEngine.singleChoice.any(weekly.Q_symptomsEndKey, "2"),
        ),
        // then:
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.hasOnGoingSymptoms.key,
            ParticipantFlags.hasOnGoingSymptoms.values.no,
        ),
    ),
);

export const checkVaccinationSurveyEligibility = StudyEngine.and(
    StudyEngine.eq(rulesOptions.vaccinationSurveyActive, 1), // 1 = active, 0 = inactive
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(
      ParticipantFlags.isChild.key,
      ParticipantFlags.isChild.values.no
    ),
  )

const handleVaccination = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(vaccination.key),
    // remove vaccination and re-add it with a new timeout
    StudyEngine.participantActions.assignedSurveys.remove(
        vaccination.key,
        "all",
    ),
    // update vaccinationCompleted flag
    // NOTE: this is useful if you want a question to depend on this flag
    StudyEngine.participantActions.updateFlag(
        ParticipantFlags.vaccinationCompleted.key,
        ParticipantFlags.vaccinationCompleted.values.yes,
    ),
    StudyEngine.ifThen(
        checkVaccinationSurveyEligibility,
        StudyEngine.participantActions.assignedSurveys.add(
            vaccination.key,
            "prio",
            StudyEngine.timestampWithOffset({
                days: rulesOptions.vaccinationResubmitDays,
            }),
        ),
    )
);

const setChildFlag = (isOfAge: Expression) =>
    StudyEngine.do(
        // set child flag if younger than age
        StudyEngine.if(
            isOfAge,
            StudyEngine.participantActions.updateFlag(
                ParticipantFlags.isChild.key,
                ParticipantFlags.isChild.values.no,
            ),
            StudyEngine.participantActions.updateFlag(
                ParticipantFlags.isChild.key,
                ParticipantFlags.isChild.values.yes,
            ),
        ),
        // if child, remove vaccination survey if present
        StudyEngine.if(
            StudyEngine.and(
                StudyEngine.participantState.hasParticipantFlagKeyAndValue(
                    ParticipantFlags.isChild.key,
                    ParticipantFlags.isChild.values.yes,
                ),
                StudyEngine.participantState.hasSurveyKeyAssigned(
                    vaccination.key,
                ),
            ),
            StudyEngine.do(
                StudyEngine.participantActions.assignedSurveys.remove(
                    vaccination.key,
                    "all",
                ),
                StudyEngine.participantActions.removeFlag(
                    ParticipantFlags.vaccinationCompleted.key,
                ),
            ),
        ),
    );

const handleChild = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(intake.key),
    setChildFlag(
        StudyEngine.lt(
            StudyEngine.getResponseValueAsNum("intake.Q2", "rg.1"),
            StudyEngine.timestampWithOffset({ years: -rulesOptions.childAge }),
        ),
    ),
);

export const updateGenderFlag = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(intake.key),
    StudyEngine.participantActions.updateFlag(
        ParticipantFlags.gender.key,
        ParticipantFlags.gender.buildExpression(intake.Q_gender.key),
    )
)

/*
 * NOTE: this timer rule, if used, will run every timer cycle. Since
 * currently there is no way of checking a condition against the latest
 * response, we check all those given inside an interval greater than the
 * timer interval and react if we have any match. Furthermore, since there
 * is no way of distinguish between a failed condition and the absence of
 * responses, we should run the query twice.
 */
export const updateChild = StudyEngine.ifThen(
    StudyEngine.checkConditionForOldResponses(
        StudyEngine.hasResponseKey("intake.Q2", "rg.1"),
        "all",
        intake.key,
        StudyEngine.timestampWithOffset({ years: -1 }),
    ),
    setChildFlag(
        StudyEngine.checkConditionForOldResponses(
            StudyEngine.lt(
                StudyEngine.getResponseValueAsNum("intake.Q2", "rg.1"),
                StudyEngine.timestampWithOffset({ years: -rulesOptions.childAge }),
            ),
            "any",
            intake.key,
            StudyEngine.timestampWithOffset({ years: -1 }),
        ),
    ),
);

export const updateVaccinationAssignment = StudyEngine.if(
    checkVaccinationSurveyEligibility,
    StudyEngine.ifThen(
        StudyEngine.not(
            StudyEngine.participantState.hasSurveyKeyAssigned(vaccination.key)
        ),
        StudyEngine.do(
            StudyEngine.participantActions.updateFlag( 
                ParticipantFlags.vaccinationCompleted.key,
                ParticipantFlags.vaccinationCompleted.values.no,
            ),
            StudyEngine.participantActions.assignedSurveys.add(
                vaccination.key,
                "prio",
            ),
        ),
    ),
    StudyEngine.participantActions.assignedSurveys.remove(
        vaccination.key,
        "all",
    )
);

const handleTestingHabits = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey("testing_habits"),
    // remove testing habits survey after first submit
    StudyEngine.participantActions.assignedSurveys.remove(
        "testing_habits",
        "all",
    ),
);

const submitRules: Expression[] = [
    handleIntake,
    handleWeekly,
    handleVaccination,
    handleChild,
    handleTestingHabits,
    handleContactsQuestionnaireSubmission,
    updateGenderFlag,
    symptomsFeedbackReport(weekly),
];

const timerRules: Expression[] = [
    updateChild,
    handleContactsQuestionnaireExpired(),
    updateVaccinationAssignment,
];

/**
 * HEATWAVE WORKFLOW
 *
 * Assign the consent survey on entry, and handle consent/background/symptoms
 * submissions. 
 */
const heatConsentSurvey = new HeatwaveConsentSurvey(new Map<string, string>());
const heatwave = new HeatwaveStudyRulesBuilder({
    consent: heatConsentSurvey.key,
    consentItemKey: heatConsentSurvey.consent.key,
    consentYesCode: heatConsentSurvey.consent.coding.yes,
    background: HeatwaveKeys.BackgroundSurvey,
    symptoms: HeatwaveKeys.SymptomSurvey,
});
heatwave.build();

/**
 * STUDY RULES
 */
// FIXME: why was this a function?
export const studyRules = new StudyRules(
    [...entryRules, ...heatwave.rules.entry],
    [...submitRules, ...heatwave.rules.submit],
    timerRules,
).get();
