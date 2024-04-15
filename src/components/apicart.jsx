import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(null); // No need to store cartNumber locally anymore
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data from the API when the component mounts
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/carts/');
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const cartData = await response.json();
      setCartItems(cartData.items);
      setCartNumber(cartData.cartNumber);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Function to calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Function to handle checkout
  const handleCheckout = async () => {
    try {
      // Send a request to the API to initiate the checkout process
      const response = await fetch('https://fakestoreapi.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartNumber,
          totalPrice: calculateTotalPrice(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to initiate checkout');
      }
      // Optionally, handle the response (e.g., navigate to a checkout page)
      navigate('/checkout');
    } catch (error) {
      console.error('Error initiating checkout:', error);
    }
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