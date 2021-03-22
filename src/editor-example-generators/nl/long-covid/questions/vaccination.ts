import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { CommonExpressions } from "../../../../editor-engine/utils/commonExpressions";
import { QuestionGenerators } from "../../../../editor-engine/utils/question-type-generator";
import { GroupItemEditor } from "../../../../editor-engine/utils/survey-group-editor-helper";

export class VaccinationGroup extends GroupItemEditor {

	constructor(parentKey: string, keyOverride?: string) {
		const groupKey = keyOverride ? keyOverride : 'VAC';
		super(parentKey, groupKey);
		this.initQuestions();
	}

	initQuestions() {
		const C2q1 = q_C2q1_def(this.key, true);
		const condition_vaccine_received = CommonExpressions.singleChoiceOptionsSelected(C2q1.key, '1');

		this.addItem(C2q1);
		this.addItem(q_C2q2_def(this.key, true, condition_vaccine_received));
		this.addItem(q_C2q3_def(this.key, true, condition_vaccine_received));

		//TODO: Add following questions
	}
}

const q_C2q1_def = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
	const itemKey = keyOverride ? keyOverride : 'C2q1';

	return QuestionGenerators.singleChoice({
		parentKey: parentKey,
		itemKey: itemKey,
		questionText: new Map([
			["nl", "Heb je een vaccinatie tegen het coronavirus gehad?"],
		]),
		responseOptions: [
			{
				key: '0', role: 'option',
				content: new Map([
					["nl", "Nee"],
				])
			},
			{
				key: '1', role: 'option',
				content: new Map([
					["nl", "Ja"],
				])
			},
			{
				key: '2', role: 'option',
				content: new Map([
					["nl", "Weet ik niet"],
				])
			},
		],
		isRequired: isRequired,
	});
}

const q_C2q2_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
	const itemKey = keyOverride ? keyOverride : 'C2q2';

	return QuestionGenerators.singleChoice({
		parentKey: parentKey,
		itemKey: itemKey,
		condition: condition,
		questionText: new Map([
			["nl", "Hoeveel vaccinaties tegen het coronavirus heb je gehad?"],
		]),
		responseOptions: [
			{
				key: '0', role: 'option',
				content: new Map([
					["nl", "1 vaccinatie"],
				])
			},
			{
				key: '1', role: 'option',
				content: new Map([
					["nl", "2 vaccinaties"],
				])
			},
		],
		isRequired: isRequired,
	});
}

const q_C2q3_def = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
	const itemKey = keyOverride ? keyOverride : 'C2q3';

	return QuestionGenerators.singleChoice({
		parentKey: parentKey,
		itemKey: itemKey,
		condition: condition,
		questionText: new Map([
			["nl", "Welk vaccin tegen het coronavirus heb je ontvangen?"],
		]),
		responseOptions: [
			{
				key: '0', role: 'option',
				content: new Map([
					["nl", "Onbekend"],
				])
			},
			{
				key: '1', role: 'option',
				content: new Map([
					["nl", "BioNTech / Pfizer (Comirnaty)"],
				])
			},
			{
				key: '2', role: 'option',
				content: new Map([
					["nl", "Moderna"],
				])
			},
			{
				key: '3', role: 'option',
				content: new Map([
					["nl", "Universiteit van Oxford / AstraZeneca"],
				])
			},
			{
				key: '4', role: 'option',
				content: new Map([
					["nl", "CureVac"],
				])
			},
			{
				key: '5', role: 'option',
				content: new Map([
					["nl", "Janssen / Johnson&Johnson"],
				])
			},
			{
				key: '6', role: 'option',
				content: new Map([
					["nl", "GSK / Sanofi Pasteur"],
				])
			},
			{
				key: '7', role: 'option',
				content: new Map([
					["nl", "Weet ik niet"],
				])
			},
		],
		isRequired: isRequired,
	});
}
