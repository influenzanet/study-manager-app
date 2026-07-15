import getBelIntake from "./belgium/inf-intake";
import getBelWeekly from "./belgium/inf-weekly";
import getBelVaccination from "./belgium/inf-vaccination";
import { ContactsDef } from "./external/contacts-survey/src/influenzanet-verdi-contact-extension/surveys/Contacts";

import { en_BE } from "./external/contacts-survey/src/influenzanet-verdi-contact-extension/languages/en-be";
import { nl_BE } from "./external/contacts-survey/src/influenzanet-verdi-contact-extension/languages/nl-be";
import { de_BE } from "./external/contacts-survey/src/influenzanet-verdi-contact-extension/languages/de-be";
import { fr_BE } from "./external/contacts-survey/src/influenzanet-verdi-contact-extension/languages/fr-be";

import "./external/common-study-definition/build/studies/heatwave/languages/nl-be";
import "./external/common-study-definition/build/studies/heatwave/languages/fr-be";
import "./external/common-study-definition/build/studies/heatwave/languages/de-be";
// Belgium-specific English overrides (fixes the placeholder consent links so the
// English text points at the Belgian platform).
import "./belgium/heatwaveEnOverrides";

import {
    HeatwaveConsentSurvey,
    HeatwaveBackgroundSurvey,
    HeatwaveSymptomsSurvey,
} from "./external/common-study-definition/build/studies/heatwave/surveys";

// Heatwave surveys require a metadata map, mirroring the standalone heatwave build.
const heatMeta = new Map<string, string>();
heatMeta.set("timestamp", Date.now().toString(36));

const surveys = [
    {
        instance: "belgium",
        surveys: [
            { name: "intake", survey: getBelIntake() },
            { name: "weekly", survey: getBelWeekly() },
            { name: "vaccination", survey: getBelVaccination() },
            {
                name: "contacts",
                survey: new ContactsDef([en_BE, nl_BE, de_BE, fr_BE]).getSurvey(),
            },
            // Heatwave workflow: consent -> background -> weekly symptoms.
            { name: "heatconsent", survey: new HeatwaveConsentSurvey(heatMeta).getSurvey() },
            { name: "heatback", survey: new HeatwaveBackgroundSurvey(heatMeta).getSurvey() },
            { name: "heatsymptoms", survey: new HeatwaveSymptomsSurvey(heatMeta).getSurvey() },
        ],
        languageCodes: ["nl-be", "fr-be", "de-be", "en"],
    },
];

export default surveys;
