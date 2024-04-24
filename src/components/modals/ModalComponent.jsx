import { useTheme } from "@emotion/react";
import { Modal, Box } from "@mui/material";
import { bool, func, node } from "prop-types";

function ModalComponent({ children, isOpen, handleClose }) {
    const theme = useTheme();

    const containerColor = theme.palette.container;
    const borderColor = theme.palette.border;
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal"
            aria-describedby="description"
            sx={{
                alignSelf: "center",
                justifySelf: "center",
            }}
        >
            <Box tabIndex={-1} sx={{
                backgroundColor: containerColor,
                border: `2px solid ${borderColor}`,
                boxShadow: 24,
                p: 4,
                width: 400
            }}>
                {children}
            </Box>
        </Modal>
    )
}

ModalComponent.propTypes = {
    children: node.isRequired,
    isOpen: bool.isRequired,
    handleClose: func.isRequired 
}

export default ModalComponent;