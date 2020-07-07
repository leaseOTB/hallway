import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import OrgCard from "./OrgCard.js"

export const ORG_LIST = gql`
  {
    orgs(order_by: { created_at: desc }) {
      id
    }
  }
`;

function OrgSearch(props) {

  const { loading, error, data } = useQuery(ORG_LIST);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.orgs.map((org, index) => (
          <OrgCard id={org.id} key={index}/>
      ))}
    </>
  );
}

export default OrgSearch