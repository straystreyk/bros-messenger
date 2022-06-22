const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const stats = require("./config/build-stats.json");

const ejsTemplatePath = path.resolve(__dirname, "config", "index_template.ejs");
const htmlFilePath = path.resolve(__dirname, "build", "start-page.html");
const globals = {
  APP_PORT: process.env.APP_PORT,
  APP_API_CONNECTION_STRING: process.env.APP_API_CONNECTION_STRING,
  SOCKET_CONNECTION_STRING: process.env.SOCKET_CONNECTION_STRING,
};

ejs.renderFile(ejsTemplatePath, { ...stats, globals }, (err, str) => {
  if (err) return console.log(err);
  fs.writeFileSync(htmlFilePath, str);
});
