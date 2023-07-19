import { useMutation } from "react-query";

function useCreateProduct(setError, setSuccess) {
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
      onSuccess: (data) => {
        setSuccess("Product created successfully");
        const { title, price, description, images, category, id, creationAt, updatedAt } = data;
        console.log("Product Details:");
        console.log("Title:", title);
        console.log("Price:", price);
        console.log("Description:", description);
        console.log("Images:", images);
        console.log("Category:", category);
        console.log("Product ID:", id);
        console.log("Creation At:", creationAt);
        console.log("Updated At:", updatedAt);
      },
      onError: (error) => {
        setError("Failed to create product");
        console.log("Error:", error.message);
      },
    }
  );

  return createProductMutation;
}

export default useCreateProduct;
