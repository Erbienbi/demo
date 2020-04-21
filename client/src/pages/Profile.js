import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ownerLogin, userError, clearError } from '../slices/userSlice';

const GET_ONE_USER = gql`
  query getOneUser($token: String!) {
    getOneUser(token: $token) {
      name
      email
      phone
      KTP
      RoomId
    }
  }
`;

function UserProfile(props) {
    const user = useSelector(state => state.user)
    const { error, loading, data, refetch } = useQuery(GET_ONE_USER, {
      variables: {
        token: user.token,
      },
    });

    if (loading) {
        return <h1>Loading...</h1>
    } else {
        console.log('GraphQL:', data)
        return (
            <>
                <Card className="mt-1 p-5 d-flex justify-content-center shadow-sm" style={{ borderRadius: "0.5rem"}}>
                    <h5 style={{ textAlign: "center" }}>{user.name}'s Profile</h5>
                    <div className="d-flex justify-content-center mb-4 p-5">
                        <div style={{ flexDirection:"column", width:"200px"}}>
                        <Card className="mx-3 p-2" style={{borderRadius: "0.5rem"}}>
                            <img
                                style={{width: "150px", height: "150px", borderRadius: "1rem"}}
                                src={user.image
                                    ? user.image
                                    : "https://www.pngkey.com/png/detail/73-730477_first-name-profile-image-placeholder-png.png"
                                }
                            />
                        </Card>
                          <Card className="mx-3 py-4 px-2 mt-2" style={{borderRadius: "0.5rem", height: "200px"}} >
                            <Button className="my-1 btn-success">Informasi KTP</Button>
                            <Button className="my-1 btn-success">Ganti Password</Button>
                            <Button className="my-1 btn-danger">Hapus Akun</Button>
                          </Card>
                        </div>
                        <Card className="py-4 px-4" style={{width: "350px"}}>
                            <p><b>Status</b>: {user.isOwner
                                ? 'Pemilik Kos'
                                : 'Pengguna'
                            }
                            </p>
                            <p>
                              <b>Kamar</b>: {user.RoomId
                                ? `ID kamar: ${user.RoomId}`
                                : <>
                                  'Belum booking'
                                  <Link to="/">
                                    <Button className="btn-success ml-3">Cari Kamar</Button>
                                  </Link>
                                  </>
                              }
                            </p>
                        </Card>
                    </div>
                </Card>
            </>
        );
    }
}

export default UserProfile;