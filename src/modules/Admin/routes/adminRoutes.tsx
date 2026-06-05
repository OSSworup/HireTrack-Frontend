import { Route, Routes } from "react-router-dom";
import SideNavLayout from "../../../common/layout/sideNavLayout";
import UserManagementPage from "../features/user/userManagement";
import RoleManagementPage from "../features/role/roleManagement";
import { RouteGuard } from "../../../common/components/auth/routeGuard";


export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<SideNavLayout />}>
                <Route
                    path="users"
                    element={
                        <RouteGuard permissions={["user:list"]}>
                            <UserManagementPage/>
                        </RouteGuard>
                    }
                />
                <Route
                    path="roles"
                    element={
                        <RouteGuard permissions={["role:list"]}>
                            <RoleManagementPage/>
                        </RouteGuard>
                    }
                />
            </Route>
        </Routes>
    );
}
