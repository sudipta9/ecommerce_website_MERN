import React from "react";
import { FormGroup, Form } from "react-bootstrap";

function Input(props) {
  return (
    <>
      {/* controlId={props.fromId} */}
      <FormGroup>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        <Form.Text className="text-muted">{props.errorMassage}</Form.Text>
      </FormGroup>
    </>
  );
}

export default Input;
