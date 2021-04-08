import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SignupButton = () => {
  const history = useHistory();

  return (
    <StyledSignupButton
      onClick={() => {
        history.push("/signup");
      }}
      variant="warning"
    >
      Regisztrálás
    </StyledSignupButton>
  );
};

const StyledSignupButton = styled(Button)`
  text-transform: uppercase;
  margin: 0 0.5rem;
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

export default SignupButton;
