import './conditionsDisplay.css';
import PropTypes from 'prop-types';


const TheragotchiConditionDisplay = ({ name, value }) => {
    
    return (
        <div className='container'>
            <div className="condition-display-container">
                <p className="condition-name">{name}:</p>
                <p className="condition-value">{value}</p>
            </div>
        </div>
    );
};


TheragotchiConditionDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default TheragotchiConditionDisplay;
