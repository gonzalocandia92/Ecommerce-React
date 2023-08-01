import { useMutation, UseMutationResult, UseMutateAsyncFunction, UseMutateFunction } from "react-query";

interface ProductData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

interface CustomMutationResult extends Omit<UseMutationResult<unknown, unknown, ProductData, unknown>, "mutate"> {
  mutate: UseMutateFunction<unknown, unknown, ProductData, unknown>;
  mutateAsync: UseMutateAsyncFunction<unknown, unknown, ProductData, unknown>;
}

function useCreateProduct(): CustomMutationResult {
  const createProductMutation = useMutation<
    unknown, // Tipo de retorno en caso de éxito
    unknown, // Tipo de retorno en caso de error
    ProductData, // Tipo de los parámetros de la función de mutación
    unknown // Tipo de los parámetros extra
  >( // Definimos explícitamente los tipos aquí
    async (data: ProductData) => {
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
        throw ((error as Error).message);
      }
    }
  );

  return {
    ...createProductMutation,
    mutate: createProductMutation.mutate,
    mutateAsync: createProductMutation.mutateAsync,
  } as CustomMutationResult; // Hacemos una conversión de tipo explícita
}

export default useCreateProduct;
