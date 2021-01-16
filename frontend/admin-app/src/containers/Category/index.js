import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormFile,
  ModalFooter,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategory } from "../../actions/categories.action";
import Layout from "../../components/Layouts";
import Input from "../../components/UI/Input";

function Category(props) {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState();
  const [parentCategoryId, setParentCategoryId] = useState(undefined);
  const [categoryImage, setCategoryImage] = useState(undefined);
  const [fileName, setFileName] = useState("Select file");

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const renderCategories = (categories) => {
    let allCategories = [];
    for (let category of categories) {
      allCategories.push(
        <li key={category._id}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return allCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ name: category.name, id: category._id });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const clearInput = () => {
    setNewCategoryName(undefined);
    setParentCategoryId(undefined);
    setFileName("Select File");
    setCategoryImage(undefined);
  };
  const fileSelect = (e) => {
    e.preventDefault();
    setFileName(e.target.files[0].name);
    setCategoryImage(e.target.files[0]);
  };
  const handelAddCategoryModal = (e) => {
    const form = new FormData();
    form.append("name", newCategoryName);
    if (parentCategoryId !== undefined) {
      form.append("parentId", parentCategoryId);
      // console.log("parentId present");
    }
    if (categoryImage !== undefined) {
      form.append("categoryImage", categoryImage);
      // console.log("file present");
    }

    dispatch(addCategory(form));

    clearInput();
    // setShow(false);
  };
  const handelShowModal = () => setShow(true);
  const handelCloseModal = () => setShow(false);

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
              <Button variant="primary" onClick={handelShowModal}>
                Add
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handelCloseModal} centered size="lg">
        <ModalHeader closeButton>Add new Category</ModalHeader>
        <ModalBody>
          <Form>
            <Input
              label="New Category Name"
              placeholder="New Category"
              type="text"
              value={newCategoryName}
              onChange={(e) => {
                e.preventDefault();
                setNewCategoryName(e.target.value);
              }}
            />
            <Row>
              <Col lg={6} md={12} sm={12}>
                <FormGroup>
                  <FormLabel>Select a Parent Category</FormLabel>
                  <FormControl
                    as="select"
                    value={parentCategoryId}
                    onChange={(e) => {
                      e.preventDefault();
                      setParentCategoryId(e.target.value);
                    }}
                  >
                    <option value={undefined} key={undefined}>
                      Create New
                    </option>
                    {createCategoryList(category.categories).map((option) => {
                      return (
                        <option value={option.id} key={option.id}>
                          {option.name}
                        </option>
                      );
                    })}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Select a File</FormLabel>
                  <FormFile label={fileName} custom onChange={fileSelect} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handelCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handelAddCategoryModal}
            style={{ paddingInline: "25px" }}
          >
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </Layout>
  );
}

export default Category;
