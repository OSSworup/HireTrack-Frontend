import { useState } from "react";
import type { GridColDef, GridSortModel } from "@mui/x-data-grid";
import {
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CommonTable from "../../../../../common/components/CommonTable";
import type { User } from "../types/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppSelector } from "../../../../../store/hooks";
import { hasPermissions } from "../../../../../common/util/checkPermission";

interface UserTableProps {
  rows: User[];
  q: string,
  onQChange: (v: string) => void;

  onAddClick: () => void;

  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({
  rows,
  q,
  onQChange,
  onAddClick,
  onEdit,
  onDelete,
}: UserTableProps) {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "createdAt", sort: "desc" },
  ]);

  const user = useAppSelector((state) => state.user.user);

  const canCreateUser = hasPermissions(user?.permissions ?? [], ["user:create"]);
  const canEditUser = hasPermissions(user?.permissions ?? [], ["user:update"]);
  const canDeleteUser = hasPermissions(user?.permissions ?? [], ["user:delete"]);
  const canSeeActions = canEditUser || canDeleteUser;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      minWidth: 200,
      renderCell: (params) => params.value || "Unnamed user",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      minWidth: 240,
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1.4,
      minWidth: 180,
      sortable: false,
      renderCell: (params) => {
        const roles = (params.value as User["roles"]) ?? [];

        if (!roles.length) {
          return (
            <Typography component="span" sx={{ color: "#9CA3AF", fontSize: 13 }}>
              No roles
            </Typography>
          );
        }

        return (
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", alignItems: "center" }}>
            {roles.map((role) => (
              <Box
                key={role.id}
                component="span"
                sx={{
                  px: 1,
                  py: 0.35,
                  borderRadius: 1,
                  backgroundColor: "#F4F3FF",
                  color: "#5B50D8",
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {role.name}
              </Box>
            ))}
          </Box>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 0.9,
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      renderCell: (params) => {
        const isActive = Boolean(params.value);

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              component="span"
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                justifyContent: "center",
                color: isActive ? "#15803D" : "#B91C1C",
                backgroundColor: isActive ? "#ECFDF3" : "#FEF2F2",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {isActive ? (
                <CheckCircleIcon sx={{ fontSize: 16 }} />
              ) : (
                <CancelIcon sx={{ fontSize: 16 }} />
              )}
              {isActive ? "Active" : "Inactive"}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 150,
      valueFormatter: (value) =>
        value ? new Date(value as Date).toLocaleDateString() : "",
    },
  ];

  if (canSeeActions) {
    columns.push({
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      sortable: false,
      minWidth: 140,
      renderCell: (params) => {
        const row = params.row as User;
        return (
          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
            {canEditUser && (
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => onEdit(row)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {canDeleteUser && (
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(row)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    });
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2.5 },
        border: "1px solid #EDEFF3",
        background: "#fff",
        borderRadius: 1.5,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.25 }}>
        Filters
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          width: "100%",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          size="small"
          placeholder="Search user"
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          sx={{ flex: 1 }}
        />

        {canCreateUser && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{
              background: "#161519",
              height: 40,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1,
            }}
            onClick={onAddClick}
          >
            Add User
          </Button>
        )}
      </Box>

      <Box sx={{ borderBottom: "1px solid #F0F2F5", mb: 1 }} />

      {/* Table */}
      <CommonTable
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
      />
    </Paper>
  );
}
