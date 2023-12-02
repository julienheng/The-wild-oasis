import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();
  // Something changed on the server
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginData) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("Err", error);
      toast.error("Provide email or password are incorrect");
    },
  });

  return { login, isLoading };
}
