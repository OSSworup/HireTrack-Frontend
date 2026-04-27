import { Route, Routes } from "react-router-dom";
import { Login } from "../common/components/auth/login";
import { Register } from "../common/components/auth/register";


export function RouteIndex(){

    return (<Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
    </Routes>);
}