import { objectOf } from "prop-types";
import ProjectModel from "../../models/ProjectModel";
import { Card, CardContent, Typography } from "@mui/material";

function ProjectCard(props){
    return(
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.project.title}
                </Typography>
                <Typography variant="body2">
                    {props.project.description}
                </Typography>
                <Typography sx={{ 
                    mb: 1.5,
                    alignItems: "end"
                }} color="text.secondary">
                    adjective
                </Typography>
            </CardContent>
        </Card>
    )
}

ProjectCard.propTypes = {
    project: objectOf(ProjectModel).isRequired
}

export default ProjectCard;