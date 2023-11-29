import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabins deleted successfully!");
      // Invalidate the cache for the cabins query so that it will be refetched
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
