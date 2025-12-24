import { useQuery } from "@tanstack/react-query";
import { getColorById } from "./api/color.api";
import { Color } from "./types/color";

export const useColorById = (id: number | null, options = {}) => {
  return useQuery<Color | null>({
    queryKey: ["color", id],
    queryFn: () => {
      if (id == null) return Promise.resolve(null);  
      return getColorById(id);
    },
    enabled: !!id,  
    ...options,
  });
};
