import { api } from "./client";

interface registerUserType {
    email: string,
    password: string,
    //role:string
}

interface loginUserType {
    email: string,
    password: string,
}

export const createUser = (data: registerUserType) => api.post("/user/create", data);
export const loginUser = (data: loginUserType) => api.post("/user/login", data);
export const getCurrentUser = () => api.get("/user/me");
