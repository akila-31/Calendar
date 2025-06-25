import React, { useState } from 'react';
import dayjs from 'dayjs';
import events from './events.json';
import CalendarHeader from './CalendarHeader';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const days = [];
  let day = startDate;

  while (day.isBefore(endDate, 'day') || day.isSame(endDate, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const renderEvents = (date) => {
    const todayEvents = events.filter(
      (e) => dayjs(e.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
    return todayEvents.map((e, idx) => (
      <div key={idx} className="event">
        {e.title}
      </div>
    ));
  };

  return (
    <div className="calendar-container">
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}

        {days.map((date, idx) => (
          <div
            key={idx}
            className={`day ${!date.isSame(currentDate, 'month') ? 'dimmed' : ''}`}
          >
            <div className="day-number">{date.date()}</div>
            {renderEvents(date)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
