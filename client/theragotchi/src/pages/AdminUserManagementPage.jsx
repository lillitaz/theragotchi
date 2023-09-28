import AdminCredentialsForm from '../components/userCredentialsForm/AdminCredentialForm';
import { useTheragotchiContext } from '../utilities/TheragotchiContext';


function AdminUserManagementPage() {
  const { user } = useTheragotchiContext();
  
    return (
      <div>
        <h2>User Profile</h2>
        <AdminCredentialsForm userData={user} />
      </div>
    );
  }

export default AdminUserManagementPage;
