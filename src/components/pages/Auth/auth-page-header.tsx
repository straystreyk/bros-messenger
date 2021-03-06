import * as React from "react";
import { logo, themeSwitch } from "./auth-form.module.css";
import { Logo } from "../../../UI/icons/logo";
import { MainLink } from "../../../UI/components/Link";
import { ThemeSwitch } from "../../../UI/components/Switch/theme-switch";

export const AuthPageHeader: React.FC<{
  isResetPage?: boolean;
  isRegistrationPage?: boolean;
  isResetPassword?: boolean;
}> = React.memo(({ isResetPage, isRegistrationPage, isResetPassword }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const target: HTMLDivElement = ref.current;
    if (!target) return;
    const eyes = target.querySelectorAll("circle");

    const moveEyes = (e: MouseEvent) => {
      if (!eyes) return;

      eyes.forEach((el) => {
        el.style.cssText = `transform: translate(${e.x / 450}px, ${
          e.y / 450
        }px);
        `;
      });
    };

    window.addEventListener("mousemove", moveEyes);

    return () => {
      window.removeEventListener("mousemove", moveEyes);
    };
  }, [ref]);

  return (
    <div ref={ref} className={logo}>
      <Logo />
      <h1>
        {(isResetPage || isResetPassword) && "Reset password"}
        {isRegistrationPage && "Registration"}
        {!isRegistrationPage && !isResetPage && !isResetPassword && "Login"}
      </h1>
      {!isRegistrationPage && !isResetPage && !isResetPassword && (
        <MainLink text="Join us! Register now!" to="/" />
      )}
      {isRegistrationPage && (
        <MainLink text="Already have an account? Login!" to="/login" />
      )}
      <ThemeSwitch className={themeSwitch} />
    </div>
  );
});
AuthPageHeader.displayName = "AuthPageHeader";
