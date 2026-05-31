import DeleteDialog from "../../../../common/deleteDialog";
import RoleDialogs from "./components/roleDialog";
import RoleTable from "./components/roleTable";
import { usePermission } from "./hooks/usePermissions";
import { useRoleActions } from "./hooks/useRoleActions";
import { useRoleFilters } from "./hooks/useRoleFilters";
import { useRoles } from "./hooks/useRoles";
import { useRoleUI } from "./hooks/useRoleUI";

export default function RoleManagementPage() {
  const rolesApi = useRoles();
  const ui = useRoleUI();

  const roles = rolesApi.rolesQuery.data ?? [];
  const permissions = rolesApi.permissionsQuery.data ?? {};
  const permissionManager=usePermission(permissions);
  const filters = useRoleFilters(roles);
  const actions = useRoleActions(rolesApi);

  return (
    <>
      <RoleTable
        rows={filters.filteredRoles}
        q={filters.q}
        onQChange={filters.setQ}
        onAddClick={ui.openAdd}
        onEdit={ui.openEdit}
        onDelete={ui.openDelete}
      />

      <RoleDialogs
        open={ui.isDialogOpen}
        dialogStaysOpen={ui.dialogStaysOpen}
        setDialogStaysOpen={ui.setDialogStaysOpen}
        permissionDialogOpen={ui.permissionDialogOpen}
        setPermissionDialogOpen={ui.setPermissionDialogOpen}
        groupedPermissions={permissionManager.groupedPermissions}
        editingId={ui.editingRole?.id ?? null}
        editingRole={ui.editingRole ?? undefined}
        onClose={ui.closeDialog}
        onSave={actions.saveRole}
        isCreating={rolesApi.isCreating}
        isUpdating={rolesApi.isUpdating}
      />

      <DeleteDialog
        deleteOpen={ui.isDeleteOpen}
        message={`Are you sure you want to delete ${ui.deletingRole?.name}`}
        onDeleteClose={ui.closeDelete}
        confirmDelete={() => actions.deleteRole(ui.deletingRole)}
        isDeleting={rolesApi.isDeleting}
      />
    </>
  );
}
