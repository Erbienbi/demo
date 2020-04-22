import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userSlice';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
// import { IoMdNotificationsOutline } from 'react-icons/io';
import Logo from '../assets/logo.png';

export default () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.authenticated);
  const user = useSelector((state) => state.user);

  const clickLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="dark"
        variant="dark"
        className="rounded-bottom shadow-sm"
        style={{ backgroundColor: "rgba(85,196,167,1)" }}
        sticky="top"
      >
        <Navbar.Brand>
          <Link to="/">
            <img
              alt=""
              src={Logo}
              height="50"
              className="d-inline-block align-top"
              style={{ margin: "-10%" }}
            />
            {/* Erbienbi */}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* {!isAuthenticated ? (
              <>
                <Nav.Link>
                  <Link to="/register-user">Register</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login-user">Sign In</Link>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>
                  <Link to="/profile">Profile</Link>
                </Nav.Link>
                <Nav.Link onClick={clickLogout}>Log Out</Nav.Link>
              </>
            )} */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Item</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {/* <Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Form>
            </Nav> */}
            {/* <Nav.Link>
              <IoMdNotificationsOutline style={{ fontSize: "2rem" }} />
            </Nav.Link> */}
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/register-user">
                    Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login-user">
                    Sign In
                </Nav.Link>
              </>
            ) : (
              <>
                {/* <Nav.Link> */}
                {/* {user.name} */}
                {/* </Nav.Link> */}
                <NavDropdown
                  id="collasible-nav-dropdown"
                  title={
                    <>
                      {user.name} <FaUserCircle style={{ fontSize: "2rem" }} />
                    </>
                  }
                >
                  <NavDropdown.Item href="">
                    <Link to="/profile" className="btn">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="" onClick={clickLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
