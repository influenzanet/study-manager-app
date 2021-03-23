import { datePickerKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions"
import { expWithArgs } from "./simple-generators"

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionSelectedAll = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAll', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasOnlyKeysOtherThan', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

const getDatePickerResponseValue = (itemKey: string) => {
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
