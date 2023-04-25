import {
  mCreateTravel,
  mDeleteTravel,
  mGetNewTravels,
  mUpdateClearTravel,
} from "@/utils/fetchFn/mutation/chatBot";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function useChatBot() {
  const { mutate: getNewTravels, data: getNewTravelsData } = useMutation(
    ["getNewTravels"],
    mGetNewTravels
  );

  const createTravelMutationOption = useMemo(
    () => ({
      onSuccess() {},
      onError() {},
    }),
    []
  );

  const { mutate: createTravel } = useMutation(
    ["createTravel"],
    mCreateTravel,
    createTravelMutationOption
  );

  const { mutate: deleteTravel } = useMutation(["deleteTravel"], mDeleteTravel);

  const { mutate: updateClearTravel } = useMutation(
    ["updateClearTravel"],
    mUpdateClearTravel
  );

  return {
    getNewTravels,
    getNewTravelsData,
    createTravel,
    deleteTravel,
    updateClearTravel,
  };
}
