import { useState,useMemo } from "react";
import type { User } from "../types/types";


export function useUserFilters(users: User[]) {
  const [q, setQ] = useState("");

  const filteredUsers = useMemo(() => {
    const query = q.toLowerCase();

    return users.filter(user =>
      (user.name ?? "").toLowerCase().includes(query)
    );
  }, [users, q]);

  return {
    q,
    setQ,
    filteredUsers,
  };
}