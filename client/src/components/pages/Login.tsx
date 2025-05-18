import { useState, type FormEvent } from "react";
import Button from "../ui/Button";
import { type AuthErrorResponse } from "../../types";

// TODO: Move some logic to a seperate form component ?
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    root: "",
  });

  const validate = () => {
    let valid = true;
    let errors = { username: "", password: "", root: "" };

    if (!username) {
      errors.username = "Can't be empty";
      valid = false;
    }

    if (!password) {
      errors.password = "Can't be empty";
      valid = false;
    }

    if (password.length < 4) {
      errors.password = "Min 4";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const postLogin = async () => {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await postLogin();
    } catch (error) {
      setErrors(error as AuthErrorResponse);
    }
  };

  return (
    <div className="grid h-full place-items-center">
      <form
        className="grid w-[100%] max-w-[400px] gap-y-8 rounded-md bg-white p-8 shadow-md shadow-gray-300"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-y-2">
          <label className="grid gap-y-2">
            <span> Username: </span>
            <input
              className="rounded-sm p-2 outline-1 outline-gray-400"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500"> {errors.username} </p>
            )}
          </label>

          <label className="grid gap-y-2">
            <span> Password: </span>
            <input
              className="rounded-sm p-2 outline-1 outline-gray-400"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500"> {errors.password} </p>
            )}
          </label>
        </div>

        <Button type="submit"> Login </Button>

        {errors.root && <p className="text-red-500"> {errors.root} </p>}
      </form>
    </div>
  );
}
