import {
    Box,
    Button,
    Checkbox,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type { PermissionGroup, RoleFormType } from "../types/types";

interface Props {
    permissionDialogOpen: boolean;

    setPermissionDialogOpen:
    Dispatch<SetStateAction<boolean>>;

    groupedPermissions: PermissionGroup[];
    form: RoleFormType;
    update: <K extends keyof RoleFormType>(
        key: K,
        value: RoleFormType[K],
    ) => void;

}

export default function PermissionDialog({ permissionDialogOpen, setPermissionDialogOpen, groupedPermissions, form, update }: Props) {
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    function isGroupFullySelected(group: PermissionGroup) {
        return group.permissions.length > 0 && group.permissions.every(
            p => form.permissions.includes(p.value)
        );
    }

    function selectedCount(group: PermissionGroup) {
        return group.permissions.filter(permission =>
            form.permissions.includes(permission.value)
        ).length;
    }

    useEffect(() => {
        if (permissionDialogOpen) {
            setExpandedGroups(new Set());
        }
    }, [permissionDialogOpen]);

    function setGroupExpanded(resource: string, expanded: boolean) {
        setExpandedGroups(prev => {
            const next = new Set(prev);

            if (expanded) {
                next.add(resource);
            } else {
                next.delete(resource);
            }

            return next;
        });
    }

    function toggle(permission: string, group: PermissionGroup) {
        const nextPermissions = form.permissions.includes(permission)
            ? form.permissions.filter(
                p => p !== permission
            )
            : [...form.permissions, permission];

        update("permissions", nextPermissions);

        const groupIsNowFullySelected = group.permissions.length > 0 && group.permissions.every(
            p => nextPermissions.includes(p.value)
        );

        if (groupIsNowFullySelected) {
            setGroupExpanded(group.resource, false);
        }
    }

    function toggleGroup(group: PermissionGroup, checked: boolean) {
        if (checked) {
            update(
                "permissions",
                [
                    ...new Set([
                        ...form.permissions,
                        ...group.permissions.map(
                            p => p.value
                        )
                    ])
                ]
            );
            setGroupExpanded(group.resource, false);
            return;
        }

        update(
            "permissions",
            form.permissions.filter(
                p =>
                    !group.permissions.some(
                        gp => gp.value === p
                    )
            )
        );
        setGroupExpanded(group.resource, true);
    }

    return (
        <Dialog
            open={permissionDialogOpen}
            onClose={() => setPermissionDialogOpen(false)}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 1.5,
                        overflow: "hidden",
                    },
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
                Manage Permissions
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    px: 2.5,
                    py: 2,
                    maxHeight: "calc(100vh - 220px)",
                    overflowY: "auto",
                    backgroundColor: "#FAFAFB",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {groupedPermissions.map(group => {
                        const allSelected = isGroupFullySelected(group);
                        const count = selectedCount(group);
                        const isExpanded = expandedGroups.has(group.resource);

                        return (
                            <Paper
                                key={group.resource}
                                elevation={0}
                                sx={{
                                    border: "1px solid #EDEFF3",
                                    borderRadius: 1,
                                    overflow: "hidden",
                                    backgroundColor: "#FFFFFF",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        px: 1.25,
                                        py: 0.75,
                                        minHeight: 48,
                                        borderBottom: isExpanded ? "1px solid #F0F2F5" : "none",
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() => setGroupExpanded(group.resource, !isExpanded)}
                                        aria-label={isExpanded ? "Collapse permissions" : "Expand permissions"}
                                    >
                                        {isExpanded ? (
                                            <ExpandMoreIcon fontSize="small" />
                                        ) : (
                                            <KeyboardArrowRightIcon fontSize="small" />
                                        )}
                                    </IconButton>

                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 700, color: "#161519", textTransform: "capitalize" }}
                                        >
                                            {group.resource}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                            {count} of {group.permissions.length} selected
                                        </Typography>
                                    </Box>

                                    <Box
                                        component="span"
                                        sx={{
                                            px: 1,
                                            py: 0.35,
                                            borderRadius: 1,
                                            backgroundColor: allSelected ? "#ECFDF3" : "#EEF6FF",
                                            color: allSelected ? "#15803D" : "#175CD3",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            lineHeight: 1.4,
                                            display: { xs: "none", sm: "inline-flex" },
                                        }}
                                    >
                                        {allSelected ? "All selected" : `${count} selected`}
                                    </Box>

                                    <Checkbox
                                        checked={allSelected}
                                        indeterminate={count > 0 && !allSelected}
                                        onChange={(_, checked) => toggleGroup(group, checked)}
                                    />
                                </Box>

                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                                            gap: 0.5,
                                            p: 1,
                                        }}
                                    >
                                        {group.permissions.map(permission => (
                                            <Box
                                                key={permission.value}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 0.75,
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    minHeight: 36,
                                                    "&:hover": { backgroundColor: "#FAFBFF" },
                                                }}
                                            >
                                                <Checkbox
                                                    size="small"
                                                    checked={form.permissions.includes(permission.value)}
                                                    onChange={() =>
                                                        toggle(permission.value, group)
                                                    }
                                                />

                                                <Typography variant="body2" sx={{ color: "#374151" }}>
                                                    {permission.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Collapse>
                            </Paper>
                        );
                    })}
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 2.5, py: 1.5 }}>
                <Button
                    variant="contained"
                    onClick={() => setPermissionDialogOpen(false)}
                    sx={{
                        background: "#161519",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 1,
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
