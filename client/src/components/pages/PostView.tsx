import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { isPost } from "../../typeguards";
import MyLink from "../ui/MyLink";

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
      <article className="grid gap-y-4">
        <h1> {post.title} </h1>
        <p> {post.body} </p>
        <img
          className="w-2xl rounded-lg"
          src={`http://localhost:8000/${post.imagePath}`}
          alt=""
        />
      </article>

      <MyLink to="/" linkStyle="button" className="w-max">
        Go Back
      </MyLink>
    </div>
  );
}
