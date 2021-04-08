import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import styled from "styled-components";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { registerUser } = useDatabase();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("A jelszavak nem egyeznek!");
    }

    try {
      setError("");
      setLoading(true);
      await Promise.all([signup(emailRef.current.value, passwordRef.current.value)], [registerUser(emailRef.current.value)]);

      history.push("/");
    } catch {
      setError("Nem sikerült létrehozni a fiókot");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <StyledCard className="image-shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Regisztrálás</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Jelszó</Form.Label>
                <Form.Control type="password" ref={passwordRef} required></Form.Control>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Jelszó ismét</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Regisztrálás
              </Button>
            </Form>
          </Card.Body>
        </StyledCard>
        <div className="w-100 text-center mt-2">
          Ha már van fiókod <Link to="/login">Bejelentkezés</Link>
        </div>
      </div>
    </>
  );
};

const StyledCard = styled(Card)`
  width: 400px;
  max-width: 400px;

  @media (max-width: 450px) {
    width: 300px;
  }

  @media (max-width: 350px) {
    width: 280px;
  }
`;

export default Signup;
