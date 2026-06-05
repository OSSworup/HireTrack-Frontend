import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    roles: string[];
    permissions: string[];
}

interface UserState {
    user: AuthUser | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
