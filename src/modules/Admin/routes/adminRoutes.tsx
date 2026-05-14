import { Route, Routes } from "react-router-dom";
import SideNavLayout from "../../../common/layout/sideNavLayout";
import UserManagementPage from "../features/user/userManagement";


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
            </Route>
        </Routes>
    );
}
