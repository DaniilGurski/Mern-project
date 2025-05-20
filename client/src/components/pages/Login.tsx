import { useState, type FormEvent } from "react";
import Button from "../ui/Button";
import { type AuthErrorResponse } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../ErrorMessage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    root: "",
  });

  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

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
      // Accept cookie responses
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    // Updating isAuth immediately for the navigate() to work
    setIsAuth(true);
    navigate("/admin", { replace: true });
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
              className="input"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <ErrorMessage error={errors.username} />
          </label>

          <label className="grid gap-y-2">
            <span> Password: </span>
            <input
              className="input"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage error={errors.password} />
          </label>
        </div>

        <Button type="submit"> Login </Button>
        <ErrorMessage error={errors.root} />
      </form>
    </div>
  );
}
