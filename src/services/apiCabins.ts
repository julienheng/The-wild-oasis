import supabase from "./supabase";


// GET ALL CABINS
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// DELETE ONE CABIN BY ID
export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // row

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
