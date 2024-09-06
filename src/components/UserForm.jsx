import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function UserForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState(null);

  // Pre-fill form data if editing
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const request = user
      ? axios.put(`${API_URL}/${user.id}`, formData)
      : axios.post(API_URL, formData);

    request
      .then(() => onSuccess())
      .catch(() => setError(user ? 'Failed to update user' : 'Failed to create user'));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{user ? 'Edit User' : 'Create User'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <label className="block mb-2 text-sm font-medium text-gray-900">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
        />
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        <span className="text-gray-700">Email:</span>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
        />
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        <span className="text-gray-700">Phone:</span>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}

export default UserForm;
