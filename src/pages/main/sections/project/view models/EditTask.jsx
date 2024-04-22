import { func, instanceOf } from "prop-types";
import { forwardRef } from "react";
import TaskForm from "../TaskForm";
import TaskModel from "../../../../../../models/TaskModel";

const EditTask = forwardRef(function EditTask(props, ref) {
    const initialValues = {
        positionId: props.task.getAssigneeId(),
        title: props.task.getTitle(),
        description: props.task.getDescription(),
        deadline: props.task.getDeadline()
    }
    return (
        <TaskForm 
            ref={ref}
            initialValues={initialValues}
            onSubmit={async(values) => await props.handleSubmit(values)}
            title= "EDIT_TASK"
        />
    )
})

EditTask.propTypes = {
    handleSubmit: func.isRequired,
    task: instanceOf(TaskModel).isRequired
}

export default EditTask;
