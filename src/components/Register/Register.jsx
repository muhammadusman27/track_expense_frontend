import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import { useState } from "react";
import axiosInstance from "../../axiosInstance";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (event) => {
    event.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password,
    };

    axiosInstance
      .post("account/signup", payload)
      .then((response) => {
        console.log("register = ", response.data["data"]);
      })
      .catch((error) => {
        console.log("catch register = ", error);
      })
      .finally(() => {
        console.log("register user finally block.");
      });
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={(e) => registerUser(e)}>
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
          field_value={lastName}
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
