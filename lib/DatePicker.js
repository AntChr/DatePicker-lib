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

  return React.createElement(
    'div',
    { className: 'date-picker-container' },
    React.createElement(
      'label',
      null,
      label
    ),
    React.createElement(
      'div',
      { className: 'date-picker-input-container' },
      React.createElement('input', {
        type: 'text',
        value: currentDate.toLocaleDateString(),
        onClick: toggleCalendar,
        readOnly: true
      }),
      React.createElement(
        'span',
        { className: 'calendar-icon', onClick: toggleCalendar },
        React.createElement(CalendarIcon, null)
      ),
      isOpen && React.createElement(
        'div',
        { className: 'calendar-popup' },
        React.createElement(Calendar, {
          currentDate: currentDate,
          onDateClick: handleDateClick,
          onClose: () => setIsOpen(false),
          headerBackgroundColor: '#0f659e'
        })
      )
    )
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired
};

export default DatePicker;