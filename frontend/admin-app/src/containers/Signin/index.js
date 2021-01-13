import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../actions";
import Layout from "../../components/Layouts";
import Input from "../../components/UI/Input";

function Signin(props) {
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email: "test@domain.com",
      password: "test@123",
    };
    dispatch(login(user));
  };

  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="someone@test.com"
                  errorMassage="We'll never share your email with anyone else."
                  value=""
                  onChange={() => {}}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Password"
                  value=""
                  onChange={() => {}}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default Signin;
