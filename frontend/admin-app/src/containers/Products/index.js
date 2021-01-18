import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormFile,
  FormGroup,
  FormLabel,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/products.action";
import Layout from "../../components/Layouts";
import Input from "../../components/UI/Input";
import UIModal from "../../components/UI/Modal";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

const Products = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productOffer, setProductOffer] = useState("");
  const [productOfferPrice, setProductOfferPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productImages, setProductImages] = useState("");
  const [productDetail, setProductDetail] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const product = useSelector((state) => state.product);

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

  const handelAddProductAction = () => {
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
    // setShowAddProductModal(false)
  };

  const showAddProductModalAction = () => setShowAddProductModal(true);
  const hideModalAction = () => {
    clearInput();
    setShowAddProductModal(false);
  };

  const renderAddProductModal = () => {
    return (
      <UIModal
        show={showAddProductModal}
        handelClose={hideModalAction}
        size="lg"
        header="Add New Product"
        handelAction={handelAddProductAction}
        action="Add Product"
        actionButton
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
    );
  };

  const handelShowProductDetailModal = (product) => {
    setShowProductDetailModal(true);
    setProductDetail(product);
  };

  const renderProductDetailsModal = () => {
    if (!productDetail) return null;
    return (
      <UIModal
        show={showProductDetailModal}
        handelClose={() => {
          setShowProductDetailModal(false);
        }}
        size="lg"
        header="Product Details"
      >
        <Row>
          <Col md={6} sm={6}>
            <label className="key">Product Name</label>
            <p className="value"> {productDetail.name} </p>
          </Col>
          <Col md={3} sm={6}>
            <label className="key">Price</label>
            <p className="value"> {productDetail.price} </p>
          </Col>
          <Col md={3} sm={6}>
            <label className="key">Quantity</label>
            <p className="value"> {productDetail.qty} </p>
          </Col>
          <Col md={4} sm={6}>
            <label className="key">Category</label>
            <p className="value"> {productDetail.category.name} </p>
          </Col>
          <Col md={4} sm={6}>
            <label className="key">Offer</label>
            <p className="value">
              {" "}
              {productDetail.offer ? productDetail.offer : null}{" "}
            </p>
          </Col>
          <Col md={4} sm={6}>
            <label className="key">Offer Price</label>
            <p className="value">
              {" "}
              {productDetail.offer ? productDetail.offerPrice : null}{" "}
            </p>
          </Col>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetail.description}</p>
          </Col>
          <Col>
            <label className="key">Pictures</label>
            <Row style={{ paddingInline: "20px", textAlign: "center" }}>
              {productDetail.productPictures.map((picture) => {
                return (
                  <Col
                    sm={3}
                    style={{
                      textAlign: "center",
                      maxHeight: "100px",
                      marginBottom: "5px",
                      maxWidth: "100px",
                    }}
                  >
                    <img
                      className="img-fluid rounded"
                      style={{ height: "100%" }}
                      src={generatePublicUrl(picture.img)}
                      alt=""
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </UIModal>
    );
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
            <Button variant="primary" onClick={showAddProductModalAction}>
              Add Product
            </Button>
          </Col>
        </Row>

        <Table responsive="sm" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Offers</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {product.products.length > 0
              ? product.products.map((product) => {
                  return (
                    <tr
                      key={product._id}
                      onClick={() => {
                        handelShowProductDetailModal(product);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td> {product.qty} </td>
                      <td> {product.offer} </td>
                      <td> {product.category.name} </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
