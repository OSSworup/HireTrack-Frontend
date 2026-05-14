import { useState } from "react";
import type { User } from "../types/types";

export function useUserUI() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [dialogStaysOpen, setDialogStaysOpen] = useState(false);

  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  function openAdd() {
    setEditingUser(null);
    setIsDialogOpen(true);
  }

  function openEdit(user: User) {
    setEditingUser(user);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingUser(null);
  }

  function openDelete(user: User) {
    setDeletingUser(user);
    setIsDeleteOpen(true);
  }

  function closeDelete() {
    setDeletingUser(null);
    setIsDeleteOpen(false);
  }

  return {
    editingUser,
    isDialogOpen,
    deletingUser,
    isDeleteOpen,
    setIsDeleteOpen,
    dialogStaysOpen,
    setDialogStaysOpen,

    openAdd,
    openEdit,
    closeDialog,
    openDelete,
    closeDelete,
  };
}
