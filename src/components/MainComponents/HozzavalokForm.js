import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import ModalPopup from "../ModalPopup";
import { FaPlus } from "react-icons/fa";
import { GiCookingPot, GiKitchenScale, GiSlicedBread } from "react-icons/gi";

const HozzavalokForm = ({ hozzaadFunction, removeFunction, initialHozzavalok }) => {
  const [hozzavalok, setHozzavalok] = useState([]);
  const [mertekegyseg, setMertekegyseg] = useState("");
  const [error, setError] = useState("");
  const nevRef = useRef();
  const mennyisegRef = useRef();

  useEffect(() => {
    async function fetchData() {
      if (initialHozzavalok === undefined) return;

      setHozzavalok(initialHozzavalok);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setMertekegyseg(e.target.value);
  };

  function removeHozzavalo(nev) {
    const newarr = hozzavalok.filter((hozzavalo) => hozzavalo.hozzavalo_nev !== nev);
    setHozzavalok(newarr);

    removeFunction(nev);
  }

  function clearFields() {
    nevRef.current.value = "";
    mennyisegRef.current.value = 1;
    setMertekegyseg("");
  }

  const handleClick = () => {
    setError("");
    const hozzavalo_nev = nevRef.current.value;
    const hozzavalo_mennyiseg = mennyisegRef.current.value;
    const hozzavalo_mertekegyseg = mertekegyseg;

    if (hozzavalo_nev.length < 1 || hozzavalo_nev.length > 30) {
      return setError("A név 1 és 30 karakter között lehet!");
    }
    if (hozzavalo_mennyiseg < 0) {
      return setError("A mennyiség legalább 0 vagy nagyobb kell legyen!");
    }
    if (hozzavalo_mertekegyseg.length < 1 || hozzavalo_mertekegyseg.length > 30) {
      return setError("A mértékegység 1 és 30 karakter között lehet!");
    }

    const obj = {
      hozzavalo_nev,
      hozzavalo_mennyiseg,
      hozzavalo_mertekegyseg,
    };

    try {
      setHozzavalok([...hozzavalok, obj]);
    } catch (err) {
      console.error(err);
    } finally {
      hozzaadFunction(obj);
      clearFields();
      nevRef.current.focus();
    }
  };

  return (
    <Form.Group className="my-4">
      <Form.Label className="d-flex align-items-center">
        <GiCookingPot size={30} className="mr-2" /> Hozzávalók
        <Badge className="m-2 p-2" variant={hozzavalok.length < 1 ? "danger" : "success"}>
          {hozzavalok.length}
        </Badge>
      </Form.Label>
      <ModalPopup btnName="Hozzáadás" nev="Hozzávalók" buttonVariant="success">
        <p className="text-danger text-center">{error === "" ? "" : error}</p>
        <p className="bg-warning p-2">Itt tudod megadni, hogy milyen hozzávalókat tartalmaz a recepted</p>
        <code>* kötelező</code>
        <br />
        <label htmlFor="nev" className="d-flex align-items-center">
          <GiCookingPot size={30} className="mr-2" /> Hozzávaló neve <code>*</code>
        </label>
        <input
          placeholder="pl.: liszt"
          ref={nevRef}
          autoComplete="off"
          className="form-control my-2"
          name="nev"
          minLength={3}
          maxLength={30}
          type="text"
          required
        />
        <label htmlFor="mennyiseg" className="d-flex align-items-center">
          <GiKitchenScale size={25} className="mr-2" /> Mennyiség <code>*</code>
        </label>
        <input ref={mennyisegRef} className="form-control my-2" defaultValue={1} name="mennyiseg" min={0} type="number" required />
        <label htmlFor="mertekegyseg" className="d-flex align-items-center">
          <GiSlicedBread size={25} className="mr-2" /> Mértékegység <code>*</code>
        </label>
        <input
          name="mertekegyseg"
          onChange={handleChange}
          placeholder="teáskanál, darab, gramm stb.."
          list="mertekegyseg"
          className="custom-select my-2 w-100"
          value={mertekegyseg}
          required
        />
        <datalist id="mertekegyseg">
          <option value="teáskanál">teáskanál</option>
          <option value="evőkanál">evőkanál</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="dkg">dkg</option>
          <option value="adag">adag</option>
          <option value="szelet">szelet</option>
          <option value="darab">darab</option>
          <option value="bögre">bögre</option>
        </datalist>
        <Button onClick={handleClick} variant="success" className="w-100 mx-auto my-3">
          <FaPlus />
        </Button>
        <ul className="list-group">
          {hozzavalok.length <= 0 ? (
            <span className="text-danger">Legalább 1 hozzávaló szükséges!</span>
          ) : (
            hozzavalok.map((hozzavalo, index) => {
              return (
                <li key={"key" + hozzavalo.hozzavalo_nev} className="list-group-item">
                  <div className="input-group">
                    <input
                      type="text"
                      value={`${hozzavalo.hozzavalo_mennyiseg} ${hozzavalo.hozzavalo_mertekegyseg} ${hozzavalo.hozzavalo_nev}`}
                      className="form-control bg-light"
                      disabled
                    />
                    <div className="input-group-append">
                      <Button
                        variant="danger"
                        className=""
                        onClick={() => {
                          removeHozzavalo(hozzavalo.hozzavalo_nev);
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

export default HozzavalokForm;
