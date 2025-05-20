import { useFetch } from "../../hooks/useFetch";

import { type Posts } from "../../types";
import MyLink from "../ui/MyLink";

const isPosts = (data: unknown): data is Posts => {
  if (data !== null && typeof data === "object") {
    return true;
  }
  return false;
};

export default function Admin() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch(`http://localhost:8000/posts`);

  if (loading) {
    return <p> Loading ... </p>;
  }

  if (error) {
    return <p> {error} </p>;
  }

  if (!isPosts(posts)) {
    return;
  }

  return (
    <ul className="mx-auto grid max-w-4xl gap-y-3">
      {posts.map(({ title, _id }) => {
        return (
          <li className="flex justify-between rounded-lg p-4 outline-1 outline-gray-700">
            <span> {title} </span>

            <MyLink to={`/edit/${_id}`}> Edit </MyLink>
          </li>
        );
      })}
    </ul>
  );
}
