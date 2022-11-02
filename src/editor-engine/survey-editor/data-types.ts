import { SurveyItemTypes } from "survey-engine/data_types";


export interface NewItemProps {
    itemKey?: string; // partial or full key depending on context
    isGroup?: boolean;
    type?: SurveyItemTypes;
}

export interface NewComponentProps {
    key?: string;
    isGroup?: boolean;
    role?: string;
}

export interface SurveyProperties {

}
