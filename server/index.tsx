import fs from "fs";
import path from "path";
import React from "react";
import dotenv from "dotenv";
import express from "express";
import ReactDOMServer from "react-dom/server";
import request from "request-promise";
import CssBaseline from "@mui/material/CssBaseline";
import cookieParser from "cookie-parser";
import { StaticRouter } from "react-router-dom/server";
import { Store, StoreType, ThemeType } from "../src/store";
import { App } from "../src/components/app";
import { CacheProvider } from "@emotion/react";
import { MUITheme } from "../src/theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";

dotenv.config();
const app = express();

const prepareSsr = async (
  store: StoreType,
  url: string,
  token?: string,
  theme?: ThemeType
) => {
  if (theme) store.changeState("theme", theme);
};

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "../client")));
app.use("*", async (req: express.Request, res: express.Response) => {
  const cache = MUITheme.createEmotionCache();
  const token =
    req.cookies && req.cookies.token ? req.cookies.token.split(" ")[1] : null;
  const theme: ThemeType =
    req.cookies && req.cookies.theme ? req.cookies.theme : "dark";

  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../client/start-page.html"),
    {
      encoding: "utf8",
    }
  );

  const store = new Store();
  await prepareSsr(store, req.originalUrl, token, theme);

  const appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <CacheProvider value={cache}>
        <ThemeProvider
          theme={createTheme(MUITheme.getDesignTokens(store.state.theme))}
        >
          <App store={store} />
          <CssBaseline />
        </ThemeProvider>
      </CacheProvider>
    </StaticRouter>
  );

  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `
      <script type="text/javascript">window._SSR_STORE_ = ${JSON.stringify(
        store.state
      )}; </script> 
      <div id="app">${appHTML}</div>
    `
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

// run express server on port 9000
app.listen(process.env.APP_PORT, () => {
  console.log(
    `Express server started at http://localhost:${process.env.APP_PORT}`
  );
});
