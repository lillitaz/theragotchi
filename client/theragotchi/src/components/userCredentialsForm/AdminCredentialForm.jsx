import { useState } from 'react';
import PropTypes from 'prop-types';
import { updateUserByAdmin } from '../../api/apiUser.jsx'

function AdminCredentialsForm({ userData }) {
    const [formData, setFormData] = useState({
      userName: userData.userName,
      email: userData.email,
    });
  
    const [message, setMessage] = useState("");
  
    const handleInputChange = (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await updateUserByAdmin(userData, formData);
      setMessage(response);     
    };
  
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
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
        {message && <div id="response-message">{message}</div>}
        <button type="submit">
          Update Credentials
        </button>
      </form>
    );
  }
  
  AdminCredentialsForm.propTypes = {
    userData: PropTypes.obj,
    oldUsername: PropTypes.string,
    oldEmail: PropTypes.string,
    onSubmit: PropTypes.func,
  };
  
  export default AdminCredentialsForm;
  