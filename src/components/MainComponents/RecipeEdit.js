import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useDatabase } from "../../context/DatabaseContext";
import { useStorage } from "../../context/StorageContext";

import styled from "styled-components";
import Spinner from "../Spinner";
import HozzavalokForm from "./HozzavalokForm";
import ElkeszitesForm from "./ElkeszitesForm";
import TapertekForm from "./TapertekForm";
import { FaPencilAlt, FaRegClock } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { useParams, useHistory } from "react-router-dom";

const RecipeEdit = () => {
  const { id } = useParams(); //recept_id

  const { currentUser } = useAuth();
  const { getUserData, getSpecificRecept, updateRecipe, deleteFromMyImages } = useDatabase();
  const { uploadImage, deleteSingleImage } = useStorage();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [hozzavalok, setHozzavalok] = useState([]); // array of objects
  const [elkeszites, setElkeszites] = useState([]); // array of objects
  const [tapertek, setTapertek] = useState([]); // array of objects
  const [initialData, setInitialData] = useState([]); // array of objects

  const history = useHistory();
  const receptNevRef = useRef();
  const elkeszitesiIdoRef = useRef();

  useEffect(() => {
    async function fetchData() {
      let user;
      let specificrecept = await getSpecificRecept(id);
      const email = await currentUser.email;
      if (specificrecept.feltolto !== email) {
        return history.push("/");
      }
      try {
        user = await getUserData(email);
      } catch (error) {
        console.error(error);
      } finally {
        setUserInfo(user);
        setInitialData(specificrecept);
        setHozzavalok(specificrecept.hozzavalok);
        setElkeszites(specificrecept.elkeszites);
        setTapertek(specificrecept.tapertek);
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function removeTapertek(nev) {
    const newarr = tapertek.filter((tap) => tap.mennyiseg_nev !== nev);
    setTapertek(newarr);
  }

  function addTapertek(tap) {
    setTapertek([...tapertek, tap]);
  }

  function addElkeszitesLepes(lepes) {
    setElkeszites([...elkeszites, lepes]);
  }
  function removeElkeszitesLepes(lepesnev) {
    const newarr = elkeszites.filter((lepes) => lepes !== lepesnev);
    setElkeszites(newarr);
  }

  function addHozzavalok(obj) {
    setHozzavalok([...hozzavalok, obj]);
  }

  function removeHozzavalok(objnev) {
    const newarr = hozzavalok.filter((hozzavalo) => hozzavalo.hozzavalo_nev !== objnev);
    setHozzavalok(newarr);
  }

  function handleFileChange(event) {
    setError("");
    let file = event.target.files[0];
    if (file) {
      if (!file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return setError("Helytelen k??pform??tum!");
      }
      if (file.size / 1024 / 1024 > 2) {
        return setError("A k??p m??rete t??l nagy!");
      }
      setImageFile(event.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Adatok
    const recept_feltolto = userInfo.email_id;
    const recept_nev = receptNevRef.current.value;

    const recept_elkeszitesi_ido = elkeszitesiIdoRef.current.value;
    const recept_hozzavalok = hozzavalok;
    const recept_elkeszites = elkeszites;
    const recept_tapertek = tapertek;

    // Adatok ellen??rz??se
    if (recept_nev.length > 45 || recept_nev.length < 3) {
      return setError("A recept neve minimum 3 ??s maximum 45 karakter hossz?? lehet!");
    }
    if (recept_elkeszitesi_ido < 1) {
      return setError("Az elk??sz??t??si id?? legal??bb 1 perc kell legyen!");
    }

    if (recept_hozzavalok.length < 1) {
      return setError("Legal??bb 1 hozz??val?? sz??ks??ges!");
    }

    if (recept_elkeszites.length < 1) {
      return setError("Legal??bb 1 elk??sz??t??si l??p??s sz??ks??ges!");
    }

    const final_obj = {
      recept_id: id,
      nev: recept_nev,
      feltolto: recept_feltolto,
      elkeszites_ido: recept_elkeszitesi_ido,
      elkeszites: recept_elkeszites,
      hozzavalok: recept_hozzavalok,
      tapertek: recept_tapertek,
    };

    // Ha van k??p akkor elv??gzi a felt??lt??st ??s az adatb??zisba ??r??st az uploadImage

    if (imageFile !== null) {
      await uploadImage(userInfo.email_id, id, imageFile);
    }

    try {
      setLoading(true);
      await updateRecipe(final_obj);
    } catch (error) {
      console.log(error);
      setError("Nem siker??lt m??dos??tani a receptet");
    } finally {
      // El??z?? k??pet t??r??lni
      await deleteFromMyImages(userInfo.email_id, id);
      await deleteSingleImage(initialData?.image);
      setSuccess("Sikeres m??dos??t??s");
    }

    setLoading(false);
  }

  return (
    <Background>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center pt-3" style={{ minHeight: "100vh" }}>
          <StyledCard className="dark-shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Recept m??dos??t??s</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="my-4 py-3 border-bottom border-secondary">
                  <Form.Label className="d-flex align-items-center">
                    <FaPencilAlt size={20} className="mr-2" /> Recept n??v
                  </Form.Label>
                  <Form.Control defaultValue={initialData?.nev} ref={receptNevRef} type="text" minLength={3} maxLength={45} required></Form.Control>
                </Form.Group>
                <Form.Group className="my-4 py-3 border-bottom border-secondary">
                  <Form.Label>
                    <BsImage size={20} className="mr-2" />
                    K??p
                    <p>
                      Jelenlegi k??p: <img style={{ width: "5rem", height: "5rem" }} src={initialData?.image} alt={"k??p" + initialData?.image} />
                    </p>
                  </Form.Label>
                  <Form.Control onChange={handleFileChange} type="file"></Form.Control>
                </Form.Group>
                <Form.Group className="my-4 py-3 border-bottom border-secondary">
                  <Form.Label className="d-flex align-items-center">
                    <FaRegClock size={20} className="mr-2" /> Elk??sz??t??si id?? (perc)
                  </Form.Label>
                  <Form.Control defaultValue={initialData?.elkeszites_ido} ref={elkeszitesiIdoRef} min={1} type="number" required></Form.Control>
                </Form.Group>
                <HozzavalokForm initialHozzavalok={initialData.hozzavalok} removeFunction={removeHozzavalok} hozzaadFunction={addHozzavalok} />
                <ElkeszitesForm
                  initialElkeszites={initialData.elkeszites}
                  removeFunction={removeElkeszitesLepes}
                  hozzaadFunction={addElkeszitesLepes}
                />
                <TapertekForm initialTapertek={initialData.tapertek} removeFunction={removeTapertek} hozzaadFunction={addTapertek} />
                <Button disabled={loading} onClick={handleSubmit} className="w-100 mt-2" type="submit">
                  Ment??s
                </Button>
              </Form>
            </Card.Body>
          </StyledCard>
        </div>
      )}
    </Background>
  );
};

const Background = styled.div`
  background: url("https://firebasestorage.googleapis.com/v0/b/calorie-983b9.appspot.com/o/global%2Fbg.jpg?alt=media&token=96492010-e479-4cd0-92dd-104533e4a87c");
`;

const StyledCard = styled(Card)`
  width: 600px;
  max-width: 600px;

  @media (max-width: 650px) {
    width: 400px;
    max-width: 400px;
  }

  @media (max-width: 450px) {
    width: 300px;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;

export default RecipeEdit;
