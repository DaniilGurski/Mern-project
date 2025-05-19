import { NavLink } from "react-router-dom";
import { type NavLinkProps } from "react-router-dom";
import { type PropsWithChildren } from "react";

export default function MyNavLink({
  children,
  ...rest
}: NavLinkProps & PropsWithChildren) {
  return (
    <NavLink
      className={
        "text-gray-700 hover:text-gray-950 focus:text-gray-950 aria-[current=page]:text-gray-950"
      }
      {...rest}
    >
      {children}{" "}
    </NavLink>
  );
}
