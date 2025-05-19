import { useEffect, useState } from "react"

export const useFetch = (url: string) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState<unknown>(null); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(false);
            try {
                const res = await fetch(url); 
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data?.message || "Response is not OK"); 
                }
                
                setData(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return { data, loading, error };
}