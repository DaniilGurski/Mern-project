import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { type Post } from "../../types";
import MyLink from "../ui/MyLink";

const isPost = (data: unknown): data is Post => {
  if (
    data !== null &&
    typeof data === "object" &&
    data.hasOwnProperty("title")
  ) {
    return true;
  }
  return false;
};

export default function PostView() {
  const { id } = useParams();
  const {
    data: post,
    loading,
    error,
  } = useFetch(`http://localhost:8000/posts/${id}`);

  if (loading) {
    return <p> Loading ... </p>;
  }

  if (error) {
    return <p> {error} </p>;
  }

  if (!isPost(post)) {
    return;
  }

  return (
    <div className="grid gap-y-8">
      <article>
        <h1> {post.title} </h1>
        <p> {post.body} </p>
      </article>

      <MyLink to="/" linkStyle="button" className="w-max">
        Go Back
      </MyLink>
    </div>
  );
}
