import { type FormEvent } from "react";
import { type EditErrorResponse } from "../../types";
import { useParams } from "react-router-dom";
import Button from "../ui/Button";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { Toaster, toast } from "react-hot-toast";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    body: "",
  });
  const { id } = useParams();

  const validate = () => {
    let valid = true;
    let errors = { title: "", body: "" };

    if (!title) {
      errors.title = "Can't be empty";
      valid = false;
    }

    if (!body) {
      errors.body = "Can't be empty";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const postEdit = async () => {
    const res = await fetch("http://localhost:8000/edit/:id", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        id: id,
      }),
      // Accept cookie responses
      credentials: "include",
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
      toast.promise(postEdit, {
        loading: "Editing post ...",
        success: "Post edited !",
        error: "Something went wrong !",
      });
    } catch (error) {
      setErrors(error as EditErrorResponse);
    }
  };

  return (
    <div>
      <form
        className="mx-auto grid max-w-4xl gap-y-4 rounded-lg p-4 outline-1 outline-gray-500"
        onSubmit={handleSubmit}
      >
        <label className="grid gap-y-2">
          <span> Title: </span>
          <input
            type="text"
            className="input"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ErrorMessage error={errors.title} />
        </label>

        <label className="grid gap-y-2">
          <span> Body: </span>
          <textarea
            className="input resize-none"
            rows={8}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <ErrorMessage error={errors.body} />
        </label>

        <Button type="submit">Edit</Button>
      </form>
      <Toaster />
    </div>
  );
}
