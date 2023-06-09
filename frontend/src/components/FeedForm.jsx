import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Project from "./Project";

function FeedForm() {
    const [projectList, setProjectList] = useState([]);
    const fetchProjectData = () => {
        fetch("http://localhost:3000/projects")
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {projects} = data;
                JSON.stringify(projects) !== JSON.stringify(projectList) && setProjectList(projects);
            })
    }

    fetchProjectData();

    return (
        <form className="feed">
            <div className="row">
                {
                    projectList.map((project, index) => {
                        return (
                            <div className="col-lg-2 col-md-3 col-sm-12 ">
                                <div className="text-center w-100 img-frame">
                                    <img src={project.image} className="img-fluid" alt={project.name}/>
                                </div>
                                <Project key={index} id={index} name={project.name} link={project.link} category={project.category}/>
                            </div>
                        );
                    })
                }
            </div>
        </form>
    );
}

export default FeedForm;