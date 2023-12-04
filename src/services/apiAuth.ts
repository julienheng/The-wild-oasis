/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase, { supabaseUrl } from "./supabase";

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

// UPDATE USER

type updateUserData = {
  fullName: string;
  avatar: string;
  password: string;
};

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: updateUserData) {
  // 1. Update password OR full name
  let updateData: any = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Use avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser

}
