import Button from "../ui/Button/Button";
import InputField from "../ui/InputField/InputField";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    const url = "http://127.0.0.1:8000/account/login";
    axios
      .post(url, payload)
      .then((response) => {
        const data = response.data["data"];
        console.log("access = ", data["access"]);
        console.log("refresh = ", data["refresh"]);
        localStorage.setItem("access_token", data["access"]);
        localStorage.setItem("refresh_token", data["refresh"]);
      })
      .catch((errors) => {
        console.log("errors = ", errors);
      })
      .finally(() => {
        console.log("Finally block is here.");
      });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={(e) => userLogin(e)}>
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
          text="Login"
          background="black"
          color="white"
        />
      </form>
    </>
  );
};
export default Login;
