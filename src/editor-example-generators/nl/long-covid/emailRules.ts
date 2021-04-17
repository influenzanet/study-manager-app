import { Expression } from "survey-engine/lib/data_types"
import { StudyExpressions } from "../../../editor-engine/utils/commonExpressions"
import { durationObjectToSeconds } from "../../../editor-engine/utils/duration"
import { expWithArgs } from "../../../editor-engine/utils/simple-generators"
import { surveyKeys } from "./studyRules"

const reminderCondition = (surveyKey: string, activeForDays: number) => {
    return expWithArgs('and',
        StudyExpressions.hasSurveyKeyActive(surveyKey),
        expWithArgs('not',
            StudyExpressions.hasSurveyKeyValidFromOlderThan(surveyKey, {
                days: -activeForDays
            })
        ),
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



const generateStudyReminderEmailConfig = (
    studyKey: string,
    label: string,
    firstTime: Date,
    period: Duration,
    defaultLanguage: string,
    condition: Expression,
    translations: Array<{
        lang: string,
        subject: string,
    }>
) => {
    return {
        sendTo: 'study-participants',
        studyKey: studyKey,
        messageType: 'study-reminder',
        condition: { dtype: 'exp', exp: condition },
        nextTime: Math.floor(firstTime.getTime() / 1000.0),
        period: Math.floor(durationObjectToSeconds(period)),
        defaultLaunguage: defaultLanguage,
        translations: translations,
    }
}

const studyKey = 'longcovid';
const defaultLanguage = 'nl';
const firstTime = new Date(2021, 4, 8, 12, 0, 0);

const emailConfigs = {
    T0Reminder: generateStudyReminderEmailConfig(
        studyKey,
        'T0 reminder',
        firstTime,
        { days: 1 },
        defaultLanguage,
        reminderCondition(surveyKeys.T0, 3.8),
        [
            { lang: 'nl', subject: 'Your first survey is available' }
        ],
    ),
    // TshortReminder: ...
}
