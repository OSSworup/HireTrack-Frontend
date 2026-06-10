import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface TablePaginationProps {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}


export default function TablePagination({
  page,
  pageSize,
  pageCount,
  total,
  startIndex,
  endIndex,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        mt: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {total === 0 ? 0 : startIndex + 1} to {endIndex} of {total} entries
      </Typography>

      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", flexWrap: "wrap" }}>
        <Select
          value={String(pageSize)}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          size="small"
          sx={{
            width: 80,
            height: 36,
            borderRadius: 1,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
            color: "primary.main",

            "& .MuiSvgIcon-root": {
              color: "primary.main",
            },

            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.18),
            },
          }}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="25">25</MenuItem>
        </Select>

        <IconButton
          size="small"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          <FirstPageIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>

        {pages.map((p) => (
          <Button
            key={p}
            size="small"
            onClick={() => onPageChange(p)}
            sx={{
              minWidth: 36,
              height: 36,
              bgcolor: p === page ? (theme) => alpha(theme.palette.primary.main, 0.25) : "background.paper",
              color: p === page ? "primary.main" : "text.primary",
              "&:hover": {
                bgcolor: p === page ? (theme) => alpha(theme.palette.primary.main, 0.18) : "action.hover",
              },
            }}
          >
            {p}
          </Button>
        ))}

        <IconButton
          size="small"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
        >
          <NavigateNextIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => onPageChange(pageCount)}
          disabled={page === pageCount}
        >
          <LastPageIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
