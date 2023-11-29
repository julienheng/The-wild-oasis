/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase, { supabaseUrl } from "./supabase";

// GET ALL CABINS
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// ****************************** //

// CREATE/EDIT ONE CABIN
export async function createEditCabin(newCabin: any, id: any) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. CREATE/EDIT CABIN
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id); // no array

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Create Cabin Images
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete Cabin If there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);

    console.error(error);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

// ****************************** //

// DELETE ONE CABIN BY ID
export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // row

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
