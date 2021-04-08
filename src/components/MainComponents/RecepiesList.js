import React from "react";
import styled from "styled-components";
import SingleRecipe from "./SingleRecipe";
import donutbg from "../../assets/donutbg.jpg";
const RecepiesList = ({ recipes }) => {
  return (
    <Background>
      <RecipeContainer>
        {recipes.map((recipe, index) => {
          return <SingleRecipe key={"recipe" + index} recipe={recipe} />;
        })}
      </RecipeContainer>
    </Background>
  );
};

const Background = styled.div`
  background: url(${donutbg});
  min-height: 100vh;
  padding: 5rem 0;
`;

const RecipeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export default RecepiesList;
