import { api } from "./client";

interface registerUserType{
    email:string,
    password:string,
    //role:string
}

interface loginUserType{
    email:string,
    password:string,
}

export const registerUser=(data:registerUserType)=>api.post("/user/register",data);
export const loginUser=(data:loginUserType)=>api.post("/user/login",data);
export const getUser=()=>api.get("/user/fetch");