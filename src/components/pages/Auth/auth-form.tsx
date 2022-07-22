import * as React from "react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useAuthForm } from "./use-auth-form";
import { MainModal } from "../../Modal";
import { MainLink } from "../../../UI/components/Link";
import { form, input } from "./auth-form.module.css";

export const AuthForm: React.FC<{
  isResetPage?: boolean;
  isRegistrationPage?: boolean;
  isResetPassword?: boolean;
}> = React.memo(({ isRegistrationPage, isResetPassword, isResetPage }) => {
  const {
    formState,
    getInputValue,
    sendForm,
    loading,
    errors,
    handleClose,
    modal,
  } = useAuthForm({
    isResetPage,
    isRegistrationPage,
    isResetPassword,
  });

  return (
    <>
      <form onSubmit={sendForm} className={form} method="post">
        {isResetPage ||
          (isRegistrationPage && (
            <TextField
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              label="Email"
              fullWidth
              error={errors.includes("email")}
              classes={{ root: input }}
              onChange={getInputValue}
              required
              helperText="For example: myemail@gmail.com"
            />
          ))}
        <TextField
          autoComplete="username"
          id="username"
          label={!isRegistrationPage ? "Username or email" : "Username"}
          variant="outlined"
          error={errors.includes("username")}
          name="username"
          fullWidth
          classes={{ root: input }}
          value={formState.username || ""}
          onChange={getInputValue}
          helperText="Username must be more then 2 symbols"
          required
        />
        {!isResetPage && (
          <TextField
            autoComplete="current-password"
            type="password"
            name="password"
            error={errors.includes("password")}
            id="password"
            label="Password"
            variant="outlined"
            helperText="Password must be more then 6 symbols"
            classes={{ root: input }}
            fullWidth
            required
            value={formState.password || ""}
            onChange={getInputValue}
          />
        )}
        {isRegistrationPage && (
          <>
            <TextField
              autoComplete="name"
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              fullWidth
              classes={{ root: input }}
              value={formState.name || ""}
              onChange={getInputValue}
            />
            <TextField
              autoComplete="surname"
              id="surname"
              label="Surname"
              variant="outlined"
              name="surname"
              fullWidth
              classes={{ root: input }}
              value={formState.surname || ""}
              onChange={getInputValue}
            />
          </>
        )}
        <div>
          <Button
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ marginRight: 2 }}
            startIcon={
              loading && <CircularProgress color="secondary" size={20} />
            }
          >
            {(isResetPage || isResetPassword) && "Reset"}
            {isRegistrationPage && "Join to Bros!"}
            {!isRegistrationPage && !isResetPage && !isResetPassword && "Login"}
          </Button>
          {!isRegistrationPage && !isResetPassword && (
            <MainLink
              text={
                !isResetPage
                  ? "Forgot the password?"
                  : "I remember the password"
              }
              to={!isResetPage ? "/reset" : "/login"}
            />
          )}
        </div>
      </form>
      <MainModal handleClose={handleClose} open={modal.open}>
        {modal.text && <Typography>{modal.text}</Typography>}
      </MainModal>
    </>
  );
});

AuthForm.displayName = "AuthForm";
