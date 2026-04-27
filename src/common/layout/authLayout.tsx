import { Box, Grid } from "@mui/material";
import img from "../../assets/main-background.jpg";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export function AuthLayout({ children }: Props) {

    return (
        <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
            <Grid
                size={{ xs: 0, lg: 8 }}
                sx={{
                    display: { xs: "none", lg: "block" },
                    height: "100%",
                    backgroundColor: "#F4F5FA",
                    backgroundImage: `url(${img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    m:0
                }}
            />

            <Grid
                size={{ xs: 12, lg: 4 }}
                sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                <Box>
                    {children}
                </Box>
            </Grid>
        </Grid>);
}