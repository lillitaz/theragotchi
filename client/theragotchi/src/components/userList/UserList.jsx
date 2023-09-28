import { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteUser } from '../../api/apiUser';
import { Link } from 'react-router-dom';
import { useTheragotchiContext } from '../../utilities/TheragotchiContext'

const UserList = ({ users, updateUserList }) => {
  const [messages, setMessages] = useState({});
  const { user, setUser } = useTheragotchiContext();

  const handleDelete = async (userId, userName) => {
    try {
      if (userName === 'admin') {
        setMessages(prevMessages => ({
          ...prevMessages,
          [userId]: 'Admin user cannot be deleted'
        }));
      } else {
        const success = await deleteUser(userId);
        if (success) {
          setMessages(prevMessages => ({
            ...prevMessages,
            [userId]: 'User deleted successfully'
          }));
          setTimeout(() => {
            setMessages(prevMessages => ({
              ...prevMessages,
              [userId]: ''
            }));
            updateUserList(users.filter(user => user.userId !== userId));
          }, 2000);
        } else {
          setMessages(prevMessages => ({
            ...prevMessages,
            [userId]: 'User deletion failed'
          }));
        }
      }
    } catch (error) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [userId]: 'An error occurred: ' + error
      }));
    }
  };

  return (
    <div>
      <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Theragotchi ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                {user.theragotchiId ? (
                  user.theragotchiId
                ) : (
                  <span>No Theragotchi</span>
                )}
              </td>
              <td>
                <button onClick = {() => setUser(user)}>
                    <Link to={{ pathname: "/adminUserManagement" }}>
                    Update</Link>
                </button>
                {user.userName !== 'admin' && (
                  <button onClick={() => handleDelete(user.userId, user.userName)}>Delete</button>
                )}
              </td>
              <td>
                {messages[user.userId] && (
                  <span>{messages[user.userId]}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  updateUserList: PropTypes.func,
};

export default UserList;
