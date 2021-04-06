import { Expression } from "survey-engine/lib/data_types"
import { Duration, durationObjectToSeconds } from "./duration"
import { datePickerKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions"
import { expWithArgs } from "./simple-generators"

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionSelectedAll = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAll', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasOnlyKeysOtherThan', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

const getDatePickerResponseValue = (itemKey: string): Expression => {
    return {
        name: 'getAttribute',
        data: [
            { dtype: 'exp', exp: expWithArgs('getResponseItem', itemKey, [responseGroupKey, datePickerKey].join('.')) },
            { str: 'value', dtype: 'str' }
        ],
        returnType: 'int',
    }
}

const timestampWithOffset = (delta: Duration, reference?: number | Expression) => expWithArgs(
    'timestampWithOffset',
    durationObjectToSeconds(delta),
    reference ? reference : undefined
)

export const CommonExpressions = {
    singleChoiceOptionsSelected,
    multipleChoiceOptionsSelected,
    multipleChoiceOptionSelectedAll,
    multipleChoiceOnlyOtherKeysSelected,
    getDatePickerResponseValue,
    timestampWithOffset,
}


const ifThen = (condition: Expression, actions: Expression[]) => expWithArgs('IFTHEN', condition, ...actions)
const checkEventType = (equalsType: 'ENTER' | 'SUBMIT' | 'TIMER') => expWithArgs('checkEventType', equalsType)
const addNewSurvey = (
    surveyKey: string,
    category: 'prio' | 'normal' | 'optional',
    activeFrom?: number | Expression,
    activeUntil?: number | Expression) => expWithArgs('ADD_NEW_SURVEY', surveyKey, activeFrom !== undefined ? activeFrom : 0, activeUntil !== undefined ? activeUntil : 0, category)

const removeAllSurveys = () => expWithArgs('REMOVE_ALL_SURVEYS')
const updateParticipantFlag = (key: string, newValue: string) => expWithArgs('UPDATE_FLAG', key, newValue)

const stopParticipation = () => expWithArgs('UPDATE_STUDY_STATUS', 'inactive');
const finishParticipation = () => expWithArgs('UPDATE_STUDY_STATUS', 'finished');

const checkSurveyResponseKey = (surveyKey: string) => expWithArgs('checkSurveyResponseKey', surveyKey);
const getStudyEntryTime = () => expWithArgs('getStudyEntryTime');
const hasSurveyKeyAssigned = (surveyKey: string) => expWithArgs('hasSurveyKeyAssigned', surveyKey);
const getSurveyKeyAssignedFrom = (surveyKey: string) => expWithArgs('getSurveyKeyAssignedFrom', surveyKey);
const getSurveyKeyAssignedUntil = (surveyKey: string) => expWithArgs('getSurveyKeyAssignedUntil', surveyKey);

/**
 * Results of "T_ref = reference + delta" will be checked against "validFrom" of the assinged survey (if present). True T_ref > T_validFrom.
 * @param surveyKey which survey it should check for
 * @param delta delta time to the reference time (by default current time).
 * @param reference optional reference time. If undefined it will take the current time.
 * @returns
 */
const hasSurveyKeyValidFromOlderThan = (surveyKey: string, delta: Duration, reference?: number | Expression) => {
    return expWithArgs('lt',
        getSurveyKeyAssignedFrom(surveyKey),
        timestampWithOffset(delta, reference)
    );
}


/**
 * Results of "T_ref = reference + delta" will be checked against "validUntil" of the assinged survey (if present). True T_ref < T_validUntil.
 * @param surveyKey which survey it should check for
 * @param delta delta time to the reference time (by default current time).
 * @param reference optional reference time. If undefined it will take the current time.
 * @returns
 */
const hasSurveyKeyValidUntilSoonerThan = (surveyKey: string, delta: Duration, reference?: number | Expression) => {
    return expWithArgs('gt',
        getSurveyKeyAssignedUntil(surveyKey),
        timestampWithOffset(delta, reference)
    );
}

export const StudyActions = {
    ifThen,
    addNewSurvey,
    removeAllSurveys,
    updateParticipantFlag,
    stopParticipation,
    finishParticipation,
}

export const StudyExpressions = {
    checkEventType,
    checkSurveyResponseKey,
    getStudyEntryTime,
    hasSurveyKeyAssigned,
    singleChoiceOptionsSelected,
    multipleChoiceOptionsSelected,
    getSurveyKeyAssignedFrom,
    getSurveyKeyAssignedUntil,
    hasSurveyKeyValidFromOlderThan,
    hasSurveyKeyValidUntilSoonerThan,
    timestampWithOffset,
    multipleChoiceOnlyOtherKeysSelected,
}
