import React, { useState, useEffect } from 'react';
import fetchSingleUser from './Account.jsx';

const APIURL = `https://fakestoreapi.com/users/`;

function UserDetails({ userId, token }) {
  const [users, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchSingleUser(userId, token, APIURL);
      setUser(userData);
    };

    fetchData();
  }, [userId, token]);

  if (!users) {
    return <p>Error, error, Rebooting!</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <ul>
        <li>ID: {users.id}</li>
        <li>First Name: {users.name.firstname}</li>
        <li>Last Name: {users.name.lastname}</li>
        <li>Email: {users.email}</li>
      </ul>
    </div>
  );
}

export default UserDetails;