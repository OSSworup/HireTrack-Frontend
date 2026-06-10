import { useEffect, useState } from "react";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import img from "../../../assets/main-background.jpg";
import { getCurrentUser } from "../../../api/userService";
import { useAppDispatch } from "../../../store/hooks";
import { login, logout } from "../../../store/slices/userSlice";

function AuthBootstrapSkeleton() {
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
        }}
      />

      <Grid
        size={{ xs: 12, lg: 4 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <Skeleton variant="text" width="75%" height={44} sx={{ mb: 1 }} />
          <Stack spacing={2.5}>
            <Skeleton variant="rounded" height={40} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rounded" height={40} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rounded" height={38} sx={{ borderRadius: 1 }} />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        dispatch(login(response.data));
      } catch {
        localStorage.removeItem("accessToken");
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, [dispatch]);

  if (loading) {
    return <AuthBootstrapSkeleton />;
  }

  return children;
}
