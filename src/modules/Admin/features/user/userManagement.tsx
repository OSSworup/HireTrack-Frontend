import { useUserUI } from "./hooks/useUserUI";
import { useUsers } from "./hooks/useUsers";
import UserTable from "./components/userTable";
import UserDialogs from "./components/userDialog";
import { useUserFilters } from "./hooks/useUserFilters";
import { useUserActions } from "./hooks/useUserActions";
import DeleteDialog from "../../../../common/deleteDialog";


export default function UserManagementPage() {
  const usersApi = useUsers();
  const ui = useUserUI();

  const users = usersApi.usersQuery.data ?? [];

  const filters = useUserFilters(users);

  const actions = useUserActions(usersApi);

  return (
    <>
      <UserTable
        rows={filters.filteredUsers}
        q={filters.q}
        onQChange={filters.setQ}
        onAddClick={ui.openAdd}
        onEdit={ui.openEdit}
        onDelete={ui.openDelete}
      />

      <UserDialogs
        open={ui.isDialogOpen}
        dialogStaysOpen={ui.dialogStaysOpen}
        setDialogStaysOpen={ui.setDialogStaysOpen}
        editingId={ui.editingUser?.id ?? null}
        editingUser={ui.editingUser ?? undefined}
        onClose={ui.closeDialog}
        onSave={actions.saveUser}
        isCreating={usersApi.isCreating}
        isUpdating={usersApi.isUpdating}
      />

      <DeleteDialog
        deleteOpen={ui.isDeleteOpen}
        message={`Are you sure you want to delete ${ui.deletingUser?.name}`}
        onDeleteClose={ui.closeDelete}
        confirmDelete={()=>actions.deleteUser(ui.deletingUser)}
        isDeleting={usersApi.isDeleting}
      />
    </>
  );
}
