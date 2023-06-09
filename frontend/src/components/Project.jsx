import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Project(props) {
    return (
        <div className="project">
            <h1>{props.name}</h1>
            <a href={props.link}>github</a>
            <p>tags: {props.category}</p>
        </div>
    );
}

export default Project;