import type React from "react";
import clsx from "clsx";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  className?: string;
};

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        "cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-black/80 focus:bg-black/80",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
