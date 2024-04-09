import { Box, Button, Typography } from "@mui/material";
import Container from "./layout/Container";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "../../components/modals/ModalComponent";
import { useTheme } from "@emotion/react";
import AddProject from "./sections/AddProject";
import projectServices from "../../services/projectServices";
import { useNavigate } from "react-router-dom";


function Projects() {

    const navigate = useNavigate();

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

        const newProjectId = await projectServices.createProject(request)
            .then(data => data.projectId);

        navigate(`/${newProjectId}`);

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