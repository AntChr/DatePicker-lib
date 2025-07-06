import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/Calendar.css';

const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

/**
 * Un composant calendrier réutilisable qui affiche les jours d'un mois donné,
 * permet de naviguer entre les mois et les années, et permet de sélectionner une date.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Date} props.currentDate - La date initiale affichée dans le calendrier.
 * @param {function(Date): void} props.onDateClick - Callback exécuté lorsqu'un jour est cliqué.
 * @param {function(): void} props.onClose - Callback exécuté lorsqu'on ferme le calendrier.
 * @param {string} [props.headerBackgroundColor='#f0f0f0'] - Couleur d'arrière-plan de l'en-tête du calendrier.
 *
 * @returns {JSX.Element} Le composant `Calendar`.
 */
const Calendar = ({ currentDate, onDateClick, onClose, headerBackgroundColor }) => {
  const [displayDate, setDisplayDate] = useState(currentDate);

  const startOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);
  const endOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1960 + 1 }, (_, index) => currentYear - index);

  /**
   * Change le mois affiché.
   *
   * @param {number} offset - Décalage en mois (+1 pour suivant, -1 pour précédent).
   * @param {React.MouseEvent} e - L'événement de clic.
   */
  const changeMonth = (offset, e) => {
    e.preventDefault();
    const newDate = new Date(displayDate.setMonth(displayDate.getMonth() + offset));
    setDisplayDate(newDate);
  };

  /**
   * Modifie l'année affichée.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - L'événement de changement de la liste déroulante.
   */
  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value, 10);
    const newDate = new Date(displayDate.setFullYear(selectedYear));
    setDisplayDate(newDate);
  };

  /**
   * Génère la liste des jours à afficher dans la grille.
   *
   * @returns {Date[]} Tableau des dates à afficher.
   */
  const getDays = () => {
    const days = [];
    for (let i = 1 - startDay; i <= daysInMonth; i++) {
      const dayDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), i);
      days.push(dayDate);
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header" style={{ backgroundColor: headerBackgroundColor }}>
        <button className="calendar-header-months" onClick={(e) => changeMonth(-1, e)}>&lt;</button>
        <span style={{ color: 'white'}}>
          {displayDate.toLocaleDateString('fr-FR', { month: 'long' }).charAt(0).toUpperCase() +
          displayDate.toLocaleDateString('fr-FR', { month: 'long' }).slice(1)}
        </span>
        <select value={displayDate.getFullYear()} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button className="calendar-header-months" onClick={(e) => changeMonth(1, e)}>&gt;</button>
        <button type="button" onClick={onClose} className="close-button">✖</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {getDays().map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day.getMonth() === displayDate.getMonth() ? '' : 'disabled'}`}
            style={{ '--hover-background-color': headerBackgroundColor }}
            onClick={() => onDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  headerBackgroundColor: PropTypes.string,
};

Calendar.defaultProps = {
  headerBackgroundColor: '#f0f0f0',
};

export default Calendar;
