import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/apiUser.jsx";

const LogInForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({userName: '', password: ''});
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const loginResult = await loginUser(formData);
      if (loginResult.success) {
        localStorage.setItem('userName', formData.userName);
        localStorage.setItem('password', formData.password);
        setMessage("Login successful!");
        setTimeout(() => {
          setMessage("");
          navigate("/theragotchiPage");
          window.location.reload();
        }, 1000);
      } else {
        setMessage(loginResult.message);
      }
    };
    
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          id="username"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      {message && <div id="response-message">{message}</div>}
      <button type="submit">Login</button>
    </form>
    
  );
};

export default LogInForm;

