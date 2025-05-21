import { useEffect, type FormEvent } from "react";
import { type EditErrorResponse } from "../../types";
import { useParams } from "react-router-dom";
import Button from "../ui/Button";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { Toaster, toast } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import { isPost } from "../../typeguards";

export default function Edit() {
  const { id } = useParams();
  const { data: post, loading } = useFetch(`http://localhost:8000/posts/${id}`);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    title: "",
    body: "",
    file: "",
  });

  const validate = () => {
    let valid = true;
    let errors = { title: "", body: "", file: "" };

    if (!title) {
      errors.title = "Can't be empty";
      valid = false;
    }

    if (!body) {
      errors.body = "Can't be empty";
      valid = false;
    }

    if (!file) {
      errors.file = "Please choose one image";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const postEdit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("id", id || "");
    formData.append("image", file || "");

    const res = await fetch("http://localhost:8000/edit/:id", {
      method: "PUT",
      body: formData,
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

  // Set the current content of the post as field values
  useEffect(() => {
    if (!isPost(post)) {
      return;
    }

    setTitle(post.title);
    setBody(post.body);
  }, [loading]);

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ErrorMessage error={errors.title} />
        </label>

        <label className="grid gap-y-2">
          <span> Body: </span>
          <textarea
            className="input resize-none"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <ErrorMessage error={errors.body} />
        </label>

        <label className="grid gap-y-2">
          <span> Image: </span>
          <input
            type="file"
            accept=".jpg, .png, .webp"
            onChange={(e) => {
              const uploadFiles = e.target.files;

              if (uploadFiles === null) {
                return;
              }

              setFile(uploadFiles[0]);
            }}
          />
          <ErrorMessage error={errors.file} />
        </label>

        <Button type="submit">Edit</Button>
      </form>
      <Toaster />
    </div>
  );
}
