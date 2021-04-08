import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
function ModalPopup({ nev, btnName, children, buttonVariant }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="w-100" variant={buttonVariant} onClick={() => setShow(true)}>
        {btnName}
      </Button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="modal-informacio">
        <Modal.Header closeButton>
          <Modal.Title>{nev}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalPopup;
