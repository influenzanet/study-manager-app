import { SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class CovidTestGroup extends GroupItemEditor {

	constructor(parentKey: string, keyOverride?: string) {
		const groupKey = keyOverride ? keyOverride : 'CT';
		super(parentKey, groupKey);
		this.initQuestions();
	}

	initQuestions() {
		const L1q1 = q_L1q1_def(this.key, true);
		const condition_L1q1_yes = CommonExpressions.singleChoiceOptionsSelected(L1q1.key, '0');

		this.addItem(L1q1);
	}
}

const q_L1q1_def = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
	const itemKey = keyOverride ? keyOverride : 'L1q1';

	return QuestionGenerators.singleChoice({
		parentKey: parentKey,
		itemKey: itemKey,
		questionText: new Map([
			["nl", "Heb je afgelopen 10 dagen een test gedaan om het coronavirus aan te tonen?"],
		]),
		responseOptions: [
			{
				key: '0', role: 'option',
				content: new Map([
					["nl", "Ja"],
				])
			},
			{
				key: '1', role: 'option',
				content: new Map([
					["nl", "Nee"],
				])
			},
		],
		isRequired: isRequired,
	});
}
