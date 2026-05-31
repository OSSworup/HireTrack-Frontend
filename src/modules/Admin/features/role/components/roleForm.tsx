import {
  Button, Checkbox, FormControlLabel, Stack, TextField,
  Box,
} from "@mui/material";
import type { RoleFormType } from "../types/types";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  form: RoleFormType;
  update: <K extends keyof RoleFormType>(
    key: K,
    value: RoleFormType[K],
  ) => void;
  setPermissionDialogOpen: Dispatch<SetStateAction<boolean>>;
}


export default function RoleForm({ form, update,setPermissionDialogOpen }: Props) {
  return (
    <>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <TextField
          label="Name"
          placeholder="e.g. HR Manager"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Description"
          placeholder="Short role description"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          fullWidth
          multiline
          minRows={2}
          size="small"
        />
        {/* <TextField
        label="Permissions"
        placeholder={"user.read\nuser.create\ninterview.update"}
        value={form.permissions.join("\n")}
        onChange={(e) => update("permissions", parsePermissions(e.target.value))}
        fullWidth
        multiline
        minRows={4}
        size="small"
      /> */}

        <Button
          variant="outlined"
          onClick={() => setPermissionDialogOpen(true)}
          sx={{ textTransform: "none" }}
        >
          Manage Permissions
        </Button>
        <FormControlLabel
          label="Active role"
          control={
            <Checkbox
              checked={Boolean(form.isActive)}
              onChange={(e) => update("isActive", e.target.checked)}
            />
          }
        />
      </Stack>
      
      <Box></Box>
      </>
  );
}
