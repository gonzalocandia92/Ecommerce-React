import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import UserData from "../interfaces/UserData";

interface Credentials {
  email: string;
  password: string;
}

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation<UserData, Error, Credentials>(
    async (credentials) => {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const { access_token } = data;

      localStorage.setItem("accessToken", access_token);

      return data;
    },
    {
      onError: (error) => {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      },
      onSettled: (data, error) => {
        if (!error) {
          queryClient.invalidateQueries(["userData", data]);
        }
      },
    }
  );

  const accessToken = localStorage.getItem("accessToken") || "";

  const userDataQuery = useQuery<UserData, Error>(
    ["userData", accessToken],
    async () => {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      return userData;
    },
    {
      initialData: () => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          return JSON.parse(storedUserData);
        }
        return undefined;
      },
      onSuccess: (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  return { loginMutation, userDataQuery, error };
};

export default useLoginMutation;
