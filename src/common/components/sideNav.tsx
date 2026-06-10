import { useMemo, type ReactNode } from "react";
import {
  CssBaseline,
  Drawer as MuiDrawer,
  List,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import SideNavItem from "./sideNavItem";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from '@mui/icons-material/Badge';
import { useAppSelector } from "../../store/hooks";
import { hasPermissions } from "../util/checkPermission";

const drawerWidth = 260;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

type NavChild = {
  label: string;
  icon: ReactNode;
  path: string;
  permissions?:string[];
};

type NavSection = {
  label: string;
  icon: ReactNode;
  basePath: string;
  permissions?:string[];
  children: NavChild[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Admin",
    icon: <DashboardIcon />,
    basePath: "/admin",
    children: [
      { label: "Users", icon: <PeopleIcon />, path: "/admin/users",permissions:["user:list"] },
      {label:"Roles",icon:<BadgeIcon/>,path:"/admin/roles",permissions:["role:list"]},
    ],
  },
];

export default function SideNav({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const user=useAppSelector((state)=>state.user.user);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const visibleSections = useMemo(() =>{
    if (!user) return [];

    return NAV_SECTIONS.map(section=>({
      ...section,
      children:section.children.filter(child=>hasPermissions(
        user.permissions ?? [],
        child.permissions ??[]
      )
    ),
    })).filter(section=>section.children.length >0);
  },[user]);

  const renderNavList = (isMobile: boolean) => (
    <List sx={{ px: 1, pt: 1 }}>
      {visibleSections.map((section) => (
        <SideNavItem
          key={section.basePath}
          label={section.label}
          icon={section.icon}
          open={true} // ✅ always open
          active={location.pathname.startsWith(section.basePath)}
          childrenItems={section.children.map((child) => ({
            label: child.label,
            icon: child.icon,
            active: isActive(child.path),
            onClick: () => {
              navigate(child.path);
              if (isMobile) onMobileClose?.();
            },
          }))}
        />
      ))}
    </List>
  );

  return (
    <>
      <CssBaseline />

      {/* ✅ Mobile Drawer */}
      <MuiDrawer
        variant="temporary"
        open={!!mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#FAFBFF",
            borderRight: "1px solid #EDEFF3",
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, ml: 2 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: 1,
                display: "grid",
                placeItems: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              AB
            </Box>
            <Typography sx={{ fontWeight: 700, color: "#334155" }}>
              AccessBoard
            </Typography>
          </Box>

          <IconButton onClick={onMobileClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        {renderNavList(true)}
      </MuiDrawer>

      {/* ✅ Desktop Drawer (ALWAYS OPEN) */}
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            position: "fixed",
            height: "100vh",
            backgroundColor: "#FAFBFF",
            borderRight: "1px solid #EDEFF3",
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, ml: 2 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: 1,
                display: "grid",
                placeItems: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              AB
            </Box>
            <Typography sx={{ fontWeight: 700, color: "#334155" }}>
              AccessBoard
            </Typography>
          </Box>
        </DrawerHeader>

        {renderNavList(false)}
      </MuiDrawer>
    </>
  );
}
