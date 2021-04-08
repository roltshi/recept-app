import React from "react";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";

const RecipeInfoText = ({ title, text, color, children }) => {
  return (
    <StyledInputGroup>
      <StyledInputGroupText className={`text-light bg-${color}`}>
        {children}
        <span className="ml-2"> {title}</span>
      </StyledInputGroupText>
      <InfoText>{text}</InfoText>
    </StyledInputGroup>
  );
};

const InfoText = styled(InputGroup.Text)`
  border: none;
  background-color: transparent;
`;

const StyledInputGroupText = styled(InputGroup.Text)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    margin: 0;
    width: 300px;
  }
  @media (max-width: 350px) {
    margin: 0 auto;
    width: 230px;
  }
`;
const StyledInputGroup = styled(InputGroup)`
  width: 400px;
  margin: 0 auto;

  @media (max-width: 450px) {
    width: 300px;
  }
  @media (max-width: 350px) {
    margin: 0 auto;
    width: 230px;
  }
`;
export default RecipeInfoText;
