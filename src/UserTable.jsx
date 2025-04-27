import React, { useState } from 'react';
import UserRow from './UserRow';

function UserTable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Sam Brown', email: 'sam.brown@example.com' },
  ]);

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
      <h2>Daftar Pengguna</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Nama</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <UserRow key={user.id} user={user} onDelete={handleDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: '12px' }}>Tidak ada pengguna.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  borderBottom: '2px solid #ccc',
  padding: '10px'
};

export default UserTable;
