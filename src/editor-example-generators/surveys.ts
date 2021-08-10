import getBelIntake from './belgium/inf-intake';
import getItalyIntake from './italy/inf-intake';
import getItalyWeekly from './italy/inf-weekly';
import getBelWeekly from './belgium/inf-weekly';
import getBelVaccination from './belgium/inf-vaccination';
import getExampleIntake from './nl/infectieradar/inf-intake';
import getExampleWeekly from './nl/infectieradar/inf-weekly';
import likertScales from './examples/likert-scales';
import { LongCovidSurveys } from './nl/long-covid';
import { RTRSurveys } from './rtr/bw21';
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
        instance: 'rtr',
        surveys: [
            { name: "EG 0829 PRE", survey: RTRSurveys.EG_0829_PRE() },
            { name: "EG 0829 POST", survey: RTRSurveys.EG_0829_POST() },
            { name: "EG 0912 PRE", survey: RTRSurveys.EG_0912_PRE() },
            { name: "EG 0912 POST", survey: RTRSurveys.EG_0912_POST() },
            { name: "KG 0829 PRE", survey: RTRSurveys.KG_0829_PRE() },
            { name: "KG 0829 POST", survey: RTRSurveys.KG_0829_POST() },
            { name: "KG 0912 PRE", survey: RTRSurveys.KG_0912_PRE() },
            { name: "KG 0912 POST", survey: RTRSurveys.KG_0912_POST() },
            { name: "PUB 0829 PRE", survey: RTRSurveys.PUB_0829_PRE() },
            { name: "PUB 0829 POST", survey: RTRSurveys.PUB_0829_POST() },
            { name: "PUB 0912 PRE", survey: RTRSurveys.PUB_0912_PRE() },
            { name: "PUB 0912 POST", survey: RTRSurveys.PUB_0912_POST() },
        ],
        languageCodes: [
            'de',
        ],
    },
    {
        instance: 'italy',
        surveys: [
            { name: "intake", survey: getItalyIntake() },
            { name: "weekly", survey: getItalyWeekly() },
        ],
        languageCodes: [
            'en',
            'it'
        ]
    }
];

export default surveys;
