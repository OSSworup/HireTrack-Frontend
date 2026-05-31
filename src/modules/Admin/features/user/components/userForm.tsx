import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import type { RoleOption, UserFormType } from "../types/types";

interface Props {
  form: UserFormType;
  update: <K extends keyof UserFormType>(
    key: K,
    value: UserFormType[K],
  ) => void;

  passwordMessage: string,

  roleOptions: RoleOption[];
}

export default function UserForm({
  form,
  update,
  passwordMessage,
  roleOptions,
}: Props) {
  return (
    <Stack spacing={2} sx={{ pt: 1 }}>
      <TextField
        label="Name"
        placeholder="e.g. Priya Sharma"
        value={form.name ?? ""}
        onChange={(e) => update("name", e.target.value)}
        fullWidth
        size="small"
      />
      <TextField
        label="Email"
        placeholder="e.g. priya@company.com"
        size="small"
        type="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        placeholder={passwordMessage}
        size="small"
        type="password"
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
        fullWidth
      />

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={roleOptions}
        value={roleOptions.filter((role) => form.roleIds.includes(role.id))}
        onChange={(_,value)=>update("roleIds",value.map((role)=>role.id))}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Roles *"
            size="small"
            fullWidth
          />
        )}
      />
      <FormControlLabel
        label="Active user"
        control={
          <Checkbox
            checked={Boolean(form.isActive)}
            onChange={(e) => update("isActive", e.target.checked)}
          />
        }
      />
    </Stack>
  );
}
