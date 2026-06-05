
// Unauthorized.tsx

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <LockOutlinedIcon
            sx={{
              fontSize: 72,
              color: "error.main",
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Access Denied
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
            }}
          >
            You don't have permission to view this page.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Go Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized;