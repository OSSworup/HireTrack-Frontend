import { useToast } from "../../../../../hooks/useToast";
import type { User, UserFormType } from "../types/types";
import type { useUsers } from "./useUsers";

export function useUserActions(
  usersApi: ReturnType<typeof useUsers>,
) {
  const { success, error } = useToast();

  async function saveUser(form: UserFormType,editingUser?:User) {
    try {
      if (editingUser) {
        await usersApi.updateUser({
          id: editingUser.id,
          data: {
            name: form.name,
            email: form.email,
            isActive: form.isActive,
          },
        });

        if (form.password.trim()) {
          await usersApi.updatePassword({
            id: editingUser.id,
            newPassword: form.password,
          });
        }

        success("User updated");
      } else {
        await usersApi.createUser(form);

        success("User created");
      }
    } catch (err) {
      error(
        err instanceof Error
          ? err.message
          : "Failed to save user"
      );

      throw err;
    }
  }

  async function deleteUser(deletingUser:User|null) {
    if (!deletingUser) return;

    try {
      await usersApi.deleteUser(deletingUser.id);

      success(`User "${deletingUser.name}" deleted`);

    } catch (err) {
      error(
        err instanceof Error
          ? err.message
          : "Failed to delete user"
      );

      throw err;
    }
  }

  return {
    saveUser,
    deleteUser,
  };
}