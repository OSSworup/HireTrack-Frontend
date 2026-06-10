// common/sideNavItem.tsx
import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface ChildItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

interface Props {
  label: string;
  icon: React.ReactNode;
  active: boolean; // parent active flag (from caller)
  open: boolean;
  onClick?: () => void;
  childrenItems?: ChildItem[];
}

export default function SideNavItem({
  label,
  icon,
  active,
  open,
  onClick,
  childrenItems,
}: Props) {
  const hasChildren = Array.isArray(childrenItems) && childrenItems.length > 0;


  const anyChildActive = hasChildren && childrenItems!.some((c) => c.active === true);

  const parentSelected = Boolean(active && !anyChildActive);

  const [expanded, setExpanded] = React.useState<boolean>(() => !!anyChildActive);

  React.useEffect(() => {
    if (anyChildActive) setExpanded(true);
  }, [anyChildActive, childrenItems]);

  const handleToggle = () => {
    if (hasChildren && open) {
      setExpanded((s) => !s);
    } else {
      onClick?.();
    }
  };

  return (
    <>
      <ListItemButton
        // use parentSelected instead of incoming `active`
        selected={parentSelected}
        onClick={handleToggle}
        dense
        sx={{
          borderRadius: 2,
          mb: 0.5,
          mr: 0.5,
          minHeight: "unset",
          py: 1,
          position: "relative",
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          "&.Mui-selected, &.Mui-selected:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
            color: "primary.main",
          },
          "&::before": parentSelected
            ? {
              content: '""',
              position: "absolute",
              left: 8,
              top: 8,
              bottom: 8,
              width: 3,
              borderRadius: 3,
              bgcolor: "primary.main",
            }
            : undefined,
          color: parentSelected ? "primary.main" : "text.secondary",
          "&:hover": {
            bgcolor: open ? (theme) => alpha(theme.palette.primary.main, 0.06) : undefined,
            color: "primary.main",
          },
          bgcolor: parentSelected
            ? undefined
            : anyChildActive
              ? (theme) => alpha(theme.palette.primary.main, 0.06)
              : "transparent"
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            color: parentSelected ? "primary.main" : "inherit",
          }}
        >
          {icon}
        </ListItemIcon>

        <ListItemText
          primary={label}
          slotProps={{
            primary: {
              sx: {
                fontSize: "0.875rem",
                fontWeight: 500,
              },
            }
          }}
          sx={{
            opacity: open ? 1 : 0,
            whiteSpace: "nowrap",
            display: open ? "block" : "none",
            my: 0,
          }}
        />

        {open && hasChildren ? (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((s) => !s);
            }}
            sx={{ ml: "auto" }}
            aria-label={expanded ? "collapse" : "expand"}
          >
            {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </IconButton>
        ) : null}
      </ListItemButton>

      {/* Nested children (only visible when drawer is expanded) */}
      {hasChildren && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box component="div">
            {childrenItems!.map((c, i) => (
              <ListItemButton
                key={i}
                onClick={() => {
                  setExpanded(true);
                  c.onClick && c.onClick();
                }}
                selected={c.active} // child controls its own selected state
                dense
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  mr: 0.5,
                  minHeight: "unset",
                  py: 1,
                  position: "relative",
                  px: 2.5,
                  justifyContent: "initial",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                    color: "primary.main",
                  },
                  "&::before": c.active
                    ? {
                      content: '""',
                      position: "absolute",
                      left: 8,
                      top: 8,
                      bottom: 8,
                      width: 3,
                      borderRadius: 3,
                      bgcolor: "primary.main",
                    }
                    : undefined,
                  color: c.active ? "primary.main" : "text.secondary",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                    color: "primary.main",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: c.active ? "primary.main" : "inherit",
                  }}
                >
                  {c.icon ?? <FiberManualRecordIcon sx={{ fontSize: 10 }} />}
                </ListItemIcon>

                <ListItemText
                  primary={c.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: c.active ? "primary.main" : "text.secondary"
                      }
                    }
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
            ))}
          </Box>
        </Collapse>
      )}
    </>
  );
}
