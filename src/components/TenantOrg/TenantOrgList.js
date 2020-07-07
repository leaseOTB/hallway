import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TenantOrgItem from "./TenantOrgItem";
import TenantOrgFilters from "./TenantOrgFilters";

import {
  SUBSCRIPTION_ORG_LIST,
  QUERY_ORG,
  QUERY_FEED_ORG
} from "./TenantOrgQueries";

class TenantOrgList extends Component {
  constructor() {
    super();
    this.state = {
      filter: "all",
      dataLength: 0,
      showNew: false,
      showOlder: true,
      newOrgLength: 0,
      limit: 5,
      orgs: []
    };
    this.deleteOrgClicked = this.deleteOrgClicked.bind(this);
    this.loadMoreClicked = this.loadMoreClicked.bind(this);
    this.loadOlderClicked = this.loadOlderClicked.bind(this);
    this.filterResults = this.filterResults.bind(this);
  }
  componentDidMount() {
    const { client } = this.props;
    const _this = this;
    // query for public todos
    client
      .query({
        query: QUERY_ORG,
        variables: { orgLimit: this.state.limit }
      })
      .then(data => {
        this.setState({ orgs: data.data.orgs });
        const latestOrgId = data.data.orgs.length ? data.data.orgs[0].id : null;
        // start a subscription
        client
          .subscribe({
            query: SUBSCRIPTION_ORG_LIST,
            variables: { todoId: latestOrgId } // update subscription when todoId changes
          })
          .subscribe({
            next(data) {
              if (data.data.orgs.length) {
                _this.setState({
                  showNew: true,
                  newOrgsLength:
                    _this.state.newOrgsLength + data.data.orgs.length
                });
              }
            },
            error(err) {
              console.error("err", err);
            }
          });
      });
  }
  filterResults(type) {
    this.setState({ filter: type });
  }
  loadMoreClicked() {
    const { client } = this.props;
    this.setState({ showNew: false, newOrgsLength: 0 });
    client
      .query({
        query: QUERY_FEED_ORG,
        variables: {
          todoId: this.state.orgs.length ? this.state.orgs[0].id : null
        }
      })
      .then(data => {
        if (data.data.orgs.length) {
          const mergedOrgs = data.data.orgs.concat(this.state.orgs);
          // update state with new todos
          this.setState({ orgs: mergedOrgs });
        }
      });
  }
  loadOlderClicked() {
    const { client } = this.props;
    client
      .query({
        query: QUERY_FEED_ORG,
        variables: {
          todoId: this.state.orgs.length
            ? this.state.orgs[this.state.orgs.length - 1].id
            : null
        }
      })
      .then(data => {
        if (data.data.orgs.length) {
          const mergedOrgs = this.state.orgs.concat(data.data.orgs);
          // update state with new todos
          this.setState({ orgs: mergedOrgs });
        } else {
          this.setState({ showOlder: false });
        }
      });
  }
  deleteOrgClicked(deletedOrg) {
    const finalOrgs = this.state.orgs.filter(t => {
      return t.id !== deletedOrg.id;
    });
    this.setState({ orgs: finalOrgs });
  }
  render() {
    const { userId } = this.props;

    /* apply client side filters for displaying todos
    let finalTodos = this.state.todos;
    if (this.state.filter === "active") {
      finalTodos = this.state.todos.filter(todo => todo.is_completed !== true);
    } else if (this.state.filter === "completed") {
      finalTodos = this.state.todos.filter(todo => todo.is_completed === true);
    }*/

    // show new todo feed logic
    let showNewOrgs = null;
    if (this.state.showNew && this.state.newOrgsLength) {
      showNewOrgs = (
        <div className={"loadMoreSection"} onClick={this.loadMoreClicked}>
          You have {this.state.newOrgsLength} new{" "}
          {this.state.newOrgsLength > 1 ? "orgs" : "org"}
        </div>
      );
    }

    // show old todo history logic
    let showOlderOrgs = (
      <div className={"loadMoreSection"} onClick={this.loadOlderClicked}>
        Load Older Orgs
      </div>
    );
    if (!this.state.showOlder && this.state.orgs.length) {
      showOlderOrgs = (
        <div className={"loadMoreSection"} onClick={this.loadOlderClicked}>
          No more orgs available
        </div>
      );
    }

    return (
      <Fragment>
        <div className="todoListwrapper">
          {showNewOrgs}
          <ul>
            {this.state.orgs.map((todo, index) => {
              return (
                <TenantOrgItem
                  key={index}
                  index={index}
                  todo={todo}
                  userId={userId}
                  client={this.props.client}
                  deleteOrgClicked={this.deleteOrgClicked}
                />
              );
            })}
          </ul>
          {showOlderOrgs}
        </div>
        {/* 
                <TenantOrgFilters
          todos={this.state.orgs}
          userId={userId}
          currentFilter={this.state.filter}
          filterResults={this.filterResults}
        />
        
        */}
      </Fragment>
    );
  }
}

TenantOrgList.propTypes = {
  userId: PropTypes.string,
  client: PropTypes.object
};

export default TenantOrgList;
