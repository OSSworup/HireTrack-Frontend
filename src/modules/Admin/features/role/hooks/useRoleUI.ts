import { useState } from "react";
import type { Role } from "../types/types";

export function useRoleUI() {
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [dialogStaysOpen, setDialogStaysOpen] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  const [permissionDialogOpen,setPermissionDialogOpen]=useState(false);

  function openAdd() {
    setEditingRole(null);
    setIsDialogOpen(true);
  }

  function openEdit(role: Role) {
    setEditingRole(role);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingRole(null);
  }

  function openDelete(role: Role) {
    setDeletingRole(role);
    setIsDeleteOpen(true);
  }

  function closeDelete() {
    setDeletingRole(null);
    setIsDeleteOpen(false);
  }

  return {
    editingRole,
    isDialogOpen,
    deletingRole,
    isDeleteOpen,
    setIsDeleteOpen,
    dialogStaysOpen,
    setDialogStaysOpen,
    permissionDialogOpen,
    setPermissionDialogOpen,

    openAdd,
    openEdit,
    closeDialog,
    openDelete,
    closeDelete,
  };
}
