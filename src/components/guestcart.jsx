import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(localStorage.getItem('cartNumber') || null);
  const navigate = useNavigate();

  const generateGuestCartNumber = () => {
    // Generate a unique identifier for guest cart number
    const guestCartNumber = `guest-${Math.floor(Math.random() * 1000000)}`;
    localStorage.setItem('cartNumber', guestCartNumber);
    setCartNumber(guestCartNumber);
  };

  // Function to calculate total price of items in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  // Function to handle checkout
  const handleCheckout = () => {
    // Calculate total price
    const totalPrice = calculateTotalPrice();
    
    // Navigate to checkout page with cart number and total price as query parameters
    navigate(`/checkout?cartNumber=${cartNumber}&totalPrice=${totalPrice}`);
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.productId}</li>
        ))}
      </ul>
      <p>Total Price: ${calculateTotalPrice()}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;