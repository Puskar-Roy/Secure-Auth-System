import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  className,
  appName,
  onClick,
}: ButtonProps) => {
  return (
    <button className={`${className} rounded-xl px-3 py-2`} onClick={onClick}>
      {children}
    </button>
  );
};
