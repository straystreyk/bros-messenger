import * as React from "react";
import { useLocation } from "react-router-dom";

import { Validator } from "../../../helpers/Validator";

type FormDataType = Record<string, string>;
const validate = new Validator();

export const useAuthForm = ({
  isRegistrationPage,
  isResetPassword,
  isResetPage,
}: {
  isRegistrationPage?: boolean;
  isResetPage?: boolean;
  isResetPassword?: boolean;
}) => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [formState, setFormState] = React.useState<FormDataType>({});
  const [errors, setErrors] = React.useState<string[]>([]);
  const [modal, setModal] = React.useState<{ open: boolean; text?: string }>({
    open: false,
  });
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => setModal((p) => ({ ...p, open: false }));

  const getErrors = React.useCallback(
    (validate: boolean, name: string) => {
      if (!validate && !errors.includes(name)) {
        setErrors((p) => [...p, name]);
      } else if (validate && errors.includes(name)) {
        setErrors((p) => p.filter((el) => el !== name));
      }
    },
    [errors]
  );

  const getInputValue = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      switch (e.target.name) {
        case "email":
          getErrors(validate.email(e.target.value), e.target.name);
          break;
        case "username":
          getErrors(validate.minLength(e.target.value, 2), e.target.name);
          break;
        case "password":
          getErrors(validate.minLength(e.target.value, 6), e.target.name);
          break;
      }
      setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
    },
    [errors]
  );

  const sendForm = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (errors.length)
        return setModal({ open: true, text: "Check the errors pls :)" });

      let link = window._GLOBALS_.APP_API_CONNECTION_STRING;
      if (isResetPage) link += "/reset";
      if (isRegistrationPage) link += "/registration";
      if (isResetPassword) {
        link += "/reset_password";
        setFormState((p) => ({ ...p, id }));
      }
      if (!isResetPage && !isRegistrationPage && !isResetPassword)
        link += "/login";

      setLoading(true);

      try {
        const res = await fetch(link, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        const data = await res.json();

        if (data) setModal({ open: true, text: data.message });
        if (data.status === 200) setFormState({});
      } catch (e) {
        if (e instanceof Error) {
          setModal({ open: true, text: e.message });
          setFormState({});
        }
      } finally {
        setLoading(false);
      }
    },
    [formState, isResetPage, isRegistrationPage, isResetPassword]
  );

  return {
    sendForm,
    formState,
    getInputValue,
    modal,
    handleClose,
    loading,
    errors,
  };
};
