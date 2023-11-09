/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import AuthenticationViews from './views/AuthenticationView/AuthView.jsx';
import checkUser from './views/AuthenticationView/CheckUser.jsx';

function App() {
	const [user, loading, error] = useAuthState(auth);
	const [appState, setAppState] = useState({
		user,
		userData: false,
	});
	
	useEffect(() => { 
	if (appState.user !== user) {
		setAppState({ user });
		// TODO: To be removed later
		console.log(`Current user: ${user}`)
	}	},[appState.user, user])

	return <AuthenticationViews userId={checkUser(user, loading, error)}/>
	
}

export default App;

