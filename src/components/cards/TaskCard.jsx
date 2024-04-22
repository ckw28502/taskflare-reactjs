import { func, instanceOf, number } from "prop-types";
import TaskModel from "../../../models/TaskModel";
import { Draggable } from "@hello-pangea/dnd";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import formatDate from "../../services/dateFormatter,js";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Delete, Edit } from "@mui/icons-material";
import ModalComponent from "../modals/ModalComponent";
import { useState } from "react";
import EditTask from "../../pages/main/sections/project/view models/EditTask";
import taskServices from "../../services/taskServices";
import toastify from "../../tools/toastify";


function TaskCard(props) {
    const theme = useTheme();
    const { t } = useTranslation();

    const deadline = props.task.getDeadline();
    const deadlineStr = (deadline) ? formatDate(deadline) : t("NO_DEADLINE");

    const assignee = (props.task.getAssigneeName()) ? props.task.getAssigneeName() : t("UNASSIGNED");
    
    let dateColor = "inherit";
    if (deadline) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(deadline) <= today) {
            dateColor = theme.palette.danger.main;
        }
    }

    const warningColor = theme.palette.warning;
    const dangerColor = theme.palette.danger;

    const [open, setOpen] = useState(false);
    const [modalBody, setModalBody] = useState(null);

    function handleModalClose() {
        setOpen(false);
        setModalBody(null);
    }

    async function handleSubmit(values) {
        const request = {
            id: props.task.getId(),
            positionId: values.positionId,
            title: values.title,
            description: values.description
        };

        if (values.deadline) {
            request.deadline = values.deadline;
        }

        taskServices.editTask(request)
            .then(data => {
                handleModalClose();
                toastify.success(t("success.TASK_MODIFIED"));

                const modifiedTask = new TaskModel(data);
                props.editTask(modifiedTask);
            });
    }

    function openModal(mode) {
        switch (mode) {
            case "EDIT":
                setModalBody(<EditTask task={props.task} handleSubmit={async(values) => await handleSubmit(values)} />);
                break;
        
            default:
                setModalBody(null);
                break;
        }
        setOpen(true);
    }

    return (
        <>
            <Draggable draggableId={props.task.getId()} index={props.index}>
                {provided => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                            my: 2
                        }}
                    >
                        <Card id={`card-project-${props.task.getId()}`} sx={{ 
                            minWidth: 100,
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item lg={9} md={12}>
                                        <Typography variant="h3" component="div">
                                            {props.task.getTitle()}
                                        </Typography>
                                        <Typography variant="h5">
                                            {assignee}
                                        </Typography>
                                        <Typography variant="h5" color={dateColor}>
                                            {deadlineStr}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={3} md={12} container spacing={2} direction="column">
                                        <Grid item xs={6} display="flex" alignItems="center" width="100%">
                                            <Button 
                                                id={`edit-task-${props.task.getId()}`} 
                                                variant="contained" 
                                                onClick={() => openModal("EDIT")}
                                                sx={{
                                                    width: "100%",
                                                    p: 1,
                                                    backgroundColor: warningColor.main,
                                                    "&:hover": {
                                                        backgroundColor: warningColor.hover
                                                    }
                                                }}
                                            >
                                                <Edit />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} display="flex" alignItems="center" width="100%">
                                            <Button id={`delete-task-${props.task.getId()}`} variant="contained" sx={{
                                                width: "100%",
                                                p: 1,
                                                backgroundColor: dangerColor.main,
                                                "&:hover": {
                                                    backgroundColor: dangerColor.hover
                                                }
                                            }}>
                                                <Delete />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Draggable>
            {modalBody && (
                <ModalComponent isOpen={open} handleClose={() => handleModalClose()}>
                    {modalBody}
                </ModalComponent>
            )}
        </>
    )
}

TaskCard.propTypes = {
    task: instanceOf(TaskModel).isRequired,
    index: number.isRequired,
    editTask: func.isRequired
}

export default TaskCard;