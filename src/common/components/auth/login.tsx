import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../layout/authLayout";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getCurrentUser, loginUser } from "../../../api/userService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { login } from "../../../store/slices/userSlice";


export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            localStorage.setItem("accessToken", data.data.token);
            const currentUser = await getCurrentUser();
            dispatch(login(currentUser.data));
            console.log("Login Successful");
            navigate("/admin/users")
        },
        onError: (error) => {
            localStorage.removeItem("accessToken");
            console.log("ERROR:-", error);
        }
    });

    function submit(event: React.SyntheticEvent) {
        event.preventDefault();
        if (mutation.isPending) return;

        const data={
            "email":email,
            "password":password
        }
        mutation.mutate(data);
    }

    return <AuthLayout>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: "600", mb: 1 }}>
                Welcome to HireTrack
            </Typography>

            <form onSubmit={(e) => submit(e)}>
                <Stack spacing={2.5}>
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        size="small"
                        type="text"
                        value={email}
                        disabled={mutation.isPending}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        fullWidth
                        size="small"
                        type="password"
                        value={password}
                        disabled={mutation.isPending}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && (
                            <CircularProgress
                                size={18}
                                sx={{ mr: 1 }}
                                color="inherit"
                            />
                        )}
                        {mutation.isPending ? "Logging in" : "Login"}
                    </Button>
                </Stack>
            </form>
        </Box>
    </AuthLayout>
}
