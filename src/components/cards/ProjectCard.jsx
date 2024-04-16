import { func, objectOf } from "prop-types";
import ProjectModel from "../../../models/ProjectModel";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import formatDate from "../../services/dateFormatter,js";

function ProjectCard(props){
    const deadline = props.project.getDeadline();
    let deadlineStr = (deadline) ? formatDate(deadline) : "NO DEADLINE!!!"
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
                    <Typography variant="h5">
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