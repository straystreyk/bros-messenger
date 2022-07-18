import * as React from "react";
import Link from "@mui/material/Link";
import { type LinkProps as LinkPropsMUI } from "@mui/material/Link";
import { Link as LinkRRD } from "react-router-dom";

import { link } from "./link.module.css";

interface LinkProps extends LinkPropsMUI {
  component?: React.ElementType;
  to: string;
  text: string;
}

export const MainLink: React.FC<LinkProps> = ({
  component,
  to,
  text,
  ...props
}) => {
  return (
    <Link className={link} component={component ?? LinkRRD} to={to} {...props}>
      {text}
    </Link>
  );
};
