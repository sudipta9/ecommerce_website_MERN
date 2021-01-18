import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormFile,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/products.action";
import Layout from "../../components/Layouts";
import Input from "../../components/UI/Input";
import UIModal from "../../components/UI/Modal";

const Products = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productOffer, setProductOffer] = useState("");
  const [productOfferPrice, setProductOfferPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productImages, setProductImages] = useState("");

  const categoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ name: category.name, id: category._id });
      if (category.children.length > 0)
        categoryList(category.children, options);
    }
    return options;
  };

  const handelProductImages = (e) => {
    return setProductImages([...productImages, e.target.files[0]]);
  };

  const clearInput = () => {
    setNewProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductOffer("");
    setProductOfferPrice("");
    setProductQuantity("");
    setProductCategoryId("");
    setProductImages("");
  };

  const handelAddCategoryAction = () => {
    const form = new FormData();
    form.append("name", newProductName);
    form.append("price", productPrice);
    form.append("qty", productQuantity);
    form.append("description", productDescription);
    if (productOffer !== "") {
      form.append("offer", productOffer);
      form.append("offerPrice", productOfferPrice);
    }
    form.append("category", productCategoryId);
    for (let image of productImages) {
      form.append("productPicture", image);
    }
    dispatch(addProduct(form));
    clearInput();
    // setShowModal(false)
  };

  const showModalAction = () => setShowModal(true);
  const hideModalAction = () => {
    clearInput();
    setShowModal(false);
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <h3>Products</h3>
            <Button variant="primary" onClick={showModalAction}>
              Add Product
            </Button>
          </Col>
        </Row>

        <Table responsive="sm" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <UIModal
        show={showModal}
        handelClose={hideModalAction}
        size="lg"
        header="Add New Product"
        handelAction={handelAddCategoryAction}
        action="Add Product"
      >
        <Input
          label="Product Name"
          type="text"
          placeholder="New Product"
          value={newProductName}
          onChange={(e) => {
            e.preventDefault();
            setNewProductName(e.target.value);
          }}
        />

        <FormGroup>
          <FormLabel>Product Description</FormLabel>
          <textarea
            className="form-control"
            placeholder="Your Product description"
            typeof="text"
            value={productDescription}
            onChange={(e) => {
              e.preventDefault();
              setProductDescription(e.target.value);
            }}
          />
        </FormGroup>

        <Row>
          <Col sm={12} md={6} lg={3}>
            <Input
              type="number"
              label="Price"
              placeholder="Product Price"
              min="0"
              value={productPrice}
              onChange={(e) => {
                e.preventDefault();
                setProductPrice(e.target.value);
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Input
              type="number"
              label="Offer (in %)"
              placeholder="Offer (if Available)"
              min="0"
              value={productOffer}
              onChange={(e) => {
                e.preventDefault();
                setProductOffer(e.target.value);
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Input
              type="number"
              label="Offer Price"
              placeholder="Offer Price"
              min="0"
              value={productOfferPrice}
              onChange={(e) => {
                e.preventDefault();
                setProductOfferPrice(e.target.value);
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Input
              type="Number"
              label="Quantity"
              placeholder="Quantity"
              min="0"
              value={productQuantity}
              onChange={(e) => {
                e.preventDefault();
                setProductQuantity(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={6}>
            <FormGroup>
              <FormLabel>Product Category</FormLabel>
              <FormControl
                as="select"
                value={productCategoryId}
                onChange={(e) => {
                  e.preventDefault();
                  setProductCategoryId(e.target.value);
                }}
              >
                <option value="" key="">
                  Select Category
                </option>
                {categoryList(category.categories).map((option) => {
                  return (
                    <option value={option.id} key={option.id}>
                      {option.name}
                    </option>
                  );
                })}
              </FormControl>
            </FormGroup>
          </Col>
          <Col sm={12} md={12} lg={6}>
            <FormGroup>
              <FormLabel>Product Photo</FormLabel>
              {/* to verify the uploads */}
              {productImages.length > 0
                ? productImages.map((picture) => (
                    <div>{JSON.stringify(picture.name)}</div>
                  ))
                : null}
              <FormFile
                custom
                label="Upload Here"
                onChange={handelProductImages}
              />
            </FormGroup>
          </Col>
        </Row>
      </UIModal>
    </Layout>
  );
};

export default Products;
