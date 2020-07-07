import gql from "graphql-tag";

const ORG_FRAGMENT = gql`
  fragment OrgFragment on orgs {
    id
    admin_id
    created_at
    updated_at
    description
    name
  }
`;

const USER_FRAGMENT = gql`
  fragment UserFragment on users {
    name
  }
`;

const QUERY_ORG = gql`
  query fetch_orgs($orgLimit: Int, $orgId: Int) {
    orgs(
      where: { id: { _gt: $orgId } }
      order_by: { created_at: desc }
      limit: $orgLimit
    ) {
      ...OrgFragment
      user {
        ...UserFragment
      }
    }
  }
  ${ORG_FRAGMENT}
  ${USER_FRAGMENT}
`;

const QUERY_FEED_ORG = gql`
  query fetch_orgs($orgId: Int) {
    orgs(where: { id: { _gt: $todoId } }, order_by: { created_at: desc }) {
      ...OrgFragment
      user {
        ...UserFragment
      }
    }
  }
  ${ORG_FRAGMENT}
  ${USER_FRAGMENT}
`;

const MUTATION_ORG_ADD = gql`
  mutation insert_orgs($objects: [orgs_insert_input!]!) {
    insert_orgs(objects: $objects) {
      affected_rows
      returning {
        id
        admin_id
        name
        description
        created_at
      }
    }
  }
`;

const MUTATION_ORG_UPDATE = gql`
  mutation update_orgs($orgId: Int, $set: orgs_set_input!) {
    update_orgs(where: { id: { _eq: $orgId } }, _set: $set) {
      affected_rows
    }
  }
`;

const MUTATION_ORG_DELETE = gql`
  mutation delete_orgs($orgId: Int) {
    delete_orgs(where: { id: { _eq: $orgId } }) {
      affected_rows
    }
  }
`;

const SUBSCRIPTION_ORG_LIST = gql`
  subscription($orgId: Int) {
    orgs(
      where: { id: { _gt: $orgId } }
      order_by: { created_at: desc }
      limit: 1
    ) {
      id
      admin_id
      name
      description
      created_at
    }
  }
`;

export {
  QUERY_ORG,
  QUERY_FEED_ORG,
  MUTATION_ORG_ADD,
  MUTATION_ORG_UPDATE,
  MUTATION_ORG_DELETE,
  SUBSCRIPTION_ORG_LIST
};
