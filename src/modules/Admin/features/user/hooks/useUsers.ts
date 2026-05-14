import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  updatePassword,
} from "../api/user.api";
import type { UpdateUserInput} from "../types/types";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export function useUsers() {
  const qc = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string,
      data: UpdateUserInput;
    }) => updateUser(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },

  });

  const passwordMutation = useMutation({
    mutationFn: ({
      id,
      newPassword
    }: {
      id: string,
      newPassword: string
    }) => updatePassword(id, newPassword),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });

    const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
    }
  });



  return {
    usersQuery,

    createUser: createMutation.mutateAsync,
    updateUser: updateMutation.mutateAsync,
    updatePassword: passwordMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isUpdatingPassword: passwordMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
