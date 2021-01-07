import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layouts";
function Home(props) {
  return (
    <div>
      <Layout>
        <Jumbotron
          style={{ margin: "5rem", backgroundColor: "#fff" }}
          className="text-center"
        >
          <h1>Welcome to admin Dashboard</h1>
        </Jumbotron>
      </Layout>
    </div>
  );
}

export default Home;
