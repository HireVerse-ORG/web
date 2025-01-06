import { Dialog, DialogTitle, DialogContent, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomDialog = ({ open, onClose, title, children }: CustomDialogProps) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "hsla(241, 50%, 65%, 0.70)",
        },
      }}
    >
      <DialogTitle>
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#E0DFFF",
            borderRadius: "8px",
            backgroundClip: "padding-box",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#8A89D0",
          },
      }}>
        <Box display="flex" flexDirection="column" gap={2}>
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
