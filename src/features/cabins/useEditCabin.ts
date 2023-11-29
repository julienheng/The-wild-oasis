/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";

interface EditCabinData {
  newCabinData: any;
  id: string;
}

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: EditCabinData) => {
      return createEditCabinApi(newCabinData, id);
    },
    onSuccess: () => {
      toast.success("Cabin successfully edited!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
