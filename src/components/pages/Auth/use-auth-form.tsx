import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type FormDataType = Record<string, string>;

export const useAuthForm = ({
  isRegistrationPage,
  isResetPassword,
  isResetPage,
}: {
  isRegistrationPage?: boolean;
  isResetPage?: boolean;
  isResetPassword?: boolean;
}) => {
  const [formState, setFormState] = React.useState<FormDataType>({});
  const [modal, setModal] = React.useState<{ open: boolean; text?: string }>({
    open: false,
  });
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  console.log(id);

  const handleClose = () => setModal((p) => ({ ...p, open: false }));

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const sendForm = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
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
  };
};
