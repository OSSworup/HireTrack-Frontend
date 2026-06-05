import { useToast } from "../../../../../hooks/useToast";
import { hasPermissions } from "../../../../../common/util/checkPermission";
import { useAppSelector } from "../../../../../store/hooks";
import type { User, UserFormType } from "../types/types";
import type { useUsers } from "./useUsers";

const ASSIGN_ROLE_PERMISSION = "role:assign";

function sameRoleIds(left: string[], right: string[]) {
  if (left.length !== right.length) return false;

  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();

  return sortedLeft.every((id, index) => id === sortedRight[index]);
}

export function useUserActions(
  usersApi: ReturnType<typeof useUsers>,
) {
  const { success, error } = useToast();
  const user = useAppSelector((state) => state.user.user);
  const canAssignRole = hasPermissions(
    user?.permissions ?? [],
    [ASSIGN_ROLE_PERMISSION],
  );

  async function saveUser(form: UserFormType,editingUser?:User) {
    const currentRoleIds = editingUser?.roles.map((role) => role.id) ?? [];
    const isAssigningRoles = editingUser
      ? !sameRoleIds(currentRoleIds, form.roleIds)
      : form.roleIds.length > 0;

    if (isAssigningRoles && !canAssignRole) {
      error("You don't have permission to assign roles");
      return false;
    }

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

        if (isAssigningRoles) {
          await usersApi.assignRole({
            id: editingUser.id,
            roleIds: form.roleIds,
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
