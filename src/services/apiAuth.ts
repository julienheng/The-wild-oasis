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

// LOG OUT
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// SIGN UP
type signupData = {
  email: string;
  password: string;
  fullName: string;
};

export async function signup({ fullName, email, password }: signupData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
