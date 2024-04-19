import { useEffect, useState } from "react";
import Container from "./layout/Container";
import { useParams } from "react-router-dom";
import projectServices from "../../services/projectServices";
import ProjectModel from "../../../models/ProjectModel";
import { Box, Button, Grid, Typography } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import Task from "./sections/project/Task";
import { useTheme } from "@emotion/react";
import { Clear, Edit } from '@mui/icons-material'; // Importing Delete and Edit icons
import ModalComponent from "../../components/modals/ModalComponent";
import EditProject from "./sections/projects/view models/EditProject";
import toastify from "../../tools/toastify";
import { useTranslation } from "react-i18next";


function Project(){
    const theme = useTheme();

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const [modalBody, setModalBody] = useState(null);

    function openModal(mode) {
        switch (mode) {
            case "EDIT":
                setModalBody(<EditProject project={project} onSubmit={async(values) => editProject(values)}/>);
                break;
            case "EXIT":
                break;
            default:
                break;
        }
        setOpen(true);
    }

    function handleModalClose() {
        setOpen(false);
    }

    const warningColor = theme.palette.warning.main;
    const dangerColor = theme.palette.danger.main;

    const { projectId } = useParams();

    const [project, setProject] = useState(null);

    useEffect(() => {
        projectServices.getDetailProjects(projectId)
            .then(data => setProject(new ProjectModel(data)))
    }, [projectId])

    async function editProject(values) {
        const request = {
            title: values.title,
            description: values.description
        };

        if (values.deadline) {
            request.deadline = values.deadline;
        }

        await projectServices.editProject(values);

        project.editProject(values);

        toastify.success(t("success.PROJECT_MODIFIED"));

        handleModalClose();
    }
    return(
        <>
            <Container>
                {project && (
                    <Box sx={{
                        marginTop: 5
                    }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item md={6} sm={12}>
                                <Typography variant="h2">{project.getTitle().toUpperCase()}</Typography>
                            </Grid>
                            <Grid item md={6} sm={12} container spacing={2} justifyContent="flex-end">
                                <Grid item md={2} sm={5} xs={12}>
                                    <Button id="btn-project-edit" variant="contained" onClick={() => openModal("EDIT")} sx={{
                                        backgroundColor: warningColor,
                                        paddingY: 2,
                                        width: "100%"
                                    }}>
                                        <Edit />
                                    </Button>
                                </Grid>
                                <Grid item md={2} sm={5} xs={12}>
                                    <Button id="btn-project-exit" variant="contained" sx={{
                                        backgroundColor: dangerColor,
                                        paddingY: 2,
                                        width: "100%"
                                    }}>
                                        <Clear />
                                    </Button>
                                </Grid>
                        </Grid>
                        </Grid> 
                        <DragDropContext>
                            <Task />
                        </DragDropContext>
                    </Box>
                )}
            </Container>
            <ModalComponent isOpen={open} handleClose={() => handleModalClose()}>
                {modalBody}
            </ModalComponent>
        </>
    )
}

export default Project;