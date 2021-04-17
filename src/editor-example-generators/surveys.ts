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
            { name: "T3", survey: LongCovidSurveys.T3 },
            { name: "T6", survey: LongCovidSurveys.T6 },
            { name: "T9", survey: LongCovidSurveys.T9 },
            { name: "T12", survey: LongCovidSurveys.T12 },
            { name: "shortC", survey: LongCovidSurveys.shortC },
            { name: "T3c", survey: LongCovidSurveys.T3c },
            { name: "T6c", survey: LongCovidSurveys.T6c },
            { name: "T9c", survey: LongCovidSurveys.T9c },
            { name: "T12c", survey: LongCovidSurveys.T12c },
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
