import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import type { UserFormType } from "../types/types";

interface Props {
  form: UserFormType;
  update: <K extends keyof UserFormType>(
    key: K,
    value: UserFormType[K],
  ) => void;

  passwordMessage:string
}

export default function UserForm({
  form,
  update,
  passwordMessage
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
