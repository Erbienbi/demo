import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { roomError, clearError } from '../slices/roomSlice';
import { gql } from 'apollo-boost';
import appAxios from '../config/appAxios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Cleave from 'cleave.js/react';

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
  console.log(user, 'a;ldskas;ldkas')
  const history = useHistory()
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
    const number = price.split(',').join('')
    const token = localStorage.owner_token
    let formData = new FormData();
    formData.append("price", Number(number))
    formData.append("ac", ac);
    formData.append("bathroom", bathroom);
    formData.append("carPort", carPort);
    formData.append("laundry", laundry);
    formData.append("image", image)
    formData.append("gender", gender)
    // console.log(area, address, coordinate, token)
    const z = await axios({
      method: 'POST',
      url: `https://enigmatic-inlet-64583.herokuapp.com/room/${Number(props.id)}`,
      headers: {token:token},
      data: formData
    })
    const addNewRoom = await clean({
      variables: {
        token: 'asdasdasd'
      }
    })
    await refetch()
    await setShow(false)
  }

  // if (loading) {
  //   return <h1>Loading...</h1>
  if (isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        {user.isOwner && (
          <Button variant="primary" onClick={handleShow}>
            Add Room
          </Button>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {room.error ? <p>{JSON.stringify(room.error)}</p> : ""}
              <Form
                onSubmit={(e) => submitForm(e)}
                encType="multipart/form-data"
              >
                <Form.Group as={Row}>
                  <Form.Label className="ml-3">Rent price / month</Form.Label>
                  <Col>
                    <Cleave
                      className="ml-2 form-control"
                      options={{ numeral: true }}
                      numeralThousandsGroupStyle={"thousand"}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="form-group row">
                  <label for="exampleInputPassword1" className="col-3">
                    AC
                  </label>
                  <div className="col-9">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="ac"
                        value="0"
                        onChange={(e) => setAc(false)}
                      />
                      <label>None</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="ac"
                        value="0"
                        onChange={(e) => setAc(true)}
                      />
                      <label>Available</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="exampleInputPassword1" className="col-3">
                    Bathroom
                  </label>
                  <div className="col-9">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="bathroom"
                        value="0"
                        onChange={(e) => setBathroom(false)}
                      />
                      <label>None</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="bathroom"
                        value="0"
                        onChange={(e) => setBathroom(true)}
                      />
                      <label>Available</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="exampleInputPassword1" className="col-3">
                    Car Port
                  </label>
                  <div className="col-9">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="car"
                        value="0"
                        onChange={(e) => setcarPort(false)}
                      />
                      <label>None</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="car"
                        value="1"
                        onChange={(e) => setcarPort(true)}
                      />
                      <label>Available</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="exampleInputPassword1" className="col-3">
                    Laundry
                  </label>
                  <div className="col-9">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="laundry"
                        value="0"
                        onChange={(e) => setLaundry(false)}
                      />
                      <label>None</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="laundry"
                        value="1"
                        onChange={(e) => setLaundry(true)}
                      />
                      <label>Available</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="exampleInputPassword1" className="col-3">
                    Gender
                  </label>
                  <div className="col-9">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="gender"
                        value="0"
                        onChange={(e) => setGender("Male")}
                      />
                      <label>Male</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="gender"
                        value="1"
                        onChange={(e) => setGender("Female")}
                      />
                      <label>Female</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="gender"
                        value="2"
                        onChange={(e) => setGender("Mix")}
                      />
                      <label>Mix</label>
                    </div>
                  </div>
                  <div className="form-group row ml-1">
                    <label className="col-3">Image</label>
                    <div className="col-9">
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <small
                  onClick={() => history.push("/tutorial")}
                  className="text-info customeHover"
                >
                  How to Take 360 Image
                </small>
                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => submitForm(e)}>
              Add Room
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}