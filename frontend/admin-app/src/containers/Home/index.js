import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layouts";
import "./style.css";

function Home(props) {
  return (
    <div>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              Side Bar
            </Col>
            <Col md={10} style={{ marginLeft: "auto" }}>
              Container
            </Col>
          </Row>
        </Container>
        {/* <Jumbotron
          stylestate
state={{ margin: "5rem", backgroundColor: "#fff" }}
          className="text-center"
        >
          <h1>Welcome to admin Dashboard</h1>
        </Jumbotron> */}
      </Layout>
    </div>
  );
}

export default Home;
