import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { API_URL } from '../constant';


function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => setUser(response.data))
      .catch(() => setError('Failed to fetch user'));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {user && (
        <UserForm
          user={user}
          onSuccess={() => navigate('/')}
        />
      )}
    </div>
  );
}

export default UserDetail;
