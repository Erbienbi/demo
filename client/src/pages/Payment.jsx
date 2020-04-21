import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { gql } from "apollo-boost";
import { Card, Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2'

const CONFIRM_PAYMENT = gql`
    mutation postRoom(
        $token: String!
        $BuildingId:Int!
        $price: Int!
        $ac: Boolean
    ) {
        postRoom(
            token:$token
            BuildingId:$BuildingId
            price:$price
            ac:$ac
        ) {
            message
        }
    }
`

// updateRoom(
//   date_occupied: String!
//   BuildingId: Int!
//   RoomId: Int!
//   token: String!
// ) : Message

const UPDATE_ROOM = gql `
    mutation updateRoom(
        $token: String!
        $RoomId: Int!
        $date_occupied: String!
      ) {
        updateRoom(
          token:$token
          RoomId:$RoomId
          date_occupied: $date_occupied
        ) {
          message
        }
      }
`

export default (props) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [addRoom] = useMutation(CONFIRM_PAYMENT)
  const [date, setDate] = useState('')

  const [updateRoom] = useMutation(UPDATE_ROOM)

  const bookRoom = async () => {
    let today = new Date();
    console.log('Date from new date:', JSON.stringify(today))
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    console.log('Today is:', today)
    console.log('Transferred data:', user)
    console.log(location.state, 'data dari state')
    await updateRoom({
      variables: {
        token: localStorage.token,
        RoomId: location.state.id,
        date_occupied: today
      }
    })
    Swal.fire({
      icon: 'success',
      text: 'Thank you for choosing us'
    })
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  useEffect(() => {
    console.log('About to order:', location.state)
  }, [])

  return (
      <>
          <Card className="mt-1 p-5 d-flex justify-content-center shadow-sm" style={{ borderRadius: "0.5rem"}}>
              <h5 style={{ textAlign: "center" }}>Halaman Pembayaran</h5>
              <div className="d-flex justify-content-center mb-4 p-5">
                  <Card className="py-4 px-4" style={{width: "350px"}}>
                      <p><b>Status anda</b>: {user.isOwner
                          ? 'Pemilik Kos'
                          : 'Pengguna'
                      }
                      </p>
                      <p>
                      <b>Detail</b>: {location.state.id
                          ? <>
                              <b>ID kamar</b>: {location.state.id} <br></br>
                              <b>Bangunan</b>: {location.state.BuildingId} <br></br>
                              <b>Harga</b>: {formatter.format(location.state.price)} <br></br>
                              <Button onClick={bookRoom}>Konfirmasi Pembayaran</Button>
                            </>
                          : <>
                            'Tidak tersedia'
                            <Link to="/">
                                <Button className="btn-success ml-3">
                                  Cari Kamar
                                </Button>
                            </Link>
                            </>
                      }
                      </p>
                  </Card>
              </div>
          </Card>
      </>
  );
};