import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ email, password });
		setEmail('');
		setPassword('');
	};

	return (
		<div className="h-screen bg-[rgb(36,36,36)] flex flex-col items-center justify-center z-20 pb-44">
			<h1 className="text-[#F7AB0A] text-4xl pb-16 ">Log into your account</h1>
			<form className="z-20 flex flex-col w-1/5 space-y-2" onSubmit={handleSubmit}>
				<label className="text-gray-400 space-y-2 text-2xl" htmlFor="email">
					Email Address
				</label>
				<input
					className="bg-[rgb(30,30,30)] text-gray-400 p-2 mb-15"
					type="text"
					name="email"
					id="email"
					required    
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label className="text-gray-400 text-2xl" htmlFor="password">
					Password
				</label>
				<input
					className="bg-[rgb(30,30,30)] text-gray-400 p-2 mb-15"
					type="password"
					name="password"
					id="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
                <button className="block p-15 h-10 w-32 hover:scale-105 uppercase outline-none border-none rounded-sm text-1xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A]">
					SIGN IN
				</button>
                <p className='text-gray-400 text-1xl'>
                    Don`t have an account? <Link to='/register' className='text-[#F7AB0A]'>Create one</Link>
                </p>
			</form>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 z-1"></div>
		</div>
	);
};

export default Login;
