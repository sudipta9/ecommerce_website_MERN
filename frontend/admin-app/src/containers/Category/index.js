import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCategory } from "../../actions/categories.action";
import Layout from "../../components/Layouts";

function Category(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <h2>Category</h2>
              <Button variant="primary">Add</Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}></Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Category;
