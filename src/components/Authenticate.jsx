import React, { useState } from 'react';

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [dataUsername, setDataUsername] = useState(null);
    const [error, setError] = useState(null);
  
    async function handleClick() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/auth/login",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
            const result = await response.json();
            setSuccessMessage(result.message);
            setDataUsername(result.data.username);
            console.log(result);
          } else {
            const errorResult = await response.json();
            setError(errorResult.error || "Authentication failed");
          }
        } catch (error) {
          setError(error.message);
        }
      }
  
    return (
      <div>
        <h2>Authenticate User:</h2>
        <div className='datausername'>
        {dataUsername && <b>{dataUsername}</b>}
        </div>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <button onClick={handleClick}>Authenticate Token!</button>
      </div>
    );
  }