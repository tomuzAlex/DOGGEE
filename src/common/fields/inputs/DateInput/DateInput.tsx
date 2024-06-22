import React from 'react';
import styles from '../input/Input.module.scss';
import calendarSvg from '@static/images/calendar.svg';
import { Input } from '../input/Input';
import { Calendar } from '@common/fields/DatePick';
import { useOnCLickOutside } from './useOnClickOutside';
// import { format} from 'date-fns';

interface DateInputProps extends Omit<InputProps, 'value'> {
  value: string;
  selectedDateValue?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  isError = false,
  helperText,
  type,
  mask,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  label,
  ...props
}) => {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  useOnCLickOutside(calendarRef, () => {
    setShowCalendar(false);
  });


  const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

  return (
    <div className={styles.dateInput} ref={calendarRef}>
      <label className={styles.dateInput_label}></label>
      <Input
        className={`${styles.input}`}
        label={label}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        type={type}
        mask={mask}
        isError={isError}
        helperText={helperText}
        value={formattedDate}
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
