import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import "../../styles/App.css";

import {
  QUERY_ORG,
  MUTATION_ORG_UPDATE,
  MUTATION_ORG_DELETE
} from "./TenantOrgQueries";

const handleOrgDelete = (deleteOrg, org, userId, deleteOrgClicked) => {
  deleteOrg({
    variables: {
      orgId: org.id
    },
    update: (cache, { data: { update_org } }) => {
      // eslint-disable-line
      deleteOrgClicked(org);
    }
  });
};

const TenantOrgItem = ({ index, org, userId, deleteOrgClicked }) => (
  <Mutation mutation={MUTATION_ORG_UPDATE}>
    {updateOrg => {
      return (
        <Mutation mutation={MUTATION_ORG_DELETE}>
          {deleteOrg => {
            return (
              <li>
                <div className="userInfoPublic" title={org.user.name}>
                  {org.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="view">
                  <div className="round">{org.name}</div>
                </div>
                <div className="labelContent">{org.description}</div>
                <button
                  className="closeBtn"
                  data-test={"remove_" + index + "_" + org.description}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOrgDelete(deleteOrg, org, userId, deleteOrgClicked);
                  }}
                >
                  x
                </button>
              </li>
            );
          }}
        </Mutation>
      );
    }}
  </Mutation>
);

TenantOrgItem.propTypes = {
  org: PropTypes.object.isRequired,
  userId: PropTypes.string
};

export default TenantOrgItem;
