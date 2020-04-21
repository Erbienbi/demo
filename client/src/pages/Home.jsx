import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { storeAllBuilding } from "../slices/buildingSlice";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";

import CardComponent from "../components/Card";
import FilterComponent from "../components/Filter"
import AddBuilding from "../components/AddBuilding"
import axios from 'axios'

const GET_ALL_BUILDING = gql`
  query {
    getAllBuilding {
      id
      name
      OwnerId
      area
      address
      coordinate
      image
      Rooms {
        id
        price
        UserId
        BuildingId
        ac
        bathroom
        carPort
        laundry
        gender
        date_occupied
        image
      }
    }
  }
`;


export default () => {
  const dispatch = useDispatch();
  const isOwner = useSelector((state) => state.user.isOwner);
  console.log(isOwner)
  const [isLoading, setIsLoading] = useState(true);
  const building = useSelector((state) => state.building);
  const { error, loading, data, refetch } = useQuery(GET_ALL_BUILDING);

  useEffect(() => {
    if (data) {
      dispatch(storeAllBuilding(data.getAllBuilding));
      setIsLoading(false);
    }
  }, [data]);
  if (loading) return <p> Loading....</p>
  if (error) return <p> {error.message} </p>

  if (isLoading) {
    return <p> Loading...</p>
  } else {
    const buildings = building.allBuildings
    return (
      <>
        <Card className="mt-1 shadow-sm" style={{ borderRadius: "0.5rem" }}>
          <div className="row py-4 px-4 justify-content-start">
            <div className="col-12 mb-3">
              {!isOwner ?
                <FilterComponent />
                :
                <AddBuilding />
              }
            </div>
            {buildings.map((building) => {
              return <CardComponent building={building} key={building.id} />;
            })}
          </div>
        </Card>
      </>
    );
  };
};