export interface Role {
  id: string;
  name: string;
  description?: string | null;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoleFormType {
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
}

export interface UpdateRoleInput {
  name?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
}

export interface PermissionsResponse {
   [resource: string]: {
      [action: string]: string
   }
}

interface PermissionItem {
    label: string;
    value: string;
}

export interface PermissionGroup {
    resource: string;
    permissions: PermissionItem[];
}