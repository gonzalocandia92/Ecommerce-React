import { useState } from "react";
import { useMutation } from "react-query";

function useCreateProduct() {
  const [isLoading, setIsLoading] = useState(false);

  const createProductMutation = useMutation(
    async (data: {
      title: string;
      price: number;
      description: string;
      categoryId: number;
      images: string[];
    }) => {
      setIsLoading(true);
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error("Failed to create product");
        }

        return await res.json();
      } catch (error: unknown) {
        throw (error as Error).message;
      } finally {
        setIsLoading(false);
      }
    }
  );

  return { createProductMutation, isLoading };
}

export default useCreateProduct;
