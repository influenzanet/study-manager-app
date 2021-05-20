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

const hasParticipantFlag = (key: string, value: string) => expWithArgs('eq', expWithArgs('getAttribute', expWithArgs('getAttribute', expWithArgs('getContext'), 'participantFlags'), key), value);

export const CommonExpressions = {
    singleChoiceOptionsSelected,
    multipleChoiceOptionsSelected,
    multipleChoiceOptionSelectedAll,
    multipleChoiceOnlyOtherKeysSelected,
    getDatePickerResponseValue,
    timestampWithOffset,
    getResponseValueAsNum,
    getResponseValueAsStr,
    hasParticipantFlag,
}

