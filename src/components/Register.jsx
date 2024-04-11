/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from 'react';

const NewRegistrationForm = ({ addNewUser }) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const handleNewUserSubmit = async (event) => {
    event.preventDefault();
    const UserObj = {
      firstname,
      lastname,
      email,
      username,
      password,
    };
    await addNewUser(UserObj);
    setFirstName('');
    setLastName('');
    setEmail('');
    setUserName('');
    setPassword('');
  };

      return (
        <form className='nuform' onSubmit={handleNewUserSubmit}>
          <label>
            <p> 
            First Name: {" "}
            <input
            label="firstname"
            type="text"
            id="firstname"
            placeholder="First Name 4-20 characters"
            minLength={4}
            maxLength={20}
            required
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          </p>
        </label>
        <label>
            <p>
            Last Name: {" "}
            <input
            label="lastname"
            type="text"
            id="lastname"
            placeholder="Last Name 1-20 characters"
            minLength={1}
            maxLength={20}
            required
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          </p>
        </label>
        <label>
          <p>
          Email: {" "}
          <input
            label="email"
            type='text'
            id="email"
            placeholder="Email 20 characters max"
            minLength={1}
            maxLength={20}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </p>
        </label>
        <label>
          <p>
          Username: {" "}
          <input
            label="username"
            type='text'
            id="username"
            placeholder="Username 20 characters max"
            minLength={1}
            maxLength={20}
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            />
          </p>
        </label>
        <label>
            <p> 
            Password: {" "}
            <input
            label="password"
            type="text"
            id="password"
            placeholder="Password 4-20 characters"
            minLength={4}
            maxLength={20}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </p>
        </label>
        <button>Submit</button>
        </form>
      );
  };

  export default NewRegistrationForm;