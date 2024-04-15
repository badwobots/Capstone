import React from 'react';


const ProductsCard = ({ products, onAddProductCart, onreturnProduct, onDetails }) => {
  return (
    <li>
      <h2>{products.title}</h2>
      <img src={products.image} alt={products.title} width="125" height="125" />
      <p>Category: {products.category}</p>
      <p>Description: {products.description}</p>
      <p>Price: {products.price}</p>
      <button className="cart-button" onClick={() => onAddProductCart(products.id)}>Add to Cart</button>
      <button className="returnProduct-button" onClick={() => onreturnProduct(products.id)}>Remove</button>
      <button className="details-button" onClick={() => onDetails(products.id)}>See Details</button>
    </li>
  );
};

export default ProductsCard;