import { SurveyItemTypes } from "survey-engine/lib/data_types";


export interface NewItemProps {
    itemKey?: string; // partial or full key depending on context
    isGroup?: boolean;
    type?: SurveyItemTypes;
}

export interface SurveyProperties {

}