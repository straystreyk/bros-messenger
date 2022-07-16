import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { StoreType } from "../store";
import { AuthPage } from "./pages/Auth";
import { Verify } from "./pages/Verify";

interface AppProps {
  store: StoreType;
}

export const App: React.FC<AppProps> = ({ store }) => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<AuthPage isRegistrationPage />} />
          <Route path="reset" element={<AuthPage isResetPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="reset/user" element={<AuthPage isResetPassword />} />
          <Route path="verify" element={<Verify />} />
        </Route>
        <Route path="*" element={<div>пока ниче нет(</div>} />
      </Routes>
    </>
  );
};
