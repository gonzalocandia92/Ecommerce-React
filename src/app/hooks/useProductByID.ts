import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

const useProductByID = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        if (!response.ok) {
          const errorMessage = "Failed to fetch product details";
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setProduct(data as Product);
        setIsLoading(false);
        setError(null);

      } catch (error) {
        setError(error.message || "Failed to fetch product details");
        setIsLoading(false);
      }
    };

    fetchProduct();

    // Cleanup the effect to avoid potential memory leaks
    return () => {
      // Add any cleanup logic here if needed
    };
  }, [productId]);

  return { product, isLoading, error };
};

export default useProductByID;
