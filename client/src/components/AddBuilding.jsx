import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buildingError, clearError } from '../slices/buildingSlice';
import appAxios from '../config/appAxios';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
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
  const [clean] = useMutation(CLEAN, {
    refetchQueries: [
      { query: GET_ALL_BUILDING }
    ]
  })
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
      url: 'http://localhost:3000/building',
      headers: {token:localStorage.owner_token},
      data: formData
    })
    // // const {}
    const addNewBuilding = await clean({
      variables: {
        token: 'asdasdasd'
      }
    })
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
                enctype="multipart/form-data"
              >
                <table>
                  <tbody>
                    <tr>
                      <td>Wilayah</td>
                      <td>
                        <input
                          type="text"
                          name="area"
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>
                        <input
                          type="text"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Titik Peta (insert Google Map here)</td>
                      <td>
                        <input
                          type="text"
                          name="coordinate"
                          onChange={(e) => setCoordinate(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Foto Rumah
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input type="submit" value="Daftarkan!" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
}