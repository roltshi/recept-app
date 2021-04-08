import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useDatabase } from "../../context/DatabaseContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../Spinner";
import { FaTimes, FaPen } from "react-icons/fa";
import { useStorage } from "../../context/StorageContext";
const MyRecipeList = () => {
  const { currentUser } = useAuth();
  const { getUserReceptek, getSpecificRecept, deleteSingleRecipe } = useDatabase();
  const { deleteSingleImage } = useStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [userReceptek, setUserReceptek] = useState([]);

  const history = useHistory();

  async function deleteRecipe(id) {
    let confirm_msg = window.confirm("Biztos törlöd a receptet?");
    if (!confirm_msg) return;
    const recept = await getSpecificRecept(id);
    deleteSingleRecipe(currentUser.email, id);
    deleteSingleImage(recept.image);
    let newarr = userReceptek.filter((recept) => recept.recept_id !== id);
    setUserReceptek(newarr);
  }

  useEffect(() => {
    async function fetchData() {
      let receptek;
      const email = await currentUser.email;
      try {
        receptek = await getUserReceptek(email);
      } catch (error) {
        console.error(error);
      } finally {
        setUserReceptek(receptek);
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
              <h3 className="text-center text-primary mt-2">Receptjeim</h3>
            </Card.Title>
            <Card.Body>
              <ListGroup>
                {userReceptek.length <= 0
                  ? "Nincs recepted"
                  : userReceptek.map((recept, index) => {
                      return (
                        <StyledListGroupItem className="image-shadow" key={index}>
                          <img alt="recept-thumbnail" style={{ width: "75px", height: "75px" }} src={recept.image} className="img-thumbnail" />
                          <Link className="nav-link text-primary" to={`recipes/${recept.recept_id}`}>
                            <ReceptNev> {recept.nev}</ReceptNev>
                          </Link>
                          <ButtonContainer>
                            <StyledButton
                              onClick={() => {
                                history.push(`/edit-recipe/${recept.recept_id}`);
                              }}
                            >
                              <FaPen />
                            </StyledButton>
                            <StyledButton
                              onClick={() => {
                                deleteRecipe(recept.recept_id);
                              }}
                              variant="danger"
                            >
                              <FaTimes />
                            </StyledButton>
                          </ButtonContainer>
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: no-wrap;

  @media (max-width: 550px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;
const StyledButton = styled(Button)`
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

export default MyRecipeList;
