import getBelIntake from './belgium/inf-intake';
import getBelWeekly from './belgium/inf-weekly';
import getBelVaccination from './belgium/inf-vaccination';

const surveys = [
    {
        instance: 'belgium',
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
    }
];

export default surveys;
