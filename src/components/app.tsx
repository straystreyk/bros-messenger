import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { StoreType } from "../store";
import { Hello } from "./hello";
import { AuthForm } from "./Auth/AuthForm";
import { Verify } from "./pages/verify";

interface AppProps {
  store: StoreType;
}

export const App: React.FC<AppProps> = ({ store }) => {
  return (
    <>
      <Routes>
        <Route path="auth">
          <Route path="" element={<Hello store={store} />} />
          <Route path="registration" element={<AuthForm />} />
          <Route path="reset" element={<AuthForm isResetPage={true} />} />
          <Route path="verify" element={<Verify />} />
        </Route>
        <Route path="*" element={<div>пока ниче нет(</div>} />
      </Routes>
    </>
  );
};
