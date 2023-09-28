import UserCredentialsForm from '../components/userCredentialsForm/UserCredentialForm';
import { useTheragotchiContext } from '../utilities/TheragotchiContext';

function UserProfilePage() {
  const {
    user
  } = useTheragotchiContext();


  if (user) {
    return (
      <div>
        <h2>User Profile</h2>
        <UserCredentialsForm user={user} />
      </div>
    );
  }
}

export default UserProfilePage;
