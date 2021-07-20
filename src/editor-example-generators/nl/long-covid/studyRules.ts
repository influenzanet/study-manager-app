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

const getAgeInYearsExpression = (questionRef: string) => {
    return expWithArgs('dateResponseDiffFromNow', questionRef, [responseGroupKey, datePickerKey].join('.'), 'years', 1);
}

const isOlder = (questionRef: string, age: number, allowEqual?: boolean) => {
    return expWithArgs(
        allowEqual ? 'gte' : 'gt',
        getAgeInYearsExpression(questionRef),
        age,
    )
}

const isYounger = (questionRef: string, age: number, allowEqual?: boolean) => {
    return expWithArgs(
        allowEqual ? 'lte' : 'lt',
        getAgeInYearsExpression(questionRef),
        age,
    )
}

const isBetweenAges = (questionRef: string, minAge: number, maxAge: number, allowEqual?: boolean): Expression => {
    return expWithArgs(
        'and',
        expWithArgs(
            allowEqual ? 'gte' : 'gt',
            getAgeInYearsExpression(questionRef),
            minAge,
        ),
        expWithArgs(
            allowEqual ? 'lte' : 'lt',
            getAgeInYearsExpression(questionRef),
            maxAge,
        )
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

const assignT3 = () => assignSurveyFromStudyStart(surveyKeys.T3, "prio", 90, 42);
const assignT6 = () => assignSurveyFromStudyStart(surveyKeys.T6, "prio", 180, 42);
const assignT9 = () => assignSurveyFromStudyStart(surveyKeys.T9, "prio", 270, 42);
const assignT12 = () => assignSurveyFromStudyStart(surveyKeys.T12, "prio", 360, 42);

const assignT3c = () => assignSurveyFromStudyStart(surveyKeys.T3c, "prio", 90, 42);
const assignT6c = () => assignSurveyFromStudyStart(surveyKeys.T6c, "prio", 180, 42);
const assignT9c = () => assignSurveyFromStudyStart(surveyKeys.T9c, "prio", 270, 42);
const assignT12c = () => assignSurveyFromStudyStart(surveyKeys.T12c, "prio", 360, 42);

export const AgeCategoryFlagName = {
    younger8: '<8',
    younger11: '<11',
    between8and12: '8-12',
    older12: '12<',
    older15: '15<',
}

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
    const childVersionChecks = {
        hasReportedSymptoms: () => StudyExpressions.multipleChoiceOnlyOtherKeysSelected(
            'T0.C.SYM.Q1', 'geen'
        ),
        hasLongTermProblemsDueCorona: () => StudyExpressions.singleChoiceOptionsSelected(
            "T0.C.TEST.Q11", "ja"
        ),
        isTestResultUnknown: () => StudyExpressions.singleChoiceOptionsSelected(
            "T0.C.TEST.Q5", "unknown"
        )
    }
    const shouldGetAdultShortSurvey = () => expWithArgs(
        'and',
        adultVersionChecks.hasReportedSymptoms(),
        expWithArgs('not', adultVersionChecks.hasLongTermProblemsDueCorona()),
    )

    const shouldGetChildShortSurvey = () => expWithArgs(
        'and',
        childVersionChecks.hasReportedSymptoms(),
        expWithArgs('not', childVersionChecks.hasLongTermProblemsDueCorona()),
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
                    years: -18,
                })
            )
        );

    const isInterestedInAdditionalResearch = () => StudyExpressions.singleChoiceOptionsSelected(
        "T0.A.DEM.Q20", "ja"
    )

    // Expressions for age categories:
    const ageQuestionKey = 'T0.CAT.Q2';
    const handleAgeCategories = StudyActions.do(
        StudyActions.if(
            isYounger(ageQuestionKey, 8),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.younger8, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.younger8, "false"),
        ),
        StudyActions.if(
            isYounger(ageQuestionKey, 11),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.younger11, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.younger11, "false"),
        ),
        StudyActions.if(
            isBetweenAges(ageQuestionKey, 8, 12, true),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.between8and12, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.between8and12, "false"),
        ),
        StudyActions.if(
            isOlder(ageQuestionKey, 13, true),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older12, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older12, "false"),
        ),
        StudyActions.if(
            isOlder(ageQuestionKey, 15),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older15, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older15, "false"),
        ),
    )

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T0),
        [
            StudyActions.removeAllSurveys(),
            StudyActions.if(
                isInterestedInAdditionalResearch(),
                StudyActions.updateParticipantFlag("additionalStudies", "ja")
            ),
            StudyActions.if(
                StudyExpressions.or(
                    adultVersionChecks.isTestResultUnknown(),
                    childVersionChecks.isTestResultUnknown()
                ),
                StudyActions.updateParticipantFlag("testResult", "unknown")
            ),
            StudyActions.if(
                StudyExpressions.or(
                    adultVersionChecks.hasReportedSymptoms(),
                    childVersionChecks.hasReportedSymptoms(),
                ),
                // if true:
                StudyActions.updateParticipantFlag('acute_symptoms_T0', 'yes'),
                // else:
                StudyActions.updateParticipantFlag('acute_symptoms_T0', 'no'),
            ),
            StudyActions.if(
                isChildParticipant(),
                // Logic for child participants:
                StudyActions.do(
                    handleAgeCategories,
                    StudyActions.updateParticipantFlag("surveyCategory", "C"),
                    StudyActions.if(
                        shouldGetChildShortSurvey(),
                        // if yes:
                        assignShortC(),
                        // else:
                        assignT3c(),
                    )
                ),
                // else: (adult participants)
                StudyActions.do(
                    StudyActions.updateParticipantFlag("surveyCategory", "A"),
                    StudyActions.ifThen(
                        shouldGetAdultShortSurvey(),
                        [assignShort()]
                    ),
                    StudyActions.ifThen(
                        shouldGetAdultT3Survey(),
                        [assignT3(),]
                    )
                )
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


const handleShortCSubmission = (): Expression => {
    const isStudyInitialPhase = () => expWithArgs('lt',
        StudyExpressions.timestampWithOffset({ days: -83 }),
        StudyExpressions.getStudyEntryTime(),
    )

    const hasReportedSymptoms = () => StudyExpressions.multipleChoiceOnlyOtherKeysSelected(
        surveyKeys.shortC + '.SYM.Q1', 'geen'
    )

    const hasTestResultAlready = () => StudyExpressions.singleChoiceOptionsSelected(
        surveyKeys.shortC + 'TEST.Q5followup', 'pos', 'neg'
    );

    const shouldAssignShortAgain = () => expWithArgs(
        'and',
        hasReportedSymptoms(),
        isStudyInitialPhase(),
    );

    const performActions = () => [
        StudyActions.removeAllSurveys(),
        StudyActions.if(
            shouldAssignShortAgain(),
            // if true:
            assignShortC(),
            // else:
            assignT3()
        ),
        StudyActions.ifThen(
            hasTestResultAlready(),
            [
                StudyActions.updateParticipantFlag('testResult', 'known')
            ]
        )
    ]

    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.shortC),
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
        handleShortCSubmission(),
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

    const handleShortCExpired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.shortC),
            [
                StudyActions.removeAllSurveys(),
                assignT3c(),
            ]
        )
    };

    const handleT3cExpired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T3c),
            [
                StudyActions.removeAllSurveys(),
                assignT6c(),
            ]
        )
    };

    const handleT6cExpired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T6c),
            [
                StudyActions.removeAllSurveys(),
                assignT9c(),
            ]
        )
    };

    const handleT9cExpired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T9c),
            [
                StudyActions.removeAllSurveys(),
                assignT12c(),
            ]
        )
    };

    const handleT12cExpired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T12c),
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
            handleShortCExpired(),
            handleT3cExpired(),
            handleT6cExpired(),
            handleT9cExpired(),
            handleT12cExpired(),
        ]
    )
}


export const studyRules = [
    handleStudyEntryEvent(),
    handleSubmissionEvent(),
    handleTimerEvent(),
]
