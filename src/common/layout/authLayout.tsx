import { Box, Grid } from "@mui/material";
import img from "../../assets/main-background.jpg";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export function AuthLayout({ children }: Props) {

    return (
        <Grid container sx={{ width: "100vw", minHeight: "100dvh", overflow: "hidden" }}>
            <Grid
                size={{ xs: 0, lg: 8 }}
                sx={{
                    display: { xs: "none", lg: "block" },
                    minHeight: "100dvh",
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
                    justifyContent:"center",
                    backgroundColor: "#FAFAFB",
                    borderLeft: { lg: "1px solid #EDEFF3" },
                }}>
                <Box>
                    {children}
                </Box>
            </Grid>
        </Grid>);
}
