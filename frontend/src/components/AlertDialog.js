import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Button,
    DialogActions
} from "@mui/material";

const AlertDialog = ({ title, subtitle, children, isOpen, handleClose, handleConfirm }) => {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{subtitle}</DialogContentText>
                <Divider />
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;