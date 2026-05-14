import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import SideNav from "../components/sideNav";
//import Footer from "../../../../../common/components/footer";
import GlobalAppBar from "../components/appbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const drawerWidth = 260;

export default function SideNavLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // mobile drawer control
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleMobileOpen = () => setMobileOpen(true);
  const handleMobileClose = () => setMobileOpen(false);

  return (
    <>
      <CssBaseline />

      <Box sx={{ display: "flex", width: "100%", minHeight: "100vh" }}>
        {/* Sidebar */}
        <SideNav mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />

        {/* Top bar */}
        <GlobalAppBar
          leftOffset={isDesktop ? drawerWidth : 0}
          onMobileOpen={handleMobileOpen}
        />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            mt: { xs: 6, sm: 6, md: 6, lg: "25px" },
            flexGrow: 1,
            minWidth: 0,

            // ✅ fixed margin (no animation, no logic)
            marginLeft: isDesktop ? `${drawerWidth}px` : 0,

            pt: { xs: 6, sm: 6, md: 6, lg: 9 },
            px: { xs: 1, sm: 2, md: 2, lg: 3 },
            pb: { xs: 2, sm: 2, md: 2, lg: 3 },
            bgcolor: "#F7F7FB",

            display: "flex",
            flexDirection: "column",
            maxWidth: "100vw",
            overflowX: "hidden",
            minHeight: 0,
          }}
        >
          <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <Outlet />
          </Box>

          {/* <Footer /> */}
        </Box>
      </Box>
    </>
  );
}