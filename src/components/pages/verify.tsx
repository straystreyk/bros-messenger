import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Verify: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");

  React.useEffect(() => {
    if (!token) return navigate("/");

    const verify = async () => {
      try {
        const res = await fetch(
          `${window._GLOBALS_.APP_API_CONNECTION_STRING}/verify`,
          {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );
        const { redirect, message, status } = await res.json();

        if (redirect) return navigate(redirect);
        if (status === 200 && message) {
          console.log(message);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };

    verify();
  }, []);

  return <>dasda</>;
};
