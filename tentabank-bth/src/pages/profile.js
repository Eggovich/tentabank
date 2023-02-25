import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';

const Profile = () => {
const [cookies, setCookie] = useCookies(['user']);


return (
	!cookies.loggedIn? 
	(
	<div className="error-message">
		<h1>Logga in</h1>
	</div>
	) : (
	<div>
		<img/>
		<h2>email:{cookies.email}</h2>
	    <h2>Username:{cookies.username}</h2>
	    <p>role:{cookies.role}</p>
	</div>)
);
};

export default Profile;
