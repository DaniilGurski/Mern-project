import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

type Post = {
  title: string;
  body: string;
};

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
  const { data, loading, error } = useFetch(`http://localhost:8000/post/${id}`);

  if (loading) {
    return <p> Loading ... </p>;
  }

  if (error) {
    return <p> Something went wrong ! </p>;
  }

  if (!isPost(data)) {
    return;
  }

  return (
    <div>
      <h1> {data.title} </h1>
      <p> {data.body} </p>
    </div>
  );
}
