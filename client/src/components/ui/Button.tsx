import type React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
};

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-black/80 focus:bg-black/80"
      {...rest}
    >
      {children}
    </button>
  );
}
