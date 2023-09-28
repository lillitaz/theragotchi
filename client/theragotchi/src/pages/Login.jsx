import { Link } from "react-router-dom";
import LogInForm from '../components/loginForm/LogInForm';

export default function Login() {

    return (
        <main>
            <h1>Login</h1>
            <LogInForm></LogInForm>
            <p>No account? Create one <Link to="/register">here</Link></p>
        </main>
    );
}