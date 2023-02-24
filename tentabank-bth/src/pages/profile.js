import React, {useState, useEffect} from 'react';

const Profile = () => {
const isAuthenticated = useState(true)


return (
	!isAuthenticated? 
	(
	<div className="error-message">
		<h1>Logga in</h1>
	</div>
	) : (
	<div>
		<img/>
	    <h2>Username:</h2>
	    <p>Email:</p>
	</div>)
);
};

export default Profile;
