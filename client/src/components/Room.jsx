import React from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import conversi from '../helpers/conversi'

export default (props) => {
  const {
    id,
    price,
    UserId,
    BuildingId,
    ac,
    bathroom,
    carPort,
    laundry,
    gender,
    date_occupied,
    image,
  } = props.room;

  console.log(props)
  const viewRoom = ()=>{
  let vr = 'http://localhost:8081/'
    window.open(`${vr}+?BuildingId=${BuildingId}&&RoomId=${id}`,'_newtab')
  }

  if(!props.room){
    return <div>NO ROOM</div>
  }

  return (
    <>
      <div className="col-3 mb-2 ">
        <Card className="shadow-sm" onClick={() => console.log("detail")}>
          <Card.Body>
            <Card.Title>Room {props.num + 1}</Card.Title>
            <div className="my-1">
              <div>Price: {conversi(price)} / month</div>
              <div>AC: {ac ? "Yes" : "No"}</div>
              <div>Bathroom: {bathroom ? "Yes" : "No"}</div>
              <div>Carport: {carPort ? "Yes" : "No"}</div>
              <div>Laundry: {laundry ? "Yes" : "No"}</div>
              <div>Gender: {gender}</div>
            </div>
          </Card.Body>
          <div className="d-flex justify-content-center mb-4">
            <Button className="mr-1" onClick={viewRoom}>
              360 View
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
