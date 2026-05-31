import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api/role.api";

export function useRoleOptions() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 5 * 60 * 1000,
    select: (roles) =>
      roles
        .filter((role) => role.isActive)
        .map((role) => ({
          id: role.id,
          name: role.name,
        })),
  });
}
