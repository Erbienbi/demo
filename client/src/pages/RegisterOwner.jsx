import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export default () => {
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
              <h4>Register as Owner</h4>
            </Card>
          </div>
          <div className="mt-5">
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="+62xxxxxx" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Upload KTP</Form.Label>
                <Form.Control type="file" placeholder="" accept="image/*" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="text-center">
                <Button variant="info" type="submit" className="mt-5">
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};
