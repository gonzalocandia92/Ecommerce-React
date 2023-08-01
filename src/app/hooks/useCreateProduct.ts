import { useMutation } from "react-query";

function useCreateProduct(
  setError: (error: string) => void,
  setSuccess: (message: string) => void
) {
  const createProductMutation = useMutation(
    (data) => {
      return fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          setError("Failed to create product");
          throw new Error("Failed to create product");
        }
        return res.json();
      });
    },
    {
      onSuccess: () => {
        setSuccess("Product created successfully");
      },
      onError: () => {
        setError("Failed to create product");
      },
    }
  );

  return createProductMutation;
}

export default useCreateProduct;
