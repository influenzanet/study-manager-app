import getBelIntake from './belgium/inf-intake';
import getBelWeekly from './belgium/inf-weekly';
import getExampleIntake from './nl/inf-intake';
import getExampleWeekly from './nl/inf-weekly';
import getEQ5D from './nl/covid-long-term/intake';

const surveys = [
    {
        instance: 'nl', surveys: [
            { name: "intake", survey: getExampleIntake() },
            { name: "weekly", survey: getExampleWeekly() },
            { name: "EQ5D", survey: getEQ5D() },
        ]
    },
    {
        instance: 'bel', surveys: [
            { name: "intake", survey: getBelIntake() },
            { name: "weekly", survey: getBelWeekly() },
        ]
    }
];

export default surveys;