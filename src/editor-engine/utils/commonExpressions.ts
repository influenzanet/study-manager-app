import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions"
import { expWithArgs } from "./simple-generators"

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionSelectedAll = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAll', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

export const CommonExpressions = {
    singleChoiceOptionsSelected,
    multipleChoiceOptionsSelected,
    multipleChoiceOptionSelectedAll,
}