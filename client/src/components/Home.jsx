import React from "react";
import { Card } from "react-bootstrap";
import CardComponent from "./Card";

export default () => {
  return (
    <>
      <Card className="mt-1 shadow-sm" style={{ borderRadius: "0.5rem" }}>
        <div className="row py-2 px-4 justify-content-start">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
      </Card>
    </>
  );
};
