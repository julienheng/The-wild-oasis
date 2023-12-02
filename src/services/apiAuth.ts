/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "./supabase";

type loginData = {
  email: string;
  password: string;
};

export async function login({ email, password }: loginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data)
  return data;
}
