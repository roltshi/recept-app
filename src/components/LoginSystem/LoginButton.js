import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginButton = () => {
  const history = useHistory();

  return (
    <Button
      onClick={() => {
        history.push("/login");
      }}
      variant="warning text-uppercase"
    >
      Bejelentkezés
    </Button>
  );
};

export default LoginButton;
