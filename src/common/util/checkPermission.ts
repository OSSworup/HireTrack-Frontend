export const hasPermissions = (
  userPermissions: string[] = [],
  requiredPermissions: string[] = []
) =>
  requiredPermissions.every(permission =>
    userPermissions.includes(permission)
  );