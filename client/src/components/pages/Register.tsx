import { useState, type FormEvent } from "react";
import Button from "../ui/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validate = () => {
    if (!username || !password) {
      setErrors({
        username: !username ? "Can't be empty" : "",
        password: !password ? "Can't be empty" : "",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      console.error("Register error", error);
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

        <Button type="submit"> Register </Button>
      </form>
    </div>
  );
}
