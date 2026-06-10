import { Box, Paper, Skeleton, Stack } from "@mui/material";

export default function TableLoadingSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2.5 },
        border: "1px solid #EDEFF3",
        background: "#fff",
        borderRadius: 1.5,
      }}
    >
      <Skeleton variant="text" width={80} height={28} sx={{ mb: 1.25 }} />

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          width: "100%",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Skeleton variant="rounded" height={40} sx={{ flex: 1, borderRadius: 1 }} />
        <Skeleton
          variant="rounded"
          width={112}
          height={40}
          sx={{ borderRadius: 1, display: { xs: "none", sm: "block" } }}
        />
      </Box>

      <Box sx={{ borderBottom: "1px solid #F0F2F5", mb: 1 }} />

      <Stack spacing={1}>
        <Skeleton variant="rounded" height={40} sx={{ borderRadius: 1 }} />
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            height={56}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Stack>
    </Paper>
  );
}
