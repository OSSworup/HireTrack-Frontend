import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface userState{
    value:string|null;
}

const initialState:userState={
    value:null,
};

const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{
        login:(state,action:PayloadAction<string>)=>{
            state.value=action.payload;
        },
        logout:(state)=>{
            state.value=null;
        }
    }
});

export const {login,logout}=userSlice.actions;
export default userSlice.reducer;