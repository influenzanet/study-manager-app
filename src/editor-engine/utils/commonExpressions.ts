import { Expression } from "survey-engine/lib/data_types"
import { Duration, durationObjectToSeconds } from "./duration"
import { datePickerKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "./key-definitions"
import { expWithArgs } from "./simple-generators"

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAny', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionSelectedAll = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasKeysAll', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasOnlyKeysOtherThan', itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const singleChoiceOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) => expWithArgs('responseHasOnlyKeysOtherThan', itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)

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

const or = (...args: any[]) => expWithArgs('or', ...args);
const and = (...args: any[]) => expWithArgs('and', ...args);
const not = (arg: Expression) => expWithArgs('not', arg);
const lt = (value: Expression | number, reference: Expression | number,) => expWithArgs('lt', value, reference);
const lte = (value: Expression | number, reference: Expression | number,) => expWithArgs('lte', value, reference);
const gt = (value: Expression | number, reference: Expression | number,) => expWithArgs('gt', value, reference);
const gte = (value: Expression | number, reference: Expression | number,) => expWithArgs('gte', value, reference);

export const CommonExpressions = {
    or,
    and,
    not,
    lt, gt, lte, gte,
    singleChoiceOptionsSelected,
    multipleChoiceOptionsSelected,
    multipleChoiceOptionSelectedAll,
    multipleChoiceOnlyOtherKeysSelected,
    singleChoiceOnlyOtherKeysSelected,
    getDatePickerResponseValue,
    timestampWithOffset,
    getResponseValueAsNum,
    getResponseValueAsStr,
    hasParticipantFlag,
}

