import { useEffect, useState } from "react";
import type {User, UserFormType } from "../types/types";

const emptyUserForm: UserFormType = {
  email: "",
  password: "",
  name: "",
  isActive: true,
  roleIds: [],
};

export function useUserForm(initial?: UserFormType) {
  const [form, setForm] = useState<UserFormType>(emptyUserForm);

  useEffect(() => {
    if (initial) {
      setForm({
        email: initial.email,
        password:initial.password,
        name:initial.name,
        isActive:initial.isActive,
        roleIds:initial.roleIds
      });
    } else {
      setForm(emptyUserForm);
    }
  }, [initial]);

  function update<K extends keyof UserFormType>(key: K, value: UserFormType[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(emptyUserForm);
  }

  function validate(editingUser?:User) {
    if (!form.email.trim()) return "User Email required";
    if (!editingUser && !form.password.trim()) return "User Password required";
    if (!form.name.trim()) return "User Name required";
    return null;
  }

  return { form, update, validate, resetForm, setForm };
}
