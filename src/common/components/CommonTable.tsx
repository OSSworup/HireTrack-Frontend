import { useEffect, useState } from "react";
import { DataGrid, type GridColDef, type GridRowId, type GridRowSelectionModel, type GridSortModel } from "@mui/x-data-grid";
import TablePagination from "./TablePagination";
import { usePagination } from "../../hooks/usePagination";
import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";


interface CommonTableProps {
    rows: any[];
    columns: GridColDef[];
    checkboxSelection?: boolean;
    onSelectionChange?: (ids: GridRowId[]) => void;
    sortModel?: GridSortModel;
    onSortModelChange?: (model: GridSortModel) => void;
    initialPageSize?: number;
}

export default function CommonTable({
    rows,
    columns,
    checkboxSelection = false,
    onSelectionChange,
    sortModel,
    onSortModelChange,
    initialPageSize = 10,
}: CommonTableProps) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>({ type: "include", ids: new Set() });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        paginated,
        total,
        startIndex,
        endIndex,
        pageCount,
        safePage,
    } = usePagination(rows, pageSize, page);

    useEffect(() => {
        setPage(1);
    }, [rows]);

    return (
        <>
            <Box sx={{ width: "100%", overflowX: "auto" }}>
                <DataGrid
                    rows={paginated}
                    columns={columns}
                    checkboxSelection={checkboxSelection}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    autoHeight
                    density={isMobile ? "comfortable" : "compact"}
                    getRowHeight={() => 56}
                    sortingOrder={["asc", "desc"]}
                    sortModel={sortModel}
                    onSortModelChange={onSortModelChange}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={(model) => {
                        setRowSelectionModel(model);
                        onSelectionChange?.(Array.from(model.ids));
                    }}
                    sx={{
                        border: "none",

                        "& .MuiDataGrid-cell:focus": {
                            outline: "none",
                        },
                        "& .MuiDataGrid-cell:focus-within": {
                            outline: "none",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            bgcolor: "#FAFAFB",
                            fontWeight: 700,
                            borderBottom: "1px solid #F0F2F5",
                            color: "text.primary",
                            fontSize: 13,
                            minHeight: 40,
                        },
                        "& .MuiDataGrid-row": {
                            "&:nth-of-type(odd)": { bgcolor: "#FFFFFF" },
                            "&:nth-of-type(even)": { bgcolor: "#FAFBFF" },
                            "&:hover": { bgcolor: "rgba(99,102,241,0.03)" },
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "1px solid #F7F8FA",
                            color: "text.primary",
                            py: "8px",
                            display: "flex",
                            alignItems: "center",
                        },
                        width: "100%",
                        "& .MuiDataGrid-footerContainer": { display: "none" },
                    }}
                />
            </Box>


            <TablePagination
                page={safePage}
                pageSize={pageSize}
                pageCount={pageCount}
                total={total}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </>
    );
}
