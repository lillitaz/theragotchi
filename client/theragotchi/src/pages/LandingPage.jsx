import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <main className="landing-container">
            <p>
                Already have an account? <Link to="/login">Login</Link> to get started.
            </p>
            <p>
                Never been here before? <Link to="/register">Register</Link> a new account to get started.
            </p>
        </main>
    );
}