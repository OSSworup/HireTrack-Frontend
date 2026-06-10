import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { hasPermissions } from "../../util/checkPermission";

interface RouteGuardProps {
    permissions?: string[],
    children: React.ReactNode,
};


export function RouteGuard({ permissions = [], children }: RouteGuardProps) {
    const user = useAppSelector((state) => state.user.user);

    if (!user) {
        return (<Navigate to="/login" replace />);
    }

    const hasPermission = hasPermissions(
        user.permissions,
        permissions
    );
    

    if (!hasPermission) {
        return (<Navigate to="/unauthorized" replace />);
    };

    return children;
}
