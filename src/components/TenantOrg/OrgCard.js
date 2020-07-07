import React from "react";
import "../../styles/App.css";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { timeDifferenceForDate } from "../../utils/TimeDifference.js";

export const ORG_INFO = gql`
  query($id: Int!) {
    orgs(where: { id: { _eq: $id } }) {
      id
      name
      description
      created_at
      admin_id
    }
  }
`;

function OrgCard(props) {
  let orgId = props.id ? props.id : props.match.params.id;

  const { loading, error, data } = useQuery(ORG_INFO, {
    variables: { id: orgId }
  });

  if (loading) return "";
  if (error) return `Error! ${error.message}`;

  return (
    <>
        {data.orgs.map((org, index) => (
          <article className="Post" key={index}>
            <div className="Post-image">
              {org.name}
            </div>
              {timeDifferenceForDate(org.created_at)}
          </article>
        ))}
    </>
  );
}

export default OrgCard;