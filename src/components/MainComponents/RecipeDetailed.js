import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner";
import { RiTimeLine } from "react-icons/ri";
import { FaUserAlt, FaHeart, FaPencilAlt, FaCheck } from "react-icons/fa";
import RecipeAccordion from "./RecipeAccordion";
import RecipeInfoText from "./RecipeInfoText";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const RecipeDetailed = () => {
  const { id } = useParams(); //recept_id

  const history = useHistory();
  const { currentUser } = useAuth();
  const { getReceptek, addToMyFavourites, getUserFavourites, deleteUserFavourite } = useDatabase();
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddedToFavourites, setIsAddedToFavourites] = useState();

  function findRecipe(receptek) {
    let talalat = receptek.filter((recept) => recept.recept_id === id);
    if (talalat.length === 0) history.push("/recipes/not-found");
    return talalat[0];
  }

  function addToFavourites(receptid) {
    addToMyFavourites(currentUser.email, receptid);
    setIsAddedToFavourites(true);
  }

  function removeFromFavourites(receptid) {
    deleteUserFavourite(currentUser.email, receptid);
    setIsAddedToFavourites(false);
  }

  function isFavourite(user_favourites, receptid) {
    if (user_favourites.length <= 0) return;
    return user_favourites.some((elem) => elem.recept_id === receptid); // true or false
  }

  useEffect(() => {
    async function fetchData() {
      let data;
      let user_fav;
      try {
        data = await getReceptek();
        user_fav = await getUserFavourites(currentUser.email);
      } catch (error) {
        console.error(error);
      } finally {
        let exactrecipe = findRecipe(data);
        setRecipe(exactrecipe);
        const isfav = isFavourite(user_fav, exactrecipe.recept_id);
        setIsAddedToFavourites(isfav);
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
        <div>
          <h3 style={{ wordBreak: "break-all" }} className="text-center px-3 my-5">
            {recipe.nev}
          </h3>
          <div className="w-100 d-flex justify-content-center p-3 ">
            <StyledImage className="image-shadow" alt={recipe.nev} src={recipe.image} />
          </div>
          <div>
            <RecipeInfoText title="" color="light" text={""}>
              {isAddedToFavourites ? (
                // Ha hozzá van adva a kedvencekhez
                <Button
                  onClick={() => {
                    removeFromFavourites(recipe.recept_id);
                  }}
                  variant="danger"
                >
                  <FaCheck size={22} />
                </Button>
              ) : (
                // nincs hozzáadva a kedvencekhez
                <Button
                  onClick={() => {
                    addToFavourites(recipe.recept_id);
                  }}
                  variant="danger"
                >
                  <FaHeart size={22} />
                </Button>
              )}

              {recipe.feltolto !== currentUser.email ? (
                ""
              ) : (
                <Button
                  onClick={() => {
                    history.push(`/edit-recipe/${recipe.recept_id}`);
                  }}
                  className="mx-2"
                  variant="warning"
                >
                  <FaPencilAlt size={22} />
                </Button>
              )}
            </RecipeInfoText>
          </div>
          <div>
            <RecipeInfoText title="" color="primary" text={""}>
              <FaUserAlt />
              <span className="mx-2">{recipe.feltolto}</span>
            </RecipeInfoText>
          </div>
          <div>
            <RecipeInfoText title="" color="primary" text={""}>
              <RiTimeLine />
              <span className="mx-2">{`Elkészítési idő : ${recipe.elkeszites_ido} perc`}</span>
            </RecipeInfoText>
          </div>
          <div>
            <RecipeAccordion recipe={recipe} />
          </div>
        </div>
      )}
    </>
  );
};

const StyledImage = styled.img`
  max-width: 800px;
  max-height: 600px;
  width: 100%;
`;

export default RecipeDetailed;
