import { instanceOf, number } from "prop-types";
import TaskModel from "../../../models/TaskModel";
import { Draggable } from "@hello-pangea/dnd";
import { Box, Card, CardContent, Typography } from "@mui/material";
import formatDate from "../../services/dateFormatter,js";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";


function TaskCard(props) {
    const theme = useTheme();
    const { t } = useTranslation();

    const deadline = props.task.getDeadline();
    const deadlineStr = (deadline) ? formatDate(deadline) : t("NO_DEADLINE");

    const assignee = (props.task.getAssigneeName) ? props.task.getAssigneeName : t("UNASSIGNED");
    
    let dateColor = "inherit";
    if (deadline) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(deadline) <= today) {
            dateColor = theme.palette.danger.main;
        }
    }
    return (
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
                            <Typography variant="h3" component="div">
                                {props.task.getTitle()}
                            </Typography>
                            <Typography variant="h5">
                                {assignee}
                            </Typography>
                            <Typography variant="h5" color={dateColor}>
                                {deadlineStr}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Draggable>
    )
}

TaskCard.propTypes = {
    task: instanceOf(TaskModel).isRequired,
    index: number.isRequired
}

export default TaskCard;