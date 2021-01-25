import React, { useEffect, useState } from 'react';
import { getYear, format, max, min, eachMonthOfInterval, startOfYear, getMonth, endOfYear } from 'date-fns';
import { dateLocales } from './DateInput';


interface YearMonthSelectorProps {
    currentDate?: Date;
    onChange: (date?: Date) => void;
    minDate: Date;
    maxDate: Date;
    onlyYear?: boolean;
    languageCode: string;
}


const YearMonthSelector: React.FC<YearMonthSelectorProps> = (props) => {
    const [selectedYear, setSelectedYear] = useState<number | undefined>(props.currentDate ? getYear(props.currentDate) : undefined);
    const [selectedMonth, setSelectedMonth] = useState<number | undefined>(props.currentDate ? getMonth(props.currentDate) : undefined);

    useEffect(() => {
        setSelectedYear(props.currentDate ? getYear(props.currentDate) : undefined);
        setSelectedMonth(props.currentDate ? getMonth(props.currentDate) : undefined);
    }, [props.currentDate]);

    useEffect(() => {
        if (!selectedYear) {
            props.onChange(undefined);
            return;
        }
        if (props.onlyYear) {
            props.onChange(new Date(selectedYear, 0, 2));
            return;
        }

        if (selectedMonth === undefined) {
            props.onChange(undefined);
            return;
        }
        props.onChange(new Date(selectedYear, selectedMonth, 2));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedYear, selectedMonth]);

    const years = new Array<number>();
    for (let i = getYear(props.minDate); i <= getYear(props.maxDate); i++) {
        years.push(i);
    }
    years.reverse();


    const referenceYear = selectedYear ? selectedYear : 2000;
    const months = eachMonthOfInterval({
        start: max([startOfYear(new Date(referenceYear, 0, 2)), props.minDate]),
        end: min([props.maxDate, endOfYear(new Date(referenceYear, 0, 2))]),
    }).map(m => {
        return {
            label: format(m, 'MMMM', { locale: dateLocales.find(l => l.code === props.languageCode)?.locale }),
            value: getMonth(m)
        }
    });

    const yearSelector = <select
        className="custom-select me-2 mb-2 mb-sm-0"
        value={selectedYear !== undefined ? selectedYear : 'NaN'}
        onChange={({ target: { value } }) => setSelectedYear(value && value !== '-1' ? parseInt(value) : undefined)}
    >
        <option value={'NaN'}></option>
        {years.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>

    const monthSelector = <select
        className="custom-select mb-2 mb-sm-0"
        value={selectedMonth !== undefined ? selectedMonth : 'NaN'}
        onChange={({ target: { value } }) => {
            console.log(value);
            if (value === 'NaN') {
                setSelectedYear(undefined);
                setSelectedMonth(undefined);
                return;
            }
            setSelectedMonth(parseInt(value));
        }}
    >
        <option value="NaN"></option>
        {
            months.map(option => (
                <option key={option.label} value={option.value}>
                    {option.label}
                </option>
            ))
        }
    </select>;

    return (
        <div
            className="d-flex flex-wrap p-0"
        >
            {yearSelector}
            { selectedYear && !props.onlyYear ?
                monthSelector : null}
        </div>
    );
};

export default YearMonthSelector;
