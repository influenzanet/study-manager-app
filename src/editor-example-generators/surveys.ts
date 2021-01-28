import getBelIntake from './belgium/inf-intake';
import getBelWeekly from './belgium/inf-weekly';
import getExampleIntake from './nl/infectieradar/inf-intake';
import getExampleWeekly from './nl/infectieradar/inf-weekly';
import getEQ5D from './nl/covid-long-term/intake';

import likertScales from './examples/likert-scales';

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
        instance: 'nl', surveys: [
            { name: "intake", survey: getExampleIntake() },
            { name: "weekly", survey: getExampleWeekly() },
            { name: "EQ5D", survey: getEQ5D() },
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
            'en-be',
        ]
    }
];

export default surveys;