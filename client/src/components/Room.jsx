import React from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";

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

  const viewRoom = ()=>{
  let vr = 'http://localhost:8081/'
    window.open(`${vr}+?BuildingId=${BuildingId}&&RoomId=${id}`,'_newtab')
  }

  return (
    <>
      <div className="col-3 mb-2 ">
        <Card className="shadow-sm" onClick={() => console.log("detail")}>
          <Card.Body>
            <Card.Title>ROOM</Card.Title>
            <div className="my-1">
              <div class="bold">A-106</div>
              <div>{price}</div>
              <div>ac: {ac ? "Yes" : "No"}</div>
              <div>bathroom: {bathroom ? "Yes" : "No"}</div>
              <div>carPort: {carPort ? "Yes" : "No"}</div>
              <div>laundry: {laundry ? "Yes" : "No"}</div>
              <div>gender: {gender}</div>
            </div>
          </Card.Body>
          <div className="d-flex justify-content-center mb-4">
            <Button className="mr-1" onClick={viewRoom}>
              Show
            </Button>
            <Button className="mr-1">Edit</Button>
          </div>
        </Card>
      </div>
    </>
  );
};
