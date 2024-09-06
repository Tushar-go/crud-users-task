import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { API_URL } from '../constant';


function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setUsers(response.data))
      .catch(() => setError('Failed to fetch users'));
  }, []);

  // Handle user deletion
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(() => setError('Failed to delete user'));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <UserForm refreshUsers={() => axios.get(API_URL).then(response => setUsers(response.data))} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
    <table className="w-full text-sm text-left text-gray-500 bg-gray-50">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr
                    key={user.id}
                    className="odd:bg-white even:bg-gray-50 border-b border-gray-300"
                >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">
                        <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                        <button 
                            onClick={() => handleDelete(user.id)} 
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    </div>
  );
}

export default Home;
