import { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import './style/DatePicker.css';
import CalendarIcon from './assets/CalendarIcon';

/**
 * Un composant `DatePicker` qui permet à l'utilisateur de sélectionner une date
 * à l'aide d'un calendrier popup.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.label - Le libellé affiché au-dessus du champ de sélection.
 * @param {Date} [props.selectedDate] - La date sélectionnée initiale (facultative).
 * @param {function(Date): void} props.onDateChange - Callback exécuté lorsqu'une nouvelle date est sélectionnée.
 *
 * @returns {JSX.Element} Le composant `DatePicker`.
 */
const DatePicker = ({ label, selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  /**
   * Ouvre ou ferme le calendrier popup.
   */
  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Gère la sélection d'une date dans le calendrier.
   *
   * @param {Date} date - La date sélectionnée par l'utilisateur.
   */
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