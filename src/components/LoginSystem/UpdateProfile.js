import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { currentUser, updatePassword, updateEmail, updateDisplayName } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("A jelszavak nem egyeznek!");
    }

    if (usernameRef.current.value !== "") {
      if (usernameRef.current.value.length > 20 || usernameRef.current.value.length <= 3) {
        return setError("A név minimum 3, maximum 20 karakter lehet!");
      }
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (usernameRef.current.value !== currentUser.displayName) {
      promises.push(updateDisplayName(usernameRef.current.value));
    }
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Nem sikerült szerkeszteni a profilod");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <StyledCard className="image-shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Profil szerkesztése</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label>Felhasználó név</Form.Label>
                <Form.Control
                  type="text"
                  ref={usernameRef}
                  defaultValue={""}
                  placeholder={currentUser.displayName === null ? "Még nincs beállítva a neved" : currentUser.displayName}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>jelszó</Form.Label>
                <Form.Control type="password" ref={passwordRef} placeholder="Hagyd üresen ha nem változtatsz rajta!"></Form.Control>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>jelszó újra</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Hagyd üresen ha nem változtatsz rajta!"></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Mentés
              </Button>
            </Form>
          </Card.Body>
        </StyledCard>
        <div className="w-100 text-center mt-2">
          <Link to="/my-profile">Mégse</Link>
        </div>
      </div>
    </>
  );
};
const StyledCard = styled(Card)`
  width: 60%;
  max-width: 800px;
  min-width: 300px;
  margin-top: 3rem;

  @media (max-width: 450px) {
    width: 90%;
    min-width: 200px;
  }
  @media (max-width: 350px) {
    min-width: 180px;
  }
`;

export default UpdateProfile;
