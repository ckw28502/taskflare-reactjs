import { useEffect, useState } from "react";
import Container from "./layout/Container";
import { useParams } from "react-router-dom";
import projectServices from "../../services/projectServices";
import ProjectModel from "../../../models/ProjectModel";
import { Box, Button, Grid, Typography } from "@mui/material";
import { DragDropContext } from "@hello-pangea/dnd";
import Task from "./sections/project/Task";
import { useTheme } from "@emotion/react";
import { Clear, Edit, PersonAdd } from '@mui/icons-material'; // Importing Delete and Edit icons
import ModalComponent from "../../components/modals/ModalComponent";
import EditProject from "./sections/project/view models/EditProject";
import toastify from "../../tools/toastify";
import { useTranslation } from "react-i18next";
import Invite from "./sections/project/Invite";
import RemoveUser from "./sections/project/RemoveUser";
import { useDispatch } from "react-redux";
import projectAction from "../../redux/actions/projectAction";


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
                setModalBody(<RemoveUser projectId={project.getId()} closeModal={() => handleModalClose()} />)
                break;
            case "INVITE":
                setModalBody(<Invite projectId={project.getId()} closeModal={() => handleModalClose()} />)
                break;
            default:
                break;
        }
        setOpen(true);
    }

    function handleModalClose() {
        setOpen(false);
    }

    const warningColor = theme.palette.warning;
    const dangerColor = theme.palette.danger;

    const { projectId } = useParams();

    const [project, setProject] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        projectServices.getDetailProjects(projectId)
            .then(data => {
                const newProject = new ProjectModel(data);
                setProject(newProject);
                dispatch(projectAction.setProjectAction(data));
            })
    }, [dispatch, projectId])

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
            {project && (
                <Container>
                    <Box sx={{
                        marginTop: 5
                    }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item md={6} sm={12}>
                                <Typography variant="h2" id="h2-title">{project.getTitle().toUpperCase()}</Typography>
                            </Grid>
                            <Grid item md={6} sm={12} container spacing={2} justifyContent="flex-end">
                                <Grid item md={3} xs={12}>
                                    <Button id="btn-invite" variant="contained" onClick={() => openModal("INVITE")}sx={{
                                            paddingY: 2,
                                            width: "100%"
                                        }}>
                                        <PersonAdd />
                                    </Button>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Button id="btn-project-edit" variant="contained" onClick={() => openModal("EDIT")} sx={{
                                        backgroundColor: warningColor.main,
                                        paddingY: 2,
                                        width: "100%",
                                        "&:hover": {
                                            backgroundColor: warningColor.hover
                                        }
                                    }}>
                                        <Edit />
                                    </Button>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Button id="btn-project-exit" variant="contained" onClick={() => openModal("EXIT")} sx={{
                                        backgroundColor: dangerColor.main,
                                        paddingY: 2,
                                        width: "100%",
                                        "&:hover": {
                                            backgroundColor: dangerColor.hover,
                                        }
                                    }}>
                                        <Clear />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid> 
                        
                        <DragDropContext>
                            <Task project={project} />
                        </DragDropContext>
                    </Box>
                </Container>
            )}
            {modalBody && (
                <ModalComponent isOpen={open} handleClose={() => handleModalClose()}>
                    {modalBody}
                </ModalComponent>
            )}
        </>
    )
}

export default Project;