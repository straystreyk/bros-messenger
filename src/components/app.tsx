import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { StoreType } from "../store";
import { Hello } from "./hello";
import { AuthForm } from "./AuthForm";

interface AppProps {
  store: StoreType;
}

export const App: React.FC<AppProps> = ({ store }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello store={store} />} />
        <Route
          path="/registration"
          element={<AuthForm isResetPage={false} />}
        />
        <Route path="/reset" element={<AuthForm isResetPage={true} />} />
      </Routes>
    </>
  );
};
