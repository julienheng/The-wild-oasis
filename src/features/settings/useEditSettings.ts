/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

interface updateSettingData {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isSetting } = useMutation({
    mutationFn: (newSettingData: updateSettingData) =>
      updateSettingApi(newSettingData),
    onSuccess: () => {
      toast.success("Settings successfully edited!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isSetting, updateSetting };
}
