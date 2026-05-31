import { useMemo, useState } from "react";
import type { Role } from "../types/types";

export function useRoleFilters(roles: Role[]) {
  const [q, setQ] = useState("");

  const filteredRoles = useMemo(() => {
    const query = q.toLowerCase();

    return roles.filter((role) => {
      const haystack = [
        role.name,
        role.description ?? "",
        ...(role.permissions ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [roles, q]);

  return {
    q,
    setQ,
    filteredRoles,
  };
}
