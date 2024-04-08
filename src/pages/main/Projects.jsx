import { Box, Button, Typography } from "@mui/material";
import Container from "./layout/Container";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "../../components/modals/ModalComponent";
import { useTheme } from "@emotion/react";
import AddProject from "./sections/AddProject";
import projectServices from "../../services/projectServices";

function Projects() {

    const [projects, setProjects] = useState([]);

    const [open, setOpen] = useState(false);

    function openModal() {
        setOpen(true);
    }

    function handleModalClose() {
        setOpen(false);
    }

    async function addProject(values) {
        const request = {
            title: values.title,
            description: values.description
        };

        if (values.deadline) {
            request.deadline = values.deadline;
        }

        console.log(request);

        const newProject = await projectServices.createProject(request);
        console.log(newProject);
    }
    
    return(
        <Container>
            <Box sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Button variant="contained" onClick={openModal} sx={{ 
                    alignSelf: "start",
                    marginTop: "5%",
                    padding: "10px"
                }}>
                    <AddIcon />
                </Button>
                <ModalComponent isOpen={open} handleClose={() => handleModalClose()}>
                    <AddProject onSubmit={addProject} />
                </ModalComponent>
            </Box>
        </Container>
    );
}

export default Projects;