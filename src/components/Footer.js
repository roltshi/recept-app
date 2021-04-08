import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <StyledFooter className="mt-5 text-light">
      created by{" "}
      <a className="ml-2" href="https://github.com/roltshi" target="_blank" rel="noreferrer">
        Roland Horváth{" "}
      </a>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 15vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 5px;

  @media (max-width: 350px) {
    font-size: 11px;
  }
`;

export default Footer;
