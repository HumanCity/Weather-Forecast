import React from 'react';

function UserRow({ user, onDelete }) {
  return (
    <tr>
      <td style={tdStyle}>{user.name}</td>
      <td style={tdStyle}>{user.email}</td>
      <td style={tdStyle}>
        <button onClick={() => onDelete(user.id)} style={buttonStyle}>
          Hapus
        </button>
      </td>
    </tr>
  );
}

const tdStyle = {
  borderBottom: '1px solid #eee',
  padding: '10px',
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  cursor: 'pointer',
  borderRadius: '4px'
};

export default UserRow;
