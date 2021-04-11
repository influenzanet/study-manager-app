import { Expression } from "survey-engine/lib/data_types";
import { StudyActions, StudyExpressions } from "../../../editor-engine/utils/commonExpressions"
import { expWithArgs } from "../../../editor-engine/utils/simple-generators";

export const surveyKeys = {
    T0: 'T0',
    short: 'short',
    T3: 'T3',
    T6: 'T6',
    T9: 'T9',
    T12: 'T12',
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
    "normal",
    StudyExpressions.timestampWithOffset({ seconds: -500 }),
    StudyExpressions.timestampWithOffset({
        days: 7
    }));

const assignShort = () => StudyActions.addNewSurvey(
    surveyKeys.short,
    "normal",
    StudyExpressions.timestampWithOffset({
        days: 7
    }),
    StudyExpressions.timestampWithOffset({
        days: 14
    }));
const assignT3 = () => assignSurveyFromStudyStart(surveyKeys.T3, "normal", 90, 30);
const assignT6 = () => assignSurveyFromStudyStart(surveyKeys.T6, "normal", 180, 30);
const assignT9 = () => assignSurveyFromStudyStart(surveyKeys.T9, "normal", 270, 30);
const assignT12 = () => assignSurveyFromStudyStart(surveyKeys.T12, "normal", 360, 30);

const handleT0Submission = (): Expression => {
    const hasReportedSymptoms = () => StudyExpressions.multipleChoiceOnlyOtherKeysSelected(
        'T0.TICP.Q1', 'geenvandeze'
    )
    const hasNoReportedSymptoms = () => expWithArgs('not', hasReportedSymptoms());

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T0),
        [
            StudyActions.removeAllSurveys(),
            StudyActions.ifThen(
                hasReportedSymptoms(),
                [assignShort()]

            ),
            StudyActions.ifThen(
                hasNoReportedSymptoms(),
                [assignT3()]
            )
        ]
    )
}

const handleShortSubmission = (): Expression => {
    const isStudyInitialPhase = () => expWithArgs('lt',
        StudyExpressions.timestampWithOffset({ days: -83 }),
        StudyExpressions.getStudyEntryTime(),
    )

    const hasReportedSymptoms = () => StudyExpressions.multipleChoiceOnlyOtherKeysSelected(
        'short.TICP.Q1', 'geenvandeze'
    )

    const shouldAssignShortAgain = () => expWithArgs('and',
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
        )
    ]

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.short),
        performActions(),
    )
}

const handleT3Submission = (): Expression => {
    const performActions = () => [
        StudyActions.removeAllSurveys(),
        assignT6(),
    ]

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T3),
        performActions(),
    )
}

const handleT6Submission = (): Expression => {
    const performActions = () => [
        StudyActions.removeAllSurveys(),
        assignT9(),
    ]

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T6),
        performActions(),
    )
}

const handleT9Submission = (): Expression => {
    const performActions = () => [
        StudyActions.removeAllSurveys(),
        assignT12(),
    ]

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T9),
        performActions(),
    )
}

const handleT12Submission = (): Expression => {
    const performActions = () => [
        StudyActions.removeAllSurveys(),
        StudyActions.finishParticipation(),
    ];

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T12),
        performActions(),
    )
}

const handleStudyEntryEvent = (): Expression => {
    const performActions = () => [
        assignT0()
    ];

    return StudyActions.ifThen(
        StudyExpressions.checkEventType('ENTER'),
        performActions(),
    )
}
const handleSubmissionEvent = () => StudyActions.ifThen(
    StudyExpressions.checkEventType('SUBMIT'),
    [
        handleT0Submission(),
        handleShortSubmission(),
        handleT3Submission(),
        handleT6Submission(),
        handleT9Submission(),
        handleT12Submission(),
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
