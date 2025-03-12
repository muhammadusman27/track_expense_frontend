import "./inputField.css";

const InputField = ({field_type, placeholder_text, field_value, field_on_change}) => {
  return (
    <input 
        type={field_type} 
        placeholder={placeholder_text}
        value={field_value}
        onChange={field_on_change}
        className="input_field" 
        />
  )
}
export default InputField;