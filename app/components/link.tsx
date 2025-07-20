import {
  Link as ReactRouterLink,
  useNavigate,
  type LinkProps as ReactRouterLinkProps,
} from "react-router";

import { Slot, type AsChild } from "@/components/slot";

export type LinkProps = ReactRouterLinkProps;

export interface LinkBackProps
  extends React.ComponentProps<"button">,
    AsChild {}

const NOREFERRER = "noreferrer";

const noReferrerRel = (to: LinkProps["to"], rel: LinkProps["rel"]) => {
  if (typeof to === "string" && to.startsWith("/")) {
    return rel;
  }

  if (rel?.split(" ").includes(NOREFERRER)) {
    return rel;
  }

  return rel ? `${rel} ${NOREFERRER}` : NOREFERRER;
};

export const Link = ({ rel, to, ...props }: LinkProps) => {
  if (typeof to === "string" && to.startsWith("#")) {
    return <a href={to} rel={rel} {...props} />;
  }

  return <ReactRouterLink rel={noReferrerRel(to, rel)} to={to} {...props} />;
};

export const LinkBack = ({ asChild, onClick, ...props }: LinkBackProps) => {
  const navigate = useNavigate();

  const Component = asChild ? Slot : "button";

  return (
    <Component
      onClick={(event) => {
        navigate(-1);
        onClick?.(event);
      }}
      {...props}
    />
  );
};
