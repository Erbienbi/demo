import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { storeAllBuilding } from "../slices/buildingSlice";
import { gql } from "apollo-boost";
import Carousel from "../components/Carousel";

import { Card } from "react-bootstrap";

import CardComponent from "../components/Card";
import FilterComponent from "../components/Filter";
import AddBuilding from "../components/AddBuilding";

const GET_ALL_BUILDING = gql`
  query {
    getAllBuilding {
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

export default () => {
  const dispatch = useDispatch();
  const isOwner = useSelector((state) => state.user.isOwner);
  const [isLoading, setIsLoading] = useState(true);
  let buildings = useSelector((state) => state.building.allBuildings) || [];
  const { error, loading, data } = useQuery(GET_ALL_BUILDING);
  const [search, setSearch] = useState({
    searchQuery: '',
    result: []
  })

  useEffect(() => {
    if (data) {
      dispatch(storeAllBuilding(data.getAllBuilding));
      setIsLoading(false);
    }
  }, [data]);

  const handleInput = (e) => {
    let searchQuery = e.target.value;

    setSearch(prevState => {
      return { ...prevState, searchQuery: searchQuery }
    });

    console.log('Search criteria:', search.searchQuery)
  }

  const enterSearch = (e) => {
    e.preventDefault()
    console.log('Enter search', search.searchQuery)
    buildings = buildings.filter(each => {
      console.log(each.area)
      console.log(search.searchQuery)
      return each.area.toLowerCase().indexOf(search.searchQuery.toLowerCase()) !== -1
    })
    setSearch(prevState => {
      return { ...prevState, result: buildings }
    });
    console.log('Result of search:', buildings)
  }

  if (error) {
    return <p> {error.message} </p>
  } else {
    console.log('Data of buildings', buildings)
    return (
      <>
        <Card className="mt-1 shadow-sm" style={{ borderRadius: "0.5rem" }}>
          <Carousel/>
          <div className="row py-4 px-4 justify-content-start">
            <div className="col-12 mb-3">
              {!isOwner ?
                <FilterComponent handleInput={handleInput} enterSearch={enterSearch} />
                :
                <div style={{display: "flex", justifyContent: "center"}}>
                <AddBuilding style={{margin: "auto"}}/>
                </div>
              }
            </div>
            {isLoading || loading
              ? <p> Loading...</p>
              : <>
                {search.result.length > 0 
                ? search.result.map((building) => {
                  return <CardComponent building={building} key={building.id} />;
                })
                : buildings.map((building) => {
                  return <CardComponent building={building} key={building.id} />;
                })}
                </>
            }
          </div>
        </Card>
      </>
    );
  };
};