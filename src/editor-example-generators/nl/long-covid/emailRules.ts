import { Expression } from "survey-engine/lib/data_types"
import { StudyExpressions } from "../../../editor-engine/utils/studyServiceExpressions"
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

/*
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
*/

/**
 * Check if we are in a specific interval since the survey is active
 * @param surveyKey
 * @param start the survey should be active already since that many days (at least)
 * @param end the survey should be active for less than (or equal) that days
 * @returns
 */
const surveyActiveInIntervalCondition = (surveyKey: string, start: number, end: number) => {
    return expWithArgs(
        'and',
        expWithArgs('lte',
            StudyExpressions.getSurveyKeyAssignedFrom(surveyKey),
            StudyExpressions.timestampWithOffset({ days: -start })
        ),
        expWithArgs('gte',
            StudyExpressions.getSurveyKeyAssignedFrom(surveyKey),
            StudyExpressions.timestampWithOffset({ days: -end })
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
        'Invite for Vaccinatierespons study IIV',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        StudyExpressions.hasParticipantFlag('invite-vaccinatierespons-study-IIV', '12-jan-22'),
        [
            { lang: 'nl', subject: 'TODO: email subject' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T0 invite',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T0, 0, 1.99),
        [
            { lang: 'nl', subject: 'De start vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (T0)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T0 reminder',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T0, 2, 3.99),
        [
            { lang: 'nl', subject: 'Reminder: de start vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (T0)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'SHORT invite',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.short, 0, 1.99),
        [
            { lang: 'nl', subject: 'De nieuwe update voor het LongCOVID-onderzoek staat voor je klaar' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'SHORT reminder',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.short, 2, 3.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe update voor het LongCOVID-onderzoek staat voor je klaar' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T3 invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T3, 0, 4.99),
        [
            { lang: 'nl', subject: 'De nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (3 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T3 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T3, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (3 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T6 invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T6, 0, 4.99),
        [
            { lang: 'nl', subject: 'De nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (6 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T6 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T6, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (6 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T9 invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T9, 0, 4.99),
        [
            { lang: 'nl', subject: 'De nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (9 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T9 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T9, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (9 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T12 invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T12, 0, 4.99),
        [
            { lang: 'nl', subject: 'De laatste vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (12 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T12 reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T12, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de laatste vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (12 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'SHORTc invite',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.shortC, 0, 1.99),
        [
            { lang: 'nl', subject: 'De nieuwe update voor het LongCOVID-onderzoek staat voor je klaar' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'SHORTc reminder',
        sendingTime,
        { days: 2 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.shortC, 2, 3.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe update voor het LongCOVID-onderzoek staat voor je klaar' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T3c invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T3c, 0, 4.99),
        [
            { lang: 'nl', subject: 'De nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (3 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T3c reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T3c, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (3 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T6c invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T6c, 0, 4.99),
        [
            { lang: 'nl', subject: 'De nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (6 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T6c reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T6c, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (6 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T9c invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T9c, 0, 4.99),
        [
            { lang: 'nl', subject: 'De nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (9 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T9c reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T9c, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de nieuwe vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (9 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T12c invite',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T12c, 0, 4.99),
        [
            { lang: 'nl', subject: 'De laatste vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (12 maanden)' }
        ],
    ),
    generateStudyReminderEmailConfig(
        studyKey,
        'T12c reminder',
        sendingTime,
        { days: 5 },
        defaultLanguage,
        surveyActiveInIntervalCondition(surveyKeys.T12c, 5, 14.99),
        [
            { lang: 'nl', subject: 'Reminder: de laatste vragenlijst voor het LongCOVID-onderzoek staat voor je klaar (12 maanden)' }
        ],
    ),
]
