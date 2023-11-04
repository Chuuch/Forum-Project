import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get,  ref, orderByChild } from 'firebase/database';
import { auth, database } from '../../config/firebase-config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useForm } from 'react-hook-form';

const getUserData = () => {
  return get(ref(database, 'users'), orderByChild('uid'));
};
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const Login = () => {
	// const [email, setEmail] = useState('');
	// const [ password, setPassword ] = useState('');
		const [ errorMessage, setErrorMessage ] = useState(null)

	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors }, getValues  } = useForm();

	const loginUser = async (email, password) => {
	console.log(auth)
	
	await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up 
			console.log(userCredential)
			const user = userCredential.user;
			navigate('/')
			// TODO: To be removed later
			console.log('User login: ', user)
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			if (errorCode === 'auth/invalid-login-credentials') {
				setErrorMessage('Please check your credentials.')
			}
			// TODO: To be removed later or replaced with notification
			alert(errorCode)
			console.log(errorCode, errorMessage)
		});
	};
		console.log(getValues('email'), getValues('password'))

	const onSubmit = () => {
		loginUser(getValues('email'), getValues('password'));
		// setEmail('');
		// setPassword('');
	};

	useEffect(()=>{
        getUserData().then(snapshot=>console.log(snapshot.val()));
	},[])

	return (
		<div className="h-screen bg-[rgb(36,36,36)] flex flex-col items-center justify-center z-20 pb-44">
			<h1 className="text-[#F7AB0A] text-4xl pb-16 ">Log into your account</h1>
			{errorMessage && <span className="text-red-500 pb-10">{errorMessage}</span>}
			<form
				className="z-20 flex flex-col w-1/5 space-y-2"
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					className="bg-[rgb(30,30,30)] text-gray-400 p-2 mb-15"
					type="text"
					name="email"
					id="email"
					placeholder="Email"
					{...register('email', {
						required: 'Email is required',
						pattern: {
						value: emailPattern,
						message: 'Invalid email address',
						},
					}) }
					// value={ email }
					// onChange={(e) => setEmail(e.target.value)}
				/>
				{errors.email && <span className="text-red-500">{errors.email.message}</span>}
				<input
					className="bg-[rgb(30,30,30)] text-gray-400 p-2 mb-15"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					{ ...register('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters',
							},
					}) }
					// value={ password }
					// onChange={(e) => setPassword(e.target.value)}
				/>
				{errors.password && <span className="text-red-500">{errors.password.message}</span>}

				<button className="block p-15 h-10 w-32 hover:scale-105 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A]" type='submit'>
					LOG IN
				</button>
				<p className="text-gray-400 text-1xl">
					Don`t have an account?{' '}
					<Link to="/register" className="text-[#F7AB0A]">
						Create one
					</Link>
				</p>
			</form>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 z-1"></div>
		</div>
	);
};

export default Login;
