import { Expression } from "survey-engine/data_types";
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
    T15: 'T15',
    T15c: 'T15c',
    T18: 'T18',
    T18c: 'T18c',
    T21: 'T21',
    T21c: 'T21c',
    T24: 'T24',
    T24c: 'T24c',
    Tstopcontinue: 'Tstopcontinue',
    Tstopcontinuec: 'Tstopcontinuec',
}

const timestampFromStudyStart = (daysDelta: number) => {
    return StudyExpressions.timestampWithOffset(
        {
            days: daysDelta
        },
        StudyExpressions.getStudyEntryTime(),
    );
}


const isOlder = (questionRef: string, age: number, allowEqual?: boolean) => {
    return expWithArgs(
        allowEqual ? 'lte' : 'lt',
        StudyExpressions.getResponseValueAsNum(questionRef, [responseGroupKey, datePickerKey].join('.')),
        StudyExpressions.timestampWithOffset({ years: -age }),
    )
}

const isYounger = (questionRef: string, age: number, allowEqual?: boolean) => {
    return expWithArgs(
        allowEqual ? 'gte' : 'gt',
        StudyExpressions.getResponseValueAsNum(questionRef, [responseGroupKey, datePickerKey].join('.')),
        StudyExpressions.timestampWithOffset({ years: -age }),
    )
}

const isBetweenAges = (questionRef: string, minAge: number, maxAge: number, allowEqual?: boolean): Expression => {
    return expWithArgs(
        'and',
        isYounger(questionRef, maxAge, allowEqual),
        isOlder(questionRef, minAge, allowEqual),
    );
}

const finishParticipation = (exitStatus: "finished" | "expired") => StudyActions.do(
    StudyActions.removeAllSurveys(),
    StudyActions.updateParticipantFlag("exitStatus", exitStatus)
)


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
const assignT15 = () => assignSurveyFromStudyStart(surveyKeys.T15, "prio", 450, 42);
const assignT18 = () => assignSurveyFromStudyStart(surveyKeys.T18, "prio", 540, 42);
const assignT21 = () => assignSurveyFromStudyStart(surveyKeys.T21, "prio", 630, 42);
const assignT24 = () => assignSurveyFromStudyStart(surveyKeys.T24, "prio", 720, 42);

const assignT3c = () => assignSurveyFromStudyStart(surveyKeys.T3c, "prio", 90, 42);
const assignT6c = () => assignSurveyFromStudyStart(surveyKeys.T6c, "prio", 180, 42);
const assignT9c = () => assignSurveyFromStudyStart(surveyKeys.T9c, "prio", 270, 42);
const assignT12c = () => assignSurveyFromStudyStart(surveyKeys.T12c, "prio", 360, 42);

//const assignT15c = () => assignSurveyFromStudyStart(surveyKeys.T15c, "prio", 450, 42);
//const assignT18c = () => assignSurveyFromStudyStart(surveyKeys.T18c, "prio", 540, 42);
//const assignT21c = () => assignSurveyFromStudyStart(surveyKeys.T21c, "prio", 630, 42);
//const assignT24c = () => assignSurveyFromStudyStart(surveyKeys.T24c, "prio", 720, 42);

export const AgeCategoryFlagName = {
    younger5: '<5',
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
        ),
        isStudent: () => StudyExpressions.singleChoiceOptionsSelected(
            "T0.A.DEM.Q15", "4"
        ),
        hasPaidJobAtInfection: () => StudyExpressions.singleChoiceOptionsSelected(
            "T0.A.DEM.Q14a", "ja"
        ),
        hasPaidJobAtT0: () => StudyExpressions.singleChoiceOptionsSelected(
            "T0.A.DEM.Q14", "1"
        ),
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
            isYounger(ageQuestionKey, 5),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.younger5, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.younger5, "false"),
        ),
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
        // TODO: check is this correct - changed it from 13 to 12? must be 13 or older
        StudyActions.if(
            isOlder(ageQuestionKey, 12, true),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older12, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older12, "false"),
        ),
        StudyActions.if(
            isOlder(ageQuestionKey, 15),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older15, "true"),
            StudyActions.updateParticipantFlag(AgeCategoryFlagName.older15, "false"),
        ),
    )

    const excludeYoungerThan5 = () => StudyActions.if(
        isYounger(ageQuestionKey, 5),
        StudyActions.do(
            StudyActions.removeAllSurveys(),
            StudyActions.finishParticipation()
        )
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
                adultVersionChecks.hasPaidJobAtT0(),
                StudyActions.updateParticipantFlag('paidJobAtT0', 'yes')
            ),
            StudyActions.if(
                adultVersionChecks.hasPaidJobAtInfection(),
                StudyActions.updateParticipantFlag('paidJobAtInfection', 'yes')
            ),
            StudyActions.if(
                adultVersionChecks.isStudent(),
                StudyActions.updateParticipantFlag('student', 'yes')
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
                    ),
                    excludeYoungerThan5(),
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
        surveyKeys.short + '.TEST.Q5followup', 'pos', 'neg'
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
        surveyKeys.shortC + '.TEST.Q5followup', 'pos', 'neg'
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
        surveyKeys.T3 + '.TEST.Q5followup', 'pos', 'neg'
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
            StudyActions.if(
                StudyExpressions.singleChoiceOptionsSelected('T12.DEM.extend_FU', 'ja'),
                // Then:
                assignT15(),
                // Else:
                finishParticipation("finished")
            )
        ]
    )
}

//const handleT12cSubmission = (): Expression => {
    //return StudyActions.ifThen(
        //StudyExpressions.checkSurveyResponseKey(surveyKeys.T12c),
        //[
            //StudyActions.removeAllSurveys(),
            //StudyActions.if(
                //StudyExpressions.singleChoiceOptionsSelected('T12c.GEN.extend_FU', 'ja'),
                // Then:
                //assignT15c(),
                // Else:
                //finishParticipation("finished")
            //)  
        //]
    //)
//}

//has to be checked in studyRules
const handleT12cSubmission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T12c),
        [
            StudyActions.removeAllSurveys(),
            finishParticipation("finished")
             
        ]
    )
}



const handleT15Submission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T15),
        [
            StudyActions.removeAllSurveys(),
            assignT18(),
        ]
    )
}

//const handleT15cSubmission = (): Expression => {
    //return StudyActions.ifThen(
        //StudyExpressions.checkSurveyResponseKey(surveyKeys.T15c),
        //[
           // StudyActions.removeAllSurveys(),
           // assignT18c(),
        //]
    //)
//}

const handleT18Submission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T18),
        [
            StudyActions.removeAllSurveys(),
            assignT21(),
        ]
    )
}

//const handleT18cSubmission = (): Expression => {
    //return StudyActions.ifThen(
        //StudyExpressions.checkSurveyResponseKey(surveyKeys.T18c),
        //[
        //    StudyActions.removeAllSurveys(),
        //    assignT21c(),
        //]
    //)
//}


const handleT21Submission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T21),
        [
            StudyActions.removeAllSurveys(),
            assignT24(),
        ]
    )
}

//const handleT21cSubmission = (): Expression => {
    //return StudyActions.ifThen(
    //    StudyExpressions.checkSurveyResponseKey(surveyKeys.T21c),
    //    [
    //        StudyActions.removeAllSurveys(),
    //        assignT24c(),
    //    ]
    //)
//}



const handleT24Submission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.T24),
        [
            finishParticipation("finished"),
        ]
    )
}

const handleTstopcontinueSubmission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.Tstopcontinue),
        [
            StudyActions.removeAllSurveys(),
            finishParticipation("finished"),
        ]
    )
}

const handleTstopcontinuecSubmission = (): Expression => {
    return StudyActions.ifThen(
        StudyExpressions.checkSurveyResponseKey(surveyKeys.Tstopcontinuec),
        [
            StudyActions.removeAllSurveys(),
            finishParticipation("finished"),
        ]
    )
}




//const handleT24cSubmission = (): Expression => {
//    return StudyActions.ifThen(
//        StudyExpressions.checkSurveyResponseKey(surveyKeys.T24c),
//        [
//            finishParticipation("finished"),
//        ]
//    )
//}


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
        handleT15Submission(),
        //handleT15cSubmission(),
        handleT18Submission(),
        //handleT18cSubmission(),
        handleT21Submission(),
        //handleT21cSubmission(),
        handleT24Submission(),
        //handleT24cSubmission(),
        handleTstopcontinueSubmission(),
        handleTstopcontinuecSubmission()
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
                finishParticipation("expired")
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
                finishParticipation("expired")
            ]
        )
    };

    const handleT15Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T15),
            [
                StudyActions.removeAllSurveys(),
                assignT18(),
            ]
        )

    };

    const handleT18Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T18),
            [
                StudyActions.removeAllSurveys(),
                assignT21(),
            ]
        )
    };

    const handleT21Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T21),
            [
                StudyActions.removeAllSurveys(),
                assignT24(),
            ]
        )
    };

    const handleT24Expired = (): Expression => {
        return StudyActions.ifThen(
            isSurveyExpired(surveyKeys.T24),
            [
                finishParticipation("expired")
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
               // assignT15c(),
            ]
        )
    };

    //const handleT15cExpired = (): Expression => {
       // return StudyActions.ifThen(
       //     isSurveyExpired(surveyKeys.T15c),
       //     [
       //         StudyActions.removeAllSurveys(),
       //         assignT18c(),
       //     ]
       // )
   // };

   // const handleT18cExpired = (): Expression => {
   //     return StudyActions.ifThen(
   //         isSurveyExpired(surveyKeys.T18c),
   //         [
   //             StudyActions.removeAllSurveys(),
   //             assignT21c(),
   //         ]
   //     )
   // };

    //const handleT21cExpired = (): Expression => {
    //    return StudyActions.ifThen(
    //        isSurveyExpired(surveyKeys.T21c),
    //        [
    //             StudyActions.removeAllSurveys(),
    //            assignT24c(),
    //        ]
    //    )
    // };

    //const handleT24cExpired = (): Expression => {
    //    return StudyActions.ifThen(
    //        isSurveyExpired(surveyKeys.T24c),
    //        [
   //             finishParticipation("expired")
   //         ]
   //     )
   // };

    return StudyActions.ifThen(
        StudyExpressions.checkEventType('TIMER'),
        [
            handleT0Expired(),
            handleShortExpired(),
            handleT3Expired(),
            handleT6Expired(),
            handleT9Expired(),
            handleT12Expired(),
            handleT15Expired(),
            handleT18Expired(),
            handleT21Expired(),
            handleT24Expired(),
            handleShortCExpired(),
            handleT3cExpired(),
            handleT6cExpired(),
            handleT9cExpired(),
            handleT12cExpired(),
            //handleT15cExpired(),
            //handleT18cExpired(),
            //handleT21cExpired(),
            //handleT24cExpired(),
        ]
    )
}


export const studyRules = [
    handleStudyEntryEvent(),
    handleSubmissionEvent(),
    handleTimerEvent(),
]
