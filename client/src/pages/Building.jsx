import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import Room from "../components/Room";
import BuildingDetail from "../components/BuildingDetail";
import EditBuilding from "../components/EditBuilding";
import AddRoom from '../components/AddRoom'
const GET_ONE_BUILDING = gql`
  query getOneBuilding($id: Int!) {
    getOneBuilding(id: $id) {
      id
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

export default (props) => {
  const { BuildingId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const { error, loading, data, refetch } = useQuery(GET_ONE_BUILDING, {
    variables: {
      id: Number(BuildingId),
    },
  });
  // Taruh card untuk setiap room yang ada di building ini
  // ketika card di-click, bisa redirect ke page RoomDetail atau nggak, bebas
  // Pass props ke card component
  
  if (loading) return <p> Loading....</p>
  if (error) return <p> {error.message} </p>

  if (isLoading) {
    return <p> Loading...</p>
  } else {
    return (
      <>
        <div className="d-flex justify-content-start">
          <div className="w-100">
            <Card
              className="mt-1 shadow-sm p-4 w-100"
              style={{ borderRadius: "0.5rem" }}
            >
              <div className="text-right">
                <EditBuilding building={data.getOneBuilding} />
              </div>
              <hr />
              <BuildingDetail building={data.getOneBuilding} />
            </Card>
            <Card
              className="mt-1 shadow-sm pt-3 px-2 pb-3 w-100"
              style={{ borderRadius: "0.5rem" }}
            >
              <div className="d-flex justify-content-end px-3">
                <span>Have a room to rent?</span>
                {/* <Button onClick={() => props.history.push("/add-room")}>
                  Add Room
                </Button> */}

                <AddRoom id={BuildingId} />
              
              </div>
              <hr />
              <div className="row">
                {data.getOneBuilding.Rooms.map((room) => {
                  return <Room room={room} key={room.id} />;
                })}
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  };
};
