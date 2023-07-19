import { useMutation } from "react-query";

interface UseCreateCategoryProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

function useCreateCategory({ setError, setSuccess }: UseCreateCategoryProps) {
  const createCategoryMutation = useMutation(
    (data: { name: string; image: string }) => {
      return fetch("https://api.escuelajs.co/api/v1/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          setError(res.statusText);
          throw new Error(res.statusText);
        }
        return res.json();
      });
    },
    {
      onSuccess: () => {
        setSuccess("Category created successfully");
      },
      onError: (json: { message: string }) => {
        setError(json.message);
      },
    }
  );
  return createCategoryMutation;
}

export default useCreateCategory;
