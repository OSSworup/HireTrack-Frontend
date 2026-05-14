import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../layout/authLayout";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../api/userService";
import { useNavigate } from "react-router-dom";


export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    const mutation=useMutation({
        mutationFn:loginUser,
        onSuccess:(data)=>{
            localStorage.setItem("accesToken",data.data.token);
            console.log("Login Successful");
            navigate("/admin")
        },
        onError:(error)=>{
            console.log("ERROR:-",error);
        }
    });

    function submit(event: React.SyntheticEvent) {
        event.preventDefault();
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        fullWidth
                        size="small"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit">Login</Button>
                </Stack>
            </form>
        </Box>
    </AuthLayout>
}