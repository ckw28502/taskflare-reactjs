import { useEffect, useState } from "react";
import projectServices from "../../../../services/projectServices";
import { Grid } from "@mui/material";
import ProjectCard from "../../../../components/cards/ProjectCard";
import ProjectModel from "../../../../../models/ProjectModel";
import { useNavigate } from "react-router-dom";

function GetAllProjects(){
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        projectServices.getAllProjects()
        .then(data => {
            const retrievedProjects = data.map(datum => new ProjectModel(datum))

            setProjects(retrievedProjects);
        })
    }, [])

    function handleClick(projectId){
        navigate(`/${projectId}`);
    }
    
    const projectCards = projects.map(project => <ProjectCard project={project} key={project.getId()} handleClick={handleClick} />)

    return(
        <Grid container spacing={2}>
            {projectCards}
        </Grid>
    )
}

export default GetAllProjects;