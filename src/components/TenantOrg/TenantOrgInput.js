import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import "../../styles/App.css";

import { QUERY_ORG, MUTATION_ORG_ADD } from "./TenantOrgQueries";

class TenantOrgInput extends React.Component {
  constructor() {
    super();
    this.state = {
      textboxValue: ""
    };
    this.handleTextboxValueChange = this.handleTextboxValueChange.bind(this);
    this.handleTextboxKeyPress = this.handleTextboxKeyPress.bind(this);
  }

  handleTextboxValueChange(e) {
    this.setState({
      textboxValue: e.target.value
    });
  }

  handleTextboxKeyPress(e, addOrg) {
    if (e.key === "Enter") {
      const newOrg = this.state.textboxValue;
      const userId = this.props.userId;
      addOrg({
        variables: {
          objects: [
            {
              name: newOrg,
              admin_id: userId
            }
          ]
        },
        update: (store, { data: { insert_orgs } }) => {
          const query = QUERY_ORG;
          try {
            const data = store.readQuery({
              query: query,
              variables: { userId: this.props.userId }
            });
            const insertedOrg = insert_orgs.returning;
            data.orgs.splice(0, 0, insertedOrg[0]);
            store.writeQuery({
              query: query,
              variables: {
                userId: this.props.userId
              },
              data
            });
          } catch (e) {
            console.error(e);
          }
          this.setState({
            textboxValue: ""
          });
        }
      });
    }
  }

  render() {
    return (
      <Mutation mutation={MUTATION_ORG_ADD}>
        {(addOrg, { error }) => {
          if (error) {
            alert("Something went wrong");
          }
          return (
            <div className="formInput">
              <input
                className="input"
                placeholder="ORG NAME?"
                value={this.state.textboxValue}
                onChange={this.handleTextboxValueChange}
                onKeyPress={e => {
                  this.handleTextboxKeyPress(e, addOrg);
                }}
              />
              {/*
                            <input
                className="input"
                placeholder="ORG DESCRIPTION?"
                value={this.state.textboxValue}
                onChange={this.handleTextboxValueChange}
                onKeyPress={e => {
                  this.handleTextboxKeyPress(e, addOrg);
                }}
              />
               */}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

TenantOrgInput.propTypes = {
  userId: PropTypes.string
};

export default TenantOrgInput;
