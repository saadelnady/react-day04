import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
} from "../../productsApi/productWithServer";
export const Products = () => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      let fetchData = async () => {
        let response = await getAllProducts();
        setProducts(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  let handleDeleteProduct = (productId) => {
    deleteProduct(productId).then(() => {
      const filteredProducts = products.filter((product) => {
        return product.id !== productId;
      });
      setProducts(filteredProducts);
    });
  };
  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-between gap-5">
          {products.map((product) => (
            <Card style={{ width: "18rem", padding: "0" }} key={product.id}>
              <img
                src={product.src}
                alt=""
                style={{
                  width: "300px",
                  maxWidth: "100%",
                  height: "150px",
                }}
              />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  price: {product.price}$
                </Card.Subtitle>
                {product.quantity > 1 && (
                  <Card.Subtitle className="mb-2 text-muted">
                    Quantity : {product.quantity}
                  </Card.Subtitle>
                )}
                {product.quantity === 1 && (
                  <p className="py-2 px-3 bg-warning text-light rounded">
                    there is only one product
                  </p>
                )}
                {product.quantity === 0 && (
                  <p className="py-2 px-3 bg-danger text-light rounded">
                    sold out
                  </p>
                )}
                <NavLink
                  className=" btn btn-outline-primary mb-2"
                  to={`/productdetails/${product.id}`}
                >
                  product info
                </NavLink>

                <NavLink
                  className=" btn btn-outline-warning mb-2"
                  to={`/product/${product.id}/edit`}
                >
                  Edit product
                </NavLink>
                <button
                  className=" btn btn-outline-danger mb-2"
                  onClick={() => {
                    handleDeleteProduct(product.id);
                  }}
                >
                  Delete product
                </button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
