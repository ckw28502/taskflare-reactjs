import { func, objectOf } from "prop-types";
import ProjectModel from "../../../models/ProjectModel";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import formatDate from "../../services/dateFormatter,js";
import { useTheme } from "@emotion/react";

function ProjectCard(props){
    const theme = useTheme();

    const deadline = props.project.getDeadline();
    let deadlineStr = (deadline) ? formatDate(deadline) : "NO DEADLINE!!!"

    let dateColor = "inherit";
    if (deadline) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(deadline) <= today) {
            dateColor = theme.palette.danger.main;
        }
    }
    return(
        <Grid item sm={4} xs="auto">
            <Card id={`card-project-${props.project.getId()}`} onClick={() => props.handleClick(props.project.getId())} sx={{ 
                minWidth: 100,
                "&:hover": {
                    cursor: "pointer"
                }
            }}>
                <CardContent>
                    <Typography variant="h3" component="div">
                        {props.project.getTitle()}
                    </Typography>
                    <Typography variant="h5">
                        {props.project.getDescription()}
                    </Typography>
                    <Typography variant="h5" color={dateColor}>
                        {deadlineStr}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

ProjectCard.propTypes = {
    project: objectOf(ProjectModel).isRequired,
    handleClick: func.isRequired
}

export default ProjectCard;