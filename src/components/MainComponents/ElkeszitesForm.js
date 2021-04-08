import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import ModalPopup from "../ModalPopup";
import { FaPlus } from "react-icons/fa";
import { RiFootprintFill } from "react-icons/ri";

const ElkeszitesForm = ({ hozzaadFunction, removeFunction, initialElkeszites }) => {
  const [lepesek, setLepesek] = useState([]);
  const [error, setError] = useState("");
  const lepesRef = useRef();

  useEffect(() => {
    async function fetchData() {
      if (initialElkeszites === undefined) return;

      setLepesek(initialElkeszites);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setError("");
    const lepes = lepesRef.current.value;

    if (lepes.length < 10 || lepes.length > 1000) {
      return setError("A lépés minimum 10, maximum 1000 karaktert tartalmazhat!");
    }

    try {
      const newarr = [...lepesek];
      newarr.push(lepes);
      setLepesek(newarr);
    } catch (err) {
      console.error(err);
    } finally {
      hozzaadFunction(lepes);
      clearFields();
      lepesRef.current.focus();
    }
  };

  function removeLepes(nev) {
    const newarr = lepesek.filter((lepes) => lepes !== nev);
    setLepesek(newarr);
    removeFunction(nev);
  }

  function clearFields() {
    lepesRef.current.value = "";
  }

  return (
    <Form.Group className="my-4">
      <Form.Label className="d-flex align-items-center">
        <RiFootprintFill size={25} className="mr-2" /> Lépések{" "}
        <Badge className="ml-2 p-2" variant={lepesek.length < 1 ? "danger" : "success"}>
          {lepesek.length}
        </Badge>
      </Form.Label>
      <ModalPopup btnName="Hozzáadás" nev="Elkészítés" buttonVariant="warning">
        <p className="text-danger text-center">{error === "" ? "" : error}</p>
        <p className="bg-warning p-2">Itt tudod megadni, hogy hogyan kell elkészíteni a receptet</p>
        <label htmlFor="nev">
          <Badge className="mr-2" variant="primary">{`${lepesek.length + 1}.`}</Badge>Lépés leírása
        </label>
        <textarea ref={lepesRef} className="form-control"></textarea>

        <Button onClick={handleClick} variant="warning" className="w-100 mx-auto my-3">
          <FaPlus />
        </Button>

        <ul className="list-group">
          {lepesek.length <= 0 ? (
            <span className="text-danger">Legalább 1 lépés szükséges!</span>
          ) : (
            lepesek.map((lepes, index) => {
              return (
                <li key={"key" + index} className="list-group-item">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary text-light">{`${index + 1}.`}</span>
                    </div>
                    <input type="text" value={lepes} className="form-control bg-light" disabled />
                    <div className="input-group-append">
                      <Button
                        variant="danger"
                        onClick={() => {
                          removeLepes(lepes);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </ModalPopup>
    </Form.Group>
  );
};

export default ElkeszitesForm;
