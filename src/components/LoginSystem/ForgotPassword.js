import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Nézd meg a bejövő emailjeidet!");
    } catch {
      setError("Nem sikerült visszaállítani a jelszót");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Card style={{ minWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Jelszó visszaállítás</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required></Form.Control>
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Jelszó visszaállítás
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/login">Bejelentkezés</Link>{" "}
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Nincs fiókod? <Link to="/signup">Regisztrálás</Link>{" "}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
