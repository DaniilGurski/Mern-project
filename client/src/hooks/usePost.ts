import { useFetch } from "./useFetch";

export const usePost = (id: string) => {
    const { data: post, loading, error  } = useFetch(`http://localhost:8000/posts/${id}`);

    return [post, loading, error]
}