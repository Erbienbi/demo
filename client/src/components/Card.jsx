import React from 'react'
import { Card, ButtonGroup, Button } from "react-bootstrap";

export default () => {
  return (
    <>
      <div className="col-3 mb-2 ">
        <Card className="customeHover" onClick={() => console.log("detail")}>
          <Card.Img
            variant="top"
            src="https://i.pinimg.com/236x/c3/0a/af/c30aafaabbb9c36e17dfbe4e6385bbda--jakarta.jpg"
          />
          <Card.Body>
            <Card.Title>Koi Residence</Card.Title>
            <div className="my-1">
              <div>Rp 2.300.000</div>
              <div>Kebayoran Lama</div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}