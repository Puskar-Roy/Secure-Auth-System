import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  className,
  appName,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`${className} rounded-xl px-3 py-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
