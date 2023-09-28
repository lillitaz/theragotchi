import { useState } from 'react';
import { createTheragotchi } from '../../api/apiTheragotchi';
import { updateUser } from '../../api/apiUser';
import PropTypes from 'prop-types';

import './input.css';

export default function Input({questionCategory} ) {
    const [theragotchiName, setTheragotchiName] = useState('');

    const userId = localStorage.getItem('userId');
    const newTheragotchi = { userId, theragotchiName };

    const handleInputChange = (event) => {
        setTheragotchiName(event.target.value);
    };

    const handleInputSubmit = async (event) => {
        event.preventDefault();
        if (questionCategory == 1) {
            try {
                const response = await createTheragotchi(newTheragotchi);

                const theragotchiId = response.data.theragotchiId;
                if (response.ok) {
                    const updatedUser = { theragotchiId }
                    await updateUser(updatedUser);
                }
            } catch (error) {
                console.error("Error in creating Theragotchi", error);
            }
        }
        /*
        if (questionCategory == 2) {
            
        }

        if (questionCategory == 3) {
            
        }
        */
        window.location.reload(false);
    };

    return (
        <form onSubmit={handleInputSubmit} className="text-bubble__input-form">
            <input
                type="text"
                value={theragotchiName}
                required
                onChange={handleInputChange}
                placeholder="Write Here"
            />
            <button type="submit">Ok</button>
        </form>
    );
}

Input.propTypes = {
    questionCategory: PropTypes.number
  };