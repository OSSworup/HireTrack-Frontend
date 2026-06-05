import { Route, Routes } from "react-router-dom";
import { Login } from "../common/components/auth/login";
import { Register } from "../common/components/auth/register";
//import { AdminPage } from "../modules/admin.tsx"
import AdminRoutes from "../modules/Admin/routes/adminRoutes.tsx";
import Unauthorized from "../common/components/unauthuraized.tsx";
import { RouteGuard } from "../common/components/auth/routeGuard.tsx";


export function RouteIndex() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized/>} />
            <Route
                path="/admin/*"
                element={
                    <RouteGuard>
                        <AdminRoutes/>
                    </RouteGuard>
                }
            />
        </Routes>
    );
}
