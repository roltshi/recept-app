import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginButton from "../LoginSystem/LoginButton";
import SignupButton from "../LoginSystem/SignupButton";
import ProfileButton from "../ProfileButton";
import { GiCookingPot } from "react-icons/gi";
import { FaPlus, FaCheck } from "react-icons/fa";
import styled from "styled-components";

const NavigationBar = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const IsLoggedInComponent = () => {
    return currentUser === null ? (
      <>
        <SignupButton />
        <LoginButton />
      </>
    ) : (
      <ProfileButton user={currentUser.email} />
    );
  };

  return (
    <StyledNavbar className="bg-primary navbar-dark" collapseOnSelect expand="lg">
      <Navbar.Brand
        className="text-uppercase text-light d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/");
        }}
      >
        <GiCookingPot size={35} />{" "}
        <span className="mx-2" style={{ letterSpacing: "4px" }}>
          Recept APP
        </span>
      </Navbar.Brand>

      <Navbar.Toggle id="navbar-toggle-icon" className="ml-auto" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse animation={null} id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className="text-light text-center" style={{ minWidth: "200px" }} to="/recipes">
            <Button className="w-100">
              <FaCheck className="mr-2" />
              Receptek
            </Button>
          </Link>
          <Link className="text-light text-center" style={{ minWidth: "200px" }} to="/create-recipe">
            <Button className="w-100">
              <FaPlus className="mr-2" />
              Új Recept
            </Button>
          </Link>
          <IsLoggedInComponent />
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

const StyledNavbar = styled(Navbar)`
  display: flex;
  flex-direction: row;
`;

export default NavigationBar;
