
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import UserForm from "./userForm";
import type { User, UserFormType } from "../types/types";
import { useUserForm } from "../hooks/useUserForm";
import { useToast } from "../../../../../hooks/useToast";
import { useRoleOptions } from "../../role/hooks/useRoleOptions";

interface UserDialogsProps {
    open: boolean;
    dialogStaysOpen: boolean,
    setDialogStaysOpen: React.Dispatch<React.SetStateAction<boolean>>,
    editingId: string | null;
    editingUser?: User;
    onClose: () => void;
    onSave: (form: UserFormType, editingUser?: User) => Promise<void>;
    isCreating: boolean,
    isUpdating: boolean
}

function toForm(user: User): UserFormType {
    return {
        email: user.email,
        name: user.name,
        password: "",
        isActive: user.isActive,
        roleIds: user.roles.map((role) => role.id),
    }
}

export default function UserDialogs({
    open,
    dialogStaysOpen,
    setDialogStaysOpen,
    editingId,
    editingUser,
    onClose,
    onSave,
    isCreating,
    isUpdating
}: UserDialogsProps) {
    // Custom submit/update hooks can be plugged in here when the user logic is ready.
    const initialForm = useMemo(
        () => (editingUser ? toForm(editingUser) : undefined),
        [editingUser?.id]
    );

    const { error } = useToast();

    const formHook = useUserForm(initialForm);


    const isSaving = isCreating || isUpdating;

    useEffect(() => {
        if (open && !editingUser) {
            formHook.resetForm();
        }
    }, [open, editingUser?.id]);

    const handleSave = async () => {
        const validationError = formHook.validate(editingUser);
        if (validationError) {
            return error(validationError);
        }

        await onSave(formHook.form, editingUser);

        if (!editingUser) {
            formHook.resetForm();
        }

        if (editingUser || !dialogStaysOpen) {
            onClose();
        }
    };

    const roleOptionsQuery=useRoleOptions();
    const roleOptions=roleOptionsQuery.data ?? [];


    return (
        <>
            <Dialog open={open} onClose={isSaving ? undefined : onClose} maxWidth="xs" fullWidth disableRestoreFocus>
                <DialogTitle sx={{ fontWeight: 600 }}>
                    {editingId ? "Edit User" : "Add User"}
                </DialogTitle>

                <DialogContent
                    sx={{ display: "flex", flexDirection: "column", gap: 2, }}
                >
                    <UserForm
                        form={formHook.form}
                        update={formHook.update}
                        roleOptions={roleOptions}
                        passwordMessage={editingId ? "Change Password" : "Set password"}
                    />
                    {editingId === null && (<FormControlLabel label={"Keep Form Open"} control={<Checkbox
                        checked={dialogStaysOpen}

                        onChange={(e) => setDialogStaysOpen(e.target.checked)}
                        slotProps={{
                            input: { 'aria-label': 'controlled' },
                        }}
                    />} />)}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} disabled={isSaving}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave} disabled={isSaving}>
                        {
                            isSaving && (
                                <CircularProgress
                                    size={18}
                                    sx={{ mr: 1 }}
                                    color="inherit"
                                />
                            )
                        }
                        {editingId ? "Save" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
