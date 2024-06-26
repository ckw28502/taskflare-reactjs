import { Grid } from "@mui/material";
import TaskGroup from "./TaskGroup";
import { useCallback, useEffect, useState } from "react";
import taskServices from "../../../../services/taskServices";
import { instanceOf } from "prop-types";
import ProjectModel from "../../../../../models/ProjectModel";
import TaskModel from "../../../../../models/TaskModel";
import { DragDropContext } from "@hello-pangea/dnd";

function Task(props) {
    const [tasks, setTasks] = useState([]);
    const [plannedTasks, setPlannedTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [finishedTasks, setFinishedTasks] = useState([]);

    const filterTasks = useCallback(() => {
        const newPlannedTasks = tasks.filter(task => task.getStatus() === "PLANNED");
        setPlannedTasks(newPlannedTasks);
        const newInProgressTasks = tasks.filter(task => task.getStatus() === "IN_PROGRESS");
        setInProgressTasks(newInProgressTasks);
        const newFinishedTasks = tasks.filter(task => task.getStatus() === "FINISHED");
        setFinishedTasks(newFinishedTasks);
    }, [tasks]);

    useEffect(() => {
        taskServices.getAllTasks(props.project.getId())
            .then(data => {
                const taskData = data.map(datum => new TaskModel(datum));
                setTasks(taskData);
            })
    }, [props.project]);

    useEffect(() => filterTasks(), [filterTasks])

    function addTask(newTask) {
        setTasks([...tasks, newTask]);
    }

    function editTask(modifiedTask) {
        setTasks(oldTasks => oldTasks.map(task => (task.getId() === modifiedTask.getId() ? modifiedTask : task)));
    }

    function deleteTask(taskId) {
        setTasks(oldTasks => oldTasks.filter(task => task.getId() !== taskId));
    }

    async function changeTaskStatus(result) {
        if (!result.destination) {
            return;
        }

        const id = result.draggableId;
        const status = result.destination.droppableId;

        taskServices.changeTaskStatus({
            id,
            status
        })
            .then(() => {
                const updatedTasks = tasks.map(task => {
                    if (task.getId() === id) {
                        task.setStatus(status);
                    }
                    return task;
                })
                setTasks(updatedTasks);
            })
    }

    return(
        <DragDropContext onDragEnd={result => changeTaskStatus(result)}>
            <Grid container spacing={2} sx={{
            marginY: 5
        }}>
            <Grid item md={4} xs={12}>
                <TaskGroup 
                    title="PLANNED" 
                    tasks={plannedTasks} 
                    addTask={newTask => addTask(newTask)} 
                    editTask={modifiedTask => editTask(modifiedTask)}
                    deleteTask={taskId => deleteTask(taskId)}     
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <TaskGroup 
                    title="IN_PROGRESS" 
                    tasks={inProgressTasks} 
                    editTask={modifiedTask => editTask(modifiedTask)}
                    deleteTask={taskId => deleteTask(taskId)}     
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <TaskGroup 
                    title="FINISHED"
                    tasks={finishedTasks} 
                    editTask={modifiedTask => editTask(modifiedTask)} 
                    deleteTask={taskId => deleteTask(taskId)}
                />
            </Grid>
        </Grid>
        </DragDropContext>
    );
}

Task.propTypes = {
    project: instanceOf(ProjectModel).isRequired
}

export default Task;
