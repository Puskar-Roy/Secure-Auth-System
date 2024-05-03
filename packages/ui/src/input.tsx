import React from "react";

interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  className,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      className={`${className} p-3 border-2 rounded-xl text-black focus:outline-none`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
