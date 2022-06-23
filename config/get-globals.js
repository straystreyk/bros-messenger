const dotenv = require("dotenv");
dotenv.config();

const globals = {};

const getGlobals = () => {
  if (process.env.APP_PORT) globals.APP_PORT = process.env.APP_PORT;
  if (process.env.APP_PORT)
    globals.APP_API_CONNECTION_STRING = process.env.APP_API_CONNECTION_STRING;
  if (process.env.APP_PORT)
    globals.SOCKET_CONNECTION_STRING = process.env.SOCKET_CONNECTION_STRING;
  return globals;
};

module.exports = { getGlobals };
