const CustomButton = ({ label=`Click me`, className=`cursor-pointer`, type = "button", onClick=()=>{}, ...props }) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick} {...props}>
      {label}
    </button>
  );
};

export default CustomButton;
