import { useTheme } from "@emotion/react";
import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { arrayOf, func, instanceOf, string } from "prop-types";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../../../components/modals/ModalComponent";
import { useEffect, useState } from "react";
import AddTask from "./view models/AddTask";
import { useSelector } from "react-redux";
import taskServices from "../../../../services/taskServices";
import TaskModel from "../../../../../models/TaskModel";
import TaskCard from "../../../../components/cards/TaskCard";
import { Droppable } from "@hello-pangea/dnd";
import toastify from "../../../../tools/toastify";


function TaskGroup(props) {
    const { t } = useTranslation();

    const theme = useTheme();
    const containerColor = theme.palette.container;
    
    const projectId = useSelector(state => state.project.id);

    const [open, setOpen] = useState(false);

    function handleModalClose() {
        setOpen(false);
    }

    async function createTask(values) {
        const request = {
            title: values.title,
            description: values.description,
            projectId
        };

        if (values.positionId) {
            request.positionId = values.positionId;
        }

        if (values.deadline) {
            request.deadline = values.deadline;
        }

        taskServices.createTask(request)
            .then(data => {
                handleModalClose();
                const task = new TaskModel(data);
                props.addTask(task);
                toastify.success(t("success.TASK_CREATED"));
            });
    }

    const [taskCards, setTaskCards] = useState([]);

    useEffect(() => {
        setTaskCards(props.tasks.map((task, index) => 
            <TaskCard key={index} task={task} index={index} editTask={modifiedTask => props.editTask(modifiedTask)} />
        ));
    }, [props, props.tasks]);
    

    return(
        <>
            <Box sx={{
                backgroundColor: containerColor,
                position: "relative",
                minHeight: "10vh",
                p: 2
            }}>
                {props.title === "PLANNED" && (
                    <Box position="absolute" display="flex" justifyContent="flex-end" width="100%" px={4}>
                        <Button variant="contained" id="btn-task-add" onClick={() => setOpen(true)}><Add /></Button>
                    </Box>
                )}
                <Box display="flex" justifyContent="center" marginTop={7}>
                    <Typography variant="h4">{t(props.title)}</Typography>
                </Box>
                <Divider />
                <Droppable droppableId={props.title}>
                    {provided => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {taskCards}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </Box>
            <ModalComponent isOpen={open} handleClose={() => handleModalClose()}>
                <AddTask handleSubmit={async(values) => await createTask(values)} />
            </ModalComponent>
        </>
    )
}

TaskGroup.propTypes = {
    title: string.isRequired,
    tasks: arrayOf(instanceOf(TaskModel)).isRequired,
    addTask: func,
    editTask: func.isRequired
};

export default TaskGroup;