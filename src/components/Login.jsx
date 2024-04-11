import React, { useState } from "react";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://fakestoreapi.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setToken(result.token);
        console.log(result);
        // Clear fields after submission
        setUsername("");
        setPassword("");
        setError(null);
      } else {
        const result = await response.json();
        console.log(result);
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
        <button type="button" onClick={handleLogout}>Logout</button>
      </form>
    </>
  );
}






