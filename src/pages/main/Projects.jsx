import { Box, Button } from "@mui/material";
import Container from "./layout/Container";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "../../components/modals/ModalComponent";
import AddProject from "./sections/projects/view models/AddProject";
import GetAllProjects from "./sections/projects/GetAllProjects";
import { useDispatch } from "react-redux";
import projectAction from "../../redux/actions/projectAction";


function Projects() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    function openModal() {
        setOpen(true);
    }

    function handleModalClose() {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(projectAction.removeProjectAction());
    }, [dispatch]);
    
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