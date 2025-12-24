import { useQuery } from "@tanstack/react-query";
import { getColors } from "./api/color.api";
import { Color } from "./types/color";

export const useColors = () => {
  const { data, isLoading, error } = useQuery<Color[], Error>({
    queryKey: ["colors"],
    queryFn: () =>
      getColors({
        ColorName: "",
        PageNumber: 1,
        PageSize: 50,
      }),
  });

  return {
    colors: data || [],
    isLoading,
    error,
  };
};
