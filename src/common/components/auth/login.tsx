import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
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
        <Box
            sx={{
                width: "100%",
                maxWidth: 380,
                p: 3,
                border: "1px solid #EDEFF3",
                borderRadius: 1.5,
                backgroundColor: "#FFFFFF",
            }}
        >
            <Stack spacing={1.25} sx={{ mb: 3.5 }}>
                <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 1,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            fontWeight: 800,
                            fontSize: 15,
                        }}
                    >
                        AB
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "text.primary",
                            fontWeight: 750,
                            lineHeight: 1,
                        }}
                    >
                        AccessBoard
                    </Typography>
                </Stack>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            lineHeight: 1.35,
                            mb: 0.5,
                        }}
                    >
                        Access, clearly managed.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxWidth: 310, lineHeight: 1.6 }}
                    >
                        Sign in to manage roles, permissions, and team access.
                    </Typography>
                </Box>
            </Stack>

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
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={mutation.isPending}
                        sx={{
                            height: 40,
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
                            color: "primary.main",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 1,
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.18),
                                boxShadow: "none",
                            },
                        }}
                    >
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
