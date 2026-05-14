import { Route, Routes } from "react-router-dom";
import { Login } from "../common/components/auth/login";
import { Register } from "../common/components/auth/register";
//import { AdminPage } from "../modules/admin.tsx"
import AdminRoutes from "../modules/Admin/routes/adminRoutes.tsx";


export function RouteIndex() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/admin/*"
                element={
                    <AdminRoutes/>
                }
            />
        </Routes>
    );
}