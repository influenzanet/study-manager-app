import { Expression } from "survey-engine/lib/data_types"
import { StudyExpressions } from "../../../editor-engine/utils/commonExpressions"
import { durationObjectToSeconds } from "../../../editor-engine/utils/duration"
import { expWithArgs } from "../../../editor-engine/utils/simple-generators"
import { surveyKeys } from "./studyRules"

const studyKey = 'longcovid';
const defaultLanguage = 'nl';
const sendingTime = {
    hour: 19,
    minute: 0
};
const headerOverrides = {
    from: '"LongCOVID" <noreply@rivm.nl>',
    sender: 'noreply@rivm.nl',
    replyTo: ['longcovid@rivm.nl'],
}

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


const generateStudyReminderEmailConfig = (
    studyKey: string,
    label: string,
    sendingTime: {
        hour: number;
        minute: number;
    },
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
        label: label,
        headerOverrides: headerOverrides,
        messageType: 'study-reminder',
        sendingTime,
        condition: { dtype: 'exp', exp: condition },
        period: Math.floor(durationObjectToSeconds(period)),
        defaultLanguage: defaultLanguage,
        translations: translations,
    }
}

export const emailConfigs = [
    generateStudyReminderEmailConfig(
        studyKey,
        'T0 reminder',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        reminderCondition(surveyKeys.T0, 3.8),
        [
            { lang: 'nl', subject: 'T0 survey is available' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'SHORT reminder',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        reminderCondition(surveyKeys.short, 3.8),
        [
            { lang: 'nl', subject: 'Short survey is available' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T3 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        reminderCondition(surveyKeys.T3, 14.8),
        [
            { lang: 'nl', subject: 'T3 survey is available' }
        ],
    ), generateStudyReminderEmailConfig(
        studyKey,
        'T6 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        reminderCondition(surveyKeys.T6, 14.8),
        [
            { lang: 'nl', subject: 'T6 survey is available' }
        ],
    ), generateStudyReminderEmailConfig(
        studyKey,
        'T9 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        reminderCondition(surveyKeys.T9, 14.8),
        [
            { lang: 'nl', subject: 'T9 survey is available' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T12 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        reminderCondition(surveyKeys.T12, 14.8),
        [
            { lang: 'nl', subject: 'T12 survey is available' }
        ],
    ),
]
