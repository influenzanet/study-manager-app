import { Expression } from "survey-engine/lib/data_types";
import { StudyActions, StudyExpressions } from "../../../editor-engine/utils/studyServiceExpressions"
import { datePickerKey, responseGroupKey } from "../../../editor-engine/utils/key-definitions";
import { expWithArgs } from "../../../editor-engine/utils/simple-generators";

export const surveyKeys = {
    T0: 'T0',
    short: 'SHORT',
    shortC: 'SHORTc',
    T3: 'T3',
    T3c: 'T3c',
    T6: 'T6',
    T6c: 'T6c',
    T9: 'T9',
    T9c: 'T9c',
    T12: 'T12',
    T12c: 'T12c',
}

const timestampFromStudyStart = (daysDelta: number) => {
    return StudyExpressions.timestampWithOffset(
        {
            days: daysDelta
        },
        StudyExpressions.getStudyEntryTime(),
    );
}

const assignSurveyFromStudyStart = (
    surveyKey: string,
    category: "prio" | "normal" | "optional",
    startDays: number, durationDays: number
) => {
    return StudyActions.addNewSurvey(surveyKey, category, timestampFromStudyStart(startDays), timestampFromStudyStart(startDays + durationDays));
}

const assignT0 = () => StudyActions.addNewSurvey(
    surveyKeys.T0,
    "prio",
    StudyExpressions.timestampWithOffset({ seconds: -500 }),
    StudyExpressions.timestampWithOffset({
        days: 7
    }));

const assignShort = () => StudyActions.addNewSurvey(
    surveyKeys.short,
    "prio",
    StudyExpressions.timestampWithOffset({
        days: 7
    }),
    StudyExpressions.timestampWithOffset({
        days: 14
    }));

const assignShortC = () => StudyActions.addNewSurvey(
    surveyKeys.shortC,
    "normal",
    StudyExpressions.timestampWithOffset({
        days: 7
    }),
    StudyExpressions.timestampWithOffset({
        days: 14
    }));
const assignT3 = () => assignSurveyFromStudyStart(surveyKeys.T3, "prio", 90, 30);
const assignT6 = () => assignSurveyFromStudyStart(surveyKeys.T6, "prio", 180, 30);
const assignT9 = () => assignSurveyFromStudyStart(surveyKeys.T9, "prio", 270, 30);
const assignT12 = () => assignSurveyFromStudyStart(surveyKeys.T12, "prio", 360, 30);

const assignT3c = () => assignSurveyFromStudyStart(surveyKeys.T3c, "normal", 90, 30);
const assignT6c = () => assignSurveyFromStudyStart(surveyKeys.T6c, "normal", 180, 30);
const assignT9c = () => assignSurveyFromStudyStart(surveyKeys.T9c, "normal", 270, 30);
const assignT12c = () => assignSurveyFromStudyStart(surveyKeys.T12c, "normal", 360, 30);

const handleT0Submission = (): Expression => {
    const adultVersionChecks = {
        hasReportedSymptoms: () => StudyExpressions.multipleChoiceOnlyOtherKeysSelected(
            'T0.A.AH.Q1', 'geen'
        ),
        hasLongTermProblemsDueCorona: () => StudyExpressions.singleChoiceOptionsSelected(
            "T0.A.TEST.Q11", "ja"
        ),
        isTestResultUnknown: () => StudyExpressions.singleChoiceOptionsSelected(
            "T0.A.TEST.Q5", "unknown"
        )
    }
    const shouldGetAdultShortSurvey = () => expWithArgs(
        'and',
        adultVersionChecks.hasReportedSymptoms(),
        expWithArgs('not', adultVersionChecks.hasLongTermProblemsDueCorona()),
    )

    const shouldGetAdultT3Survey = () => expWithArgs('not', shouldGetAdultShortSurvey());

    const isChildParticipant = () =>
        expWithArgs('or',
            StudyExpressions.singleChoiceOptionsSelected('T0.CAT.Q1', 'kind'),
            expWithArgs(
                'gt',
                StudyExpressions.getResponseValueAsNum(
                    "T0.CAT.Q2", [responseGroupKey, datePickerKey].join('.')
                ),
                StudyExpressions.timestampWithOffset({
                    years: -16,
                })
            )
        )

    const isNotChildParticipant = () => expWithArgs('not', isChildParticipant());

    const isInterestedInAdditionalResearch = () => StudyExpressions.singleChoiceOptionsSelected(
        "T0.A.DEM.Q20", "ja"
    )

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T0),
        [
            StudyActions.removeAllSurveys(),
            StudyActions.ifThen(
                isInterestedInAdditionalResearch(),
                [StudyActions.updateParticipantFlag("additionalStudies", "ja"),]
            ),
            StudyActions.ifThen(
                adultVersionChecks.isTestResultUnknown(),
                [StudyActions.updateParticipantFlag("testResult", "unknown"),]
            ),
            StudyActions.ifThen(
                isChildParticipant(),
                [
                    StudyActions.finishParticipation(),
                    /*StudyActions.updateParticipantFlag("surveyCategory", "C"),
                    StudyActions.ifThen(
                        hasReportedSymptoms(),
                        [assignShortC()]
                    ),
                    StudyActions.ifThen(
                        hasNoReportedSymptoms(),
                        [assignT3c()]
                    )*/
                ]
            ),
            StudyActions.ifThen(
                isNotChildParticipant(),
                [
                    StudyActions.updateParticipantFlag("surveyCategory", "A"),
                    StudyActions.ifThen(
                        shouldGetAdultShortSurvey(),
                        [assignShort()]
                    ),
                    StudyActions.ifThen(
                        shouldGetAdultT3Survey(),
                        [assignT3(),]
                    )
                ]
            ),


        ]
    )
}

const handleShortSubmission = (): Expression => {
    const isStudyInitialPhase = () => expWithArgs('lt',
        StudyExpressions.timestampWithOffset({ days: -83 }),
        StudyExpressions.getStudyEntryTime(),
    )

    const hasReportedSymptoms = () => StudyExpressions.multipleChoiceOnlyOtherKeysSelected(
        surveyKeys.short + '.AH.Q1', 'geen'
    )

    const hasTestResultAlready = () => StudyExpressions.singleChoiceOptionsSelected(
        surveyKeys.short + 'TEST.Q5followup', 'pos', 'neg'
    );

    const shouldAssignShortAgain = () => expWithArgs(
        'and',
        hasReportedSymptoms(),
        isStudyInitialPhase(),
    );

    const shouldNotAssignShortAgain = () => expWithArgs('not', shouldAssignShortAgain());

    const performActions = () => [
        StudyActions.removeAllSurveys(),
        StudyActions.ifThen(
            shouldAssignShortAgain(),
            [assignShort()]
        ),
        StudyActions.ifThen(
            shouldNotAssignShortAgain(),
            [assignT3()]
        ),
        StudyActions.ifThen(
            hasTestResultAlready(),
            [
                StudyActions.updateParticipantFlag('testResult', 'known')
            ]
        )
    ]

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.short),
        performActions(),
    )
}

const handleT3Submission = (): Expression => {
    const hasTestResultAlready = () => StudyExpressions.singleChoiceOptionsSelected(
        surveyKeys.T3 + 'TEST.Q5followup', 'pos', 'neg'
    );

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T3),
        [
            StudyActions.removeAllSurveys(),
            assignT6(),
            StudyActions.ifThen(
                hasTestResultAlready(),
                [
                    StudyActions.updateParticipantFlag('testResult', 'known')
                ]
            )
        ]
    )
}

const handleT3cSubmission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T3c),
        [
            StudyActions.removeAllSurveys(),
            assignT6c(),
        ]
    )
}

const handleT6Submission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T6),
        [
            StudyActions.removeAllSurveys(),
            assignT9(),
        ]
    )
}

const handleT6cSubmission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T6c),
        [
            StudyActions.removeAllSurveys(),
            assignT9c(),
        ]
    )
}

const handleT9Submission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T9),
        [
            StudyActions.removeAllSurveys(),
            assignT12(),
        ]
    )
}

const handleT9cSubmission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T9c),
        [
            StudyActions.removeAllSurveys(),
            assignT12c(),
        ]
    )
}

const handleT12Submission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T12),
        [
            StudyActions.removeAllSurveys(),
            StudyActions.finishParticipation(),
        ]
    )
}

const handleT12cSubmission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T12c),
        [
            StudyActions.removeAllSurveys(),
            StudyActions.finishParticipation(),
        ]
    )
}

const handleStudyEntryEvent = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkEventType('ENTER'),
        [
            assignT0()
        ]
    )
}
const handleSubmissionEvent = () => StudyActions.ifThen(
    StudyExpressions.checkEventType('SUBMIT'),
    [
        handleT0Submission(),
        handleShortSubmission(),
        handleT3Submission(),
        handleT3cSubmission(),
        handleT6Submission(),
        handleT6cSubmission(),
        handleT9Submission(),
        handleT9cSubmission(),
        handleT12Submission(),
        handleT12cSubmission(),
    ]
)


const isSurveyExpired = (surveyKey: string) => expWithArgs('and',
    StudyExpressions.hasSurveyKeyAssigned(surveyKey),
    StudyExpressions.hasSurveyKeyValidUntilSoonerThan(surveyKey, { seconds: -1 }),
)

const handleTimerEvent = (): Expression => {
    const handleT0Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T0),
            [
                StudyActions.removeAllSurveys(),
                StudyActions.stopParticipation(),
            ]
        )
    };

    const handleShortExpired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.short),
            [
                StudyActions.removeAllSurveys(),
                assignT3(),
            ]
        )
    };

    const handleT3Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T3),
            [
                StudyActions.removeAllSurveys(),
                assignT6(),
            ]
        )
    };

    const handleT6Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T6),
            [
                StudyActions.removeAllSurveys(),
                assignT9(),
            ]
        )
    };

    const handleT9Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T9),
            [
                StudyActions.removeAllSurveys(),
                assignT12(),
            ]
        )
    };

    const handleT12Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T12),
            [
                StudyActions.removeAllSurveys(),
                StudyActions.stopParticipation(),
            ]
        )
    };

    return StudyActions.ifThen(
        StudyExpressions.checkEventType('TIMER'),
        [
            handleT0Expired(),
            handleShortExpired(),
            handleT3Expired(),
            handleT6Expired(),
            handleT9Expired(),
            handleT12Expired(),
        ]
    )

}


export const studyRules = [
    handleStudyEntryEvent(),
    handleSubmissionEvent(),
    handleTimerEvent(),
]
