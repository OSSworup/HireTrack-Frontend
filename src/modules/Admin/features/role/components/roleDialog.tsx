import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo, type Dispatch, type SetStateAction } from "react";

import { useToast } from "../../../../../hooks/useToast";
import { useRoleForm } from "../hooks/useRoleForm";
import type { PermissionGroup, Role, RoleFormType } from "../types/types";
import PermissionDialog from "./permissionDialog";
import RoleForm from "./roleForm";

interface RoleDialogsProps {
  open: boolean;
  dialogStaysOpen: boolean;
  setDialogStaysOpen: Dispatch<SetStateAction<boolean>>;
  permissionDialogOpen: boolean;
  setPermissionDialogOpen: Dispatch<SetStateAction<boolean>>;
  groupedPermissions: PermissionGroup[];
  editingId: string | null;
  editingRole?: Role;
  onClose: () => void;
  onSave: (form: RoleFormType, editingRole?: Role) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
}

function toForm(role: Role): RoleFormType {
  return {
    name: role.name,
    description: role.description ?? "",
    permissions: role.permissions ?? [],
    isActive: role.isActive,
  };
}

export default function RoleDialogs({
  open,
  dialogStaysOpen,
  setDialogStaysOpen,
  permissionDialogOpen,
  setPermissionDialogOpen,
  groupedPermissions,
  editingId,
  editingRole,
  onClose,
  onSave,
  isCreating,
  isUpdating,
}: RoleDialogsProps) {
  const initialForm = useMemo(
    () => (editingRole ? toForm(editingRole) : undefined),
    [editingRole?.id],
  );

  const { error } = useToast();
  const formHook = useRoleForm(initialForm);

  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (open && !editingRole) {
      formHook.resetForm();
    }
  }, [open, editingRole?.id]);

  const handleSave = async () => {
    const validationError = formHook.validate(editingRole);
    if (validationError) {
      return error(validationError);
    }

    await onSave(formHook.form, editingRole);

    if (!editingRole) {
      formHook.resetForm();
    }

    if (editingRole || !dialogStaysOpen) {
      onClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={isSaving ? undefined : onClose}
        maxWidth="xs"
        fullWidth
        disableRestoreFocus
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingId ? "Edit Role" : "Add Role"}
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <RoleForm form={formHook.form} update={formHook.update} setPermissionDialogOpen={setPermissionDialogOpen} />
          {editingId === null && (
            <FormControlLabel
              label="Keep Form Open"
              control={
                <Checkbox
                  checked={dialogStaysOpen}
                  onChange={(e) => setDialogStaysOpen(e.target.checked)}
                  slotProps={{
                    input: { "aria-label": "controlled" },
                  }}
                />
              }
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={isSaving}>
            {isSaving && (
              <CircularProgress size={18} sx={{ mr: 1 }} color="inherit" />
            )}
            {editingId ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <PermissionDialog
        permissionDialogOpen={permissionDialogOpen}
        setPermissionDialogOpen={setPermissionDialogOpen}
        groupedPermissions={groupedPermissions}
        form={formHook.form}
        update={formHook.update}
      />
    </>
  );
}
