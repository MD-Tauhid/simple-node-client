import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUser = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUser = [...users, data];
      setUsers(newUser);
      console.log(data);
    })
    .catch(err => console.error(err))
    event.target.reset();
  };

  return (
    <div className="App">
      <h2>Users: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='Name' />
        <br />
        <input type="email" name="email" id="" placeholder='Email' />
        <br />
        <button type="submit">Add User</button>
      </form>
      <div>
        {
          users.map(user => <p key={user.id}> Name: {user.name}  email: {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
