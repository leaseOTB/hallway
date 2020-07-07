import React, { Component } from "react";
import TenantOrgList from "./TenantOrgList";
import TenantOrgInput from "./TenantOrgInput";
import "../../styles/App.css";

class TenantOrgWrapper extends Component {
  render() {
    // const userId = localStorage.getItem("auth0:id_token:sub");
    return (
      <div className="todoWrapper">
        <TenantOrgInput userId={this.props.userId} />
        <TenantOrgList userId={this.props.userId} client={this.props.client} />
      </div>
    );
  }
}

export default TenantOrgWrapper;
