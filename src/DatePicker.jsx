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
  const handleDateClick = (date) => {
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
  onDateChange: PropTypes.func.isRequired,
};

export default DatePicker;
