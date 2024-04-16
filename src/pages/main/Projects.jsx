import { Box, Button } from "@mui/material";
import Container from "./layout/Container";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "../../components/modals/ModalComponent";
import AddProject from "./sections/AddProject";
import GetAllProjects from "./sections/GetAllProjects";


function Projects() {
    const [open, setOpen] = useState(false);

    function openModal() {
        setOpen(true);
    }

    function handleModalClose() {
        setOpen(false);
    }
    
    return(
        <Container>
            <Box sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Button id="btn-add" variant="contained" onClick={openModal} sx={{ 
                    alignSelf: "start",
                    marginTop: "5%",
                    marginBottom: "2%",
                    padding: "10px"
                }}>
                    <AddIcon />
                </Button>
                <GetAllProjects />
                <ModalComponent isOpen={open} handleClose={() => handleModalClose()}>
                    <AddProject />
                </ModalComponent>
            </Box>
        </Container>
    );
}

export default Projects;