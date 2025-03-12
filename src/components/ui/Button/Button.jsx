import "./button.css";

const Button = ({ button_type, text }) => {
  return (
    <button type={button_type} className="my_button">
      {text}
    </button>
  );
};

export default Button;
