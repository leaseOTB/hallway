import React from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-wrapper";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="Nav">
      <div className="Nav-menus">
        <div className="Nav-brand">
          <Link className="Nav-brand-logo" to="/">
            hallway
          </Link>
        </div>
        {!isAuthenticated && (
          <>
            <button
              className="Nav-user-button button-no-style"
              onClick={() => loginWithRedirect({})}
            >Login</button>
          </>
        )}

        {isAuthenticated && (
          <>
            <button
              className="Nav-user-button button-no-style"
              onClick={() => logout({})}
            >Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;