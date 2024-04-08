import { Modal, Box } from "@mui/material";
import { bool, func, node } from "prop-types";

function ModalComponent({ children, isOpen, handleClose }) {

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
            <Box tabIndex={-1}>
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