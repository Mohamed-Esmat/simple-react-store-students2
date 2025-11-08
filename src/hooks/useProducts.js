import { useState, useEffect } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // to avoid setting state on unmounted component. We use this pattern to prevent memory leaks in React when dealing with async operations.
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json(); // Why do i need to do this? because response is a ReadableStream object. Hmm what is that mean? it means that the response body is not yet fully received, and we need to read it as a stream of data.
        if (!cancelled) setProducts(data);
      } catch (error) {
        if (!cancelled) setError(error.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
