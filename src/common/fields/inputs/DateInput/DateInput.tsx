import React from 'react';
import styles from '../input/Input.module.scss';
import calendarSvg from '@static/images/calendar.svg';
import { Input } from '../input/Input';
import { Calendar } from '@common/fields/DatePick';
import { useOnCLickOutside } from './useOnClickOutside';
import { DateContext } from './DateInputContext';

interface DateInputProps extends Omit<InputProps, 'value'> {
  value: string;
}

export interface DateContextProps {
  dateInputValue: string;
}

// отформатированная дата
export const formatDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const parts = formatter.formatToParts(date);
  const day = parts.find(part => part.type === 'day')?.value ?? '';
  const month = parts.find(part => part.type === 'month')?.value ?? '';
  const year = parts.find(part => part.type === 'year')?.value ?? '';

  return `${day}.${month}.${year}`;
};;

export const DateInput: React.FC<DateInputProps> = ({
  isError = false,
  helperText,
  type,
  mask,
  label,
  ...props
}) => {
  const { setDateInputValue } = React.useContext(DateContext);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = React.useState(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const handleDateClick = (date: Date) => {
    setDateInputValue(formatDate(date));
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  useOnCLickOutside(calendarRef, () => {
    setShowCalendar(false);
  });

  return (
    <div className={styles.dateInput} ref={calendarRef}>
      <label className={styles.dateInput_label}></label>
      <Input
        className={`${styles.input}`}
        label={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newDate = new Date(e.target.value);
          setSelectedDate(newDate);
          setDateInputValue(newDate.toDateString());
        }}
        type={type}
        mask={mask}
        isError={isError}
        helperText={helperText}
        {...props}
      />

      <img
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
        className={styles.calendarSvg}
        src={calendarSvg}
        alt="icon calendar"
      />
      {showCalendar && (
        <Calendar onChange={handleDateClick} value={selectedDate} onClose={handleCalendarClose} />
      )}
    </div>
  );
};
