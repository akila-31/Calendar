import React from 'react';
import dayjs from 'dayjs';

const CalendarHeader = ({ currentDate, setCurrentDate }) => {
  const handlePrev = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNext = () => setCurrentDate(currentDate.add(1, 'month'));
  const handleToday = () => setCurrentDate(dayjs());

  return (
    <div className="calendar-header">
      <div className="left-controls">
        <select
          value={currentDate.month()}
          onChange={(e) => setCurrentDate(currentDate.month(Number(e.target.value)))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {dayjs().month(i).format('MMMM')}
            </option>
          ))}
        </select>
        <button onClick={handleToday}>Today</button>
        <button className="add-event">+ Add Event</button>
      </div>
      <div className="right-controls year-nav">
        <button onClick={handlePrev}>&lt;</button>
        <span className="year-display">{currentDate.year()}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default CalendarHeader;