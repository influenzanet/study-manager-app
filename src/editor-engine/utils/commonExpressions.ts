import { Expression } from "survey-engine/lib/data_types"
import { datePickerKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions"
import { expWithArgs } from "./simple-generators"

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionSelectedAll = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAll', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasOnlyKeysOtherThan', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

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

export const CommonExpressions = {
    singleChoiceOptionsSelected,
    multipleChoiceOptionsSelected,
    multipleChoiceOptionSelectedAll,
    multipleChoiceOptionOnlyOtherKeysSelected,
    getDatePickerResponseValue,
}


const ifThen = (condition: Expression, actions: Expression[]) => expWithArgs('IFTHEN', condition, ...actions)
const checkEventType = (equalsType: 'ENTER' | 'SUBMIT') => expWithArgs('checkEventType', equalsType)
const addNewSurvey = (
    surveyKey: string,
    category: 'prio' | 'normal' | 'optional',
    activeFrom?: number | Expression,
    activeUntil?: number | Expression) => expWithArgs('ADD_NEW_SURVEY', surveyKey, activeFrom !== undefined ? activeFrom : 0, activeUntil !== undefined ? activeUntil : 0, category)

const removeAllSurveys = () => expWithArgs('REMOVE_ALL_SURVEYS')
const updateParticipantFlag = (key: string, newValue: string) => expWithArgs('UPDATE_FLAG', key, newValue)

export const StudyExpressions = {
    ifThen,
    checkEventType,
    addNewSurvey,
    removeAllSurveys,
    updateParticipantFlag,
}
