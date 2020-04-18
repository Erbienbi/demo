import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  InputGroup,
  FormControl,
  Button,
  NavItem,
} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import Logo from "../assets/logo.png";

export default () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="dark"
        variant="dark"
        className="rounded-bottom shadow-lg"
        style={{ backgroundColor: "rgba(85,196,167,1)" }}
      >
        <Navbar.Brand>
          <img
            alt=""
            src={Logo}
            height="50"
            className="d-inline-block align-top"
            style={{ margin: "-10%" }}
          />
          {/* Erbienbi */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Form>
            </Nav>
            <Nav.Link>
              <IoMdNotificationsOutline style={{ fontSize: "2rem" }} />
            </Nav.Link>
            <NavDropdown
              id="collasible-nav-dropdown"
              title={<FaUserCircle style={{ fontSize: "2rem" }} />}
            >
              <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
