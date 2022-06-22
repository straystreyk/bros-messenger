import * as React from "react";
import { useAuthForm } from "./use-auth-form";

interface AuthFormProps {
  isResetPage: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isResetPage }) => {
  const { formState, getInputValue, sendAuth } = useAuthForm();

  return (
    <form method="post">
      <input
        autoComplete="email"
        type="text"
        name="email"
        value={formState.email || ""}
        onChange={getInputValue}
      />
      {!isResetPage && (
        <>
          <input
            autoComplete="current-password"
            type="password"
            name="password"
            value={formState.password || ""}
            onChange={getInputValue}
          />
          <input
            autoComplete="username"
            type="text"
            name="username"
            value={formState.username || ""}
            onChange={getInputValue}
          />
        </>
      )}
      <button onClick={sendAuth}>Отправить</button>
    </form>
  );
};
