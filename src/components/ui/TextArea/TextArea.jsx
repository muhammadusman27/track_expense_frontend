import "./textArea.css";

const TextArea = ({ placeholder_text, field_value, field_on_change }) => {
  return (
    <textarea
      className="text_area"
      placeholder={placeholder_text}
      onChange={field_on_change}
      value={field_value}
    ></textarea>
  );
};
export default TextArea;
