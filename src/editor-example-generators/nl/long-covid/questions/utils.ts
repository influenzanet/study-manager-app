import { Validation } from "survey-engine/data_types"
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions"
import { responseGroupKey, multipleChoiceKey, singleChoiceKey } from "../../../../editor-engine/utils/key-definitions"
import { expWithArgs } from "../../../../editor-engine/utils/simple-generators"


export const checkIfOpenNumberFieldIsAnsweredForMC = (itemKey: string, forOptions: string[]): Validation => {
    return {
        key: 'checkIfOpenFieldIsAnswered',
        type: 'hard',
        rule: CommonExpressions.and(
            ...forOptions.map(optionKey => {
                return CommonExpressions.or(
                    // this option is not selected
                    CommonExpressions.multipleChoiceOnlyOtherKeysSelected(itemKey, optionKey),
                    // or if this is selected, the open field is answered with a number > 0
                    CommonExpressions.and(
                        CommonExpressions.multipleChoiceOptionsSelected(itemKey, optionKey),
                        CommonExpressions.gt(
                            CommonExpressions.getResponseValueAsNum(
                                itemKey,
                                [responseGroupKey, multipleChoiceKey, optionKey].join('.')
                            ),
                            0
                        )
                    )
                )
            })
        )
    }
}

export const checkIfOpenTextFieldIsAnsweredForMultipleChoice = (itemKey: string, forOptions: string[]): Validation => {
    return {
        key: 'checkIfOpenFieldIsAnswered',
        type: 'hard',
        rule: CommonExpressions.and(
            ...forOptions.map(optionKey => {
                return CommonExpressions.or(
                    // this option is not selected
                    CommonExpressions.multipleChoiceOnlyOtherKeysSelected(itemKey, optionKey),
                    // or if this is selected, the open field is answered with a non-empty string
                    CommonExpressions.and(
                        CommonExpressions.multipleChoiceOptionsSelected(itemKey, optionKey),
                        expWithArgs('checkResponseValueWithRegex', itemKey,
                            [responseGroupKey, multipleChoiceKey, optionKey].join('.'),
                            '^.+$'
                        ),
                    )
                )
            })
        )
    }
}

export const checkIfOpenTextFieldIsAnsweredForSingleChoice = (itemKey: string, forOptions: string[]): Validation => {
    return {
        key: 'checkIfOpenFieldIsAnswered',
        type: 'hard',
        rule: CommonExpressions.and(
            ...forOptions.map(optionKey => {
                return CommonExpressions.or(
                    // this option is not selected
                    CommonExpressions.singleChoiceOnlyOtherKeysSelected(itemKey, optionKey),
                    // or if this is selected, the open field is answered with a non-empty string
                    CommonExpressions.and(
                        CommonExpressions.singleChoiceOptionsSelected(itemKey, optionKey),
                        expWithArgs('checkResponseValueWithRegex', itemKey,
                            [responseGroupKey, singleChoiceKey, optionKey].join('.'),
                            '^.+$'
                        ),
                    )
                )
            })
        )
    }
}
