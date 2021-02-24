import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem } from 'survey-engine/lib/data_types';
import DatePicker, { registerLocale } from "react-datepicker";
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { getLocaleStringTextByCode } from '../../utils';
import { nl, nlBE, fr, de } from 'date-fns/locale';

import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.scss";

import { addYears, getUnixTime } from 'date-fns';

import YearMonthSelector from './YearMonthSelector';

export const dateLocales = [
  { code: 'nl', locale: nl, format: 'dd.MM.yyyy' },
  { code: 'nl-be', locale: nlBE, format: 'dd.MM.yyyy' },
  { code: 'fr-be', locale: fr, format: 'dd.MM.yyyy' },
  { code: 'de-be', locale: de, format: 'dd.MM.yyyy' },
];

dateLocales.forEach(loc => {
  registerLocale(loc.code, loc.locale);
});


interface DateInputProps {
  componentKey: string;
  compDef: ItemComponent;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
  disabled?: boolean;
  setOpen: boolean | undefined;
}

const DateInput: React.FC<DateInputProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [openOnce, setOpenOnce] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    props.prefill && props.prefill.value ? new Date(parseInt(props.prefill.value) * 1000) : undefined,
  );

  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleDateChange = (date: Date | undefined) => {
    setTouched(true);

    setPickerOpen(prev => !prev)
    setSelectedDate(date);
    if (!date) {
      setResponse(undefined);
      return;
    }

    setResponse(prev => {
      if (!date) { return undefined; }
      if (!prev) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          dtype: 'date',
          value: getUnixTime(date).toString(),
        }
      }
      return {
        ...prev,
        dtype: 'date',
        value: getUnixTime(date).toString(),
      }
    });
  }

  const minDate = props.compDef.properties?.min ? new Date((props.compDef.properties?.min as number) * 1000) : new Date(1900, 1);
  const maxDate = props.compDef.properties?.max ? new Date((props.compDef.properties?.max as number) * 1000) : addYears(new Date(), 100);


  let datepicker = <p>{'...'}</p>;
  switch (props.compDef.properties?.dateInputMode) {
    case 'YM':
      datepicker = <YearMonthSelector
        currentDate={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleDateChange}
        languageCode={props.languageCode}
      />
      break;
    case 'Y':
      datepicker = <YearMonthSelector
        currentDate={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
        onlyYear={true}
        onChange={handleDateChange}
        languageCode={props.languageCode}
      />
      break;
    default:
      datepicker = <label className="input-group flex-grow-1">
        <DatePicker
          id={props.componentKey}
          className="form-control border-0"
          selected={selectedDate}
          locale={props.languageCode}
          onChange={(date) => handleDateChange(date ? date as Date : undefined)}
          dateFormat={dateLocales.find(loc => loc.code === props.languageCode)?.format}
          placeholderText={getLocaleStringTextByCode(props.compDef.description, props.languageCode)}
          minDate={props.compDef.properties?.min ? new Date((props.compDef.properties?.min as number) * 1000) : undefined}
          maxDate={props.compDef.properties?.max ? new Date((props.compDef.properties?.max as number) * 1000) : undefined}
          // onCalendarClose={() => setPickerOpen(false)}
          onCalendarOpen={() => props.setOpen ? setOpenOnce(true) : undefined}
          // showYearPicker
          // wrapperClassName="bg-grey-2 border-radius-0"
          // calendarClassName="bg-grey-2"
          autoComplete="off"
          disabled={props.compDef.disabled !== undefined || props.disabled === true}
          popperPlacement="top"
          open={props.setOpen ? (openOnce ? undefined : true) : undefined}
        />
        <span
          aria-label="Calendar"
          className="d-none d-sm-inline bg-primary text-white border-0">
          <CalendarIcon fontSize="default" className="m-1" />
        </span>
      </label>
      break;
  }

  return (
    <div className="d-flex align-items-center">
      {props.compDef.content ?
        <label className="me-1">
          {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
        </label>
        : null}
      {datepicker}
    </div >
  );
};

export default DateInput;
