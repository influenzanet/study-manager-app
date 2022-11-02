import { Expression } from "survey-engine/data_types"
import { durationObjectToSeconds } from "./duration"
import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions"
import { expWithArgs } from "./simple-generators"

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasOnlyKeysOtherThan', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)


/**
 * Control flow method to use an if-else like structure
 * @param condition expression, return value interpreted as boolean
 * @param actionIfTrue if condition evaluates to true, this action will be performed.
 * @param actionIfFalse optional, if defined and the condition returns false, this action will be performed.
 * @returns
 */
const IF = (condition: Expression, actionIfTrue: Expression, actionIfFalse?: Expression): Expression => expWithArgs('IF', condition, actionIfTrue, actionIfFalse)

/**
 * Perform a list of expressions / actions
 * @param args: list of expressions to be evaluated
 * @returns
 */
const DO = (...args: Expression[]): Expression => expWithArgs('DO', ...args)


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


const getResponseValueAsNum = (itemKey: string, responseKey: string): Expression => {
    return expWithArgs('getResponseValueAsNum', itemKey, responseKey);
}

const getResponseValueAsStr = (itemKey: string, responseKey: string): Expression => {
    return expWithArgs('getResponseValueAsStr', itemKey, responseKey);
}

const timestampWithOffset = (delta: Duration, reference?: number | Expression) => expWithArgs(
    'timestampWithOffset',
    durationObjectToSeconds(delta),
    reference ? reference : undefined
)

/**
 *
 * @param key look up this flag
 * @param value and for this value
 * @returns return true if key - value pair (with case sensitive matching for both key and value) is present. If any of the two is different, or participant flags is empty, it returns false.
 */
const hasParticipantFlag = (key: string, value: string) => expWithArgs('hasParticipantFlag', key, value);

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
 * If a survey is assigned with validFrom <= now and validUnil >= now
 * @param surveyKey which survey it should check for
 * @returns
 */
const hasSurveyKeyActive = (surveyKey: string) => {
    return expWithArgs(
        'and',
        expWithArgs('lte',
            getSurveyKeyAssignedFrom(surveyKey),
            timestampWithOffset({ seconds: 1 })
        ),
        expWithArgs('gte',
            getSurveyKeyAssignedUntil(surveyKey),
            timestampWithOffset({ seconds: -1 })
        ),
    )
}


/**
 * Method to run a check on previous responses of the participant.
 * @param condition expression that will be evaluated on each retrieved response
 * @param checkType - optional - 'all'/'any'/<number>: determines how to calculate the final value of the check. Default: 'all'. 'all' means, all the retrieved responses need to fulfil the condition, otherwise the methods returns false. 'any' means at least one retrieved response needs to fulfil the condtion. In both cases, if there were no responses retrieved, returns false. If a number is given here, it means, at least this many response need to fulfil the condition.
 * @param surveyKey - optional - filter for responses of this survey.
 * @param querySince - optional - retrieve responses that were submitted later than this timestamp. Expressions need to return a timestamp, or hard coded numbers can be used as well.
 * @param queryUntil - optional - retrieve responses that were submitted before this timestamp. Expressions need to return a timestamp, or hard coded numbers can be used as well.
 * @returns true/false
 */
const checkConditionForOldResponses = (
    condition: Expression,
    checkType?: number | 'all' | 'any',
    surveyKey?: string,
    querySince?: number | Expression,
    queryUntil?: number | Expression,
): Expression => expWithArgs('checkConditionForOldResponses', condition, checkType, surveyKey, querySince, queryUntil)

/**
 * Results of "T_ref = reference + delta" will be checked against "validUntil" of the assinged survey (if present). True T_ref < T_validUntil.
 * @param surveyKey which survey it should check for
 * @param delta delta time to the reference time (by default current time).
 * @param reference optional reference time. If undefined it will take the current time.
 * @returns
 */
const hasSurveyKeyValidUntilSoonerThan = (surveyKey: string, delta: Duration, reference?: number | Expression) => {
    return expWithArgs('gt',
        timestampWithOffset(delta, reference),
        getSurveyKeyAssignedUntil(surveyKey)
    );
}

const or = (...args: any[]) => expWithArgs('or', ...args);
const and = (...args: any[]) => expWithArgs('and', ...args);
const not = (arg: Expression) => expWithArgs('not', arg);

export const StudyActions = {
    if: IF,
    do: DO,
    ifThen,
    addNewSurvey,
    removeAllSurveys,
    updateParticipantFlag,
    stopParticipation,
    finishParticipation,
}

export const StudyExpressions = {
    or, and, not,
    checkEventType,
    checkSurveyResponseKey,
    getStudyEntryTime,
    hasSurveyKeyAssigned,
    getResponseValueAsNum,
    getResponseValueAsStr,
    checkConditionForOldResponses,
    singleChoiceOptionsSelected,
    multipleChoiceOptionsSelected,
    getSurveyKeyAssignedFrom,
    getSurveyKeyAssignedUntil,
    hasSurveyKeyValidFromOlderThan,
    hasSurveyKeyValidUntilSoonerThan,
    hasSurveyKeyActive,
    hasParticipantFlag,
    timestampWithOffset,
    multipleChoiceOnlyOtherKeysSelected,
}
