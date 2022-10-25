import React, {useState } from "react";

const UploadedProducts = ({products}) => {
  return (
    <div className="products-page">
      <div className="title">
        <h1>New Stock</h1>
        <div className="title-underline"></div>
      </div>
      <div className="products-container">
        {products.map((product, index) => {
            return (
              <div key={index} className="product-card">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                  width="100%"
                  height="300"
                />
                <div className="product-details">
                  <div className="title-price">
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UploadedProducts;
