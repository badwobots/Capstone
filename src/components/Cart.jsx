import React, { useState } from 'react';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddProductCart = async (productId) => { //trying to figure out what is happening with handleAddProductCart
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Testing user ID 
          date:'2024-04-11',
          products: [{ productId, quantity: 1 }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const addedProduct = await response.json();
      setCartItems([...cartItems, addedProduct]);
      console.log(`Product ${productId} added to cart`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>{item.productId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;