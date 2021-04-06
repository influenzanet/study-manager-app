import getBelIntake from './belgium/inf-intake';
import getBelWeekly from './belgium/inf-weekly';
import getExampleIntake from './nl/infectieradar/inf-intake';
import getExampleWeekly from './nl/infectieradar/inf-weekly';


import likertScales from './examples/likert-scales';
import { LongCovidSurveys } from './nl/long-covid';

const surveys = [
    {
        instance: 'ex.',
        surveys: [
            { name: 'likert', survey: likertScales() }
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
            { name: "3m", survey: LongCovidSurveys.m3 },
            { name: "6m", survey: LongCovidSurveys.m6 },
            { name: "9m", survey: LongCovidSurveys.m9 },
            { name: "12m", survey: LongCovidSurveys.m12 },
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
        ],
        languageCodes: [
            'nl-be',
            'fr-be',
            'de-be',
            'en',
        ]
    }
];

export default surveys;