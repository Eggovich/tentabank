import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

const Profile = () => {
const {user, isAuthenticated} = useAuth0()
return (
	!isAuthenticated? (
	<p>Sign in</p>) :(
	<div>
		<p>{user.nickname}</p>
		<p>{user.email}</p>
		<img src={user.picture} alt="logo"/> 
	</div>
	)
);
};

export default Profile;
