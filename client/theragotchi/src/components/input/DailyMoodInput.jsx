import './input.css';
import PropTypes from 'prop-types';
import { addMood } from '../../api/apiUser';

export default function DailyMoodInput({ onMoodSelected, userId }) {

    const handleInputSubmit = (selectedMood) => {
        onMoodSelected(true);
        addMood(selectedMood, userId);
    };

    return (
        <div className="mood-question-input">
            <p>Select your mood:</p>
            {[1, 2, 3, 4, 5].map((moodValue) => (
                <button
                    key={moodValue}
                    onClick={() => handleInputSubmit(moodValue)}
                >
                    {moodValue}
                </button>
            ))}
        </div>
    );
}


DailyMoodInput.propTypes = {
    onMoodSelected: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
  };