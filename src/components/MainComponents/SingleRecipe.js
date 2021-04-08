import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { HiOutlineClock } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
const SingleRecipe = ({ recipe }) => {
  const history = useHistory();
  return (
    <StyledCard key={"recept" + recipe.recept_id}>
      <StyledImage className="img-fluid" variant="top" src={recipe.image} />
      <Card.Body>
        <CardTitle>{recipe.nev}</CardTitle> {/* Max Hossz 45 karakter */}
        <CardInfo>
          <HiOutlineClock className="mr-2" size={15} /> <span>{recipe.elkeszites_ido} perc</span>
          <Feltolto>
            <FaUserAlt className="mr-2" size={15} />
            {recipe.feltolto === null ? "ismeretlen" : recipe.feltolto}
          </Feltolto>
        </CardInfo>
        <Button
          className="w-100 mt-2"
          onClick={() => {
            history.push(`/recipes/${recipe.recept_id}`);
          }}
          variant="primary"
        >
          Megnyit
        </Button>
      </Card.Body>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 18rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  &:hover {
    background-color: #f2f2f2;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
  @media (max-width: 768px) {
    width: 12rem;
  }
  @media (max-width: 450px) {
    width: 10rem;
  }
  @media (max-width: 350px) {
    width: 70%;
  }
`;

const StyledImage = styled(Card.Img)`
  height: 10rem;
  padding: 0.7rem;
`;

const CardInfo = styled.div`
  @media (max-width: 450px) {
    display: none;
  }
`;

const CardTitle = styled(Card.Title)`
  height: 3rem;
  @media (max-width: 768px) {
    text-overflow: ellipsis;
    overflow: hidden;
    min-height: 1rem;
    font-size: 1rem;
  }
`;

const Feltolto = styled.div`
  @media (max-width: 768px) {
    width: 6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
export default SingleRecipe;
