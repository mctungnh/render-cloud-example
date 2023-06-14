import React, { useState } from "react";

import { Row } from "reactstrap";
import ProjectCard from "./ProjectCard";

const Content = () => {
  const [projectList, setProjectList] = useState([]);

  fetch("http://localhost:8000/projects")
          .then(response => {
              return response.json();
          })
          .then(data => {
              const {projects} = data;
              JSON.stringify(projects) !== JSON.stringify(projectList) && setProjectList(projects);
          })

  return (
    <div className="next-steps my-5">
      <Row className="d-flex justify-content-between">
        {projectList.map((project, index) => {
            return (
              <ProjectCard key={index} id={index} image={project.image} name={project.name} link={project.link} category={project.category} />
            );
          })}
      </Row>
    </div>
  );
}

export default Content;
