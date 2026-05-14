import { useEffect, useState } from "react";
import type {User, UserFormType } from "../types/types";


export function useUserForm(initial?: UserFormType) {
  const empty = { email: "", password: "",name:"",isActive:true};

  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initial) {
      setForm({
        email: initial.email,
        password:initial.password,
        name:initial.name,
        isActive:initial.isActive
      });
    } else {
      setForm(empty);
    }
  }, [initial]);

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function validate(editingUser?:User) {
    if (!form.email.trim()) return "User Email required";
    if (!editingUser && !form.password.trim()) return "User Password required";
    if (!form.name.trim()) return "User Name required";
    return null;
  }

  return { form, update, validate, setForm };
}