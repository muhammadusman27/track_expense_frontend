import "./selectField.css";

const SelectField = ({
  lable_id,
  label_text,
  value,
  data,
  change_function,
  default_option_value,
  default_option_text,
  value_key,
  value_text,
}) => {
  return (
    <>
      <label htmlFor={lable_id}>{label_text}: </label>
      <select value={value} onChange={change_function} id={lable_id}>
        <option value={default_option_value}>{default_option_text}</option>
        {data.map((obj) => {
          return (
            <option key={obj[value_key]} value={obj[value_key]}>
              {obj[value_text]}
            </option>
          );
        })}
      </select>
    </>
  );
};
export default SelectField;
