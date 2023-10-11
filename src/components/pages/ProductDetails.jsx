import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { CartCounterContext } from "../../context/CartCounterContext";
import { getProductById } from "../../productsApi/productWithServer";
export const ProductDetails = () => {
  const { id } = useParams();
  const parsedId = parseInt(id);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(parsedId);

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const { addToCart } = useContext(CartCounterContext);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-light">
      <div className="row d-flex justify-content-center align-items-center min-vh-100">
        <img src={product.src} alt="" className="col-12 col-sm-5" />
        <div className="col-12 col-sm-6">
          <h1>Product Name: {product.productName}</h1>
          <p className="fs-4">Product Price: {product.price}</p>
          <p className="fs-4">Product Quantity: {product.quantity}</p>
          <button
            className="btn btn-dark text-light btn-outline-dark"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <NavLink
            className="btn btn-outline-primary mx-2 btn-outline-primary"
            to="/products"
          >
            Back to Products
          </NavLink>
        </div>
      </div>
    </div>
  );
};
