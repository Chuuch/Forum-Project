/* eslint-disable no-mixed-spaces-and-tabs */
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import AuthenticationViews from './views/AuthenticationView/AuthView.jsx';
import checkUser from './views/AuthenticationView/CheckUser.jsx';

function App() {
	const [user, loading, error] = useAuthState(auth);

	return <AuthenticationViews userId={checkUser(user, loading, error)}/>
	
}

export default App;

