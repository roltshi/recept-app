import React from "react";

import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const ProfileButton = ({ user }) => {
  const history = useHistory();

  return (
    <Button
      onClick={() => {
        history.push("/my-profile");
      }}
      variant="dark"
      className="w-100 "
    >
      {user}
    </Button>
  );
};

export default ProfileButton;
