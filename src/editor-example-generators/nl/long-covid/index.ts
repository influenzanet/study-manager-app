import { generateT3 } from './surveys/T3';
import { generateT6 } from './surveys/T6';
import { generateT9 } from './surveys/T9';
import { generateT12 } from './surveys/T12';
import { generateT3c } from './surveys/T3c';
import { generateT6c } from './surveys/T6c';
import { generateT9c } from './surveys/T9c';
import { generateT12c } from './surveys/T12c';
import { generateShort } from './surveys/Tshort';
import { generateShortC } from './surveys/Tshortc';
import { generateT0 } from './surveys/T0';

export const LongCovidSurveys = {
    T0: generateT0(),
    short: generateShort(),
    shortC: generateShortC(),
    T3: generateT3(),
    T6: generateT6(),
    T9: generateT9(),
    T12: generateT12(),
    T3c: generateT3c(),
    T6c: generateT6c(),
    T9c: generateT9c(),
    T12c: generateT12c(),
}
