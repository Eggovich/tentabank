import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Profile = () => {
const {user, isAuthenticated} = useAuth0();

return (
	!isAuthenticated? 
	(
	<div className="error-message">
		<h1>Logga in</h1>
	</div>) 
	: 
	(
	<div className='profile-info'>
		<h1>{user.nickname}</h1>
		<h1>{user.email}</h1>
		<img src={user.picture} alt="logo"/> 
	</div>
	)
);
};

export default Profile;
