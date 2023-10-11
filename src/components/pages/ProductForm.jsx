import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  addNewProduct,
  editProduct,
  getProductById,
} from "../../productsApi/productWithServer";

export const ProductForm = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const [formsValues, setFormsValues] = useState({
    id: null,
    src: "",
    productName: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (id !== undefined) {
      // Editing an existing product
      getProductById(id)
        .then((response) => {
          // Handle successful response here
          setFormsValues(response.data);
        })
        .catch((error) => {
          // Handle error here
          console.error("Error fetching product data:", error);
        });
    } else {
      // to remove inputs values   from form
      setFormsValues({
        id: null,
        src: "",
        productName: "",
        price: "",
        quantity: "",
      });
    }
  }, [id]); // Execute this effect when `id` changes

  const handleInputChange = (e) => {
    setFormsValues({ ...formsValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === undefined) {
      // Adding a new product
      addNewProduct(formsValues)
        .then(() => {
          // Clear the form inputs after successfully adding a product

          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Editing an existing product

      editProduct(id, formsValues)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container bg-light min-vh-100">
      <h1 className="text-center text-primary">
        {id === undefined ? "Add new Product" : "Edit Product"}
      </h1>
      <Form className="py-5 w-50 mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>product image</Form.Label>
          <Form.Control
            type="text"
            name="src"
            value={formsValues.src}
            onChange={handleInputChange}
            placeholder="enter product image "
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>product name</Form.Label>
          <Form.Control
            type="text"
            name="productName"
            value={formsValues.productName}
            onChange={handleInputChange}
            placeholder="enter product name "
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>product price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={formsValues.price}
            onChange={handleInputChange}
            placeholder="enter product price "
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>product quantity</Form.Label>
          <Form.Control
            type="text"
            name="quantity"
            value={formsValues.quantity}
            onChange={handleInputChange}
            placeholder="enter product quantity "
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="d-block w-50 mx-auto"
        >
          {id === undefined ? "Add new Product" : "Edit Product"}
        </Button>
      </Form>
    </div>
  );
};
