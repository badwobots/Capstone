import React, { useState, useEffect } from "react";

const APIURL = `https://fakestoreapi.com`;

const fetchSingleProduct = async (productId, setSelectedProduct) => {
    try {
      const response = await fetch(APIURL + "/products/" + productId);
      if (!response.ok) {
        throw new Error(`Failed to fetch product #${productId}`);
      }
      const productData = await response.json();
      console.log(`Fetched product #${productId}:`, productData);
      setSelectedProduct(productData);
    } catch (err) {
      console.error(`Error fetching product #${productId}!`, err);
    }
  };

    const ProductDetails = ({ productId }) => {
        const [selectedProduct, setSelectedProduct] = useState(null);
      
        useEffect(() => {
          fetchSingleProduct(productId, setSelectedProduct);
        }, [productId]);

    return (

        <div>
        {selectedProduct && (
            <>
            <h2>{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} width="125" height="125" />
            <p>ID: {selectedProduct.id}</p>
            <p>Category: {selectedProduct.category}</p>
            <p>Description: {selectedProduct.description}</p>
            <p>Price: {selectedProduct.price}</p>
           </>
               )}
               </div>
    );
  };

export default ProductDetails;