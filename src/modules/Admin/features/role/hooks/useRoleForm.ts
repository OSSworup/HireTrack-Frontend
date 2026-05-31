import { useEffect, useState } from "react";
import type { Role, RoleFormType } from "../types/types";

const emptyRoleForm: RoleFormType = {
  name: "",
  description: "",
  permissions: [],
  isActive: true,
};

export function useRoleForm(initial?: RoleFormType) {
  const [form, setForm] = useState<RoleFormType>(emptyRoleForm);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        description: initial.description,
        permissions: initial.permissions,
        isActive: initial.isActive,
      });
    } else {
      setForm(emptyRoleForm);
    }
  }, [initial]);

  function update<K extends keyof RoleFormType>(
    key: K,
    value: RoleFormType[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(emptyRoleForm);
  }

  function validate(_editingRole?: Role) {
    if (!form.name.trim()) return "Role Name required";
    if (!form.permissions.length) return "At least one permission required";
    return null;
  }

  return { form, update, validate, resetForm, setForm };
}
