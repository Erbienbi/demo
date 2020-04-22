import React from "react";
import { Card, Alert, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default (props) => {
  const {
    id,
    name,
    OwnerId,
    area,
    address,
    coordinate,
    Rooms,
    image
  } = props.building;
  const available = Rooms.filter(i => {
    return !i.date_occupied
  })
  return (
    
    <>
      <div className="col-3 mb-2 ">
        <Link key={id} to={`/building/${id}`} className="btn">
          <Card className="customeHover" style={{ width:"100%", height:"100%" }}>
            <Card.Img variant="top" src={image} width='100px' height='150px' />
            <Card.Body>
              <Card.Title>
                <h6>{name}</h6>
              </Card.Title>
              <div className="my-1">
                <h6 style={{ fontSize:"15px", color:"green" }}>{area}</h6>
                {
                  Rooms
                  ? <Alert variant="info" style={{padding: "0px", marginTop: "20px"}}>{available.length} rooms available</Alert>
                  : <Alert variant="danger" style={{padding: "0px", marginTop: "20px"}}>No room available</Alert>
                }
              </div>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
};
