const HASURA_GRAPHQL_ENGINE_HOSTNAME = "profound-troll-67.hasura.app";

const scheme = proto => {
  return window.location.protocol === "https:" ? `${proto}s` : proto;
};

export const GRAPHQL_URL = `${scheme(
  "https"
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

export const REALTIME_GRAPHQL_URL = `${scheme(
  "ws"
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

export const authClientId = "Xg5tU3MvdgWQvIdVF3QC4qpKbotxnpM2";

export const authDomain = "dev-5zqg51mo.us.auth0.com";

/* export const callbackUrl = `${scheme(
  'http',
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/callback`; */

export const callbackUrl = "http://localhost:3000/callback";
