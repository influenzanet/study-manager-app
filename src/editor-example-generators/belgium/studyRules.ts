import { Expression } from "new-survey-engine/data_types";
import { ParticipantFlags } from "./participantFlags";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { StudyRules } from "case-editor-tools/types/studyRules";

import intake from "../belgium/inf-intake"
import weekly from "../belgium/inf-weekly"
import vaccination from "../belgium/inf-vaccination"

// NOTE: just to be sure these are called before generating rules, might not be
// necessary, should have already been called
intake();
weekly();
vaccination();

interface RulesOptions {
    childAge: number;
    weeklyResubmitHours: number;
    vaccinationResubmitDays: number;
}

export const studyRules = ((
    Options: RulesOptions
) => {
    /**
     * Define what should happen, when persons enter the study first time:
     */

    const entryRules: Expression[] = [
        StudyEngine.participantActions.assignedSurveys.add(intake.key, "normal"),
    ];

    /**
     * Define what should happen, when persons submit an intake survey:
     */
    const handleIntake = StudyEngine.ifThen(
        StudyEngine.checkSurveyResponseKey(intake.key),
        // remove assigned intake
        StudyEngine.participantActions.assignedSurveys.removeAll(),
        // add weekly survey
        StudyEngine.participantActions.assignedSurveys.add(weekly.key, "prio"),
        // add optional intake
        StudyEngine.participantActions.assignedSurveys.add(intake.key, "optional"),
        // add priority intake again after 1 year
        StudyEngine.participantActions.assignedSurveys.add(
            intake.key,
            "prio",
            StudyEngine.timestampWithOffset({
                years: 1,
            })
        ),
    );

    const handleWeekly = StudyEngine.ifThen(
        StudyEngine.checkSurveyResponseKey(weekly.key),
        // remove weekly and re-add it with new a new timeout
        StudyEngine.participantActions.assignedSurveys.remove(weekly.key, "all"),
        StudyEngine.participantActions.assignedSurveys.add(
            weekly.key,
            "prio",
            StudyEngine.timestampWithOffset({
                hours: Options.weeklyResubmitHours,
            })
        ),
        // Manage flags:
        StudyEngine.ifThen(
            // if has ongoing symptoms:
            StudyEngine.singleChoice.any(weekly.Q_symptomsEndKey, "2"),
            // then:
            StudyEngine.participantActions.updateFlag(
                ParticipantFlags.hasOnGoingSymptoms.key,
                ParticipantFlags.hasOnGoingSymptoms.values.yes
            )
        ),
        StudyEngine.ifThen(
            // if has not ongoing symptoms:
            StudyEngine.not(StudyEngine.singleChoice.any(weekly.Q_symptomsEndKey, "2")),
            // then:
            StudyEngine.participantActions.updateFlag(
                ParticipantFlags.hasOnGoingSymptoms.key,
                ParticipantFlags.hasOnGoingSymptoms.values.no
            )
        )
    );

    const handleVaccination = StudyEngine.ifThen(
        StudyEngine.checkSurveyResponseKey(vaccination.key),
        // remove vaccination and re-add it with a new timeout
        StudyEngine.participantActions.assignedSurveys.remove(
            vaccination.key,
            "all"
        ),
        // update vaccinationCompleted flag
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.vaccinationCompleted.key,
            ParticipantFlags.vaccinationCompleted.values.yes
        ),
        StudyEngine.participantActions.assignedSurveys.add(
            vaccination.key,
            "prio",
            StudyEngine.timestampWithOffset({
                days: Options.vaccinationResubmitDays,
            })
        )
    );

    const handleTestingHabits = StudyEngine.ifThen(
        StudyEngine.checkSurveyResponseKey("testing_habits"),
        // remove testing habits survey after first submit
        StudyEngine.participantActions.assignedSurveys.remove(
            'testing_habits',
            "all"
        ));

    const submitRules: Expression[] = [
        handleIntake,
        handleWeekly,
        handleVaccination,
        handleTestingHabits
    ];

    /**
     * STUDY RULES
     */
    return new StudyRules(entryRules, submitRules).get();
})({ childAge: 18, vaccinationResubmitDays: 28, weeklyResubmitHours: 1 });