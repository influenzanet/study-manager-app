import { cleanupVaccination } from "./cleanupVaccination";
import { enableVaccination, disableVaccination } from "./vaccinationFlags";
import { resetIntake } from "./resetIntake";
import { resetVaccination } from "./resetVaccination";
import { updateChildCustom } from "./updateChild";
import { assignHeatConsent } from "./assignHeatConsent";
import { reassignContactSurvey } from "./reassignContactSurvey";

import { assignContactsQuestionnaire_rules } from "../../external/contacts-survey/src/influenzanet-verdi-contact-extension/customRules/assignContactsQuestionnaire";

export const customRules = [
    resetIntake,
    resetVaccination,
    cleanupVaccination,
    updateChildCustom,
    enableVaccination,
    disableVaccination,
    assignContactsQuestionnaire_rules,
    assignHeatConsent,
    reassignContactSurvey
];