import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import { useDatabase } from "../../context/DatabaseContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout, deleteAccount } = useAuth();
  const { deleteUserData, deleteAllRecipes, getUserData } = useDatabase();
  const { deleteAllImage } = useStorage();
  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Sikertelen kijelentkezés");
    }
  }

  async function handleDelete() {
    setError("");
    let confirm_msg = window.confirm("Biztosan törlöd a fiókod?");

    if (!confirm_msg) return;
    if (currentUser.email === "teszt@tesztfiok.com") {
      return setError("Nem törölheted ezt a fiókot!");
    }

    try {
      const userdata = await getUserData(currentUser.email);
      await Promise.all([
        deleteAllRecipes(userdata.email_id),
        deleteAllImage(userdata.sajat_kepek),
        deleteUserData(userdata.email_id),
        deleteAccount(),
      ]);
      history.push("/login");
    } catch (error) {
      console.log(error);
      setError("Sikertelen fióktörlés, kérlek jelentkezz be újra!");
    }
  }

  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <StyledCard className="image-shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Profilom</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email: {currentUser.email}</strong>
            <br />
            <strong>Név: {currentUser.displayName === null ? "Még nincs beállítva a neved!" : currentUser.displayName}</strong>

            <Link to="/my-recipes" className="btn btn-primary w-100 mt-3">
              Receptjeim
            </Link>
            <Link to="/favourites" className="btn btn-primary w-100 mt-3">
              Kedvenceim
            </Link>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Profil szerkesztése
            </Link>
          </Card.Body>
        </StyledCard>
        <div className="w-100 text-center mt-2">
          <Button variant="danger" onClick={handleLogout}>
            Kijelentkezés
          </Button>
        </div>
        <div className="w-100 text-center mt-2">
          <p onClick={handleDelete} style={{ cursor: "pointer" }} className="text-danger">
            Fiók törlése
          </p>
        </div>
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

export default Dashboard;
