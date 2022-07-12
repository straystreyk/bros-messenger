import * as React from "react";
import { useAuthForm } from "./use-auth-form";
import { Button, TextField } from "@mui/material";

import { form, input, formWrapper, logo } from "./auth-form.module.css";
import { Logo } from "../../../UI/icons/logo";

interface AuthFormProps {
  isResetPage?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isResetPage }) => {
  const { formState, getInputValue, registration } = useAuthForm();

  return (
    <div className={formWrapper}>
      <form className={form} method="post">
        <div className={logo}>
          <Logo />
        </div>
        <h1 className="title">
          {!isResetPage ? "Registration" : "Reset your password"}
        </h1>
        {!isResetPage && (
          <>
            <TextField
              autoComplete="username"
              id="username"
              label="Username"
              variant="outlined"
              name="username"
              fullWidth
              classes={{ root: input }}
              value={formState.username || ""}
              onChange={getInputValue}
              required
            />
            <TextField
              autoComplete="current-password"
              type="password"
              name="password"
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
              value={formState.password || ""}
              onChange={getInputValue}
            />
          </>
        )}
        <TextField
          autoComplete="email"
          type="email"
          name="email"
          id="email"
          label="Email"
          fullWidth
          value={formState.email || ""}
          onChange={getInputValue}
          required
        />
        <div>
          <Button
            size="large"
            type="submit"
            variant="contained"
            onClick={registration}
          >
            {!isResetPage ? "Join to BROS!" : "Reset"}
          </Button>
        </div>
      </form>
    </div>
  );
};
