// components/AppBar.tsx
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  alpha,
} from "@mui/material";

import {
  Menu as MenuIcon,
  HelpOutlineOutlined as HelpIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import the Popper-based menu you created
import ProfileMenuPopper from "./profileMenuPopper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/userSlice";

type Props = { leftOffset: number; onMobileOpen?: () => void };


export default function GlobalAppBar({ leftOffset, onMobileOpen }: Props){
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.user.user);

  const user = {
    name: authUser?.name ?? authUser?.email ?? "Guest",
    role: authUser?.roles?.[0] ?? "User",
    avatarUrl: undefined,
  };

  function handleAvatarToggle(e: React.MouseEvent) {
    e.stopPropagation();
    setProfileOpen(prev => !prev);
  }

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  }

  return (
    <>
      <MuiAppBar
        position="fixed"
        elevation={0}
        sx={{
          mt: 2,
          left: {
            xs: `${leftOffset + 8}px`,
            sm: `${leftOffset + 16}px`,
            md: `${leftOffset + 16}px`,
            lg: `${leftOffset + 24}px`,
          },
          width: {
            xs: `calc(100% - ${leftOffset + 16}px)`,
            sm: `calc(100% - ${leftOffset + 32}px)`,
            md: `calc(100% - ${leftOffset + 32}px)`,
            lg: `calc(100% - ${leftOffset + 48}px)`,
          },
          height: 57,
          transition: "none", // ✅ removed shrink/expand animation
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(12px)",
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.85),
          borderRadius: 1.5,
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important", display: "flex", gap: 1 }}>
          
          {/* Mobile menu */}
          <IconButton
            size="small"
            sx={{ display: { lg: "none" } }}
            onClick={onMobileOpen}
          >
            <MenuIcon />
          </IconButton>

          {/* Search (same as before) */}
          {/* keep your search UI unchanged */}

          <Box sx={{ flexGrow: 1 }} />

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            
            {/* Help */}
            <IconButton size="small">
              <HelpIcon />
            </IconButton>

            {/* Avatar */}
            <Avatar onClick={handleAvatarToggle}>
              {user.name.charAt(0)}
            </Avatar>

          </Box>
        </Toolbar>
      </MuiAppBar>

      <ProfileMenuPopper
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onLogout={handleLogout}
        user={{ name: user.name, role: user.role }}
      />
    </>
  );
};
