import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useDatabase } from "../../context/DatabaseContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../Spinner";
import { FaTimes } from "react-icons/fa";
const MyFavouritesList = () => {
  const { currentUser } = useAuth();
  const { getUserFavourites, deleteUserFavourite, getUserData, getReceptek } = useDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [kedvencek, setKedvencek] = useState([]);

  function removeFromFavourites(receptid) {
    deleteUserFavourite(currentUser.email, receptid);
    const newarr = kedvencek.filter((kedvenc) => kedvenc.recept_id !== receptid);
    setKedvencek(newarr);
  }

  async function deleteIfFavouriteNotExist() {
    const user = await getUserData(currentUser.email);
    const receptek = await getReceptek();
    const user_favs = user.kedvenc_receptek;
    const promises = [];

    if (receptek.length <= 0) {
      for (const fav of user_favs) {
        promises.push(deleteUserFavourite(currentUser.email, fav));
      }
    }

    for (let i = 0; i < receptek.length; i++) {
      for (let j = 0; j < user_favs.length; j++) {
        if (receptek[i].recept_id !== user_favs[j]) {
          promises.push(deleteUserFavourite(currentUser.email, receptek[i]));
        }
      }
    }
    Promise.all(promises);
  }

  useEffect(() => {
    async function fetchData() {
      let kedvencek;
      const email = await currentUser.email;
      try {
        kedvencek = await getUserFavourites(email);
      } catch (error) {
        console.error(error);
      } finally {
        setKedvencek(kedvencek);
        deleteIfFavouriteNotExist(kedvencek);
        setIsLoading(false);
      }
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <StyledCard className="image-shadow">
            <Card.Title>
              <h3 className="text-center text-primary mt-2">Kedvenceid</h3>
            </Card.Title>
            <Card.Body>
              <ListGroup>
                {kedvencek.length <= 0
                  ? "Nincs kedvenc recepted"
                  : kedvencek.map((recept, index) => {
                      return (
                        <StyledListGroupItem className="image-shadow my-3" key={index}>
                          <img alt="recept-thumbnail" style={{ width: "75px", height: "75px" }} src={recept.image} className="img-thumbnail" />
                          <Link className="nav-link text-primary" to={`recipes/${recept.recept_id}`}>
                            <ReceptNev> {recept.nev}</ReceptNev>
                          </Link>
                          <DeleteButton
                            onClick={() => {
                              removeFromFavourites(recept.recept_id);
                            }}
                            variant="danger"
                          >
                            <FaTimes />
                          </DeleteButton>
                        </StyledListGroupItem>
                      );
                    })}
              </ListGroup>
            </Card.Body>
          </StyledCard>
          <div className="w-100 text-center mt-2">
            <Link className="btn btn-primary" to="/my-profile">
              Vissza
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
const DeleteButton = styled(Button)`
  @media (max-width: 550px) {
    width: 100%;
  }
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 550px) {
    display: flex;
    flex-flow: column;
  }
`;

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

const ReceptNev = styled.p`
  width: 100%;
  overflow: hidden;
`;

export default MyFavouritesList;
