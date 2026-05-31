import { api } from "../../../../../api/client";
import type { PermissionsResponse, Role, RoleFormType, UpdateRoleInput } from "../types/types";

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>("/role");
  return response.data;
};

export const createRole = async (data: RoleFormType) => {
  const response = await api.post("/role", data);
  return response.data;
};

export const updateRole = async (id: string, data: UpdateRoleInput) => {
  const response = await api.patch(`/role/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: string) => {
  const response = await api.delete(`/role/${id}`);
  return response.data;
};

export const getPermissions=async (): Promise<PermissionsResponse> =>{
  const response=await api.get<PermissionsResponse>('/role/permissions');
  return response.data;
}
