import getBelIntake from './belgium/inf-intake';
import getItalyIntake from './italy/inf-intake';
import getItalyWeekly from './italy/inf-weekly';
import getItalyVaccination from './italy/inf-vaccination';
import getBelWeekly from './belgium/inf-weekly';
import getBelVaccination from './belgium/inf-vaccination';
import getExampleIntake from './nl/infectieradar/inf-intake';
import getExampleWeekly from './nl/infectieradar/inf-weekly';


import likertScales from './examples/likert-scales';
import { LongCovidSurveys } from './nl/long-covid';
import { generateExampleSurvey } from './examples/survey-item';

const surveys = [
    {
        instance: 'ex.',
        surveys: [
            { name: 'example', survey: generateExampleSurvey() },
            { name: 'likert', survey: likertScales() },
        ],
        languageCodes: [
            'en',
        ]
    },
    {
        instance: 'nl-infectieradar', surveys: [
            { name: "intake", survey: getExampleIntake() },
            { name: "weekly", survey: getExampleWeekly() },
        ],
        languageCodes: [
            'nl',
            'en',
        ]
    },

    {
        instance: 'nl-long-covid', surveys: [
            { name: "T0", survey: LongCovidSurveys.T0 },
            { name: "short", survey: LongCovidSurveys.short },
            { name: "T3", survey: LongCovidSurveys.T3 },
            { name: "T6", survey: LongCovidSurveys.T6 },
            { name: "T9", survey: LongCovidSurveys.T9 },
            { name: "T12", survey: LongCovidSurveys.T12 },
            { name: "T15", survey: LongCovidSurveys.T15 },
            { name: "T18", survey: LongCovidSurveys.T18 },
            { name: "T21", survey: LongCovidSurveys.T21 },
            { name: "T24", survey: LongCovidSurveys.T24 },
            { name: "shortC", survey: LongCovidSurveys.shortC },
            { name: "T3c", survey: LongCovidSurveys.T3c },
            { name: "T6c", survey: LongCovidSurveys.T6c },
            { name: "T9c", survey: LongCovidSurveys.T9c },
            { name: "T12c", survey: LongCovidSurveys.T12c },
            // { name: "T15c", survey: LongCovidSurveys.T15c },
            // { name: "T18c", survey: LongCovidSurveys.T18c },
            // { name: "T21c", survey: LongCovidSurveys.T21c },
            // { name: "T24c", survey: LongCovidSurveys.T24c },
            { name: "Tstopcontinue", survey: LongCovidSurveys.Tstopcontinue },
            { name: "Tstopcontinuec", survey: LongCovidSurveys.Tstopcontinuec },
        ],
        languageCodes: [
            'nl',
            'en',
        ]
    },
    {
        instance: 'bel',
        surveys: [
            { name: "intake", survey: getBelIntake() },
            { name: "weekly", survey: getBelWeekly() },
            { name: "vaccination", survey: getBelVaccination() },
        ],
        languageCodes: [
            'nl-be',
            'fr-be',
            'de-be',
            'en',
        ]
    },
    {
        instance: 'italy',
        surveys: [
            { name: "intake", survey: getItalyIntake() },
            { name: "weekly", survey: getItalyWeekly() },
            { name: "vaccination", survey: getItalyVaccination() },
        ],
        languageCodes: [
            'en',
            'it'
        ]
    }
];

export default surveys;
