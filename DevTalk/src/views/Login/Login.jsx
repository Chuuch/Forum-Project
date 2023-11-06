import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.services';
import { emailPattern, passwordPattern } from '../../constants/const';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

// const getUserData = () => {
//   return get(ref(database, 'users'), orderByChild('uid'));
// };

const Login = () => {
	const [ errorMessage, setErrorMessage ] = useState(null)
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm();
	
	const onSubmit = async ({ email, password }) => {
		const data = await loginUser(email, password)
		
		if (data.user) {
			toast.success('Login successful!')
			navigate('/')
		} else if (data.error) {
			setErrorMessage(data.error)
		}
	}

	// useEffect(()=>{
    //     getUserData().then(snapshot=>console.log(snapshot.val()));
	// },[])

	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center z-20 pb-44">
				<motion.div
				className='z-30 flex flex-col justify-center items-center w-[1800px] mt-24'
				initial={{ y: -300, opacity: 0 }}
				transition={{ duration: 1.5 }}
				whileInView={{ opacity: 1, y: 0}}
				>
			<h1 className="text-[#F7AB0A] text-4xl pb-16 dark:text-[#001440] z-20">Log into your account</h1>
			{errorMessage && <span className="text-red-500 pb-10">{errorMessage}</span>}
			<form
				className="z-20 flex flex-col w-1/5 space-y-2"
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					className="bg-[rgb(30,30,30)] dark:bg-gray-800 text-gray-400 p-2 mb-15"
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
				/>
				{errors.email && <span className="text-red-500">{errors.email.message}</span>}
				<input
					className="bg-[rgb(30,30,30)] dark:bg-gray-800 text-gray-400 p-2 mb-15"
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

				<button className="block p-15 h-10 w-32 hover:scale-105 uppercase outline-none border-none rounded text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] dark:bg-teal-200 dark:text-[#001440]" type='submit'>
					LOG IN
				</button>
				<p className="text-gray-400 text-1xl dark:text-[#001440]">
					Don`t have an account?{' '}
					<Link to="/register" className="text-[#F7AB0A] dark:text-teal-200 hover:underline">
						Create one
					</Link>
				</p>
			</form>
			</motion.div>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Login;
