import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  function loginWithTestUser() {
    emailRef.current.value = "teszt@tesztfiok.com";
    passwordRef.current.value = "teszt123";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Sikertelen bejelentkezés");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <StyledCard className="image-shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Bejelentkezés</h2>
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

              <Button disabled={loading} className="w-100" type="submit">
                Bejelentkezés
              </Button>

              <Button
                variant="warning"
                onClick={() => {
                  loginWithTestUser();
                }}
                disabled={loading}
                className="w-100 mt-2"
                type="submit"
              >
                Bejelentkezés teszt fiókkal
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Elfelejtetted a jelszavad?</Link>
            </div>
          </Card.Body>
        </StyledCard>
      </div>
      <div className="w-100 text-center">
        Nincs még fiókod? <Link to="/signup">Regisztrálás</Link>
      </div>
    </>
  );
};

const StyledCard = styled(Card)`
  max-width: 400px;

  @media (max-width: 450px) {
    width: 300px;
  }

  @media (max-width: 350px) {
    width: 280px;
  }
`;

export default Login;
