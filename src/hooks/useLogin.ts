import fetcher from "../api/fetcher";
import useUserContenxt from "./useUserContext";
import { url } from "../constants/api";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function useLogin() {
  const userContext = useUserContenxt();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [_, setCookie] = useCookies(["token", "user"]);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const json = await fetcher(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (json.error) {
        setError(json.error);
      } else {
        userContext?.dispatch({ type: "LOGIN", payload: json.user });
        localStorage.setItem("user", JSON.stringify(json.user));
        setCookie("token", json.token, { path: "/", secure: true });
        setCookie("user", json.user._id, { path: "/", secure: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
