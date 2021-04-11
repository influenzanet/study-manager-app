import { generateT3 } from './T3';
import { generateT6 } from './T6';
import { generateT9 } from './T9';
import { generateT12 } from './T12';
import { generateShort } from './Tshort';
import { generateT0 } from './t0';

export const LongCovidSurveys = {
    T0: generateT0(),
    short: generateShort(),
    T3: generateT3(),
    T6: generateT6(),
    T9: generateT9(),
    T12: generateT12(),
}
