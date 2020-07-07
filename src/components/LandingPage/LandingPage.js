import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../styles/App.css";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  login() {
    this.props.auth.login();
  }
  logout() {
    this.props.auth.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container-fluid gradientBgColor minHeight">
        <div>
          <div className="headerWrapper">
            <div className="headerDescription">
              {isAuthenticated() && <Link to="/home">hallway</Link>}
              {!isAuthenticated() && <span>hallway</span>}
            </div>
            <div className="loginBtn">
              {!isAuthenticated() && (
                <button
                  id="qsLoginBtn"
                  bsstyle="primary"
                  className="btn-margin logoutBtn"
                  onClick={this.login.bind(this)}
                >
                  Log In
                </button>
              )}
              {isAuthenticated() && (
                <button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin logoutBtn"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

export default LandingPage;
