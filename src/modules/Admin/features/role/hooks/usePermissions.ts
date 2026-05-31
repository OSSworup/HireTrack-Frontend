import { useState } from "react";
import type { PermissionGroup, PermissionsResponse } from "../types/types";



export function usePermission(permissions:PermissionsResponse) {
    const [selected, setSelected] = useState<string[]>([])

    function toggle(permission: string) {
        setSelected(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        )
    };

    const groupedPermissions:PermissionGroup[] = Object.entries(permissions).map(
        ([resource, actions]) => ({
            resource,
            permissions: Object.entries(actions).map(
                ([label, value]) => ({
                    label,
                    value
                })
            )
        })
    );

    return {
        selected,
        setSelected,
        toggle,
        groupedPermissions
    }
}