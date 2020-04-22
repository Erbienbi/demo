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
      <div className="mb-2 text-center">
        <div className="my-1">

          <img src={image} width="1000px" height="500px" className="rounded"></img>
          <b><h4 class="text-dark mt-3">{name}</h4></b>
          <div className="mt-3">{address}</div>
        </div>
        <a href={coordinate} target="_blank" className="btn btn-primary mt-3">Show on Map</a>
      </div>
    </>
  );
};