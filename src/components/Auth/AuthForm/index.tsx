import * as React from "react";
import { useAuthForm } from "./use-auth-form";

interface AuthFormProps {
  isResetPage: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isResetPage }) => {
  const { formState, getInputValue, registration } = useAuthForm();

  return (
    <form method="post">
      {!isResetPage && (
        <>
          <div>
            <label htmlFor="username">Username</label>
            <input
              autoComplete="username"
              type="text"
              name="username"
              id="username"
              value={formState.username || ""}
              onChange={getInputValue}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="current-password"
              type="password"
              name="password"
              id="password"
              value={formState.password || ""}
              onChange={getInputValue}
            />
          </div>
        </>
      )}
      <div>
        <label htmlFor="emil">email</label>
        <input
          autoComplete="email"
          type="text"
          name="email"
          id="email"
          value={formState.email || ""}
          onChange={getInputValue}
        />
      </div>
      <button type="submit" onClick={registration}>
        Join to bros
      </button>
    </form>
  );
};
