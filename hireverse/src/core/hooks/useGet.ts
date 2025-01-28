import { useEffect, useState, useCallback } from "react";

export default function useGet<T>(fetchData: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data function
    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchData();
            setData(response);
        } catch (err: any) {
            setError(err.message || err || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    useEffect(() => {
        fetch();
    }, []);

    return { data, setData, loading, error, refetch: fetch };
}
