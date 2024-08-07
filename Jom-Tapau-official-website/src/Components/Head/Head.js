import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import "./Head.css";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import useGetUser from "../../hooks/useGetUser";

const Head = ({ count }) => {
  const [user, loading, error] = useAuthState(auth);
  const { userDetails } = useGetUser();
  if (loading) {
    return <Loading></Loading>;
  }

  const handleSignOut = () => {
    signOut(auth);
  };
  const hehe = ({ isActive }) => {
    return {
      borderBottom: isActive ? "1px solid" : "",
    };
  };
  return (
    <div>
      <Navbar bg="danger" expand="lg" className="nav-bar">
        <Container>
          <Nav>
            <NavLink
              className="text-white nav-link fs-5 me-5"
              as={Link}
              to="/home"
            >
              Jom Tapau
            </NavLink>
          </Nav>

          <Navbar.Toggle
            style={{ color: "white" }}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex align-items-center">
              <NavLink
                style={hehe}
                className="text-white nav-link fs-5"
                as={Link}
                to="/menu"
              >
                Menu
              </NavLink>
              <NavLink
                style={hehe}
                className="text-white nav-link fs-5"
                as={Link}
                to="/about"
              >
                About
              </NavLink>
              {
                userDetails?.Admin === true && userDetails && <NavLink
                  style={hehe}
                  className="text-white nav-link fs-5"
                  as={Link}
                  to="/admin"
                >
                  Admin
                </NavLink>
              }
              {
                userDetails?.rider === true && userDetails && <NavLink
                  style={hehe}
                  className="text-white nav-link fs-5"
                  as={Link}
                  to="/riderDash/acceptedOrder"
                >
                  Rider
                </NavLink>
              }
            </Nav>
            <Nav className="nav-container">
              <NavLink
                id="cart-link"
                className="text-white nav-link fs-5"
                as={Link}
                to="/cart"
              >
                <span id="cart-icon" className="badge badge-pill">{count}</span>
                <FontAwesomeIcon icon={faShoppingCart} />
              </NavLink>
              {user ? (
                <div className="d-flex align-items-center ms-4">
                  <NavLink
                    style={hehe}
                    onClick={handleSignOut}
                    className="text-white nav-link fs-5"
                    as={Link}
                    to="/login"
                  >
                    Sign out
                  </NavLink>

                  <div>
                    <Dropdown className="text-white nav-link">
                      <Dropdown.Toggle variant="danger" id="dropdown-basic">
                        <span className="material-symbols-outlined mt-1">account_circle</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="/CustomerOrderHistory">Order History</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                  </div>
                </div>


              ) : (
                <NavLink
                  style={hehe}
                  className="text-white nav-link fs-5 "
                  as={Link}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Head;
