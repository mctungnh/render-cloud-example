import React from "react";

import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

import nophothos from "../assets/nophotos.svg";

function ProjectCard(props) {
    return (
        <Card
          style={{
            width: '15rem'
          }}
        >
          <img
            alt="Sample"
            style={{
                height: '10rem',
                backgroundColor: "#909090"
            }}
            src={props.image ? props.image : nophothos}
          />
          <CardBody>
            <CardTitle tag="h5">
              {props.name} <span className="text-muted">#{props.id}</span>
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              {props.category}
            </CardSubtitle>
            <CardText>
              {props.link}
            </CardText>
          </CardBody>
        </Card>
    );
}

export default ProjectCard;
