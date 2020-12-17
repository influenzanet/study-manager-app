import getBelIntake from './belgium/inf-intake';
import getBelWeekly from './belgium/inf-weekly';
import getExampleIntake from './nl/inf-intake';

const surveys = [
    { name: "EX intake", survey: getExampleIntake() },
    { name: "BEL intake", survey: getBelIntake() },
    { name: "BEL weekly", survey: getBelWeekly() },
];

export default surveys;