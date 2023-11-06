import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth.services';
import { emailPattern, namePattern, passwordPattern, usernamePattern } from '../../constants/const';

const Register = () => {
	const [ errorMessage, setErrorMessage ] = useState(null)
	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const navigate = useNavigate();

	//**TODO: Password to be removed */
	const onSubmit = async ({ firstName, lastName, username, email, password }) => {
		
		const data = await registerUser(firstName, lastName, username, email, password/* , role: 'user' */)
		if (data?.user) {
			navigate('/')
		} else if (data.error) {
			setErrorMessage(data.error)
		}
		reset({keepErrors: false})
	};

	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center z-20 pb-44">
			<h1 className="text-[#F7AB0A] dark:text-[#001440] z-20 text-4xl pb-16 ">Create an account</h1>
			{errorMessage && <span className="text-red-500 pb-10">{errorMessage}</span>}
			<form
				className="z-20 flex flex-col w-fit space-y-2"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex space-x-2">
					<input
						className="bg-[rgb(30,30,30)] dark:bg-[#001440] p-2 mb-15 text-gray-400"
						type="text"
						id='firstName'
						placeholder="First Name"
					{...register('firstName', {
						required: 'First name is required',
						pattern: {
						value: namePattern,
						message: 'Invalid first name',
						},
					}) }
					/>
					{errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
					<input
						className="bg-[rgb(30,30,30)] dark:bg-[#001440] p-2 mb-15 ml-2 w-fit text-gray-400"
						type="text"
						id='lastName'
						placeholder="Last Name"
						{ ...register('lastName', {
						required: 'Last name is required',
						pattern: {
						value: namePattern,
						message: 'Invalid last name',
						},
					}) }						
					/>
					{errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
				</div>
				<input
					className="bg-[rgb(30,30,30)] dark:bg-[#001440] text-gray-400 p-2 mb-15"
					type="text"
					name="username"
					id="username"
					placeholder="Username"
					{ ...register('username', {
					required: 'Username is required',
					pattern: {
					value: usernamePattern,
					message: 'Invalid username',
					},
				}) }
				/>
				{errors.username && <span className="text-red-500">{errors.username.message}</span>}
				<input
					className="bg-[rgb(30,30,30)] dark:bg-[#001440] text-gray-400 p-2 mb-15"
					type="text"
					name="email"
					id="email"
					placeholder="Email"
					{ ...register('email', {
					required: 'Email address is required',
					pattern: {
					value: emailPattern,
					message: 'Invalid email address',
					},
				}) }
				/>
				{errors.email && <span className="text-red-500">{errors.email.message}</span>}
				<input
					className="bg-[rgb(30,30,30)] dark:bg-[#001440] text-gray-400 p-2 mb-15"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					{ ...register('password', {
					required: 'Password is required',
					pattern: {
					value: passwordPattern,
					message: 'Invalid password',
					},
				}) }
				/>
				{errors.password && <span className="text-red-500">{errors.password.message}</span>}
				<button className="block p-15 h-10 w-32 hover:scale-105 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] dark:bg-teal-200 dark:text-[#001440]">
					REGISTER
				</button>
				<p className="text-gray-400 dark:text-[#001440]">
					Already have an account?{' '}
					<Link to="/login" className="text-[#F7AB0A] dark:text-teal-200 hover:underline">
						Sign in
					</Link>
				</p>
			</form>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Register;
