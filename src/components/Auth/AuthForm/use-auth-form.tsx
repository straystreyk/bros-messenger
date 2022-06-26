import * as React from "react";

type FormDataType = Record<string, string>;

export const useAuthForm = () => {
  const [formState, setFormState] = React.useState<FormDataType>({});

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const registration = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${window._GLOBALS_.APP_API_CONNECTION_STRING}/registration`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      const data = await res.json();
      console.log(data);
      if (data && data.error) return;
      setFormState({});
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        setFormState({});
      }
    }
  };

  return {
    registration,
    formState,
    getInputValue,
  };
};
