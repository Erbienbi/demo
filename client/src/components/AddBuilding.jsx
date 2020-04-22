import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buildingError, clearError } from '../slices/buildingSlice';
import appAxios from '../config/appAxios';
import { gql } from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
// import geocoder from 'geocoder'
// import { GrLocationPin } from "react-icons/gr";
import { FaMapPin } from "react-icons/fa";


const ADD_NEW_BUILDING = gql`
    mutation postBuilding(
        $token: String!
        $area: String!
        $address: String!
        $coordinate: String!
        $image: String
    ) {
        postBuilding(
            token:$token
            area:$area
            address:$address
            coordinate:$coordinate
            image:$image
        ) {
            message
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
                bathroom
                carPort
                laundry
                gender
                date_occupied
                image
            }
        }
    }
`
export default (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(state => state.user)
  const building = useSelector(state => state.building)
  // const [form, setForm] = useState({
  //     area: '',
  //     address: '',
  //     coordinate: '',
  //     image: '',
  // });
const [lat, setLat] = useState(-6.26075);
const [lng, setLng] = useState(106.78192);
  const [zoom, setZoom] = useState(19)

  const getDot = (e) => {
    setLat(e.lat);
    setLng(e.lng);
    setCoordinate(`${lat}, ${lng}`)
  };
  // let geocoder = new google.maps.Geocoder();
  
  // const getLocation = (loc) => {
  //   geocoder.geocode(loc,(err,data)=>{
  //     console.log(data, 'INI DATA');
  //     if(typeof data !== "undefined" && data.status === 'OK'){
  //       this.setState({
  //         lat: data.results[0].geometry.location.lat,
  //         lng: data.results[0].geometry.location.lng
  //       })
  //     } else {
  //       return (<h6>no result found</h6>)
  //     }
  //   })
  // }

  useEffect(() => {
    dispatch(clearError())
    // console.log('isLoading is now:', isLoading)
  }, []);
  // const formChange = (e) => {
  //     e.persist()
  //     setForm((prevState) => {
  //         return { ...prevState, [e.target.name] : e.target.value }
  //     })
  // };
  const [area, setArea] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [coordinate, setCoordinate] = useState('')
  const [image, setImage] = useState('')
  const { error, loading, data, refetch } = useQuery(GET_ALL_BUILDING);
  const [clean] = useMutation(CLEAN)
  const submitForm = async (e) => {
    console.log(image, 'image on submit')
    e.preventDefault()
    const token = localStorage.owner_token
    let formData = new FormData();
    formData.append("area", area);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("coordinate", coordinate);
    formData.append("image", image)
    formData.append("token", token);
    // console.log(area, address, coordinate, token)
    await axios({
      method: 'POST',
      url: 'https://enigmatic-inlet-64583.herokuapp.com/building',
      headers: {token:localStorage.owner_token},
      data: formData
    })
    // // const {}
    await clean({
      variables: {
        token: 'asdasdasd'
      }
    })
    await refetch()
    setShow(false)
    // setIsLoading(true)
    // console.log('Form submit:', form)
    // appAxios({
    //     method: 'POST',
    //     url: '/building',
    //     data: form,
    //     headers: {
    //         token: user.token
    //     }
    // })
    // .then(({data}) => {
    //     setIsLoading(false)
    //     console.log('Add building successful!', data)
    //     props.history.push('/')
    // })
    // .catch((err) => {
    //     console.log('Add building failed!', err.response)
    //     dispatch(buildingError(err.response.data))
    //     setIsLoading(false)
    // })

  }
  if (isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        <Button variant="dark" onClick={handleShow}>
          Daftarkan Rumah Saya!
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registrasi Rumah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {building.error ? <p>{JSON.stringify(building.error)}</p> : ""}
              <form
                onSubmit={(e) => submitForm(e)}
                encType="multipart/form-data"
              >
                <>
                  <>
                    <div>
                      <div>Name</div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div>Wilayah</div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="area"
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div>Alamat</div>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div>Foto Rumah</div>
                      <div>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                    </div>
                    {/* <div>
                      <div></div>
                      <div>
                        <input type="submit" value="Daftarkan!" />
                      </div>
                    </div> */}
                  </>
                </>
              </form>
              <div className="mt-3">
                <input
                  className="form-control"
                  type="text"
                  name="coordinate"
                  disabled
                  value={coordinate}
                />
              </div>
              <GoogleMapReact
                style={{
                  width: "100%",
                  height: 350,
                  margin: 10,
                  bottom: 0,
                  position: "relative",
                }}
                center={{ lat: lat, lng: lng }}
                zoom={zoom}
                onClick={(e) => getDot(e)}
              >
                <FaMapPin style={{fontSize: "3em", color: "red"}}></FaMapPin>
              </GoogleMapReact>
              
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={(e) => submitForm(e)}>
              Add Building
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
}