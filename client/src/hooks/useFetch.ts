import { useEffect, useState } from "react"

export const useFetch = (url: string) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState<unknown>(null); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError("");
            try {
                const res = await fetch(url); 
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message); 
                }
                
                setData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                    return;
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return { data, loading, error };
}