import { createUserWithEmailAndPassword } from '@firebase/auth';
import { get, ref, set } from 'firebase/database';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../../config/firebase-config';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword ] = useState('');
	const navigate = useNavigate()

	const registerUser = async (handle, firstName, lastName, username, email, password) => {
		console.log(auth)
		
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed up 
				console.log(userCredential)
				const user = userCredential.user;
				set(ref(database, `users/${handle}`), {
				uid: user?.uid, firstName, lastName, username, email, password, likedPosts: {},
				createdOn: Date.now(),
				});
				set(ref(database, `admins/${user?.uid}`), {
				'isAdmin':false, 
				});
				navigate('/')
				// TODO: To be removed later
				console.log('User created: ', get(ref(database, `users/${handle}`)))
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// TODO: To be removed later or replaced with notification
				alert(errorCode)
				console.log(errorCode, errorMessage)
			});
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const handle = firstName.toLowerCase()
	
		registerUser(handle, firstName, lastName, username, email, password)
	
        setFirstName('');
        setLastName('')
        setUsername('');
		setEmail('');
		setPassword('');
	};

	return (
		<div className="h-screen bg-[rgb(36,36,36)] flex flex-col items-center justify-center z-20 pb-44">
			<h1 className="text-[#F7AB0A] text-4xl pb-16 ">Create an account</h1>
			<form
				className="z-20 flex flex-col w-fit space-y-2"
				onSubmit={handleSubmit}
			>
				<div className="flex space-x-2">
					<input
						className="bg-[rgb(30,30,30)] p-2 mb-15 text-gray-400"
						type="text"
						id='firstName'
						required
						value={firstName}
						placeholder="First Name"
						onChange={ (e) => setFirstName(e.target.value) }
						pattern='[A-Za-z]{3,}'
					/>
					<input
						className="bg-[rgb(30,30,30)] p-2 mb-15 ml-2 w-fit text-gray-400"
						type="text"
						id='lastName'
						required
						value={lastName}
						placeholder="Last Name"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<input
					className="bg-[rgb(30,30,30)] text-gray-400 p-2 mb-15"
					type="text"
					name="username"
					id="username"
					placeholder="Username"
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					className="bg-[rgb(30,30,30)] text-gray-400 p-2 mb-15"
					type="text"
					name="email"
					id="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="bg-[rgb(30,30,30)] text-gray-400 p-2 mb-15"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="block p-15 h-10 w-32 hover:scale-105 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A]">
					REGISTER
				</button>
				<p className="text-gray-400">
					Already have an account?{' '}
					<Link to="/login" className="text-[#F7AB0A]">
						Sign in
					</Link>
				</p>
			</form>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 z-1"></div>
		</div>
	);
};

export default Register;
