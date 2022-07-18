import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  outline: "none",
  maxWidth: 1600,
  p: 4,
  "& p": {
    fontSize: 18,
  },
};

interface ModalProps {
  className?: string;
  open: boolean;
  children: React.ReactNode;
  contentStyles?: React.CSSProperties;
  handleClose: () => void;
}

export const MainModal: React.FC<ModalProps> = ({
  className,
  open,
  children,
  contentStyles,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      className={className}
      closeAfterTransition
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={contentStyles ?? style}>{children}</Box>
      </Fade>
    </Modal>
  );
};
