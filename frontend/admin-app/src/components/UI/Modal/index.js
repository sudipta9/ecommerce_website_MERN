import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

function UIModal(props) {
  const actionButton = () => {
    if (props.actionButton) {
      return (
        <Button variant="primary" onClick={props.handelAction}>
          {props.action}
        </Button>
      );
    }
  };
  return (
    <Modal
      centered
      show={props.show}
      onHide={props.handelClose}
      size={props.size}
    >
      <ModalHeader closeButton>
        <h4>{props.header}</h4>
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={props.handelClose}>
          Close
        </Button>
        {actionButton()}
      </ModalFooter>
    </Modal>
  );
}

export default UIModal;
