import { useMemo, type ReactNode } from "react";
import {
  CssBaseline,
  Drawer as MuiDrawer,
  List,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import SideNavItem from "./sideNavItem";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from '@mui/icons-material/Badge';

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
};

type NavSection = {
  label: string;
  icon: ReactNode;
  basePath: string;
  children: NavChild[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Admin",
    icon: <DashboardIcon />,
    basePath: "/admin",
    children: [
      { label: "Users", icon: <PeopleIcon />, path: "/admin/users" },
      {label:"Roles",icon:<BadgeIcon/>,path:"/admin/roles"},
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

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const visibleSections = useMemo(() => NAV_SECTIONS, []);

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
          },
        }}
      >
        <DrawerHeader>
          <Typography sx={{ ml: 2, fontWeight: 700 }}>
            HireTrack
          </Typography>

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
          },
        }}
      >
        <DrawerHeader>
          <Typography sx={{ ml: 2, fontWeight: 700 }}>
            HireTrack
          </Typography>
        </DrawerHeader>

        {renderNavList(false)}
      </MuiDrawer>
    </>
  );
}