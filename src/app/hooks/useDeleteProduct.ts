import { useState } from "react";
import { useMutation } from "react-query";

function useDeleteProduct({ setError }: { setError: React.Dispatch<React.SetStateAction<string>> }) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteProductMutation = useMutation(
    async (productId: number) => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          setError(res.statusText);
          throw new Error(res.statusText);
        }

        return await res.json();
      } catch (error: unknown) { 
        setError((error as Error).message); 
      } finally {
        setIsLoading(false);
      }
    }
  );

  return { deleteProductMutation, isLoading };
}

export default useDeleteProduct;
