interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
}

export const Input = ({ className, type, placeholder }: InputProps) => {
  return (
    <input
      type={type}
      className={`${className} p-3 border-2 rounded-xl text-black focus:outline-none`}
      placeholder={placeholder}
    />
  );
};
