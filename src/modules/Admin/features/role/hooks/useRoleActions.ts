import { useToast } from "../../../../../hooks/useToast";
import type { Role, RoleFormType } from "../types/types";
import type { useRoles } from "./useRoles";

export function useRoleActions(rolesApi: ReturnType<typeof useRoles>) {
  const { success, error } = useToast();

  async function saveRole(form: RoleFormType, editingRole?: Role) {
    try {
      if (editingRole) {
        await rolesApi.updateRole({
          id: editingRole.id,
          data: {
            name: form.name,
            description: form.description,
            permissions: form.permissions,
            isActive: form.isActive,
          },
        });

        success("Role updated");
      } else {
        await rolesApi.createRole(form);

        success("Role created");
      }
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to save role");

      throw err;
    }
  }

  async function deleteRole(deletingRole: Role | null) {
    if (!deletingRole) return;

    try {
      await rolesApi.deleteRole(deletingRole.id);

      success(`Role "${deletingRole.name}" deleted`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to delete role");

      throw err;
    }
  }

  return {
    saveRole,
    deleteRole,
  };
}
