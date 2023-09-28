import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validationUtils from "../../utilities/validations.jsx";
import { registerUser } from "../../api/apiUser.jsx";

const RegisterForm = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { userName, email, password };

    if (!validationUtils.validateEmail(email)) {
      setMessage("Please provide a valid e-mail address");
      return;
    }
    if (!validationUtils.validatePassword(password)) {
      setMessage(
        "A password must be at least 8 characters long and contain upper case and lower case letters as well as a digit and a special character!"
      );
      return;
    }
    if (!validationUtils.validateUserName(userName)) {
      setMessage("A username must consist of at least 3 characters!");
      return;
    }

    try {
      const response = await registerUser(newUser);
      setMessage(`${response.data.message}`)
      if (response.ok) {
        setMessage("Successfully registered!");
        setUsername("");
        setEmail("");
        setPassword("");
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        navigate("/theragotchiPage");
      } else {
        if (response.status == 409) {
          if (response.message === "E-mail taken") {
            setMessage("E-mail taken!");
          } else if (response.message === "Username taken") {
            setMessage("Username taken!");
          }
        } else if (response.status == 400) {
          if (response.message === "E-mail invalid") {
            setMessage("E-mail invalid!");
          } else if (response.message === "Password invalid") {
            setMessage("Password invalid! It needs to have at least 8 characters and include one special" +
              "character, one upper case letter, one lower case letter and a number!");
          }
        }
            
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Hello!</h2>
        <p>Register here...</p>
        <div>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUsername(event.target.value)}
            required
            placeholder="Your Name"
          />
        </div>
        <div>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Set a Password"
          />
        </div>
        {message && <div>{message}</div>}
        <a>
          <button type="submit">Register</button>
        </a>
      </form>
    </div>
  );
};

export default RegisterForm;
