import { Survey, SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../../editor-engine/survey-editor/item-editor";
import { SurveyEditor } from "../../editor-engine/survey-editor/survey-editor";
import { generateLocStrings } from "../../editor-engine/utils/simple-generators";
import { VaccinationQuestions as CommonPoolVaccination } from "../common_question_pool/influenzanet-vaccination";

const vaccination = (): Survey | undefined => {
    const surveyKey = 'vaccination';

    const survey = new SurveyEditor();
    survey.changeItemKey('survey', surveyKey);

    // *******************************
    // Survey card
    // *******************************
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "Vaccination questionnaire"],
            ["it", "Questionario di vaccinazione"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "The purpose of the vaccination questionnaire is to find out more about protection given by the vaccine and monitor vaccination uptake in Italy."],
            ["it", "Lo scopo di questo questionario è di indagare la protezione fornita dal vaccino e di monitorare l'adesione al programma di vaccinazione in Italia."],
        ])
    ));
    survey.setSurveyDuration(generateLocStrings(
        new Map([
            ["en", "It takes approximately 2 minutes to complete this questionnaire."],
            ["it", "Ci vogliono circa 2 minuti per completare questo questionario."],
        ])
    ));

    // *******************************
    // Some rules if necessary
    // *******************************
    // max item per page
    // set prefill rules
    // set context rules

    // *******************************
    // Questions
    // *******************************
    const rootItemEditor = new ItemEditor(survey.findSurveyItem(surveyKey) as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());
    const rootKey = rootItemEditor.getItem().key;

    const Q_vacStart = CommonPoolVaccination.vacStart(rootKey, true);
    survey.addExistingSurveyItem(Q_vacStart, rootKey);

    // // -------> VACCINATION GROUP
    const hasVaccineGroup = CommonPoolVaccination.hasVacGroup(rootKey, Q_vacStart.key);
    survey.addExistingSurveyItem(hasVaccineGroup, rootKey);
    const hasVaccineGroupKey = hasVaccineGroup.key;

    const Q_vac = CommonPoolVaccination.vac(hasVaccineGroupKey, true);
    survey.addExistingSurveyItem(Q_vac, hasVaccineGroupKey);

    const Q_vaccineBrand = CommonPoolVaccination.vaccineBrand(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineBrand, hasVaccineGroupKey);

    const Q_vaccineShots = CommonPoolVaccination.vaccineShots(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineShots, hasVaccineGroupKey);

    const Q_dateFirstVaccine = CommonPoolVaccination.dateFirstVaccine(hasVaccineGroupKey, Q_vac.key, Q_vaccineShots.key, true);
    survey.addExistingSurveyItem(Q_dateFirstVaccine, hasVaccineGroupKey);

    const Q_dateSecondVaccine = CommonPoolVaccination.dateSecondVaccine(hasVaccineGroupKey, Q_vac.key, Q_vaccineShots.key, Q_dateFirstVaccine.key, true);
    survey.addExistingSurveyItem(Q_dateSecondVaccine, hasVaccineGroupKey);

    const Q_vaccinePro = CommonPoolVaccination.vaccinePro(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccinePro, hasVaccineGroupKey);

    const Q_vaccineContra = CommonPoolVaccination.vaccineContra(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_vaccineContra, hasVaccineGroupKey);

    const Q_sideEffects = CommonPoolVaccination.sideEffects(hasVaccineGroupKey, Q_vac.key, true);
    survey.addExistingSurveyItem(Q_sideEffects, hasVaccineGroupKey);

    return survey.getSurvey();
}

export default vaccination;
