import { Link, useNavigate } from "react-router-dom";

import { clearAuth } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    clearAuth();

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        Explain Like Friend AI
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/chat">Chat</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-user">
        <div className="user-pill">
          {user?.name}
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}