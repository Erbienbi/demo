import React from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

export default (props) => {
  const {
    id,
    name,
    OwnerId,
    area,
    address,
    coordinate,
    image
  } = props.building
  return (
    <>
      <div className="mb-2 ">
        <div className="my-1">

          <img src={image}></img>
          <h4 class="text-dark">{name}</h4>
          <div>{area}</div>
          <div>{address}</div>
        </div>
        <a href={coordinate} target="_blank" className="btn btn-primary">Show on Map</a>
      </div>
    </>
  );
};
