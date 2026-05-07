const InputField = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {
    
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border px-3 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
};

export default InputField;
