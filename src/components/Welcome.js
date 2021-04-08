import React from "react";
import { Jumbotron, Card } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import bgimage from "../assets/background.webp";
import cooking from "../assets/cooking.webp";
import cooking2 from "../assets/cooking2.webp";
import cooking3 from "../assets/cooking3.webp";
import { fadeInDown } from "react-animations";
const fadeInDownAnimation = keyframes`${fadeInDown}`;
const Welcome = () => {
  return (
    <>
      <StyledJumbotron>
        <h1 className="text-white text-center text-shadow-light ">Recept APP</h1>
      </StyledJumbotron>

      <CardContainer className="bg-warning">
        <StyledCard className="image-shadow" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={cooking} />
          <Card.Body>
            <Card.Title>Rengeteg recept</Card.Title>
            <Card.Text style={{ height: "4rem" }}>Böngéssz a receptek közül és készítsd el!</Card.Text>
          </Card.Body>
        </StyledCard>
        <StyledCard className="image-shadow" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={cooking2} />
          <Card.Body>
            <Card.Title>Saját recept</Card.Title>
            <Card.Text style={{ height: "4rem" }}>Készítsd el a saját recepted!</Card.Text>
          </Card.Body>
        </StyledCard>
        <StyledCard className="image-shadow" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={cooking3} />
          <Card.Body>
            <Card.Title>Kedvenceid</Card.Title>
            <Card.Text style={{ height: "4rem" }}>Ha tetszik egy recept add a kedvenceidhez!</Card.Text>
          </Card.Body>
        </StyledCard>
      </CardContainer>
    </>
  );
};

const StyledCard = styled(Card)`
  animation: 1s ${fadeInDownAnimation};
`;

const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 3rem;
  padding: 5rem;
`;

const StyledJumbotron = styled(Jumbotron)`
  min-height: 50vh;
  background: url(${bgimage}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export default Welcome;
