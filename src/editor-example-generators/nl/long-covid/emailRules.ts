import { StudyExpressions } from "../../../editor-engine/utils/commonExpressions"
import { expWithArgs } from "../../../editor-engine/utils/simple-generators"

const reminderCondition = (surveyKey: string, activeForDays: number) => {
    expWithArgs('and',
        StudyExpressions.hasSurveyKeyAssigned(surveyKey),
        expWithArgs('not',
            StudyExpressions.hasSurveyKeyValidFromOlderThan(surveyKey, {
                days: -activeForDays
            })
        )
    )
}

// in days
/*const reminderPeriods = {
    T0:  3,
    short: 2,
    T3:
}

//
const surveyActiveForMax = {
    T0:  3.5,
    short:  2.5,
}*/
