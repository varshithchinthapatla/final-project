import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>
          Explain Like Friend AI
        </h1>

        <p>
          Learn anything with simple AI
          explanations in multiple styles
          and languages.
        </p>

        <div className="landing-buttons">
          <Link
            to="/register"
            className="hero-btn"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="hero-btn secondary"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}