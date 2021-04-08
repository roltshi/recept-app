import React from "react";
import { Card, Accordion, Button, Tabs, Tab, Badge } from "react-bootstrap";
import { RiShoppingBasketFill } from "react-icons/ri";
import RecipeInfoText from "./RecipeInfoText";
import { FaAppleAlt } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import styled from "styled-components";

const RecipeAccordion = ({ recipe }) => {
  return (
    <StyledAccordion defaultActiveKey="0">
      <Card>
        <Card.Header className="bg-primary">
          <Accordion.Toggle className="bg-primary text-light w-100 d-flex align-items-center" as={Button} variant="text" eventKey="0">
            <RiShoppingBasketFill className="mr-2" size={25} />
            Hozzávalók
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ul>
              {recipe.hozzavalok.map((hozzavalo, index) => {
                return (
                  <li key={"hozzavalo" + index}>
                    {hozzavalo.hozzavalo_mennyiseg + " "}
                    {hozzavalo.hozzavalo_mertekegyseg + " "}
                    {hozzavalo.hozzavalo_nev}
                  </li>
                );
              })}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="bg-primary">
          <Accordion.Toggle className="bg-primary text-light w-100 d-flex align-items-center" as={Button} variant="text" eventKey="1">
            <GiCook className="mr-2" size={25} />
            Elkészítés
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <TabUl>
              {recipe.elkeszites.map((lepes, index) => {
                return (
                  <li style={{ maxWidth: "100%", wordBreak: "break-all", overflowWrap: "break-word" }} className="mt-3" key={"lepes" + (index + 1)}>
                    <p>
                      <Badge className="mr-1" variant="primary">
                        {index + 1}
                      </Badge>{" "}
                      {lepes}
                    </p>
                  </li>
                );
              })}
            </TabUl>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="bg-primary">
          <Accordion.Toggle className="bg-primary text-light w-100 d-flex align-items-center" as={Button} variant="text" eventKey="2">
            <FaAppleAlt className="mr-2" size={22} />
            Tápérték
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body style={{ overflowX: "scroll" }}>
            {recipe.tapertek.length <= 0 ? (
              "Nincs tápérték hozzáadva"
            ) : (
              <Tabs>
                {recipe.tapertek.map((tap, index) => {
                  return (
                    <Tab key={tap.mennyiseg_nev + index} eventKey={tap.mennyiseg_nev} title={tap.mennyiseg_nev}>
                      <TabUl className="mt-4 " style={{ listStyle: "none" }}>
                        <li>
                          <RecipeInfoText
                            title={`Mennyiség: ${tap.mennyiseg === undefined ? "-" : `${tap.mennyiseg} g`} `}
                            color="primary"
                          ></RecipeInfoText>
                        </li>
                        <li>
                          <RecipeInfoText
                            color="dark"
                            title={`Kalória: ${tap.kaloria === undefined ? "-" : `${tap.kaloria} kcal`} `}
                          ></RecipeInfoText>
                        </li>

                        <li>
                          <RecipeInfoText
                            color="danger"
                            title={`Fehérje: ${tap.feherje === undefined ? "-" : `${tap.feherje} g`} `}
                            text={""}
                          ></RecipeInfoText>
                        </li>

                        <li>
                          <RecipeInfoText
                            color="success"
                            title={`Zsír: ${tap.zsir === undefined ? "-" : `${tap.zsir} g`} `}
                            text={""}
                          ></RecipeInfoText>
                        </li>

                        <li>
                          <RecipeInfoText
                            color="info"
                            title={`Szénhidrát: ${tap.szenhidrat === undefined ? "-" : `${tap.szenhidrat} g`} `}
                          ></RecipeInfoText>
                        </li>
                      </TabUl>
                    </Tab>
                  );
                })}
              </Tabs>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </StyledAccordion>
  );
};

const TabUl = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 600px;
  @media (max-width: 350px) {
    max-width: 300px;
  }
`;

const StyledAccordion = styled(Accordion)`
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media (max-width: 350px) {
    width: 100%;
  }
`;

export default RecipeAccordion;
