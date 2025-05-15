import { useState, type FormEvent } from "react";
import Button from "../ui/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
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
          </label>

          <label className="grid gap-y-2">
            <span> Password: </span>
            <input
              className="rounded-sm p-2 outline-1 outline-gray-400"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <Button type="submit"> Login </Button>
      </form>
    </div>
  );
}
