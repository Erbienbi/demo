import React from "react";
import { Card, ButtonGroup, Button, FormGroup, Form, Col } from "react-bootstrap";

export default (props) => {
  return (
    <>
      <Card>
        <div className="m-2 p-2">
          <Form className="row mx-2">
            <Form.Group className="m-auto text-center">
              <Form.Label>Cari berdasarkan wilayah:</Form.Label>
              <Form.Control as="select" custom 
                onChange={props.handleInput}>
                <option disabled defaultValue>Nama Wilayah</option>
                <option>Jakarta Barat</option>
                <option>Jakarta Selatan</option>
                <option>Jakarta Timur</option>
                <option>Jakarta Utara</option>
                <option>Jakarta Pusat</option>
              </Form.Control>
              <Button variant="success" type="submit" onClick={props.enterSearch} style={{marginTop: "10px", width: "150px"}}>
                Cari
              </Button>
            </Form.Group>
            {/* <Form.Group className="mr-1 text-center">
              <Form.Label>Jangka Waktu</Form.Label>
              <Form.Control as="select" custom>
                <option>Semua</option>
                <option>Harian</option>
                <option>Bulanan</option>
                <option>Tahunan</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mr-1 text-center">
              <Form.Label>Harga</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control type="text" placeholder="dari" />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="sampai" />
                </Col>
              </Form.Row>
            </Form.Group> */}
            {/* <Form.Group className="mr-1 text-center">
              <Form.Label>Nama Kost</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama"
                />
            </Form.Group> */}
              
          </Form>
        </div>
      </Card>
    </>
  );
};
