import { generateM3 } from './m3';
import { generateM6 } from './m6';
import { generateM9 } from './m9';
import { generateM12 } from './m12';
import { generateShort } from './short';
import { generateT0 } from './t0';

export const LongCovidSurveys = {
    T0: generateT0(),
    short: generateShort(),
    m3: generateM3(),
    m6: generateM6(),
    m9: generateM9(),
    m12: generateM12(),
}