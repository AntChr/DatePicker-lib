import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/Calendar.css';

const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const Calendar = ({ currentDate, onDateClick, onClose, headerBackgroundColor }) => {
  const [displayDate, setDisplayDate] = useState(currentDate);

  const startOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);
  const endOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1960 + 1 }, (_, index) => currentYear - index);

  const changeMonth = (offset, e) => {
    e.preventDefault();
    const newDate = new Date(displayDate.setMonth(displayDate.getMonth() + offset));
    setDisplayDate(newDate);
  };

  const handleYearChange = e => {
    const selectedYear = parseInt(e.target.value, 10);
    const newDate = new Date(displayDate.setFullYear(selectedYear));
    setDisplayDate(newDate);
  };

  const getDays = () => {
    const days = [];
    for (let i = 1 - startDay; i <= daysInMonth; i++) {
      const dayDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), i);
      days.push(dayDate);
    }
    return days;
  };

  return React.createElement(
    'div',
    { className: 'calendar' },
    React.createElement(
      'div',
      { className: 'calendar-header', style: { backgroundColor: headerBackgroundColor } },
      React.createElement(
        'button',
        { className: 'calendar-header-months', onClick: e => changeMonth(-1, e) },
        '<'
      ),
      React.createElement(
        'span',
        { style: { color: 'white' } },
        displayDate.toLocaleDateString('fr-FR', { month: 'long' }).charAt(0).toUpperCase() + displayDate.toLocaleDateString('fr-FR', { month: 'long' }).slice(1)
      ),
      React.createElement(
        'select',
        { value: displayDate.getFullYear(), onChange: handleYearChange },
        years.map(year => React.createElement(
          'option',
          { key: year, value: year },
          year
        ))
      ),
      React.createElement(
        'button',
        { className: 'calendar-header-months', onClick: e => changeMonth(1, e) },
        '>'
      ),
      React.createElement(
        'button',
        { type: 'button', onClick: onClose, className: 'close-button' },
        '\u2716'
      )
    ),
    React.createElement(
      'div',
      { className: 'calendar-grid' },
      daysOfWeek.map(day => React.createElement(
        'div',
        { key: day, className: 'calendar-day-header' },
        day
      )),
      getDays().map((day, index) => React.createElement(
        'div',
        {
          key: index,
          className: `calendar-day ${day.getMonth() === displayDate.getMonth() ? '' : 'disabled'}`,
          style: { '--hover-background-color': headerBackgroundColor },
          onClick: () => onDateClick(day)
        },
        day.getDate()
      ))
    )
  );
};

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  headerBackgroundColor: PropTypes.string
};

Calendar.defaultProps = {
  headerBackgroundColor: '#f0f0f0'
};

export default Calendar;