import React from "react";
import { Card } from "react-bootstrap";
import CardComponent from "./Card";
import FilterComponent from "./Filter"

export default () => {
  return (
    <>
      <Card className="mt-1 shadow-sm" style={{ borderRadius: "0.5rem" }}>
        <div className="row py-4 px-4 justify-content-start">
          <div className="col-12 mb-3">
            <FilterComponent />
          </div>
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
