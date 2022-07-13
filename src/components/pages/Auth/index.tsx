import * as React from "react";
import { useAuthForm } from "./use-auth-form";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import { form, formWrapper, logo, input } from "./auth-form.module.css";
import { Logo } from "../../../UI/icons/logo";
import { MainModal } from "../../Modal";

interface AuthFormProps {
  isResetPage?: boolean;
  isRegistrationPage?: boolean;
  isResetPassword?: boolean;
}

export const AuthPage: React.FC<AuthFormProps> = ({
  isResetPage,
  isRegistrationPage,
  isResetPassword,
}) => {
  const { formState, getInputValue, sendForm, modal, handleClose, loading } =
    useAuthForm({ isResetPage, isRegistrationPage, isResetPassword });

  return (
    <div className={formWrapper}>
      <form className={form} method="post">
        <div className={logo}>
          <Logo />
        </div>
        <h1>
          {isResetPage || isResetPassword
            ? "Reset your password"
            : "Registration"}
        </h1>
        {!isResetPassword && (
          <>
            <TextField
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              label="Email"
              fullWidth
              value={formState.email || ""}
              classes={{ root: input }}
              onChange={getInputValue}
              required
            />
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
                  classes={{ root: input }}
                  fullWidth
                  required
                  value={formState.password || ""}
                  onChange={getInputValue}
                />
              </>
            )}
          </>
        )}
        {isResetPassword && (
          <TextField
            autoComplete="current-password"
            type="password"
            name="password"
            id="password"
            label="New password"
            variant="outlined"
            classes={{ root: input }}
            fullWidth
            required
            value={formState.password || ""}
            onChange={getInputValue}
          />
        )}
        <div>
          <Button
            size="large"
            type="submit"
            variant="contained"
            onClick={sendForm}
            disabled={loading}
            sx={{ marginRight: 2 }}
            startIcon={
              loading && <CircularProgress color="secondary" size={20} />
            }
          >
            {isResetPage || isResetPassword ? "Reset" : "Join to BROS!"}
          </Button>
          {!isRegistrationPage && !isResetPassword && (
            <Link href={!isResetPage ? "/auth/reset" : "/auth/login"}>
              {!isResetPage
                ? "Forgot the password?"
                : "I remember the password"}
            </Link>
          )}
        </div>
      </form>
      <MainModal handleClose={handleClose} open={modal.open}>
        {modal.text && <Typography>{modal.text}</Typography>}
      </MainModal>
    </div>
  );
};
