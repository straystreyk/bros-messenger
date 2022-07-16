import * as React from "react";

import { formWrapper } from "./auth-form.module.css";
import { AuthForm } from "./auth-form";
import { AuthPageHeader } from "./auth-page-header";

interface AuthFormProps {
  isResetPage?: boolean;
  isRegistrationPage?: boolean;
  isResetPassword?: boolean;
}

export const AuthPage: React.FC<AuthFormProps> = React.memo(
  ({ isResetPage, isRegistrationPage, isResetPassword }) => {
    return (
      <div className={formWrapper}>
        <AuthPageHeader
          isResetPage={isResetPage}
          isRegistrationPage={isRegistrationPage}
          isResetPassword={isResetPassword}
        />
        <AuthForm
          isResetPage={isResetPage}
          isRegistrationPage={isRegistrationPage}
          isResetPassword={isResetPassword}
        />
      </div>
    );
  }
);
AuthPage.displayName = "AuthPage";
