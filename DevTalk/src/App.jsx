import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import About from './views/About/About';
import Contact from './views/Contact/Contact';
import Footer from './components/Footer/Footer';
import Trending from './views/Trending/Trending';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import NotFound from './views/NotFound/NotFound';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import Csharp from './views/Categories/Csharp.jsx';
import Java from './views/Categories/Java.jsx';
import C from './views/Categories/C.jsx';
import JavaScript from './views/Categories/JavaScript.jsx';
import Python from './views/Categories/Python.jsx';
import TypeScript from './views/Categories/Typescript.jsx';
import CreatePost from './views/CreatePost/CreatePost.jsx';
import Forum from './views/Forum/Forum.jsx';
import Authenticated from './hoc/Authenticated';

function App() {
	const [user] = useAuthState(auth);
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

	return (
		<div className="bg-[rgb(36,36,36)] z-0 dark:bg-white">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/trending" element={<Trending />} />
					<Route path="/forum" element={<Authenticated><Forum /></Authenticated>} />
					<Route path='/createpost' element={<Authenticated><CreatePost /></Authenticated>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path='*' element={<NotFound/>}/>
					<Route path="/c" element={<Authenticated><C /></Authenticated>} />
					<Route path="/csharp" element={<Authenticated><Csharp /></Authenticated>} />
					<Route path="/java" element={<Authenticated><Java /></Authenticated>} />
					<Route path="/javascript" element={<Authenticated><JavaScript /></Authenticated>} />
					<Route path="/python" element={<Authenticated><Python /></Authenticated>} />
					<Route path="/typescript" element={<Authenticated><TypeScript /></Authenticated>} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
