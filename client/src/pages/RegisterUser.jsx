import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userError, clearError } from "../slices/userSlice";
import appAxios from "../config/appAxios";
import { Card, Form, Button } from "react-bootstrap";

export default (props) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(state => state.user)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearError())
    // console.log('isLoading is now:', isLoading)
  }, [user.isAuthenticated]);

  const formChange = (e) => {
    e.persist()
    setForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  };

  const submitForm = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('Form submit:', form)
    appAxios({
      method: 'POST',
      url: '/user/register',
      data: form,
    })
      .then(() => {
        setIsLoading(false)
        console.log('Register successful!')
        props.history.push('/login-user')
      })
      .catch((err) => {
        console.log('Register failed!', err.response)
        dispatch(userError(err.response.data))
        setIsLoading(false)
      })
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  } else if (user.authenticated) {
    return <Redirect to='/' />
  } else {
    return (
      <>
        <div className="d-flex justify-content-center mb-4">
          <Card
            className="mt-5 p-4 shadow-sm  px-5"
            style={{ borderRadius: "0.5rem" }}
          >
            <div className="d-flex justify-content-center">
              <Card
                className="px-4 pt-2 rounded-pill"
                style={{ marginTop: "-3em" }}
              >
                <h4>Register as User</h4>
              </Card>
            </div>
            <div className="mt-5">
              <Form onSubmit={submitForm}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    onChange={formChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={formChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={formChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="info" type="submit" className="mt-5">
                    Register
                  </Button>
                </div>
              </Form>
            </div>
            <div className="mt-4">
              <span>Trying to register your room? </span>
              <Button onClick={() => props.history.push("/register-owner")} className="p-0">
                Click here
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
  };
}