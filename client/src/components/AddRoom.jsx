import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { roomError, clearError } from '../slices/roomSlice';
import { gql } from 'apollo-boost';
import appAxios from '../config/appAxios';
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

const GET_ONE_BUILDING = gql`
  query getOneBuilding($id: Int) {
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

const CLEAN = gql`
    mutation clean(
      $token: String
    ) {
      clean(
        token:$token
      ) {
        message
      }
    }
`

const GET_ALL_BUILDING = gql`
    query {
        getAllBuilding{
            id
            OwnerId
            area
            address
        }
    }
`


const ADD_NEW_ROOM = gql `
    mutation postRoom(
        $token: String!
        $BuildingId:Int!
        $price: Int!
        $ac: Boolean
        $bathroom: Boolean
        $carPort: Boolean
        $laundry: Boolean
        $gender: String
        $date_occupied: String
        $image: String
    ) {
        postRoom(
            token:$token
            BuildingId:$BuildingId
            price:$price
            ac:$ac
            bathroom:$bathroom
            carPort:$carPort
            laundry:$laundry
            gender:$gender
            date_occupied:$date_occupied
            image:$image
        ) {
            message
        }
    }
    `

export default (props) => {
  console.log(props.id)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  // const { error, loading, data } = useQuery(GET_ALL_BUILDING);
  // const building = useSelector(state => state.building.allBuildings)

  const room = useSelector((state) => state.room);
  // const [bId, setbId] = useState(0)
  const [price, setPrice] = useState(0)
  const [ac, setAc] = useState(false)
  const [bathroom, setBathroom] = useState(false)
  const [carPort, setcarPort] = useState(false)
  const [laundry, setLaundry] = useState(false)
  const [gender, setGender] = useState('')
  const [image, setImage] = useState("");

  const [clean] = useMutation(CLEAN)

    const { error, loading, data, refetch } = useQuery(GET_ONE_BUILDING, {
      variables: {
        id: Number(props.id),
      },
    });

  
  const submitForm = async (e) => {
    e.preventDefault()
    // console.log(price, ac, bathroom, laundry, carPort, gender, image)
    // setIsLoading(true)
    const token = localStorage.owner_token
    let formData = new FormData();
    formData.append("price", price)
    formData.append("ac", ac);
    formData.append("bathroom", bathroom);
    formData.append("carPort", carPort);
    formData.append("laundry", laundry);
    formData.append("image", image)
    formData.append("gender", gender)
    // console.log(area, address, coordinate, token)
    const z = await axios({
      method: 'POST',
      url: `http://localhost:3000/room/${Number(props.id)}`,
      headers: {token:token},
      data: formData
    })
    const addNewRoom = await clean({
      variables: {
        token: 'asdasdasd'
      }
    })
    await refetch()
  }

  // if (loading) {
  //   return <h1>Loading...</h1>
  if (isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Room
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h1>Add Room</h1>
              {room.error ? <p>{JSON.stringify(room.error)}</p> : ""}
              <form onSubmit={(e) => submitForm(e)} encType="multipart/form-data">
                <div class="form-group">
                  <label for="exampleInputEmail1">Rent price / month</label>
                  <input type="number" class="form-control" onChange={(e) => setPrice(Number(e.target.value))}/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">AC</label>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="ac"
                      value="0"
                      onChange={(e) => setAc(false)}
                    />
                    <label>None</label> 
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                  <input
                      type="radio"
                      name="ac"
                      value="0"
                      onChange={(e) => setAc(true)}
                    />
                    <label>Availble</label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Bathroom</label>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="bathroom"
                      value="0"
                      onChange={(e) => setBathroom(false)}
                    />
                    <label>None</label> 
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                  <input
                      type="radio"
                      name="bathroom"
                      value="0"
                      onChange={(e) => setBathroom(true)}
                    />
                    <label>Availble</label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Car Port</label>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="car"
                      value="0"
                      onChange={(e) => setcarPort(false)}
                    />
                    <label>None</label> 
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                  <input
                      type="radio"
                      name="car"
                      value="1"
                      onChange={(e) => setcarPort(true)}
                    />
                    <label>Availble</label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Laundry</label>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="laundry"
                      value="0"
                      onChange={(e) => setLaundry(false)}
                    />
                    <label>None</label> 
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                  <input
                      type="radio"
                      name="laundry"
                      value="1"
                      onChange={(e) => setLaundry(true)}
                    />
                    <label>Availble</label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Gender</label>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="gender"
                      value="0"
                      onChange={(e) => setGender('Male')}
                    />
                    <label>Male</label> 
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                  <input
                      type="radio"
                      name="gender"
                      value="1"
                      onChange={(e) => setGender('Female')}
                    />
                    <label>Female</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                  <input
                      type="radio"
                      name="gender"
                      value="2"
                      onChange={(e) => setGender('Mix')}
                    />
                    <label>Mix</label>
                  </div>
                  <div class="form-group">
                  <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                    <label>Image</label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}