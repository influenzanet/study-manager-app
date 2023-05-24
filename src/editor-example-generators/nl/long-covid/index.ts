import { generateT3 } from './surveys/T3';
import { generateT6 } from './surveys/T6';
import { generateT9 } from './surveys/T9';
import { generateT12 } from './surveys/T12';
import { generateT15 } from './surveys/T15';
import { generateT18 } from './surveys/T18';
import { generateT21 } from './surveys/T21';
import { generateT24 } from './surveys/T24';
import { generateT3c } from './surveys/T3c';
import { generateT6c } from './surveys/T6c';
import { generateT9c } from './surveys/T9c';
import { generateT12c } from './surveys/T12c';
import { generateT15c } from './surveys/T15c';
import { generateT18c } from './surveys/T18c';
import { generateT21c } from './surveys/T21c';
import { generateT24c } from './surveys/T24c';
import { generateShort } from './surveys/Tshort';
import { generateShortC } from './surveys/Tshortc';
import { generateT0 } from './surveys/T0';
import { generateTstopcontinue } from './surveys/Tstopcontinue';
import { generateTstopcontinuec } from './surveys/Tstopcontinuec';

export const LongCovidSurveys = {
    T0: generateT0(),
    short: generateShort(),
    shortC: generateShortC(),
    T3: generateT3(),
    T6: generateT6(),
    T9: generateT9(),
    T12: generateT12(),
    T15: generateT15(),
    T18: generateT18(),
    T21: generateT21(),
    T24: generateT24(),
    T3c: generateT3c(),
    T6c: generateT6c(),
    T9c: generateT9c(),
    T12c: generateT12c(),
    T15c: generateT15c(),
    T18c: generateT18c(),
    T21c: generateT21c(),
    T24c: generateT24c(),
    Tstopcontinue: generateTstopcontinue(),
    Tstopcontinuec: generateTstopcontinuec()
}
