import { fetchUsers } from '../api/apiUser';
import UserList from '../components/userList/UserList';
import { useState, useEffect } from 'react';


export default function UserListPage() {
    const [users, setUsers] = useState([]);
    
  useEffect(() => {
    async function fetchData() {
      const response = await fetchUsers();
      if (response.ok) {
        setUsers(response.data);
      } else {
        console.error('Error fetching users:', response.status);
      }
    }
    fetchData();
  }, []);
   
  const updateUserList = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  return (
    <main>
      <h1>User List:</h1>
      <UserList users={users} updateUserList={updateUserList} />
    </main>
  );
}