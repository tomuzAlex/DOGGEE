import React from 'react';
import CalendarUI from 'react-calendar';
import './Calendar.css';
import type { CalendarValue } from './index';
import styles from './Calendar.module.scss';
import isNull from 'lodash/isNull';

interface CalendarComponentProps {
  locale?: string;
  onActiveStartDateChange?: (props: any) => void;
  onChange: (date: Date) => void;
  value?: CalendarValue;
  onClose?: () => void;
  selectedDate?: Date | null;
}

const CalendarComponent: React.FC<CalendarComponentProps> = (props: CalendarComponentProps) => {
  const { locale, onChange } = props;
  const [activeDate, setActiveDate] = React.useState<Date | undefined>(new Date());

  const handleActiveStartDateChange = (props: any) => {
    if (props.action === 'prev2') return;
    isNull(props.activeDate) ? setActiveDate(undefined) : setActiveDate(props.activeDate);
  };

  const handleClickDay = (date: Date) => {
    onChange(date);
  };

  return (
    <>
      <div className={styles.calendar_wrapper}>
        <CalendarUI
          activeStartDate={activeDate}
          className={styles.calendar}
          locale={locale}
          onActiveStartDateChange={handleActiveStartDateChange}
          onClickDay={handleClickDay}
          tileClassName={styles.Calendar_DayTile}
          value={activeDate}
        />
      </div>
  
    </>
  );
};

export const Calendar = React.memo(CalendarComponent);
