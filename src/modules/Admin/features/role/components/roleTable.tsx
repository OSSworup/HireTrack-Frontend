import { useState } from "react";
import type { GridColDef, GridSortModel } from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from '@mui/icons-material/Security';

import CommonTable from "../../../../../common/components/CommonTable";
import type { Role } from "../types/types";

interface RoleTableProps {
  rows: Role[];
  q: string;
  onQChange: (v: string) => void;
  onAddClick: () => void;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

function startCase(value: string): string {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function permissionToLabel(permission: string) {
  const [resource, action = "access"] = permission.split(":");

  return `${startCase(action)} ${startCase(resource)}`;
}

function PermissionHoverIcon({ permissions }: { permissions: string[] }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Tooltip title="Hover to view permissions">
        <IconButton
          size="small"
          onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
          onMouseLeave={() => setAnchorEl(null)}
          sx={{ width: 30, height: 30 }}
        >
          <SecurityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              p: 1,
              minWidth: 360,
              maxWidth: 440
            }
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 1, mb: 0.5, fontWeight: 600 }}>
          Permissions ({permissions.length})
        </Typography>
        <List dense sx={{ py: 0 }}>
          {permissions.map((permission) => (
            <ListItem key={permission} sx={{ py: 0.25, px: 1 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    {permissionToLabel(permission)}
                  </Typography>
                }
                secondary={permission}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}


export default function RoleTable({
  rows,
  q,
  onQChange,
  onAddClick,
  onEdit,
  onDelete,
}: RoleTableProps) {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "createdAt", sort: "desc" },
  ]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1.4,
      minWidth: 180,
      renderCell: (params) => params.value || "Unnamed role",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 240,
      renderCell: (params) => params.value || "No description",
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 2,
      width: 160,
      minWidth: 140,
      sortable: false,
      renderCell:(params)=>{
        const permissions=(params.value as Role["permissions"]) ?? [];

        return (
          <Box
          sx={{
            display:"flex",
            alignItems:"center",
            height:"100%",
            px:1,
          }}>
            <PermissionHoverIcon permissions={permissions}/>
          </Box>
        );
      }
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
    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      sortable: false,
      minWidth: 140,
      renderCell: (params) => {
        const row = params.row as Role;

        return (
          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(row)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(row)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

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
          placeholder="Search role"
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          sx={{ flex: 1 }}
        />

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
          Add Role
        </Button>
      </Box>

      <Box sx={{ borderBottom: "1px solid #F0F2F5", mb: 1 }} />

      <CommonTable
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
      />
    </Paper>
  );
}
