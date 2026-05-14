import {
  Paper,
  ClickAwayListener,
  Grow,
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  SvgIcon,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout?: () => void;
  user?: {
    name?: string;
    role?: string;
    avatarUrl?: string;
    billingCount?: number;
  };
}

export default function ProfileMenuFixed({
  open,
  onClose,
  onLogout,
  user = { name: "John Doe", role: "Admin", billingCount: 4 },
}: Props) {
  const { name, role, avatarUrl } = user;

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 85,
        left: { xs: "50%", sm: "auto" },
        right: { sm: 45 },
        transform: { xs: "translateX(-50%)", sm: "none" },
        zIndex: 1400,
      }}
    >
      <Grow in={open} style={{ transformOrigin: "right top" }}>
        <div>
          <ClickAwayListener
            onClickAway={onClose}>
            <Paper
              elevation={0}
              sx={{
                width: { xs: "calc(100vw - 40px)", sm: 224 },
                borderRadius: 1.5,
                boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              {/* header */}
              <Box sx={{ px: 2, py: 1, height: 56 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <Avatar
                      src={avatarUrl}
                      alt={name}
                      sx={{ width: 44, height: 44, bgcolor: "primary.main", fontSize: 16 }}
                    >
                      {!avatarUrl && name ? name.charAt(0) : null}
                    </Avatar>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: "success.main",
                        border: "2px solid white",
                      }}
                    />
                  </Box>

                  <Box sx={{ overflow: "hidden" }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: "16px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                      {role}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* list */}
              <List disablePadding>
                <ListItemButton onClick={onClose} sx={{ height: 40, px: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <PersonOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Profile"
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 13,
                          fontWeight: 600,
                        },
                      }
                    }}
                  />
                </ListItemButton>

                <ListItemButton onClick={onClose} sx={{ height: 40, px: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Settings"
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 13,
                          fontWeight: 600,
                        },
                      }
                    }}
                  />
                </ListItemButton>

                <Divider sx={{ my: 0.25 }} />

                <ListItemButton onClick={onClose} sx={{ height: 40, px: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <HelpOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="FAQ"
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 13,
                          fontWeight: 600,
                        },
                      }
                    }}
                  />
                </ListItemButton>
              </List>

              {/* footer */}
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    onLogout?.();
                    onClose();
                  }}
                  startIcon={
                    <SvgIcon>
                      <LogoutIcon />
                    </SvgIcon>
                  }
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontWeight: 700,
                    py: 0.8,
                    backgroundColor: "#161519",
                    "&:hover": { backgroundColor: "#FF6B35" },
                    boxShadow: "none",
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Paper>
          </ClickAwayListener>
        </div>
      </Grow>
    </Box>
  );
}
