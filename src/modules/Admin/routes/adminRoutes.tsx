import { Route, Routes } from "react-router-dom";
import SideNavLayout from "../../../common/layout/sideNavLayout";
import UserManagementPage from "../features/user/userManagement";
import RoleManagementPage from "../features/role/roleManagement";


export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<SideNavLayout />}>
                <Route
                    path="users"
                    element={
                        <UserManagementPage/>
                    }
                />
                <Route
                    path="roles"
                    element={
                        <RoleManagementPage/>
                    }
                />
            </Route>
        </Routes>
    );
}
