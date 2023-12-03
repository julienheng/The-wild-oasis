/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "./supabase";

type loginData = {
  email: string;
  password: string;
};

// LOGIN
export async function login({ email, password }: loginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

// GET CURRENT USER
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);
  if (error) throw new Error(error.message);
  return data?.user;
}
