import { mCreateAlbumImage } from "@/utils/fetchFn/mutation/album";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useAlbum() {
  const router = useRouter();

  const albumMutationOption = useMemo(() => {
    return {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {},
    };
  }, [router]);

  const { mutate: createAlbumImage } = useMutation(
    ["createAlbumImage"],
    mCreateAlbumImage,
    albumMutationOption
  );
  return {
    createAlbumImage,
  };
}
