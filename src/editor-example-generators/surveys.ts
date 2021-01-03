import getBelIntake from './belgium/inf-intake';
import getBelWeekly from './belgium/inf-weekly';
import getExampleIntake from './nl/inf-intake';
import getExampleWeekly from './nl/inf-weekly';
import getEQ5D from './nl/covid-long-term/intake';

const surveys = [
    { name: "EX intake", survey: getExampleIntake() },
    { name: "EX weekly", survey: getExampleWeekly() },
    { name: "EQ5D", survey: getEQ5D() },
    { name: "BEL intake", survey: getBelIntake() },
    { name: "BEL weekly", survey: getBelWeekly() },
];

export default surveys;