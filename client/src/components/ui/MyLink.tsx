import { Link } from "react-router-dom";
import { type LinkProps } from "react-router-dom";
import { type PropsWithChildren } from "react";
import clsx from "clsx";

type MyLinkProps = LinkProps & {
  linkStyle?: "default" | "button";
};

export default function MyLink({
  children,
  className,
  linkStyle = "default",
  ...rest
}: MyLinkProps & PropsWithChildren) {
  const linkStyles = {
    default: "text-gray-700 hover:text-gray-950 focus:text-gray-950",
    button:
      "cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-black/80 focus:bg-black/80",
  };

  return (
    <Link className={clsx(linkStyles[linkStyle], className)} {...rest}>
      {children}
    </Link>
  );
}
