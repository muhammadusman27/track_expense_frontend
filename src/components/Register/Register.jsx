import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={(e) => addNewCategory(e)}>
        <InputField
          field_type="text"
          placeholder_text="First Name"
          field_value={firstName}
          field_on_change={(e) => setFirstName(e.target.value)}
        />

        <br />
        <InputField
          field_type="text"
          placeholder_text="Last Name"
          field_value={LastName}
          field_on_change={(e) => setLastName(e.target.value)}
        />

        <br />
        <InputField
          field_type="email"
          placeholder_text="Email"
          field_value={email}
          field_on_change={(e) => setEmail(e.target.value)}
        />
        <br />

        <InputField
          field_type="text"
          placeholder_text="Username"
          field_value={username}
          field_on_change={(e) => setUsername(e.target.value)}
        />
        <br />
        <InputField
          field_type="password"
          placeholder_text="Password"
          field_value={password}
          field_on_change={(e) => setPassword(e.target.value)}
        />

        <br />
        <Button
          button_type="submit"
          text="Register"
          background="black"
          color="white"
        />
      </form>
    </>
  );
};
export default Register;
