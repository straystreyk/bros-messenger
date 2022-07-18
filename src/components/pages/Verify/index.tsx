import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";

import {
  loaderWrapper,
  progress,
  icon,
  contentWrapper,
} from "./verify.module.css";
import { MainLink } from "../../../UI/components/Link";

export const Verify: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");
  const [loading, setLoading] = React.useState(true);

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
          setLoading(false);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };

    verify();
  }, []);

  return (
    <>
      <div className={loaderWrapper}>
        {loading && (
          <div className={contentWrapper}>
            <CircularProgress
              className={progress}
              color="secondary"
              size={30}
            />
            Wait for it...
          </div>
        )}
        {!loading && (
          <>
            <div className={contentWrapper}>
              <CheckCircleOutlined
                className={icon}
                color="success"
                fontSize="large"
              />
              Now you are verified!
            </div>
            <div>
              <MainLink to="/login" text="Login" />
            </div>
          </>
        )}
      </div>
    </>
  );
};
