//Commented out features are currently being worked out.

import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Bananazon from './assets/bananazon.jpg';
import Login from "./components/Login.jsx";
import Navbar from './components/Navigations.jsx';
import Container from './components/Container.jsx';
import NewRegistrationForm from './components/Register.jsx';
import ProductsCard from './components/Products.jsx';
import UserDetails from './components/UserDetails.jsx';
import Cart from './components/apicart.jsx';
import ProductDetails from './components/SingleProduct.jsx';

//API link Information
const APIURL = `https://fakestoreapi.com`;

function App() {
  const [token, setToken] = useState(null)
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
   const results = products.filter(products =>
      products.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      products.category.toLowerCase().includes(searchTerm.toLowerCase())
   );
   setSearchResults(results);
  }, [searchTerm, products]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(APIURL + "/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products!");
      }
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products!', error);
    }
  };

  const fetchSingleProduct = async (productId) => {
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

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(APIURL + "/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users!");
      }
      const data = await response.json();
      console.log(data);
      // Handle the fetched user data as needed
    } catch (error) {
      console.error('Error fetching users!', error);
    }
  };

  const addNewUser = async (UserObj) => {
    try {
      const response = await fetch(APIURL + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserObj),
      });
      if (!response.ok) {
        throw new Error("Failed to create new User");
      }
      await fetchAllUsers();
      console.log(response);
    } catch (err) {
      console.error('Error adding that user!', err);
    }
  };

  const addProductCart = async (productId) => {
    try {
      const response = await fetch(APIURL + "/products" + `/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({available: false,})
      });
      if (!response.ok) {
        console.log("Failed to add product. Response status:", response.status);
        throw new Error("Failed checkout process");
      }
      await fetchAllProducts();
      console.log(response);
    } catch (err) {
      console.error(`Error adding #${productId} from the catalog!`, err);
    }
  };

  const handleAddProductCart = async (productId) => {
    await addProductCart(productId);
  };

  const returnProduct = async (productId) => {
    try {
      const response = await fetch(APIURL + "/products" + `/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({available: true,})
      });
      if (!response.ok) {
        console.log("Failed to add product. Response status:", response.status);
        throw new Error("Failed process");
      }
      await fetchAllProducts();
      console.log(response);
    } catch (err) {
      console.error(`Error checking out #${productId} from the list!`, err);
    }
  };

  const handlereturnProduct = async (productId) => {
    await returnProduct(productId);
  };

  const handleSeeProductDetails = async (productId) => {
    await fetchSingleProduct(productId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <h1><img id='logo-image' src={Bananazon}/>Bananazon!!!</h1>

      <p>Serving all your product needs, from bejeweled phone cases to top tier electronics.</p>

      <p>You may purchase with or without an account but please register. How else are we going to track you? xD.</p>
      <Navbar />
    <div>
        <input
          type="text"
          placeholder="Search Products."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div> 
    <Container>
      <div id="main-section">
        <Routes>
          <Route path="/Login" element={<Login token={token} setToken={setToken} />} />
          <Route path="/Register" element={<NewRegistrationForm addNewUser={addNewUser}  />} />
          <Route path="/Products" element={searchResults.map((products) => (
        <ProductsCard
          key={products.id}
          products={products}
          onAddProductCart={handleAddProductCart}
          onreturnProduct={handlereturnProduct}
          onDetails={handleSeeProductDetails}
        />
      ))} />
          <Route path="/" element={<Login token={token} setToken={setToken} />} />
          <Route path="/UserDetails" element={<UserDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/SingleProduct" element={<ProductDetails />} />
        </Routes>
        </div>
      </Container>
            {selectedProduct && (
         <div>
         <h2>{selectedProduct.title}</h2>
         <img src={selectedProduct.image} alt={selectedProduct.title} width="125" height="125" />
         <p>ID: {selectedProduct.id}</p>
         <p>Category: {selectedProduct.category}</p>
         <p>Description: {selectedProduct.description}</p>
         <p>Price: {selectedProduct.price}</p>
        </div>
            )}
      </>

  )
}

export default App
