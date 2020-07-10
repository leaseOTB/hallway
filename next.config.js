
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  env: {
    AUTH0_DOMAIN: 'dev-5zqg51mo.us.auth0.com',
    AUTH0_AUDIENCE: 'https://profound-troll-67.hasura.app/v1/graphql',
    AUTH0_CLIENT_ID: 'Xg5tU3MvdgWQvIdVF3QC4qpKbotxnpM2',
    AUTH0_CLIENT_SECRET: 'EjB3HVVcYd9Zp_muq89YY1re7Jo32R43x9Ryh09W_dczBFKj4r0JDtOL6m5pV7rF',
    AUTH0_SCOPE: 'openid',
    REDIRECT_URI:
      process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
    POST_LOGOUT_REDIRECT_URI:
      process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/',
    SESSION_COOKIE_SECRET: '285023845270329308232305683126453',
    SESSION_COOKIE_LIFETIME: 7200, // 2 hours
    APP_HOST: process.env.DOMAIN,
  },
}