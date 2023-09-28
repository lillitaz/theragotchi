import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateUser } from '../../api/apiUser.jsx';
import { getTheragotchiByUserName } from '../../api/apiTheragotchi';

function UserCredentialsForm({ user }) {
  const [formData, setFormData] = useState({
    userName: user.userName,
    email: user.email,
    newPassword: '',
    oldPassword: '',
    theragotchiName: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const fetchTheragotchi = async () => {
        const theragotchiData = await getTheragotchiByUserName(user.userName);
        if (theragotchiData.status === 404) {
          setMessage(theragotchiData.message);
        } else {
          setMessage('');
          setFormData((prevData) => ({
            ...prevData,
            theragotchiName: theragotchiData.theragotchi.theragotchi.theragotchiName,
          }));
        }
      };

      fetchTheragotchi();
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUser(formData);
    setMessage(response);
    if (response === 'User successfully updated!') {
      localStorage.setItem('userName', formData.userName);
      localStorage.setItem('email', formData.email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={formData.userName}
          onChange={(e) => handleInputChange('userName', e.target.value)}
          disabled={formData.userName === 'admin'}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </div>
      <div>
        <label>Theragotchi Name:</label>
        <input
          type="text"
          value={
            user.theragotchiId == null
              ? "No Theragotchi available"
              : formData.theragotchiName
          }
          onChange={(e) => handleInputChange('theragotchiName', e.target.value)}
          disabled={user.theragotchiId == null}
        />
        </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          onChange={(e) => handleInputChange('newPassword', e.target.value)}
        />
      </div>
      <div>
        <label>Old Password:</label>
        <input
          type="password"
          onChange={(e) => handleInputChange('oldPassword', e.target.value)}
        />
      </div>
      {message && <div id="response-message">{message}</div>}
      <button type="submit" disabled={formData.oldPassword === ''}>
        Update Credentials
      </button>
    </form>
  );
}

UserCredentialsForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCredentialsForm;
