import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import ModalPopup from "../ModalPopup";
import { FaPlus, FaHamburger } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { GiKitchenScale, GiSlicedBread } from "react-icons/gi";

const TapertekForm = ({ initialTapertek, hozzaadFunction, removeFunction }) => {
  const [tapertek, setTapertek] = useState([]);
  const [mertekegyseg, setMertekegyseg] = useState("");
  const [error, setError] = useState("");
  const mennyisegRef = useRef();
  const kaloriaRef = useRef();
  const zsirRef = useRef();
  const szenhidratRef = useRef();
  const feherjeRef = useRef();
  const mertekegysegRef = useRef(); // csak a focus() miatt !!!

  useEffect(() => {
    async function fetchData() {
      if (initialTapertek === undefined) return;
      setTapertek(initialTapertek);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setMertekegyseg(e.target.value);
  };

  function removeHozzavalo(nev) {
    const newarr = tapertek.filter((tap) => tap.mennyiseg_nev !== nev);
    setTapertek(newarr);
    removeFunction(nev);
  }

  function clearFields() {
    setMertekegyseg("");
    mennyisegRef.current.value = "";
    kaloriaRef.current.value = 0;
    zsirRef.current.value = 0;
    szenhidratRef.current.value = 0;
    feherjeRef.current.value = 0;
  }

  const handleClick = () => {
    setError("");
    const tap_mertekegyseg = mertekegyseg;
    const tap_mennyiseg = mennyisegRef.current.value;
    const tap_kaloria = kaloriaRef.current.value;
    const tap_zsir = zsirRef.current.value;
    const tap_szenhidrat = szenhidratRef.current.value;
    const tap_feherje = feherjeRef.current.value;

    if (tap_mertekegyseg.length < 1 || tap_mertekegyseg.length > 30) {
      return setError("A mértékegyég minimum 1, maximum 30 karakter lehet!");
    }

    if (tap_mennyiseg < 0) {
      return setError("A mennyiség nem lehet kissebb mint 0!");
    }

    if (tap_kaloria < 0) {
      return setError("A kalória nem lehet kissebb mint 0!");
    }

    const obj = {
      mennyiseg_nev: tap_mertekegyseg,
      mennyiseg: tap_mennyiseg,
      kaloria: tap_kaloria,
      szenhidrat: tap_szenhidrat,
      zsir: tap_zsir,
      feherje: tap_feherje,
    };

    try {
      setTapertek([...tapertek, obj]);
    } catch (err) {
      console.error(err);
    } finally {
      hozzaadFunction(obj);
      clearFields();
      mertekegysegRef.current.focus();
    }
  };

  return (
    <Form.Group className="my-4">
      <Form.Label className="d-flex align-items-center">
        <AiFillFire size={25} className="mr-2" /> Tápérték{" "}
        <Badge className="ml-2 p-2" variant={"success"}>
          {tapertek.length}
        </Badge>
      </Form.Label>
      <ModalPopup btnName="Hozzáadás" nev="Tápérték" buttonVariant="dark">
        <p className="bg-warning p-2">Itt tudod megadni, hogy mit tartalmaz a recepted</p>
        <code>* kötelező</code>
        <p className="text-danger text-center">{error === "" ? "" : error}</p>

        <label htmlFor="tapertek_mertekegyseg">
          <GiSlicedBread size={25} className="mr-2" /> Mértékegység <code>*</code>
        </label>
        <input
          ref={mertekegysegRef}
          name="tapertek_mertekegyseg"
          onChange={handleChange}
          placeholder="Válassz vagy adj meg egyedit!"
          list="tapertek_mertekegyseg"
          className="custom-select my-2 w-100"
          value={mertekegyseg}
          required
        />
        <datalist id="tapertek_mertekegyseg">
          <option value="100g">100g</option>
          <option value="adag">adag</option>
          <option value="tányér">tányér</option>
          <option value="szelet">szelet</option>
          <option value="darab">darab</option>
          <option value="bögre">bögre</option>
        </datalist>

        <label htmlFor="mennyiseg">
          <GiKitchenScale size={25} className="mr-2" /> Mennyiség (g) <code>*</code>
        </label>
        <input
          placeholder="Az mértékegység mennyisége / tömege"
          ref={mennyisegRef}
          autoComplete="off"
          className="form-control my-2"
          name="mennyiseg"
          min={0}
          type="number"
          required
        />
        <label htmlFor="kaloria" className="d-flex align-items-center">
          <AiFillFire size={20} className="mr-2" /> Kalória (kcal) <code>*</code>
        </label>
        <input ref={kaloriaRef} className="form-control my-2" defaultValue={0} name="kaloria" min={0} type="number" required />
        <label htmlFor="zsir" className="d-flex align-items-center">
          <FaHamburger size={20} className="mr-2" /> Zsír (g)
        </label>
        <input ref={zsirRef} className="form-control my-2" defaultValue={0} name="zsir" min={0} type="number" />

        <label className="d-flex align-items-center" htmlFor="szenhidrat">
          <FaHamburger size={20} className="mr-2" /> Szénhidrát (g)
        </label>
        <input ref={szenhidratRef} className="form-control my-2" defaultValue={0} name="szenhidrat" min={0} type="number" />

        <label className="d-flex align-items-center" htmlFor="feherje">
          <FaHamburger size={20} className="mr-2" /> Fehérje (g)
        </label>
        <input ref={feherjeRef} className="form-control my-2" defaultValue={0} name="feherje" min={0} type="number" />

        <Button onClick={handleClick} variant="dark" className="w-100 mx-auto my-3">
          <FaPlus />
        </Button>
        <ul className="list-group">
          {tapertek.length <= 0
            ? ""
            : tapertek.map((tap, index) => {
                return (
                  <li key={"key" + tap.mennyiseg_nev} className="list-group-item">
                    <div className="input-group">
                      <input type="text" value={`${tap.mennyiseg_nev}`} className="form-control bg-light" disabled />
                      <div className="input-group-append">
                        <Button
                          variant="danger"
                          onClick={() => {
                            removeHozzavalo(tap.mennyiseg_nev);
                          }}
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
        </ul>
      </ModalPopup>
    </Form.Group>
  );
};

export default TapertekForm;
