
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface deleteDialogProps {
    deleteOpen: boolean;
    onDeleteClose: () => void;
    confirmDelete: () => Promise<void>;
    message: string;
    isDeleting: boolean;
}

export default function DeleteDialog({
    deleteOpen,
    onDeleteClose,
    confirmDelete,
    message,
    isDeleting,
}: deleteDialogProps) {
    const handleDelete = async () => {

        await confirmDelete();
        onDeleteClose();
    }
    return (<Dialog
        open={deleteOpen}
        onClose={onDeleteClose}
        maxWidth="xs"
        sx={{ borderRadius: 1 }}
        fullWidth
    >

        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
            <Typography>
                {message || "Are You sure you want to delete this item ?"}
            </Typography>
        </DialogContent>

        <DialogActions>
            <Button
                sx={{ height: 36, textTransform: "none", fontWeight: 600, px: 2, borderRadius: 1, width: { xs: "48%", sm: "auto" }, fontSize: 13 }}
                onClick={() => onDeleteClose()}
                disabled={isDeleting}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ background: "#161519", height: 36, textTransform: "none", fontWeight: 600, px: 2, borderRadius: 1, "&:hover": { background: "#ff6b35" }, width: { xs: "48%", sm: "auto" }, fontSize: 13 }}
                disabled={isDeleting}
            >
                {
                    isDeleting && (
                        <CircularProgress
                            size={18}
                            sx={{ mr: 1 }}
                            color="inherit"
                        />
                    )
                }
                Delete
            </Button>
        </DialogActions>

    </Dialog>);
}