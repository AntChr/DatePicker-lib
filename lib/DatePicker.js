import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import './styles/DatePicker.css';
import CalendarIcon from './styles/CalendarIcon';

const DatePicker = ({ label, selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateClick = date => {
    const newDate = new Date(date);
    onDateChange(newDate);
    setCurrentDate(newDate);
    setIsOpen(false);
  };

  return (
    <div className="date-picker-container">
      <label>{label}</label>
      <div className="date-picker-input-container">
        <input
          type="text"
          value={currentDate.toLocaleDateString()}
          onClick={toggleCalendar}
          readOnly
        />
        <span className="calendar-icon" onClick={toggleCalendar}>
          <CalendarIcon />
        </span>
        {isOpen && (
          <div className="calendar-popup">
            <Calendar
              currentDate={currentDate}
              onDateClick={handleDateClick}
              onClose={() => setIsOpen(false)}
              headerBackgroundColor="#0f659e"
            />
          </div>
        )}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired
};

export default DatePicker;